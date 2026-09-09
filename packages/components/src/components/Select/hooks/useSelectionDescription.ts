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
    hasIndeterminateValues: boolean = false,
): SelectionDescription => {
    const { t } = useTranslation();
    const selectionDescriptionId = useId();

    const selectionDescription = useMemo((): string => {
        if (!isMultiple) {
            return '';
        }
        // While any value is only partially applied the trigger shows a single "Mixed" label instead
        // of the individual values, so the description matches what is on screen rather than
        // announcing a count the user cannot see.
        if (hasIndeterminateValues) {
            return t('Select_mixedValues');
        }
        if (selectedItemValues.length === 0) {
            return '';
        }
        const labels = selectedItemValues
            .map((value) => {
                const item = getItemByValue(value);
                return item?.label ?? value;
            })
            .join(', ');
        return t('Select_selectedCount', { count: selectedItemValues.length.toString(), items: labels });
    }, [isMultiple, selectedItemValues, getItemByValue, hasIndeterminateValues, t]);

    return { selectionDescriptionId, selectionDescription };
};
