/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ReactNode } from 'react';

import styles from './styles/orderable-list.module.scss';

export type OrderableListItemActionProps = { children: ReactNode };
export const OrderableListItemAction = forwardRef<HTMLDivElement, OrderableListItemActionProps>(({ children }, ref) => {
    return (
        <div className={styles.action} ref={ref}>
            {children}
        </div>
    );
});
OrderableListItemAction.displayName = 'OrderableListItemAction';
