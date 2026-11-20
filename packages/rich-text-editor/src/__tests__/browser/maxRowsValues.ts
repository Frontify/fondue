/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteDocument } from '../../index';

export const MAX_ROWS = 8;

const PARAGRAPH_COUNT = 30;

/** Far more lines than `MAX_ROWS`, so the content has to scroll. */
export const LONG_DOCUMENT: RteDocument = {
    version: 1,
    blocks: Array.from({ length: PARAGRAPH_COUNT }, (_, index) => ({
        type: 'paragraph' as const,
        children: [{ text: `Paragraph ${index + 1}` }],
    })),
};

export const BEFORE_BUTTON = 'Before the editor';

export const HOST_TEST_ID = 'host';
