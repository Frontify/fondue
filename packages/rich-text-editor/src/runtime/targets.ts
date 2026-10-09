/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type EditorState,
    NodeSelection,
    Plugin,
    PluginKey,
    type Selection,
    TextSelection,
    type Transaction,
} from 'prosemirror-state';

import { carriesNodeId } from '#/definition';

import { type CaptureTargetOptions } from './types';

/** A captured target as the keyed plugin state holds it (SPEC-rich-text-runtime/AC-040). */
interface Target extends CaptureTargetOptions {
    readonly from: number;
    readonly to: number;
    /** The type and `nodeId` of the node an `edit-node` target refers to. */
    readonly node: { readonly type: string; readonly nodeId: unknown } | null;
    readonly valid: boolean;
}
type Targets = ReadonlyMap<string, Target>;

const TARGETS = new PluginKey<Targets>('rte.targets');

const targetsOf = (state: EditorState): Targets => TARGETS.getState(state) ?? new Map<string, Target>();

/** How many targets a state holds, which the `src/testing` probe counts (SPEC-rich-text-runtime/AC-060). */
export const countTargets = (state: EditorState): number => targetsOf(state).size;

/** Maps a valid target through the steps of one transaction, and invalidates it when an edit removes or crosses it. */
const mapTarget = (target: Target, mapping: Transaction['mapping']): Target => {
    let { from, to } = target;
    let intersected = false;
    let deleted = false;
    // Text typed at an insert point lands before it (AC-044), text typed at a range's edge stays outside it, and an empty range stays empty (AC-076).
    let endAssoc = -1;
    if (target.purpose === 'insert' || target.from === target.to) {
        endAssoc = 1;
    }
    for (const map of mapping.maps) {
        // oxlint-disable-next-line unicorn/no-array-for-each -- `StepMap.forEach` is the public way to read a step's changed ranges.
        map.forEach((start, end, newStart, newEnd) => {
            if (start < to && end > from) {
                intersected = true;
            }
            // A step that removes the whole range, or a span around an empty one, deletes it, though its positions still resolve (AC-042).
            const removes = (from < to && start <= from && end >= to) || (start < from && end > to);
            // An attribute edit of a leaf replaces it in place, which the `edit-node` check of type and `nodeId` judges (AC-043).
            const replacedInPlace = target.purpose === 'edit-node' && newEnd > newStart;
            if (removes && !replacedInPlace) {
                deleted = true;
            }
        });
        from = map.map(from, 1);
        to = map.map(to, endAssoc);
    }
    const invalidated = intersected && target.onIntersectingEdit === 'invalidate';
    return { ...target, from, to, valid: !deleted && !invalidated };
};

/** Holds the session's targets in plugin state, so each maps through every accepted transaction exactly once (AC-040). */
export const targetsPlugin = new Plugin<Targets>({
    key: TARGETS,
    state: {
        init: () => new Map(),
        apply: (transaction, targets) => {
            const captured = transaction.getMeta(TARGETS) as
                | { readonly id: string; readonly target: Target }
                | undefined;
            if (!transaction.docChanged && captured === undefined) {
                return targets;
            }
            const next = new Map<string, Target>();
            for (const [id, target] of targets) {
                let mapped = target;
                if (target.valid) {
                    mapped = mapTarget(target, transaction.mapping);
                }
                next.set(id, mapped);
            }
            if (captured !== undefined) {
                next.set(captured.id, captured.target);
            }
            return next;
        },
    },
});

/** A transaction that captures the selection as target `id`: its range, its start for `insert`, or the node after its start for `edit-node`. */
export const captureTarget = (state: EditorState, id: string, options: CaptureTargetOptions): Transaction => {
    const { purpose, onIntersectingEdit } = options;
    const { from } = state.selection;
    let { to } = state.selection;
    let node: Target['node'] = null;
    let valid = true;
    if (purpose === 'insert') {
        to = from;
    }
    if (purpose === 'edit-node') {
        const after = state.selection.$from.nodeAfter;
        // A node whose type carries a `nodeId` needs one to be edited through a target (AC-043).
        valid = after !== null && !after.isText && (!carriesNodeId(after) || typeof after.attrs.nodeId === 'string');
        if (after !== null && valid) {
            node = { type: after.type.name, nodeId: after.attrs.nodeId };
            to = from + after.nodeSize;
        }
    }
    const target: Target = { purpose, onIntersectingEdit, from, to, node, valid };
    return state.tr.setMeta(TARGETS, { id, target });
};

/** The selection a command runs on through target `id`, or `undefined` when the target is gone or invalid. */
export const targetSelection = (state: EditorState, id: string): Selection | undefined => {
    const target = targetsOf(state).get(id);
    if (target === undefined || !target.valid) {
        return undefined;
    }
    const { doc } = state;
    if (target.purpose !== 'edit-node') {
        return TextSelection.between(doc.resolve(target.from), doc.resolve(target.to));
    }
    // Valid only while a node of that type and `nodeId` sits at the mapped position (AC-043).
    const node = doc.nodeAt(target.from);
    if (
        node === null ||
        target.node === null ||
        node.type.name !== target.node.type ||
        node.attrs.nodeId !== target.node.nodeId
    ) {
        return undefined;
    }
    return NodeSelection.create(doc, target.from);
};
