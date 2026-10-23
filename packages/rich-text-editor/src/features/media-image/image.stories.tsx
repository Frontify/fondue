/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { core, mediaImage } from '#/features';
import { type AssetPickerService, defineEditor, defineReactPresentation, RichTextEditor } from '#/index';
import { compileContentModel } from '#/model';
import demoImage from '#/react/examples/demo-image.svg?no-inline';

// A feature story installs only its feature and what it requires, which its `feature:` tags name.
const model = compileContentModel([core(), mediaImage()], { id: 'story.images', version: 1 });

// A host's asset library: every asset ID has a URL, which the presentation resolves at render time.
const resolveAssetUrl = () => demoImage;

// A host picker that hands back the next asset of its library each time it opens.
const LIBRARY = ['harbour', 'forest', 'studio'];
let picked = 0;
const assets: AssetPickerService = {
    pick: () => {
        const assetId = LIBRARY[picked % LIBRARY.length] ?? 'harbour';
        picked += 1;
        return Promise.resolve({ assetId, mediaType: 'image/jpeg', labelSnapshot: `${assetId}.jpg` });
    },
};

const image = (nodeId: string, assetId: string, attrs: Readonly<Record<string, unknown>>) => ({
    type: 'figure',
    attrs: { nodeId: `figure-${nodeId}`, align: 'center' },
    content: [
        {
            type: 'asset_image',
            attrs: {
                nodeId,
                assetId,
                labelSnapshot: `${assetId}.jpg`,
                altIntent: 'missing',
                altText: '',
                width: 960,
                height: 540,
                displayWidth: null,
                mediaType: 'image/jpeg',
                ...attrs,
            },
        },
    ],
});

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Features/media.image',
    component: RichTextEditor,
    tags: ['autodocs', 'feature:media.image', 'feature:core'],
    parameters: {
        docs: {
            description: {
                component: `
Images as a \`figure\` that holds one \`asset_image\`. The document stores the host's \`assetId\` and the file's label, never a URL: the editor, the reader and every codec ask the presentation's \`resolveAssetUrl(assetId, { width })\` at render time, and a URL that fails \`checkHref\`, a resolver that returns \`null\` or throws, or an image that fails to load shows "Image unavailable" with its label, keeping the node. An image with no \`assetId\`, an unfinished upload, is left out of the reader and every codec with one \`codecs.unresolved-asset\` warning, and \`findUnresolvedAssets(document)\` from \`./model\` lists such images, so a host can block publishing.

Image in the toolbar opens the host asset picker, \`services.assets\`, which inserts the picked image at the selection it opened from; a picker that answers \`null\` changes nothing, and a picked asset whose insertion point was removed meanwhile inserts nothing and says so. The image chrome, which Alt+F10 reaches while the image is selected, offers:

- Alternative text, or a visible Add alternative text while it is missing: a dialog with Meaningful, first and selected, and its required text field, or Decorative. The field holds the image's text and never its file name. Another image of the same asset with meaningful text is offered as a suggestion.
- Size: 25, 50, 75 and 100 percent of the content width, the original size, and Custom width for any whole percent from 10 to 100. The handle on a selected image's edge resizes it by dragging, as one undo step; Escape during the drag keeps the old size.
- Alignment: left, center or right. Text never wraps around an image.
- Replace image: the picker again for this image, which keeps its \`nodeId\` and alternative text and asks the author to review that text.
- Pause animation and Play animation for an image that may animate, paused at first under reduced motion.

The reader writes \`alt=""\` for a decorative image, the text for a meaningful one, and no \`alt\` while it is missing.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| \`media.image\` | \`image.insert\`, \`image.replace\` \`{ nodeId }\`, \`image.alt.edit\`, \`image.size.set\` \`{ displayWidth }\`, \`image.align.set\` \`{ align }\` | none | Image in the toolbar; the image chrome and its menus | none | Inserts a \`figure\` through the asset picker; each image command changes only its attribute, as one undo step |
`,
            },
        },
    },
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.images', model }),
        presentation: defineReactPresentation({ toolbar: [['image.insert']], resolveAssetUrl }),
        services: { assets },
        defaultValue: {
            documentId: 'story-images',
            revision: null,
            document: {
                format: 'frontify.rich-text',
                formatVersion: 1,
                model: model.ref,
                requiredCapabilities: [
                    { id: 'core', version: 1 },
                    { id: 'media.image', version: 1 },
                ],
                content: {
                    type: 'doc',
                    attrs: { lang: null, dir: 'auto' },
                    content: [
                        {
                            type: 'paragraph',
                            attrs: { lang: null },
                            content: [{ type: 'text', text: 'The harbour at dawn, then a decorative forest.' }],
                        },
                        image('image-1', 'harbour', {
                            altIntent: 'meaningful',
                            altText: 'Fishing boats moored in a calm harbour at dawn',
                            displayWidth: 75,
                        }),
                        image('image-2', 'forest', { altIntent: 'decorative' }),
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
