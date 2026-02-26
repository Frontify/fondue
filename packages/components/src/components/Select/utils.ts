/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Children,
    cloneElement,
    isValidElement,
    type JSXElementConstructor,
    type ReactElement,
    type ReactNode,
} from 'react';

import { ForwardedRefSelectItem, type SelectItemProps } from './components/SelectItem';

/**
 * Extracts and returns an object containing `value` and `label` from a given SelectItemProps object.
 * It prioritizes explicit `value` and `label` properties but will fall back to using `children` as the value or label if necessary.
 *
 * @param {SelectItemProps} props - The properties of a select item, which include potential children, value, and label.
 * @returns {{ value: string; label: string, children?: ReactNode }} An object containing `value` and `label` as strings.
 *
 * @example
 * // Returns { value: 'option1', label: 'Option 1' }
 * getSelectOptionValue({ value: 'option1', label: 'Option 1' });
 *
 * @example
 * // Uses children as the value and label when they are not explicitly provided
 * // Returns { value: 'Default', label: 'Default' }
 * getSelectOptionValue({ children: 'Default' });
 */
export const getSelectOptionValue = ({
    children,
    value,
    label,
}: SelectItemProps): {
    value: string;
    label: string;
    children?: ReactNode;
} => {
    if (children && typeof children === 'string') {
        return {
            value: value !== undefined ? value : children,
            label: label !== undefined ? label : children,
        };
    }

    return {
        value: value ?? '',
        label: label !== undefined ? label : (value ?? ''),
        ...(children ? { children } : null),
    };
};
/**
 * Determines if the child is a leaf node of React, meaning it has one final child of a native type;
 *
 * @param {ReactNode} child - The React child node to check.
 * @param {JSXElementConstructor<never>} Component - The React component constructor used for comparison.
 * @returns {boolean} Returns true if the `child` is a valid React element of the specified `Component` type.
 *
 * @example
 * // Assuming ForwardedRefSelectItem is a component that renders an <input> element
 * // Returns true
 * isReactLeaf(<ForwardedRefSelectItem />, ForwardedRefSelectItem);
 *
 * @example
 * // Returns false for non-matching types or non-leaf components
 * isReactLeaf(<div><ForwardedRefSelectItem /></div>, ForwardedRefSelectItem);
 */
export const isReactLeaf = (child: ReactNode, Component: JSXElementConstructor<never>): child is ReactElement =>
    isValidElement(child) && child.type === Component;

/**
 * Recursively maps through React children, applying a callback to each child that meets the specified conditions.
 * This function is useful for deeply nested structures where modifications or checks are needed at multiple levels.
 *
 * @param {ReactNode} children - The children to be recursively processed.
 * @param {function(ReactNode, number): ReactNode} callback - A function that is called for each child that meets the condition. It receives the child and its index, and returns a React node.
 * @param {string} [filterText=''] - Optional text used to filter children based on their properties.
 * @param {number} [nextIndex=0] - The starting index for numbering children, defaults to 0.
 * @returns {{ parsedChildren: ReactNode[], subElementCount: number }} An object containing the transformed children array and the count of all processed sub-elements.
 *
 * @example
 * // Example usage in a select component where only items containing a certain text are modified
 * recursiveMap(children, (child, index) => React.cloneElement(child, { extraProp: 'value' }), 'specific text');
 *
 * @example
 * // Nested structure transformation, adding class names based on index
 * recursiveMap(children, (child, index) => React.cloneElement(child, { className: `item-${index}` }));
 */
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
        if (isReactLeaf(child, ForwardedRefSelectItem) && isValidElement<SelectItemProps>(child)) {
            if (
                getSelectOptionValue(child.props)
                    .label.toLowerCase()
                    .includes(filterText?.toLowerCase() || '')
            ) {
                resultingChildren.push(callback(child, nextIndex + itemCounter));
                itemCounter++;
            }
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
