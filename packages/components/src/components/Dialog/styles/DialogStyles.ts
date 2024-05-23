/* (c) Copyright Frontify Ltd., all rights reserved. */

import { sv } from '#/utilities/styleUtilities';

export const dialogContentStyles = sv({
    base: 'tw-group tw-block tw-fixed tw-left-2 tw-right-2 tw-top-1/2 sm:tw-left-1/2 sm:tw-transform sm:tw--translate-x-1/2 tw--translate-y-1/2 tw-bg-base tw-shadow-mid tw-z-20 has-[[data-dialog-layout-component]]:tw-grid tw-grid-rows-[auto_auto_minmax(0_,_1fr)_auto] sm:tw-grid-rows-[auto_minmax(0_,_1fr)_auto] tw-min-w-[--dialog-min-width] tw-max-w-[--dialog-max-width] tw-min-h-[--dialog-min-height] tw-max-h-[600px] tw-h-fit tw-overflow-hidden',
    variants: {
        rounded: {
            true: 'tw-rounded-lg',
            false: '',
        },
    },
    defaultVariants: {
        rounded: true,
    },
});

export const dialogUnderlayStyles = sv({
    base: 'tw-fixed tw-inset-0 tw-bg-box-neutral-mighty tw-z-10',
    variants: {
        showUnderlay: {
            true: 'tw-opacity-50',
            false: 'tw-opacity-0',
        },
    },
    defaultVariants: {
        showUnderlay: false,
    },
});

export const dialogSideContentStyles =
    'tw-col-start-1 tw-row-start-1 tw-row-span-1 sm:tw-row-span-3 tw-min-h-10 tw-min-w-10';

export const dialogHeaderStyles =
    'tw-flex tw-h-fit tw-justify-between tw-items-center tw-border-b tw-border-line tw-font-medium tw-p-[--flyout-padding] tw-col-start-1 sm:tw-col-start-2 tw-row-start-2 sm:tw-row-start-1 ' +
    'group-data-[dialog-spacing=compact]:tw-p-4 ' +
    'group-data-[dialog-spacing=comfortable]:tw-p-6 ' +
    'group-data-[dialog-spacing=spacious]:tw-p-10 ';

export const dialogFooterStyles =
    'tw-h-fit tw-border-t tw-border-line tw-font-medium tw-col-start-1 sm:tw-col-start-2 tw-row-start-4 sm:tw-row-start-3 ' +
    'group-data-[dialog-spacing=compact]:tw-p-4 ' +
    'group-data-[dialog-spacing=comfortable]:tw-p-6 ' +
    'group-data-[dialog-spacing=spacious]:tw-p-10 ';

export const dialogBodyStyles =
    'tw-overflow-hidden tw-flex tw-max-h-full tw-flex-col tw-gap-4 ' +
    'group-data-[dialog-spacing=compact]:tw-px-4 group-data-[dialog-spacing=compact]:tw-py-2 tw-col-start-1 sm:tw-col-start-2 tw-row-start-3 sm:tw-row-start-2 ' +
    'group-data-[dialog-spacing=comfortable]:tw-px-6 group-data-[dialog-spacing=comfortable]:tw-py-4 ' +
    'group-data-[dialog-spacing=spacious]:tw-px-10 group-data-[dialog-spacing=spacious]:tw-py-6 ';
