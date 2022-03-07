/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, ReactElement, useEffect, useState } from "react";
import { renderNodeArray } from "./Node";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useId } from "@react-aria/utils";
import { DraggableItem, DropZonePosition, moveItems } from "@utilities/dnd";
import { listToTree } from "@components/Tree/utils";
import { IconProps } from "@foundation/Icon";

export interface TreeListItem {
    name: string;
    icon?: ReactElement<IconProps>;
    label?: string;
    value?: string;
    actions?: React.ReactNode[];
    parentId: NullableString;
}

export type TreeProps = {
    nodes: DraggableItem<TreeListItem>[];
    onSelect: (id: NullableString) => void;
    activeNodeId?: NullableString;
    handleUpdate: (modifiedItems: DraggableItem<TreeListItem>[]) => void;
};

export const Tree: FC<TreeProps> = ({ nodes, onSelect, activeNodeId: initialActiveNodeId = null, handleUpdate }) => {
    const [activeNodeId, setActiveNodeId] = useState<NullableString>(initialActiveNodeId);
    const [treeNodes, setTreeNodes] = useState<DraggableItem<TreeListItem>[]>([]);
    const listId = useId();
    useEffect(() => setActiveNodeId(initialActiveNodeId), [initialActiveNodeId]);
    useEffect(() => {
        const lisToTreeNodes = listToTree(nodes); // TODO rename
        console.log(lisToTreeNodes);
        setTreeNodes(lisToTreeNodes);
    }, [nodes]);

    const onNodeClick = (id: NullableString) => {
        setActiveNodeId(id);
        onSelect(id);
    };

    const handleDrop = (
        targetItem: DraggableItem<TreeListItem>,
        sourceItem: DraggableItem<TreeListItem>,
        position: DropZonePosition,
    ) => {
        const parentId = position === DropZonePosition.Within ? targetItem.id : targetItem.parentId;
        const sameLevelNodes = nodes.filter((node) => node.parentId === parentId);

        const modifiedItems = moveItems(targetItem, { ...sourceItem, parentId, sort: null }, position, sameLevelNodes);
        handleUpdate(modifiedItems);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <ul
                data-test-id="tree"
                className="tw-p-0 tw-m-0 tw-font-sans tw-font-normal tw-list-none tw-text-left tw-text-sm tw-select-none"
            >
                {renderNodeArray(treeNodes, activeNodeId, listId, onNodeClick, handleDrop)}
            </ul>
        </DndProvider>
    );
};
