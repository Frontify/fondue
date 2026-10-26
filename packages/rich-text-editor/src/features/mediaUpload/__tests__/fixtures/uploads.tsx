/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { vi } from 'vitest';

import { defineReactPresentation, type EditorPart } from '#/entries/authoring';
import { core, mediaImage, mediaUpload } from '#/features';
import { type UnitCommands, unitsOf } from '#/features/__tests__/fixtures/units';
import { flush, imageModel, para, resolving, storedIn, text } from '#/features/mediaImage/__tests__/fixtures/mount';
import {
    type AssetValue,
    defineEditor,
    type EditorHandle,
    type EditorServices,
    type ReactPresentation,
    RichTextEditor,
    type ServiceContext,
    type UploadRequest,
} from '#/index';
import {
    type ContentModel,
    type ContentNodeJSON,
    type Diagnostic,
    type Feature,
    type JsonObject,
    type ResourceLimits,
} from '#/model';
import { undoDepth } from '#/runtime/history';
import { type EditorRuntime, runtimeOf } from '#/runtime/runtime';
import { mediaOf } from '#/runtime/session/uploadsWiring';
import { type AuthoringPolicy, type DocumentChange } from '#/runtime/types';
import { declaredPng } from '#/testing/uploads';

export { para, text };

export const uploadModel = (features: readonly Feature[] = [core(), mediaImage(), mediaUpload()]): ContentModel =>
    imageModel(features);

/** A PNG file of `width` by `height` pixels as its header declares them, a few bytes long. */
export const pngFile = (name: string, width = 40, height = 30): File =>
    new File([declaredPng(width, height)], name, { type: 'image/png' });

/** A JPEG file whose frame header, after an APP0 segment, declares `width` by `height` pixels. */
export const jpegFile = (name: string, width: number, height: number): File => {
    const app0 = [0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01, 0x01, 0x00, 0x00, 0x01, 0x00, 0x01, 0, 0];
    const sof = [0xff, 0xc0, 0x00, 0x11, 0x08, height >> 8, height & 0xff, width >> 8, width & 0xff, 0x03];
    const bytes = Uint8Array.from([0xff, 0xd8, ...app0, ...sof, ...Array.from({ length: 9 }, () => 0), 0xff, 0xd9]);
    return new File([bytes], name, { type: 'image/jpeg' });
};

/** One upload the fake service has not answered yet. */
export type PendingUpload = {
    readonly request: UploadRequest;
    readonly context: ServiceContext & { readonly reportProgress: (fraction: number) => void };
    readonly resolve: (value: AssetValue) => void;
    readonly reject: (error: Error) => void;
};

/** Settles the header reads, the service answers and the portal flushes that an upload step starts. */
export const settle = async () => {
    for (let round = 0; round < 6; round += 1) {
        await flush();
    }
};

/** An upload service that answers each upload only when the test does, and rejects it once its signal aborts. */
export const deferredUploads = () => {
    const pending: PendingUpload[] = [];
    const answered = new Set<PendingUpload>();
    const upload = vi.fn(
        (request: UploadRequest, context: PendingUpload['context']) =>
            new Promise<AssetValue>((resolve, reject) => {
                context.signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
                pending.push({ request, context, resolve, reject });
            }),
    );
    const releaseUnused = vi.fn((_operationId: string, _context: ServiceContext) => Promise.resolve());
    const asset = (index: number): AssetValue => {
        const filename = pending[index]?.request.filename;
        return {
            assetId: `asset-${index}`,
            mediaType: 'image/png',
            labelSnapshot: filename ?? 'image.png',
        };
    };
    return {
        service: { upload, releaseUnused },
        upload,
        releaseUnused,
        pending,
        /** The uploads whose request is still open: neither answered nor aborted. */
        open: () => pending.filter((upload) => !answered.has(upload) && !upload.context.signal.aborted),
        /** The operation ID of upload `index`. */
        operationOf: (index: number) => pending[index]?.request.operationId,
        /** The operation IDs that `releaseUnused` was called with. */
        released: () => releaseUnused.mock.calls.map(([operationId]) => operationId),
        /** Answers upload `index` with its own asset. */
        complete: async (index: number) => {
            const upload = pending[index];
            if (upload !== undefined) {
                answered.add(upload);
                upload.resolve(asset(index));
            }
            await settle();
        },
        /** Rejects upload `index` as a service that refused it does. */
        fail: async (index: number) => {
            const upload = pending[index];
            if (upload !== undefined) {
                answered.add(upload);
                upload.reject(new Error('The service refused the file.'));
            }
            await settle();
        },
        asset,
    };
};
export type DeferredUploads = ReturnType<typeof deferredUploads>;

type Mount = {
    readonly blocks?: readonly ContentNodeJSON[];
    readonly model?: ContentModel;
    readonly uploads?: DeferredUploads;
    readonly services?: EditorServices;
    readonly limits?: Partial<ResourceLimits>;
    readonly policy?: Partial<AuthoringPolicy>;
    readonly generateId?: () => string;
    readonly plugins?: readonly EditorPart[];
    readonly toolbar?: ReactPresentation['toolbar'];
};

