/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type MarkType as PmMarkType,
    type Node as PmNode,
    type NodeType as PmNodeType,
    type Schema,
} from 'prosemirror-model';
import { type EditorState } from 'prosemirror-state';

/**
 * Reading the document around the selection. Shared by the control API and by
 * the panel anchoring, and free of side effects — every one of these answers a
 * question about the current state and nothing else.
 */

/** The innermost ancestor that is a list of items, with the position it sits at. */
export const findList = (
    state: EditorState,
    itemTypeByList: Map<string, string>,
): { node: PmNode; pos: number } | null => {
    const { $from } = state.selection;
    for (let depth = $from.depth; depth > 0; depth--) {
        const node = $from.node(depth);
        if (itemTypeByList.has(node.type.name)) {
            return { node, pos: $from.before(depth) };
        }
    }
    return null;
};

/** The item type of the innermost list the selection sits in — what the list commands need. */
export const findItemType = (
    state: EditorState,
    itemTypeByList: Map<string, string>,
    schema: Schema,
): PmNodeType | null => {
    const list = findList(state, itemTypeByList);
    const itemName = list ? itemTypeByList.get(list.node.type.name) : undefined;
    return (itemName ? schema.nodes[itemName] : undefined) ?? null;
};

/**
 * The stretch of text around the selection start that carries a mark, or null
 * when the mark is not there. Adjacent text nodes may be split by other marks,
 * so a run is a stretch of consecutive children rather than a single node —
 * which is what makes a partly-bold link still count as one link.
 */
export const findMarkRange = (state: EditorState, markType: PmMarkType): { from: number; to: number } | null => {
    const { $from } = state.selection;
    const block = $from.parent;
    if (!block.isTextblock) {
        return null;
    }
    let position = $from.start();
    let runFrom: number | null = null;
    let runTo = position;
    let range: { from: number; to: number } | null = null;
    const closeRun = (): void => {
        if (runFrom !== null && $from.pos >= runFrom && $from.pos <= runTo) {
            range = { from: runFrom, to: runTo };
        }
        runFrom = null;
    };
    for (let index = 0; index < block.childCount; index++) {
        const child = block.child(index);
        if (markType.isInSet(child.marks)) {
            runFrom ??= position;
            runTo = position + child.nodeSize;
        } else {
            closeRun();
        }
        position += child.nodeSize;
    }
    closeRun();
    return range;
};
