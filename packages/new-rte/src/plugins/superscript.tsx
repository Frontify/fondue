/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin } from '#/RichTextEditor';

import { ToolbarButton } from './ToolbarButton';

/** The flag this plugin sets on text nodes. */
export type SuperscriptMark = {
    superscript?: boolean;
};

export const SuperscriptPlugin: RtePlugin = {
    id: 'superscript',
    schema: {
        marks: [{ key: 'superscript', render: ({ children }) => <sup>{children}</sup> }],
    },
    toolbar: (api) => (
        <ToolbarButton active={api.isMarkActive('superscript')} onClick={() => api.toggleMark('superscript')}>
            X²
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-.': (api) => api.toggleMark('superscript') },
};
