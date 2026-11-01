/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DOCUMENT_VERSION } from '#/core';

/** Dev-only warning for a document written by a newer format version; it is shown read-only so it is never saved back as an older one. */
export const warnNewerVersion = (version: number): void => {
    if (process.env.NODE_ENV === 'production') {
        return;
    }
    console.warn(
        `[RichTextEditor] The document has version ${version} but this editor writes version ${DOCUMENT_VERSION}, so it is shown read-only.`,
    );
};
