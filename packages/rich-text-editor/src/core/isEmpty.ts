/* (c) Copyright Frontify Ltd., all rights reserved. */

// Whether a stored document says anything at all, read off its JSON alone.
// No DOM, no engine, so it runs on a server beside the stored value.

import { type RteBlockNode, type RteDocumentOf, type RteInlineNode } from './document';

type AnyNode = RteBlockNode | RteInlineNode;

/** Whitespace-only text, an empty block, a block of those. A node without `children` (a mention, a column break) is content. */
const isBlank = (node: AnyNode): boolean => {
    if ('text' in node && typeof node.text === 'string') {
        return !/\S/.test(node.text);
    }

    if (!Array.isArray(node.children)) {
        return false;
    }

    // An inline element's open attributes type `children` as unknown; a stored document nests only nodes.
    for (const child of node.children as AnyNode[]) {
        if (!isBlank(child)) {
            return false;
        }
    }

    return true;
};

/**
 * Whether the document holds nothing a reader would see: no blocks, or only
 * text blocks (and lists of them) whose text is empty or whitespace — what an
 * untouched editor emits, or one cleared again. Any inline element (a mention,
 * a line break) or void block (a column break) makes it non-empty. A missing
 * document is empty, for a value not stored yet.
 */
export const isEmpty = (doc: RteDocumentOf | null | undefined): boolean => !doc || doc.blocks.every(isBlank);
