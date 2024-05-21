/* (c) Copyright Frontify Ltd., all rights reserved. */

import { sv } from '#/utilities/styleUtilities';

export const flyoutContentStyles = sv({
    base: 'tw-block tw-bg-base tw-shadow-mid tw-border tw-border-line tw-max-w-[--flyout-max-width] tw-group tw-w-screen',
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
    'group-data-[flyout-spacing=spacious]:tw-p-10';

export const flyoutFooterStyles =
    'tw-border-t tw-border-line tw-font-medium ' +
    'group-data-[flyout-spacing=compact]:tw-p-4 ' +
    'group-data-[flyout-spacing=comfortable]:tw-p-6 ' +
    'group-data-[flyout-spacing=spacious]:tw-p-10';

export const flyoutBodyStyles =
    'tw-flex tw-flex-col tw-gap-4 ' +
    'group-data-[flyout-spacing=compact]:tw-px-4 group-data-[flyout-spacing=compact]:tw-py-2 ' +
    'group-data-[flyout-spacing=comfortable]:tw-px-6 group-data-[flyout-spacing=comfortable]:tw-py-4 ' +
    'group-data-[flyout-spacing=spacious]:tw-px-10 group-data-[flyout-spacing=spacious]:tw-py-6' +
    '';
