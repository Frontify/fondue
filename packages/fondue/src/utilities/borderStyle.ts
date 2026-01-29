/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from '@utilities/merge';

const COMMON_INSET_BORDER =
    'before:tw-pointer-events-none before:tw-block before:tw-rounded before:tw-top-0 before:tw-left-0 before:tw-bg-transparent before:tw-absolute before:tw-w-full before:tw-h-full';
/**
 * @deprecated This constant is deprecated and will be removed in the next major version.
 */
export const INSET_BORDER = merge([COMMON_INSET_BORDER, 'before:tw-shadow-inner-line-x-strong']);

/**
 * @deprecated This constant is deprecated and will be removed in the next major version.
 */
export const MIGHTY_INSET_BORDER = merge([COMMON_INSET_BORDER, 'before:tw-shadow-inner-mighty']);
