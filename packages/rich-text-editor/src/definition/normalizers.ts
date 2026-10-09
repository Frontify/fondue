/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';
import { type EditorState, PluginKey, type StateField, type Transaction } from 'prosemirror-state';
import {
    AddMarkStep,
    AddNodeMarkStep,
    AttrStep,
    DocAttrStep,
    RemoveMarkStep,
    RemoveNodeMarkStep,
    ReplaceAroundStep,
    ReplaceStep,
} from 'prosemirror-transform';

import { type IdSource } from '#/model';
import { NODE_IDS_PLUGIN } from '#/model/capabilities';

import { carriesNodeId } from './schema';

/**
 * The root transaction meta that times a batch's repair: `later` for a composition batch, whose repair waits so it never
 * changes composing text, and `now` for the root that settles it (SPEC-rich-text-runtime/AC-034).
 */
export const NORMALIZE_META = 'rte.normalize';

/**
 * A repair transaction appended after another: the same steps for equal states and nothing on its own output
 * (SPEC-rich-text/AC-057), computed synchronously with no I/O, timer or promise (SPEC-rich-text/AC-059).
 */
export type Normalizer = (state: EditorState, ids: IdSource) => Transaction | null;

/** How many nodes carry each `nodeId`, and where the current batch made, moved over or renamed a node that carries one. */
interface NodeIdIndex {
    readonly counts: ReadonlyMap<string, number>;
    readonly touched: readonly number[];
    /** Whether the last root's repair waits, so the next root keeps the touched positions. */
    readonly later: boolean;
}

/** A normalizer, with the plugin key and state it keeps between transactions. */
export interface NormalizerPlugin<T> {
    readonly normalize: Normalizer;
    readonly key: PluginKey<T>;
    readonly field: StateField<T>;
}

const NODE_ID_INDEX = new PluginKey<NodeIdIndex>(NODE_IDS_PLUGIN.id);
// Steps that change no `nodeId`, since their step maps are empty; an `AttrStep` is read on its own, and any other step recounts.
const KEEPS_IDS = [AddMarkStep, RemoveMarkStep, AddNodeMarkStep, RemoveNodeMarkStep, DocAttrStep];

/** Calls `visit` for each node that carries a `nodeId` and starts in `from..to`, both ends included. */
const startingIn = (doc: Node, from: number, to: number, visit: (node: Node, pos: number) => void) => {
    doc.nodesBetween(from, Math.min(to + 1, doc.content.size), (node, pos) => {
        if (pos >= from && pos <= to && carriesNodeId(node)) {
            visit(node, pos);
        }
        return true;
    });
};

/** How many nodes of `doc` carry each `nodeId`. */
const countNodeIds = (doc: Node): Map<string, number> => {
    const counts = new Map<string, number>();
    startingIn(doc, 0, doc.content.size, (node) => {
        const { nodeId } = node.attrs;
        if (typeof nodeId === 'string') {
            counts.set(nodeId, (counts.get(nodeId) ?? 0) + 1);
        }
    });
    return counts;
};

/** The index of `doc` read whole: its counts, with every node that carries a `nodeId` touched. */
const touchEveryNode = (doc: Node, later: boolean): NodeIdIndex => {
    const touched: number[] = [];
    startingIn(doc, 0, doc.content.size, (_node, pos) => touched.push(pos));
    return { counts: countNodeIds(doc), touched, later };
};

/**
 * Keeps the counts current through each transaction from the nodes that start in its steps' changed ranges, so a
 * keystroke reads only what it changed; the touched positions start over with each root transaction.
 */
