/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPart, type EditorControlApi } from '#/bridge/plugin';

import { upload } from './feature';

const NODE = { fields: { nodeId: { type: 'string', minLength: 1, optional: true } } } as const;

/** The image `payload` names, else the selected image, as a More row runs the command with no payload. */
const imageOf = (api: EditorControlApi, payload: { nodeId?: string } | undefined) =>
    payload?.nodeId ?? api.nearest('asset_image')?.nodeId ?? undefined;

/**
 * Cancel and Retry of the upload into an image, which its chrome shows while the upload runs or once it failed, and
 * More and the context menu offer for the selected image while they apply.
 */
export const mediaUploadEditor = defineEditorPart(upload, {
    needs: ['uploads'],
    commands: {
        'media.upload.cancel': {
            payload: NODE,
            run: (api, payload: { nodeId?: string } | undefined) => {
                const nodeId = imageOf(api, payload);

                return nodeId !== undefined && api.uploads.cancel(nodeId);
            },
        },
        'media.upload.retry': {
            payload: NODE,
            run: (api, payload: { nodeId?: string } | undefined) => {
                const nodeId = imageOf(api, payload);

                return nodeId !== undefined && api.uploads.retry(nodeId);
            },
        },
    },
    toolbar: [
        {
            id: 'upload-cancel',
            kind: 'button',
            command: 'media.upload.cancel',
            labelKey: 'RichTextEditor_uploadCancel',
            icon: 'IconCross',
            node: 'asset_image',
        },
        {
            id: 'upload-retry',
            kind: 'button',
            command: 'media.upload.retry',
            labelKey: 'RichTextEditor_uploadRetry',
            icon: 'IconArrowRoundClockwise',
            node: 'asset_image',
        },
    ],
});
