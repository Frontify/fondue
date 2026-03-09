/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ReactNode } from 'react';

import styles from './styles/orderable-list.module.scss';

export const OrderableListItemTitle = forwardRef<HTMLSpanElement, { children: ReactNode }>(({ children }, ref) => {
    return (
        <span className={styles.title} ref={ref}>
            {children}
        </span>
    );
});
OrderableListItemTitle.displayName = 'OrderableListItemTitle';
