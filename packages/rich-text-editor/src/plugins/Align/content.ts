/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineContent, type StyleMap } from '#/core';

/**
 * Alignment is an attribute on every text block rather than a block type of its
 * own, so it applies to paragraphs, headings, quotes and list items alike,
 * block types this plugin knows nothing about included.
 */
export type AlignAttribute = {
    align?: 'left' | 'center' | 'right' | 'justify';
};

const ALIGN_VALUES: readonly NonNullable<AlignAttribute['align']>[] = ['left', 'center', 'right', 'justify'];

const isAlignment = (value: unknown): value is NonNullable<AlignAttribute['align']> =>
    ALIGN_VALUES.some((alignment) => alignment === value);

/** Text alignment as a block attribute. */
export const alignContent = defineContent({
    blockAttributes: {
        align: {
            // Only the four this plugin offers reach a style: a stored value is
            // not trusted to be one, and anything else could carry more CSS.
            style: (value): StyleMap => (isAlignment(value) ? { 'text-align': value } : {}),
            // Only the four this plugin offers: `start`, `end` or `-webkit-center`
            // pasted from elsewhere would be values no control can show.
            parse: (element) => (isAlignment(element.style.textAlign) ? element.style.textAlign : null),
        },
    },
});
