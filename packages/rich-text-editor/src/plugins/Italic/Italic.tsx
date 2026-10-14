/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatItalic } from '@frontify/fondue-icons';

import { defineMark, type RtePlugin } from '#/core';

import { declaredStyle } from '../shared/helpers/declaredStyle';
import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type ItalicMark = {
    italic?: true;
};

/** The key the toolbar button names as its shortcut, so the two cannot drift apart. */
const HOTKEY = 'Mod-i';

/** Italic text: `<em>`, `Mod-i`, and `*text*` or `_text_` while typing. */
export const italicPlugin = (): RtePlugin => ({
    id: 'italic',
    marks: {
        italic: defineMark({
            toHtml: () => ({ tag: 'em', children: true }),
            // A span with the style is italic too: how Google Docs writes it.
            parse: [
                { tag: 'em' },
                { tag: 'i' },
                { tag: 'span', value: (element) => (declaredStyle(element, 'font-style') === 'italic' ? {} : null) },
            ],
        }),
    },
    toolbarItem: ({ isActive, toggle }) => (
        <ToolbarButton title="Italic" shortcut={HOTKEY} active={isActive} onClick={() => toggle()}>
            <IconTextFormatItalic size={16} />
        </ToolbarButton>
    ),
    hotkeys: { [HOTKEY]: (api) => api.marks.toggle('italic') },
    // `_text_` is emphasis in markdown, as `*text*` is.
    inputRules: [
        { kind: 'mark', key: 'italic', delimiter: '*' },
        { kind: 'mark', key: 'italic', delimiter: '_' },
    ],
});
