/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useId, useMemo } from 'react';

type SelectItemLike = {
    value: string;
    label: string;
};

type SelectionDescription = {
    /** The unique ID for the SR description element. */
    selectionDescriptionId: string;
    /** The description text for screen readers (empty string when not applicable). */
    selectionDescription: string;
};

export const useSelectionDescription = (
    isMultiple: boolean,
    selectedItemValues: string[],
    getItemByValue: (value?: string) => SelectItemLike | undefined,
): SelectionDescription => {
    const selectionDescriptionId = useId();

    const selectionDescription = useMemo((): string => {
        if (!isMultiple || selectedItemValues.length === 0) {
            return '';
        }
        const labels = selectedItemValues
            .map((value) => {
                const item = getItemByValue(value);
                return item?.label ?? value;
            })
            .join(', ');
        return `${selectedItemValues.length} selected: ${labels}`;
    }, [isMultiple, selectedItemValues, getItemByValue]);

    return { selectionDescriptionId, selectionDescription };
};
