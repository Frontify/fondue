/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, cloneElement, isValidElement, type ReactNode } from 'react';

import { type SelectItemElementType } from './SelectMenu';

export const getSelectOptionValue = ({
    children,
    value,
    label,
}: SelectItemElementType): {
    value: string;
    label: string;
} => {
    if (children && typeof children === 'string') {
        return {
            value: value ? value : children,
            label: label ? label : children,
        };
    } else {
        return {
            value: value || '',
            label: label ? label : value || '',
        };
    }
};

/**
 * Determines if the child is a leaf node of React, meaning it has one final child of a native type;
 * @param child ReactNode
 * @returns boolean
 */
export const isReactLeaf = (child: ReactNode): boolean => {
    return (
        isValidElement(child) &&
        !isValidElement(child?.props?.children) &&
        !Children.toArray(child?.props?.children).some((child) => isValidElement(child))
    );
};

export const recursiveMap = (
    children: ReactNode,
    fn: (child: ReactNode, nextIndex: number) => ReactNode,
    nextIndex: number = 0,
): ReactNode[] => {
    const resultingChildren: ReactNode[] = [];
    Children.forEach(children, (child) => {
        if (isReactLeaf(child)) {
            resultingChildren.push(fn(child, nextIndex + resultingChildren.length));
        } else if (child?.props.children) {
            child = cloneElement(child, {
                children: recursiveMap(child.props.children, fn, nextIndex + resultingChildren.length),
                key: `group-${nextIndex + resultingChildren.length}`,
            });
            resultingChildren.push(child);
        } else {
            resultingChildren.push(child);
        }
    });
    return resultingChildren;
};
