/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from '@utilities/merge';
import { LegacyMultiSelectSize } from './LegacyMultiSelect';

export const getPaddingClasses = (size: LegacyMultiSelectSize) => {
    const classes = ['tw-pr-9'];
    switch (size) {
        case LegacyMultiSelectSize.Small:
            classes.push('tw-pl-3 tw-py-1');
            break;
        case LegacyMultiSelectSize.Medium:
            classes.push('tw-pl-[19px] tw-py-[11px]');
            break;
        default:
            return;
    }

    return merge(classes);
};
