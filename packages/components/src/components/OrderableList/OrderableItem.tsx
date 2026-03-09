/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useSortable } from '@dnd-kit/react/sortable';
import { IconGrabHandle } from '@frontify/fondue-icons';
import { forwardRef, useRef, type ReactNode } from 'react';

import styles from './styles/orderable-list.module.scss';

export type OrderableItemProps = { children?: ReactNode; id: string; disabled?: boolean };
export const OrderableItem = forwardRef<HTMLDivElement, OrderableItemProps>((_props, _ref) => null);
OrderableItem.displayName = 'OrderableItem';

export const OrderableItemComponent = forwardRef<
    HTMLDivElement,
    OrderableItemProps & { index: number; showDragHandle?: boolean }
>(({ children, id, index, disabled, showDragHandle }, ref) => {
    const internalRef = useRef<HTMLDivElement | null>(null);

    const mergedRef = (node: HTMLDivElement | null) => {
        internalRef.current = node;
        if (typeof ref === 'function') {
            ref(node);
        } else if (ref !== null) {
            ref.current = node;
        }
    };

    const { isDragging, isDropping, handleRef } = useSortable({ id, index, element: internalRef, disabled });

    return (
        <div
            className={styles.item}
            data-dragging={isDragging}
            data-dropping={isDropping}
            data-test-id="fondue-orderable-list-item"
            ref={mergedRef}
        >
            <div className={styles.content}>{children}</div>
            {showDragHandle && (
                <button type="button" aria-label="drag" className={styles.handle} ref={handleRef}>
                    <IconGrabHandle size={16} />
                </button>
            )}
        </div>
    );
});
OrderableItemComponent.displayName = 'OrderableItemComponent';
