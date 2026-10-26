/* (c) Copyright Frontify Ltd., all rights reserved. */

import { OptionsMenu } from '#/bridge/pluginApi/define';
import { defineEditorPart, type EditorApi, type EditorControlApi } from '#/bridge/pluginApi/plugin';
import { figureAlign } from '#/model';

import { imageView } from './components/ImageChrome';
import { image } from './feature';
import { altTextStrings, widthStrings } from './helpers/dialogStrings';
import { AltTextDialog, WidthDialog } from './helpers/lazyParts';
import { alignOptions, EDIT_WIDTH, SIDES, sizeOptions } from './helpers/options';

const NODE = { fields: { nodeId: { type: 'string', minLength: 1, optional: true } } } as const;
const FEATURE = 'media.image';
const IMAGE = 'asset_image';

/** Whether the node `nodeId` is an image. */
const isImage = (api: EditorApi<'content'>, nodeId: string) => api.content.read({ nodeId })?.[0]?.type === IMAGE;

/** The selected image, with its `nodeId`, else `undefined`. */
const selectedImage = (api: EditorControlApi) => {
    const image = api.nearest(IMAGE);
    if (image === undefined || image.nodeId === null) {
        return undefined;
    }

    return { nodeId: image.nodeId, attrs: image.attrs };
};

/** The image a command acts on: the one `payload` names, else the selected one. */
const targetOf = (api: EditorControlApi, payload: { nodeId?: string } | undefined) => {
    const given = payload?.nodeId;
    if (given !== undefined) {
        return given;
    }

    return selectedImage(api)?.nodeId;
};

/**
 * Inserts an image from the toolbar through the host asset picker, else the file chooser, replaces one the same way,
 * opens its alternative text dialog, and sets its size and side; pasted and dropped files upload as new images.
 */
export const mediaImageEditor = defineEditorPart(image, {
    needs: ['attributes', 'content', 'insert', 'overlays', 'uploads'],
    commands: {
        'image.insert': {
            enabled: (api) => api.insert.allowed('figure'),
            run: (api) => {
                api.uploads.pick();

                return true;
            },
            // The picker never opens for content the policy would refuse once it answers.
            refuses: (policy) => policy.features[FEATURE]?.create === false,
        },
        'image.replace': {
            payload: NODE,
            enabled: (api, payload: { nodeId?: string } | undefined) => {
                const nodeId = targetOf(api, payload);

                return nodeId !== undefined && isImage(api, nodeId);
            },
            // With no `nodeId`, it replaces the selected image.
            run: (api, payload: { nodeId?: string } | undefined) => {
                const nodeId = targetOf(api, payload);
                if (nodeId === undefined || !isImage(api, nodeId)) {
                    return false;
                }

                api.uploads.pick(nodeId);

                return true;
            },
            refuses: (policy) => policy.features[FEATURE]?.edit === false,
        },
        'image.alt.edit': {
            enabled: (api) => selectedImage(api) !== undefined,
            run: (api) => {
                // The dialog edits the image selected when it opened, wherever the selection goes next.
                const image = selectedImage(api);
                if (image === undefined) {
                    return false;
                }

                api.overlays.open(AltTextDialog, { nodeId: image.nodeId, strings: altTextStrings(api.t) });

                return true;
            },
        },
        'image.size.menu': {
            enabled: (api) => selectedImage(api) !== undefined,
            run: (api) => {
                const image = selectedImage(api);
                if (image === undefined) {
                    return false;
                }

                let displayWidth: number | null = null;
                if (typeof image.attrs.displayWidth === 'number') {
                    displayWidth = image.attrs.displayWidth;
                }

                const options = sizeOptions(api.t, displayWidth);
                api.overlays.open(OptionsMenu, {
                    label: api.t('RichTextEditor_imageSizeMenu'),
                    options,
                    node: { nodeId: image.nodeId, at: 'node' },
                });

                return true;
            },
        },
        [EDIT_WIDTH]: {
            enabled: (api) => selectedImage(api) !== undefined,
            run: (api) => {
                const image = selectedImage(api);
                if (image === undefined) {
                    return false;
                }

                let width: number | null = null;
                if (typeof image.attrs.displayWidth === 'number') {
                    width = image.attrs.displayWidth;
                }

                api.overlays.open(WidthDialog, { width, nodeId: image.nodeId, strings: widthStrings(api.t) });

                return true;
            },
        },
        'image.align.menu': {
            enabled: (api) => selectedImage(api) !== undefined,
            run: (api) => {
                const image = selectedImage(api);
                if (image === undefined) {
                    return false;
                }

                const figure = api.nearest('figure', image.nodeId);
                const attrs = figure?.attrs;
                const side = figureAlign(attrs ?? {});
                const options = alignOptions(api.t, side);
                api.overlays.open(OptionsMenu, {
                    label: api.t('RichTextEditor_imageAlignMenu'),
                    options,
                    node: { nodeId: image.nodeId, at: 'node' },
                });

                return true;
            },
        },
        'image.size.set': {
            payload: { fields: { displayWidth: { type: 'integer', min: 10, max: 100, nullable: true } } },
            run: (api, payload: { displayWidth: number | null }) => api.attributes.set(IMAGE, payload),
        },
        'image.align.set': {
            payload: { fields: { align: { type: 'enum', values: SIDES } } },
            run: (api, payload: { align: (typeof SIDES)[number] }) => api.attributes.set('figure', payload),
        },
    },
    toolbar: [
        {
            id: 'image',
            kind: 'button',
            command: 'image.insert',
            labelKey: 'RichTextEditor_image',
            icon: 'IconImage',
            opensOverlay: true,
        },
        // The image chrome's commands, which More and the context menu offer while an image is selected.
        ...[
            { id: 'image-alt', command: 'image.alt.edit', labelKey: 'RichTextEditor_imageAltEdit' },
            { id: 'image-size', command: 'image.size.menu', labelKey: 'RichTextEditor_imageSizeMenu' },
            { id: 'image-width', command: EDIT_WIDTH, labelKey: 'RichTextEditor_imageSizeCustom' },
            { id: 'image-align', command: 'image.align.menu', labelKey: 'RichTextEditor_imageAlignMenu' },
            { id: 'image-replace', command: 'image.replace', labelKey: 'RichTextEditor_imageReplace' },
        ].map((entry) => ({ ...entry, kind: 'button' as const, icon: 'IconImage', opensOverlay: true, node: IMAGE })),
    ],
    views: [imageView],
    // Text that keeps white space, as code does, takes no image.
    files: (api, files, at) => !api.selection().verbatim && api.uploads.begin(files, at),
});
