/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AxisModifier } from '@dnd-kit/abstract/modifiers';
import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';
import { forwardRef, useMemo, type ForwardedRef, type ReactNode } from 'react';

import { OrderableListItem } from './OrderableListItem';
import { OrderableListItemAction } from './OrderableListItemAction';
import { OrderableItemCustomHandle, OrderableItemDragHandle } from './OrderableListItemDragHandle';
import { useOrderedListItems } from './hooks/useOrderedListItems';
import styles from './styles/orderable-list.module.scss';

type OrderableListItemSpacing = 'tight' | 'compact' | 'comfortable';
type OrderableListDirection = 'vertical' | 'horizontal';
type OrderableListProps = {
    children: ReactNode;
    spacing?: OrderableListItemSpacing;
    direction?: OrderableListDirection;
    order: string[];
    onOrderChange?: (order: string[]) => void;
};

export const OrderableListRoot = (
    { children, spacing = 'comfortable', direction = 'vertical', order = [], onOrderChange }: OrderableListProps,
    ref: ForwardedRef<HTMLUListElement>,
) => {
    const orderedItems = useOrderedListItems(children, order);

    const axisModifier = useMemo(
        () => AxisModifier.configure({ axis: direction === 'vertical' ? 'x' : 'y', value: 0 }),
        [direction],
    );

    const handleDragEnd: DragEndEvent = (event) => {
        if (event.canceled) {
            return;
        }
        const { source } = event.operation;
        if (isSortable(source)) {
            const { initialIndex, index } = source;
            if (initialIndex !== index) {
                const newItems = [...order];
                const [removed] = newItems.splice(initialIndex, 1);
                if (removed) {
                    newItems.splice(index, 0, removed);
                    onOrderChange?.(newItems);
                }
            }
        }
    };

    return (
        <DragDropProvider onDragEnd={handleDragEnd} modifiers={[axisModifier]}>
            <ul
                className={styles.root}
                data-spacing={spacing}
                data-direction={direction}
                data-test-id="fondue-orderable-list"
                ref={ref}
            >
                {orderedItems}
            </ul>
        </DragDropProvider>
    );
};
OrderableListRoot.displayName = 'OrderableList';
const ForwardedRefOrderableListRoot = forwardRef<HTMLDivElement, OrderableListProps>(OrderableListRoot);

export const OrderableList: {
    Root: typeof ForwardedRefOrderableListRoot;
    Item: typeof OrderableListItem;
    ItemAction: typeof OrderableListItemAction;
    CustomHandle: typeof OrderableItemCustomHandle;
    DragHandle: typeof OrderableItemDragHandle;
} = {
    Root: ForwardedRefOrderableListRoot,
    Item: OrderableListItem,
    ItemAction: OrderableListItemAction,
    CustomHandle: OrderableItemCustomHandle,
    DragHandle: OrderableItemDragHandle,
};
