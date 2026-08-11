/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/RichTextEditor';

import { ColorSelect } from './components/ColorSelect';

/** The value this plugin sets on text nodes. */
export type FontColorMark = {
    fontColor?: { color: string };
};

export const FontColorPlugin = definePlugin(() => ({
    id: 'font-color',
    schema: {
        marks: [
            {
                key: 'fontColor',
                attributes: { color: { parseFromStyle: 'color' } },
                // Underline and strikethrough draw their line in the colour of
                // their own element, which a descendant cannot change — so the
                // colour has to be set on an element that wraps them.
                nesting: -1,
                render: ({ value, children }) => <span style={{ color: String(value.color) }}>{children}</span>,
            },
        ],
    },
    toolbar: (api) => <ColorSelect api={api} />,
}));
