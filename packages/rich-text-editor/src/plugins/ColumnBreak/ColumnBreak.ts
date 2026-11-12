/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextColumnBreak } from '@frontify/fondue-icons';

import { defineBlock, defineContent, definePlugin } from '#/core';

import styles from './columnBreak.module.scss';

/**
 * The void block this plugin adds, where the next column starts
 */
export type ColumnBreakBlock = {
    type: 'columnBreak';
};

export type ColumnBreakPluginOptions = {
    /**
     * How many columns the content is laid out in
     * @default 2
     */
    columns?: number;
    /**
     * The gap between the columns, as a CSS length such as `'24px'`
     * @default 'normal'
     */
    gap?: string;
};

/**
 * Lays the content out in columns, with a block that marks where each column ends
 */
export const columnBreakContent = ({ columns = 2, gap = 'normal' }: ColumnBreakPluginOptions = {}) =>
    defineContent({
        blocks: {
            columnBreak: defineBlock({
                // Its stylesheet writes its margins, which the document must not replace.
                ownsMargins: true,
                toHtml: () => ({
                    tag: 'div',
                    attrs: {
                        'data-column-break': '',
                        class: styles.break,
                        role: 'separator',
                        'aria-label': 'Column break',
                    },
                }),
                parse: [{ tag: 'div[data-column-break]' }],
            }),
        },
        // The layout belongs to the content as a whole, so it goes on the editable
        // element; the options reach the stylesheet as custom properties.
        contentClassName: styles.columns,
        contentProperties: {
            '--rte-columns': String(columns),
            '--rte-column-gap': gap,
        },
    });

/**
 * Lays the content out in columns, with a toolbar button and `/` entry that insert a column break
 */
export const columnBreakPlugin = (options: ColumnBreakPluginOptions = {}) =>
    definePlugin({
        id: 'column-break',
        content: columnBreakContent(options),
        toolbarGroup: 'insert',
        toolbar: [
            { label: 'Column break', icon: IconTextColumnBreak, menu: { keywords: ['columns', 'break', 'split'] } },
        ],
    });
