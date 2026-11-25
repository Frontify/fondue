/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineBlock, defineContent } from '../../core';

/** A void block with a Markdown form, read from the `hr` token and written as `***` alone on its line. */
export const starBreakContent = defineContent({
    blocks: {
        starBreak: defineBlock({
            toHtml: () => ({ tag: 'hr' }),
            parse: [{ tag: 'hr' }],
            markdown: { read: [{ token: 'hr' }], write: () => ({ first: '***', rest: null }) },
        }),
    },
});
