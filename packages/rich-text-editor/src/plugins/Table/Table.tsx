/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTable } from '@frontify/fondue-icons';
import { type ReactNode } from 'react';

import { ANY_LIST, defineBlock, defineContent, definePlugin, gridSpanOf, PARAGRAPH, type RteBlockNode } from '#/core';

import { TableMenu } from './components/TableMenu';
import styles from './table.module.scss';

export type TableBlock<TRow extends RteBlockNode = RteBlockNode> = {
    type: 'table';
    children: TRow[];
};

export type TableRowBlock<TCell extends RteBlockNode = RteBlockNode> = {
    type: 'tableRow';
    children: TCell[];
};

/** What every cell has: how far it reaches, and the blocks it holds. */
type CellBase<TContent extends RteBlockNode> = {
    /**
     * How many columns the cell covers, 1 to 50; a span beyond is read as 50
     * @default 1
     */
    colspan?: number;
    /**
     * How many rows the cell covers, 1 to 50; a span beyond is read as 50
     * @default 1
     */
    rowspan?: number;
    children: TContent[];
};

type HeaderScope = 'col' | 'row';

export type TableCellBlock<TContent extends RteBlockNode = RteBlockNode> = CellBase<TContent> & {
    type: 'tableCell';
};

export type TableHeaderBlock<TContent extends RteBlockNode = RteBlockNode> = CellBase<TContent> & {
    type: 'tableHeader';
    /**
     * What the header cell labels: its column or its row
     * @default 'col'
     */
    scope?: HeaderScope;
};

/** The readonly view's name. It belongs to the content, whose language the renderer does not know, so it stays English. */
const TABLE_REGION_LABEL = 'Table';

type SpanValue = { colspan: number; rowspan: number };
type HeaderValue = SpanValue & { scope: HeaderScope };

const SPAN_DEFAULTS: SpanValue = { colspan: 1, rowspan: 1 };

/** A span of 1 is the default and stays out of the markup. */
const spanAttrs = (value: SpanValue): Record<string, string> => {
    const attrs: Record<string, string> = {};
    const colspan = gridSpanOf(value.colspan);
    const rowspan = gridSpanOf(value.rowspan);
    if (colspan > 1) {
        attrs.colspan = String(colspan);
    }
    if (rowspan > 1) {
        attrs.rowspan = String(rowspan);
    }
    return attrs;
};

const spansOfElement = (element: HTMLElement): SpanValue => ({
    colspan: gridSpanOf(element.getAttribute('colspan')),
    rowspan: gridSpanOf(element.getAttribute('rowspan')),
});

const scopeOf = (element: HTMLElement): HeaderScope => (element.getAttribute('scope') === 'row' ? 'row' : 'col');

type ReadonlyTableProps = { children?: ReactNode };

const ReadonlyTable = ({ children }: ReadonlyTableProps): ReactNode => (
    // Keyboard-reachable, or a table wider than the page could not be scrolled without a mouse.
    // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <section tabIndex={0} aria-label={TABLE_REGION_LABEL} className={styles.scroll}>
        <table className={styles.table}>
            <tbody>{children}</tbody>
        </table>
    </section>
);

/** Tables whose cells hold paragraphs and lists, with merged cells kept as stored. */
export const tableContent = defineContent({
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
            render: { component: ReadonlyTable },
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
                attrs: { class: styles.header, ...spanAttrs(value), scope: value.scope },
                children: true,
            }),
            parse: [{ tag: 'th', value: (element) => ({ ...spansOfElement(element), scope: scopeOf(element) }) }],
        }),
    },
});

const emptyCell = (type: 'tableCell' | 'tableHeader'): TableCellBlock | TableHeaderBlock => ({
    type,
    children: [{ type: PARAGRAPH, children: [{ text: '' }] }],
});

/** The first row is a header row. */
const emptyRows = (rows: number, columns: number): TableRowBlock[] =>
    Array.from({ length: rows }, (_, row) => {
        const type = row === 0 ? 'tableHeader' : 'tableCell';
        return { type: 'tableRow' as const, children: Array.from({ length: columns }, () => emptyCell(type)) };
    });

/**
 * Tables, with a `/` entry that inserts one with a header row, and a menu,
 * shown while the selection is in a table, for its rows, columns and headers.
 * Tab in the last cell adds a row.
 */
export const tablePlugin = () =>
    definePlugin({
        id: 'table',
        content: tableContent,
        toolbarGroup: 'insert',
        toolbar: [
            {
                label: 'RichTextEditor_table',
                floating: 'inline',
                render: ({ api, selection, label }) => <TableMenu api={api} selection={selection} label={label} />,
            },
        ],
        commands: [
            {
                id: 'table',
                label: 'RichTextEditor_table',
                icon: IconTable,
                keywords: ['grid', 'rows', 'columns', 'spreadsheet'],
                group: 'insert',
                run: (api) => api.insert('table', { children: emptyRows(3, 3) }),
            },
        ],
    });
