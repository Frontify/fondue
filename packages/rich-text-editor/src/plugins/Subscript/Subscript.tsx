/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSubscript } from '@frontify/fondue-icons';

import { defineMark, type RtePlugin } from '#/core';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type SubscriptMark = {
    subscript?: true;
};

/** The key the toolbar button names as its shortcut, so the two cannot drift apart. */
const HOTKEY = 'Mod-,';

/** Subscript text: `<sub>` and `Mod-,`. */
export const subscriptPlugin = (): RtePlugin => ({
    id: 'subscript',
    marks: {
        subscript: defineMark({
            toHtml: () => ({ tag: 'sub', children: true }),
            parse: [{ tag: 'sub' }],
        }),
    },
    toolbarGroup: 'marks',
    toolbarItem: ({ isActive, isMixed, toggle }) => (
        <ToolbarButton
            title="Subscript"
            shortcut={HOTKEY}
            active={isMixed ? 'mixed' : isActive}
            onClick={() => toggle()}
        >
            <IconSubscript size={20} />
        </ToolbarButton>
    ),
    hotkeys: { [HOTKEY]: (api) => api.marks.toggle('subscript') },
    floatingToolbar: 'inline',
});
