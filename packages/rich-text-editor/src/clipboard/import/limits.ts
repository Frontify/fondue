/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';

import { type ResourceLimits } from '#/model';

/** The limit a document with pasted content exceeds, counted as decode counts nodes, depth and cells (SPEC-rich-text-clipboard/AC-020). */
export const exceededLimit = (
    doc: Node,
    limits: ResourceLimits,
): 'maxDocumentNodes' | 'maxDepth' | 'maxTableCells' | undefined => {
    let nodes = 0;
    let deepest = 0;
    let exceedsCells = false;
    const visit = (node: Node, depth: number) => {
        nodes += 1;
        deepest = Math.max(deepest, depth);
        if (node.type.name === 'table') {
            let cells = 0;
            for (const row of node.children) {
                cells += row.childCount;
            }
            exceedsCells ||= cells > limits.maxTableCells;
        }
        for (const child of node.children) {
            visit(child, depth + 1);
        }
    };
    visit(doc, 1);
    if (nodes > limits.maxDocumentNodes) {
        return 'maxDocumentNodes';
    }
    if (deepest > limits.maxDepth) {
        return 'maxDepth';
    }
    if (exceedsCells) {
        return 'maxTableCells';
    }
    return undefined;
};
