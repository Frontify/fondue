/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState, type Transaction } from 'prosemirror-state';

import { type EngineCommand } from '#/runtime/definition';

import { carrySelection, take } from '../transform/transactions';

import { defaultOf } from './attributes';
import { liftLists } from './lists';
import { carried, selectedTextblocks } from './shared';

/** Turns the selected textblocks into paragraphs and restores the named attributes to their defaults. */
const plainParagraphs = (state: EditorState, names: readonly string[]): Transaction | undefined => {
    const paragraph = state.schema.nodes.paragraph;
    if (paragraph === undefined) {
        return undefined;
    }

    const cleared = names.filter((name) => Object.hasOwn(paragraph.spec.attrs ?? {}, name));
    const blocks = selectedTextblocks(state);
    const needs = blocks.some(
        ({ node }) =>
            node.type !== paragraph || cleared.some((name) => node.attrs[name] !== defaultOf(paragraph, name)),
    );
    if (!needs) {
        return undefined;
    }

    const { $from, $to } = state.selection;
    const transaction = state.tr.setBlockType($from.pos, $to.pos, paragraph, (node) => {
        const attrs = carried(node, paragraph, {});
        for (const name of cleared) {
            attrs[name] = defaultOf(paragraph, name);
        }

        return attrs;
    });
    if (!transaction.docChanged) {
        return undefined;
    }

    return transaction;
};

/** Lifts the selection out of lists, turns its textblocks into paragraphs and restores `attributes` to their defaults, as one undo step. */
export const clearBlocks = (attributes: readonly string[]): EngineCommand => ({
    run: (state, dispatch) => {
        const transaction = state.tr;
        let current = take(transaction, state, liftLists(state));
        current = take(transaction, current, plainParagraphs(current, attributes));
        if (!transaction.docChanged) {
            return false;
        }

        transaction.setSelection(carrySelection(transaction.doc, current.selection));
        dispatch?.(transaction.scrollIntoView());

        return true;
    },
    active: () => false,
});
