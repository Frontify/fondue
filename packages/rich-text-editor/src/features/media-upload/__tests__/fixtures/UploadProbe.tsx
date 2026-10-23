/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef, useState } from 'react';

import { core, mediaImage, mediaUpload } from '#/features';
import {
    type AssetValue,
    defineEditor,
    defineReactPresentation,
    type DocumentChange,
    type EditorHandle,
    RichTextEditor,
    type UploadService,
} from '#/index';
import { compileContentModel } from '#/model';
import { setSelection } from '#/testing';

const model = compileContentModel([core(), mediaImage(), mediaUpload()], { id: 'test.uploads-ct', version: 1 });
const definition = defineEditor({ id: 'test.uploads-ct', model });
/** Every asset at a same-origin URL, which the CT page CSP allows, answered through `page.route`. */
const resolveAssetUrl = (assetId: string) => `${window.location.origin}/test-assets/${assetId}`;
const presentation = defineReactPresentation({ toolbar: [['image.insert']], resolveAssetUrl });

declare global {
    interface Window {
        /** The upload probe's handle, its changes, the requests its service holds and how the specs answer them. */
        uploadRte?: {
            readonly handle: EditorHandle;
            readonly changes: readonly DocumentChange[];
            /** The file names of the uploads the service was asked for. */
            readonly requests: () => readonly string[];
            /** Answers upload `index` with the asset `assetId`. */
            readonly complete: (index: number, assetId: string) => void;
            /** Rejects upload `index`, as a service that refused the file does. */
            readonly fail: (index: number) => void;
            /** Reports `fraction` of upload `index` as sent. */
            readonly progress: (index: number, fraction: number) => void;
            /** The stored attributes of the document's images. */
            readonly images: () => readonly Readonly<Record<string, unknown>>[];
            /** The types of the document's top-level blocks. */
            readonly blocks: () => readonly string[];
            readonly setSelection: typeof setSelection;
        };
    }
}

const paragraph = (text: string) => ({ type: 'paragraph', attrs: { lang: null }, content: [{ type: 'text', text }] });

/** The editor of `core`, `media.image` and `media.upload` over `texts`, with an upload service the specs answer. */
export const UploadProbe = ({ texts = ['Before'] }: { readonly texts?: readonly string[] }) => {
    const ref = useRef<EditorHandle<object>>(null);
    const [changes] = useState<DocumentChange[]>([]);
    const [uploads] = useState(() => {
        const held: {
            readonly name: string;
            readonly resolve: (asset: AssetValue) => void;
            readonly reject: () => void;
            readonly progress: (fraction: number) => void;
        }[] = [];
        const service: UploadService = {
            upload: ({ filename }, { reportProgress }) =>
                new Promise<AssetValue>((resolve, reject) => {
                    const refuse = () => reject(new Error('refused'));
                    held.push({ name: filename, resolve, reject: refuse, progress: reportProgress });
                }),
            releaseUnused: () => Promise.resolve(),
        };
        return { service, held };
    });
    useEffect(() => {
        const handle = ref.current as EditorHandle | null;
        if (handle === null) {
            return;
        }
        const content = () => handle.getSnapshot().document.content.content ?? [];
        window.uploadRte = {
            handle,
            changes,
            requests: () => uploads.held.map(({ name }) => name),
            complete: (index, assetId) => {
                const upload = uploads.held[index];
                upload?.resolve({ assetId, mediaType: 'image/png', labelSnapshot: upload.name });
            },
            fail: (index) => uploads.held[index]?.reject(),
            progress: (index, fraction) => uploads.held[index]?.progress(fraction),
            images: () =>
                content()
                    .flatMap((block) => block.content ?? [])
                    .filter(({ type }) => type === 'asset_image')
                    .map(({ attrs }) => attrs ?? {}),
            blocks: () => content().map(({ type }) => type),
            setSelection,
        };
    }, [changes, uploads]);
    const document = {
        format: 'frontify.rich-text' as const,
        formatVersion: 1 as const,
        model: model.ref,
        requiredCapabilities: model.capabilities,
        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: texts.map(paragraph) },
    };
    return (
        <RichTextEditor
            aria-label="Notes"
            definition={definition}
            presentation={presentation}
            defaultValue={{ documentId: 'document-1', revision: null, document }}
            services={{ uploads: uploads.service }}
            ref={ref}
            onDocumentChange={(change) => changes.push(change)}
        />
    );
};
