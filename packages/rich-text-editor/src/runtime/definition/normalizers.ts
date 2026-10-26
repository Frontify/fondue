/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Fragment, type Node } from 'prosemirror-model';
import { type EditorState, PluginKey, type StateField, type Transaction } from 'prosemirror-state';
import {
    AddMarkStep,
    AddNodeMarkStep,
    AttrStep,
    DocAttrStep,
    Mapping,
    type Mappable,
    RemoveMarkStep,
    RemoveNodeMarkStep,
    ReplaceAroundStep,
    ReplaceStep,
    Step,
    StepMap,
    StepResult,
} from 'prosemirror-transform';

import { NODE_IDS_PLUGIN } from '#/model/internal';

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
type NodeIdIndex = {
    counts: ReadonlyMap<string, number>;
    touched: readonly number[];
    /** Whether the last root's repair waits, so the next root keeps the touched positions and the batch mapping. */
    later: boolean;
    mapping: Mapping;
};

/** A node that carries a `nodeId`, with its position. */
type Holder = {
    node: Node;
    pos: number;
};

/** A normalizer, with the plugin key and state it keeps between transactions. */
export type NormalizerPlugin<T> = {
    normalize: Normalizer;
    key: PluginKey<T>;
    field: StateField<T>;
};

/** The nodes of `doc` that start at `positions`, read in one walk. */
const nodesAt = (doc: Node, positions: readonly number[]): Map<number, Node> => {
    const wanted = new Set(positions);
    const found = new Map<number, Node>();
    if (positions.length === 0) {
        return found;
    }

    let from = Number.POSITIVE_INFINITY;
    let to = Number.NEGATIVE_INFINITY;
    for (const pos of positions) {
        from = Math.min(from, pos);
        to = Math.max(to, pos);
    }

    doc.nodesBetween(from, Math.min(to + 1, doc.content.size), (node, pos) => {
        if (wanted.has(pos)) {
            found.set(pos, node);
        }

        return true;
    });

    return found;
};

/**
 * Sets the `nodeId` of the node at each position in one step, ascending, which maps no position as an `AttrStep` does,
 * while one `AttrStep` per node copies the document once each.
 */
export class NodeIdsStep extends Step {
    constructor(readonly ids: readonly (readonly [number, unknown])[]) {
        super();
    }

    apply(doc: Node): StepResult {
        let at = 0;
        const pending = () => this.ids[at]?.[0] ?? Number.POSITIVE_INFINITY;
        /** `parent`'s content with each listed node in it set, from `start`, or `undefined` when a position starts no node. */
        const rebuild = (parent: Node, start: number): Fragment | undefined => {
            const children: Node[] = [];
            let pos = start;
            for (let index = 0; index < parent.childCount; index += 1) {
                const child = parent.child(index);
                const end = pos + child.nodeSize;
                if (pending() < pos) {
                    return undefined;
                }

                if (pending() >= end || child.isText) {
                    children.push(child);
                    pos = end;
                    continue;
                }

                let attrs = child.attrs;
                const id = this.ids[at];
                if (id !== undefined && id[0] === pos) {
                    attrs = { ...child.attrs, nodeId: id[1] };
                    at += 1;
                }

                let content: Fragment | undefined = child.content;
                if (pending() < end) {
                    content = rebuild(child, pos + 1);
                }

                if (content === undefined) {
                    return undefined;
                }

                children.push(child.type.create(attrs, content, child.marks));
                pos = end;
            }

            return Fragment.fromArray(children);
        };

        const content = rebuild(doc, 0);
        if (content === undefined || at < this.ids.length) {
            return StepResult.fail("No node at a node ID step's position");
        }

        return StepResult.ok(doc.copy(content));
    }

    getMap(): StepMap {
        return StepMap.empty;
    }

    invert(doc: Node): NodeIdsStep {
        const nodes = nodesAt(
            doc,
            this.ids.map(([pos]) => pos),
        );

        return new NodeIdsStep(this.ids.map(([pos]) => [pos, nodes.get(pos)?.attrs.nodeId]));
    }

    map(mapping: Mappable): NodeIdsStep | null {
        const ids: (readonly [number, unknown])[] = [];
        for (const [pos, nodeId] of this.ids) {
            const mapped = mapping.mapResult(pos, 1);
            if (!mapped.deletedAfter) {
                ids.push([mapped.pos, nodeId]);
            }
        }

        if (ids.length === 0) {
            return null;
        }

        return new NodeIdsStep(ids);
    }

    toJSON() {
        return { stepType: 'rte.nodeIds', ids: this.ids };
    }
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
            } else if (step instanceof NodeIdsStep) {
                const nodes = nodesAt(
                    before,
                    step.ids.map(([pos]) => pos),
                );
                for (const [pos, nodeId] of step.ids) {
                    adjust(nodes.get(pos)?.attrs.nodeId, -1);
                    adjust(nodeId, 1);
                    touched.push(rest.map(pos, 1));
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
    const nodes = nodesAt(doc, index.touched);
    for (const pos of index.touched) {
        const node = nodes.get(pos);
        if (node !== undefined && carriesNodeId(node)) {
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
    const ids: (readonly [number, string])[] = [];
    for (const pos of [...repairs].sort((a, b) => a - b)) {
        let nodeId = generateId();
        // A drawn ID that another node already holds would take that node's ID from it.
        while (index.counts.has(nodeId) || drawn.has(nodeId)) {
            nodeId = generateId();
        }

        drawn.add(nodeId);
        ids.push([pos, nodeId]);
    }

    return state.tr.step(new NodeIdsStep(ids));
};

/** The package's normalizers by the plugin ID that runs each, in the `structure` phase. */
export const NORMALIZERS: Readonly<Record<string, NormalizerPlugin<NodeIdIndex>>> = {
    [NODE_IDS_PLUGIN.id]: { normalize: fillNodeIds, key: NODE_ID_INDEX, field: nodeIdIndex },
};
