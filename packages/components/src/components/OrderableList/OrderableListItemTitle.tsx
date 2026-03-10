/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Slot } from '@radix-ui/react-slot';
import { forwardRef, type ReactNode } from 'react';

import { useOrderableItemContext } from './hooks/useOrderedListItemContext';
import styles from './styles/orderable-list.module.scss';

export const OrderableListItemTitle = forwardRef<HTMLSpanElement, { children: ReactNode; asChild?: boolean }>(
    ({ children, asChild }, ref) => {
        const { itemId } = useOrderableItemContext();
        const Component = asChild ? Slot : 'span';
        return (
            <Component className={styles.title} id={`orderable-item-${itemId}-title`} ref={ref}>
                {children}
            </Component>
        );
    },
);
OrderableListItemTitle.displayName = 'OrderableListItemTitle';
