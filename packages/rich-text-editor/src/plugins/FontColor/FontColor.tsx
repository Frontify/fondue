/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin } from '#/domain';

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
    schema: {
        marks: [
            {
                key: 'fontColor',
                attributes: { color: { parseFromStyle: 'color' } },
                // Underline and strikethrough draw their line in the colour of
                // their own element, which a descendant cannot change — so the
                // colour has to be set on an element that wraps them.
                nesting: -1,
                render: ({ value, children }) => {
                    // A render function knows what it declared, so it reads its own
                    // value. Partial: a pasted span without a colour leaves it unset.
                    const { color } = value as Partial<FontColorValue>;
                    return <span style={{ color }}>{children}</span>;
                },
            },
        ],
    },
    toolbar: (api) => <ColorFlyout api={api} />,
});
