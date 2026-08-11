/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin } from '#/RichTextEditor';

import { ToolbarButton } from '../ToolbarButton/ToolbarButton';

/** The flag this plugin sets on text nodes. */
export type SubscriptMark = {
    subscript?: boolean;
};

export const SubscriptPlugin: RtePlugin = {
    id: 'subscript',
    schema: {
        marks: [{ key: 'subscript', render: ({ children }) => <sub>{children}</sub> }],
    },
    toolbar: (api) => (
        <ToolbarButton active={api.isMarkActive('subscript')} onClick={() => api.toggleMark('subscript')}>
            X₂
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-,': (api) => api.toggleMark('subscript') },
};
