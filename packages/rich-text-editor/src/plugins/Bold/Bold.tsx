/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatBold } from '@frontify/fondue-icons';

import { type RtePlugin } from '#/core';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type BoldMark = {
    bold?: true;
};

export const boldPlugin = (): RtePlugin => ({
    id: 'bold',
    schema: [
        {
            kind: 'mark',
            type: 'bold',
            toDom: () => ({ tag: 'strong', children: true }),
            renderComponent: ({ children }) => <strong>{children}</strong>,
            parseRules: [{ tag: 'strong' }, { tag: 'b' }],
        },
    ],
    toolbar: (api) => (
        <ToolbarButton
            title="Bold"
            active={'bold' in api.selection.get().marks}
            onClick={() => api.marks.toggle('bold')}
        >
            <IconTextFormatBold size={16} />
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-b': (api) => api.marks.toggle('bold') },
    inputRules: [{ kind: 'mark', key: 'bold', delimiter: '**' }],
});
