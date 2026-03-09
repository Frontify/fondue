/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ReactNode } from 'react';

import { useOrderableItemContext } from './hooks/useOrderedListItemContext';
import styles from './styles/orderable-list.module.scss';

export const OrderableListItemTitle = forwardRef<HTMLSpanElement, { children: ReactNode }>(({ children }, ref) => {
    const { itemId } = useOrderableItemContext();
    return (
        <span className={styles.title} id={`orderable-item-${itemId}-title`} ref={ref}>
            {children}
        </span>
    );
});
OrderableListItemTitle.displayName = 'OrderableListItemTitle';
