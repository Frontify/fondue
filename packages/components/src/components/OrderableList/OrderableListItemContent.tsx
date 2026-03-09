/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ReactNode } from 'react';

import { useOrderableItemContext } from './hooks/useOrderedListItemContext';
import styles from './styles/orderable-list.module.scss';

export const OrderableListItemContent = forwardRef<HTMLDivElement, { children: ReactNode }>(({ children }, ref) => {
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
OrderableListItemContent.displayName = 'OrderableListItemContent';
