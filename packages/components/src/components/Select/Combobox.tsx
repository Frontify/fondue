/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixPopover from '@radix-ui/react-popover';
import { Slot as RadixSlot } from '@radix-ui/react-slot';
import { useCombobox } from 'downshift';
import { useRef, type ForwardedRef, type ReactNode } from 'react';

import { type SelectEmphasis } from './Select';
import { SelectCaret } from './SelectCaret';
import { SelectMenu } from './SelectMenu';
import styles from './styles/select.module.scss';
import { useSelectData, type SelectItemType } from './useSelectData';

export type ComboboxProps = {
    children?: ReactNode;
    onSelect?: (selectedItem: SelectItemType) => void;
    defaultValue?: string;
    placeholder?: string;
    disabled?: boolean;
    clearable?: boolean;
    emphasis?: SelectEmphasis;
    ariaLabel: string;
};

export const Combobox = (
    { children, onSelect, defaultValue, ariaLabel, placeholder = '', disabled, emphasis }: ComboboxProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
) => {
    const { inputSlots, menuSlots, items, defaultItem, label, clearButton, setFilterText } = useSelectData(
        children,
        defaultValue,
    );

    const {
        getInputProps,
        getToggleButtonProps,
        getMenuProps,
        getItemProps,
        getLabelProps,
        reset,
        isOpen,
        highlightedIndex,
        inputValue,
    } = useCombobox({
        items,
        onSelectedItemChange: ({ selectedItem }) => {
            onSelect && onSelect(selectedItem);
        },
        onInputValueChange: ({ inputValue }) => {
            setFilterText(inputValue);
        },
        defaultSelectedItem: defaultItem,
        defaultHighlightedIndex: 0,
        itemToString: (item) => (item ? item.label : ''),
    });

    const wasClicked = useRef(false);

    return (
        <RadixPopover.Root open={true}>
            <RadixPopover.Anchor asChild>
                <div
                    ref={forwardedRef}
                    data-emphasis={emphasis}
                    className={styles.root}
                    data-error={
                        inputValue && !items.find((item) => item.label.toLowerCase().includes(inputValue.toLowerCase()))
                    }
                >
                    <RadixSlot data-test="bla" {...getLabelProps()}>
                        {label}
                    </RadixSlot>
                    <input
                        onMouseDown={(mouseEvent) => {
                            wasClicked.current = true;
                            mouseEvent.currentTarget.dataset.showFocusRing = 'false';
                        }}
                        placeholder={placeholder}
                        {...getInputProps({
                            'aria-label': ariaLabel,
                        })}
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
                        disabled={disabled}
                    />
                    {inputSlots}
                    {clearButton && (
                        <RadixSlot
                            onClick={(event) => {
                                event.stopPropagation();
                                reset();
                            }}
                            className={styles.clear}
                            role="button"
                        >
                            {clearButton}
                        </RadixSlot>
                    )}
                    <button
                        type="button"
                        onMouseDown={() => {
                            wasClicked.current = true;
                        }}
                        {...getToggleButtonProps()}
                        aria-label="toggle menu"
                        disabled={disabled}
                    >
                        <SelectCaret isOpen={isOpen} />
                    </button>
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
Combobox.displayName = 'Select.Combobox';
