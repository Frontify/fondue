/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark } from '@frontify/fondue-icons';
import * as RadixPopover from '@radix-ui/react-popover';
import { useCombobox } from 'downshift';
import { useRef, type ForwardedRef, type ReactNode } from 'react';

import { SelectMenu } from './SelectMenu';
import { inputStyles, rootStyles } from './styles/selectStyles';
import { useSelectData } from './useSelectData';

export type ComboboxProps = {
    children?: ReactNode;
};

export const Combobox = ({ children }: ComboboxProps, forwardedRef: ForwardedRef<HTMLDivElement>) => {
    const { items, setFilterText } = useSelectData();
    const { getInputProps, getToggleButtonProps, getLabelProps, getMenuProps, getItemProps, isOpen, highlightedIndex } =
        useCombobox({
            items,
            onSelectedItemChange: ({ selectedItem }) => {},
            onInputValueChange: ({ inputValue }) => {
                setFilterText(inputValue);
            },
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
                    <button type="button" {...getToggleButtonProps()} aria-label="toggle menu">
                        <IconCheckMark
                            size={16}
                            className="tw-flex tw-text-text-positive tw-h-full tw-items-center tw-mr-3"
                            data-test-id={'test-success-icon'}
                        />
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
