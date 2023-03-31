/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from '@utilities/merge';

export const INSET_BORDER =
    'before:tw-pointer-events-none before:tw-block before:tw-rounded before:tw-top-0 before:tw-left-0 before:tw-bg-transparent before:tw-absolute before:tw-shadow-inner-line before:tw-w-full before:tw-h-full';

const CONTAINER_BASE_CLASSES = 'tw-bg-base tw-rounded tw-shadow-mid tw-z-[120000]';
export const CONTAINER_CLASSES = merge([CONTAINER_BASE_CLASSES, INSET_BORDER]);
