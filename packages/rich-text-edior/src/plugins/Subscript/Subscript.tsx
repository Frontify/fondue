/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSubscript } from '@frontify/fondue-icons';

import { definePlugin } from '#/RichTextEditor';

import { ToolbarButton } from '../ToolbarButton/ToolbarButton';

/** The flag this plugin sets on text nodes. */
export type SubscriptMark = {
    subscript?: boolean;
};

export const SubscriptPlugin = definePlugin(() => ({
    id: 'subscript',
    schema: {
        marks: [{ key: 'subscript', render: ({ children }) => <sub>{children}</sub> }],
    },
    toolbar: (api) => (
        <ToolbarButton
            title="Subscript"
            active={api.isMarkActive('subscript')}
            onClick={() => api.toggleMark('subscript')}
        >
            <IconSubscript size={16} />
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-,': (api) => api.toggleMark('subscript') },
}));
