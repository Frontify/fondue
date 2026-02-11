/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useId, useMemo } from 'react';

import { useTranslation } from '#/hooks/useTranslation';

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
    const { t } = useTranslation();
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
        return t('Select_selectedCount', { count: selectedItemValues.length.toString(), items: labels });
    }, [isMultiple, selectedItemValues, getItemByValue, t]);

    return { selectionDescriptionId, selectionDescription };
};
