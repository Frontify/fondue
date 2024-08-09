/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown, IconPlus } from '@frontify/fondue-icons';
import * as RadixPopover from '@radix-ui/react-popover';
import { Slot as RadixSlot } from '@radix-ui/react-slot';
import { useCombobox } from 'downshift';
import { forwardRef, useMemo, useRef, type ForwardedRef, type ReactNode } from 'react';

import { ForwardedRefSelectItem } from './SelectItem';
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
        getItemByValue,
        setFilterText,
        shouldAddCustomValue,
    } = useSelectData(children, true);

    const defaultItem = getItemByValue(defaultValue);
    const activeItem = getItemByValue(value);

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
            onSelect && onSelect(selectedItem.value);
        },
        selectedItem: activeItem,
        onInputValueChange: ({ inputValue }) => {
            setFilterText(inputValue);
        },
        defaultSelectedItem: defaultItem,
        defaultHighlightedIndex: 0,
        itemToString: (item) => (item ? item.label : ''),
    });

    const wasClicked = useRef(false);
    const valueInvalid = useMemo(
        () => inputValue && !items.find((item) => item.label.toLowerCase().includes(inputValue.toLowerCase())),
        [inputValue, items],
    );

    return (
        <RadixPopover.Root open={isOpen}>
            <RadixPopover.Anchor asChild>
                <div ref={forwardedRef} className={styles.root} data-error={valueInvalid}>
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
                        data-test-id={dataTestId}
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
                {shouldAddCustomValue && (
                    <ForwardedRefSelectItem value={filterText} label={filterText}>
                        <p style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <IconPlus size={16} className={styles.icon} />
                            {filterText}
                        </p>
                    </ForwardedRefSelectItem>
                )}
            </SelectMenu>
        </RadixPopover.Root>
    );
};
SelectCombobox.displayName = 'Select.Combobox';

export const ForwardedRefCombobox = forwardRef<HTMLDivElement, ComboboxProps>(SelectCombobox);
