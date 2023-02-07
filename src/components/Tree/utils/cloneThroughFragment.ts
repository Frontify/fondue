/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, ReactElement, ReactNode, cloneElement, isValidElement } from 'react';
import { isFragment } from 'react-is';

export const cloneThroughFragments = <T>(children: ReactNode, props?: Partial<T>): ReactNode => {
    return Children.toArray(children).map((child) => {
        if (isValidElement(child)) {
            const childProps = child.props;

            if (isFragment(child)) {
                return cloneThroughFragments((child as ReactElement).props.children, props);
            }

            return cloneElement(child, { ...childProps, ...props });
        }

        return child;
    });
};
