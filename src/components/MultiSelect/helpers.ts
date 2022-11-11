/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from '@utilities/merge';
import { MultiSelectSize } from './MultiSelect';

export const getPaddingClasses = (size: MultiSelectSize, hasActiveKeys: boolean) => {
    const classes = ['tw-pr-9'];
    switch (size) {
        case MultiSelectSize.Small:
            classes.push(`tw-pl-3 ${hasActiveKeys ? 'tw-py-1' : 'tw-py-2'}`);
            break;
        case MultiSelectSize.Medium:
            classes.push('tw-pl-[19px] tw-py-[11px]');
            break;
        default:
            return;
    }

    return merge(classes);
};
