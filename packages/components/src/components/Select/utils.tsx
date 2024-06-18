/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Children,
    cloneElement,
    isValidElement,
    type JSXElementConstructor,
    type ReactElement,
    type ReactNode,
} from 'react';

import { ForwardedRefSelectItem, type SelectItemProps } from './SelectItem';

export const getSelectOptionValue = ({
    children,
    value,
    label,
}: SelectItemProps): {
    value: string;
    label: string;
} => {
    if (children && typeof children === 'string') {
        return {
            value: value ? value : children,
            label: label ? label : children,
        };
    }
    
    return {
        value: value || '',
        label: label ? label : value || '',
    };
};

/**
 * Determines if the child is a leaf node of React, meaning it has one final child of a native type;
 */
export const isReactLeaf = (child: ReactNode, Component: JSXElementConstructor<any>): child is ReactElement => {
    return isValidElement(child) && child.type === Component;
};

export const recursiveMap = (
    children: ReactNode,
    callback: (child: ReactNode, nextIndex: number) => ReactNode,
    filterText?: string,
    nextIndex: number = 0,
): {
    parsedChildren: ReactNode[];
    subElementCount: number;
} => {
    const resultingChildren: ReactNode[] = [];
    let itemCounter = 0;
    Children.forEach(children, (child) => {
        if (
            isReactLeaf(child, ForwardedRefSelectItem) &&
            isValidElement<SelectItemProps>(child) &&
            getSelectOptionValue(child.props)
                .label.toLowerCase()
                .includes(filterText?.toLowerCase() || '')
        ) {
            resultingChildren.push(callback(child, nextIndex + itemCounter));
            itemCounter++;
        } else if (isValidElement<{ children: ReactNode }>(child) && child?.props.children) {
            const { parsedChildren, subElementCount } = recursiveMap(
                child.props.children,
                callback,
                '',
                nextIndex + itemCounter,
            );
            child = cloneElement(child, {
                children: parsedChildren,
                key: `group-${nextIndex + itemCounter}`,
            });
            resultingChildren.push(child);
            itemCounter += subElementCount;
        } else {
            resultingChildren.push(child);
        }
    });
    return {
        parsedChildren: resultingChildren,
        subElementCount: itemCounter,
    };
};
