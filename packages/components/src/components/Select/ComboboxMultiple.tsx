/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ForwardedRef } from 'react';

import { ComboboxBase, type ComboboxSharedProps } from './components/ComboboxBase';
import { useMultiselect } from './hooks/useMultiselect';

export type ComboboxMultipleProps = ComboboxSharedProps & {
    /**
     * The controlled selected values. Use together with `onSelect` for controlled usage.
     * Pass `null` to clear all selections.
     */
    value?: string[] | null;
    /**
     * Callback fired when the selection changes.
     * Receives the full array of selected `value` strings, or `null` when all are cleared.
     *
     * @param selectedValues - The values of all selected items, or `null`.
     */
    onSelect?: (selectedValues: string[] | null) => void;
    /**
     * The initial selected values for uncontrolled usage.
     * The component manages its own state internally.
     */
    defaultValue?: string[];
};

const ComboboxMultipleInput = (
    { value, onSelect, defaultValue, ...rest }: ComboboxMultipleProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const { selectedItemValues, toggleSelectedItem, clear } = useMultiselect(onSelect, value, defaultValue);

    return (
        <ComboboxBase
            ref={ref}
            multiple
            selectedItemValues={selectedItemValues}
            onItemSelect={toggleSelectedItem}
            onClear={clear}
            {...rest}
        />
    );
};

export const ComboboxMultiple = forwardRef<HTMLDivElement, ComboboxMultipleProps>(ComboboxMultipleInput);
ComboboxMultiple.displayName = 'Select.Combobox.Multiple';
