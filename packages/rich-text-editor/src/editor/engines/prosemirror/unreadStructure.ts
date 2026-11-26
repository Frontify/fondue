/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Schema } from 'prosemirror-model';

const LINE_BREAK = /\r?\n/;
/** What stands between a table row's cells once the row is one line. */
const CELL_SEPARATOR = ' ';
/** The blocks some highlighters write one line each inside a `<pre>`. */
const LINE_BLOCKS = 'div, p';
const NEW_LINE = '\n';

/** The selectors of every parse rule the schema's blocks declare. */
const readTags = (schema: Schema): string[] => {
    const tags: string[] = [];
    for (const nodeType of Object.values(schema.nodes)) {
        for (const rule of nodeType.spec.parseDOM ?? []) {
            if (rule.tag !== undefined) {
                tags.push(rule.tag);
            }
        }
    }
    return tags;
};

/**
 * Preserves line boundaries when highlighted HTML wraps each code line in a div or paragraph.
 * Updates the existing pre element so ProseMirror can read its contents as one block.
 */
const flattenLineBlocks = (pre: Element): void => {
    for (const block of [...pre.querySelectorAll(LINE_BLOCKS)].reverse()) {
        const content: (Node | string)[] = [...block.childNodes];
        if (block.nextSibling !== null) {
            content.push(NEW_LINE);
        }
        block.replaceWith(...content);
    }
};

/**
 * Keeps text from running together in a table or `<pre>` no registered block
 * reads, for paste and for stored HTML alike; the engine reads the rest by the
 * schema's own rules. Table cells are not blocks to the engine
 * (`<td>a</td><td>b</td>` would read as `ab`), so each row becomes a block with
 * cells joined by a space. A `<pre>`'s newlines collapse as whitespace, so each
 * line becomes a block. A `<pre>` the schema reads keeps its lines as new lines
 * in its one block, where a line was written as a block.
 */
export const keepUnreadStructureApart = (dom: HTMLElement, schema: Schema): void => {
    const document = dom.ownerDocument;
    const tags = readTags(schema);
    const isRead = (element: Element): boolean => tags.some((tag) => element.matches(tag));
    const lineBlock = (text: string): HTMLElement => {
        const block = document.createElement('div');
        block.textContent = text;
        return block;
    };
    // Innermost first (document order puts a nested table after its outer
    // one), so an outer cell reads a nested table as the lines it became; and
    // `rows` and `cells` are the table's own, so no cell is read twice.
    for (const table of [...dom.querySelectorAll('table')].reverse()) {
        if (isRead(table)) {
            continue;
        }

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
        if (isRead(pre)) {
            flattenLineBlocks(pre);
            continue;
        }

        pre.replaceWith(...pre.textContent.split(LINE_BREAK).map(lineBlock));
    }
};
