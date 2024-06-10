/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixPopover from '@radix-ui/react-popover';
import { Slot as RadixSlot } from '@radix-ui/react-slot';
import { useSelect } from 'downshift';
import { forwardRef, type ForwardedRef, type ReactNode } from 'react';

import { SelectCaret } from './SelectCaret';
import { SelectMenu } from './SelectMenu';
import styles from './styles/select.module.scss';
import { useSelectData, type SelectItemType } from './useSelectData';

export type SelectComponentProps = {
    /**
     *    Children of the Select component. This can contain the Select.Slot components for the label, decorators, clear action and menu.
     */
    children?: ReactNode;
    /**
     *    Callback function that is called when an item is selected.
     */
    onSelect?: (selectedItem: SelectItemType) => void;
    /**
     *    The active item in the select component. This is used to control the select externally.
     */
    activeItem?: SelectItemType;
    /**
     *    The default value of the select component. Used for uncontrolled usages.
     */
    defaultValue?: string;
    /**
     *    The placeholder in the select component.
     */
    placeholder?: string;
    /**
     *    Disables the select component.
     */
    disabled?: boolean;
    /**
     *    The aria label of the select component. For accessibility purposes when no Label Slot is provided.
     */
    'aria-label': string;
    /**
     *
     *    The data test id of the select component.
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
                        <SelectCaret isOpen={isOpen} />
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
