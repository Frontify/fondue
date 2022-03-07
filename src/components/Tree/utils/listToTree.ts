/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TreeListItem, TreeNodeProps } from "@components/Tree";
import { DraggableItem, draggableItemCompareFn } from "@utilities/dnd";

export const listToTree = (
    items: DraggableItem<TreeListItem>[],
    id: string | null = null,
): DraggableItem<TreeNodeProps>[] =>
    items
        .filter((item) => item.parentId === id)
        .sort(draggableItemCompareFn)
        .map((item) => {
            const nodes = listToTree(items, item.id);
            return {
                ...item,
                nodes: nodes.length > 0 ? nodes : undefined,
            };
        });
