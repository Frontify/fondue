/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { describe, expect, it, vi } from 'vitest';

import { type EditorControlApi } from '#/core';

import { tableContent, tablePlugin } from './Table';

const { blocks = {} } = tableContent();

/** The value a block's first parse rule reads off this markup. */
const parsedValue = (type: 'tableCell' | 'tableHeader', html: string): unknown => {
    const holder = window.document.createElement('table');
    holder.innerHTML = `<tbody><tr>${html}</tr></tbody>`;
    const element = holder.querySelector<HTMLElement>('td, th');
    const rule = blocks[type]?.parse[0];
    return element && rule?.value ? rule.value(element) : undefined;
};

describe('a table cell read from HTML', () => {
    it('keeps its spans', () => {
        expect(parsedValue('tableCell', '<td colspan="3" rowspan="2">x</td>')).toEqual({ colspan: 3, rowspan: 2 });
    });

    it('clamps a span outside 1 to 50, and reads an unreadable one as 1', () => {
        expect(parsedValue('tableCell', '<td colspan="400" rowspan="0">x</td>')).toMatchObject({
            colspan: 50,
            rowspan: 1,
        });
        expect(parsedValue('tableCell', '<td colspan="wide" rowspan="-3">x</td>')).toMatchObject({
            colspan: 1,
            rowspan: 1,
        });
    });

    it('reads a header cell labelling its row, and any other as labelling its column', () => {
        expect(parsedValue('tableHeader', '<th scope="row">x</th>')).toMatchObject({ scope: 'row' });
        expect(parsedValue('tableHeader', '<th>x</th>')).toMatchObject({ scope: 'col' });
    });
});

describe('a table cell written as HTML', () => {
    it('leaves spans of 1 out of the markup', () => {
        const attrs = blocks.tableCell?.toHtml({ colspan: 1, rowspan: 1 }).attrs;

        expect(attrs).not.toHaveProperty('colspan');
        expect(attrs).not.toHaveProperty('rowspan');
    });

    // A stored document can hold anything, and the readonly view and export write it as they read it.
    it('writes a stored span out of range as the editor reads it', () => {
        const attrs = blocks.tableCell?.toHtml({ colspan: 400, rowspan: -1 }).attrs;

        expect(attrs).toMatchObject({ colspan: '50' });
        expect(attrs).not.toHaveProperty('rowspan');
    });

    it('writes a header cell with its scope', () => {
        const spec = blocks.tableHeader?.toHtml({ colspan: 2, rowspan: 1, scope: 'row' });

        expect(spec?.tag).toBe('th');
        expect(spec?.attrs).toMatchObject({ colspan: '2', scope: 'row' });
    });
});

describe('the Table command', () => {
    it('inserts 3 by 3 empty cells under a header row', () => {
        const insert = vi.fn();
        const command = tablePlugin().commands?.find(({ id }) => id === 'table');

        command?.run({ insert } as unknown as EditorControlApi);

        expect(insert).toHaveBeenCalledTimes(1);
        const [type, value] = insert.mock.calls[0] as [string, { children: { children: { type: string }[] }[] }];
        expect(type).toBe('table');
        expect(value.children).toHaveLength(3);
        expect(value.children.map((row) => row.children.map((cell) => cell.type))).toEqual([
            ['tableHeader', 'tableHeader', 'tableHeader'],
            ['tableCell', 'tableCell', 'tableCell'],
            ['tableCell', 'tableCell', 'tableCell'],
        ]);
    });
});
