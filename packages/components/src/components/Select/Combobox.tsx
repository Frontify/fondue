/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown, IconCaretUp } from '@frontify/fondue-icons';
import * as RadixPopover from '@radix-ui/react-popover';
import { useCombobox } from 'downshift';
import { useRef, type ForwardedRef, type ReactNode } from 'react';

import { SelectMenu } from './SelectMenu';
import { inputStyles, rootStyles } from './styles/selectStyles';
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
    const { getInputProps, getToggleButtonProps, getMenuProps, getItemProps, isOpen, highlightedIndex } = useCombobox({
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
                <div ref={forwardedRef} className={rootStyles}>
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
                        className={inputStyles}
                    />
                    <button
                        type="button"
                        onMouseDown={() => {
                            wasClicked.current = true;
                        }}
                        {...getToggleButtonProps()}
                        aria-label="toggle menu"
                    >
                        {isOpen ? (
                            <IconCaretUp
                                size={16}
                                className="tw-flex tw-text-text-neutral tw-h-full tw-items-center tw-mr-3"
                            />
                        ) : (
                            <IconCaretDown
                                size={16}
                                className="tw-flex tw-text-text-neutral tw-h-full tw-items-center tw-mr-3"
                            />
                        )}
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
