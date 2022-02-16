/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, useEffect, useState } from "react";
import { renderNodesArray, TreeNodeProps } from "./Node";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { OnDropCallback } from "@components/Tree/DropZone";

export type TreeProps = {
    nodes: TreeNodeProps[];
    onSelect: (id: NullableString) => void;
    activeNodeId?: NullableString;
    onDrop?: OnDropCallback;
};

export const Tree: FC<TreeProps> = ({ nodes, onSelect, activeNodeId: initialActiveNodeId = null, onDrop }) => {
    const [activeNodeId, setActiveNodeId] = useState<NullableString>(initialActiveNodeId);
    useEffect(() => setActiveNodeId(initialActiveNodeId), [initialActiveNodeId]);

    const onNodeClick = (id: string | null) => {
        setActiveNodeId(id);
        onSelect(id);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <ul
                data-test-id="tree"
                className="tw-p-0 tw-m-0 tw-font-sans tw-font-normal tw-list-none tw-text-left tw-text-sm tw-select-none"
            >
                {renderNodesArray(nodes, activeNodeId, onNodeClick, onDrop)}
            </ul>
        </DndProvider>
    );
};
