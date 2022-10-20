/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, ReactElement, ReactNode, useEffect, useState } from 'react';
import { renderNodeArray } from './Node';
import { useId } from '@react-aria/utils';
import { DndWrapper, DraggableItem, DropZonePosition, draggableItemCompareFn } from '@utilities/dnd';
import { listToTree } from '@components/Tree/utils';
import { IconProps } from '@foundation/Icon';
import { BadgeProps } from '..';

export interface TreeFlatListItem {
    name: string;
    icon?: ReactElement<IconProps>;
    label?: string;
    value?: string;
    actions?: React.ReactNode[];
    badge?: ReactElement<IconProps> | ReactElement<BadgeProps>;
    tooltipContent?: ReactNode;
    parentId: NullableString;
    editable?: boolean;
}

export type TreeProps = {
    nodes: DraggableItem<TreeFlatListItem>[];
    onSelect: (ids: NullableString[]) => void;
    activeNodeIds: NullableString[];
    onDragAndDrop?: (itemId: string, parentId: NullableString, positionBeforeId: NullableString) => void;
    onEditableSave?: (targetItemId: string, value: string) => void;
};

export const Tree: FC<TreeProps> = ({
    nodes,
    onSelect,
    activeNodeIds: initialActiveNodeIds,
    onDragAndDrop,
    onEditableSave,
}) => {
    const [multiSelectMode, setMultiSelectMode] = useState<boolean>(false);
    const [activeIds, setActiveIds] = useState<NullableString[]>(initialActiveNodeIds);
    const [treeNodes, setTreeNodes] = useState<DraggableItem<TreeFlatListItem>[]>([]);
    const treeId = useId();

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

    const handleDrop = onDragAndDrop
        ? (
              targetItem: DraggableItem<TreeFlatListItem>,
              sourceItem: DraggableItem<TreeFlatListItem>,
              position: DropZonePosition,
          ) => {
              const getPositionBeforeId = () => {
                  switch (position) {
                      case DropZonePosition.After:
                          const sameLevelNodes = nodes.filter((node) => node.parentId === targetItem.parentId);
                          sameLevelNodes.sort(draggableItemCompareFn);
                          const targetItemIndex = sameLevelNodes.findIndex((item) => item.id === targetItem.id);
                          if (targetItemIndex === sameLevelNodes.length - 1) {
                              return null;
                          } else {
                              return sameLevelNodes[targetItemIndex + 1].id;
                          }
                      case DropZonePosition.Before:
                          return targetItem.id;
                      case DropZonePosition.Within:
                          return null;
                  }
              };

              const parentId = position === DropZonePosition.Within ? targetItem.id : targetItem.parentId;
              const positionBeforeId = getPositionBeforeId();
              onDragAndDrop(sourceItem.id, parentId, positionBeforeId);
          }
        : undefined;

    const handleEditableSave = onEditableSave
        ? (targetItemId: string, value: string) => {
              onEditableSave(targetItemId, value);
          }
        : undefined;

    const downKeyHandler = (event: KeyboardEvent) => {
        if (event.key === 'Meta' || event.ctrlKey) {
            setMultiSelectMode(true);
        } else {
            setMultiSelectMode(false);
        }
    };

    const upKeyHandler = (event: KeyboardEvent) => {
        if (event.key === 'Meta' || event.ctrlKey) {
            setMultiSelectMode(false);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', downKeyHandler);
        window.addEventListener('keyup', upKeyHandler);

        return () => {
            window.removeEventListener('keydown', downKeyHandler);
            window.removeEventListener('keyup', upKeyHandler);
        };
    }, []);

    return (
        <ul
            id={treeId}
            data-test-id="tree"
            className="tw-p-0 tw-m-0 tw-font-sans tw-font-normal tw-list-none tw-text-left tw-text-sm tw-select-none"
        >
            <DndWrapper id={treeId}>
                {renderNodeArray({
                    nodes: treeNodes,
                    treeId,
                    activeIds,
                    onClick: onNodeClick,
                    onDrop: handleDrop,
                    onEditableSave: handleEditableSave,
                })}
            </DndWrapper>
        </ul>
    );
};
