/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node as PmNode, type NodeType as PmNodeType } from 'prosemirror-model';
import { liftListItem, sinkListItem, splitListItem as pmSplitListItem, wrapInList } from 'prosemirror-schema-list';
import { type Command } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';

import { type EditorControlApi } from '#/domain';
import { mapChildren } from '../document';
import { findItemType, findList } from '../queries';
import { type SchemaBundle } from '../schema';

/**
 * The list half of the control API. Which block is a list, and what its item
 * type is, comes from the schema bundle — plugins declared it with `isList`, so
 * nothing here takes an item type as an argument.
 */
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
