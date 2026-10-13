/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSubscript } from '@frontify/fondue-icons';

import { defineMark, type RtePlugin } from '#/core';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type SubscriptMark = {
    subscript?: true;
};

export const subscriptPlugin = (): RtePlugin => ({
    id: 'subscript',
    marks: {
        subscript: defineMark({
            toHtml: () => ({ tag: 'sub', children: true }),
            parse: [{ tag: 'sub', value: () => ({}) }],
            renderComponent: ({ children }) => <sub>{children}</sub>,
        }),
    },
    toolbarItem: ({ isActive, toggle }) => (
        <ToolbarButton title="Subscript" active={isActive} onClick={() => toggle()}>
            <IconSubscript size={16} />
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-,': (api) => api.marks.toggle('subscript') },
});
