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
