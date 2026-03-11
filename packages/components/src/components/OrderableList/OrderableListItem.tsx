/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useSortable } from '@dnd-kit/react/sortable';
import { forwardRef, useCallback, useEffect, useRef, useState, type ReactNode, useMemo } from 'react';

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

        const [hasHandle, setHasHandle] = useState(false);
        const wrappedHandleRef = useCallback(
            (element: Element | null) => {
                setHasHandle(element !== null);
                if (!disabled) {
                    handleRef(element);
                }
            },
            [disabled, handleRef],
        );

        const itemContextValue = useMemo(
            () => ({ itemId: id, dragHandleRef: wrappedHandleRef, hasHandle, selected, onSelect }),
            [id, wrappedHandleRef, hasHandle, selected, onSelect],
        );

        useEffect(() => {
            if (process.env.NODE_ENV !== 'production') {
                const titleElement = document.getElementById(`orderable-item-${id}-title`);
                if (!titleElement) {
                    console.warn(
                        `[OrderableList] Item "${id}" is missing an <OrderableList.ItemTitle>. ` +
                            'This is required for accessible drag-and-drop announcements',
                    );
                }
            }
        }, [id]);

        return (
            <OrderableItemContextProvider value={itemContextValue}>
                <li
                    className={styles.item}
                    aria-roledescription="sortable item"
                    data-padding={padding}
                    data-disabled={disabled || undefined}
                    data-dragging={isDragging}
                    data-dropping={isDropping}
                    data-selected={selected || undefined}
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
