/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ContentModel, decodeDocument } from '#/model';

/** Counts the stored documents that cannot be read, and every `format.*` diagnostic by code. */
export const countImportFailures = (stored: readonly unknown[], model: ContentModel) => {
    let blocked = 0;
    const byCode = new Map<string, number>();
    for (const document of stored) {
        const result = decodeDocument(document, model);
        if (result.status === 'blocked') {
            blocked += 1;
        }
        for (const { code } of result.diagnostics) {
            if (code.startsWith('format.')) {
                byCode.set(code, (byCode.get(code) ?? 0) + 1);
            }
        }
    }
    // `format.unknown-capability` is the unknown capabilities counter.
    return { blocked, byCode };
};
