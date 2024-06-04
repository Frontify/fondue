/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixPopover from '@radix-ui/react-popover';
import { Slot as RadixSlot } from '@radix-ui/react-slot';
import { type UseSelectPropGetters } from 'downshift';
import { Children, useEffect } from 'react';

import { cn } from '#/utilities/styleUtilities';

import { itemStyles, menuStyles } from './styles/selectStyles';
import { useSelectData } from './useSelectData';

type SelectMenuProps = {
    isOpen: boolean;
    highlightedIndex: number;
    getMenuProps: UseSelectPropGetters<unknown>['getMenuProps'];
    getItemProps: UseSelectPropGetters<unknown>['getItemProps'];
    children: React.ReactNode;
};

export const SelectMenu = ({ isOpen, highlightedIndex, getMenuProps, getItemProps, children }: SelectMenuProps) => {
    const { items } = useSelectData();
    return (
        <RadixPopover.Portal>
            <RadixPopover.Content>
                {
                    <ul data-open-state={isOpen} className={menuStyles} {...getMenuProps()}>
                        {Children.map(Children.toArray(children), (child, index) => {
                            return (
                                <RadixSlot
                                    className={cn(itemStyles, highlightedIndex === index && 'tw-bg-box-neutral-hover')}
                                    key={`${index}`}
                                    {...getItemProps({ item: { label: 'test' }, index })}
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

export const SelectItem = ({
    children,
    value,
    label,
    ...props
}: {
    children: React.ReactNode;
    value: string;
    label: string;
}) => {
    const { registerMenuItem, items } = useSelectData();

    useEffect(() => {
        registerMenuItem({ value, label });
    }, []);
    if (items.map((item) => item.value).includes(value)) {
        return <li {...props}>{children}</li>;
    }
};
