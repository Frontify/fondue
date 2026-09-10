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
    indeterminateCount = 0,
): SelectionDescription => {
    const { t } = useTranslation();
    const selectionDescriptionId = useId();

    // Mirrors what the trigger shows: the selection badges, followed by the partially applied count
    const selectionDescription = useMemo((): string => {
        if (!isMultiple) {
            return '';
        }
        const parts: string[] = [];
        if (selectedItemValues.length > 0) {
            const labels = selectedItemValues
                .map((value) => {
                    const item = getItemByValue(value);
                    return item?.label ?? value;
                })
                .join(', ');
            parts.push(t('Select_selectedCount', { count: selectedItemValues.length.toString(), items: labels }));
        }
        if (indeterminateCount > 0) {
            parts.push(t('Select_mixedCount', { count: indeterminateCount.toString() }));
        }
        return parts.join(', ');
    }, [isMultiple, selectedItemValues, getItemByValue, indeterminateCount, t]);

    return { selectionDescriptionId, selectionDescription };
};
