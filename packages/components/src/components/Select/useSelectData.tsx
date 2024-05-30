/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCombobox, type UseComboboxProps } from 'downshift';

export const useSelectData = (props: UseComboboxProps<unknown>, isSearchable: boolean) => {
    const comboBoxData = useCombobox({
        ...props,
    });

    const {
        isOpen,
        getToggleButtonProps,
        getLabelProps,
        getMenuProps,
        getInputProps,
        highlightedIndex,
        getItemProps,
        selectedItem,
        inputValue,
    } = comboBoxData;

    return {
        isOpen,
        getToggleButtonProps,
        getLabelProps,
        getMenuProps,
        getInputProps,
        highlightedIndex,
        getItemProps,
        selectedItem,
        inputValue,
    };
};
