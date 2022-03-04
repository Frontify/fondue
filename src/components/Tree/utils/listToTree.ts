/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TreeNodeProps } from "@components/Tree";
import {DraggableItem, draggableItemCompareFn} from "@utilities/dnd";

export const listToTree = (items: TreeNodeProps[], id: string | null = null): TreeNodeProps[] =>
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
