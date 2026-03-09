/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, isValidElement, useMemo, type ReactElement, type ReactNode, type RefObject } from 'react';

import {
    OrderableItem,
    OrderableItemComponent,
    OrderableListItemAction,
    type OrderableListItemActionProps,
    type OrderableItemProps,
    OrderableItemDragHandle,
} from '../OrderableItem';

const getItemContentByType = (
    children: ReactNode,
): {
    actions: ReactNode[];
    content: ReactNode[];
    hasDragHandle: boolean;
} => {
    let hasDragHandle: boolean = false;
    const actions: ReactNode[] = [];
    const content: ReactNode[] = [];
    Children.forEach(children, (child) => {
        if (isValidElement<OrderableListItemActionProps>(child) && child.type === OrderableListItemAction) {
            actions.push(child);
        } else if (isValidElement(child) && child.type === OrderableItemDragHandle) {
            hasDragHandle = true;
        } else {
            content.push(child);
        }
    });
    return { actions, content, hasDragHandle };
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
    hasDragHandle: boolean;
};

const getListItems = (children: ReactNode): ListItems => {
    const items: ListItems = {};
    Children.forEach(children, (child) => {
        if (isValidElement<OrderableItemProps>(child) && child.type === OrderableItem) {
            const typedChild = child as OrderableItemElement;
            const { actions, content, hasDragHandle } = getItemContentByType(typedChild.props.children);
            const itemId = typedChild.props.id;
            items[itemId] = {
                id: itemId,
                ref: typedChild.ref,
                actions,
                children: content,
                hasDragHandle,
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
    return sortedItems.map(({ id, children, actions, hasDragHandle }, index) => (
        <OrderableItemComponent key={id} index={index} id={id} actions={actions} hasDragHandle={hasDragHandle}>
            {children}
        </OrderableItemComponent>
    ));
};
