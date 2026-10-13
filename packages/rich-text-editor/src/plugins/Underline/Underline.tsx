/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatUnderline } from '@frontify/fondue-icons';

import { defineMark, type RtePlugin } from '#/core';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type UnderlineMark = {
    underline?: true;
};

export const underlinePlugin = (): RtePlugin => ({
    id: 'underline',
    marks: {
        underline: defineMark({
            toHtml: () => ({ tag: 'u', children: true }),
            parse: [{ tag: 'u' }],
        }),
    },
    toolbarItem: ({ isActive, toggle }) => (
        <ToolbarButton title="Underline" active={isActive} onClick={() => toggle()}>
            <IconTextFormatUnderline size={16} />
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-u': (api) => api.marks.toggle('underline') },
    inputRules: [{ kind: 'mark', key: 'underline', delimiter: '_' }],
});
