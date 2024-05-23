/* (c) Copyright Frontify Ltd., all rights reserved. */

import { sv } from '#/utilities/styleUtilities';

export const flyoutContentStyles = sv({
    base:
        'tw-block tw-bg-base tw-shadow-mid tw-border tw-border-line tw-w-full sm:tw-w-fit sm:tw-max-w-[--flyout-max-width] tw-group tw-mt-4 sm:tw-mt-0 ' +
        // Mobile view flyout -> dialog responsiveness
        '[body>[data-radix-popper-content-wrapper]:has(&)]:max-sm:tw-p-2 [body>[data-radix-popper-content-wrapper]:has(&)]:max-sm:tw-w-screen [body>[data-radix-popper-content-wrapper]:has(&)]:max-sm:!tw-translate-x-0 [body>[data-radix-popper-content-wrapper]:has(&)]:max-sm:!tw-translate-y-0 ' +
        // responsive dialog background element
        'before:tw-fixed tw-content-[" "] before:tw-top-0 before:tw-left-0 before:tw-h-screen before:tw-w-screen before:tw-bg-black before:tw-opacity-30 before:tw-z-[-1] before:tw-pointer-events-none sm:before:tw-hidden',
    variants: {
        rounded: {
            true: 'tw-rounded',
            false: '',
        },
    },
    defaultVariants: {
        rounded: true,
    },
});

export const flyoutHeaderStyles =
    'tw-flex tw-justify-between tw-items-center tw-border-b tw-border-line tw-font-medium tw-p-[--flyout-padding] ' +
    'group-data-[flyout-spacing=compact]:tw-p-4 ' +
    'group-data-[flyout-spacing=comfortable]:tw-p-6 ' +
    'group-data-[flyout-spacing=spacious]:tw-p-10 ';

export const flyoutFooterStyles =
    'tw-border-t tw-border-line tw-font-medium ' +
    'group-data-[flyout-spacing=compact]:tw-p-4 ' +
    'group-data-[flyout-spacing=comfortable]:tw-p-6 ' +
    'group-data-[flyout-spacing=spacious]:tw-p-10 ';

export const flyoutBodyStyles =
    'tw-flex tw-flex-col tw-gap-4 ' +
    'group-data-[flyout-spacing=compact]:tw-px-4 group-data-[flyout-spacing=compact]:tw-py-2 ' +
    'group-data-[flyout-spacing=comfortable]:tw-px-6 group-data-[flyout-spacing=comfortable]:tw-py-4 ' +
    'group-data-[flyout-spacing=spacious]:tw-px-10 group-data-[flyout-spacing=spacious]:tw-py-6 ';
