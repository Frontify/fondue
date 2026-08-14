/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSuperscript } from '@frontify/fondue-icons';

import { type RtePlugin } from '#/domain';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type SuperscriptMark = {
    superscript?: true;
};

export const superscriptPlugin = (): RtePlugin => ({
    id: 'superscript',
    schema: {
        marks: [{ key: 'superscript', render: ({ children }) => <sup>{children}</sup> }],
    },
    toolbar: (api) => (
        <ToolbarButton
            title="Superscript"
            active={'superscript' in api.selection.get().marks}
            onClick={() => api.marks.toggle('superscript')}
        >
            <IconSuperscript size={16} />
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-.': (api) => api.marks.toggle('superscript') },
});
