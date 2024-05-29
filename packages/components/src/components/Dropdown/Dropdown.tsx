/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCombobox } from 'downshift';
import { useState, type ReactNode } from 'react';
import { inputStyles } from './styles/dropdownStyles';

export type DropdownProps = {
    children?: ReactNode;
    items: {
        label: string;
        value: string;
    }[];
    isSearchable?: boolean;
};

export const Dropdown = ({ children, items, isSearchable }: DropdownProps) => {
    const [inputItems, setInputItems] = useState(items);
    const {
        isOpen,
        getToggleButtonProps,
        getLabelProps,
        getMenuProps,
        getInputProps,
        highlightedIndex,
        getItemProps,
        selectedItem,
    } = useCombobox({
        items: inputItems,
        onSelectedItemChange: ({ selectedItem }) => {
            console.log('selectedItem', selectedItem);
            setInputItems(items);
        },
        onInputValueChange: ({ inputValue }) => {
            console.log('inputValue', inputValue);
            if (isSearchable) {
                setInputItems(items.filter((item) => item.label.toLowerCase().startsWith(inputValue.toLowerCase())));
            }
        },
        itemToString: (item) => (item ? item.label : ''),
    });

    return (
        <div>
            <label htmlFor="abc" {...getLabelProps()}>
                Choose an element:
            </label>
            {isSearchable ? (
                <div className={inputStyles}>
                    <input className="tw-w-full tw-bg-box-neutral" id="abc" {...getInputProps()} />
                    <button type="button" {...getToggleButtonProps()} aria-label="toggle menu">
                        &#8595;
                    </button>
                </div>
            ) : (
                <button className={inputStyles} {...getToggleButtonProps()} tabIndex={0}>
                    <input className="tw-hidden" id="abc" {...getInputProps()} />
                    <span>{selectedItem ? selectedItem.label : 'Please select'}</span>
                    <span className="px-2">{isOpen ? <>&#8593;</> : <>&#8595;</>}</span>
                </button>
            )}

            <ul className="tw-border tw-p-2 tw-rounded tw-mt-2" {...getMenuProps()}>
                {isOpen &&
                    inputItems.map((item, index) => (
                        <li
                            className={`tw-m-2 tw-border tw-rounded tw-p-2 tw-cursor-pointer ${highlightedIndex === index ? 'tw-bg-red-70' : ''}`}
                            key={`${item.label}${index}`}
                            {...getItemProps({ item, index })}
                        >
                            {item.label}
                        </li>
                    ))}
            </ul>
        </div>
    );
};
Dropdown.displayName = 'Dropdown';
