/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineContent, defineMark, definePlugin, isSafeCssColor, isStoredColor, warnOnce } from '#/core';

import { ColorFlyout } from './components/ColorFlyout';
import { type FontColorValue, toExportedColor } from './helpers/colors';

const OPAQUE_BLACK = '#000000';

/** The key the mark is stored under on a text node. */
const FONT_COLOR_MARK = 'fontColor';

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
        [FONT_COLOR_MARK]: defineMark<FontColorValue>({
            // Underline and strikethrough draw their line in the colour of
            // their own element, which a descendant cannot change, so the
            // colour has to be set on an element wrapping them.
            nesting: -1,
            // Typing at the end of coloured text does not carry the colour on.
            inclusive: false,
            // Older documents may hold other colour forms, drawn as written; a value that could be more than a colour stays in the document, out of the style, and is named in development.
            toHtml: (value) => {
                // A stored document may hold anything here, so nothing about the value's shape is taken on trust.
                const color = (value as Partial<FontColorValue> | null)?.color;
                if (isStoredColor(color)) {
                    return { tag: 'span', attrs: { style: { color: toExportedColor(color) } }, children: true };
                }
                if (isSafeCssColor(color)) {
                    return { tag: 'span', attrs: { style: { color } }, children: true };
                }
                if (color !== undefined) {
                    warnOnce(
                        `${FONT_COLOR_MARK}:unsafe-color:${String(color)}`,
                        `The "${FONT_COLOR_MARK}" mark holds ${JSON.stringify(color)}, which is not a colour that can go into a style as it is, so it is not drawn.`,
                    );
                }
                return { tag: 'span', attrs: {}, children: true };
            },
            // Only a span whose own style sets a colour is one; stored as hex, so `red` and `#f00` both become `#ff0000`.
            parse: [
                {
                    tag: 'span',
                    value: (_element, read) => {
                        const color = read.color('color');
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
