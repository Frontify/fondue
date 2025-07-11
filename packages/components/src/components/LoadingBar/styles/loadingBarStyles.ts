/* (c) Copyright Frontify Ltd., all rights reserved. */

import { sv } from '#/utilities/styleUtilities';

export const loadingBarContainerStyles = sv({
    base: 'tw-relative tw-w-full tw-overflow-hidden',
    variants: {
        rounded: {
            true: 'tw-rounded-medium',
        },
        size: {
            small: 'tw-h-1',
            medium: 'tw-h-2',
            large: 'tw-h-3',
            'x-large': 'tw-h-4',
        },
        variant: {
            default: 'tw-bg-container-highlight',
            positive: 'tw-bg-container-success',
            negative: 'tw-bg-container-error',
        },
    },
});

export const loadingBarStyles = sv({
    base: 'tw-h-full tw-w-full',
    variants: {
        variant: {
            default: 'tw-bg-highlight',
            positive: 'tw-bg-success',
            negative: 'tw-bg-error',
        },
        indeterminateState: {
            true: 'tw-animate-loading-bar-infinite tw-origin-left-right',
            false: 'tw-transition-all tw-origin-left tw-scale-x-[--loading-bar-proportion]',
        },
    },
});
