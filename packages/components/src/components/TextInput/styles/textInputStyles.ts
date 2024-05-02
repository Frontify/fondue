/* (c) Copyright Frontify Ltd., all rights reserved. */

export const rootStyles =
    'tw-group tw-relative tw-flex tw-items-stretch tw-font-sans tw-font-normal tw-text-start tw-transition-colors ' +
    // Depends on size
    'tw-h-9 tw-text-body-medium ' +
    // Focus and border styles
    'tw-bg-base dark:tw-bg-transparent tw-rounded tw-border tw-border-line-strong hover:tw-border-line-x-strong has-[:focus-visible]:tw-border-line-xx-strong ' +
    // Readonly or disabled styles
    'data-[read-only="true"]:tw-border-line-weak data-[disabled="true"]:tw-border-line-weak data-[read-only="true"]:tw-bg-box-disabled data-[disabled="true"]:tw-bg-box-disabled ' +
    // Success and error status styles
    'data-[status="success"]:tw-border-text-positive data-[status="error"]:tw-border-text-negative ';

export const inputStyles =
    'tw-w-full tw-bg-transparent tw-flex tw-items-center [text-align:inherit] tw-outline-none tw-rounded-[calc(var(--radius)_-_var(--line-width))] ' +
    // Remove border-radius and text-indent/padding on the left if there’s a left-side slot
    'has-[~_:not([data-side="right"])]:tw-indent-0 has-[~_:not([data-side="right"])]:tw-pl-0 has-[~_:not([data-side="right"])]:tw-rounded-l-[0px] ' +
    // Remove border-radius and padding on the right if there’s a right-side slot
    'has-[~_[data-side="right"]]:tw-pr-0 has-[~_[data-side="right"]]:tw-rounded-r-[0px] ' +
    '' +
    // Depends on size
    'tw-indent-3 ' +
    // Readonly or disabled styles
    'read-only:tw-cursor-text disabled:tw-cursor-text read-only:tw-text-text-disabled disabled:tw-text-text-disabled ';

export const slotStyles =
    'tw-peer tw-shrink-0 tw-flex tw-items-center tw-cursor-text ' +
    // Depends on size
    'tw-gap-2 tw-pl-3 tw-pr-2 ' +
    // Left slot
    '[&:not([data-side="right"])]:-tw-order-1 [&:not([data-side="right"])]:tw-ml-px [&:not([data-side="right"])]:tw-mr-0 ' +
    // Right slot
    'data-[side="right"]:tw-order-0 data-[side="right"]:tw-ml-0 data-[side="right"]:tw-mr-px ' +
    '' +
    // Readonly or disabled color styles
    'group-data-[read-only="true"]:tw-text-text-disabled group-data-[disabled="true"]:tw-text-text-disabled ';

export const loadingStatusStyles =
    'group-data-[status="loading"]:tw-flex tw-hidden tw-absolute tw-size-6 -tw-top-3 -tw-right-3 tw-pointer-events-none ' +
    'tw-items-center tw-justify-center tw-bg-base tw-border tw-border-line-strong tw-rounded-full ' +
    'before:tw-flex before:tw-items-center before:tw-justify-center before:tw-size-4 before:tw-rounded-full ' +
    'before:tw-border before:tw-border-solid before:tw-border-text-interactive before:tw-border-t-transparent before:tw-animate-spin';
