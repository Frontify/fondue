/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react';
import { isSortable, useSortable } from '@dnd-kit/react/sortable';
import { IconGrabHandle } from '@frontify/fondue-icons';
import { forwardRef, useMemo, useRef, useState, type ForwardedRef, type ReactNode } from 'react';

import { getListItems } from './hooks/useItemOrder';
import styles from './styles/orderable-list.module.scss';

export type OrderableListItemProps = { children?: ReactNode; id: string };
export const OrderableListItem = () => {
    return null;
};

export const SortableItem = forwardRef<HTMLDivElement, OrderableListItemProps & { index: number }>(
    ({ children, id, index }, ref) => {
        const internalRef = useRef<HTMLDivElement | null>(null);

        const mergedRef = (node: HTMLDivElement | null) => {
            internalRef.current = node;
            if (typeof ref === 'function') {
                ref(node);
            } else if (ref !== null) {
                ref.current = node;
            }
        };

        const { isDragging, isDropping, handleRef } = useSortable({ id, index, element: internalRef });

        return (
            <div
                className={styles.item}
                data-dragging={isDragging}
                data-dropping={isDropping}
                data-test-id="fondue-orderable-list-item"
                ref={mergedRef}
            >
                <div className={styles.content}>{children}</div>
                <button type="button" aria-label="drag" className={styles.handle} ref={handleRef}>
                    <IconGrabHandle size={16} />
                </button>
            </div>
        );
    },
);
SortableItem.displayName = 'SortableItem';

type OrderableListItemSpacing = 'tight' | 'compact' | 'comfortable';
type OrderableListProps = { children?: ReactNode; spacing?: OrderableListItemSpacing };

export const OrderableListRoot = (
    { children, spacing = 'comfortable' }: OrderableListProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const itemsWithIds = useMemo(() => getListItems(children), [children]);
    const [items, setItems] = useState<string[]>(itemsWithIds.map((item) => item.id));

    const handleDragEnd: DragEndEvent = (event) => {
        if (event.canceled) {
            return;
        }
        const { source } = event.operation;
        if (isSortable(source)) {
            const { initialIndex, index } = source;
            if (initialIndex !== index) {
                const newItems = [...items];
                const [removed] = newItems.splice(initialIndex, 1);
                if (removed) {
                    newItems.splice(index, 0, removed);
                    setItems(newItems);
                }
            }
        }
    };

    return (
        <DragDropProvider onDragEnd={handleDragEnd}>
            <div className={styles.root} data-spacing={spacing} data-test-id="fondue-orderable-list" ref={ref}>
                {itemsWithIds.map((item, index) => (
                    <SortableItem key={item.id} index={index} {...item}>
                        {item.children}
                    </SortableItem>
                ))}
            </div>
        </DragDropProvider>
    );
};
OrderableListRoot.displayName = 'OrderableList';
const ForwardedRefOrderableListRoot = forwardRef<HTMLDivElement, OrderableListProps>(OrderableListRoot);

export const OrderableList: {
    Root: typeof ForwardedRefOrderableListRoot;
    Item: typeof OrderableListItem;
} = {
    Root: ForwardedRefOrderableListRoot,
    Item: OrderableListItem,
};
