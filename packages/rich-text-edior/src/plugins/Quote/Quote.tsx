/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteInlineNode, type RtePlugin } from '#/RichTextEditor';

import { ToolbarButton } from '../ToolbarButton/ToolbarButton';

import styles from './quote.module.scss';

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
                render: ({ children }) => <blockquote className={styles.quote}>{children}</blockquote>,
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
