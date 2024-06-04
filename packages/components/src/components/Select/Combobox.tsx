/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark } from '@frontify/fondue-icons';
import * as RadixPopover from '@radix-ui/react-popover';
import { useCombobox } from 'downshift';
import { useRef, type ReactNode } from 'react';

import { SelectMenu } from './SelectMenu';
import { inputStyles, rootStyles } from './styles/selectStyles';
import { useSelectData } from './useSelectData';

export type SelectProps = {
    children?: ReactNode;
};

export const Combobox = ({ children }: SelectProps) => {
    const { items, setFilterText } = useSelectData();
    console.log('items', items);

    const { getInputProps, getToggleButtonProps, getLabelProps, getMenuProps, getItemProps, isOpen, highlightedIndex } =
        useCombobox({
            items,
            onSelectedItemChange: ({ selectedItem }) => {
                console.log('selectedItem', selectedItem);
            },
            onInputValueChange: ({ inputValue }) => {
                setFilterText(inputValue);
            },
            itemToString: (item) => (item ? item.label : ''),
        });
    const wasClicked = useRef(false);

    return (
        <div>
            <RadixPopover.Root open={true}>
                <label htmlFor="abc" {...getLabelProps()}>
                    Choose an element:
                </label>
                <RadixPopover.Trigger asChild>
                    <div className={rootStyles}>
                        <input
                            onMouseDown={(mouseEvent) => {
                                wasClicked.current = true;
                                mouseEvent.currentTarget.dataset.showFocusRing = 'false';
                            }}
                            id="abc"
                            {...getInputProps()}
                            onFocus={(focusEvent) => {
                                if (!wasClicked.current) {
                                    focusEvent.target.dataset.showFocusRing = 'true';
                                }
                            }}
                            onBlur={(blurEvent) => {
                                blurEvent.target.dataset.showFocusRing = 'false';
                                wasClicked.current = false;
                                if (inputProps) {
                                    inputProps.onBlur?.(blurEvent);
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
        </div>
    );
};
Combobox.displayName = 'Combobox';
