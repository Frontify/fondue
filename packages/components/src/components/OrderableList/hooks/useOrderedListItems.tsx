/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, isValidElement, useMemo, type ReactElement, type ReactNode, type RefObject } from 'react';

import { OrderableListItem, OrderableListItemComponent, type OrderableListItemProps } from '../OrderableListItem';
import { OrderableListItemAction, type OrderableListItemActionProps } from '../OrderableListItemAction';
import { OrderableListItemContent } from '../OrderableListItemContent';
import { OrderableItemCustomHandle, OrderableItemDragHandle } from '../OrderableListItemDragHandle';
import styles from '../styles/orderable-list.module.scss';

const getItemContentByType = (
    children: ReactNode,
): {
    actions: ReactNode[];
    content: ReactNode[];
    hasDragHandle: boolean;
    hasCustomHandle: boolean;
} => {
    let hasDragHandle = false;
    let hasCustomHandle = false;
    const actions: ReactNode[] = [];
    const content: ReactNode[] = [];
    Children.forEach(children, (child) => {
        if (isValidElement<OrderableListItemActionProps>(child) && child.type === OrderableListItemAction) {
            actions.push(child);
        } else if (isValidElement(child) && child.type === OrderableItemDragHandle) {
            hasDragHandle = true;
        } else if (isValidElement(child) && child.type === OrderableItemCustomHandle) {
            hasCustomHandle = true;
            content.push(child);
        } else {
            content.push(child);
        }
    });
    return { hasDragHandle, hasCustomHandle, actions, content };
};

type OrderableListItemElement = ReactElement<OrderableListItemProps> & {
    ref: RefObject<HTMLLIElement> | null;
};
type ListItems = Record<string, ListItem>;
type ListItem = {
    id: string;
    ref: RefObject<HTMLLIElement> | null;
    children: ReactNode;
    actions: ReactNode[];
    hasDragHandle: boolean;
    hasCustomHandle: boolean;
};

const getListItems = (children: ReactNode): ListItems => {
    const items: ListItems = {};
    Children.forEach(children, (child) => {
        if (isValidElement<OrderableListItemProps>(child) && child.type === OrderableListItem) {
            const typedChild = child as OrderableListItemElement;
            const { actions, content, hasDragHandle, hasCustomHandle } = getItemContentByType(
                typedChild.props.children,
            );
            const itemId = typedChild.props.id;
            items[itemId] = {
                ...typedChild.props,
                id: itemId,
                ref: typedChild.ref,
                actions,
                children: content,
                hasDragHandle,
                hasCustomHandle,
            };
        }
    });
    return items;
};

export const useOrderedListItems = (children: ReactNode, order: string[]): ReactNode => {
    const itemsWithIds = useMemo(() => {
        const items = getListItems(children);
        if (Object.keys(items).length !== order.length) {
            throw new Error('The number of items in the list does not match the order array');
        }
        return items;
    }, [children, order]);

    const sortedItems = useMemo(
        () => order.map((id) => itemsWithIds[id]).filter((item) => item !== undefined),
        [order, itemsWithIds],
    );

    return sortedItems.map(({ id, children, actions, hasDragHandle, hasCustomHandle, ...props }, index) => (
        <OrderableListItemComponent key={id} index={index} id={id} {...props}>
            <OrderableListItemContent>{children}</OrderableListItemContent>
            {actions.length > 0 && <div className={styles.actions}>{actions}</div>}
            {hasDragHandle && !hasCustomHandle && <OrderableItemDragHandle />}
        </OrderableListItemComponent>
    ));
};
