/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState, type ReactNode } from 'react';

import { inputStyles } from './styles/selectStyles';
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

    return (
        <div>
            <label htmlFor="abc" {...labelProps}>
                Choose an element:
            </label>
            {isSearchable ? (
                <div className={inputStyles}>
                    <input className="tw-w-full tw-bg-box-neutral" id="abc" {...inputProps} />
                    <button type="button" {...toggleButtonProps} aria-label="toggle menu">
                        &#8595;
                    </button>
                </div>
            ) : (
                <button className={inputStyles} {...toggleButtonProps} tabIndex={0}>
                    <span>{selectedItem ? selectedItem.label : 'Please select'}</span>
                    <span className="px-2">{isOpen ? <>&#8593;</> : <>&#8595;</>}</span>
                </button>
            )}

            <ul className="tw-border tw-p-2 tw-rounded tw-mt-2" {...menuProps}>
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
Select.displayName = 'Select';
