/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FondueRtePlugin, type FrontifyBlockNode, type FrontifyInlineNode } from '#/RichTextEditor';

/** The block type this plugin adds. Part of the assembled FrontifyBlock union at the package root. */
export type QuoteBlock = {
    type: 'quote';
    children: FrontifyInlineNode[];
};

export const isQuoteBlock = (node: FrontifyBlockNode): node is QuoteBlock => node.type === 'quote';

export const QuotePlugin: FondueRtePlugin = {
    id: 'quote',
    schema: {
        blocks: [
            {
                type: 'quote',
                render: ({ children, attributes }) => (
                    <blockquote
                        {...attributes}
                        style={{ margin: 0, paddingLeft: 12, borderLeft: '3px solid #d1d5db', color: '#555' }}
                    >
                        {children}
                    </blockquote>
                ),
                parseRules: [{ tag: 'blockquote' }],
            },
        ],
    },
    toolbar: (api) => {
        const active = api.isBlockActive('quote');
        return (
            <button
                type="button"
                aria-pressed={active}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => (active ? api.setBlockType('paragraph') : api.setBlockType('quote'))}
                style={{
                    fontSize: 13,
                    lineHeight: 1,
                    padding: '3px 8px',
                    border: '1px solid #d1d5db',
                    background: active ? '#e5e7eb' : 'transparent',
                    cursor: 'pointer',
                    borderRadius: 4,
                    color: '#374151',
                    fontFamily: 'inherit',
                }}
            >
                ❝
            </button>
        );
    },
};
