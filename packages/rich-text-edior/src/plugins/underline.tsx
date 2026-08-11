/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin } from '#/RichTextEditor';

import { ToolbarButton } from './ToolbarButton';

/** The flag this plugin sets on text nodes. */
export type UnderlineMark = {
    underline?: boolean;
};

export const UnderlinePlugin: RtePlugin = {
    id: 'underline',
    schema: {
        marks: [{ key: 'underline', render: ({ children }) => <u>{children}</u> }],
    },
    toolbar: (api) => (
        <ToolbarButton
            active={api.isMarkActive('underline')}
            onClick={() => api.toggleMark('underline')}
            style={{ textDecoration: 'underline' }}
        >
            U
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-u': (api) => api.toggleMark('underline') },
};
