/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, isValidElement, useMemo, type ReactElement, type ReactNode, type RefObject } from 'react';

import { OrderableItem, OrderableItemComponent, OrderableItemContent, type OrderableItemProps } from '../OrderableItem';
import { OrderableListItemAction, type OrderableListItemActionProps } from '../OrderableListItemAction';
import { OrderableItemDragHandle } from '../OrderableListItemDragHandle';
import styles from '../styles/orderable-list.module.scss';

const getItemContentByType = (
    children: ReactNode,
): {
    actions: ReactNode[];
    content: ReactNode[];
    dragHandle: ReactNode;
} => {
    let dragHandle: ReactNode = undefined;
    const actions: ReactNode[] = [];
    const content: ReactNode[] = [];
    Children.forEach(children, (child) => {
        if (isValidElement<OrderableListItemActionProps>(child) && child.type === OrderableListItemAction) {
            actions.push(child);
        } else if (isValidElement(child) && child.type === OrderableItemDragHandle) {
            dragHandle = child;
        } else {
            content.push(child);
        }
    });
    return { dragHandle, actions, content };
};

type OrderableItemElement = ReactElement<OrderableItemProps> & {
    ref: RefObject<HTMLDivElement> | null;
};
type ListItems = Record<string, ListItem>;
type ListItem = {
    id: string;
    ref: RefObject<HTMLDivElement> | null;
    children: ReactNode;
    actions: ReactNode[];
    dragHandle: ReactNode;
};

const getListItems = (children: ReactNode): ListItems => {
    const items: ListItems = {};
    Children.forEach(children, (child) => {
        if (isValidElement<OrderableItemProps>(child) && child.type === OrderableItem) {
            const typedChild = child as OrderableItemElement;
            const { actions, content, dragHandle } = getItemContentByType(typedChild.props.children);
            const itemId = typedChild.props.id;
            items[itemId] = {
                ...typedChild.props,
                id: itemId,
                ref: typedChild.ref,
                actions,
                children: content,
                dragHandle,
            };
        }
    });
    return items;
};

export const useOrderedListItems = (children: ReactNode, order: string[]): ReactNode => {
    const itemsWithIds = useMemo(() => getListItems(children), [children]);

    if (Object.keys(itemsWithIds).length !== order.length) {
        throw new Error('The number of items in the list does not match the order array');
    }

    const sortedItems = useMemo(
        () => order.map((id) => itemsWithIds[id]).filter((item) => item !== undefined),
        [order, itemsWithIds],
    );

    return sortedItems.map(({ id, children, actions, dragHandle, ...props }, index) => (
        <OrderableItemComponent key={id} index={index} id={id} {...props}>
            <OrderableItemContent>{children}</OrderableItemContent>
            {actions.length > 0 && <div className={styles.actions}>{actions}</div>}
            {(actions.length > 0 || Boolean(dragHandle)) && <OrderableItemDragHandle />}
        </OrderableItemComponent>
    ));
};
