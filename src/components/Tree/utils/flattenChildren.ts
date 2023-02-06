/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, ReactElement } from 'react';
import { isFragment } from 'react-is';

export const flattenChildren = (children?: ReactElement | ReactElement[]) => {
    const result: ReactElement[] = [];

    Children.map(children, (child) => {
        if (isFragment(child)) {
            result.push(...flattenChildren(child.props.children));
        } else {
            child && result.push(child);
        }
    });

    return result.filter(Boolean);
};