const nodeIdIndex: StateField<NodeIdIndex> = {
    init: (_config, state) => ({ counts: countNodeIds(state.doc), touched: [], later: false }),
    apply: (transaction, index) => {
        let touched: number[] = [];
        const appended = transaction.getMeta('appendedTransaction') !== undefined;
        if (appended || index.later) {
            touched = index.touched.map((pos) => transaction.mapping.map(pos, 1));
        }
        let { later } = index;
        if (!appended) {
            later = transaction.getMeta(NORMALIZE_META) === 'later';
        }
        // Copied on the first change only, since most transactions change no `nodeId`.
        let own: Map<string, number> | undefined;
        const adjust = (nodeId: unknown, by: number) => {
            if (typeof nodeId !== 'string') {
                return;
            }
            if (own === undefined) {
                own = new Map(index.counts);
            }
            const count = (own.get(nodeId) ?? 0) + by;
            if (count === 0) {
                own.delete(nodeId);
            } else {
                own.set(nodeId, count);
            }
        };
        for (const [at, step] of transaction.steps.entries()) {
            const before = transaction.docs[at] as Node;
            const after = transaction.docs[at + 1] ?? transaction.doc;
            const rest = transaction.mapping.slice(at + 1);
            if (step instanceof AttrStep) {
                if (step.attr === 'nodeId') {
                    adjust(before.nodeAt(step.pos)?.attrs.nodeId, -1);
                    adjust(after.nodeAt(step.pos)?.attrs.nodeId, 1);
                    touched.push(rest.map(step.pos, 1));
                }
            } else if (step instanceof ReplaceStep || step instanceof ReplaceAroundStep) {
                // oxlint-disable-next-line unicorn/no-array-for-each -- `StepMap.forEach` is the public way to read a step's changed ranges.
                step.getMap().forEach((oldStart, oldEnd, newStart, newEnd) => {
                    startingIn(before, oldStart, oldEnd, (node) => adjust(node.attrs.nodeId, -1));
                    startingIn(after, newStart, newEnd, (node, pos) => {
                        adjust(node.attrs.nodeId, 1);
                        touched.push(rest.map(pos, 1));
                    });
                });
            } else if (!KEEPS_IDS.some((kind) => step instanceof kind)) {
                return touchEveryNode(transaction.doc, later);
            }
        }
        let counts = index.counts;
        if (own !== undefined) {
            counts = own;
        }
        return { counts, touched, later };
    },
};

/**
 * Gives each node of a type that carries a `nodeId` and has none, and each later one of two with one ID in document
 * order, a new ID, so the first keeps its ID and every link and target that names it (SPEC-rich-text-runtime/AC-092).
 * It reads the nodes the batch touched against the index; a state without the index, as a contract case builds, counts
 * and touches every node.
 */
const fillNodeIds: Normalizer = (state, ids) => {
    const { doc } = state;
    let index = NODE_ID_INDEX.getState(state);
    if (index === undefined) {
        index = touchEveryNode(doc, false);
    }
    const repairs = new Set<number>();
    const repeated = new Set<string>();
    for (const pos of index.touched) {
        const node = doc.nodeAt(pos);
        if (node !== null && carriesNodeId(node)) {
            const { nodeId } = node.attrs;
            if (typeof nodeId !== 'string') {
                repairs.add(pos);
            } else if ((index.counts.get(nodeId) ?? 0) > 1) {
                repeated.add(nodeId);
            }
        }
    }
    if (repeated.size > 0) {
        // Which of two is later needs their order, so only a repeated ID walks the document.
        const seen = new Set<string>();
        startingIn(doc, 0, doc.content.size, (node, pos) => {
            const { nodeId } = node.attrs;
            if (typeof nodeId !== 'string' || !repeated.has(nodeId)) {
                return;
            }
            if (seen.has(nodeId)) {
                repairs.add(pos);
            }
            seen.add(nodeId);
        });
    }
    if (repairs.size === 0) {
        return null;
    }
    const drawn = new Set<string>();
    const transaction = state.tr;
    for (const pos of [...repairs].sort((a, b) => a - b)) {
        let nodeId = ids.next('node');
        // A drawn ID that another node already holds would take that node's ID from it.
        while (index.counts.has(nodeId) || drawn.has(nodeId)) {
            nodeId = ids.next('node');
        }
        drawn.add(nodeId);
        transaction.setNodeAttribute(pos, 'nodeId', nodeId);
    }
    return transaction;
};

/** The package's normalizers by the plugin ID that runs each, in the `structure` phase. */
export const NORMALIZERS: Readonly<Record<string, NormalizerPlugin<NodeIdIndex>>> = {
    [NODE_IDS_PLUGIN.id]: { normalize: fillNodeIds, key: NODE_ID_INDEX, field: nodeIdIndex },
};
