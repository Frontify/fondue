/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';

/** loop to extract child props as required by Downshift hook. If children is a array, then it is multiple groups and we must loop thru the nested children, else it is a single group and can be accessed one level down */
export const childrenToArray = (children: ReactElement | ReactElement[]) => {
    const childrenPropArray = [];
    if (Array.isArray(children)) {
        for (const element of children) {
            for (const child of element.props.children) {
                childrenPropArray.push({ ...child.props });
            }
        }
    } else {
        for (const child of children.props.children) {
            childrenPropArray.push({ ...child.props });
        }
    }
    return childrenPropArray;
};

/** Downshift hook required ~> "If your items are stored as, say, objects instead of strings, downshift still needs a string representation for each one. This is required for accessibility aria-live messages (e.g., after making a selection) and for keyboard interaction features (e.g., highlighting an item by typing its first few characters)." */
export const itemToString = <T>(item: T | null): string => {
    return String(item);
};
