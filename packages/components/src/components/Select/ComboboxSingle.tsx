/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ForwardedRef } from 'react';

import { ComboboxBase, type ComboboxSharedProps } from './components/ComboboxBase';
import { useSingleSelect } from './hooks/useSingleSelect';

export type ComboboxSingleProps = ComboboxSharedProps & {
    /**
     * The active value in the combobox component. This is used to control the combobox externally.
     */
    value?: string | null;
    /**
     * Callback function that is called when an item is selected.
     */
    onSelect?: (selectedValue: string | null) => void;
    /**
     * The default value of the combobox component. Used for uncontrolled usages.
     */
    defaultValue?: string;
};

const ComboboxSingleInput = (
    { value, onSelect, defaultValue, ...rest }: ComboboxSingleProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const { selectedItemValues, selectItem, clear } = useSingleSelect(onSelect, value, defaultValue);

    return (
        <ComboboxBase
            ref={ref}
            multiple={false}
            selectedItemValues={selectedItemValues}
            onItemSelect={selectItem}
            onClear={clear}
            {...rest}
        />
    );
};

export const ComboboxSingle = forwardRef<HTMLDivElement, ComboboxSingleProps>(ComboboxSingleInput);
ComboboxSingle.displayName = 'Select.Combobox';
