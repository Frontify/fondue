/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark } from '@frontify/fondue-icons';
import * as RadixPopover from '@radix-ui/react-popover';
import { useCombobox } from 'downshift';
import { useRef, useState, type ReactNode } from 'react';

import { cn } from '#/utilities/styleUtilities';

import { inputStyles, itemStyles, menuStyles, rootStyles } from './styles/selectStyles';

export type SelectProps = {
    children?: ReactNode;
    items: {
        label: string;
        value: string;
    }[];
    isSearchable?: boolean;
};

export const Combobox = ({ children, items }: SelectProps) => {
    const [inputItems, setInputItems] = useState(items);
    const {
        getInputProps,
        getToggleButtonProps,
        getLabelProps,
        getMenuProps,
        getItemProps,
        selectedItem,
        isOpen,
        highlightedIndex,
    } = useCombobox({
        items: inputItems,
        onSelectedItemChange: ({ selectedItem }) => {
            console.log('selectedItem', selectedItem);
            setInputItems(items);
        },
        onInputValueChange: ({ inputValue }) => {
            setInputItems(items.filter((item) => item.label.toLowerCase().startsWith(inputValue.toLowerCase())));
        },
        itemToString: (item) => (item ? item.label : ''),
    });
    const wasClicked = useRef(false);

    console.log(isOpen);

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

                <RadixPopover.Portal>
                    <RadixPopover.Content>
                        <ul data-open-state={isOpen} className={menuStyles} {...getMenuProps()}>
                            {inputItems.map((item, index) => (
                                <li
                                    className={cn(itemStyles, highlightedIndex === index && 'tw-bg-box-neutral-hover')}
                                    key={`${item.label}${index}`}
                                    {...getItemProps({ item, index })}
                                >
                                    {item.label}
                                </li>
                            ))}
                        </ul>
                    </RadixPopover.Content>
                </RadixPopover.Portal>
            </RadixPopover.Root>
        </div>
    );
};
Combobox.displayName = 'Combobox';
