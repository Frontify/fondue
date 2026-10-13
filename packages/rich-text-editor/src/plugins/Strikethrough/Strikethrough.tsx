/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatStrikethrough } from '@frontify/fondue-icons';

import { defineMark, type RtePlugin } from '#/core';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type StrikethroughMark = {
    strikethrough?: true;
};

export const strikethroughPlugin = (): RtePlugin => ({
    id: 'strikethrough',
    marks: {
        strikethrough: defineMark({
            toHtml: () => ({ tag: 's', children: true }),
            parse: [{ tag: 's' }, { tag: 'del' }, { tag: 'strike' }],
        }),
    },
    toolbarItem: ({ isActive, toggle }) => (
        <ToolbarButton title="Strikethrough" active={isActive} onClick={() => toggle()}>
            <IconTextFormatStrikethrough size={16} />
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-Shift-x': (api) => api.marks.toggle('strikethrough') },
    inputRules: [{ kind: 'mark', key: 'strikethrough', delimiter: '~~' }],
});
