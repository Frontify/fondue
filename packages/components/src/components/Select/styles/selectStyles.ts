/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FOCUS_OUTLINE } from '#/utilities/focusStyle';

export const rootStyles =
    'tw-w-full tw-group tw-relative tw-flex tw-items-stretch tw-font-sans tw-font-normal tw-text-start tw-h-9 tw-text-body-medium tw-transition-colors ' +
    // Focus and border styles
    'tw-bg-base dark:tw-bg-transparent tw-rounded tw-border tw-border-line-strong hover:tw-border-line-x-strong has-[:focus-visible]:tw-border-line-xx-strong ' +
    // Readonly styles
    'has-[input[readonly]]:tw-border-transparent ' +
    // Disabled styles
    'has-[input:disabled]:tw-border-line-weak has-[input:disabled]:tw-bg-box-disabled ' +
    // Success and error status styles
    'data-[status="success"]:tw-border-text-positive data-[status="error"]:tw-border-text-negative ' +
    // active styles
    `${FOCUS_OUTLINE}`;

export const inputStyles =
    'tw-peer/input tw-w-full tw-bg-transparent tw-flex tw-items-center [text-align:inherit] tw-indent-3 tw-outline-none tw-rounded-[calc(var(--radius)_-_var(--line-width))] ' +
    // Remove border-radius and text-indent/padding on the left if there’s a left-side slot
    'has-[~_div:not([data-name="right"])]:tw-indent-0 has-[~_:not([data-name="right"])]:tw-pl-0 has-[~_:not([data-name="right"])]:tw-rounded-l-none ' +
    // Remove border-radius and padding on the right if there’s a right-side slot
    'has-[~_[data-name="right"]]:tw-pr-0 has-[~_[data-name="right"]]:tw-rounded-r-none ' +
    '[~_:not([data-name="right"])_~_:not([data-name="left"])]:tw-pr-0 [~_:not([data-name="right"])_~_:not([data-name="left"])]:tw-rounded-r-none' +
    // Readonly styles
    '[&[readonly]]:tw-cursor-text [&[readonly]]:tw-text-text-weak [&[readonly]]:tw-indent-0 ' +
    // Disabled styles
    'disabled:tw-cursor-text disabled:tw-text-text-disabled ';

export const menuStyles =
    'tw-rounded tw-mt-2 tw-hidden data-[open-state=true]:tw-block tw-bg-base tw-shadow-mid tw-border tw-border-line tw-w-[var(--radix-popover-trigger-width)]';

export const itemStyles =
    'tw-py-3 tw-px-5 tw-cursor-pointer tw-transition-colors tw-text-body-medium tw-text-start ' +
    // hover styles
    'hover:tw-bg-box-neutral-hover';
