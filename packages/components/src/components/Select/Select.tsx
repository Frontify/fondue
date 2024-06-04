/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark } from '@frontify/fondue-icons';
import * as RadixPopover from '@radix-ui/react-popover';
import { useState, type ReactNode } from 'react';

import { cn } from '#/utilities/styleUtilities';

import { inputStyles, itemStyles, menuStyles, rootStyles } from './styles/selectStyles';
import { useSelectData } from './useSelectData';

export type SelectProps = {
    children?: ReactNode;
    items: {
        label: string;
        value: string;
    }[];
    isSearchable?: boolean;
};

export const Select = ({ children, items, isSearchable }: SelectProps) => {
    const [inputItems, setInputItems] = useState(items);
    const {
        inputProps,
        toggleButtonProps,
        labelProps,
        menuProps,
        getItemProps,
        selectedItem,
        isOpen,
        highlightedIndex,
    } = useSelectData(
        {
            items: inputItems,
            onSelectedItemChange: ({ selectedItem }) => {
                console.log('selectedItem', selectedItem);
                setInputItems(items);
            },
            onInputValueChange: ({ inputValue }) => {
                console.log('inputValue', inputValue);
                if (isSearchable) {
                    setInputItems(
                        items.filter((item) => item.label.toLowerCase().startsWith(inputValue.toLowerCase())),
                    );
                }
            },
            itemToString: (item) => (item ? item.label : ''),
        },
        isSearchable,
    );

    console.log(isOpen);

    return (
        <div>
            <RadixPopover.Root open={true}>
                <label htmlFor="abc" {...labelProps}>
                    Choose an element:
                </label>
                <RadixPopover.Trigger asChild>
                    {isSearchable ? (
                        <div className={rootStyles}>
                            <input id="abc" {...inputProps} className={inputStyles} />
                            <button type="button" {...toggleButtonProps} aria-label="toggle menu">
                                <IconCheckMark
                                    size={16}
                                    className="tw-flex tw-text-text-positive tw-h-full tw-items-center tw-mr-3"
                                    data-test-id={'test-success-icon'}
                                />
                            </button>
                        </div>
                    ) : (
                        <button className={rootStyles} {...toggleButtonProps} tabIndex={0}>
                            <span className={inputStyles}>{selectedItem ? selectedItem.label : 'Please select'}</span>
                            <IconCheckMark
                                size={16}
                                className="tw-flex tw-text-text-positive tw-h-full tw-items-center tw-mr-3"
                                data-test-id={'test-success-icon'}
                            />
                        </button>
                    )}
                </RadixPopover.Trigger>

                <RadixPopover.Portal>
                    <RadixPopover.Content>
                        {
                            <ul data-open-state={isOpen} className={menuStyles} {...menuProps}>
                                {inputItems.map((item, index) => (
                                    <li
                                        className={cn(
                                            itemStyles,
                                            highlightedIndex === index && 'tw-bg-box-neutral-hover',
                                        )}
                                        key={`${item.label}${index}`}
                                        {...getItemProps({ item, index })}
                                    >
                                        {item.label}
                                    </li>
                                ))}
                            </ul>
                        }
                    </RadixPopover.Content>
                </RadixPopover.Portal>
            </RadixPopover.Root>
        </div>
    );
};
Select.displayName = 'Select';
