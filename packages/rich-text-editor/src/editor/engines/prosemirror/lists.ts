/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node as PmNode, type NodeType as PmNodeType, type Schema } from 'prosemirror-model';
import { liftListItem, sinkListItem, splitListItem as pmSplitListItem, wrapInList } from 'prosemirror-schema-list';
import { type Command, type EditorState } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';

import { type EditorControlApi } from '#/core';

import { mapChildren } from './documentConversion';
import { type SchemaBundle } from './schema';

/**
 * Lists, all in one place: which list the caret is in, the commands that edit
 * one, and the three keys that only mean something inside one.
 *
 * Two pieces live elsewhere, because they belong to a phase rather than to
 * lists:
 *
 * - WHICH blocks are lists is decided at mount, in `schema.ts`: a feature
 *   declares `children: { items }` and the schema hands the result over as
 *   `SchemaBundle.itemTypeByList`. That is why nothing here takes an item type
 *   as an argument.
 * - WHERE the list keys sit relative to a feature's own hotkeys is a precedence
 *   question, answered in `keystrokes.ts`. This file only says what the keys
 *   do.
 */

// Where the caret is

/** The innermost ancestor that is a list of items, with the position it sits at. */
export const findList = (
    state: EditorState,
    itemTypeByList: Map<string, string>,
): { node: PmNode; pos: number } | null => {
    const { $from } = state.selection;
    for (let depth = $from.depth; depth > 0; depth--) {
        const node = $from.node(depth);
        if (itemTypeByList.has(node.type.name)) {
            return { node, pos: $from.before(depth) };
        }
    }
    return null;
};

/** The item type of the innermost list the selection sits in — what the list commands need. */
export const findItemType = (
    state: EditorState,
    itemTypeByList: Map<string, string>,
    schema: Schema,
): PmNodeType | null => {
    const list = findList(state, itemTypeByList);
    const itemName = list ? itemTypeByList.get(list.node.type.name) : undefined;
    return (itemName ? schema.nodes[itemName] : undefined) ?? null;
};

// The list half of the control API

export const createListApi = (
    view: EditorView,
    { schema, itemTypeByList }: SchemaBundle,
): EditorControlApi['lists'] => {
    /** Run one of the engine's list commands against the item type in scope. */
    const runListCommand = (command: (itemType: PmNodeType) => Command): boolean => {
        const itemType = findItemType(view.state, itemTypeByList, schema);
        if (!itemType) {
            return false;
        }
        return command(itemType)(view.state, view.dispatch, view);
    };

    return {
        toggle(type) {
            const listType = schema.nodes[type];
            const itemName = itemTypeByList.get(type);
            const itemType = itemName ? schema.nodes[itemName] : undefined;
            if (!listType || !itemType) {
                return;
            }
            const current = findList(view.state, itemTypeByList);

            if (!current) {
                wrapInList(listType)(view.state, view.dispatch);
            } else if (current.node.type === listType) {
                runListCommand(liftListItem);
            } else {
                // Switching list type converts in place. It has to happen in a
                // single step: a check list holding bullet items (or the other
                // way round) is invalid content, so two steps would throw.
                const converted = listType.create(
                    current.node.attrs,
                    mapChildren(current.node, (item) =>
                        item.type === itemType ? item : itemType.create(item.attrs, item.content),
                    ),
                );
                view.dispatch(view.state.tr.replaceWith(current.pos, current.pos + current.node.nodeSize, converted));
            }
            view.focus();
        },
        indent: () => runListCommand(sinkListItem),
        outdent: () => runListCommand(liftListItem),
        split: () => runListCommand(pmSplitListItem),
        unwrapAll() {
            const { from, to } = view.state.selection;
            const lists: { node: PmNode; pos: number }[] = [];
            view.state.doc.nodesBetween(from, to, (node, pos) => {
                if (!itemTypeByList.has(node.type.name)) {
                    return true;
                }
                // Outermost lists only: their nested ones come along below.
                lists.push({ node, pos });
                return false;
            });
            if (lists.length === 0) {
                return false;
            }

            const transaction = view.state.tr;
            const contentOf = (list: PmNode): PmNode[] =>
                mapChildren(list, (item) =>
                    mapChildren(item, (child) => (itemTypeByList.has(child.type.name) ? contentOf(child) : [child])),
                ).flat(2);
            // From the end backwards, so the earlier positions stay valid.
            for (const { node, pos } of [...lists].reverse()) {
                transaction.replaceWith(pos, pos + node.nodeSize, contentOf(node));
            }
            view.dispatch(transaction);
            view.focus();
            return true;
        },
    };
};

// The keys that only mean something inside a list

/**
 * Enter, Tab and Shift-Tab inside a list. Not one feature's keys: the behaviour
 * belongs to being in a list at all, so any feature declaring `children: { items }`
 * gets them — a list a consumer wrote included — instead of every list repeating
 * the same three bindings.
 *
 * All three report "not handled" outside a list, so the engine's baseline
 * keymap takes over there.
 */
export const listKeys = (getApi: () => EditorControlApi): Record<string, Command> => ({
    // The engine's own split deliberately refuses on an empty item at the top
    // level, leaving it to be lifted out of the list instead.
    Enter: () => getApi().lists.split() || getApi().lists.outdent(),
    Tab: () => getApi().lists.indent(),
    'Shift-Tab': () => getApi().lists.outdent(),
});
