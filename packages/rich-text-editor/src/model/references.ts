/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RichTextDocument } from './format';
import { isRecord } from './values';

/** One mention occurrence: its `nodeId` and the resource it names. */
export interface MentionReference {
    readonly nodeId: string;
    readonly resourceType: string;
    readonly resourceId: string;
}
export interface ReferenceDiff {
    readonly added: readonly MentionReference[];
    readonly removed: readonly MentionReference[];
}

/** The mentions of a stored document by `nodeId`, in document order; a repeated `nodeId` counts once. */
const mentionsOf = (document: RichTextDocument): Map<string, MentionReference> => {
    const found = new Map<string, MentionReference>();
    const pending: unknown[] = [document.content];
    // Walked with a stack, so a document nested past the call stack's depth still reads.
    for (let node = pending.pop(); node !== undefined; node = pending.pop()) {
        if (!isRecord(node)) {
            continue;
        }
        const { attrs } = node;
        if (node.type === 'mention' && isRecord(attrs)) {
            const { nodeId, resourceType, resourceId } = attrs;
            if (
                typeof nodeId === 'string' &&
                typeof resourceType === 'string' &&
                typeof resourceId === 'string' &&
                !found.has(nodeId)
            ) {
                found.set(nodeId, { nodeId, resourceType, resourceId });
            }
        }
        if (Array.isArray(node.content)) {
            const children = node.content as readonly unknown[];
            for (let index = children.length - 1; index >= 0; index -= 1) {
                pending.push(children[index]);
            }
        }
    }
    return found;
};

const sameReference = (a: MentionReference, b: MentionReference) =>
    a.resourceType === b.resourceType && a.resourceId === b.resourceId;

/**
 * The mentions `after` holds that `before` does not, and the reverse, keyed by `nodeId`: a moved mention keeps its
 * `nodeId` and is neither, a pasted copy has a new one and is added, and a `nodeId` that names another resource is
 * removed and added. A host decides from this whom to notify; the editor notifies no one.
 */
export const diffReferences = (before: RichTextDocument, after: RichTextDocument): ReferenceDiff => {
    const previous = mentionsOf(before);
    const next = mentionsOf(after);
    const added = [...next.values()].filter((mention) => {
        const old = previous.get(mention.nodeId);
        return old === undefined || !sameReference(old, mention);
    });
    const removed = [...previous.values()].filter((mention) => {
        const kept = next.get(mention.nodeId);
        return kept === undefined || !sameReference(kept, mention);
    });
    return { added, removed };
};
