/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatUnderline } from '@frontify/fondue-icons';

import { definePlugin } from '#/RichTextEditor';

import { ToolbarButton } from '../ToolbarButton/ToolbarButton';

/** The flag this plugin sets on text nodes. */
export type UnderlineMark = {
    underline?: boolean;
};

export const UnderlinePlugin = definePlugin(() => ({
    id: 'underline',
    schema: {
        marks: [{ key: 'underline', render: ({ children }) => <u>{children}</u> }],
    },
    toolbar: (api) => (
        <ToolbarButton
            title="Underline"
            active={api.isMarkActive('underline')}
            onClick={() => api.toggleMark('underline')}
        >
            <IconTextFormatUnderline size={16} />
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-u': (api) => api.toggleMark('underline') },
}));
