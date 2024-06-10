/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixPopover from '@radix-ui/react-popover';
import { Slot as RadixSlot } from '@radix-ui/react-slot';
import { useSelect } from 'downshift';
import { forwardRef, type ForwardedRef, type ReactNode } from 'react';

import { Combobox, type ComboboxProps } from './Combobox';
import { SelectCaret } from './SelectCaret';
import { SelectClear } from './SelectClear';
import { SelectItem, SelectItemGroup, SelectMenu, type SelectItemGroupProps, type SelectItemProps } from './SelectMenu';
import { SelectSlot, type SelectSlotProps } from './SelectSlot';
import styles from './styles/select.module.scss';
import { useSelectData, type SelectItemType } from './useSelectData';

export type SelectEmphasis = 'default' | 'weak';

export type SelectComponentProps = {
    children?: ReactNode;
    onSelect?: (selectedItem: SelectItemType) => void;
    defaultValue?: string;
    placeholder?: string;
    disabled?: boolean;
    clearable?: boolean;
    emphasis?: SelectEmphasis;
    ariaLabel: string;
};

export const SelectInput = (
    {
        children,
        onSelect,
        defaultValue,
        ariaLabel,
        placeholder = '',
        disabled,
        clearable,
        emphasis,
    }: SelectComponentProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
) => {
    const { inputSlots, menuSlots, items, defaultItem, label } = useSelectData(children, defaultValue);

    console.log('input', inputSlots);

    const {
        getToggleButtonProps,
        getMenuProps,
        getItemProps,
        getLabelProps,
        reset,
        selectedItem,
        isOpen,
        highlightedIndex,
    } = useSelect({
        items,
        defaultSelectedItem: defaultItem,
        onSelectedItemChange: ({ selectedItem }) => {
            onSelect && onSelect(selectedItem);
        },
        itemToString: (item) => (item ? item.label : ''),
    });

    console.log(label);

    return (
        <RadixPopover.Root open={true}>
            <RadixPopover.Anchor asChild>
                <div
                    className={styles.root}
                    data-emphasis={emphasis}
                    data-disabled={disabled}
                    data-empty={!selectedItem}
                    {...(disabled
                        ? {}
                        : getToggleButtonProps({
                              'aria-label': ariaLabel,
                              ...(forwardedRef ? { ref: forwardedRef } : {}),
                          }))}
                >
                    <RadixSlot data-test="bla" {...getLabelProps()}>
                        {label}
                    </RadixSlot>
                    <span className={styles.input}>{selectedItem ? selectedItem.label : placeholder}</span>
                    {inputSlots}
                    {clearable && <SelectClear reset={reset} />}
                    <SelectCaret isOpen={isOpen} />
                </div>
            </RadixPopover.Anchor>

            <SelectMenu
                isOpen={isOpen}
                highlightedIndex={highlightedIndex}
                getMenuProps={getMenuProps}
                getItemProps={getItemProps}
            >
                {menuSlots}
            </SelectMenu>
        </RadixPopover.Root>
    );
};
SelectInput.displayName = 'Select';

const ForwardedRefSelect = forwardRef<HTMLDivElement, SelectComponentProps>(SelectInput);
const ForwardedRefCombobox = forwardRef<HTMLDivElement, ComboboxProps>(Combobox);
const ForwardedRefSelectItem = forwardRef<HTMLLIElement, SelectItemProps>(SelectItem);
const ForwardedRefSelectSlot = forwardRef<HTMLDivElement, SelectSlotProps>(SelectSlot);
ForwardedRefSelectItem.displayName = 'Select.Item';
const ForwardedRefSelectItemGroup = forwardRef<HTMLDivElement, SelectItemGroupProps>(SelectItemGroup);

// @ts-expect-error We support both Select and Select.Combobox as the Root
export const Select: typeof SelectInput & {
    Combobox: typeof ForwardedRefCombobox;
    Item: typeof ForwardedRefSelectItem;
    Group: typeof ForwardedRefSelectItemGroup;
    Slot: typeof ForwardedRefSelectSlot;
} = ForwardedRefSelect;
Select.Combobox = ForwardedRefCombobox;
Select.Item = ForwardedRefSelectItem;
Select.Group = ForwardedRefSelectItemGroup;
Select.Slot = ForwardedRefSelectSlot;
