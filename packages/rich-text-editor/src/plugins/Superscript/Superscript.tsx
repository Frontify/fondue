/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSuperscript } from '@frontify/fondue-icons';

import { defineMark, type RtePlugin } from '#/core';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type SuperscriptMark = {
    superscript?: true;
};

/** The key the toolbar button names as its shortcut, so the two cannot drift apart. */
const HOTKEY = 'Mod-.';

/** Superscript text: `<sup>` and `Mod-.`. Lives in the floating toolbar overflow. */
export const superscriptPlugin = (): RtePlugin => ({
    id: 'superscript',
    marks: {
        superscript: defineMark({
            toHtml: () => ({ tag: 'sup', children: true }),
            parse: [{ tag: 'sup' }],
        }),
    },
    toolbarItem: ({ isActive, toggle }) => (
        <ToolbarButton title="Superscript" shortcut={HOTKEY} active={isActive} onClick={() => toggle()}>
            <IconSuperscript size={16} />
        </ToolbarButton>
    ),
    hotkeys: { [HOTKEY]: (api) => api.marks.toggle('superscript') },
    floatingToolbar: 'overflow',
});
