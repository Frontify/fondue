/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from '@utilities/merge';
import { FilterableMultiSelectSize } from './FilterableMultiSelect';
import { useEffect } from 'react';

export const getPaddingClasses = (size: FilterableMultiSelectSize) => {
    const classes = ['tw-pr-9'];
    switch (size) {
        case FilterableMultiSelectSize.Small:
            classes.push('tw-pl-3 tw-py-1');
            break;
        case FilterableMultiSelectSize.Medium:
            classes.push('tw-pl-[19px] tw-py-[11px]');
            break;
        default:
            return;
    }

    return merge(classes);
};

/*
This function should live here temporarily and removed once the new MultiSelect implementation is done.
The new Hook update works well in any overlay component but doesn't work in the current MultiSelect component.
It messes with the Popper positioning which should be also fixed in another PR using the combo -> Popper component, overlayStyles, and downshift.
*/
export const useClickOutside = (
    reference: HTMLElement | null,
    callback: () => void,
    ignoredElements?: HTMLElement[],
): void => {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                !reference?.contains(event.target as Node) &&
                !ignoredElements?.find(
                    (element) => element && (event.target === element || element.contains(event.target as Node)),
                )
            ) {
                callback();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [callback, reference, ignoredElements]);
};
