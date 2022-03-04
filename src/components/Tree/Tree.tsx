/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, useEffect, useState } from "react";
import { renderNodeArray, TreeNodeProps } from "./Node";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { OnDropCallback } from "@components/Tree/DropZone";

export interface TreeListItem extends TreeNodeProps {
    parentId: NullableString;
    sort: NullableNumber;
}

export type TreeProps = {
    nodes: TreeListItem[];
    onSelect: (id: NullableString) => void;
    activeNodeId?: NullableString;
    onDrop?: OnDropCallback;
};

export const Tree: FC<TreeProps> = ({ nodes, onSelect, activeNodeId: initialActiveNodeId = null, onDrop }) => {
    const [activeNodeId, setActiveNodeId] = useState<NullableString>(initialActiveNodeId);
    const [treeNodes, setTreeNodes] = useState();
    useEffect(() => setActiveNodeId(initialActiveNodeId), [initialActiveNodeId]);
    useEffect(() => {

    }, [nodes]);

    const onNodeClick = (id: NullableString) => {
        setActiveNodeId(id);
        onSelect(id);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <ul
                data-test-id="tree"
                className="tw-p-0 tw-m-0 tw-font-sans tw-font-normal tw-list-none tw-text-left tw-text-sm tw-select-none"
            >
                {renderNodeArray(nodes, activeNodeId, onNodeClick, onDrop)}
            </ul>
        </DndProvider>
    );
};
