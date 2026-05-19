/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FondueRtePlugin } from '#/core/plugin';

export const BoldPlugin: FondueRtePlugin = {
    id: 'bold',
    label: 'Bold',
    schema: {
        marks: [
            {
                key: 'bold',
                render: ({ children }) => <strong>{children}</strong>,
            },
        ],
    },
    toolbar: {
        positions: ['top'],
        render: (api) => (
            <button
                type="button"
                aria-pressed={api.isMarkActive('bold')}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => api.toggleMark('bold')}
                style={{
                    fontWeight: 700,
                    fontSize: 13,
                    lineHeight: 1,
                    padding: '3px 8px',
                    border: '1px solid #d1d5db',
                    background: api.isMarkActive('bold') ? '#e5e7eb' : 'transparent',
                    cursor: 'pointer',
                    borderRadius: 4,
                    color: '#374151',
                    fontFamily: 'inherit',
                }}
            >
                B
            </button>
        ),
    },
    hotkeys: [{ keys: 'mod+b', command: (api) => api.toggleMark('bold') }],
    parseHtml: [
        { tag: 'strong', produce: { kind: 'mark', key: 'bold' } },
        { tag: 'b', produce: { kind: 'mark', key: 'bold' } },
    ],
};
