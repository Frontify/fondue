/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconGrabHandle } from '@frontify/fondue-icons';
import { Slot } from '@radix-ui/react-slot';
import { type ReactNode } from 'react';

import { useOrderableItemContext } from './hooks/useOrderedListItemContext';
import styles from './styles/orderable-list.module.scss';

export const OrderableItemDragHandle = () => {
    const { itemId, dragHandleRef } = useOrderableItemContext();
    return (
        <button
            type="button"
            aria-labelledby={`orderable-handle-label-${itemId} orderable-item-${itemId}-title`}
            className={`${styles.handle} ${styles.dragHandle}`}
            ref={dragHandleRef}
        >
            <span id={`orderable-handle-label-${itemId}`} className={styles.visuallyHidden}>
                Reorder
            </span>
            <IconGrabHandle size={16} />
        </button>
    );
};

export const OrderableItemCustomHandle = ({ children, asChild }: { children: ReactNode; asChild?: boolean }) => {
    const { dragHandleRef } = useOrderableItemContext();
    const Component = asChild ? Slot : 'div';
    return (
        <Component className={styles.handle} ref={dragHandleRef}>
            {children}
        </Component>
    );
};
OrderableItemDragHandle.displayName = 'OrderableItemDragHandle';
OrderableItemCustomHandle.displayName = 'OrderableItemCustomHandle';
