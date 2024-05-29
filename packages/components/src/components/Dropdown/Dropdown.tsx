/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCombobox } from 'downshift';
import { useState, type ReactNode } from 'react';

export type DropdownProps = { children?: ReactNode };

export const Dropdown = ({ children }: DropdownProps) => {
    const items = [
        'Neptunium',
        'Plutonium',
        'Americium',
        'Curium',
        'Berkelium',
        'Californium',
        'Einsteinium',
        'Fermium',
        'Mendelevium',
        'Nobelium',
        'Lawrencium',
        'Rutherfordium',
        'Dubnium',
        'Seaborgium',
        'Bohrium',
        'Hassium',
        'Meitnerium',
        'Darmstadtium',
        'Roentgenium',
        'Copernicium',
        'Nihonium',
        'Flerovium',
        'Moscovium',
        'Livermorium',
        'Tennessine',
        'Oganesson',
    ];
    const [inputItems, setInputItems] = useState(items);
    const { isOpen, getToggleButtonProps, getLabelProps, getMenuProps, getInputProps, highlightedIndex, getItemProps } =
        useCombobox({
            items: inputItems,
            onInputValueChange: ({ inputValue }) => {
                setInputItems(items.filter((item) => item.toLowerCase().startsWith(inputValue.toLowerCase())));
            },
        });
    return (
        <div>
            <label htmlFor="abc" {...getLabelProps()}>
                Choose an element:
            </label>
            <div>
                <input id="abc" {...getInputProps()} />
                <button type="button" {...getToggleButtonProps()} aria-label="toggle menu">
                    &#8595;
                </button>
            </div>
            <ul {...getMenuProps()}>
                {isOpen &&
                    inputItems.map((item, index) => (
                        <li
                            style={highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}}
                            key={`${item}${index}`}
                            {...getItemProps({ item, index })}
                        >
                            {item}
                        </li>
                    ))}
            </ul>
        </div>
    );
};
Dropdown.displayName = 'Dropdown';
