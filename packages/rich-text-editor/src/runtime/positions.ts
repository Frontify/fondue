/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node, type NodeType } from 'prosemirror-model';
import { type EditorState, NodeSelection } from 'prosemirror-state';

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

/** The selected node of `type`, else the nearest one around the selection, with its position. */
export const nearest = (
    state: EditorState,
    type: NodeType,
): { readonly node: Node; readonly pos: number } | undefined => {
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
