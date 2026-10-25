/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ResolvedPos } from 'prosemirror-model';
import { type EditorState, type Transaction } from 'prosemirror-state';

import { type BlockRule, type LineStartRule } from '#/definition';
import { findInvalidPayload } from '#/model';

import { holdsCode } from './input-rules-common';
import { appendSteps, carrySelection } from './transactions';

/**
 * Removes the marker from the block start to the caret, then runs the rule's command on the block, as one transaction.
 * A command that rebuilds the block, as a list conversion rebuilds the whole list, would map a later removal to nothing.
 */
const withoutMarker = (
    command: BlockRule['command'],
    state: EditorState,
    $cursor: ResolvedPos,
    payload: unknown,
): Transaction | null => {
    const transaction = state.tr.delete($cursor.start(), $cursor.pos);
    const without = state.apply(transaction);
    const dispatched: Transaction[] = [];
    if (
        command.refuses?.(without, payload) === true ||
        !command.run(without, (built) => dispatched.push(built), payload)
    ) {
        return null;
    }
    const [built] = dispatched;
    if (built === undefined) {
        return null;
    }
    appendSteps(transaction, built);
    transaction.setSelection(carrySelection(transaction.doc, built.selection));
    if (built.scrolledIntoView) {
        transaction.scrollIntoView();
    }
    return transaction;
};

/** Runs the rule's command without its marker, so the block keeps the text after the caret. */
export const lineStart = (rule: LineStartRule, state: EditorState, $cursor: ResolvedPos, before: string) => {
    if (before !== `${rule.marker} ` || before.length !== $cursor.parentOffset) {
        return null;
    }
    // A block that already is the rule's target keeps the marker as text, so `> ` in a quote never lifts it out.
    if (holdsCode(state, $cursor.start(), $cursor.pos) || rule.command.active(state, rule.payload) === true) {
        return null;
    }
    return withoutMarker(rule.command, state, $cursor, rule.payload);
};

/** The payload that a block rule's named groups fill, each converted by its field's declaration. */
const payloadOf = (rule: BlockRule, groups: Readonly<Record<string, string | undefined>>) => {
    const payload: Record<string, unknown> = {};
    const declaration = rule.command.payload;
    if (declaration === undefined) {
        return payload;
    }
    for (const [name, field] of Object.entries(declaration.fields)) {
        const value = groups[name];
        if (field.type === 'boolean') {
            payload[name] = value !== undefined;
        } else if (value !== undefined && (field.type === 'integer' || field.type === 'number')) {
            payload[name] = Number(value);
        } else if (value !== undefined && value !== '') {
            // An empty capture fills no field, so a fence with no language sets none.
            payload[name] = value;
        }
    }
    return payload;
};

/** Runs the rule's command when the text from the block start matches, unless the payload fails its declaration. */
export const blockStart = (rule: BlockRule, state: EditorState, $cursor: ResolvedPos, before: string) => {
    const found = rule.match.exec(before);
    if (found === null || before.length !== $cursor.parentOffset || holdsCode(state, $cursor.start(), $cursor.pos)) {
        return null;
    }
    const payload = payloadOf(rule, found.groups ?? {});
    if (
        findInvalidPayload(rule.command.payload, payload) !== undefined ||
        rule.command.active(state, payload) === true
    ) {
        return null;
    }
    return withoutMarker(rule.command, state, $cursor, payload);
};
