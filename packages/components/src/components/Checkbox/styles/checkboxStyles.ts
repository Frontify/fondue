/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FOCUS_OUTLINE } from '#/utilities/focusStyle';
import { sv } from '#/utilities/styleUtilities';

export const checkboxStyles = sv({
    base:
        'tw-peer tw-relative tw-inline-flex tw-bg-surface tw-text-white tw-shrink-0 tw-rounded-medium tw-border tw-border-line-strong group-hover:tw-border-line-strong hover:tw-border-line-strong tw-transition-colors ' +
        'data-[state="checked"]:tw-border-transparent data-[state="indeterminate"]:tw-border-transparent ' +
        'disabled:tw-border-line-strong disabled:tw-bg-surface disabled:tw-cursor-not-allowed data-[state="checked"]:disabled:tw-bg-disabled ' +
        'data-[readonly="true"]:tw-pointer-events-none ' +
        `${FOCUS_OUTLINE}`,
    variants: {
        size: {
            default: 'tw-size-4',
            large: 'tw-size-5',
        },
        emphasis: {
            default:
                'data-[state="checked"]:tw-bg-highlight data-[state="checked"]:hover:tw-bg-highlight-hover data-[state="checked"]:active:tw-bg-highlight-active ' +
                'data-[state="indeterminate"]:tw-bg-highlight data-[state="indeterminate"]:hover:tw-bg-highlight-hover data-[state="indeterminate"]:active:tw-bg-highlight-active ',
            weak:
                'data-[state="checked"]:tw-bg-primary data-[state="checked"]:hover:tw-bg-primary-hover data-[state="checked"]:active:tw-bg-primary-active ' +
                'data-[state="indeterminate"]:tw-bg-primary data-[state="indeterminate"]:hover:tw-bg-primary-hover data-[state="indeterminate"]:active:tw-bg-primary-active ',
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
