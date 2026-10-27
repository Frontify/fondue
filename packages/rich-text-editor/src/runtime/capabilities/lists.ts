/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Fragment, type NodeType } from 'prosemirror-model';
import { liftListItem, sinkListItem, wrapRangeInList } from 'prosemirror-schema-list';
import { type EditorState, TextSelection, type Transaction } from 'prosemirror-state';
import { canJoin } from 'prosemirror-transform';

import { isRecord } from '#/model';

import { liftItems, listAround, repeatWhile } from '../transform/lists';
import { inCodeTextblock } from '../transform/positions';
import { appendSteps, carrySelection, transactionOf } from '../transform/transactions';

import { type CapabilityImplementation, carried, REJECTED, selectedTextblocks, typeIn } from './shared';

/** The payload's fields that `type` declares as attributes, such as `start` for `ordered_list`. */
const declaredIn = (type: NodeType, payload: unknown) => {
    const attrs: Record<string, unknown> = {};
    if (isRecord(payload)) {
        for (const [name, value] of Object.entries(payload)) {
            if (Object.hasOwn(type.spec.attrs ?? {}, name)) {
                attrs[name] = value;
            }
        }
    }

    return attrs;
};

/** Whether the innermost list at the selection holds items of `item`, so a key of another list's items passes on. */
const inListOf = (state: EditorState, item: NodeType) => {
    const around = listAround(state.selection.$from);

    return around !== undefined && around.list.firstChild?.type === item;
};

/**
 * Wraps the selected blocks in the list, with headings and other textblocks first turned into paragraphs, which keeps
 * their inline content and references.
 */
const wrapInList = (state: EditorState, list: NodeType, item: NodeType, payload: unknown) => {
    const paragraph = typeIn(state.schema.nodes, 'paragraph');
    if (paragraph === undefined) {
        return undefined;
    }

    const { $from, $to } = state.selection;
    const transaction = state.tr.setBlockType($from.pos, $to.pos, paragraph, (node) => carried(node, paragraph, {}));
    const range = transaction.doc
        .resolve(transaction.mapping.map($from.pos))
        .blockRange(transaction.doc.resolve(transaction.mapping.map($to.pos)));
    if (range === null || !wrapRangeInList(transaction, range, list, declaredIn(list, payload))) {
        return undefined;
    }

    // A rule's payload, such as `checked` from `[x] `, applies to the new items.
    const itemAttrs = Object.entries(declaredIn(item, payload));
    const { start, end } = range;
    transaction.doc.nodesBetween(transaction.mapping.map(start), transaction.mapping.map(end), (node, pos) => {
        if (node.type === item) {
            for (const [name, value] of itemAttrs) {
                transaction.setNodeAttribute(pos, name, value);
            }
        }

        return node.type !== item;
    });

    // A new list beside a list of its own type joins it, as in other editors, so two toggled paragraphs make one list.
    const before = transaction.mapping.map(start, -1);
    const wrapped = transaction.doc.resolve(before).nodeAfter;
    if (wrapped?.type === list) {
        const after = before + wrapped.nodeSize;
        const joinsWith = (pos: number) =>
            transaction.doc.resolve(pos).nodeBefore?.type === list &&
            transaction.doc.resolve(pos).nodeAfter?.type === list &&
            canJoin(transaction.doc, pos);
        if (joinsWith(after)) {
            transaction.join(after);
        }

        if (joinsWith(before)) {
            transaction.join(before);
        }
    }

    return transaction.scrollIntoView();
};

/**
 * Turns the list at the selection's depth into `list`, keeping items, nesting and children: an ordered list takes the
 * payload's `start`, new task items are unchecked unless a rule's `checked` names the item at the caret, and items that
 * leave a task list drop `checked`.
 */
