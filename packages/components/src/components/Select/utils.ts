/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type SelectItemElementType } from './SelectMenu';

export const getSelectOptionValue = ({
    children,
    value,
    label,
    ...props
}: SelectItemElementType): {
    value: string;
    label: string;
} => {
    if (children && typeof children === 'string') {
        return {
            value: value ? value : children,
            label: label ? label : children,
        };
    } else {
        return {
            value: value || '',
            label: label ? label : value || '',
        };
    }
};
