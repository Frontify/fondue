/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    useCombobox,
    useSelect,
    type UseComboboxPropGetters,
    type UseComboboxProps,
    type UseSelectPropGetters,
    type UseSelectProps,
} from 'downshift';

type SelectData = {
    inputProps?: UseComboboxPropGetters<unknown>['getInputProps'];
    toggleButtonProps:
        | UseComboboxPropGetters<unknown>['getToggleButtonProps']
        | UseSelectPropGetters<unknown>['getToggleButtonProps'];
    labelProps: UseComboboxPropGetters<unknown>['getLabelProps'] | UseSelectPropGetters<unknown>['getLabelProps'];
    selectedItem: unknown;
    isOpen?: boolean;
    highlightedIndex?: number;
    menuProps: UseComboboxPropGetters<unknown>['getMenuProps'] | UseSelectPropGetters<unknown>['getMenuProps'];
    getItemProps: UseComboboxPropGetters<unknown>['getItemProps'] | UseSelectPropGetters<unknown>['getItemProps'];
};
export const useSelectData = (
    props: UseComboboxProps<unknown> | UseSelectProps<unknown>,
    isSearchable?: boolean,
): SelectData => {
    const comboBoxData = useCombobox({
        ...props,
    });

    const selectData = useSelect({
        ...props,
    });

    if (isSearchable) {
        return {
            inputProps: comboBoxData.getInputProps(),
            toggleButtonProps: comboBoxData.getToggleButtonProps(),
            labelProps: comboBoxData.getLabelProps(),
            selectedItem: comboBoxData.selectedItem,
            isOpen: comboBoxData.isOpen,
            highlightedIndex: comboBoxData.highlightedIndex,
            menuProps: comboBoxData.getMenuProps(),
            getItemProps: comboBoxData.getItemProps,
        };
    } else {
        return {
            inputProps: undefined,
            toggleButtonProps: selectData.getToggleButtonProps(),
            labelProps: selectData.getLabelProps(),
            selectedItem: selectData.selectedItem,
            isOpen: selectData.isOpen,
            highlightedIndex: selectData.highlightedIndex,
            menuProps: selectData.getMenuProps(),
            getItemProps: selectData.getItemProps,
        };
    }
};
