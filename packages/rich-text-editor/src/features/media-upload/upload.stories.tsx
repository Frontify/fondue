/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { defineReactPresentation } from '#/entries/authoring';
import {
    corePlugin,
    defineEditor,
    mediaImagePlugin,
    mediaUploadPlugin,
    modelOf,
    RichTextEditor,
    type UploadService,
} from '#/index';
import demoImage from '#/react/examples/demo-image.svg?no-inline';

// A feature story installs only its feature and what it requires, which its `feature:` tags name.
const plugins = [corePlugin(), mediaImagePlugin(), mediaUploadPlugin()] as const;
const model = modelOf(plugins, { id: 'story.uploads', version: 1 });

// The host's asset library, whose URLs the presentation resolves at render time.
const resolveAssetUrl = () => demoImage;

const STEP_MS = 300;
const STEPS = 10;

// A host's upload service: it reports progress for three seconds and answers an asset ID for the file, except for a
// file whose name holds `fail`, which it refuses, so the chrome shows Retry and Remove.
const uploads: UploadService = {
    upload: ({ operationId, filename }, { signal, reportProgress }) =>
        new Promise((resolve, reject) => {
            let step = 0;
            const timer = setInterval(() => {
                step += 1;
                reportProgress(step / STEPS);
                if (step < STEPS) {
                    return;
                }
                clearInterval(timer);
                if (filename.includes('fail')) {
                    reject(new Error('The service refused the file.'));
                    return;
                }
                resolve({ assetId: `upload-${operationId}`, mediaType: 'image/jpeg', labelSnapshot: filename });
            }, STEP_MS);
            signal.addEventListener('abort', () => {
                clearInterval(timer);
                reject(new DOMException('The upload was aborted.', 'AbortError'));
            });
        }),
    releaseUnused: () => Promise.resolve(),
};

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Features/media.upload',
    component: RichTextEditor,
    tags: ['autodocs', 'documents-behavior', 'feature:media.upload', 'feature:media.image', 'feature:core'],
    parameters: {
        docs: {
            description: {
                component: `
The upload slot behind images. Without a host asset picker, Image in the toolbar opens the file chooser; a paste or a drop of files uploads them too, ignoring the text that comes with them, all slots of one paste or drop in one undo step. Each file is checked before the service sees it: a type outside \`media.image\`'s \`acceptTypes\` (PNG, JPEG, GIF, WebP and AVIF by default, no SVG), a file over \`maxAssetBytes\`, or an image whose header declares more than \`maxImagePixels\` pixels or 65,535 on a side is refused with a message that names the accepted types and size, or the pixel limits. Nothing is decoded.

An accepted file starts as an image with no \`assetId\`, its file name as \`labelSnapshot\` and the width and height its header declares, so the slot keeps the image's shape. \`services.uploads\` receives it with a new operation ID, at most \`maxConcurrentUploads\` (3) at once per editor; the others wait. The chrome shows a progress bar named by the file, outside the document, whose indeterminate animation stops after 5 seconds, with Cancel. The completion sets \`assetId\`, \`mediaType\` and \`labelSnapshot\` with no undo step of its own. A failure keeps the slot and shows Retry and Remove; Retry sends the file again with a new operation ID.

Cancel, an undo, a deletion of the slot, \`replaceDocument\`, a policy change, a changed \`services.uploads\` or the end of the session aborts the upload, inserts nothing and calls \`releaseUnused(operationId)\` once. Cancel removes the slot and restores what it replaced as one undo step; an undo of it brings the slot back with Retry, and starts no upload by itself. Replace image uploads a new file into the same image, keeping its \`nodeId\` and alternative text, and a cancel or an undo gives it its previous file back. Completed uploads stay in a session cache keyed by operation ID; when history resets, the session ends or the document is replaced, each one whose asset left the document is released.

Here the service takes three seconds, and refuses any file whose name holds \`fail\`.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| \`media.upload\` | \`media.upload.cancel\` \`{ nodeId }\`, \`media.upload.retry\` \`{ nodeId }\` | none | Cancel, Retry and Remove in the upload chrome | none | The Upload slot table: Cancel is one undo step; the completion and Retry add none |
`,
            },
        },
    },
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.uploads', model, plugins }),
        presentation: defineReactPresentation({ toolbar: [['image.insert']], resolveAssetUrl }),
        services: { uploads },
        defaultValue: {
            documentId: 'story-uploads',
            revision: null,
            document: {
                format: 'frontify.rich-text',
                formatVersion: 1,
                model: model.ref,
                requiredCapabilities: [{ id: 'core', version: 1 }],
                content: {
                    type: 'doc',
                    attrs: { lang: null, dir: 'auto' },
                    content: [
                        {
                            type: 'paragraph',
                            attrs: { lang: null },
                            content: [{ type: 'text', text: 'Choose, paste or drop an image here.' }],
                        },
                    ],
                },
            },
        },
    },
    argTypes: {
        definition: { control: false },
        defaultValue: { control: false },
        presentation: { control: false },
        services: { control: false },
    },
};
export default meta;

// The header of a 64 by 32 PNG, which the editor checks without decoding it.
const pngHeader = () => {
    const bytes = new Uint8Array(33);
    const view = new DataView(bytes.buffer);
    bytes.set([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    view.setUint32(8, 13);
    bytes.set([0x49, 0x48, 0x44, 0x52], 12);
    view.setUint32(16, 64);
    view.setUint32(20, 32);
    bytes.set([8, 6, 0, 0, 0], 24);
    return bytes;
};

/** A chosen file uploads into a slot that shows its progress, then settles with no retry. */
export const Default: StoryObj<typeof RichTextEditor> = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        // The upload takes 3 s, so only the wait for its progress bar to go gets the longer timeout.
        const timeout = { timeout: 10_000 };
        // The loading shell's textbox is replaced on mount, so the surface is looked up again at each use.
        const surface = () => canvas.getByRole('textbox', { name: 'Notes' });
        await waitFor(() => expect(surface()).toHaveAttribute('contenteditable'));
        // The surface shows before the session is ready, and a click on Image while it is unavailable opens nothing.
        await waitFor(() => expect(canvas.getByRole('button', { name: 'Image' })).not.toHaveAttribute('aria-disabled'));
        await userEvent.click(canvas.getByRole('button', { name: 'Image' }));
        const chooser = canvasElement.querySelector<HTMLInputElement>('input[type="file"]');
        if (chooser === null) {
            throw new Error('Image opened no file chooser.');
        }
        await userEvent.upload(chooser, new File([pngHeader()], 'logo.png', { type: 'image/png' }));

        await expect(await within(surface()).findByRole('progressbar', { name: 'logo.png' })).toBeVisible();
        await waitFor(
            () => expect(within(surface()).queryByRole('progressbar', { name: 'logo.png' })).toBeNull(),
            timeout,
        );
        await expect(within(surface()).queryByRole('button', { name: 'Retry upload' })).toBeNull();
    },
};
