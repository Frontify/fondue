/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';
import { type EditorState, PluginKey, type StateField, type Transaction } from 'prosemirror-state';
import {
    AddMarkStep,
    AddNodeMarkStep,
    AttrStep,
    DocAttrStep,
    Mapping,
    RemoveMarkStep,
    RemoveNodeMarkStep,
    ReplaceAroundStep,
    ReplaceStep,
} from 'prosemirror-transform';

import { NODE_IDS_PLUGIN } from '#/model/capabilities';

import { carriesNodeId } from './schema';

/**
 * The root transaction meta that times a batch's repair: `later` for a composition batch, whose repair waits so it never
 * changes composing text, and `now` for the root that settles it.
 */
export const NORMALIZE_META = 'rte.normalize';

/**
 * A repair transaction appended after another: the same steps for equal states and nothing on its own output,
 * computed synchronously with no I/O, timer or promise.
 */
export type Normalizer = (state: EditorState, generateId: () => string) => Transaction | null;

/**
 * How many nodes carry each `nodeId`, where the current batch made, moved over or renamed a node that carries one, and
 * how the batch maps the document before it to this one.
 */
interface NodeIdIndex {
    readonly counts: ReadonlyMap<string, number>;
    readonly touched: readonly number[];
    /** Whether the last root's repair waits, so the next root keeps the touched positions and the batch mapping. */
    readonly later: boolean;
    readonly mapping: Mapping;
}

/** A node that carries a `nodeId`, with its position. */
interface Holder {
    readonly node: Node;
    readonly pos: number;
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
const touchEveryNode = (doc: Node, later: boolean, mapping: Mapping): NodeIdIndex => {
    const touched: number[] = [];
    startingIn(doc, 0, doc.content.size, (_node, pos) => touched.push(pos));
    return { counts: countNodeIds(doc), touched, later, mapping };
};

/** Whether a node is a leaf or holds one, such as text, unlike the empty part a split at a node's very start leaves. */
const holdsContent = (node: Node): boolean => {
    let found = node.isLeaf;
    node.descendants((child) => {
        found ||= child.isLeaf;
        return !found;
    });
    return found;
};

/**
 * Of the nodes in document order that share one `nodeId`, the one that keeps it: the first whose position maps back
 * through the batch to the document before it, else the first, so the node the batch created takes a new ID; an empty
 * node directly before one with content, as a split at its very start leaves, hands the ID on.
 */
const keeperOf = (holders: readonly Holder[], back: Mapping): Holder => {
    let keeper = holders.find(({ pos }) => !back.mapResult(pos).deleted) ?? (holders[0] as Holder);
    const next = holders[holders.indexOf(keeper) + 1];
    if (
        next !== undefined &&
        next.pos === keeper.pos + keeper.node.nodeSize &&
        !holdsContent(keeper.node) &&
        holdsContent(next.node)
    ) {
        keeper = next;
    }
    return keeper;
};

/**
 * Keeps the counts current through each transaction from the nodes that start in its steps' changed ranges, so a
 * keystroke reads only what it changed; the touched positions and the batch mapping start over with each root
 * transaction, unless the last root's repair waits.
 */
const nodeIdIndex: StateField<NodeIdIndex> = {
    init: (_config, state) => ({ counts: countNodeIds(state.doc), touched: [], later: false, mapping: new Mapping() }),
    apply: (transaction, index) => {
        let touched: number[] = [];
        let mapping = transaction.mapping;
        const appended = transaction.getMeta('appendedTransaction') !== undefined;
        if (appended || index.later) {
            touched = index.touched.map((pos) => transaction.mapping.map(pos, 1));
            mapping = index.mapping.slice();
            mapping.appendMapping(transaction.mapping);
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
                return touchEveryNode(transaction.doc, later, mapping);
            }
        }
        let counts = index.counts;
        if (own !== undefined) {
            counts = own;
        }
        return { counts, touched, later, mapping };
    },
};

/**
 * Gives each node of a type that carries a `nodeId` and has none, and each node but the keeper of those that share
 * one, a new ID, so the node that existed keeps its ID and every link and target that names it.
 * It reads the nodes the batch touched against the index. A state without the index counts and touches every node,
 * and treats every node as one that existed.
 */
const fillNodeIds: Normalizer = (state, generateId) => {
    const { doc } = state;
    let index = NODE_ID_INDEX.getState(state);
    if (index === undefined) {
        index = touchEveryNode(doc, false, new Mapping());
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
        // Every node that shares a touched ID needs its place in document order, so only a repeated ID walks the document.
        const holders = new Map<string, Holder[]>();
        startingIn(doc, 0, doc.content.size, (node, pos) => {
            const { nodeId } = node.attrs;
            if (typeof nodeId !== 'string' || !repeated.has(nodeId)) {
                return;
            }
            let shared = holders.get(nodeId);
            if (shared === undefined) {
                shared = [];
                holders.set(nodeId, shared);
            }
            shared.push({ node, pos });
        });
        const back = index.mapping.invert();
        for (const shared of holders.values()) {
            const keeper = keeperOf(shared, back);
            for (const holder of shared) {
                if (holder !== keeper) {
                    repairs.add(holder.pos);
                }
            }
        }
    }
    if (repairs.size === 0) {
        return null;
    }
    const drawn = new Set<string>();
    const transaction = state.tr;
    for (const pos of [...repairs].sort((a, b) => a - b)) {
        let nodeId = generateId();
        // A drawn ID that another node already holds would take that node's ID from it.
        while (index.counts.has(nodeId) || drawn.has(nodeId)) {
            nodeId = generateId();
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
