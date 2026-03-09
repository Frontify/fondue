/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useSortable } from '@dnd-kit/react/sortable';
import { forwardRef, useRef, type ReactNode, useMemo } from 'react';

import { OrderableItemContextProvider } from './hooks/useOrderedListItemContext';
import styles from './styles/orderable-list.module.scss';

export type OrderableListItemPadding = 'none' | 'small';
export type OrderableListItemProps = {
    children?: ReactNode;
    id: string;
    disabled?: boolean;
    padding?: OrderableListItemPadding;
    selected?: boolean;
    onSelect?: (isSelected: boolean) => void;
};
export const OrderableListItem = forwardRef<HTMLLIElement, OrderableListItemProps>((_props, _ref) => null);
OrderableListItem.displayName = 'OrderableListItem';

export const OrderableListItemComponent = forwardRef<HTMLLIElement, OrderableListItemProps & { index: number }>(
    ({ children, id, index, disabled, padding = 'small', selected, onSelect }, ref) => {
        const internalRef = useRef<HTMLLIElement | null>(null);

        const mergedRef = (node: HTMLLIElement | null) => {
            internalRef.current = node;
            if (typeof ref === 'function') {
                ref(node);
            } else if (ref !== null) {
                ref.current = node;
            }
        };

        const { isDragging, isDropping, handleRef } = useSortable({ id, index, element: internalRef, disabled });

        const ItemContextValue = useMemo(() => ({ dragHandleRef: handleRef, onSelect }), [handleRef, onSelect]);

        return (
            <OrderableItemContextProvider value={ItemContextValue}>
                <li
                    className={styles.item}
                    data-padding={padding}
                    data-dragging={isDragging}
                    data-dropping={isDropping}
                    data-selected={Boolean(selected)}
                    data-test-id="fondue-orderable-list-item"
                    ref={mergedRef}
                >
                    {children}
                </li>
            </OrderableItemContextProvider>
        );
    },
);
OrderableListItemComponent.displayName = 'OrderableListItemComponent';
