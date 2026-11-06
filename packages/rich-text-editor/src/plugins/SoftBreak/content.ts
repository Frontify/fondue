/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineContent, defineInline } from '#/core';

/** A line break inside a block: the void inline this plugin adds. */
export type BreakInline = {
    type: 'break';
};

/** A line break: `<br>`. */
export const softBreakContent = defineContent({
    inlines: {
        break: defineInline({
            toHtml: () => ({ tag: 'br' }),
            parse: [{ tag: 'br' }],
        }),
    },
});
