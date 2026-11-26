/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextColumnBreak } from '@frontify/fondue-icons';

import { defineBlock, defineContent, definePlugin } from '#/core';
import { translatedLabel } from '#/ui/translation';

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
    /**
     * Whether an author may insert a column break that leaves a column empty: first in the document, or right after
     * another break. With `false`, the editor refuses that insert; stored documents load and show as they are.
     * @default true
     */
    emptyColumns?: boolean;
};

/**
 * Lays the content out in columns, with a block that marks where each column ends
 */
export const columnBreakContent = ({
    columns = 2,
    gap = 'normal',
    emptyColumns = true,
}: ColumnBreakPluginOptions = {}) =>
    defineContent({
        blocks: {
            columnBreak: defineBlock({
                separator: !emptyColumns,
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
            {
                label: translatedLabel('RichTextEditor_columnBreak'),
                icon: IconTextColumnBreak,
                menu: { keywords: ['columns', 'break', 'split'] },
            },
        ],
    });
