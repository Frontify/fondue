/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTable } from '@frontify/fondue-icons';
import { type ReactNode } from 'react';

import { ANY_LIST, defineBlock, defineContent, definePlugin, PARAGRAPH, type RteBlockNode } from '#/core';

import styles from './table.module.scss';

/**
 * A table: rows of cells, each holding blocks
 */
export type TableBlock<TRow extends RteBlockNode = RteBlockNode> = {
    type: 'table';
    children: TRow[];
};

export type TableRowBlock<TCell extends RteBlockNode = RteBlockNode> = {
    type: 'tableRow';
    children: TCell[];
};

export type TableCellBlock<TContent extends RteBlockNode = RteBlockNode> = {
    type: 'tableCell' | 'tableHeader';
    /**
     * How many columns the cell covers, 1 to 50
     * @default 1
     */
    colspan?: number;
    /**
     * How many rows the cell covers, 1 to 50
     * @default 1
     */
    rowspan?: number;
    /**
     * One width per column the cell covers, or null when the table sizes it
     * @default null
     */
    colwidth?: number[] | null;
    /**
     * What a header cell labels: its column or its row. Header cells only.
     * @default 'col'
     */
    scope?: 'col' | 'row' | null;
    children: TContent[];
};

export type TablePluginOptions = {
    /**
     * The name a screen reader gives the scrollable region around a table in
     * the readonly view, in the host's language
     * @default 'Table'
     */
    label?: string;
};

/** The most columns or rows one cell may cover; a stored or pasted span beyond it is read as this many. */
const MAX_SPAN = 50;

/** A span attribute read from HTML: a whole number from 1 to `MAX_SPAN`, 1 when missing or unreadable. */
const spanOf = (value: string | null): number => {
    const span = Number.parseInt(value ?? '', 10);
    if (!Number.isFinite(span) || span < 1) {
        return 1;
    }
    return Math.min(span, MAX_SPAN);
};

type SpanValue = { colspan: number; rowspan: number; colwidth: number[] | null };
type HeaderValue = SpanValue & { scope: 'col' | 'row' | null };

const SPAN_DEFAULTS: SpanValue = { colspan: 1, rowspan: 1, colwidth: null };

/** A span of 1 is the default and is left out of the markup. */
const spanAttrs = ({ colspan, rowspan }: SpanValue): { colspan?: string; rowspan?: string } => ({
    ...(colspan > 1 ? { colspan: String(colspan) } : {}),
    ...(rowspan > 1 ? { rowspan: String(rowspan) } : {}),
});

const spansOfElement = (element: HTMLElement): SpanValue => ({
    colspan: spanOf(element.getAttribute('colspan')),
    rowspan: spanOf(element.getAttribute('rowspan')),
    colwidth: null,
});

const scopeOf = (element: HTMLElement): HeaderValue['scope'] =>
    element.getAttribute('scope') === 'row' ? 'row' : 'col';

type ReadonlyTableProps = { children?: ReactNode };

/** A table in the readonly view: scrolls in its own region, which the keyboard can reach and a screen reader names. */
const readonlyTable =
    (label: string) =>
    ({ children }: ReadonlyTableProps): ReactNode =>
        (
            // A region that scrolls must be reachable by keyboard, or its overflow is out of reach (TBL-26).
            // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            <div role="region" tabIndex={0} aria-label={label} className={styles.scroll}>
                <table className={styles.table}>
                    <tbody>{children}</tbody>
                </table>
            </div>
        );

/**
 * Tables whose cells hold paragraphs and lists, with merged cells kept as stored
 */
export const tableContent = ({ label = 'Table' }: TablePluginOptions = {}) =>
    defineContent({
        blocks: {
            table: defineBlock({
                content: { parts: ['tableRow'] },
                gridRole: 'grid',
                toHtml: () => ({
                    tag: 'div',
                    attrs: { class: styles.scroll },
                    children: [
                        {
                            tag: 'table',
                            attrs: { class: styles.table },
                            children: [{ tag: 'tbody', children: true }],
                        },
                    ],
                }),
                parse: [{ tag: 'table' }],
                render: { component: readonlyTable(label) },
            }),
            tableRow: defineBlock({
                content: { parts: ['tableCell', 'tableHeader'] },
                gridRole: 'row',
                toHtml: () => ({ tag: 'tr', children: true }),
                parse: [{ tag: 'tr' }],
            }),
            tableCell: defineBlock<SpanValue>({
                content: { blocks: [PARAGRAPH, ANY_LIST] },
                gridRole: 'slot',
                defaults: SPAN_DEFAULTS,
                toHtml: (value) => ({
                    tag: 'td',
                    attrs: { class: styles.cell, ...spanAttrs(value) },
                    children: true,
                }),
                parse: [{ tag: 'td', value: spansOfElement }],
            }),
            tableHeader: defineBlock<HeaderValue>({
                content: { blocks: [PARAGRAPH, ANY_LIST] },
                gridRole: 'headerSlot',
                defaults: { ...SPAN_DEFAULTS, scope: 'col' },
                toHtml: (value) => ({
                    tag: 'th',
                    attrs: {
                        class: styles.header,
                        ...spanAttrs(value),
                        ...(value.scope ? { scope: value.scope } : {}),
                    },
                    children: true,
                }),
                parse: [{ tag: 'th', value: (element) => ({ ...spansOfElement(element), scope: scopeOf(element) }) }],
            }),
        },
    });

const emptyCell = (type: TableCellBlock['type']): TableCellBlock => ({
    type,
    ...(type === 'tableHeader' ? { scope: 'col' as const } : {}),
    children: [{ type: PARAGRAPH, children: [{ text: '' }] }],
});

/** A table of empty cells whose first row is a header row. */
const emptyTable = (rows: number, columns: number): TableRowBlock[] =>
    Array.from({ length: rows }, (_, row) => ({
        type: 'tableRow' as const,
        children: Array.from({ length: columns }, () => emptyCell(row === 0 ? 'tableHeader' : 'tableCell')),
    }));

/**
 * Tables, with a `/` entry that inserts one of 3 by 3 cells with a header row.
 * Tab and Shift+Tab move between cells; Tab in the last cell adds a row.
 */
export const tablePlugin = (options: TablePluginOptions = {}) =>
    definePlugin({
        id: 'table',
        content: tableContent(options),
        commands: [
            {
                id: 'table',
                label: 'Table',
                icon: IconTable,
                keywords: ['grid', 'rows', 'columns', 'spreadsheet'],
                group: 'insert',
                run: (api) => api.insert('table', { children: emptyTable(3, 3) }),
            },
        ],
    });
