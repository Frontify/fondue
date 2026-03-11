/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AxisModifier } from '@dnd-kit/abstract/modifiers';
import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';
import { forwardRef, useMemo, type ForwardedRef, type ReactNode } from 'react';

import { OrderableListItem } from './OrderableListItem';
import { OrderableListItemAction } from './OrderableListItemAction';
import { OrderableListItemDecorator } from './OrderableListItemDecorator';
import { OrderableListItemDescription } from './OrderableListItemDescription';
import { OrderableItemCustomHandle, OrderableItemDragHandle } from './OrderableListItemDragHandle';
import { OrderableListItemTitle } from './OrderableListItemTitle';
import { getItemTitle } from './helpers/getItemTitle';
import { OrderableListAnnounceProvider, useAnnounceState } from './hooks/useOrderableListAnnounce';
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
    'aria-label'?: string;
};

export const OrderableListRoot = (
    {
        children,
        spacing = 'comfortable',
        direction = 'vertical',
        order = [],
        onOrderChange,
        'aria-label': ariaLabel = 'Sortable list',
    }: OrderableListProps,
    ref: ForwardedRef<HTMLUListElement>,
) => {
    const orderedItems = useOrderedListItems(children, order);
    const { message, announce } = useAnnounceState();

    // Lock the cross-axis to prevent drift: vertical lists lock x, horizontal lists lock y
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
                    announce(
                        `${getItemTitle(removed)} dropped, moved from position ${initialIndex + 1} to ${index + 1} of ${order.length}`,
                    );
                }
            }
        }
    };

    return (
        <OrderableListAnnounceProvider value={announce}>
            <DragDropProvider onDragEnd={handleDragEnd} modifiers={[axisModifier]}>
                <ul
                    className={styles.root}
                    aria-roledescription="sortable list"
                    aria-label={ariaLabel}
                    data-spacing={spacing}
                    data-direction={direction}
                    data-test-id="fondue-orderable-list"
                    ref={ref}
                >
                    {orderedItems}
                </ul>
                <div aria-live="polite" aria-atomic="true" className={styles.visuallyHidden}>
                    {message}
                </div>
            </DragDropProvider>
        </OrderableListAnnounceProvider>
    );
};
OrderableListRoot.displayName = 'OrderableList';
const ForwardedRefOrderableListRoot = forwardRef<HTMLUListElement, OrderableListProps>(OrderableListRoot);

export const OrderableList: {
    Root: typeof ForwardedRefOrderableListRoot;
    Item: typeof OrderableListItem;
    ItemAction: typeof OrderableListItemAction;
    CustomHandle: typeof OrderableItemCustomHandle;
    DragHandle: typeof OrderableItemDragHandle;
    ItemTitle: typeof OrderableListItemTitle;
    ItemDescription: typeof OrderableListItemDescription;
    ItemDecorator: typeof OrderableListItemDecorator;
} = {
    Root: ForwardedRefOrderableListRoot,
    Item: OrderableListItem,
    ItemAction: OrderableListItemAction,
    CustomHandle: OrderableItemCustomHandle,
    DragHandle: OrderableItemDragHandle,
    ItemTitle: OrderableListItemTitle,
    ItemDescription: OrderableListItemDescription,
    ItemDecorator: OrderableListItemDecorator,
};
