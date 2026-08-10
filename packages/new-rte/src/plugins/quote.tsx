/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteInlineNode, type RtePlugin } from '#/RichTextEditor';

import { ToolbarButton } from './ToolbarButton';

/** The block type this plugin adds. Part of the assembled RteBlock union at the package root. */
export type QuoteBlock = {
    type: 'quote';
    children: RteInlineNode[];
};

export const QuotePlugin: RtePlugin = {
    id: 'quote',
    schema: {
        blocks: [
            {
                type: 'quote',
                render: ({ children }) => (
                    <blockquote style={{ margin: 0, paddingLeft: 12, borderLeft: '3px solid #d1d5db', color: '#555' }}>
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
            <ToolbarButton active={active} onClick={() => api.setBlockType(active ? 'paragraph' : 'quote')}>
                ❝
            </ToolbarButton>
        );
    },
};
