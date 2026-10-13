/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSuperscript } from '@frontify/fondue-icons';

import { defineMark, type RtePlugin } from '#/core';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type SuperscriptMark = {
    superscript?: true;
};

export const superscriptPlugin = (): RtePlugin => ({
    id: 'superscript',
    marks: {
        superscript: defineMark({
            toHtml: () => ({ tag: 'sup', children: true }),
            parse: [{ tag: 'sup' }],
        }),
    },
    toolbarItem: ({ isActive, toggle }) => (
        <ToolbarButton title="Superscript" active={isActive} onClick={() => toggle()}>
            <IconSuperscript size={16} />
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-.': (api) => api.marks.toggle('superscript') },
});
