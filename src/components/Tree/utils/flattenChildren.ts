/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, ReactElement, ReactNode, isValidElement } from 'react';
import { isFragment } from 'react-is';

export const flattenChildren = (children?: ReactNode) => {
    const result: ReactElement[] = [];

    Children.map(children, (child) => {
        if (isFragment(child)) {
            result.push(...flattenChildren(child.props.children));
        } else {
            isValidElement(child) && result.push(child);
        }
    });

    return result.filter(Boolean);
};

// ! TODO: delete this if not used
export function flattenTree(node: ReactNode): ReactElement[] {
    if (!node) {
        return [];
    }

    if (Array.isArray(node)) {
        return node.flatMap(flattenTree);
    }

    if (typeof node !== 'object' || !('props' in node)) {
        if (isValidElement(node)) {
            return [node as React.ReactElement];
        }
        return [];
    }

    const children = node.props.children;
    const flattenedChildren = flattenTree(children);

    if (isValidElement(node)) {
        return [node as React.ReactElement, ...flattenedChildren];
    }

    return flattenedChildren;
}
