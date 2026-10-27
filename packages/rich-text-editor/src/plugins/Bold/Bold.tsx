/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatBold } from '@frontify/fondue-icons';

import { defineMark, type RtePlugin } from '#/core';

import { declaresBoldWeight, declaresNormalWeight } from '../shared/helpers/declaredStyle';
import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type BoldMark = {
    bold?: true;
};

/** The key the toolbar button names as its shortcut, so the two cannot drift apart. */
const HOTKEY = 'Mod-b';

/** Bold text: `<strong>`, `Mod-b`, and `**text**` while typing. */
export const boldPlugin = (): RtePlugin => ({
    id: 'bold',
    marks: {
        bold: defineMark({
            toHtml: () => ({ tag: 'strong', children: true }),
            // Pasted HTML says bold in more ways than the tags: Google Docs
            // writes a span with a weight, and wraps everything it copies in
            // a `<b>` that sets the weight back to normal.
            parse: [
                { tag: 'strong', value: (element) => (declaresNormalWeight(element) ? null : {}) },
                { tag: 'b', value: (element) => (declaresNormalWeight(element) ? null : {}) },
                { tag: 'span', value: (element) => (declaresBoldWeight(element) ? {} : null) },
            ],
        }),
    },
    toolbarItem: ({ isActive, toggle }) => (
        <ToolbarButton title="Bold" shortcut={HOTKEY} active={isActive} onClick={() => toggle()}>
            <IconTextFormatBold size={16} />
        </ToolbarButton>
    ),
    hotkeys: { [HOTKEY]: (api) => api.marks.toggle('bold') },
    inputRules: [{ kind: 'mark', key: 'bold', delimiter: '**' }],
});
