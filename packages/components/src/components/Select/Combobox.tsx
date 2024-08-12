/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown } from '@frontify/fondue-icons';
import * as RadixPopover from '@radix-ui/react-popover';
import { Slot as RadixSlot } from '@radix-ui/react-slot';
import { useCombobox } from 'downshift';
import { type FocusEvent, forwardRef, useRef, type ForwardedRef, type ReactNode, useMemo } from 'react';

import { SelectMenu } from './SelectMenu';
import styles from './styles/select.module.scss';
import { useComboboxData } from './useComboboxData';

export type ComboboxProps = {
    /**
     * Children of the Combobox component. This can contain the `Select.Slot` components for the label, decorators, clear action and menu.
     */
    children?: ReactNode;
    /**
     * Callback function that is called when an item is selected.
     */
    onSelect?: (selectedValue: string) => void;
    /**
     * The active value in the combobox component. This is used to control the combobox externally.
     */
    value?: string;
    /**
     * The default value of the combobox component. Used for uncontrolled usages.
     */
    defaultValue?: string;
    /**
     * The placeholder in the combobox component.
     */
    placeholder?: string;
    /**
     * Allow custom value in the combobox component.
     * @default false
     */
    allowCustomValue?: boolean;
    /**
     * Disables the combobox component.
     */
    disabled?: boolean;
    /**
     * The aria label of the combobox component.
     */
    'aria-label'?: string;
    /**
     * The data test id of the select component.
     */
    'data-test-id'?: string;
};

export const SelectCombobox = (
    {
        children,
        onSelect,
        value,
        defaultValue,
        placeholder = '',
        allowCustomValue = false,
        disabled,
        'aria-label': ariaLabel,
        'data-test-id': dataTestId = 'fondue-select-combobox',
    }: ComboboxProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
) => {
    const {
        inputSlots,
        menuSlots,
        items,
        filterText,
        clearButton,
        valueExists,
        existingValueItem,
        getItemByValue,
        setFilterText,
    } = useComboboxData(children, allowCustomValue);

    const {
        isOpen,
        highlightedIndex,
        inputValue,
        selectedItem,
        selectItem,
        getInputProps,
        getToggleButtonProps,
        getMenuProps,
        getItemProps,
        reset,
    } = useCombobox({
        items,
        defaultHighlightedIndex: 0,
        selectedItem: getItemByValue(value),
        defaultSelectedItem: getItemByValue(defaultValue),
        onSelectedItemChange: ({ selectedItem }) => {
            onSelect && onSelect(selectedItem.value);
        },
        onInputValueChange: ({ inputValue }) => {
            setFilterText(inputValue);
        },
        itemToString: (item) => (item ? item.label : ''),
    });

    const valueInvalid = useMemo(
        () => !allowCustomValue && !items.find((item) => item.label.toLowerCase().includes(filterText.toLowerCase())),
        [allowCustomValue, filterText, items],
    );

    const wasClicked = useRef(false);

    const onBlurHandler = (blurEvent: FocusEvent<HTMLInputElement, Element>) => {
        blurEvent.target.dataset.showFocusRing = 'false';
        wasClicked.current = false;

        if (valueExists) {
            if (existingValueItem?.label) {
                // if the value exists, normalize the casing on the input
                selectItem(existingValueItem);
            }
        } else {
            const selectedItemNullOrOutdated =
                selectedItem?.label.toLocaleLowerCase() !== inputValue.toLocaleLowerCase();

            if (selectedItemNullOrOutdated) {
                // if there is no selection or
                // the existing selected value is not the same as the input value (old),
                // reset the input
                reset();
            }
        }

        if (getInputProps().onBlur) {
            getInputProps().onBlur?.(blurEvent);
        }
    };

    return (
        <RadixPopover.Root open={isOpen}>
            <RadixPopover.Anchor asChild>
                <div ref={forwardedRef} className={styles.root} data-error={valueInvalid}>
                    <input
                        data-test-id={dataTestId}
                        placeholder={placeholder}
                        className={styles.input}
                        disabled={disabled}
                        onMouseDown={(mouseEvent) => {
                            wasClicked.current = true;
                            mouseEvent.currentTarget.dataset.showFocusRing = 'false';
                        }}
                        onFocus={(focusEvent) => {
                            if (!wasClicked.current) {
                                focusEvent.target.dataset.showFocusRing = 'true';
                            }
                        }}
                        onBlur={onBlurHandler}
                        {...getInputProps({
                            'aria-label': ariaLabel,
                        })}
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
                        aria-label="toggle menu"
                        disabled={disabled}
                        onMouseDown={() => {
                            wasClicked.current = true;
                        }}
                        {...getToggleButtonProps()}
                    >
                        <IconCaretDown size={16} className={styles.caret} />
                    </button>
                </div>
            </RadixPopover.Anchor>

            <SelectMenu
                highlightedIndex={highlightedIndex}
                filterText={filterText}
                getMenuProps={getMenuProps}
                getItemProps={getItemProps}
            >
                {menuSlots}
            </SelectMenu>
        </RadixPopover.Root>
    );
};
SelectCombobox.displayName = 'Select.Combobox';

export const ForwardedRefCombobox = forwardRef<HTMLDivElement, ComboboxProps>(SelectCombobox);