const convertList = (
    state: EditorState,
    around: NonNullable<ReturnType<typeof listAround>>,
    list: NodeType,
    item: NodeType,
    payload: unknown,
) => {
    const caret = state.selection.$from.index(around.depth);
    const content = Fragment.from(
        around.list.children.map((child, index) => {
            let attrs = {};
            if (index === caret) {
                attrs = declaredIn(item, payload);
            }

            return item.create(attrs, child.content, child.marks);
        }),
    );
    if (!list.validContent(content)) {
        return undefined;
    }

    const pos = state.selection.$from.before(around.depth);
    const transaction = state.tr.replaceWith(
        pos,
        pos + around.list.nodeSize,
        list.create(declaredIn(list, payload), content),
    );

    // Items and lists keep their sizes, so every position, and the selection with them, stays the same.
    return transaction.setSelection(carrySelection(transaction.doc, state.selection)).scrollIntoView();
};

/** Wraps the selection in the list `list` of `item`s, converts the list at the selection to it, or lifts its items out when it is that list. */
export const toggleList: CapabilityImplementation = (args, schema) => {
    const list = typeIn(schema.nodes, args.list);
    const item = typeIn(schema.nodes, args.item);
    if (list === undefined || item === undefined) {
        return REJECTED;
    }

    const isList = (state: EditorState) => listAround(state.selection.$from)?.list.type === list;

    return {
        run: (state, dispatch, payload) => {
            let transaction: Transaction | undefined;
            const around = listAround(state.selection.$from);
            if (around === undefined) {
                transaction = wrapInList(state, list, item, payload);
            } else if (isList(state)) {
                // The selected items leave every level of this list type and become paragraphs.
                transaction = repeatWhile(state, liftItems(item), isList);
            } else {
                transaction = convertList(state, around, list, item, payload);
            }

            if (transaction === undefined) {
                return false;
            }

            dispatch?.(transaction);

            return true;
        },
        active: (state) => isList(state),
    };
};

/** Nests the selected list items under their previous sibling; passes on outside the `item`s of a list and in code. */
export const indentItem: CapabilityImplementation = (args, schema) => {
    const item = typeIn(schema.nodes, args.item);
    if (item === undefined) {
        return REJECTED;
    }

    const sink = sinkListItem(item);

    return {
        run: (state, dispatch) =>
            !inCodeTextblock(state.selection.$from) && inListOf(state, item) && sink(state, dispatch),
        active: () => false,
    };
};

/** Lifts the selected list items one level out; passes on outside the `item`s of a list and in code. */
export const outdentItem: CapabilityImplementation = (args, schema) => {
    const item = typeIn(schema.nodes, args.item);
    if (item === undefined) {
        return REJECTED;
    }

    const lift = liftListItem(item);

    return {
        run: (state, dispatch) =>
            !inCodeTextblock(state.selection.$from) && inListOf(state, item) && lift(state, dispatch),
        active: () => false,
    };
};

/** Lifts the item of the selected textblock at `pos` one level out of its list, or returns `undefined` outside a list. */
const liftItemAt = (state: EditorState, pos: number): Transaction | undefined => {
    const $inside = state.doc.resolve(pos + 1);
    const around = listAround($inside);
    if (around === undefined) {
        return undefined;
    }

    const item = $inside.node(around.depth + 1).type;
    // `liftListItem` lifts the items of the selection's block range, which a selection that leaves the list lacks.
    const caret = state.apply(state.tr.setSelection(TextSelection.create(state.doc, pos + 1)));

    return transactionOf(caret, liftListItem(item));
};

/** Lifts every selected item, nested ones included, one level at a time until no selected textblock sits in a list. */
export const liftLists = (state: EditorState): Transaction | undefined => {
    const transaction = state.tr;
    let current = state;
    for (;;) {
        let next: Transaction | undefined;
        for (const { pos } of selectedTextblocks(current)) {
            next = liftItemAt(current, pos);
            if (next !== undefined) {
                break;
            }
        }

        if (next === undefined) {
            break;
        }

        appendSteps(transaction, next);
        const selection = current.selection.map(next.doc, next.mapping);
        current = current.apply(next);
        current = current.apply(current.tr.setSelection(selection));
    }

    if (!transaction.docChanged) {
        return undefined;
    }

    return transaction.setSelection(carrySelection(transaction.doc, current.selection));
};
