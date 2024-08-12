/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode, useMemo } from 'react';

import { ForwardedRefSelectItem } from './SelectItem';
import { useSelectData } from './useSelectData';

/**
 * Hook to manage combobox data and filtering and add custom value support.
 *
 * @param {ReactNode} children - The React children to process, typically SelectItem components.
 * @param {boolean} allowCustomValue - Whether to allow custom values not in the initial items list.
 * @returns {Object} An object containing the slots, items, filter text, clear button, and other combobox data.
 */
export const useComboboxData = (children: ReactNode, allowCustomValue: boolean) => {
    const {
        menuSlots: initialMenuSlots,
        items: initialItems,
        inputSlots,
        filterText,
        clearButton,
        getItemByValue,
        setFilterText,
    } = useSelectData(children);

    const { valueExists, existingValueItem } = useMemo(() => {
        const existingValueItem = initialItems.find(
            (item) => item.label.toLocaleLowerCase() === filterText.toLocaleLowerCase(),
        );
        return {
            valueExists: !!existingValueItem,
            existingValueItem,
        };
    }, [initialItems, filterText]);

    const shouldAddCustomItem = useMemo(
        () => allowCustomValue && filterText !== '' && !valueExists,
        [allowCustomValue, filterText, valueExists],
    );

    const menuSlots = useMemo(() => {
        if (shouldAddCustomItem) {
            const customItem = (
                <ForwardedRefSelectItem key={filterText} value={filterText} data-test-id="custom-item">
                    {filterText}
                </ForwardedRefSelectItem>
            );

            return [...initialMenuSlots, customItem];
        }

        return initialMenuSlots;
    }, [initialMenuSlots, shouldAddCustomItem, filterText]);

    const items = useMemo(() => {
        const filteredItems = initialItems.filter(
            (item) => filterText === '' || item.label.toLowerCase().includes(filterText.toLowerCase()),
        );

        if (shouldAddCustomItem) {
            filteredItems.push({ label: filterText, value: filterText });
        }

        return filteredItems;
    }, [initialItems, shouldAddCustomItem, filterText]);

    return {
        inputSlots,
        filterText,
        clearButton,
        items,
        menuSlots,
        valueExists,
        existingValueItem,
        getItemByValue,
        setFilterText,
    };
};
