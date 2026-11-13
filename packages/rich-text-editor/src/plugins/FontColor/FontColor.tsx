/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineContent, defineMark, definePlugin } from '#/core';

import { declaredStyle } from '../shared/helpers/declaredStyle';

import { ColorFlyout } from './components/ColorFlyout';
import { type FontColorValue, toExportedColor, toStoredColor } from './helpers/colors';

const OPAQUE_BLACK = '#000000';

/** The value this plugin sets on text nodes. */
export type FontColorMark = {
    /**
     * The colour of the text
     */
    fontColor?: FontColorValue;
};

/**
 * Text colour as a mark
 */
export const fontColorContent = defineContent({
    marks: {
        fontColor: defineMark<FontColorValue>({
            // Underline and strikethrough draw their line in the colour of
            // their own element, which a descendant cannot change, so the
            // colour has to be set on an element wrapping them.
            nesting: -1,
            // Typing at the end of coloured text does not carry the colour on.
            inclusive: false,
            // A stored value that is no colour is left out rather than written into the style.
            toHtml: (value) => {
                // A stored document may hold anything here, so nothing about the value's shape is taken on trust.
                const color = toStoredColor((value as Partial<FontColorValue> | null)?.color);
                if (color === undefined) {
                    return { tag: 'span', attrs: {}, children: true };
                }
                return { tag: 'span', attrs: { style: { color: toExportedColor(color) } }, children: true };
            },
            // Only a span whose own style sets a colour is one; stored as hex, so `red` and `#f00` both become `#ff0000`.
            parse: [
                {
                    tag: 'span',
                    value: (element) => {
                        const declared = declaredStyle(element, 'color');
                        const color = toStoredColor(declared);
                        // Word processors write opaque black on every run; kept, it would pin text to black in a dark theme.
                        if (color === undefined || color === OPAQUE_BLACK) {
                            return null;
                        }
                        return { color };
                    },
                },
            ],
        }),
    },
});

/**
 * Text colour, picked from a flyout in the toolbar
 */
export const fontColorPlugin = /* @__PURE__ */ definePlugin({
    id: 'font-color',
    content: fontColorContent,
    toolbarGroup: 'color',
    toolbar: [{ label: 'Text colour', render: ColorFlyout }],
});
