/* (c) Copyright Frontify Ltd., all rights reserved. */

const LINE_BREAK = /\r?\n/;
/** What stands between a table row's cells once the row is one line. */
const CELL_SEPARATOR = ' ';

/**
 * Keeps text from running together in structure no plugin reads, for paste and
 * for stored HTML alike. Table cells are not blocks to the engine
 * (`<td>a</td><td>b</td>` would read as `ab`), so each row becomes a block with
 * cells joined by a space. A `<pre>`'s newlines collapse as whitespace, so each
 * line becomes a block.
 */
export const keepUnreadStructureApart = (dom: HTMLElement): void => {
    const document = dom.ownerDocument;
    const lineBlock = (text: string): HTMLElement => {
        const block = document.createElement('div');
        block.textContent = text;
        return block;
    };
    // Innermost first (document order puts a nested table after its outer
    // one), so an outer cell reads a nested table as the lines it became; and
    // `rows` and `cells` are the table's own, so no cell is read twice.
    for (const table of [...dom.querySelectorAll('table')].reverse()) {
        const rows: HTMLElement[] = [];
        for (const row of table.rows) {
            const texts: string[] = [];
            for (const cell of row.cells) {
                const text = cell.textContent.trim();
                if (text !== '') {
                    texts.push(text);
                }
            }
            rows.push(lineBlock(texts.join(CELL_SEPARATOR)));
        }
        table.replaceWith(...rows);
    }
    for (const pre of dom.querySelectorAll('pre')) {
        pre.replaceWith(...(pre.textContent ?? '').split(LINE_BREAK).map(lineBlock));
    }
};
