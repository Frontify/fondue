/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatBold } from '@frontify/fondue-icons';

import { type RtePlugin } from '#/RichTextEditor';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

/** The flag this plugin sets on text nodes. */
export type BoldMark = {
    bold?: boolean;
};

export const boldPlugin = (): RtePlugin => ({
    id: 'bold',
    schema: {
        marks: [{ key: 'bold', render: ({ children }) => <strong>{children}</strong>, parseRules: [{ tag: 'b' }] }],
    },
    toolbar: (api) => (
        <ToolbarButton title="Bold" active={api.isMarkActive('bold')} onClick={() => api.toggleMark('bold')}>
            <IconTextFormatBold size={16} />
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-b': (api) => api.toggleMark('bold') },
});
