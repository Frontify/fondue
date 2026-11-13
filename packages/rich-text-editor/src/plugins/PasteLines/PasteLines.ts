/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin, type PasteTransform, type PasteTransformContext } from '#/core';

const TABLE_TAG = 'table';
const PREFORMATTED_TAG = 'pre';
/** The block each line becomes; no plugin claims it, so the parse reads it as a paragraph. */
const LINE_TAG = 'div';
/** Ends a line in a `<pre>`. */
const LINE_END = /\r?\n/;
/** Joins the cells of a row on its line. */
const CELL_SEPARATOR = ' ';

const lineBlock = (document: Document, text: string): HTMLElement => {
    const block = document.createElement(LINE_TAG);
    block.textContent = text;
    return block;
};

const flattenTables = (dom: HTMLElement, { isClaimed }: PasteTransformContext): void => {
    // Innermost first (document order puts a nested table after its outer
    // one), so an outer cell reads a nested table as the lines it became; and
    // `rows` and `cells` are the table's own, so no cell is read twice.
    for (const table of [...dom.querySelectorAll(TABLE_TAG)].reverse()) {
        if (isClaimed(table)) {
            continue;
        }
        const rows = [...table.rows].map((row) =>
            lineBlock(
                dom.ownerDocument,
                [...row.cells]
                    .map((cell) => cell.textContent?.trim() ?? '')
                    .filter(Boolean)
                    .join(CELL_SEPARATOR),
            ),
        );
        table.replaceWith(...rows);
    }
};

const flattenPreformatted = (dom: HTMLElement, { isClaimed }: PasteTransformContext): void => {
    for (const pre of dom.querySelectorAll(PREFORMATTED_TAG)) {
        if (isClaimed(pre)) {
            continue;
        }
        pre.replaceWith(...(pre.textContent ?? '').split(LINE_END).map((line) => lineBlock(dom.ownerDocument, line)));
    }
};

/**
 * Keeps pasted text from running together in structure no plugin reads. Table
 * cells are not blocks to the editor (`<td>a</td><td>b</td>` would paste as
 * `ab`), so each row becomes a line with its cells joined by a space. The join loses the columns, on purpose: a
 * table no plugin reads has no structure to keep. A
 * `<pre>`'s newlines collapse as whitespace, so each of its lines becomes a
 * line. A table or `<pre>` a mounted plugin reads keeps its markup.
 */
const PASTE_LINES: PasteTransform = {
    id: 'paste-lines',
    run: (dom, context) => {
        flattenTables(dom, context);
        flattenPreformatted(dom, context);
    },
};

/**
 * Pastes each table row and each line of preformatted text as a line of its own. In `defaultPlugins`; a host with
 * its own plugin list adds it to keep table cells and preformatted lines apart.
 */
export const pasteLinesPlugin = () =>
    /* @__PURE__ */ definePlugin({ id: 'paste-lines', pasteTransforms: [PASTE_LINES] });
