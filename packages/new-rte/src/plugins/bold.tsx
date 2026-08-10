/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin } from '#/RichTextEditor';

import { ToolbarButton } from './ToolbarButton';

/** The flag this plugin sets on text nodes. */
export type BoldMark = {
    bold?: boolean;
};

export const BoldPlugin: RtePlugin = {
    id: 'bold',
    schema: {
        marks: [{ key: 'bold', render: ({ children }) => <strong>{children}</strong>, parseRules: [{ tag: 'b' }] }],
    },
    toolbar: (api) => (
        <ToolbarButton
            active={api.isMarkActive('bold')}
            onClick={() => api.toggleMark('bold')}
            style={{ fontWeight: 700 }}
        >
            B
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-b': (api) => api.toggleMark('bold') },
};
