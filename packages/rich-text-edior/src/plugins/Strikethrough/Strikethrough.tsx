/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatStrikethrough } from '@frontify/fondue-icons';

import { definePlugin } from '#/RichTextEditor';

import { ToolbarButton } from '../ToolbarButton/ToolbarButton';

/** The flag this plugin sets on text nodes. */
export type StrikethroughMark = {
    strikethrough?: boolean;
};

export const StrikethroughPlugin = definePlugin(() => ({
    id: 'strikethrough',
    schema: {
        marks: [
            {
                key: 'strikethrough',
                render: ({ children }) => <s>{children}</s>,
                parseRules: [{ tag: 'del' }, { tag: 'strike' }],
            },
        ],
    },
    toolbar: (api) => (
        <ToolbarButton
            title="Strikethrough"
            active={api.isMarkActive('strikethrough')}
            onClick={() => api.toggleMark('strikethrough')}
        >
            <IconTextFormatStrikethrough size={16} />
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-Shift-x': (api) => api.toggleMark('strikethrough') },
}));
