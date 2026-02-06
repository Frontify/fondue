/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ForwardedRef } from 'react';

import { SelectBase, type SelectSharedProps } from './components/SelectBase';
import { useSingleSelect } from './hooks/useSingleSelect';

export type SelectSingleProps = SelectSharedProps & {
    /**
     * The active value in the select component. This is used to control the select externally.
     */
    value?: string | null;
    /**
     * Callback function that is called when an item is selected.
     */
    onSelect?: (selectedValue: string | null) => void;
    /**
     * The default value of the select component. Used for uncontrolled usages.
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
