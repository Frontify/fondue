/* (c) Copyright Frontify Ltd., all rights reserved. */

import { sv } from '#/utilities/styleUtilities';

export const tooltipContentStyles = sv({
    base: 'tw-bg-box-neutral-mighty tw-text-box-neutral-mighty-inverse tw-border tw-border-line-mighty tw-rounded-md tw-max-w-48 tw-min-w-[--radix-tooltip-trigger-width] tw-text-sm',
    variants: {
        padding: {
            spacious: 'tw-px-3 tw-py-2',
            compact: 'tw-px-2 tw-py-1',
        },
    },
    defaultVariants: {
        padding: 'spacious',
    },
});

export const tooltipArrowStyles =
    'tw-w-2 tw-h-2 tw-bg-box-neutral-mighty tw-border-r tw-border-b tw-border-r-line-mighty tw-border-b-line-mighty tw-rotate-45 -tw-translate-y-1 tw-rounded-br-small';
