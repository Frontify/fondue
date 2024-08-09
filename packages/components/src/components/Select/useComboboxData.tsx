/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode, useMemo } from 'react';

import { ForwardedRefSelectItem } from './SelectItem';
import { type SelectItemType } from './useSelectData';

/**
 * Hook to manage combobox data and filtering and add custom value support.
 *
 * @param {SelectItemType[]} initialItems - The initial list of selectable items.
 * @param {ReactNode[]} initialMenuSlots - The initial list of menu slot components.
 * @param {string} filterText - The current filter text input by the user.
 * @param {boolean} allowCustomValue - Whether to allow custom values not in the initial items list.
 * @returns {ComboboxData} An object containing filtered items, menu slots, and value existence information.
 */
export const useComboboxData = (
    initialItems: SelectItemType[],
    initialMenuSlots: ReactNode[],
    filterText: string,
    allowCustomValue: boolean,
) => {
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
        items,
        menuSlots,
        valueExists,
        existingValueItem,
    };
};
