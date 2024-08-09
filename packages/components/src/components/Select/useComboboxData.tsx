/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode, useMemo } from 'react';

import { ForwardedRefSelectItem } from './SelectItem';
import { type SelectItemType } from './useSelectData';

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
