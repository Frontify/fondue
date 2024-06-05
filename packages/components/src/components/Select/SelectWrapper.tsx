/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, cloneElement, forwardRef, useMemo, type ReactNode } from 'react';

import { SearchInput } from './Combobox';
import { SelectInput } from './Select';
import { SelectItem, SelectItemGroup, type SelectItemGroupProps, type SelectItemProps } from './SelectMenu';
import { SelectContextProvider } from './useSelectData';
export type SelectWrapperProps = {
    children?: ReactNode;
};
export const SelectWrapper = ({ children }: SelectWrapperProps) => {
    const childrenArray = useMemo(() => Children.toArray(children), [children]);
    const inputType = childrenArray.find((child) =>
        ['Select.Input', 'Select.SearchInput'].includes(child.type.displayName),
    ).type.displayName;

    if (inputType) {
        const inputElement = cloneElement(
            childrenArray.find((child) => child.type.displayName == inputType),
            {
                children: Children.toArray(children).filter((child) => child.type.displayName !== inputType),
            },
        );

        return <SelectContextProvider>{inputElement}</SelectContextProvider>;
    }
};
SelectWrapper.displayName = 'Select.Root';

export const Select = {
    Root: SelectWrapper,
    Input: SelectInput,
    SearchInput,
    Item: forwardRef<HTMLLIElement, SelectItemProps>(SelectItem),
    Group: forwardRef<HTMLDivElement, SelectItemGroupProps>(SelectItemGroup),
};
