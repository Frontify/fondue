/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, ReactElement, cloneElement, isValidElement } from 'react';
import { isFragment } from 'react-is';

export const cloneThroughFragments = <T>(
    children: ReactElement<T> | ReactElement<T>[],
    props?: Partial<T>,
): ReactElement<T>[] => {
    return Children.map(children, (child: ReactElement<T>) => {
        if (isValidElement(child)) {
            const childProps = child.props;

            if (isFragment(child)) {
                return cloneThroughFragments((child as ReactElement).props.children, props);
            }

            return cloneElement(child, { ...childProps, ...props });
        }

        return child;
    }) as ReactElement<T>[];
};
