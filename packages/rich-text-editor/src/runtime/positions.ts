/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node, type NodeType } from 'prosemirror-model';
import { type EditorState } from 'prosemirror-state';

/** The position of the node with `nodeId`, read when it is needed, so no caller holds one. */
export const positionOf = (doc: Node, nodeId: string): number | undefined => {
    let found: number | undefined;
    doc.descendants((node, pos) => {
        if (found === undefined && node.attrs.nodeId === nodeId) {
            found = pos;
        }
        return found === undefined;
    });
    return found;
};

/** The nearest node of `type` around the selection, with its position. */
export const nearest = (
    state: EditorState,
    type: NodeType,
): { readonly node: Node; readonly pos: number } | undefined => {
    const { $from } = state.selection;
    for (let depth = $from.depth; depth > 0; depth -= 1) {
        const node = $from.node(depth);
        if (node.type === type) {
            return { node, pos: $from.before(depth) };
        }
    }
    return undefined;
};
