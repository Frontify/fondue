/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type KeyboardEvent, forwardRef, type ReactNode } from 'react';

import { useOrderableListAnnounce } from './hooks/useOrderableListAnnounce';
import { useOrderableItemContext } from './hooks/useOrderedListItemContext';
import styles from './styles/orderable-list.module.scss';

export const OrderableListItemContent = forwardRef<HTMLDivElement, { children: ReactNode }>(({ children }, ref) => {
    const { itemId, onSelect, selected } = useOrderableItemContext();
    const announce = useOrderableListAnnounce();
    const isSelectable = Boolean(onSelect);

    const handleSelect = () => {
        const newSelected = !selected;
        onSelect?.(newSelected);
        const title = document.getElementById(`orderable-item-${itemId}-title`)?.textContent ?? itemId;
        announce(`${title} ${newSelected ? 'selected' : 'unselected'}`);
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
            role={isSelectable ? 'button' : undefined}
            tabIndex={0}
            aria-pressed={isSelectable ? Boolean(selected) : undefined}
            onClick={isSelectable ? handleSelect : undefined}
            onKeyDown={isSelectable ? handleKeyDown : undefined}
            data-clickable={isSelectable || undefined}
        >
            {children}
        </div>
    );
});
OrderableListItemContent.displayName = 'OrderableListItemContent';
