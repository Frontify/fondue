/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark } from '@frontify/fondue-icons';
import * as RadixPopover from '@radix-ui/react-popover';
import { useSelect } from 'downshift';
import { type ReactNode } from 'react';

import { SelectMenu } from './SelectMenu';
import { inputStyles, rootStyles } from './styles/selectStyles';
import { useSelectData } from './useSelectData';

export type SelectComponentProps = {
    children?: ReactNode;
};

export const SelectInput = ({ children }: SelectComponentProps) => {
    const { items } = useSelectData();

    const { getToggleButtonProps, getLabelProps, getMenuProps, getItemProps, selectedItem, isOpen, highlightedIndex } =
        useSelect({
            items,
            onSelectedItemChange: ({ selectedItem }) => {
                console.log('selectedItem', selectedItem);
            },
            itemToString: (item) => (item ? item.label : ''),
        });

    return (
        <div>
            <RadixPopover.Root open={true}>
                <label htmlFor="abc" {...getLabelProps()}>
                    Choose an element:
                </label>
                <RadixPopover.Trigger asChild>
                    <button className={rootStyles} {...getToggleButtonProps()} tabIndex={0}>
                        <span className={inputStyles}>{selectedItem ? selectedItem.label : 'Please select'}</span>
                        <IconCheckMark
                            size={16}
                            className="tw-flex tw-text-text-positive tw-h-full tw-items-center tw-mr-3"
                            data-test-id={'test-success-icon'}
                        />
                    </button>
                </RadixPopover.Trigger>

                <SelectMenu
                    isOpen={isOpen}
                    highlightedIndex={highlightedIndex}
                    getMenuProps={getMenuProps}
                    getItemProps={getItemProps}
                >
                    {children}
                </SelectMenu>
            </RadixPopover.Root>
        </div>
    );
};
SelectInput.displayName = 'Select.Input';
