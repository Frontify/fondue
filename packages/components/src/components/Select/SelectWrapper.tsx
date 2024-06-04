/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { Select } from './Select';
import { SelectContextProvider } from './useSelectData';

export type SelectWrapperProps = {
    children?: ReactNode;
};
export const SelectWrapper = ({ children }: SelectWrapperProps) => {
    return (
        <SelectContextProvider>
            <Select>{children}</Select>
        </SelectContextProvider>
    );
};
