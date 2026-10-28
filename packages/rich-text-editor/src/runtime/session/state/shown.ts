/* (c) Copyright Frontify Ltd., all rights reserved. */

import { GapCursor } from 'prosemirror-gapcursor';
import { type Node } from 'prosemirror-model';
import { AllSelection, NodeSelection, type Selection, TextSelection, type Transaction } from 'prosemirror-state';

import { type RichTextDocument } from '#/model';
import { snapshot } from '#/model/internal';

import { type RuntimeEvents } from '../../reporting/events';
import { type ColumnState } from '../../statePlugins/columns';
import { type DocumentStamp, type SaveStatus, type SelectionSummary, type Snapshot } from '../../types';

import { type Store } from './store';
import { type Mode } from './types';

const kindOf = (selection: Selection): SelectionSummary['kind'] => {
    if (selection instanceof TextSelection) {
        return 'text';
    }

    if (selection instanceof NodeSelection) {
        return 'node';
    }

    if (selection instanceof AllSelection) {
        return 'all';
    }

    if (selection instanceof GapCursor) {
        return 'gap';
    }

    return 'none';
};

/** The kind, collapse state, block type and selected node ID of `selection`, as events and summaries report it. */
export const summarize = (selection: Selection): SelectionSummary => {
    let selectedNodeId: string | null = null;
    if (selection instanceof NodeSelection && typeof selection.node.attrs.nodeId === 'string') {
        selectedNodeId = selection.node.attrs.nodeId;
    }

    const { parent } = selection.$from;
    let blockType: string | null = null;
    if (parent.isTextblock) {
        blockType = parent.type.name;
    }

    return { kind: kindOf(selection), collapsed: selection.empty, blockType, selectedNodeId };
};

const sameSelection = (left: SelectionSummary, right: SelectionSummary) =>
    left.kind === right.kind &&
    left.collapsed === right.collapsed &&
    left.blockType === right.blockType &&
    left.selectedNodeId === right.selectedNodeId;

/** Takes `next` into the slot and returns `true` unless `same` finds it equal to what the slot holds. */
export const changed = <Value>(
    slot: { value: Value },
    next: Value,
    same: (left: Value, right: Value) => boolean,
): boolean => {
    if (same(slot.value, next)) {
        return false;
    }

    slot.value = next;

    return true;
};

type SnapshotKey = { doc: Node; composing: boolean; revision: SaveStatus['revision'] };

export type Shown = {
    /** The mode and columns the surface shows, which follow the session's once input has settled. */
    mode(): Mode;
    columns(): ColumnState;
    sync(mode: Mode, columns: ColumnState): void;
    /** The state whose document the snapshot and `sequence` last published. */
    published(): Store['state'];
    setPublished(state: Store['state']): void;
    /** How the provisional batches since then map the published document. */
    provisional(): Transaction['mapping'] | undefined;
    addProvisional(mapping: Transaction['mapping']): void;
    /** Hands the mapping over and forgets it. */
    takeProvisional(): Transaction['mapping'] | undefined;
    /** The same frozen object until the published document, the composition state or the revision changes. */
    snapshot(): Snapshot;
    emitSelection(): void;
    emitSaveStatus(): void;
    /** Takes the save status as already shown, so only a later change emits. */
    primeStatus(): void;
};

export const createShown = (args: {
    store: Store;
    mode: Mode;
    columns: ColumnState;
    emit: <EventName extends 'selectionChange' | 'saveStatusChange'>(
        event: EventName,
        value: RuntimeEvents[EventName],
    ) => void;
    saveStatus: () => SaveStatus;
    composing: () => boolean;
    stamp: () => DocumentStamp;
    encodeByBlock: (doc: Node) => RichTextDocument;
}): Shown => {
    let mode = args.mode;
    let columns = args.columns;
    let published = args.store.state;
    let provisional: Transaction['mapping'] | undefined;
    let cached: Snapshot | undefined;
    const status: { value: SaveStatus | undefined } = { value: undefined };
    const selection = { value: summarize(args.store.state.selection) };
    const key: { value: SnapshotKey | undefined } = { value: undefined };

    return {
        mode: () => mode,
        columns: () => columns,
        sync: (nextMode, nextColumns) => {
            mode = nextMode;
            columns = nextColumns;
        },
        published: () => published,
        setPublished: (state) => {
            published = state;
        },
        provisional: () => provisional,
        addProvisional: (mapping) => {
            if (provisional === undefined) {
                provisional = mapping;
            } else {
                provisional.appendMapping(mapping);
            }
        },
        takeProvisional: () => {
            const taken = provisional;
            provisional = undefined;

            return taken;
        },
        snapshot: () => {
            const next = { doc: published.doc, composing: args.composing(), revision: args.saveStatus().revision };
            const sameKey = (left: SnapshotKey | undefined, right: SnapshotKey | undefined) =>
                left?.doc === right?.doc && left?.composing === right?.composing && left?.revision === right?.revision;
            const moved = changed(key, next, sameKey);

            if (moved || cached === undefined) {
                // The key is already taken, so an encode that throws must not leave the old value to serve it.
                cached = undefined;
                cached = snapshot({
                    stamp: args.stamp(),
                    document: args.encodeByBlock(published.doc),
                    acknowledgedRevision: next.revision,
                    compositionActive: next.composing,
                });
            }

            return cached;
        },
        emitSelection: () => {
            const next = summarize(args.store.state.selection);
            if (changed(selection, next, sameSelection)) {
                args.emit('selectionChange', next);
            }
        },
        emitSaveStatus: () => {
            const next = args.saveStatus();
            if (changed(status, next, Object.is)) {
                args.emit('saveStatusChange', next);
            }
        },
        primeStatus: () => {
            status.value = args.saveStatus();
        },
    };
};
