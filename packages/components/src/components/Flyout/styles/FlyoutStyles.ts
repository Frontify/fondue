/* (c) Copyright Frontify Ltd., all rights reserved. */

import { sv } from '#/utilities/styleUtilities';

export const flyoutContentStyles = sv({
    base: 'tw-block tw-bg-base tw-shadow-mid tw-border tw-border-line',
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
