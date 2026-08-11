/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSubscript } from '@frontify/fondue-icons';

import { type RtePlugin } from '#/domain';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

/** The flag this plugin sets on text nodes. */
export type SubscriptMark = {
    subscript?: boolean;
};

export const subscriptPlugin = (): RtePlugin => ({
    id: 'subscript',
    schema: {
        marks: [{ key: 'subscript', render: ({ children }) => <sub>{children}</sub> }],
    },
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
