/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DOCUMENT_VERSION, warnOnce } from '#/core';

const EDITOR_CRASHED_MESSAGE = '[RichTextEditor] The editor crashed and was replaced by a read-only view.';

/** Dev-only warning, once per version, for a document written by a newer format version; it is shown read-only so it is never saved back as an older one. */
export const warnNewerVersion = (version: number): void => {
    warnOnce(
        `editor-newer-version:${version}`,
        `[RichTextEditor] The document has version ${version} but this editor writes version ${DOCUMENT_VERSION}, so it is shown read-only.`,
    );
};

/** Dev-only error log for a crash the boundary caught, with what was thrown. */
export const warnEditorCrashed = (error: unknown): void => {
    if (process.env.NODE_ENV === 'production') {
        return;
    }
    console.error(EDITOR_CRASHED_MESSAGE, error);
};
