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
export const getRecursiveOptionValues = (children: ReactNode): { value: string; label: string }[] => {
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
 * This hook processes the children to extract select items, handles filtering,
 * and manages the state for custom values if allowed.
 *
 * @param {ReactNode} children - The React children to process, typically SelectItem components.
 * @param {boolean} [allowCustomValue=false] - Whether to allow custom values that are not in the predefined list.
 * @returns {Object} An object containing various select data and utility functions.
 * @property {ReactNode[]} inputSlots - Slots for input customization (left and right).
 * @property {ReactNode[]} menuSlots - Slots for menu customization.
 * @property {ReactNode} clearButton - The clear button component if provided.
 * @property {string} filterText - The current filter text.
 * @property {SelectItemType[]} items - The filtered list of items based on the current filter text.
 * @property {boolean} valueExists - Whether the current filter text matches an existing item.
 * @property {SelectItemType | undefined} existingValueItem - The matching item if valueExists is true.
 * @property {boolean} shouldAddCustomItem - Whether a custom item should be added based on the current state.
 * @property {boolean} valueInvalid - Whether the current value is invalid (when custom values are not allowed).
 * @property {function} setFilterText - Function to update the filter text.
 * @property {function} getItemByValue - Function to get an item by its value.
 */
export const useSelectData = (children: ReactNode, allowCustomValue = false) => {
    const [filterText, setFilterText] = useState('');

    const itemValues = useMemo(() => getRecursiveOptionValues(children), [children]);

    const { valueExists, existingValueItem } = useMemo(() => {
        const existingValueItem = itemValues.find(
            (item) => item.label.toLocaleLowerCase() === filterText.toLocaleLowerCase(),
        );
        return {
            valueExists: !!existingValueItem,
            existingValueItem,
        };
    }, [itemValues, filterText]);

    const shouldAddCustomItem = useMemo(
        () => allowCustomValue && filterText !== '' && !valueExists,
        [allowCustomValue, filterText, valueExists],
    );

    const { inputSlots, menuSlots, clearButton } = useMemo(() => {
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

        if (shouldAddCustomItem) {
            const customItem = (
                <ForwardedRefSelectItem key={filterText} value={filterText} data-test-id="custom-item">
                    {filterText}
                </ForwardedRefSelectItem>
            );

            menuSlots.push(customItem);
        }

        return {
            inputSlots,
            menuSlots,
            clearButton,
        };
    }, [children, filterText, shouldAddCustomItem]);

    const getItemByValue = useCallback(
        (value?: string) => (value ? itemValues.find((item) => item.value === value) : undefined),
        [itemValues],
    );

    const items = useMemo(() => {
        const filteredItems = itemValues.filter(
            (item) => filterText === '' || item.label.toLowerCase().includes(filterText.toLowerCase()),
        );

        if (shouldAddCustomItem) {
            filteredItems.push({ label: filterText, value: filterText });
        }

        return filteredItems;
    }, [itemValues, shouldAddCustomItem, filterText]);

    const valueInvalid = useMemo(
        () => !allowCustomValue && !items.find((item) => item.label.toLowerCase().includes(filterText.toLowerCase())),
        [allowCustomValue, filterText, items],
    );

    return {
        inputSlots,
        menuSlots,
        clearButton,
        filterText,
        items,
        valueExists,
        existingValueItem,
        shouldAddCustomItem,
        valueInvalid,
        setFilterText,
        getItemByValue,
    };
};
