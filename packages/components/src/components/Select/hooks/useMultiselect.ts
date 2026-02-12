/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';

export const useMultiselect = (
    onSelect?: (value: string[] | null) => void,
    value?: string[] | null,
    defaultValue?: string[],
) => {
    const [selectedItemsState, setSelectedItemsState] = useState<string[]>(defaultValue ?? []);

    const selectedItemValues = value ?? selectedItemsState;
    const setSelectedItems = (items: string[]) => {
        if (!value) {
            setSelectedItemsState(items);
        }
        onSelect?.(items);
    };

    const toggleSelectedItem = (toggledItem?: string) => {
        if (toggledItem === undefined) {
            return;
        }
        const index = selectedItemValues.findIndex((selectedItemValue) => toggledItem === selectedItemValue);
        if (index > 0) {
            setSelectedItems([...selectedItemValues.slice(0, index), ...selectedItemValues.slice(index + 1)]);
        } else if (index === 0) {
            setSelectedItems([...selectedItemValues.slice(1)]);
        } else {
            setSelectedItems([...selectedItemValues, toggledItem]);
        }
    };

    const clear = () => {
        setSelectedItems([]);
    };

    return {
        selectedItemValues,
        toggleSelectedItem,
        clear,
    };
};
