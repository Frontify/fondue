/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixPopover from '@radix-ui/react-popover';
import { useSelect } from 'downshift';
import { forwardRef, type ForwardedRef, type ReactNode } from 'react';

import { Combobox, type ComboboxProps } from './Combobox';
import { SelectCaret } from './SelectCaret';
import { SelectItem, SelectItemGroup, SelectMenu, type SelectItemGroupProps, type SelectItemProps } from './SelectMenu';
import styles from './styles/select.module.scss';
import { useSelectData, withSelectContext, type SelectItemType } from './useSelectData';

export type SelectComponentProps = {
    children?: ReactNode;
    onSelect?: (selectedItem: SelectItemType) => void;
    defaultItem?: SelectItemType;
};

export const SelectInput = (
    { children, onSelect, defaultItem }: SelectComponentProps,
    forwardedRef: ForwardedRef<HTMLButtonElement>,
) => {
    const { items } = useSelectData();

    const { getToggleButtonProps, getMenuProps, getItemProps, selectedItem, isOpen, highlightedIndex } = useSelect({
        items,
        defaultSelectedItem: defaultItem,
        onSelectedItemChange: ({ selectedItem }) => {
            onSelect && onSelect(selectedItem);
        },
        itemToString: (item) => (item ? item.label : ''),
    });

    return (
        <RadixPopover.Root open={true}>
            <RadixPopover.Trigger asChild>
                <button
                    className={styles.root}
                    {...getToggleButtonProps(forwardedRef ? { ref: forwardedRef } : {})}
                    tabIndex={0}
                >
                    <span className={styles.input}>{selectedItem ? selectedItem.label : 'Please select'}</span>
                    <SelectCaret isOpen={isOpen} />
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
ForwardedRefSelectItem.displayName = 'Select.Item';
const ForwardedRefSelectItemGroup = forwardRef<HTMLDivElement, SelectItemGroupProps>(SelectItemGroup);

// @ts-expect-error We support both Select and Select.Combobox as the Root
export const Select: typeof SelectInput & {
    Combobox: typeof ForwardedRefCombobox;
    Item: typeof ForwardedRefSelectItem;
    Group: typeof ForwardedRefSelectItemGroup;
} = withSelectContext<HTMLButtonElement, SelectComponentProps>(ForwardedRefSelect);
Select.Combobox = withSelectContext<HTMLDivElement, ComboboxProps>(ForwardedRefCombobox);
Select.Item = ForwardedRefSelectItem;
Select.Group = ForwardedRefSelectItemGroup;
