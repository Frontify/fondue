/* (c) Copyright Frontify Ltd., all rights reserved. */

export const rootStyles =
    'tw-group tw-relative tw-flex tw-items-stretch tw-font-sans tw-font-normal tw-text-start tw-h-9 tw-text-body-medium tw-transition-colors ' +
    // Focus and border styles
    'tw-bg-base dark:tw-bg-transparent tw-rounded tw-border tw-border-line-strong hover:tw-border-line-x-strong has-[:focus-visible]:tw-border-line-xx-strong ' +
    // Readonly or disabled styles
    'has-[input:read-only]:tw-border-line-weak has-[input:disabled]:tw-border-line-weak has-[input:read-only]:tw-bg-box-disabled has-[input:disabled]:tw-bg-box-disabled ' +
    // Success and error status styles
    'data-[status="success"]:tw-border-text-positive data-[status="error"]:tw-border-text-negative ';

export const inputStyles =
    'tw-peer/input tw-w-full tw-bg-transparent tw-flex tw-items-center [text-align:inherit] tw-indent-3 tw-outline-none tw-rounded-[calc(var(--radius)_-_var(--line-width))] ' +
    // Remove border-radius and text-indent/padding on the left if there’s a left-side slot
    'has-[~_div:not([data-name="right"])]:tw-indent-0 has-[~_:not([data-name="right"])]:tw-pl-0 has-[~_:not([data-name="right"])]:tw-rounded-l-none ' +
    // Remove border-radius and padding on the right if there’s a right-side slot
    'has-[~_[data-name="right"]]:tw-pr-0 has-[~_[data-name="right"]]:tw-rounded-r-none ' +
    '[~_:not([data-name="right"])_~_:not([data-name="left"])]:tw-pr-0 [~_:not([data-name="right"])_~_:not([data-name="left"])]:tw-rounded-r-none' +
    // Readonly or disabled styles
    'read-only:tw-cursor-text disabled:tw-cursor-text read-only:tw-text-text-disabled disabled:tw-text-text-disabled ';

export const slotStyles =
    'tw-peer tw-shrink-0 tw-flex tw-items-center tw-cursor-text tw-gap-2 tw-pl-3 tw-pr-2 ' +
    // Left slot
    '[&:not([data-name="right"])]:-tw-order-1 [&:not([data-name="right"])]:tw-ml-px [&:not([data-name="right"])]:tw-mr-0 ' +
    // Right slot
    'data-[name="right"]:tw-order-[0] data-[name="right"]:tw-ml-0 data-[name="right"]:tw-mr-px ' +
    // 2 slots without any name should be implicitly ordered
    '[&:not([data-name="right"])_~_:not([data-name="left"])]:tw-order-[0] [&:not([data-name="right"])_~_:not([data-name="left"])]:tw-ml-0 [&:not([data-name="right"])_~_:not([data-name="left"])]:tw-mr-px ' +
    // Readonly or disabled color styles
    'peer-read-only/input:tw-text-text-disabled peer-disabled/input:tw-text-text-disabled ';

export const loadingStatusStyles =
    'tw-flex tw-absolute tw-size-6 -tw-top-3 -tw-right-3 tw-pointer-events-none ' +
    'tw-items-center tw-justify-center tw-bg-base tw-border tw-border-line-strong tw-rounded-full ' +
    'before:tw-flex before:tw-items-center before:tw-justify-center before:tw-size-4 before:tw-rounded-full ' +
    'before:tw-border before:tw-border-solid before:tw-border-text-interactive before:tw-border-t-transparent before:tw-animate-spin';
