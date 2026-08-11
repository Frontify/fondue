/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatItalic } from '@frontify/fondue-icons';

import { type RtePlugin } from '#/RichTextEditor';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

/** The flag this plugin sets on text nodes. */
export type ItalicMark = {
    italic?: boolean;
};

export const italicPlugin = (): RtePlugin => ({
    id: 'italic',
    schema: {
        marks: [{ key: 'italic', render: ({ children }) => <em>{children}</em>, parseRules: [{ tag: 'i' }] }],
    },
    toolbar: (api) => (
        <ToolbarButton title="Italic" active={api.isMarkActive('italic')} onClick={() => api.toggleMark('italic')}>
            <IconTextFormatItalic size={16} />
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-i': (api) => api.toggleMark('italic') },
});
