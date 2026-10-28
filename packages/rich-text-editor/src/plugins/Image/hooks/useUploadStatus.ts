/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorApi, type UploadStatus, useEditorValue } from '#/bridge/pluginApi/plugin';
import { type CodecContext } from '#/model';

const sameStatus = (left: UploadStatus | undefined, right: UploadStatus | undefined) =>
    left === right ||
    (left !== undefined && right !== undefined && left.state === right.state && left.progress === right.progress);

/** The upload of slot `nodeId` as the session reports it, or `undefined` when none runs, failed or stopped. */
export const useUploadStatus = (nodeId: string): UploadStatus | undefined =>
    useEditorValue((api) => api?.uploads.status(nodeId), sameStatus);

/** The text that says how the upload of a slot stands, and for one that failed or stopped, how to go on. */
export const uploadStatusText = (status: UploadStatus, translate: CodecContext['translate']): string => {
    if (status.state === 'running') {
        if (status.progress === null) {
            return translate('RichTextEditor_uploadRunning');
        }

        return translate('RichTextEditor_uploadPercent', { percent: status.progress });
    }

    if (status.state === 'failed') {
        return translate('RichTextEditor_uploadError');
    }

    if (status.state === 'stopped') {
        return translate('RichTextEditor_uploadStopped');
    }

    return translate('RichTextEditor_uploadWaiting');
};

/** Whether the surface that `surface` returns holds focus. */
export const surfaceFocused = (surface: EditorApi['surface'] | undefined): boolean => {
    const element = surface?.();

    return element !== undefined && element.ownerDocument.activeElement === element;
};
