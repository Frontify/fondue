/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixPopover from '@radix-ui/react-popover';
import { useCombobox } from 'downshift';
import { useRef, type ForwardedRef, type ReactNode } from 'react';

import { type SelectEmphasis } from './Select';
import { SelectCaret } from './SelectCaret';
import { SelectClear } from './SelectClear';
import { SelectMenu } from './SelectMenu';
import styles from './styles/select.module.scss';
import { useSelectData, type SelectItemType } from './useSelectData';

export type ComboboxProps = {
    children?: ReactNode;
    onSelect?: (selectedItem: SelectItemType) => void;
    defaultItem?: SelectItemType;
    placeholder?: string;
    disabled?: boolean;
    clearable?: boolean;
    emphasis?: SelectEmphasis;
    ariaLabel: string;
};

export const Combobox = (
    { children, onSelect, defaultItem, ariaLabel, placeholder = '', disabled, clearable, emphasis }: ComboboxProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
) => {
    const { items, setFilterText } = useSelectData();
    const {
        getInputProps,
        getToggleButtonProps,
        getMenuProps,
        getItemProps,
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
                    {clearable && <SelectClear reset={reset} />}
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
                {children}
            </SelectMenu>
        </RadixPopover.Root>
    );
};
Combobox.displayName = 'Select.Combobox';
