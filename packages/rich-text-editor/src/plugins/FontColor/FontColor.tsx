/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineMark, type RtePlugin } from '#/core';

import { declaredStyle } from '../shared/helpers/declaredStyle';

import { ColorFlyout } from './components/ColorFlyout';
import { type FontColorValue, parseCssColor } from './helpers/colors';

/** The value this plugin sets on text nodes. */
export type FontColorMark = {
    fontColor?: FontColorValue;
};

/**
 * Colours that say "ordinary text" rather than pick one. Word processors write
 * black onto every run they copy, and a colour inherited from the page is no
 * choice either — kept, they would pin the text to black in a dark theme.
 */
const DEFAULT_TEXT_KEYWORD = /^(black|windowtext|canvastext|inherit|initial|unset|currentcolor)$/i;

const isDefaultTextColor = (color: string): boolean => {
    if (DEFAULT_TEXT_KEYWORD.test(color)) {
        return true;
    }
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
            toHtml: ({ color }) => ({ tag: 'span', attrs: { style: { color } }, children: true }),
            // Any span may be pasted; only one that sets a colour itself is
            // one. Read as written, so `#f00` stays `#f00`.
            parse: [
                {
                    tag: 'span',
                    value: (element) => {
                        const color = declaredStyle(element, 'color');
                        return color === null || isDefaultTextColor(color) ? null : { color };
                    },
                },
            ],
        }),
    },
    toolbarItem: ({ api, selection }) => <ColorFlyout selection={selection} api={api} />,
});
