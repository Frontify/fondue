/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixPopover from '@radix-ui/react-popover';
import { Slot as RadixSlot } from '@radix-ui/react-slot';
import { type UseSelectPropGetters } from 'downshift';
import { Children, isValidElement, useEffect } from 'react';

import { cn } from '#/utilities/styleUtilities';

import { itemStyles, menuStyles } from './styles/selectStyles';
import { useSelectData } from './useSelectData';
import { getSelectOptionValue } from './utils';

type SelectMenuProps = {
    isOpen: boolean;
    highlightedIndex: number;
    getMenuProps: UseSelectPropGetters<unknown>['getMenuProps'];
    getItemProps: UseSelectPropGetters<unknown>['getItemProps'];
    children: React.ReactNode;
};

export const SelectMenu = ({ isOpen, highlightedIndex, getMenuProps, getItemProps, children }: SelectMenuProps) => {
    return (
        <RadixPopover.Portal>
            <RadixPopover.Content>
                {
                    <ul data-open-state={isOpen} className={menuStyles} {...getMenuProps()}>
                        {Children.map(Children.toArray(children), (child, index) => {
                            if (isValidElement(child) && child.type !== 'li') {
                                return (
                                    <RadixSlot
                                        className={cn(
                                            itemStyles,
                                            highlightedIndex === index && 'tw-bg-box-neutral-hover',
                                        )}
                                        key={`${index}`}
                                        {...getItemProps({
                                            item: getSelectOptionValue(child.props as SelectItemElementType),
                                            index,
                                        })}
                                    >
                                        {child}
                                    </RadixSlot>
                                );
                            }
                        })}
                    </ul>
                }
            </RadixPopover.Content>
        </RadixPopover.Portal>
    );
};

export type SelectItemElementType = { label?: string } & (
    | {
          value: string;
          children: React.ReactNode;
      }
    | {
          value?: string;
          children: string;
      }
);

export const SelectItem = (props: SelectItemElementType) => {
    const { registerMenuItem, items } = useSelectData();
    const { value, label } = getSelectOptionValue(props);

    useEffect(() => {
        registerMenuItem({ value, label });
    }, []);
    if (items.map((item) => item.value).includes(value)) {
        return <li {...props}>{props.children}</li>;
    }
};
