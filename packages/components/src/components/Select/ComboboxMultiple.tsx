/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ForwardedRef } from 'react';

import { ComboboxBase, type ComboboxSharedProps } from './components/ComboboxBase';
import { useMultiselect } from './hooks/useMultiselect';

export type ComboboxMultipleProps = ComboboxSharedProps & {
    /**
     * The active value in the combobox component. This is used to control the combobox externally
     */
    value?: string[] | null;
    /**
     * Callback function that is called when items are selected
     */
    onSelect?: (selectedValues: string[] | null) => void;
    /**
     * The default value of the combobox component. Used for uncontrolled usages
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
