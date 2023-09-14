/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';

import { OrderableListItem, OrderableListProps } from './types';
import { useId } from '@react-aria/utils';
import { OnTreeDropCallback, Tree, TreeItem } from '..';
import { DraggableItem } from '@utilities/dnd/types';

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

const moveItem = <T extends object>(
    id: string,
    newPosition: number | null,
    items: DraggableItem<T>[],
): DraggableItem<T>[] => {
    const theItem = items.find((item) => item.id === id) as DraggableItem<T>;

    return theItem ? [{ ...theItem, sort: newPosition }] : [];
};

export const OrderableList = <T extends object>({
    onMove,
    dragDisabled,
    items,
    dragHandlerPosition = 'none',
    spacingY = 'medium',
    selectedId,
    renderContent,
    'data-test-id': dataTestId = 'orderable-list',
}: OrderableListProps<T>) => {
    const [itemsState, setItemsState] = useState(items);
    const listId = useId();
    const isDraggable = !dragDisabled;

    useEffect(() => {
        // sort the incoming items
        const itemsClone = [...items];
        itemsClone.sort(listItemsCompareFn);
        setItemsState(itemsClone);
    }, [items]);

    const handleDrop: OnTreeDropCallback = (dropArgs) => {
        onMove(moveItem(dropArgs.id, dropArgs.sort, itemsState));
    };

    return (
        <Tree
            draggable={isDraggable}
            id={listId}
            onDrop={handleDrop}
            data-test-id={dataTestId}
            selectedIds={selectedId ? [selectedId] : []}
            itemStyle={{
                spacingY,
                contentHight: 'content-fit',
                shadow: 'small',
                borderRadius: 'medium',
                borderWidth: 'x-small',
                borderStyle: 'solid',
            }}
            showDragHandlerOnHoverOnly={!isDraggable}
            dragHandlerPosition={!isDraggable ? 'none' : dragHandlerPosition}
            showContentWhileDragging={true}
        >
            {itemsState.map((item) => {
                const identifier = `collection-item-${item.id}`;
                return (
                    <TreeItem
                        id={item.id}
                        key={identifier}
                        type="collection-item"
                        accepts="collection-item"
                        expandable={false}
                        levelConstraint={0}
                        contentComponent={renderContent(item)}
                    />
                );
            })}
        </Tree>
    );
};
OrderableList.displayName = 'FondueOrderableList';
