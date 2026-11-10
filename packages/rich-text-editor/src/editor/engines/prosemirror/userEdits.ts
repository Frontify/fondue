/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState, Plugin, PluginKey, type Transaction } from 'prosemirror-state';
import {
    AddMarkStep,
    AddNodeMarkStep,
    AttrStep,
    DocAttrStep,
    RemoveMarkStep,
    RemoveNodeMarkStep,
    type Step,
    type StepMap,
} from 'prosemirror-transform';

/** What one change wrote: a stretch of content (empty where it only deleted), or one attribute of the node at `pos`. */
type Edit = { kind: 'content'; from: number; to: number } | { kind: 'attribute'; pos: number; name: string };

type Side = 'before' | 'after';

const userEditsKey = new PluginKey<readonly Edit[]>('rte-user-edits');

/** The edits `step` makes, at positions in the document before or after it. */
const editsOf = (step: Step, side: Side): Edit[] => {
    if (step instanceof AttrStep) {
        return [{ kind: 'attribute', pos: step.pos, name: step.attr }];
    }
    if (step instanceof AddMarkStep || step instanceof RemoveMarkStep) {
        return [{ kind: 'content', from: step.from, to: step.to }];
    }
    if (step instanceof AddNodeMarkStep || step instanceof RemoveNodeMarkStep) {
        return [{ kind: 'content', from: step.pos, to: step.pos + 1 }];
    }
    if (step instanceof DocAttrStep) {
        // The engine document carries no attributes of its own; its root keys live outside it.
        return [];
    }
    const edits: Edit[] = [];
    // oxlint-disable-next-line unicorn/no-array-for-each -- StepMap.forEach is ProseMirror's only way to read a step's ranges.
    step.getMap().forEach((oldStart, oldEnd, newStart, newEnd) => {
        if (side === 'before') {
            edits.push({ kind: 'content', from: oldStart, to: oldEnd });
        } else {
            edits.push({ kind: 'content', from: newStart, to: newEnd });
        }
    });
    return edits;
};

/**
 * Moves `edit` through `map`. One the history holds widens over text inserted
 * at its edges, so the check errs towards forgetting the history; a host change
 * leaves it its size, so a later host change next to it is no rewrite.
 */
const mapEdit = (map: StepMap, edit: Edit, undoable: boolean): Edit => {
    switch (edit.kind) {
        case 'content': {
            if (undoable) {
                return { ...edit, from: map.map(edit.from, -1), to: map.map(edit.to, 1) };
            }
            const from = map.map(edit.from, 1);
            return { ...edit, from, to: Math.max(from, map.map(edit.to, -1)) };
        }
        case 'attribute':
            return { ...edit, pos: map.map(edit.pos, 1) };
    }
};

const covers = (from: number, to: number, pos: number): boolean => from <= pos && pos < to;

/** Whether `host` changes what `user` wrote, so undoing `user` would take the host's change back too. */
const overlaps = (host: Edit, user: Edit): boolean => {
    switch (host.kind) {
        case 'content':
            switch (user.kind) {
                case 'content':
                    return host.from < user.to && host.to > user.from;
                case 'attribute':
                    return covers(host.from, host.to, user.pos);
            }
        case 'attribute':
            switch (user.kind) {
                case 'content':
                    return covers(user.from, user.to, host.pos);
                case 'attribute':
                    return host.pos === user.pos && host.name === user.name;
            }
    }
};

/** Touching content edits merge, so typing a word is one; an attribute set again is one. */
const withEdit = (edits: readonly Edit[], added: Edit): Edit[] => {
    switch (added.kind) {
        case 'content': {
            let { from, to } = added;
            const kept: Edit[] = [];
            for (const edit of edits) {
                if (edit.kind !== 'content' || edit.to < from || edit.from > to) {
                    kept.push(edit);
                    continue;
                }
                from = Math.min(from, edit.from);
                to = Math.max(to, edit.to);
            }
            kept.push({ kind: 'content', from, to });
            return kept;
        }
        case 'attribute': {
            const isSame = (edit: Edit): boolean =>
                edit.kind === 'attribute' && edit.pos === added.pos && edit.name === added.name;
            return [...edits.filter((edit) => !isSame(edit)), added];
        }
    }
};

const isTransaction = (value: unknown): value is Transaction =>
    typeof value === 'object' && value !== null && 'getMeta' in value;

/** Mirrors prosemirror-history: a change appended to one kept out of the history is kept out too. */
const isUndoable = (transaction: Transaction): boolean => {
    if (transaction.getMeta('addToHistory') === false) {
        return false;
    }
    const appendedTo: unknown = transaction.getMeta('appendedTransaction');
    return !(isTransaction(appendedTo) && appendedTo.getMeta('addToHistory') === false);
};

const mapOf = (transaction: Transaction, index: number): StepMap => {
    const map = transaction.mapping.maps[index];
    if (map === undefined) {
        throw new Error('A transaction step has no map.');
    }
    return map;
};

const editsIn = (state: EditorState): readonly Edit[] => {
    const edits = userEditsKey.getState(state);
    if (edits === undefined) {
        throw new Error('The editor state has no user edits plugin.');
    }
    return edits;
};

/** Tracks what the changes the undo history holds wrote, in the current document. */
export const userEditsPlugin = (): Plugin<readonly Edit[]> =>
    new Plugin({
        key: userEditsKey,
        state: {
            init: (): readonly Edit[] => [],
            apply(transaction, edits) {
                if (!transaction.docChanged) {
                    return edits;
                }
                const undoable = isUndoable(transaction);
                let next = edits;
                for (const [index, step] of transaction.steps.entries()) {
                    const map = mapOf(transaction, index);
                    next = next.map((edit) => mapEdit(map, edit, undoable));
                    if (undoable) {
                        for (const edit of editsOf(step, 'after')) {
                            next = withEdit(next, edit);
                        }
                    }
                }
                return next;
            },
        },
    });

/**
 * Whether `transaction`, built on `state` and kept out of the history, changes
 * something the user's undoable changes wrote. Their undo steps would then take
 * the host's change back along with the user's own.
 */
export const rewritesUserEdits = (state: EditorState, transaction: Transaction): boolean => {
    let edits = editsIn(state);
    for (const [index, step] of transaction.steps.entries()) {
        const hostEdits = editsOf(step, 'before');
        if (hostEdits.some((host) => edits.some((user) => overlaps(host, user)))) {
            return true;
        }
        const map = mapOf(transaction, index);
        edits = edits.map((edit) => mapEdit(map, edit, false));
    }
    return false;
};
