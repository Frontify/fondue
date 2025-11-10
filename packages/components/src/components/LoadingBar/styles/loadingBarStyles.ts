/* (c) Copyright Frontify Ltd., all rights reserved. */

import { sv } from '#/utilities/styleUtilities';

export const loadingBarContainerStyles = sv({
    base: 'tw-relative tw-w-full tw-overflow-hidden',
    variants: {
        rounded: {
            true: 'tw-rounded',
        },
        size: {
            small: 'tw-h-1',
            medium: 'tw-h-2',
            large: 'tw-h-3',
            'x-large': 'tw-h-4',
        },
        variant: {
            default: 'tw-bg-box-selected',
            positive: 'tw-bg-box-positive',
            negative: 'tw-bg-box-negative',
        },
    },
});

export const loadingBarStyles = sv({
    base: 'tw-h-full tw-w-full',
    variants: {
        variant: {
            default: 'tw-bg-text-interactive',
            positive: 'tw-bg-text-positive',
            negative: 'tw-bg-text-negative',
        },
        indeterminateState: {
            true: 'tw-animate-loading-bar-infinite tw-origin-left-right',
            false: 'tw-transition-all tw-origin-left tw-scale-x-[--loading-bar-proportion]',
        },
    },
});
