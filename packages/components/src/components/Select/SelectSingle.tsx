/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ForwardedRef } from 'react';

import { SelectBase, type SelectSharedProps } from './components/SelectBase';
import { useSingleSelect } from './hooks/useSingleSelect';

export type SelectSingleProps = SelectSharedProps & {
    /**
     * The controlled selected value. Use together with `onSelect` for controlled usage.
     * Pass `null` to clear the selection.
     */
    value?: string | null;
    /**
     * Callback fired when the user picks or clears an option.
     * Receives the selected item's `value` string, or `null` when cleared.
     *
     * @param selectedValue - The value of the selected item, or `null`.
     */
    onSelect?: (selectedValue: string | null) => void;
    /**
     * The initial selected value for uncontrolled usage.
     * The component manages its own state internally.
     */
    defaultValue?: string;
};

const SelectSingleInput = (
    { value, onSelect, defaultValue, ...rest }: SelectSingleProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const { selectedItemValues, selectItem, clear } = useSingleSelect(onSelect, value, defaultValue);

    return (
        <SelectBase
            ref={ref}
            multiple={false}
            selectedItemValues={selectedItemValues}
            onItemSelect={selectItem}
            onClear={clear}
            {...rest}
        />
    );
};

export const SelectSingle = forwardRef<HTMLDivElement, SelectSingleProps>(SelectSingleInput);
SelectSingle.displayName = 'Select';
