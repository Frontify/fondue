/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FondueRtePlugin } from '#/RichTextEditor';

/** The flag this plugin sets on text nodes. */
export type ItalicMark = {
    italic?: boolean;
};

export const ItalicPlugin: FondueRtePlugin = {
    id: 'italic',
    schema: {
        marks: [
            {
                key: 'italic',
                render: ({ children }) => <em>{children}</em>,
                parseRules: [{ tag: 'i' }],
            },
        ],
    },
    toolbar: (api) => (
        <button
            type="button"
            aria-pressed={api.isMarkActive('italic')}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => api.toggleMark('italic')}
            style={{
                fontStyle: 'italic',
                fontSize: 13,
                lineHeight: 1,
                padding: '3px 8px',
                border: '1px solid #d1d5db',
                background: api.isMarkActive('italic') ? '#e5e7eb' : 'transparent',
                cursor: 'pointer',
                borderRadius: 4,
                color: '#374151',
                fontFamily: 'inherit',
            }}
        >
            I
        </button>
    ),
    hotkeys: { 'Mod-i': (api) => api.toggleMark('italic') },
};