/** Mounts the editor with `media.image`, `media.upload`, an Image toolbar button and a fake upload service. */
export const mountUploads = async (options?: Mount) => {
    let given: Mount = {};
    if (options !== undefined) {
        given = options;
    }
    const {
        blocks = [para(text('Before'))],
        model = uploadModel(),
        uploads = deferredUploads(),
        services,
        limits,
        policy,
        generateId,
        plugins,
        toolbar = [['image.insert']],
    } = given;
    const ref = createRef<EditorHandle<UnitCommands>>();
    const diagnostics: Diagnostic[] = [];
    const changes: DocumentChange[] = [];
    const definitionOptions: { limits?: NonNullable<Mount['limits']> } = {};
    if (limits !== undefined) {
        definitionOptions.limits = limits;
    }
    const definition = defineEditor({
        id: 'test.uploads',
        model,
        plugins: unitsOf(model, plugins),
        ...definitionOptions,
    });
    const presentation = defineReactPresentation({ toolbar, resolveAssetUrl: resolving });
    const props = {
        'aria-label': 'Notes',
        definition,
        presentation,
        services: services ?? { uploads: uploads.service },
        defaultValue: { documentId: 'document-1', revision: null, document: storedIn(model, blocks) },
        onDiagnostic: (diagnostic: Diagnostic) => diagnostics.push(diagnostic),
        onDocumentChange: (change: DocumentChange) => changes.push(change),
        ...(generateId === undefined ? {} : { generateId }),
    } as const;
    const rendered = render(<RichTextEditor {...props} ref={ref} />);
    /** Renders the editor again with other `services`, as a host that changes them does. */
    const rerenderWith = async (next: EditorServices) => {
        rendered.rerender(<RichTextEditor {...props} services={next} ref={ref} />);
        await settle();
    };
    act(() => {
        vi.advanceTimersToNextFrame();
    });
    await flush();
    const handle = ref.current;
    const runtime: EditorRuntime | undefined = handle === null ? undefined : runtimeOf(handle);
    if (handle === null || runtime === undefined || runtime.view === undefined) {
        throw new Error('The editor did not mount.');
    }
    if (policy !== undefined) {
        handle.updatePolicy(Object.assign({ ...runtime.policy }, policy));
    }
    const chooser = () => {
        const found = rendered.container.querySelector<HTMLInputElement>('input[type="file"]');
        if (found === null) {
            throw new Error('The editor renders no file chooser.');
        }
        return found;
    };
    const pick = async (files: readonly File[]) => {
        act(() => {
            fireEvent.change(chooser(), { target: { files } });
        });
        await settle();
    };
    const blocksOf = () => handle.getSnapshot().document.content.content ?? [];
    const images = () =>
        blocksOf().flatMap((block) => (block.content ?? []).filter(({ type }) => type === 'asset_image'));
    return {
        ...rendered,
        rerenderWith,
        handle,
        runtime,
        view: runtime.view,
        uploads,
        diagnostics,
        changes,
        chooser,
        blocksOf,
        /** Chooses `files` in the file chooser that the toolbar's Image button opens. */
        choose: async (files: readonly File[]) => {
            act(() => {
                fireEvent.click(screen.getByRole('button', { name: 'Image' }));
            });
            await pick(files);
        },
        /** Chooses `file` in the file chooser that Replace opens for the image `nodeId`. */
        replace: async (nodeId: string, file: File) => {
            act(() => {
                handle.execute('image.replace', { nodeId });
            });
            await pick([file]);
        },
        /** The stored attributes of the document's images, in order. */
        images: () => images().map(({ attrs }) => attrs as JsonObject),
        /** The `nodeId`s of the document's images, in order. */
        imageIds: () => images().map(({ attrs }) => attrs?.nodeId as string),
        /** The `nodeId` of the figure that holds the image `nodeId`. */
        figureOf: (nodeId: string) =>
            blocksOf().find((block) => block.content?.some(({ attrs }) => attrs?.nodeId === nodeId))?.attrs
                ?.nodeId as string,
        status: (nodeId: string) => mediaOf(runtime)?.uploads.statusOf(nodeId),
        depth: () => undoDepth(runtime.state),
        undo: async () => {
            act(() => {
                handle.execute('history.undo');
            });
            await settle();
        },
        redo: async () => {
            act(() => {
                handle.execute('history.redo');
            });
            await settle();
        },
        /** The live region's text now. */
        announced: () => screen.getByTestId('fondue-rich-text-editor-announcer').textContent,
    };
};
export type MountedUploads = Awaited<ReturnType<typeof mountUploads>>;

/** Records each message the live region announces, in order. */
export const recordAnnouncements = () => {
    const region = screen.getByTestId('fondue-rich-text-editor-announcer');
    const messages: string[] = [];
    const observer = new MutationObserver((records) => {
        for (const record of records) {
            for (const node of record.addedNodes) {
                if (node.textContent !== null && node.textContent !== '') {
                    messages.push(node.textContent);
                }
            }
        }
    });
    observer.observe(region, { childList: true, characterData: true, subtree: true });
    return {
        messages,
        stop: async () => {
            await settle();
            observer.disconnect();
        },
    };
};
