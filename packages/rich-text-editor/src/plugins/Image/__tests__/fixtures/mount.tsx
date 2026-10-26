/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render } from '@testing-library/react';
import { createRef } from 'react';
import { vi } from 'vitest';

import { defineReactPresentation } from '#/entries/authoring';
import {
    type AssetValue,
    type AuthoringPolicy,
    defineEditor,
    type EditorHandle,
    type EditorServices,
    type ReactPresentation,
    RichTextEditor,
    type ServiceContext,
} from '#/index';
import {
    compileContentModel,
    type ContentModel,
    type ContentNodeJSON,
    type Diagnostic,
    type Feature,
    type JsonObject,
    type RichTextDocument,
} from '#/model';
import { core, mediaImage, mentions } from '#/plugins';
import { unitsOf, type UnitCommands } from '#/plugins/__tests__/fixtures/units';
import { type EditorRuntime, runtimeOf } from '#/runtime/runtime';
import { type DocumentChange } from '#/runtime/types';

export const imageModel = (features: readonly Feature[] = [core(), mediaImage(), mentions()]): ContentModel =>
    compileContentModel(features, { id: 'test.images', version: 1 });

export const para = (...content: readonly ContentNodeJSON[]): ContentNodeJSON => ({
    type: 'paragraph',
    attrs: { lang: null },
    content: [...content],
});
export const text = (value: string): ContentNodeJSON => ({ type: 'text', text: value });

/** A figure that holds one image, with the image's stored attributes over a meaningful logo. */
export const figure = (
    nodeId: string,
    image: JsonObject = {},
    align: 'left' | 'center' | 'right' = 'center',
): ContentNodeJSON => ({
    type: 'figure',
    attrs: { nodeId: `figure-${nodeId}`, align },
    content: [
        {
            type: 'asset_image',
            attrs: {
                nodeId,
                assetId: 'asset-logo',
                labelSnapshot: 'logo.png',
                altIntent: 'meaningful',
                altText: 'Frontify logo',
                width: 40,
                height: 30,
                displayWidth: null,
                mediaType: 'image/png',
                ...image,
            },
        } as unknown as ContentNodeJSON,
    ],
});

export const storedIn = (model: ContentModel, blocks: readonly ContentNodeJSON[]): RichTextDocument =>
    ({
        format: 'frontify.rich-text',
        formatVersion: 1,
        model: model.ref,
        requiredCapabilities: model.capabilities,
        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: blocks },
    }) as unknown as RichTextDocument;

/** A URL per asset, as a host's `resolveAssetUrl` gives one at render time. */
export const resolving = (assetId: string, { width }: { width?: number }) => {
    let size = '';
    if (width !== undefined) {
        size = `?w=${width}`;
    }

    return `https://cdn.frontify.test/${assetId}.png${size}`;
};

/** One pick the host picker has not answered yet. */
export type PendingPick = {
    request: { purpose: string };
    context: ServiceContext;
    resolve: (value: AssetValue | null) => void;
};

/** A host asset picker that answers each pick only when the test does. */
export const deferredPicker = () => {
    const pending: PendingPick[] = [];
    const pick = vi.fn(
        (request: { purpose: string }, context: ServiceContext) =>
            new Promise<AssetValue | null>((resolve) => {
                pending.push({ request, context, resolve });
            }),
    );

    return { service: { pick }, pick, pending };
};

export const PALETTE: AssetValue = { assetId: 'asset-palette', mediaType: 'image/jpeg', labelSnapshot: 'palette.jpg' };

type Mount = {
    model?: ContentModel;
    blocks?: readonly ContentNodeJSON[];
    services?: EditorServices;
    presentation?: ReactPresentation;
    toolbar?: ReactPresentation['toolbar'];
    policy?: Partial<AuthoringPolicy>;
};

/** The commands of the default image model, which a given model keeps. */
type ImageCommands = UnitCommands;

/** Mounts `RichTextEditor` with `media.image`, runs the first frame and renders the node views' chrome. */
export const mountImages = async (options?: Mount) => {
    let given: Mount = {};
    if (options !== undefined) {
        given = options;
    }

    const {
        model = imageModel(),
        blocks = [para(text('Before')), figure('image-1'), para(text('After'))],
        services,
        presentation,
        toolbar = [['image.insert']],
        policy = {},
    } = given;
    const ref = createRef<EditorHandle<ImageCommands>>();
    const diagnostics: Diagnostic[] = [];
    const changes: DocumentChange[] = [];
    const definition = defineEditor({ id: 'test.images', model, policy, plugins: unitsOf(model) });
    const shown = presentation ?? defineReactPresentation({ toolbar, resolveAssetUrl: resolving });
    const rendered = render(
        <RichTextEditor
            aria-label="Notes"
            definition={definition}
            presentation={shown}
            {...(services === undefined ? {} : { services })}
            defaultValue={{ documentId: 'document-1', revision: null, document: storedIn(model, blocks) }}
            onDiagnostic={(diagnostic) => diagnostics.push(diagnostic)}
            onDocumentChange={(change) => changes.push(change)}
            ref={ref}
        />,
    );
    act(() => {
        vi.advanceTimersToNextFrame();
    });
    await flush();
    const handle = ref.current;
    const runtime: EditorRuntime | undefined = handle === null ? undefined : runtimeOf(handle);
    if (handle === null || runtime === undefined || runtime.view === undefined) {
        throw new Error('The editor did not mount.');
    }

    const blocksOf = () => handle.getSnapshot().document.content.content ?? [];

    return {
        ...rendered,
        handle,
        runtime,
        view: runtime.view,
        diagnostics,
        changes,
        blocksOf,
        /** The stored attributes of the image `nodeId`. */
        imageOf: (nodeId: string) =>
            blocksOf()
                .flatMap((block) => block.content ?? [])
                .find((node) => node.type === 'asset_image' && node.attrs?.nodeId === nodeId)?.attrs,
        /** Node-selects the image `nodeId`. */
        selectImage: (nodeId: string) => {
            let found: number | undefined;
            runtime.state.doc.descendants((node, pos) => {
                if (node.attrs.nodeId === nodeId && node.type.name === 'asset_image') {
                    found = pos;
                }
            });
            if (found === undefined) {
                throw new Error(`No image ${nodeId}.`);
            }

            const pos = found;
            act(() => runtime.select({ node: pos }));
        },
    };
};

/** Settles the promises a picker answer or a portal flush started. */
export const flush = async () => {
    await act(async () => {
        await vi.advanceTimersByTimeAsync(0);
    });
};
