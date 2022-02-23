/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import { Tree as TreeComponent, TreeProps } from "./Tree";
import { TreeNodeProps } from "./Node";
import { IconSize } from "@foundation/Icon/IconSize";
import IconDocument from "@foundation/Icon/Generated/IconDocument";
import { DropZonePosition } from "@components/Tree/DropZone";
import { API_NODES, NODES_WITH_ACTIONS } from "@components/Tree/utils/DUMMY_DATA";

type TreeListItem = TreeNodeProps & {
    name: string;
    parentId: TreeNodeProps["id"] | null;
    sort: number | null;
};

const listItemsCompareFn = (itemA: TreeListItem, itemB: TreeListItem): number => {
    if (itemA.sort === null && itemB.sort === null) {
        return 1;
    }
    if (itemA.sort === null) {
        return 1;
    }
    if (itemB.sort === null) {
        return -1;
    }

    return itemA.sort - itemB.sort;
};

const listToTree = (items: TreeListItem[], id: string | null = null): TreeNodeProps[] =>
    items
        .filter((item) => item.parentId === id)
        .sort(listItemsCompareFn)
        .map((item) => {
            const nodes = listToTree(items, item.id);
            return {
                ...item,
                nodes: nodes.length === 0 ? undefined : nodes,
                icon: nodes.length === 0 ? <IconDocument size={IconSize.Size12} /> : undefined,
            };
        });

let apiNodes: TreeListItem[] = API_NODES;

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Tree",
    component: TreeComponent,
    args: {
        activeNodeId: "1-1-3",
    },
    argTypes: {
        onSelect: { action: "onSelect" },
    },
} as Meta<TreeProps>;

export const Tree: Story<TreeProps> = (args: TreeProps) => {
    const [nodesState, setNodes] = useState(listToTree(apiNodes));

    const updateItemsPosition = (
        nodes: TreeListItem[], // nodes without the moved node
        targetParentId: string | null,
        movedItemTargetIndex: number,
        movedItem: TreeListItem,
    ): TreeListItem[] => {
        nodes.splice(movedItemTargetIndex, 0, movedItem);
        const sortedSameLevelItems = nodes.filter((node) => node.parentId === targetParentId);

        const modifiedSameLevelArray: TreeListItem[] = [];
        const changedItemsIds: string[] = [];

        sortedSameLevelItems.forEach((item, index) => {
            const previousItem = modifiedSameLevelArray[index - 1];
            let modifiedItem = { ...item };

            const shouldUpdate =
                (index === 0 && item.sort === null) || // First item without a sort value
                (index < movedItemTargetIndex && item.sort === null) || // Previous item without a sort value
                index === movedItemTargetIndex || // Moved item
                (index > movedItemTargetIndex &&
                    item.sort !== null &&
                    previousItem &&
                    previousItem.sort &&
                    item.sort < previousItem.sort); // Following item with a sort prop lower than on previousItem

            if (shouldUpdate) {
                const incrementedPreviousItemSort = previousItem && previousItem.sort ? previousItem.sort + 1 : null;
                const updatedSortValue = index === 0 ? 0 : incrementedPreviousItemSort;

                modifiedItem = { ...item, sort: updatedSortValue };
                changedItemsIds.push(item.id);
            }

            modifiedSameLevelArray.push(modifiedItem);
            return;
        });

        return nodes.map((node) => {
            if (changedItemsIds.includes(node.id)) {
                return modifiedSameLevelArray.filter((item) => item.id === node.id)[0] ?? node;
            }

            return node;
        });
    };

    const reorderItem = (targetItem: TreeNodeProps, sourceItem: TreeNodeProps, position: DropZonePosition) => {
        let nodesClone = [...apiNodes];
        const sourceIndex = nodesClone.findIndex((node) => node.id === sourceItem.id);

        nodesClone.splice(sourceIndex, 1);

        let targetIndex = nodesClone.findIndex((node) => node.id === targetItem.id);
        const targetTreeListItem = nodesClone[targetIndex];

        targetIndex =
            position === DropZonePosition.AFTER || position === DropZonePosition.WITHIN ? targetIndex + 1 : targetIndex;
        const parentId = position === DropZonePosition.WITHIN ? targetItem.id : targetTreeListItem.parentId;

        const movedItem = { ...sourceItem, parentId, sort: null };
        nodesClone = updateItemsPosition(nodesClone, parentId, targetIndex, movedItem);

        setNodes(listToTree(nodesClone));
        apiNodes = nodesClone;
    };

    return (
        <div style={{ maxWidth: "800px" }}>
            <TreeComponent {...args} nodes={nodesState} onDrop={reorderItem} />
        </div>
    );
};

export const TreeWithActions: Story<TreeProps> = (args: TreeProps) => (
    <div style={{ maxWidth: "800px" }}>
        <TreeComponent {...args} nodes={NODES_WITH_ACTIONS} />
    </div>
);
