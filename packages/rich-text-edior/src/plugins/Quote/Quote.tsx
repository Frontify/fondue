/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSpeechBubbleQuote } from '@frontify/fondue-icons';

import { PARAGRAPH, type RteInlineNode, type RtePlugin } from '#/domain';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

import styles from './quote.module.scss';

/** The block type this plugin adds. Part of the assembled RteBlock union at the package root. */
export type QuoteBlock = {
    type: 'quote';
    children: RteInlineNode[];
};

export const quotePlugin = (): RtePlugin => ({
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
        // A quote holds text, so it is the block the selection is in — never one
        // wrapped around it.
        const active = api.selection.get().block?.type === 'quote';
        return (
            <ToolbarButton
                title="Quote"
                active={active}
                onClick={() => api.blocks.setType(active ? PARAGRAPH : 'quote')}
            >
                <IconSpeechBubbleQuote size={16} />
            </ToolbarButton>
        );
    },
    inputRules: [{ kind: 'block', match: '> ', block: 'quote' }],
});
