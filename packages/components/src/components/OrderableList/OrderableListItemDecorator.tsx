/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ReactNode } from 'react';

import styles from './styles/orderable-list.module.scss';

export const OrderableListItemDecorator = forwardRef<HTMLSpanElement, { children: ReactNode }>(({ children }, ref) => {
    return (
        <span className={styles.decorator} ref={ref}>
            {children}
        </span>
    );
});
OrderableListItemDecorator.displayName = 'OrderableListItemDecorator';
