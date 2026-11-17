/* (c) Copyright Frontify Ltd., all rights reserved. */

const LINE_BREAK = /\r?\n/;

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
        const rows = [...table.rows].map((row) =>
            lineBlock(
                [...row.cells]
                    .map((cell) => cell.textContent?.trim() ?? '')
                    .filter(Boolean)
                    .join(' '),
            ),
        );
        table.replaceWith(...rows);
    }
    for (const pre of dom.querySelectorAll('pre')) {
        pre.replaceWith(...(pre.textContent ?? '').split(LINE_BREAK).map(lineBlock));
    }
};
