/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { core, mediaImage, mediaUpload } from '#/features';
import { defineEditor, defineReactPresentation, RichTextEditor, type UploadService } from '#/index';
import { compileContentModel } from '#/model';

// A feature story installs only its feature and what it requires, which its `feature:` tags name.
const model = compileContentModel([core(), mediaImage(), mediaUpload()], { id: 'story.uploads', version: 1 });

// The host's asset library, whose URLs the presentation resolves at render time.
const resolveAssetUrl = (assetId: string, { width }: { readonly width?: number }) =>
    `https://picsum.photos/seed/${encodeURIComponent(assetId)}/${width ?? 960}/540`;

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
    tags: ['autodocs', 'feature:media.upload', 'feature:media.image', 'feature:core'],
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
        definition: defineEditor({ id: 'story.uploads', model }),
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

export const Default: StoryObj<typeof RichTextEditor> = {};
