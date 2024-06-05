/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixPopover from '@radix-ui/react-popover';
import { Children, cloneElement, forwardRef, isValidElement, useMemo, type ReactElement, type ReactNode } from 'react';

import { SearchInput } from './Combobox';
import { SelectInput } from './Select';
import { SelectItem, SelectItemGroup, type SelectItemGroupProps, type SelectItemProps } from './SelectMenu';
import { SelectContextProvider } from './useSelectData';
export type SelectWrapperProps = {
    children?: ReactNode;
};
export const SelectWrapper = ({ children }: SelectWrapperProps) => {
    const childrenArray = useMemo<ReactNode[]>(() => Children.toArray(children), [children]);
    if (childrenArray) {
        const inputChild = childrenArray.find(
            (child) =>
                isValidElement(child) &&
                typeof child === 'object' &&
                ['Select.Input', 'Select.SearchInput'].includes(child.type.displayName),
        );
        if (inputChild) {
            const inputElement = cloneElement(inputChild as ReactElement, {
                children: Children.toArray(children).filter(
                    (child) => child.type.displayName !== inputChild.type.displayName,
                ),
            });
            return (
                <SelectContextProvider>
                    <RadixPopover.Root open={true}>{inputElement}</RadixPopover.Root>
                </SelectContextProvider>
            );
        }
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
