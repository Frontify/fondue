/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatItalic } from '@frontify/fondue-icons';

import { defineMark, type RtePlugin } from '#/core';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type ItalicMark = {
    italic?: true;
};

export const italicPlugin = (): RtePlugin => ({
    id: 'italic',
    marks: {
        italic: defineMark({
            toHtml: () => ({ tag: 'em', children: true }),
            parse: [
                { tag: 'em', value: () => ({}) },
                { tag: 'i', value: () => ({}) },
            ],
            renderComponent: ({ children }) => <em>{children}</em>,
        }),
    },
    toolbarItem: ({ isActive, toggle }) => (
        <ToolbarButton title="Italic" active={isActive} onClick={() => toggle()}>
            <IconTextFormatItalic size={16} />
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-i': (api) => api.marks.toggle('italic') },
    inputRules: [{ kind: 'mark', key: 'italic', delimiter: '*' }],
});
