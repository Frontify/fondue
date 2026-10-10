/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';

import { type ResourceLimits } from '#/model';

/** The depth or table cell limit a document with pasted content exceeds, which the commit check leaves to paste (SPEC-rich-text-clipboard/AC-020). */
export const exceededStructure = (doc: Node, limits: ResourceLimits): 'maxDepth' | 'maxTableCells' | undefined => {
    let deepest = 0;
    let exceedsCells = false;
    const visit = (node: Node, depth: number) => {
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
    if (deepest > limits.maxDepth) {
        return 'maxDepth';
    }
    if (exceedsCells) {
        return 'maxTableCells';
    }
    return undefined;
};
