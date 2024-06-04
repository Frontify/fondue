/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { Combobox } from './Combobox';
import { Select } from './Select';
import { SelectContextProvider } from './useSelectData';

export type SelectWrapperProps = {
    children?: ReactNode;
    isSearchable?: boolean;
};
export const SelectWrapper = ({ children, isSearchable }: SelectWrapperProps) => {
    return (
        <SelectContextProvider>
            {isSearchable ? <Combobox>{children}</Combobox> : <Select>{children}</Select>}
        </SelectContextProvider>
    );
};
