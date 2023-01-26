/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useEffect, useState } from 'react';

import { CollectionItem } from './CollectionItem';
import { OrderableListItem, OrderableListProps } from './types';
import { DropZone } from '@components/DropZone';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { DropZonePosition, moveItems } from '@utilities/dnd';
import { useId } from '@react-aria/utils';

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

export const OrderableList = <T extends object>({
    onMove,
    dragDisabled,
    items,
    renderContent,
}: OrderableListProps<T>) => {
    const [itemsState, setItemsState] = useState(items);
    const listId = useId();

    useEffect(() => {
        // sort the incoming items
        const itemsClone = [...items];
        itemsClone.sort(listItemsCompareFn);
        setItemsState(itemsClone);
    }, [items]);

    const handleDrop = (
        targetItem: OrderableListItem<T>,
        sourceItem: OrderableListItem<T>,
        position: DropZonePosition,
    ) => {
        const modifiedItems = moveItems(targetItem, sourceItem, position, itemsState);
        onMove(modifiedItems);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="tw-outline-none" data-test-id="orderable-list">
                {itemsState.map((item, index) => (
                    <React.Fragment key={`dropzone-orderable-list-key-${index}`}>
                        <DropZone
                            key={`orderable-list-item-${index}-before`}
                            data={{
                                targetItem: item,
                                position: DropZonePosition.Before,
                            }}
                            onDrop={handleDrop}
                            accept={listId}
                        />
                        <CollectionItem
                            key={item.id}
                            dragDisabled={dragDisabled}
                            item={item}
                            renderContent={renderContent}
                            listId={listId}
                        />
                        {index === items.length - 1 && (
                            <DropZone
                                key={`orderable-list-item-${index}-after`}
                                data={{
                                    targetItem: item,
                                    position: DropZonePosition.After,
                                }}
                                onDrop={handleDrop}
                                accept={listId}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </DndProvider>
    );
};
