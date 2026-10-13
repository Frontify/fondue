/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSpeechBubbleQuote } from '@frontify/fondue-icons';

import { type RteInlineNode, type RtePlugin } from '#/core';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

import styles from './quote.module.scss';

/** The block type this plugin adds. Part of the assembled RteBlock union at the package root. */
export type QuoteBlock = {
    type: 'quote';
    children: RteInlineNode[];
};

export const quotePlugin = (): RtePlugin => ({
    id: 'quote',
    schema: [
        {
            kind: 'block',
            type: 'quote',
            children: 'text',
            toDom: () => ({ tag: 'blockquote', attrs: { class: styles.quote ?? '' }, children: true }),
            renderComponent: ({ children }) => <blockquote className={styles.quote}>{children}</blockquote>,
            parseRules: [{ tag: 'blockquote' }],
        },
    ],
    // Toggling a text block switches between it and the paragraph.
    toolbarItem: ({ isActive, toggle }) => (
        <ToolbarButton title="Quote" active={isActive} onClick={() => toggle()}>
            <IconSpeechBubbleQuote size={16} />
        </ToolbarButton>
    ),
    inputRules: [{ kind: 'block', match: '> ', block: 'quote' }],
});
