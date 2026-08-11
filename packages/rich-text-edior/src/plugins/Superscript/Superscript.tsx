/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSuperscript } from '@frontify/fondue-icons';

import { definePlugin } from '#/RichTextEditor';

import { ToolbarButton } from '../ToolbarButton/ToolbarButton';

/** The flag this plugin sets on text nodes. */
export type SuperscriptMark = {
    superscript?: boolean;
};

export const SuperscriptPlugin = definePlugin(() => ({
    id: 'superscript',
    schema: {
        marks: [{ key: 'superscript', render: ({ children }) => <sup>{children}</sup> }],
    },
    toolbar: (api) => (
        <ToolbarButton
            title="Superscript"
            active={api.isMarkActive('superscript')}
            onClick={() => api.toggleMark('superscript')}
        >
            <IconSuperscript size={16} />
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-.': (api) => api.toggleMark('superscript') },
}));
