/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark } from '@frontify/fondue-icons';
import * as RadixPopover from '@radix-ui/react-popover';
import { useSelect } from 'downshift';
import { forwardRef, type ForwardedRef, type ReactNode } from 'react';

import { Combobox, type ComboboxProps } from './Combobox';
import { SelectItem, SelectItemGroup, SelectMenu, type SelectItemGroupProps, type SelectItemProps } from './SelectMenu';
import { inputStyles, rootStyles } from './styles/selectStyles';
import { useSelectData, withSelectContext } from './useSelectData';

export type SelectComponentProps = {
    children?: ReactNode;
};

export const SelectInput = ({ children }: SelectComponentProps, forwardedRef: ForwardedRef<HTMLButtonElement>) => {
    const { items } = useSelectData();

    const { getToggleButtonProps, getMenuProps, getItemProps, selectedItem, isOpen, highlightedIndex } = useSelect({
        items,
        onSelectedItemChange: ({ selectedItem }) => {
            console.log('selectedItem', selectedItem);
        },
        itemToString: (item) => (item ? item.label : ''),
    });

    return (
        <RadixPopover.Root open={true}>
            <RadixPopover.Trigger asChild>
                <button
                    className={rootStyles}
                    {...getToggleButtonProps(forwardedRef ? { ref: forwardedRef } : {})}
                    tabIndex={0}
                >
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
    );
};
SelectInput.displayName = 'Select';

const ForwardedRefSelect = forwardRef<HTMLButtonElement, SelectComponentProps>(SelectInput);
const ForwardedRefCombobox = forwardRef<HTMLDivElement, ComboboxProps>(Combobox);
const ForwardedRefSelectItem = forwardRef<HTMLLIElement, SelectItemProps>(SelectItem);
const ForwardedRefSelectItemGroup = forwardRef<HTMLDivElement, SelectItemGroupProps>(SelectItemGroup);
// @ts-expect-error We support both single component (without slots) and compound components (with slots)
export const Select: typeof SelectInput & {
    Combobox: typeof ForwardedRefCombobox;
    Item: typeof ForwardedRefSelectItem;
    Group: typeof ForwardedRefSelectItemGroup;
} = withSelectContext<HTMLButtonElement, SelectComponentProps>(ForwardedRefSelect);
Select.Combobox = withSelectContext<HTMLDivElement, ComboboxProps>(ForwardedRefCombobox);
Select.Item = ForwardedRefSelectItem;
Select.Group = ForwardedRefSelectItemGroup;
