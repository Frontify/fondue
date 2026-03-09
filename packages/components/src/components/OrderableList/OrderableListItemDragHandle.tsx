/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconGrabHandle } from '@frontify/fondue-icons';
import { Slot } from '@radix-ui/react-slot';
import { type ReactNode } from 'react';

import { useOrderableItemContext } from './hooks/useOrderedListItemContext';
import styles from './styles/orderable-list.module.scss';

export const OrderableItemDragHandle = () => {
    const { dragHandleRef } = useOrderableItemContext();
    return (
        <button type="button" aria-label="drag" className={`${styles.handle} ${styles.dragHandle}`} ref={dragHandleRef}>
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
