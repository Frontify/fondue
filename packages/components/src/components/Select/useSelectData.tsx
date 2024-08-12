/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCross } from '@frontify/fondue-icons';
import { Children, cloneElement, isValidElement, useCallback, useMemo, useState, type ReactNode } from 'react';

import { ForwardedRefSelectItem, type SelectItemProps } from './SelectItem';
import { ForwardedRefSelectSlot, type SelectSlotProps } from './SelectSlot';
import { getSelectOptionValue } from './utils';

export type SelectItemType = {
    value: string;
    label: string;
};

/**
 * Recursively extracts option values from children.
 * This function traverses through the React component tree and collects all SelectItem values.
 *
 * @param {ReactNode} children - The React children to extract values from.
 * @returns {SelectItemType[]} An array of SelectItemType objects.
 *
 * @example
 * const options = (
 *   <SelectItem value="1">Option 1</SelectItem>
 *   <SelectItem value="2">Option 2</SelectItem>
 * );
 * const values = getRecursiveOptionValues(options);
 * // Returns: [{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }]
 */
export const getRecursiveOptionValues = (children: ReactNode): SelectItemType[] => {
    const values: { value: string; label: string }[] = [];
    Children.forEach(children, (child) => {
        if (isValidElement<SelectItemProps>(child) && child.type === ForwardedRefSelectItem) {
            values.push(getSelectOptionValue(child.props));
        } else if (isValidElement<{ children: ReactNode }>(child) && child.props.children) {
            const optionValues = getRecursiveOptionValues(child.props.children);
            for (const optionValue of optionValues) {
                values.push(optionValue);
            }
        }
    });
    return values;
};

/**
 * Custom hook for managing select data and filtering.
 *
 * @param {ReactNode} children - The React children to process, typically SelectItem components.
 * @returns {Object} An object containing the following properties:
 */
export const useSelectData = (children: ReactNode) => {
    const [filterText, setFilterText] = useState('');

    const { itemValues, inputSlots, menuSlots, clearButton } = useMemo(() => {
        const inputSlots: ReactNode[] = [];
        const menuSlots: ReactNode[] = [];

        let clearButton: ReactNode;

        const hasSlots = Children.toArray(children).some(
            (child) => isValidElement<SelectSlotProps>(child) && child.type === ForwardedRefSelectSlot,
        );

        if (hasSlots) {
            Children.forEach(children, (child) => {
                if (isValidElement<SelectSlotProps>(child) && child.type === ForwardedRefSelectSlot) {
                    if (child.props.name === 'menu') {
                        menuSlots.push(child.props.children);
                    } else if (child.props.name === 'left' || child.props.name === 'right') {
                        inputSlots.push(child);
                    } else if (child.props.name === 'clear') {
                        if (child.props.children) {
                            clearButton = child;
                        } else {
                            clearButton = cloneElement(child, { children: <IconCross size={16} /> });
                        }
                    }
                }
            });
        } else {
            menuSlots.push(children);
        }

        const itemValues = getRecursiveOptionValues(menuSlots);

        return {
            itemValues,
            inputSlots,
            menuSlots,
            clearButton,
        };
    }, [children]);

    const getItemByValue = useCallback(
        (value?: string) => (value ? itemValues.find((item) => item.value === value) : undefined),
        [itemValues],
    );

    const items = useMemo(() => {
        const filteredItems = itemValues.filter(
            (item) => filterText === '' || item.label.toLowerCase().includes(filterText.toLowerCase()),
        );

        return filteredItems;
    }, [itemValues, filterText]);

    return {
        inputSlots,
        menuSlots,
        clearButton,
        filterText,
        items,
        setFilterText,
        getItemByValue,
    };
};
