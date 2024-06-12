/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretUp } from '@frontify/fondue-icons';
import * as RadixPopover from '@radix-ui/react-popover';
import { Slot as RadixSlot } from '@radix-ui/react-slot';
import { useSelect } from 'downshift';
import { forwardRef, type ForwardedRef, type ReactNode } from 'react';

import { ForwardedRefCombobox } from './Combobox';
import { ForwardedRefSelectItem, ForwardedRefSelectItemGroup } from './SelectItem';
import { SelectMenu } from './SelectMenu';
import { ForwardedRefSelectSlot } from './SelectSlot';
import styles from './styles/select.module.scss';
import { useSelectData, type SelectItemType } from './useSelectData';

export type SelectComponentProps = {
    /**
     * Children of the Select component. This can contain the `Select.Slot` components for the label, decorators, clear action and menu.
     */
    children?: ReactNode;
    /**
     * Callback function that is called when an item is selected.
     */
    onSelect?: (selectedItem: SelectItemType) => void;
    /**
     * The active item in the select component. This is used to control the select externally.
     */
    activeItem?: SelectItemType;
    /**
     * The default value of the select component. Used for uncontrolled usages.
     */
    defaultValue?: string;
    /**
     * The placeholder in the select component.
     */
    placeholder?: string;
    /**
     * Disables the select component.
     */
    disabled?: boolean;
    /**
     * The aria label of the select component.
     */
    'aria-label': string;
    /**
     * The data test id of the select component.
     */
    'data-test-id'?: string;
};

export const SelectInput = (
    {
        children,
        onSelect,
        activeItem,
        defaultValue,
        placeholder = '',
        disabled,
        'aria-label': ariaLabel,
        'data-test-id': dataTestId = 'fondue-select',
    }: SelectComponentProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
) => {
    const { inputSlots, menuSlots, items, defaultItem, clearButton } = useSelectData(children, defaultValue);

    const { getToggleButtonProps, getMenuProps, getItemProps, reset, selectedItem, isOpen, highlightedIndex } =
        useSelect({
            items,
            defaultSelectedItem: defaultItem,
            selectedItem: activeItem,
            onSelectedItemChange: ({ selectedItem }) => {
                onSelect && onSelect(selectedItem);
            },
            itemToString: (item) => (item ? item.label : ''),
        });

    return (
        <RadixPopover.Root open={isOpen}>
            <RadixPopover.Anchor asChild>
                <div
                    className={styles.root}
                    data-disabled={disabled}
                    data-empty={!selectedItem}
                    data-test-id={dataTestId}
                    {...(disabled
                        ? {}
                        : getToggleButtonProps({
                              'aria-label': ariaLabel,
                              ...(forwardedRef ? { ref: forwardedRef } : {}),
                          }))}
                >
                    <span className={styles.input}>{selectedItem ? selectedItem.label : placeholder}</span>
                    {inputSlots}
                    {clearButton && (
                        <RadixSlot
                            onClick={(event) => {
                                event.stopPropagation();
                                reset();
                            }}
                            className={styles.clear}
                        >
                            {clearButton}
                        </RadixSlot>
                    )}
                    <div>
                        <IconCaretUp size={16} className={styles.caret} />
                    </div>
                </div>
            </RadixPopover.Anchor>

            <SelectMenu highlightedIndex={highlightedIndex} getMenuProps={getMenuProps} getItemProps={getItemProps}>
                {menuSlots}
            </SelectMenu>
        </RadixPopover.Root>
    );
};
SelectInput.displayName = 'Select';

export const ForwardedRefSelect = forwardRef<HTMLDivElement, SelectComponentProps>(SelectInput);

// @ts-expect-error We support both Select and Select.Combobox as the Root
export const Select: typeof SelectInput & {
    Combobox: typeof ForwardedRefCombobox;
    Item: typeof ForwardedRefSelectItem;
    Group: typeof ForwardedRefSelectItemGroup;
    Slot: typeof ForwardedRefSelectSlot;
} = ForwardedRefSelect;
Select.displayName = 'Select';
Select.Combobox = ForwardedRefCombobox;
Select.Combobox.displayName = 'Select.Combobox';
Select.Item = ForwardedRefSelectItem;
Select.Item.displayName = 'Select.Item';
Select.Group = ForwardedRefSelectItemGroup;
Select.Group.displayName = 'Select.Group';
Select.Slot = ForwardedRefSelectSlot;
Select.Slot.displayName = 'Select.Slot';
