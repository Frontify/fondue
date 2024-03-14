/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Fragment, useEffect, useState } from 'react';

import { LegacyCollectionItem } from './LegacyCollectionItem';
import { LegacyOrderableListItem, LegacyOrderableListProps } from './types';
import { DropZone } from '@components/DropZone';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { moveItems } from '@utilities/dnd';
import { useId } from '@react-aria/utils';
import { CollisionPosition } from '../Tree/types';

const listItemsCompareFn = <T extends object>(
    itemA: LegacyOrderableListItem<T>,
    itemB: LegacyOrderableListItem<T>,
): number => {
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

export const LegacyOrderableList = <T extends object>({
    onMove,
    dragDisabled,
    items,
    renderContent,
    'data-test-id': dataTestId = 'orderable-list',
}: LegacyOrderableListProps<T>) => {
    const [itemsState, setItemsState] = useState(items);
    const listId = useId();

    useEffect(() => {
        // sort the incoming items
        const itemsClone = [...items];
        itemsClone.sort(listItemsCompareFn);
        setItemsState(itemsClone);
    }, [items]);

    const handleDrop = (
        targetItem: LegacyOrderableListItem<T>,
        sourceItem: LegacyOrderableListItem<T>,
        position: CollisionPosition,
    ) => {
        const modifiedItems = moveItems(targetItem, sourceItem, position, itemsState);
        onMove(modifiedItems);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="tw-outline-none" data-test-id={dataTestId}>
                {itemsState.map((item, index) => (
                    <Fragment key={`dropzone-orderable-list-key-${index}`}>
                        <DropZone
                            key={`orderable-list-item-${index}-before`}
                            data={{
                                targetItem: item,
                                position: 'before' as const,
                            }}
                            onDrop={handleDrop}
                            accept={listId}
                        />
                        <LegacyCollectionItem
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
                                    position: 'after' as const,
                                }}
                                onDrop={handleDrop}
                                accept={listId}
                            />
                        )}
                    </Fragment>
                ))}
            </div>
        </DndProvider>
    );
};
LegacyOrderableList.displayName = 'FondueLegacyOrderableList';
