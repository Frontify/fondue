/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    DOMParser as PmDOMParser,
    DOMSerializer,
    type Node as PmNode,
    type Schema,
    type Slice,
} from 'prosemirror-model';
import { type EditorView } from 'prosemirror-view';

import { type EditorControlApi, type PasteHandler } from '#/core';

// Copy and paste fixes beyond what the engine does on its own.

// Copy

/** Marks a text block's content element while copying, so its breaks can be fixed after. */
const TEXT_BLOCK_MARKER = 'data-rte-copied-text-block';

/**
 * Breaks other apps would lose. A line break at the end of a block shows a
 * line in the editor, but a single trailing `<br>` draws nothing in HTML; an
 * empty block (`<p></p>`) collapses to nothing. Both get the extra `<br>` the
 * export writes too.
 */
const keepBreaks = (root: ParentNode): void => {
    for (const content of root.querySelectorAll(`[${TEXT_BLOCK_MARKER}]`)) {
        content.removeAttribute(TEXT_BLOCK_MARKER);
        const last = content.lastChild;
        if (last === null || last.nodeName === 'BR') {
            content.append(content.ownerDocument.createElement('br'));
        }
    }
};

/** The engine's serializer, with `keepBreaks` applied to what it writes to the clipboard. */
class ClipboardSerializer extends DOMSerializer {
    serializeFragment(...args: Parameters<DOMSerializer['serializeFragment']>): HTMLElement | DocumentFragment {
        const written = super.serializeFragment(...args);
        keepBreaks(written);
        return written;
    }
}

export const clipboardSerializer = (schema: Schema): DOMSerializer => {
    const nodes = DOMSerializer.nodesFromSchema(schema);
    for (const [name, nodeType] of Object.entries(schema.nodes)) {
        const toDom = nodes[name];
        if (!nodeType.isTextblock || !toDom) {
            continue;
        }
        nodes[name] = (node: PmNode) => {
            const rendered = DOMSerializer.renderSpec(document, toDom(node));
            rendered.contentDOM?.setAttribute(TEXT_BLOCK_MARKER, '');
            return rendered;
        };
    }
    return new ClipboardSerializer(nodes, DOMSerializer.marksFromSchema(schema));
};

// Paste

/**
 * Keeps text from running together in structure no plugin reads. Table cells
 * are not blocks to the engine (`<td>a</td><td>b</td>` would paste as `ab`), so
 * each row becomes a block with cells joined by a space. A `<pre>`'s newlines
 * collapse as whitespace, so each line becomes a block.
 */
const tidyPasted = (dom: HTMLElement): void => {
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
        pre.replaceWith(...(pre.textContent ?? '').split(/\r?\n/).map(lineBlock));
    }
};

class PasteParser extends PmDOMParser {
    parseSlice(...args: Parameters<PmDOMParser['parseSlice']>): Slice {
        const [dom] = args;
        if (dom instanceof HTMLElement) {
            tidyPasted(dom);
        }
        return super.parseSlice(...args);
    }
}

export const clipboardParser = (schema: Schema): PmDOMParser =>
    new PasteParser(schema, PmDOMParser.fromSchema(schema).rules);

/** Feature paste handlers run before every other paste rule; the first to return true ends the paste. */
export const handlePasteByFeatures =
    (handlers: readonly PasteHandler[], api: EditorControlApi) =>
    (_view: EditorView, event: ClipboardEvent): boolean => {
        const data = event.clipboardData;
        if (handlers.length === 0 || !data) {
            return false;
        }
        const paste = { text: data.getData('text/plain'), html: data.getData('text/html') || null };
        return handlers.some((handler) => handler(paste, api));
    };

/**
 * Pasting blocks into an empty one: the engine keeps the target block's type
 * and attributes (a centred heading pasted into an empty paragraph would turn
 * plain), so the empty block takes on the first pasted block's instead.
 */
export const handlePasteIntoEmptyBlock = (view: EditorView, _event: ClipboardEvent, slice: Slice): boolean => {
    const { $from, empty } = view.state.selection;
    const target = $from.parent;
    if (!empty || !target.isTextblock || target.content.size > 0 || slice.openStart === 0) {
        return false;
    }
    let first = slice.content.firstChild;
    for (let depth = 1; depth < slice.openStart && first; depth++) {
        first = first.firstChild;
    }
    if (!first?.isTextblock || (first.type === target.type && first.sameMarkup(target))) {
        return false;
    }

    const at = $from.before();
    const transaction = view.state.tr.replaceSelection(slice);
    const merged = transaction.doc.nodeAt(at);
    const $at = transaction.doc.resolve(at);
    if (
        merged?.isTextblock &&
        $at.parent.canReplaceWith($at.index(), $at.index() + 1, first.type) &&
        first.type.validContent(merged.content)
    ) {
        transaction.setNodeMarkup(at, first.type, first.attrs);
    }
    view.dispatch(transaction.scrollIntoView().setMeta('paste', true).setMeta('uiEvent', 'paste'));
    return true;
};
