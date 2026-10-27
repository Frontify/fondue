/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatUnderline } from '@frontify/fondue-icons';

import { defineMark, type RtePlugin } from '#/core';

import { declaresDecoration } from '../shared/helpers/declaredStyle';
import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type UnderlineMark = {
    underline?: true;
};

/** The key the toolbar button names as its shortcut, so the two cannot drift apart. */
const HOTKEY = 'Mod-u';

/** Underlined text: `<u>` and `Mod-u`. */
export const underlinePlugin = (): RtePlugin => ({
    id: 'underline',
    marks: {
        underline: defineMark({
            toHtml: () => ({ tag: 'u', children: true }),
            // A span with the decoration is underlined too: how Google Docs writes it.
            parse: [
                { tag: 'u' },
                { tag: 'span', value: (element) => (declaresDecoration(element, 'underline') ? {} : null) },
            ],
        }),
    },
    toolbarItem: ({ isActive, toggle }) => (
        <ToolbarButton title="Underline" shortcut={HOTKEY} active={isActive} onClick={() => toggle()}>
            <IconTextFormatUnderline size={16} />
        </ToolbarButton>
    ),
    hotkeys: { [HOTKEY]: (api) => api.marks.toggle('underline') },
});
