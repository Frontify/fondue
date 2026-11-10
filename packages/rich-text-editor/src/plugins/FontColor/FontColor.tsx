/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineContent, defineMark, definePlugin } from '#/core';

import { declaredStyle } from '../shared/helpers/declaredStyle';

import { ColorFlyout } from './components/ColorFlyout';
import { type FontColorValue, isCssColor, parseCssColor } from './helpers/colors';

/**
 * The value this plugin sets on text nodes
 */
export type FontColorMark = {
    /**
     * The colour of the text
     */
    fontColor?: FontColorValue;
};

// Word processors write black onto every run they copy; kept, it would pin the text to black in a dark theme.
const DEFAULT_TEXT_KEYWORD = /^(black|windowtext|canvastext|inherit|initial|unset|currentcolor)$/i;

const isDefaultTextColor = (color: string): boolean => {
    if (DEFAULT_TEXT_KEYWORD.test(color)) {
        return true;
    }
    const parsed = parseCssColor(color);
    return parsed !== undefined && parsed.red === 0 && parsed.green === 0 && parsed.blue === 0 && parsed.alpha === 1;
};

/**
 * Text colour as a mark
 */
export const fontColorContent = /* @__PURE__ */ defineContent({
    marks: {
        fontColor: /* @__PURE__ */ defineMark<FontColorValue>({
            // Underline and strikethrough draw their line in the colour of
            // their own element, which a descendant cannot change, so the
            // colour has to be set on an element wrapping them.
            nesting: -1,
            // Typing at the end of coloured text does not carry the colour on.
            inclusive: false,
            // A stored colour that is not one is left out rather than written into the style.
            toHtml: (value) => {
                const color = (value as Partial<FontColorValue> | null)?.color;
                return { tag: 'span', attrs: isCssColor(color) ? { style: { color } } : {}, children: true };
            },
            // Any span may be pasted; only one that sets a colour itself is
            // one. Read as written, so `#f00` stays `#f00`.
            parse: [
                {
                    tag: 'span',
                    value: (element) => {
                        const color = declaredStyle(element, 'color');
                        return color === null || !isCssColor(color) || isDefaultTextColor(color) ? null : { color };
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
    toolbar: [{ label: 'Text colour', render: ColorFlyout }],
});
