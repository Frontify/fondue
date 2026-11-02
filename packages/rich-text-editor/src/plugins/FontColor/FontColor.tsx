/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineMark, type RtePlugin } from '#/core';

import { declaredStyle } from '../shared/helpers/declaredStyle';

import { ColorFlyout } from './components/ColorFlyout';
import { type FontColorValue, isStoredColor, parseCssColor, toExportedColor, toStoredColor } from './helpers/colors';

/** The value this plugin sets on text nodes. */
export type FontColorMark = {
    fontColor?: FontColorValue;
};

/**
 * Opaque black says "ordinary text" rather than picks a colour: word processors
 * write it onto every run they copy, and kept, it would pin the text to black in
 * a dark theme. Keywords such as `inherit` or `windowtext` are no colour at all.
 */
const isDefaultTextColor = (color: string): boolean => {
    const parsed = parseCssColor(color);
    return parsed !== undefined && parsed.red === 0 && parsed.green === 0 && parsed.blue === 0 && parsed.alpha === 1;
};

/** Text colour as a mark, picked from a flyout in the toolbar. */
export const fontColorPlugin = (): RtePlugin => ({
    id: 'font-color',
    marks: {
        fontColor: defineMark<FontColorValue>({
            // Underline and strikethrough draw their line in the colour of
            // their own element, which a descendant cannot change, so the
            // colour has to be set on an element wrapping them.
            nesting: -1,
            // Typing at the end of coloured text does not carry the colour on.
            inclusive: false,
            // A stored value that is not a stored colour is left out rather than written into the style.
            toHtml: (value) => {
                const color = (value as Partial<FontColorValue> | null)?.color;
                if (!isStoredColor(color)) {
                    return { tag: 'span', attrs: {}, children: true };
                }
                return { tag: 'span', attrs: { style: { color: toExportedColor(color) } }, children: true };
            },
            // Any span may be pasted; only one that sets a colour itself is
            // one. Stored as hex, so `red` and `#f00` both become `#ff0000`.
            parse: [
                {
                    tag: 'span',
                    value: (element) => {
                        const declared = declaredStyle(element, 'color');
                        if (declared === null || isDefaultTextColor(declared)) {
                            return null;
                        }
                        const color = toStoredColor(declared);
                        if (color === undefined) {
                            return null;
                        }
                        return { color };
                    },
                },
            ],
        }),
    },
    toolbarItem: ({ api, selection }) => <ColorFlyout selection={selection} api={api} />,
});
