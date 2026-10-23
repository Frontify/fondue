/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Fragment, type Node } from 'prosemirror-model';

import { type ResourceLimits } from '#/model';

/** The deepest level at or below `node` placed at `depth`, and the most cells any table at or below it holds. */
const measureStructure = (node: Node, depth: number): { deepest: number; mostCells: number } => {
    let deepest = depth;
    let mostCells = 0;
    if (node.type.name === 'table') {
        mostCells = cellsOf(node);
    }
    for (const child of node.children) {
        const measured = measureStructure(child, depth + 1);
        deepest = Math.max(deepest, measured.deepest);
        mostCells = Math.max(mostCells, measured.mostCells);
    }
    return { deepest, mostCells };
};

/** The cells of one table. */
const cellsOf = (table: Node): number => {
    let cells = 0;
    for (const row of table.children) {
        cells += row.childCount;
    }
    return cells;
};

const exceeded = (
    { deepest, mostCells }: { deepest: number; mostCells: number },
    limits: ResourceLimits,
): 'maxDepth' | 'maxTableCells' | undefined => {
    if (deepest > limits.maxDepth) {
        return 'maxDepth';
    }
    if (mostCells > limits.maxTableCells) {
        return 'maxTableCells';
    }
    return undefined;
};

/** The depth or table cell limit a document with pasted content exceeds, which the commit check leaves to paste. */
export const exceededStructure = (doc: Node, limits: ResourceLimits): 'maxDepth' | 'maxTableCells' | undefined =>
    exceeded(measureStructure(doc, 1), limits);

/** The limit that `content`, written at `from` in `doc`, exceeds, measuring only the content and its table ancestors. */
export const exceededWrite = (
    doc: Node,
    from: number,
    content: Fragment,
    limits: ResourceLimits,
): 'maxDepth' | 'maxTableCells' | undefined => {
    const $from = doc.resolve(from);
    let deepest = 0;
    let mostCells = 0;
    for (const child of content.content) {
        const measured = measureStructure(child, $from.depth + 2);
        deepest = Math.max(deepest, measured.deepest);
        mostCells = Math.max(mostCells, measured.mostCells);
    }
    for (let depth = $from.depth; depth > 0; depth--) {
        const ancestor = $from.node(depth);
        if (ancestor.type.name === 'table') {
            mostCells = Math.max(mostCells, cellsOf(ancestor));
        }
    }
    return exceeded({ deepest, mostCells }, limits);
};

/** The nesting the HTML parsers of browsers stop at, which no copied page exceeds. */
const MAX_MARKUP_DEPTH = 512;
const VOID_ELEMENTS = new Set([
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr',
]);
const FOREIGN_ROOTS = new Set(['svg', 'math']);
const TAG_NAME = /[a-z][^\s/>]*/iy;

/**
 * Whether the elements of `html` nest deeper than a browser parser reads, counted in one pass over its tags, so a DOM
 * parse that costs the square of the depth, as jsdom's does, never starts on it. A void element and, inside `svg` or
 * `math`, a self-closing one opens nothing; any other start tag opens one, with its slash ignored, as the parser does.
 */
export const exceedsMarkupDepth = (html: string): boolean => {
    let depth = 0;
    let foreign = 0;
    let at = html.indexOf('<');
    while (at !== -1) {
        const closing = html.charAt(at + 1) === '/';
        TAG_NAME.lastIndex = at + 1;
        if (closing) {
            TAG_NAME.lastIndex += 1;
        }
        const found = TAG_NAME.exec(html);
        if (found === null) {
            at = html.indexOf('<', at + 1);
            continue;
        }
        const name = found[0].toLowerCase();
        // The tag ends at its first `>`, and the scan resumes after it, so every character is read once.
        const end = html.indexOf('>', TAG_NAME.lastIndex);
        if (end === -1) {
            return false;
        }
        at = html.indexOf('<', end);
        if (closing) {
            depth = Math.max(0, depth - 1);
            if (FOREIGN_ROOTS.has(name)) {
                foreign = Math.max(0, foreign - 1);
            }
            continue;
        }
        if (VOID_ELEMENTS.has(name) || (foreign > 0 && html.charAt(end - 1) === '/')) {
            continue;
        }
        if (FOREIGN_ROOTS.has(name)) {
            foreign += 1;
        }
        depth += 1;
        if (depth > MAX_MARKUP_DEPTH) {
            return true;
        }
    }
    return false;
};
