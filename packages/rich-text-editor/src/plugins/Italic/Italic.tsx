/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatItalic } from '@frontify/fondue-icons';

import { type RtePlugin } from '#/core';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type ItalicMark = {
    italic?: true;
};

export const italicPlugin = (): RtePlugin => ({
    id: 'italic',
    schema: [
        {
            kind: 'mark',
            type: 'italic',
            toDom: () => ({ tag: 'em', children: true }),
            renderComponent: ({ children }) => <em>{children}</em>,
            parseRules: [{ tag: 'em' }, { tag: 'i' }],
        },
    ],
    toolbar: (api) => (
        <ToolbarButton
            title="Italic"
            active={'italic' in api.selection.get().marks}
            onClick={() => api.marks.toggle('italic')}
        >
            <IconTextFormatItalic size={16} />
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-i': (api) => api.marks.toggle('italic') },
    inputRules: [{ kind: 'mark', key: 'italic', delimiter: '*' }],
});
