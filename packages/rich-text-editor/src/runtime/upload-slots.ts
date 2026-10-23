/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState, Plugin, PluginKey, Selection, type Transaction } from 'prosemirror-state';
import { Mapping, type Step } from 'prosemirror-transform';

import { type JsonObject } from '#/model';

import { positionOf } from './positions';

/** The transaction meta of a slot's start: the insertion of new slots, or a replacement's previous attributes. */
export const SLOT_START_META = 'rte.upload-slot';

export type SlotStart =
    | { readonly kind: 'insert'; readonly nodeIds: readonly string[] }
    | { readonly kind: 'replace'; readonly nodeId: string; readonly previous: JsonObject };

/** What the session's uploads answer about a slot, read when a command runs. */
export interface SlotUploads {
    /** Whether the slot's upload runs or waits, which Cancel ends. */
    readonly active: (nodeId: string) => boolean;
    /** Whether the slot is not done: its upload runs, waits, failed or stopped, and a retry may start it again. */
    readonly kept: (nodeId: string) => boolean;
    /** Whether the slot keeps the file of an upload that failed or stopped, which Retry sends again. */
    readonly retryable: (nodeId: string) => boolean;
}

/**
 * How a slot entered the document. A slot that an insertion of one slot added keeps the insertion's inverted steps
 * with the maps of every later change, so Cancel restores what it replaced; a replacement keeps the attributes it
 * replaced.
 */
type SlotEntry =
    | { readonly kind: 'insert'; readonly inverse: readonly Step[] | undefined; readonly mapping: Mapping }
    | { readonly kind: 'replace'; readonly previous: JsonObject };

interface SlotState {
    readonly uploads: SlotUploads;
    readonly entries: ReadonlyMap<string, SlotEntry>;
}

const key = new PluginKey<SlotState>('rte.upload-slots');
// The transaction meta that gives a fresh state the entries of the state it replaces, as a history reset does.
const CARRY_META = 'rte.upload-slots-carry';

/** The entries of the slots that are not done, with the maps of `tr`, then the slots that `tr` starts. */
const applySlots = (tr: Transaction, value: SlotState): SlotState => {
    const carried = tr.getMeta(CARRY_META) as SlotState['entries'] | undefined;
    if (carried !== undefined) {
        return { uploads: value.uploads, entries: carried };
    }
    const started = tr.getMeta(SLOT_START_META) as SlotStart | undefined;
    if (!tr.docChanged && started === undefined) {
        return value;
    }
    const entries = new Map<string, SlotEntry>();
    for (const [nodeId, entry] of value.entries) {
        if (!value.uploads.kept(nodeId)) {
            continue;
        }
        if (entry.kind === 'insert') {
            entries.set(nodeId, { ...entry, mapping: new Mapping([...entry.mapping.maps, ...tr.mapping.maps]) });
        } else {
            entries.set(nodeId, entry);
        }
    }
    if (started?.kind === 'insert') {
        let inverse: Step[] | undefined;
        // Only the one slot of its insertion restores what the insertion replaced.
        if (started.nodeIds.length === 1) {
            inverse = tr.steps.map((step, index) => step.invert(tr.docs[index] as EditorState['doc'])).reverse();
        }
        for (const nodeId of started.nodeIds) {
            entries.set(nodeId, { kind: 'insert', inverse, mapping: new Mapping() });
        }
    } else if (started?.kind === 'replace') {
        entries.set(started.nodeId, { kind: 'replace', previous: started.previous });
    }
    return { uploads: value.uploads, entries };
};

/** Keeps how each slot that is not done entered the document, which `cancelSlot` reverses. */
export const uploadSlotsPlugin = (uploads: SlotUploads): Plugin<SlotState> =>
    new Plugin<SlotState>({
        key,
        state: { init: () => ({ uploads, entries: new Map() }), apply: applySlots },
    });

/** A transaction on `fresh`, a state of the same document, that gives it the slot entries of `from`. */
export const carrySlots = (from: EditorState, fresh: EditorState): Transaction =>
    fresh.tr.setMeta(CARRY_META, key.getState(from)?.entries ?? new Map()).setMeta('addToHistory', false);

/** The session's uploads, or none for a state that no editor session made. */
export const slotUploadsOf = (state: EditorState): SlotUploads | undefined => key.getState(state)?.uploads;

/** The figure position and node of the slot `nodeId`, an `asset_image` with no asset. */
const slotAt = (state: EditorState, nodeId: string) => {
    const pos = positionOf(state.doc, nodeId);
    const node = pos === undefined ? null : state.doc.nodeAt(pos);
    if (pos === undefined || node === null || node.type.name !== 'asset_image') {
        return undefined;
    }
    return { pos, node };
};

/** Removes the figure that holds the image at `pos`, and puts the caret where it was. */
const removeFigure = (state: EditorState, pos: number): Transaction => {
    const $pos = state.doc.resolve(pos);
    const from = $pos.depth > 0 ? $pos.before() : pos;
    const to = $pos.depth > 0 ? $pos.after() : pos + 1;
    const tr = state.tr.delete(from, to);
    return tr.setSelection(Selection.near(tr.doc.resolve(tr.mapping.map(from)))).scrollIntoView();
};

/**
 * The step that cancels the running upload of slot `nodeId`: an inserted slot leaves with what its insertion replaced
 * restored, and a replaced image gets its previous attributes back; `undefined` when no upload of it runs.
 */
export const cancelSlot = (state: EditorState, nodeId: string): Transaction | undefined => {
    const value = key.getState(state);
    const entry = value?.entries.get(nodeId);
    const slot = slotAt(state, nodeId);
    if (value === undefined || entry === undefined || slot === undefined || !value.uploads.active(nodeId)) {
        return undefined;
    }
    if (entry.kind === 'replace') {
        const tr = state.tr;
        for (const [name, attribute] of Object.entries(entry.previous)) {
            if (name !== 'nodeId') {
                tr.setNodeAttribute(slot.pos, name, attribute);
            }
        }
        return tr;
    }
    if (entry.inverse !== undefined) {
        const tr = state.tr;
        const restored = entry.inverse.every((step) => {
            const mapped = step.map(entry.mapping);
            return mapped !== null && tr.maybeStep(mapped).failed === null;
        });
        if (restored && positionOf(tr.doc, nodeId) === undefined) {
            const at = Math.min(tr.mapping.map(slot.pos, -1), tr.doc.content.size);
            return tr.setSelection(Selection.near(tr.doc.resolve(at))).scrollIntoView();
        }
    }
    return removeFigure(state, slot.pos);
};
