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
};

const MANY_COLUMNS = 3;
const TWO_COLUMNS = 2;

/** The classes of the content: the gap, and the layout that shows the columns once the container has room for all of them. */
const contentClassNameFor = (columns: number): string | undefined => {
    if (columns >= MANY_COLUMNS) {
        return `${styles.columns} ${styles.fromMedium}`;
    }
    if (columns === TWO_COLUMNS) {
        return `${styles.columns} ${styles.fromSmall}`;
    }

    return styles.columns;
};

/**
 * Lays the content out in columns, with a block that marks where each column ends.
 * The content shows one column until the container has room for every column: 440px for 2, 740px for more.
 * The element around the content becomes an inline-size container, so it takes its width from its own parent and not from the text.
 */
export const columnBreakContent = ({ columns = 2, gap = 'normal' }: ColumnBreakPluginOptions = {}) =>
    defineContent({
        blocks: {
            columnBreak: defineBlock({
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
        contentClassName: contentClassNameFor(columns),
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
