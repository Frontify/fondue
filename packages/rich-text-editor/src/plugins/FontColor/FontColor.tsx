/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineMark, type RtePlugin } from '#/core';

import { ColorFlyout } from './components/ColorFlyout';

/** What a colour carries in the document. */
export type FontColorValue = {
    color: string;
};

/** The value this plugin sets on text nodes. */
export type FontColorMark = {
    fontColor?: FontColorValue;
};

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
            // Any span may be pasted; only one that sets a colour is one.
            parse: [{ tag: 'span', value: (element) => (element.style.color ? { color: element.style.color } : null) }],
        }),
    },
    toolbarItem: ({ api, selection }) => <ColorFlyout selection={selection} api={api} />,
});
