/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node, type NodeType, type ResolvedPos } from 'prosemirror-model';
import { type EditorState, NodeSelection } from 'prosemirror-state';

// Every image chrome reads a position on each commit, so one walk of an immutable document serves them all.
const positions = new WeakMap<Node, Map<string, number>>();

/** The position of the node with `nodeId`, read when it is needed, so no caller holds one. */
export const positionOf = (doc: Node, nodeId: string): number | undefined => {
    let found = positions.get(doc);
    if (found === undefined) {
        const index = new Map<string, number>();
        doc.descendants((node, pos) => {
            const id: unknown = node.attrs.nodeId;
            if (typeof id === 'string' && !index.has(id)) {
                index.set(id, pos);
            }
        });
        positions.set(doc, index);
        found = index;
    }

    return found.get(nodeId);
};

/**
 * The selected node of `type`, else the nearest one around the selection, with its position; with `nodeId`, the node
 * itself or the nearest ancestor of `type` around the node with that ID.
 */
export const nearest = (
    state: EditorState,
    type: NodeType,
    nodeId?: string,
): { readonly node: Node; readonly pos: number } | undefined => {
    if (nodeId !== undefined) {
        const pos = positionOf(state.doc, nodeId);
        if (pos === undefined) {
            return undefined;
        }

        const node = state.doc.nodeAt(pos);
        if (node === null) {
            return undefined;
        }

        if (node.type === type) {
            return { node, pos };
        }

        const $pos = state.doc.resolve(pos);
        for (let depth = $pos.depth; depth > 0; depth -= 1) {
            if ($pos.node(depth).type === type) {
                return { node: $pos.node(depth), pos: $pos.before(depth) };
            }
        }

        return undefined;
    }

    const { selection } = state;
    if (selection instanceof NodeSelection && selection.node.type === type) {
        return { node: selection.node, pos: selection.from };
    }

    const { $from } = selection;
    for (let depth = $from.depth; depth > 0; depth -= 1) {
        const node = $from.node(depth);
        if (node.type === type) {
            return { node, pos: $from.before(depth) };
        }
    }

    return undefined;
};

/** Whether `$pos` is in a code textblock, which keeps white space as typed and takes Tab and Enter as text. */
export const inCodeTextblock = ($pos: ResolvedPos): boolean =>
    $pos.parent.isTextblock && $pos.parent.type.spec.code === true;
