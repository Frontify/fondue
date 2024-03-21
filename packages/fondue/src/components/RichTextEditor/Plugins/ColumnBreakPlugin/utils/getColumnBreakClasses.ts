/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TElement } from '@udecode/slate';
import { merge } from '@utilities/merge';

export const INACTIVE_COLUMN_BREAK_CLASS_NAMES = 'tw-border-b tw-border-dashed tw-border-line-x-strong tw-pb-5';
export const ACTIVE_COLUMN_BREAK_CLASS_NAMES = `${INACTIVE_COLUMN_BREAK_CLASS_NAMES} tw-break-after-column tw-break-inside-avoid-column`;

export const getColumnBreakClasses = (element: TElement) => {
    const breakAfterColumn = element.breakAfterColumn;
    return merge([
        breakAfterColumn === 'active' && ACTIVE_COLUMN_BREAK_CLASS_NAMES,
        breakAfterColumn === 'inactive' && INACTIVE_COLUMN_BREAK_CLASS_NAMES,
    ]);
};
