/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FOCUS_OUTLINE } from '#/utilities/focusStyle';
import { sv } from '#/utilities/styleUtilities';

export const checkboxStyles = sv({
    base:
        'tw-peer tw-relative tw-inline-flex tw-bg-base tw-text-white tw-shrink-0 tw-rounded tw-border tw-border-line-x-strong group-hover:tw-border-line-xx-strong hover:tw-border-line-xx-strong tw-transition-colors ' +
        'data-[state="checked"]:tw-border-transparent data-[state="indeterminate"]:tw-border-transparent ' +
        'disabled:tw-border-line-strong disabled:tw-bg-base disabled:tw-cursor-not-allowed data-[state="checked"]:disabled:tw-bg-box-disabled-strong ' +
        'data-[readonly="true"]:tw-pointer-events-none ' +
        `${FOCUS_OUTLINE}`,
    variants: {
        size: {
            default: 'tw-size-4',
            large: 'tw-size-5',
        },
        emphasis: {
            default:
                'data-[state="checked"]:tw-bg-box-selected-strong data-[state="checked"]:hover:tw-bg-box-selected-strong-hover data-[state="checked"]:active:tw-bg-box-selected-strong-pressed ' +
                'data-[state="indeterminate"]:tw-bg-box-selected-strong data-[state="indeterminate"]:hover:tw-bg-box-selected-strong-hover data-[state="indeterminate"]:active:tw-bg-box-selected-strong-pressed ',
            weak:
                'data-[state="checked"]:tw-bg-box-neutral-strong data-[state="checked"]:hover:tw-bg-box-neutral-strong-hover data-[state="checked"]:active:tw-bg-box-neutral-strong-pressed ' +
                'data-[state="indeterminate"]:tw-bg-box-neutral-strong data-[state="indeterminate"]:hover:tw-bg-box-neutral-strong-hover data-[state="indeterminate"]:active:tw-bg-box-neutral-strong-pressed ',
        },
    },
    defaultVariants: {
        size: 'default',
        emphasis: 'default',
    },
});

export const checkboxIndicatorStyles =
    'tw-group tw-absolute tw-inset-0 tw-inline-flex tw-items-center tw-justify-center tw-text-current ' +
    'tw-opacity-0 data-[state="checked"]:tw-opacity-100 data-[state="indeterminate"]:tw-opacity-100 tw-transition-opacity ';
