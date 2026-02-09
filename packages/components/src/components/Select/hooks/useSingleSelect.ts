/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';

export const useSingleSelect = (
    onSelect?: (value: string | null) => void,
    value?: string | null,
    defaultValue?: string,
) => {
    const [selectedItemState, setSelectedItemState] = useState<string | null>(defaultValue ?? null);

    const selectedValue = value !== undefined ? value : selectedItemState;
    const selectedItemValues = selectedValue !== null ? [selectedValue] : [];

    const selectItem = (item?: string) => {
        if (!item) {
            return;
        }
        const newValue = selectedValue === item ? null : item;
        if (!value) {
            setSelectedItemState(newValue);
        }
        onSelect?.(newValue);
    };

    const clear = () => {
        if (!value) {
            setSelectedItemState(null);
        }
        onSelect?.(null);
    };

    return {
        selectedItemValues,
        selectItem,
        clear,
    };
};
