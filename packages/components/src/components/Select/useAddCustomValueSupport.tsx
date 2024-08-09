/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode, useMemo, useEffect, type Dispatch } from 'react';

import { ForwardedRefSelectItem } from './SelectItem';

/**
 * A custom hook that adds support for custom values in a select component.
 *
 * @param initialItems - The initial list of selectable items.
 * @param menuSlots - The existing menu slots (options) in the select component.
 * @param inputValue - The current value of the input field.
 * @param allowCustomValue - A flag indicating whether custom values are allowed.
 * @param setItems - A function to update the list of items.
 * @returns An object containing a flag indicating if the value exists and the updated menu slots.
 */
export const useAddCustomValueSupport = (
    initialItems: {
        value: string;
        label: string;
    }[],
    menuSlots: ReactNode | ReactNode[],
    inputValue: string,
    allowCustomValue: boolean,
    setItems: Dispatch<{ value: string; label: string }[]>,
) => {
    const valueExists = useMemo(
        () => initialItems.some((item) => item.label.toLocaleLowerCase() === inputValue.toLocaleLowerCase()),
        [initialItems, inputValue],
    );

    const shouldAddCustomItem = useMemo(
        () => allowCustomValue && inputValue !== '' && !valueExists,
        [allowCustomValue, inputValue, valueExists],
    );

    const allMenuSlots = useMemo(() => {
        if (shouldAddCustomItem) {
            const customItem = (
                <ForwardedRefSelectItem key={inputValue} value={inputValue} data-test-id="custom-item">
                    {inputValue}
                </ForwardedRefSelectItem>
            );

            if (Array.isArray(menuSlots)) {
                return [...menuSlots, customItem];
            }

            return [menuSlots, customItem];
        }

        return menuSlots;
    }, [shouldAddCustomItem, inputValue, menuSlots]);

    useEffect(() => {
        if (shouldAddCustomItem) {
            setItems([...initialItems, { label: inputValue, value: inputValue }]);
        } else {
            setItems(initialItems);
        }
    }, [shouldAddCustomItem, initialItems, inputValue, setItems]);

    return { valueExists, allMenuSlots };
};
