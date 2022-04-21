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
    onSelect: (ids: NullableString[]) => void;
    activeNodeIds: NullableString[];
    onUpdate?: (modifiedItems: DraggableItem<TreeFlatListItem>[]) => void;
};

export const Tree: FC<TreeProps> = ({ nodes, onSelect, activeNodeIds: initialActiveNodeIds, onUpdate }) => {
    const [multiSelectMode, setMultiSelectMode] = useState<boolean>(false);
    const [activeIds, setActiveIds] = useState<NullableString[]>(initialActiveNodeIds);
    const [treeNodes, setTreeNodes] = useState<DraggableItem<TreeFlatListItem>[]>([]);
    const treeName = useId();

    useEffect(() => {
        const listToTreeNodes = listToTree(nodes);
        setTreeNodes(listToTreeNodes);
    }, [nodes]);

    const onNodeClick = (id: NullableString) => {
        if (multiSelectMode) {
            const modifiedSelectedIds: NullableString[] = activeIds.includes(id)
                ? [...activeIds].filter((i) => i !== id)
                : [...activeIds, id];

            setActiveIds(modifiedSelectedIds);
            onSelect(modifiedSelectedIds);
        } else {
            setActiveIds([id]);
            onSelect([id]);
        }
    };

    const handleDrop = onUpdate
        ? (
              targetItem: DraggableItem<TreeFlatListItem>,
              sourceItem: DraggableItem<TreeFlatListItem>,
              position: DropZonePosition,
          ) => {
              const modifiedItems = getReorderedNodes(targetItem, sourceItem, position, nodes);
              onUpdate(modifiedItems);
          }
        : undefined;

    const downKeyHandler = (event: KeyboardEvent) => {
        if (event.key === "Shift") {
            setMultiSelectMode(true);
        }
    };

    const upKeyHandler = (event: KeyboardEvent) => {
        if (event.key === "Shift") {
            setMultiSelectMode(false);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", downKeyHandler);
        window.addEventListener("keyup", upKeyHandler);
        return () => {
            window.removeEventListener("keydown", downKeyHandler);
            window.removeEventListener("keyup", upKeyHandler);
        };
    }, []);

    return (
        <DndProvider backend={HTML5Backend}>
            <ul
                data-test-id="tree"
                className="tw-p-0 tw-m-0 tw-font-sans tw-font-normal tw-list-none tw-text-left tw-text-sm tw-select-none"
            >
                {renderNodeArray({
                    nodes: treeNodes,
                    treeName,
                    activeIds,
                    onClick: onNodeClick,
                    onDrop: handleDrop,
                })}
            </ul>
        </DndProvider>
    );
};
