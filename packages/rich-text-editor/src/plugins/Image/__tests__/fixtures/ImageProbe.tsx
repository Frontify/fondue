/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThemeProvider } from '@frontify/fondue-components';
import { useEffect, useRef } from 'react';

import { defineReactPresentation } from '#/entries/authoring';
import { RichTextReader } from '#/entries/reader';
import { defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import { compileContentModel, type RichTextDocument } from '#/model';
import { bold, code, core, italic, image, mention, strikethrough, underline } from '#/plugins';
import { pluginsFor } from '#/plugins/__tests__/fixtures/pluginsFor';
import { setSelection } from '#/testing';

const model = compileContentModel(
    [core(), bold(), italic(), underline(), strikethrough(), code(), image(), mention()],
    {
        id: 'test.images-ct',
        version: 1,
    },
);
const definition = defineEditor({ id: 'test.images-ct', model, plugins: pluginsFor(model) });
/** Every asset at a same-origin URL, which the CT page CSP allows, answered through `page.route`. */
const resolveAssetUrl = (assetId: string) => `${window.location.origin}/test-assets/${assetId}`;
const presentation = defineReactPresentation({
    toolbar: [
        ['mark.bold.toggle', 'mark.italic.toggle', 'mark.underline.toggle', 'mark.strike.toggle', 'mark.code.toggle'],
        ['image.insert'],
    ],
    resolveAssetUrl,
});
// A host picker that hands back one asset each time it opens, and counts its picks.
let picks = 0;
const assets = {
    pick: () => {
        picks += 1;

        return Promise.resolve({ assetId: 'still.png', mediaType: 'image/png', labelSnapshot: 'picked.png' });
    },
};
const services = { assets };

declare global {
    // oxlint-disable-next-line typescript/consistent-type-definitions -- only an interface merges into the global `Window`.
    interface Window {
        /** The image probe's handle, its documented changes and the selection helper the specs drive it with. */
        imageRte?: {
            handle: EditorHandle;
            changes: number;
            picks: number;
            setSelection: typeof setSelection;
        };
    }
}

const paragraph = (text: string) => ({ type: 'paragraph', attrs: { lang: null }, content: [{ type: 'text', text }] });
const figure = (
    nodeId: string,
    image: Readonly<Record<string, unknown>>,
    align: 'left' | 'center' | 'right' = 'center',
) => ({
    type: 'figure',
    attrs: { nodeId: `figure-${nodeId}`, align },
    content: [
        {
            type: 'asset_image',
            attrs: {
                nodeId,
                assetId: 'still.png',
                labelSnapshot: 'logo.png',
                altIntent: 'meaningful',
                altText: 'Frontify logo',
                width: 40,
                height: 30,
                displayWidth: null,
                mediaType: 'image/png',
                ...image,
            },
        },
    ],
});
const DOCUMENTS = {
    alt: [
        figure('image-1', { altIntent: 'missing', altText: '' }),
        figure('image-2', { altIntent: 'decorative', altText: '' }),
        figure('image-3', { altIntent: 'meaningful', altText: 'Frontify logo' }),
    ],
    animated: [paragraph('Before'), figure('image-1', { assetId: 'moving.gif', mediaType: 'image/gif' })],
    still: [paragraph('Before'), figure('image-1', {})],
    broken: [paragraph('Before'), figure('image-1', { assetId: 'missing.png' })],
    // A stored size far taller than the file, which must not reserve a box of that height.
    extreme: [paragraph('Before'), figure('image-1', { assetId: 'pending.png', width: 1, height: 65_535 })],
    // Hebrew first, so the content's own direction is right to left.
    sides: [
        paragraph('שלום'),
        figure('image-1', { width: 40, height: 30 }, 'left'),
        figure('image-2', { width: 40, height: 30 }, 'right'),
    ],
    print: [
        {
            type: 'paragraph',
            attrs: { lang: null },
            content: [
                { type: 'text', text: 'Ask ' },
                {
                    type: 'mention',
                    attrs: { nodeId: 'mention-1', resourceType: 'user', resourceId: 'user-1', labelSnapshot: 'Ada' },
                },
            ],
        },
        figure('image-1', {}),
    ],
};

const stored = (content: keyof typeof DOCUMENTS) =>
    ({
        format: 'frontify.rich-text',
        formatVersion: 1,
        model: model.ref,
        requiredCapabilities: model.capabilities,
        content: {
            type: 'doc',
            attrs: { lang: null, dir: 'auto' },
            content: [...DOCUMENTS[content], paragraph('After')],
        },
    }) as unknown as RichTextDocument;

/** Mounts `media.image` with a resolver for every asset, and the reader of the same document beside it. */
export const ImageProbe = ({
    content = 'still',
    dir,
}: {
    content?: keyof typeof DOCUMENTS;
    /** The direction of the page around the editor and the reader. */
    dir?: 'ltr' | 'rtl';
}) => {
    const ref = useRef<EditorHandle>(null);
    const changesRef = useRef(0);
    useEffect(() => {
        const handle = ref.current;
        if (handle !== null) {
            window.imageRte = {
                handle,
                get changes() {
                    return changesRef.current;
                },
                get picks() {
                    return picks;
                },
                setSelection,
            };
        }
    }, []);
    const document = stored(content);

    return (
        <div dir={dir}>
            <ThemeProvider {...(dir === undefined ? {} : { dir })}>
                <RichTextEditor
                    aria-label="Notes"
                    definition={definition}
                    presentation={presentation}
                    services={services}
                    defaultValue={{ documentId: 'document-1', revision: null, document }}
                    onDocumentChange={() => {
                        changesRef.current += 1;
                    }}
                    ref={ref}
                />
            </ThemeProvider>
            <section aria-label="Published">
                <RichTextReader
                    document={document}
                    model={model}
                    presentation={{ styles: [], colorTokens: [], resolveAssetUrl }}
                />
            </section>
        </div>
    );
};
