/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from '@utilities/merge';

export const COMMON_INSET_BORDER =
    'before:tw-pointer-events-none before:tw-block before:tw-rounded before:tw-top-0 before:tw-left-0 before:tw-bg-transparent before:tw-absolute before:tw-w-full before:tw-h-full';

export const INSET_BORDER = merge([COMMON_INSET_BORDER, 'before:tw-shadow-inner-line-x-strong']);

export const MIGHTY_INSET_BORDER = merge([COMMON_INSET_BORDER, 'before:tw-shadow-inner-mighty']);
