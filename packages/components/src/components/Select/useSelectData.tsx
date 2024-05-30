/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCombobox, type UseComboboxProps, type UseComboboxReturnValue } from 'downshift';

export const useSelectData = (props: UseComboboxProps<unknown>): UseComboboxReturnValue<unknown> => {
    return useCombobox({
        ...props,
    });
};
