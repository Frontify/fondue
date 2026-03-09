/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type KeyboardEvent, type ReactNode } from 'react';

import { useOrderableListAnnounce } from './hooks/useOrderableListAnnounce';
import { useOrderableItemContext } from './hooks/useOrderedListItemContext';
import styles from './styles/orderable-list.module.scss';

const getItemTitle = (itemId: string) =>
    document.getElementById(`orderable-item-${itemId}-title`)?.textContent ?? itemId;

export const OrderableListItemContent = forwardRef<HTMLDivElement, { children: ReactNode }>(({ children }, ref) => {
    const { itemId, onSelect, selected } = useOrderableItemContext();
    const announce = useOrderableListAnnounce();

    if (!onSelect) {
        return (
            // eslint-disable-next-line jsx-a11y-x/no-noninteractive-tabindex
            <div className={styles.content} ref={ref} tabIndex={0}>
                {children}
            </div>
        );
    }

    const handleSelect = () => {
        const newSelected = !selected;
        onSelect(newSelected);
        announce(`${getItemTitle(itemId)} ${newSelected ? 'selected' : 'unselected'}`);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleSelect();
        }
    };

    return (
        <div
            className={styles.content}
            ref={ref}
            role="button"
            tabIndex={0}
            aria-pressed={Boolean(selected)}
            onClick={handleSelect}
            onKeyDown={handleKeyDown}
            data-clickable
        >
            {children}
        </div>
    );
});
OrderableListItemContent.displayName = 'OrderableListItemContent';
