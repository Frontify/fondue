/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useState } from 'react';

export const useSingleSelect = (
    onSelect?: (value: string | null) => void,
    value?: string | null,
    defaultValue?: string,
) => {
    const [selectedItemState, setSelectedItemState] = useState<string | null>(defaultValue ?? null);

    const selectedValue = value !== undefined ? value : selectedItemState;
    const selectedItemValues = selectedValue !== null ? [selectedValue] : [];

    const selectItem = useCallback(
        (item?: string) => {
            if (item === undefined) {
                return;
            }
            const newValue = selectedValue === item ? null : item;
            if (value === undefined) {
                setSelectedItemState(newValue);
            }
            onSelect?.(newValue);
        },
        [selectedValue, value, onSelect],
    );

    const clear = useCallback(() => {
        if (value === undefined) {
            setSelectedItemState(null);
        }
        onSelect?.(null);
    }, [value, onSelect]);

    return {
        selectedItemValues,
        selectItem,
        clear,
    };
};
