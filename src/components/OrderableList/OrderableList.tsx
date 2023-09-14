/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';

import { OrderableListItem, OrderableListProps } from './types';
import { useId } from '@react-aria/utils';
import { OnTreeDropCallback, Tree, TreeItem } from '..';
import { DraggableItem } from '@utilities/dnd/types';
import { merge } from '@utilities/merge';

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

const moveItems = (id: string, newPosition: number | null, items: DraggableItem[]) => {
    const newItems = new Map();

    const theItem = items.find((item) => item.id === id);

    let isPageOnLastPosition = true;
    let sort = 1;

    for (const currentItem of items) {
        if (currentItem.id === id) {
            continue;
        }
        if (newItems.size === (newPosition ?? 0)) {
            newItems.set(id, { ...theItem, sort });
            sort++;
            isPageOnLastPosition = false;
        }

        newItems.set(currentItem.id, { ...currentItem, sort });
        sort++;
    }

    if (isPageOnLastPosition) {
        newItems.set(id, { ...theItem, sort });
    }

    return Array.from(newItems.values());
};

export const OrderableList = <T extends object>({
    onMove,
    dragDisabled,
    items,
    dragHandlerPosition = 'none',
    spacingY = 'medium',
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
        const modifiedItems = moveItems(dropArgs.id, dropArgs.sort, itemsState);
        onMove(modifiedItems);
    };

    return (
        <Tree
            draggable={isDraggable}
            id={listId}
            onDrop={handleDrop}
            data-test-id={dataTestId}
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
                        contentComponent={<div className={merge(['tw-outline-none'])}>{renderContent(item)}</div>}
                    />
                );
            })}
        </Tree>
    );
};
OrderableList.displayName = 'FondueOrderableList';
