/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Children,
    cloneElement,
    forwardRef,
    isValidElement,
    type FC,
    type ForwardedRef,
    type ReactElement,
    type ReactNode,
} from 'react';

import { type SelectItemProps } from './SelectMenu';

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
export const isReactLeaf = (child: ReactNode): child is ReactElement => {
    console.log('child', child);

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

export const withInternalItemType = <RefType, ComponentPropType>(Component: FC<ComponentPropType>, type: string) => {
    const HOC = forwardRef<RefType, ComponentPropType>(
        (props: ComponentPropType, forwardedRef: ForwardedRef<RefType>) => {
            console.log('HOC', type);

            return <Component {...props} internalItemType={type} ref={forwardedRef} />;
        },
    );
    HOC.displayName = 'HOC';
    return HOC;
};
