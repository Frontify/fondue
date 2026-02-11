/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemo } from 'react';

type SelectItemLike = {
    value: string;
    label: string;
};

type BadgeItem = {
    value: string;
    displayValue: string;
};

export const useBadgeItems = (
    selectedItemValues: string[],
    getItemByValue: (value?: string) => SelectItemLike | undefined,
): BadgeItem[] => {
    return useMemo(() => {
        return selectedItemValues.map((value) => {
            const item = getItemByValue(value);
            const displayValue = item?.label ?? value;
            return { value, displayValue };
        });
    }, [selectedItemValues, getItemByValue]);
};
