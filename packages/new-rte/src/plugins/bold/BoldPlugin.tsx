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
                    padding: '4px 10px',
                    border: '1px solid #ccc',
                    background: api.isMarkActive('bold') ? '#e6e6e6' : '#fff',
                    cursor: 'pointer',
                    borderRadius: 4,
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
