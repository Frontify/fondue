/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ReactNode } from 'react';

import { useOrderableItemContext } from './hooks/useOrderedListItemContext';
import styles from './styles/orderable-list.module.scss';

export const OrderableListItemDescription = forwardRef<HTMLSpanElement, { children: ReactNode }>(
    ({ children }, ref) => {
        const { itemId } = useOrderableItemContext();
        return (
            <span className={styles.description} id={`orderable-item-${itemId}-description`} ref={ref}>
                {children}
            </span>
        );
    },
);
OrderableListItemDescription.displayName = 'OrderableListItemDescription';
