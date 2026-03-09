/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useSortable } from '@dnd-kit/react/sortable';
import { IconGrabHandle } from '@frontify/fondue-icons';
import { createContext, forwardRef, useRef, type ReactNode, useMemo, useContext } from 'react';

import styles from './styles/orderable-list.module.scss';

export type OrderableItemProps = { children?: ReactNode; id: string; disabled?: boolean };
export const OrderableItem = forwardRef<HTMLDivElement, OrderableItemProps>((_props, _ref) => null);
OrderableItem.displayName = 'OrderableItem';

type OrderableItemContextType = { dragHandleRef: (element: Element | null) => void };
const OrderableItemContext = createContext<OrderableItemContextType>({
    dragHandleRef: () => null,
});

OrderableItemContext.displayName = 'OrderableItemContext';

export const OrderableItemComponent = forwardRef<
    HTMLDivElement,
    OrderableItemProps & { index: number; showDragHandle?: boolean; actions: ReactNode[] }
>(({ children, id, index, disabled, showDragHandle, actions }, ref) => {
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

    const ItemContextValue = useMemo(() => ({ dragHandleRef: handleRef }), [handleRef]);

    return (
        <OrderableItemContext.Provider value={ItemContextValue}>
            <div
                className={styles.item}
                data-dragging={isDragging}
                data-dropping={isDropping}
                data-test-id="fondue-orderable-list-item"
                ref={mergedRef}
            >
                <div className={styles.content}>{children}</div>
                {actions.length > 0 && <div className={styles.actions}>{actions}</div>}
                {showDragHandle && (
                    <button type="button" aria-label="drag" className={styles.handle} ref={handleRef}>
                        <IconGrabHandle size={16} />
                    </button>
                )}
            </div>
        </OrderableItemContext.Provider>
    );
});
OrderableItemComponent.displayName = 'OrderableItemComponent';

export type OrderableListItemActionProps = { children: ReactNode };
export const OrderableListItemAction = forwardRef<HTMLDivElement, OrderableListItemActionProps>(({ children }, ref) => {
    return (
        <div className={styles.action} ref={ref}>
            {children}
        </div>
    );
});
OrderableListItemAction.displayName = 'OrderableListItemAction';

export const OrderableItemHandle = ({ children }: { children: ReactNode }) => {
    const { dragHandleRef } = useContext(OrderableItemContext);
    return (
        <div className={styles.dragHandle} ref={dragHandleRef}>
            {children}
        </div>
    );
};
