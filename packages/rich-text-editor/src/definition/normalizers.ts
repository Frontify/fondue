/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState, type Transaction } from 'prosemirror-state';

import { type IdSource } from '#/model';
import { NODE_IDS_PLUGIN } from '#/model/capabilities';

/**
 * A repair transaction appended after another: the same steps for equal states and nothing on its own output
 * (SPEC-rich-text/AC-057), computed synchronously with no I/O, timer or promise (SPEC-rich-text/AC-059).
 */
export type Normalizer = (state: EditorState, ids: IdSource) => Transaction | null;

/**
 * Gives each node of a type that carries a `nodeId` and has none, and each later one of two with one ID in document
 * order, a new ID, so the first keeps its ID and every link and target that names it (SPEC-rich-text-runtime/AC-092).
 */
const fillNodeIds: Normalizer = (state, ids) => {
    const used = new Set<string>();
    const repairs: number[] = [];
    state.doc.descendants((node, pos) => {
        if (!Object.hasOwn(node.type.spec.attrs ?? {}, 'nodeId')) {
            return true;
        }
        const { nodeId } = node.attrs;
        if (typeof nodeId === 'string' && !used.has(nodeId)) {
            used.add(nodeId);
        } else {
            repairs.push(pos);
        }
        return true;
    });
    if (repairs.length === 0) {
        return null;
    }
    const transaction = state.tr;
    for (const pos of repairs) {
        let nodeId = ids.next('node');
        // A drawn ID that a later node already holds would take that node's ID from it.
        while (used.has(nodeId)) {
            nodeId = ids.next('node');
        }
        used.add(nodeId);
        transaction.setNodeAttribute(pos, 'nodeId', nodeId);
    }
    return transaction;
};

/** The package's normalizers by the plugin ID that runs each, in the `structure` phase. */
export const NORMALIZERS: Readonly<Record<string, Normalizer>> = { [NODE_IDS_PLUGIN.id]: fillNodeIds };
