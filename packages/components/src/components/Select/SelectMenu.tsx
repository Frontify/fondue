/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixPopover from '@radix-ui/react-popover';
import { Slot as RadixSlot } from '@radix-ui/react-slot';
import { type UseComboboxPropGetters, type UseSelectPropGetters } from 'downshift';
import { Children, cloneElement, isValidElement, useEffect, type ForwardedRef, type ReactNode } from 'react';

import { cn } from '#/utilities/styleUtilities';

import { itemStyles, menuStyles } from './styles/selectStyles';
import { useSelectData } from './useSelectData';
import { getSelectOptionValue } from './utils';

export type SelectMenuProps = {
    isOpen: boolean;
    highlightedIndex: number;
    getMenuProps: UseSelectPropGetters<unknown>['getMenuProps'] | UseComboboxPropGetters<unknown>['getMenuProps'];
    getItemProps: UseSelectPropGetters<unknown>['getItemProps'] | UseComboboxPropGetters<unknown>['getItemProps'];
    children: React.ReactNode;
};

/**
 * Determines if the child is a leaf node of React, meaning it has one final child of a native type;
 * @param child ReactNode
 * @returns boolean
 */
const isReactLeaf = (child: ReactNode): boolean => {
    return (
        isValidElement(child) &&
        !isValidElement(child?.props?.children) &&
        !Children.toArray(child?.props?.children).some((child) => isValidElement(child))
    );
};

const recursiveMap = (
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

export const SelectMenu = (
    { isOpen, highlightedIndex, getMenuProps, getItemProps, children }: SelectMenuProps,
    forwardedRef?: ForwardedRef<HTMLUListElement>,
) => {
    return (
        <RadixPopover.Portal>
            <RadixPopover.Content>
                {
                    <ul
                        data-open-state={isOpen}
                        className={menuStyles}
                        {...getMenuProps(forwardedRef.current ? { ref: forwardedRef } : {})}
                    >
                        {recursiveMap(children, (child, index) => {
                            console.log('child', child);

                            return (
                                <RadixSlot
                                    className={cn(itemStyles, highlightedIndex === index && 'tw-bg-box-neutral-hover')}
                                    key={`${index}`}
                                    data-key={index}
                                    {...getItemProps({
                                        item: getSelectOptionValue(child.props as SelectItemElementType),
                                        index,
                                        ...(child.ref ? { ref: child.ref } : {}),
                                    })}
                                >
                                    {child}
                                </RadixSlot>
                            );
                        })}
                    </ul>
                }
            </RadixPopover.Content>
        </RadixPopover.Portal>
    );
};

export type SelectItemProps = { label?: string } & (
    | {
          value: string;
          children: React.ReactNode;
      }
    | {
          value?: string;
          children: string;
      }
);

export const SelectItem = (props: SelectItemProps, forwardedRef?: ForwardedRef<HTMLLIElement>) => {
    const { registerMenuItem, items } = useSelectData();
    const { value, label } = getSelectOptionValue(props);

    useEffect(() => {
        registerMenuItem({ value, label });
    }, []);
    if (items.map((item) => item.value).includes(value)) {
        return (
            <li ref={forwardedRef} data-test-bla {...props}>
                {props.children}
            </li>
        );
    }
};
SelectItem.displayName = 'Select.Item';

export type SelectItemGroupProps = { children: ReactNode; groupId: string };

export const SelectItemGroup = (
    { children, groupId }: SelectItemGroupProps,
    forwardedRef?: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div ref={forwardedRef} key={groupId}>
            {children}
        </div>
    );
};
