/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatBold } from '@frontify/fondue-icons';

import { defineMark, type RtePlugin } from '#/core';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type BoldMark = {
    bold?: true;
};

export const boldPlugin = (): RtePlugin => ({
    id: 'bold',
    marks: {
        bold: defineMark({
            toHtml: () => ({ tag: 'strong', children: true }),
            parse: [{ tag: 'strong' }, { tag: 'b' }],
        }),
    },
    toolbarItem: ({ isActive, toggle }) => (
        <ToolbarButton title="Bold" active={isActive} onClick={() => toggle()}>
            <IconTextFormatBold size={16} />
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-b': (api) => api.marks.toggle('bold') },
    inputRules: [{ kind: 'mark', key: 'bold', delimiter: '**' }],
});
