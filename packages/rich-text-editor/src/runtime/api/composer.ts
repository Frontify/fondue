/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';
import { type EditorState, type Transaction } from 'prosemirror-state';
import { Mapping } from 'prosemirror-transform';

import { type CommandContext, type EngineCommand } from '#/runtime/definition';

import { LAST_MARK_META } from '../capabilities';
import { type EditorRange } from '../documentApi';
import { nodeStateChanges, withNodeState } from '../nodeState';
import { appendSteps, carrySelection } from '../transactions';

import { type Positions, RANGES } from './shared';

/** Builds one transaction from the edits of a command, so the command stays one undo step. */
export const composer = (base: EditorState) => {
    let current = base;
    let first: Transaction | undefined;
    let outer: Transaction | undefined;
    const mapping = new Mapping();
    // Each document the command has seen, with the index of the first step made after it.
    const seen = new Map<Node, number>([[base.doc, 0]]);
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
        current = current.apply(next);
        if (!seen.has(current.doc)) {
            seen.set(current.doc, mapping.maps.length);
        }
    };

    return {
        state: () => current,
        /** `range` mapped through the steps made since it was read, or `undefined` when it was read before the command. */
        resolve: (range: EditorRange): Positions | undefined => {
            const read = RANGES.get(range);
            const start = read === undefined ? undefined : seen.get(read.doc);
            if (read === undefined || start === undefined) {
                return undefined;
            }

            const since = mapping.slice(start);
            const from = since.map(read.from, 1);

            return { from, to: Math.max(from, since.map(read.to, -1)) };
        },
        apply: (command: EngineCommand, payload?: unknown, context?: CommandContext) => {
            let built: Transaction | undefined;
            const applied = command.run(
                current,
                (transaction) => {
                    built = transaction;
                },
                payload,
                context,
            );
            if (applied && built !== undefined) {
                take(built);
            }

            return applied;
        },
        select: (transaction: Transaction) => take(transaction),
        finish: (): Transaction | undefined => {
            if (outer === undefined) {
                return first;
            }

            return outer.setSelection(carrySelection(outer.doc, current.selection));
        },
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
