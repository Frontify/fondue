/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSubscript } from '@frontify/fondue-icons';

import { type RtePlugin } from '#/core';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type SubscriptMark = {
    subscript?: true;
};

export const subscriptPlugin = (): RtePlugin => ({
    id: 'subscript',
    schema: [
        {
            kind: 'mark',
            type: 'subscript',
            toDom: () => ({ tag: 'sub', children: true }),
            renderComponent: ({ children }) => <sub>{children}</sub>,
            parseRules: [{ tag: 'sub' }],
        },
    ],
    toolbar: (api) => (
        <ToolbarButton
            title="Subscript"
            active={'subscript' in api.selection.get().marks}
            onClick={() => api.marks.toggle('subscript')}
        >
            <IconSubscript size={16} />
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-,': (api) => api.marks.toggle('subscript') },
});
