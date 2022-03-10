/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, ReactElement, useEffect, useState } from "react";
import { renderNodeArray } from "./Node";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useId } from "@react-aria/utils";
import { DraggableItem, DropZonePosition } from "@utilities/dnd";
import { getReorderedNodes, listToTree } from "@components/Tree/utils";
import { IconProps } from "@foundation/Icon";

export interface TreeFlatListItem {
    name: string;
    icon?: ReactElement<IconProps>;
    label?: string;
    value?: string;
    actions?: React.ReactNode[];
    parentId: NullableString;
}

export type TreeProps = {
    nodes: DraggableItem<TreeFlatListItem>[];
    onSelect: (id: NullableString) => void;
    activeNodeId?: NullableString;
    onUpdate: (modifiedItems: DraggableItem<TreeFlatListItem>[]) => void;
};

export const Tree: FC<TreeProps> = ({ nodes, onSelect, activeNodeId: initialActiveNodeId = null, onUpdate }) => {
    const [activeNodeId, setActiveNodeId] = useState<NullableString>(initialActiveNodeId);
    const [treeNodes, setTreeNodes] = useState<DraggableItem<TreeFlatListItem>[]>([]);
    const listId = useId();
    useEffect(() => setActiveNodeId(initialActiveNodeId), [initialActiveNodeId]);
    useEffect(() => {
        const listToTreeNodes = listToTree(nodes);
        setTreeNodes(listToTreeNodes);
    }, [nodes]);

    const onNodeClick = (id: NullableString) => {
        setActiveNodeId(id);
        onSelect(id);
    };

    const handleDrop = (
        targetItem: DraggableItem<TreeFlatListItem>,
        sourceItem: DraggableItem<TreeFlatListItem>,
        position: DropZonePosition,
    ) => {
        const modifiedItems = getReorderedNodes(targetItem, sourceItem, position, nodes);
        onUpdate(modifiedItems);
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
