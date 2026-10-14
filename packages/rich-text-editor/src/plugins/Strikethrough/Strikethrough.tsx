/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatStrikethrough } from '@frontify/fondue-icons';

import { defineMark, type RtePlugin } from '#/core';

import { declaresDecoration } from '../shared/helpers/declaredStyle';
import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type StrikethroughMark = {
    strikethrough?: true;
};

/** The key the toolbar button names as its shortcut, so the two cannot drift apart. */
const HOTKEY = 'Mod-Shift-x';

/** Struck-through text: `<s>`, `Mod-Shift-x`, and `~~text~~` while typing. */
export const strikethroughPlugin = (): RtePlugin => ({
    id: 'strikethrough',
    marks: {
        strikethrough: defineMark({
            toHtml: () => ({ tag: 's', children: true }),
            // A span with the decoration is struck through too: how Google Docs writes it.
            parse: [
                { tag: 's' },
                { tag: 'del' },
                { tag: 'strike' },
                { tag: 'span', value: (element) => (declaresDecoration(element, 'line-through') ? {} : null) },
            ],
        }),
    },
    toolbarItem: ({ isActive, toggle }) => (
        <ToolbarButton title="Strikethrough" shortcut={HOTKEY} active={isActive} onClick={() => toggle()}>
            <IconTextFormatStrikethrough size={16} />
        </ToolbarButton>
    ),
    hotkeys: { [HOTKEY]: (api) => api.marks.toggle('strikethrough') },
    inputRules: [{ kind: 'mark', key: 'strikethrough', delimiter: '~~' }],
});
