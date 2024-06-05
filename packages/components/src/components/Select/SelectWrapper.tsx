/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ReactNode } from 'react';

import { Combobox } from './Combobox';
import { SelectComponent } from './Select';
import {
    SelectItem,
    SelectItemGroup,
    SelectMenu,
    type SelectItemGroupProps,
    type SelectItemProps,
    type SelectMenuProps,
} from './SelectMenu';
import { SelectContextProvider } from './useSelectData';
export type SelectWrapperProps = {
    children?: ReactNode;
    isSearchable?: boolean;
};
export const SelectWrapper = ({ children, isSearchable }: SelectWrapperProps) => {
    return (
        <SelectContextProvider>
            {isSearchable ? <Combobox>{children}</Combobox> : <SelectComponent>{children}</SelectComponent>}
        </SelectContextProvider>
    );
};

export const Select = {
    Root: SelectWrapper,
    Menu: forwardRef<HTMLUListElement, SelectMenuProps>(SelectMenu),
    Item: forwardRef<HTMLLIElement, SelectItemProps>(SelectItem),
    Group: forwardRef<HTMLDivElement, SelectItemGroupProps>(SelectItemGroup),
};
