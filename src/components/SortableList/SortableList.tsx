/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useEffect, useState } from 'react';
import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

// import { moveItems } from '@utilities/dnd';

// import { CollisionPosition } from '..';

import { SortableListItem } from './SortableListItem';
import { OrderableListItem, SortableListProps } from './types';

const listItemsCompareFn = <T extends object>(itemA: OrderableListItem<T>, itemB: OrderableListItem<T>): number => {
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

export const SortableList = <T extends object>({
    onMove,
    dragDisabled,
    items,
    renderContent,
}: SortableListProps<T>) => {
    const [itemsState, setItemsState] = useState(items);

    useEffect(() => {
        const itemsClone = [...items];

        itemsClone.sort(listItemsCompareFn);

        setItemsState(itemsClone);
    }, [items]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    );

    return (
        <DndContext sensors={sensors} onDragEnd={onMove}>
            <ul className="tw-outline-none" data-test-id="orderable-list">
                <SortableContext items={itemsState} strategy={verticalListSortingStrategy}>
                    {itemsState.map((item) => (
                        <SortableListItem
                            id={item.id}
                            item={item}
                            key={item.id}
                            content={renderContent}
                            draggable={dragDisabled}
                        />
                    ))}
                </SortableContext>
            </ul>
            <DragOverlay dropAnimation={null} modifiers={[restrictToWindowEdges]}>
                {/* {treeState.overlay ? <PresentationalTreeItem {...treeState.overlay} /> : null} */}
            </DragOverlay>
        </DndContext>
    );
};
SortableList.displayName = 'FondueOrderableList';
