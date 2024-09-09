/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown, IconCheckMark, IconExclamationMarkTriangle } from '@frontify/fondue-icons';
import * as RadixPopover from '@radix-ui/react-popover';
import { Slot as RadixSlot } from '@radix-ui/react-slot';
import { useCombobox } from 'downshift';
import { forwardRef, useMemo, useRef, type FocusEvent, type ForwardedRef, type ReactNode } from 'react';

import { SelectMenu } from './SelectMenu';
import styles from './styles/select.module.scss';
import { useSelectData } from './useSelectData';

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
     * Status of the text input
     * @default "neutral"
     */
    status?: 'neutral' | 'success' | 'error';
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
        status = 'neutral',
        disabled,
        'aria-label': ariaLabel,
        'data-test-id': dataTestId = 'fondue-select-combobox',
    }: ComboboxProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
) => {
    const { inputSlots, menuSlots, items, filterText, clearButton, getItemByValue, setFilterText } =
        useSelectData(children);

    const {
        getInputProps,
        getToggleButtonProps,
        getMenuProps,
        getItemProps,
        reset,
        selectedItem,
        isOpen,
        highlightedIndex,
        inputValue,
    } = useCombobox({
        items,
        selectedItem: getItemByValue(value),
        defaultSelectedItem: getItemByValue(defaultValue),
        defaultHighlightedIndex: 0,
        onSelectedItemChange: ({ selectedItem }) => {
            onSelect && onSelect(selectedItem.value);
        },
        onInputValueChange: ({ inputValue }) => {
            setFilterText(inputValue);
        },
        itemToString: (item) => (item ? item.label : ''),
    });

    const wasClicked = useRef(false);

    const valueInvalid = useMemo(
        () => !items.find((item) => item.label.toLowerCase().includes(inputValue.toLowerCase())),
        [inputValue, items],
    );

    const onBlurHandler = (blurEvent: FocusEvent<HTMLInputElement, Element>) => {
        blurEvent.target.dataset.showFocusRing = 'false';
        wasClicked.current = false;

        const selectedItemNullOrOutdated = selectedItem?.label.toLocaleLowerCase() !== inputValue.toLocaleLowerCase();

        if (selectedItemNullOrOutdated) {
            // if there is no selection or
            // the existing selected value is not the same as the input value (old),
            // reset the input
            reset();
        }

        if (getInputProps().onBlur) {
            getInputProps().onBlur?.(blurEvent);
        }
    };

    return (
        <RadixPopover.Root open={isOpen}>
            <RadixPopover.Anchor asChild>
                <div ref={forwardedRef} className={styles.root} data-status={valueInvalid ? 'error' : status}>
                    <input
                        {...getInputProps({
                            'aria-label': ariaLabel,
                        })}
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
                    <div className={styles.icons}>
                        <button
                            {...getToggleButtonProps()}
                            type="button"
                            aria-label="toggle menu"
                            disabled={disabled}
                            onMouseDown={() => {
                                wasClicked.current = true;
                            }}
                        >
                            <IconCaretDown size={16} className={styles.caret} />
                        </button>
                        {status === 'success' ? (
                            <IconCheckMark
                                size={16}
                                className={styles.iconSuccess}
                                data-test-id={`${dataTestId}-success-icon`}
                            />
                        ) : null}
                        {valueInvalid || status === 'error' ? (
                            <IconExclamationMarkTriangle
                                size={16}
                                className={styles.iconError}
                                data-test-id={`${dataTestId}-error-icon`}
                            />
                        ) : null}
                    </div>
                </div>
            </RadixPopover.Anchor>

            <SelectMenu
                highlightedIndex={highlightedIndex}
                filterText={filterText}
                getMenuProps={getMenuProps}
                getItemProps={getItemProps}
                selectedItem={selectedItem}
            >
                {menuSlots}
            </SelectMenu>
        </RadixPopover.Root>
    );
};
SelectCombobox.displayName = 'Select.Combobox';

export const ForwardedRefCombobox = forwardRef<HTMLDivElement, ComboboxProps>(SelectCombobox);
