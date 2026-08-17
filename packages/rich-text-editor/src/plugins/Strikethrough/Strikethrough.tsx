/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatStrikethrough } from '@frontify/fondue-icons';

import { type RtePlugin } from '#/core';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type StrikethroughMark = {
    strikethrough?: true;
};

export const strikethroughPlugin = (): RtePlugin => ({
    id: 'strikethrough',
    schema: [
        {
            kind: 'mark',
            type: 'strikethrough',
            toDom: () => ({ tag: 's', children: true }),
            renderComponent: ({ children }) => <s>{children}</s>,
            parseRules: [{ tag: 's' }, { tag: 'del' }, { tag: 'strike' }],
        },
    ],
    toolbar: (api) => (
        <ToolbarButton
            title="Strikethrough"
            active={'strikethrough' in api.selection.get().marks}
            onClick={() => api.marks.toggle('strikethrough')}
        >
            <IconTextFormatStrikethrough size={16} />
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-Shift-x': (api) => api.marks.toggle('strikethrough') },
    inputRules: [{ kind: 'mark', key: 'strikethrough', delimiter: '~~' }],
});
