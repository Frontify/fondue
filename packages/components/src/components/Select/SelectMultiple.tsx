/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ForwardedRef } from 'react';

import { SelectBase, type SelectSharedProps } from './components/SelectBase';
import { useMultiselect } from './hooks/useMultiselect';

export type SelectMultipleProps = SelectSharedProps & {
    /**
     * The active value in the select component. This is used to control the select externally
     */
    value?: string[] | null;
    /**
     * Callback function that is called when items are selected
     */
    onSelect?: (selectedValues: string[] | null) => void;
    /**
     * The default value of the select component. Used for uncontrolled usages
     */
    defaultValue?: string[];
    /**
     * Values that apply to only some of the records being edited. Those options render a dash
     * instead of a checkmark and the trigger gains a "2 mixed" badge next to the selection badges.
     *
     * Purely visual: never part of the selection, never reported by `onSelect`. Selecting one
     * applies it to every record and it does not return to the partial state when switched off
     * again. Pass a different set to describe a different group of records.
     */
    indeterminateValues?: string[];
};

const SelectMultipleInput = (
    { value, onSelect, defaultValue, ...rest }: SelectMultipleProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const { selectedItemValues, toggleSelectedItem, clear } = useMultiselect(onSelect, value, defaultValue);

    return (
        <SelectBase
            ref={ref}
            multiple
            selectedItemValues={selectedItemValues}
            onItemSelect={toggleSelectedItem}
            onClear={clear}
            {...rest}
        />
    );
};

export const SelectMultiple = forwardRef<HTMLDivElement, SelectMultipleProps>(SelectMultipleInput);
SelectMultiple.displayName = 'Select.Multi';
