/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin } from '#/RichTextEditor';

import { ToolbarButton } from './ToolbarButton';

/** The flag this plugin sets on text nodes. */
export type CodeMark = {
    code?: boolean;
};

export const CodePlugin: RtePlugin = {
    id: 'code',
    schema: {
        marks: [{ key: 'code', render: ({ children }) => <code>{children}</code> }],
    },
    toolbar: (api) => (
        <ToolbarButton
            active={api.isMarkActive('code')}
            onClick={() => api.toggleMark('code')}
            style={{ fontFamily: 'ui-monospace, monospace' }}
        >
            {'</>'}
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-e': (api) => api.toggleMark('code') },
    styles: `
code {
    background: #f3f4f6;
    border-radius: 3px;
    padding: 0 3px;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.9em;
}
`,
};
