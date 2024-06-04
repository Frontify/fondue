/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixPopover from '@radix-ui/react-popover';
import { Slot as RadixSlot } from '@radix-ui/react-slot';
import { type UseSelectPropGetters } from 'downshift';
import { Children } from 'react';

import { cn } from '#/utilities/styleUtilities';

import { itemStyles, menuStyles } from './styles/selectStyles';

type SelectMenuProps = {
    isOpen: boolean;
    highlightedIndex: number;
    inputItems: { label: string }[];
    getMenuProps: UseSelectPropGetters<unknown>['getMenuProps'];
    getItemProps: UseSelectPropGetters<unknown>['getItemProps'];
    children: React.ReactNode;
};

export const SelectMenu = ({
    isOpen,
    inputItems,
    highlightedIndex,
    getMenuProps,
    getItemProps,
    children,
}: SelectMenuProps) => {
    return (
        <RadixPopover.Portal>
            <RadixPopover.Content>
                {
                    <ul data-open-state={isOpen} className={menuStyles} {...getMenuProps()}>
                        {Children.map(Children.toArray(children), (child, index) => (
                            <RadixSlot
                                className={cn(itemStyles, highlightedIndex === index && 'tw-bg-box-neutral-hover')}
                                key={`${index}`}
                                {...getItemProps({ item: { label: 'test' }, index })}
                            >
                                {child}
                            </RadixSlot>
                        ))}
                    </ul>
                }
            </RadixPopover.Content>
        </RadixPopover.Portal>
    );
};

export const SelectItem = ({ children, ...props }: { children: React.ReactNode }) => {
    return (
        <li data-onchild {...props}>
            {children}
        </li>
    );
};
