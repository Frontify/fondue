/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';
import { type EditorState, type Transaction } from 'prosemirror-state';
import { Mapping } from 'prosemirror-transform';

import { type CommandContext, type EngineCommand } from '#/runtime/definition';

import { LAST_MARK_META } from '../capabilities';
import { nodeStateChanges, withNodeState } from '../statePlugins/nodeState';
import { appendSteps, carrySelection } from '../transform/transactions';

import { type EditorRange } from './documentApi';
import { type Positions, RANGES } from './shared';

type PendingEdit = {
    transaction: Transaction;
    mapIndex: number;
};

type EditLog = {
    take: (next: Transaction) => void;
    /** The document after every edit so far. */
    document: () => EditorState;
    /** `range` mapped through the steps made since it was read, or `undefined` when it was read before the command. */
    resolve: (range: EditorRange) => Positions | undefined;
    finish: () => Transaction | undefined;
};

/** Each document the command has seen, with the index of the first step made after it. */
type SeenDocuments = Map<Node, number>;

const positionsOf = (seen: SeenDocuments, mapping: Mapping, range: EditorRange): Positions | undefined => {
    const read = RANGES.get(range);
    if (read === undefined) {
        return undefined;
    }

    const start = seen.get(read.doc);
    if (start === undefined) {
        return undefined;
    }

    const since = mapping.slice(start);
    const from = since.map(read.from, 1);

    return { from, to: Math.max(from, since.map(read.to, -1)) };
};

// An edit is applied to the composer's state only when something reads that state, so a single-edit command never
// applies its transaction before the caller does.
const editLog = (base: EditorState): EditLog => {
    let current = base;
    let first: Transaction | undefined;
    let outer: Transaction | undefined;
    let pendingEdit: PendingEdit | undefined;
    const mapping = new Mapping();
    const seen: SeenDocuments = new Map([[base.doc, 0]]);
    const applyPending = () => {
        if (pendingEdit === undefined) {
            return;
        }

        const edit = pendingEdit;
        pendingEdit = undefined;
        current = current.apply(edit.transaction);
        if (!seen.has(current.doc)) {
            seen.set(current.doc, edit.mapIndex);
        }
    };

    const document = () => {
        applyPending();

        return current;
    };

    const take = (next: Transaction) => {
        if (first === undefined) {
            first = next;
        } else {
            if (outer === undefined) {
                outer = base.tr;
                appendSteps(outer, first);
                carryState(outer, first);
            }

            appendSteps(outer, next);
            carryState(outer, next);
        }

        mapping.appendMapping(next.mapping);
        applyPending();
        pendingEdit = { transaction: next, mapIndex: mapping.maps.length };
    };

    const resolve = (range: EditorRange) => {
        // The pending edit's document enters `seen` only once it is applied.
        applyPending();

        return positionsOf(seen, mapping, range);
    };

    const finish = () => {
        if (outer === undefined) {
            return first;
        }

        applyPending();

        return outer.setSelection(carrySelection(outer.doc, current.selection));
    };

    return { take, document, resolve, finish };
};

/** Builds one transaction from the edits of a command, so the command stays one undo step. */
export const composer = (base: EditorState) => {
    const log = editLog(base);

    return {
        state: log.document,
        resolve: log.resolve,
        apply: (command: EngineCommand, payload?: unknown, context?: CommandContext) => {
            let built: Transaction | undefined;
            const applied = command.run(
                log.document(),
                (transaction) => {
                    built = transaction;
                },
                payload,
                context,
            );
            if (applied && built !== undefined) {
                log.take(built);
            }

            return applied;
        },
        select: (transaction: Transaction) => log.take(transaction),
        finish: log.finish,
    };
};

/** What one edit of a composed command leaves besides its steps: stored marks, scrolling and the last mark it set. */
const carryState = (outer: Transaction, next: Transaction) => {
    if (next.storedMarksSet) {
        outer.setStoredMarks(next.storedMarks);
    }

    if (next.scrolledIntoView) {
        outer.scrollIntoView();
    }

    const mark: unknown = next.getMeta(LAST_MARK_META);
    if (mark !== undefined) {
        outer.setMeta(LAST_MARK_META, mark);
    }

    const flags = nodeStateChanges(next);
    if (flags.length > 0) {
        withNodeState(outer, flags);
    }
};
