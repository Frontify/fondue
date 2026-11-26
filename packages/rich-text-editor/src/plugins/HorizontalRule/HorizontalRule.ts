/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconDividerSolid } from '@frontify/fondue-icons';

import { defineBlock, defineContent, definePlugin, type MarkdownLinePrefix } from '#/core';
import { translatedLabel } from '#/ui/translation';

import styles from './horizontalRule.module.scss';

/**
 * The void block this plugin adds, a line between two blocks
 */
export type HorizontalRuleBlock = {
    type: 'horizontalRule';
};

const RULE_MARKDOWN: MarkdownLinePrefix = { first: '---', rest: null };

/**
 * A horizontal rule, written as `<hr>` and as `---` in Markdown
 */
export const horizontalRuleContent = defineContent({
    blocks: {
        horizontalRule: defineBlock({
            toHtml: () => ({ tag: 'hr', attrs: { class: styles.rule } }),
            parse: [{ tag: 'hr' }],
            markdown: { read: [{ token: 'hr' }], write: () => RULE_MARKDOWN },
        }),
    },
});

/**
 * A horizontal rule, with a toolbar button and `/` entry that insert a divider
 */
export const horizontalRulePlugin = () =>
    definePlugin({
        id: 'horizontal-rule',
        content: horizontalRuleContent,
        toolbarGroup: 'insert',
        toolbar: [
            {
                label: translatedLabel('RichTextEditor_divider'),
                icon: IconDividerSolid,
                menu: { keywords: ['divider', 'rule', 'line', 'separator'] },
            },
        ],
    });
