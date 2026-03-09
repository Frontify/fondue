/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useSortable } from '@dnd-kit/react/sortable';
import { forwardRef, useRef, type ReactNode, useMemo } from 'react';

import { OrderableItemContextProvider, useOrderableItemContext } from './hooks/useOrderedListItemContext';
import styles from './styles/orderable-list.module.scss';

export type OrderableItemPadding = 'none' | 'small';
export type OrderableItemProps = {
    children?: ReactNode;
    id: string;
    disabled?: boolean;
    padding?: OrderableItemPadding;
    selected?: boolean;
    onSelect?: (isSelected: boolean) => void;
};
export const OrderableItem = forwardRef<HTMLDivElement, OrderableItemProps>((_props, _ref) => null);
OrderableItem.displayName = 'OrderableItem';

export const OrderableItemComponent = forwardRef<HTMLDivElement, OrderableItemProps & { index: number }>(
    ({ children, id, index, disabled, padding = 'small', selected, onSelect }, ref) => {
        const internalRef = useRef<HTMLDivElement | null>(null);

        const mergedRef = (node: HTMLDivElement | null) => {
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
                <div
                    className={styles.item}
                    data-padding={padding}
                    data-dragging={isDragging}
                    data-dropping={isDropping}
                    data-selected={Boolean(selected)}
                    data-test-id="fondue-orderable-list-item"
                    ref={mergedRef}
                >
                    {children}
                </div>
            </OrderableItemContextProvider>
        );
    },
);
OrderableItemComponent.displayName = 'OrderableItemComponent';

export const OrderableItemContent = forwardRef<HTMLDivElement, { children: ReactNode }>(({ children }, ref) => {
    const { onSelect } = useOrderableItemContext();

    if (onSelect) {
        return (
            <div
                className={styles.content}
                ref={ref}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        onSelect(true);
                    }
                }}
            >
                {children}
            </div>
        );
    }
    return (
        <div className={styles.content} ref={ref}>
            {children}
        </div>
    );
});
OrderableItemContent.displayName = 'OrderableItemContent';
