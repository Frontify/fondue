/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, isValidElement, type ReactElement, type ReactNode, type RefObject } from 'react';

import { OrderableListItem, type OrderableListItemProps } from '../OrderableList';

type OrderableListItemElement = ReactElement<OrderableListItemProps> & {
    ref: RefObject<HTMLDivElement> | null;
};

type ListItem = { id: string; ref: RefObject<HTMLDivElement> | null; children: ReactNode };
export const getListItems = (children: ReactNode): ListItem[] => {
    const items: ListItem[] = [];
    Children.forEach(children, (child) => {
        if (isValidElement<OrderableListItemProps>(child) && child.type === OrderableListItem) {
            const typedChild = child as OrderableListItemElement;
            items.push({ id: typedChild.props.id, ref: typedChild.ref, children: typedChild.props.children });
        }
    });
    return items;
};
