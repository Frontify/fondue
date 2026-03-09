/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ReactNode } from 'react';

import styles from './styles/orderable-list.module.scss';

export const OrderableListItemDescription = forwardRef<HTMLSpanElement, { children: ReactNode }>(
    ({ children }, ref) => {
        return (
            <span className={styles.description} ref={ref}>
                {children}
            </span>
        );
    },
);
OrderableListItemDescription.displayName = 'OrderableListItemDescription';
