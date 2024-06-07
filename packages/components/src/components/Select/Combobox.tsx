/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixPopover from '@radix-ui/react-popover';
import { useCombobox } from 'downshift';
import { useRef, type ForwardedRef, type ReactNode } from 'react';

import { SelectCaret } from './SelectCaret';
import { SelectMenu } from './SelectMenu';
import styles from './styles/select.module.scss';
import { useSelectData, type SelectItemType } from './useSelectData';

export type ComboboxProps = {
    children?: ReactNode;
    onSelect?: (selectedItem: SelectItemType) => void;
    defaultItem?: SelectItemType;
};

export const Combobox = (
    { children, onSelect, defaultItem }: ComboboxProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
) => {
    const { items, setFilterText } = useSelectData();
    const { getInputProps, getToggleButtonProps, getMenuProps, getItemProps, isOpen, highlightedIndex, inputValue } =
        useCombobox({
            items,
            onSelectedItemChange: ({ selectedItem }) => {
                onSelect && onSelect(selectedItem);
            },
            onInputValueChange: ({ inputValue }) => {
                setFilterText(inputValue);
            },
            defaultSelectedItem: defaultItem,
            itemToString: (item) => (item ? item.label : ''),
        });

    const wasClicked = useRef(false);

    return (
        <RadixPopover.Root open={true}>
            <RadixPopover.Trigger asChild>
                <div
                    ref={forwardedRef}
                    className={styles.root}
                    data-error={
                        inputValue && !items.some((item) => item.label.toLowerCase().includes(inputValue.toLowerCase()))
                    }
                >
                    <input
                        onMouseDown={(mouseEvent) => {
                            wasClicked.current = true;
                            mouseEvent.currentTarget.dataset.showFocusRing = 'false';
                        }}
                        {...getInputProps()}
                        onFocus={(focusEvent) => {
                            if (!wasClicked.current) {
                                focusEvent.target.dataset.showFocusRing = 'true';
                            }
                        }}
                        onBlur={(blurEvent) => {
                            blurEvent.target.dataset.showFocusRing = 'false';
                            wasClicked.current = false;
                            if (getInputProps().onBlur) {
                                getInputProps().onBlur?.(blurEvent);
                            }
                        }}
                        className={styles.input}
                    />
                    <button
                        type="button"
                        onMouseDown={() => {
                            wasClicked.current = true;
                        }}
                        {...getToggleButtonProps()}
                        aria-label="toggle menu"
                    >
                        <SelectCaret isOpen={isOpen} />
                    </button>
                </div>
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
Combobox.displayName = 'Select.Combobox';
