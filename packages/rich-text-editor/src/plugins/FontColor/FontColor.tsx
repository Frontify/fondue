/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin } from '#/core';

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
    schema: [
        {
            kind: 'mark',
            type: 'fontColor',
            attributes: { color: { parseFromStyle: 'color' } },
            // Underline and strikethrough draw their line in the colour of
            // their own element, which a descendant cannot change, so the
            // colour has to be set on an element wrapping them.
            nesting: -1,
            toDom: (attrs) => {
                const { color } = attrs as Partial<FontColorValue>;
                return {
                    tag: 'span',
                    attrs: color ? { style: `color: ${color}` } : undefined,
                    children: true,
                };
            },
            renderComponent: ({ value, children }) => {
                const { color } = value as Partial<FontColorValue>;
                return <span style={{ color }}>{children}</span>;
            },
            parseRules: [{ tag: 'span' }],
        },
    ],
    toolbar: (api) => <ColorFlyout api={api} />,
});
