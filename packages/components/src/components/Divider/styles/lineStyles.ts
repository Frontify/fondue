/* (c) Copyright Frontify Ltd., all rights reserved. */

import { sv } from '#/utilities/styleUtilities';

export const lineStyles = sv({
    base: 'tw-self-stretch tw-m-0',
    variants: {
        style: {
            solid: 'tw-border-solid',
            dashed: 'tw-border-dashed',
            noline: 'tw-border-none',
        },
        color: {
            weak: 'tw-border-line-weak',
            default: 'tw-border-line',
            strong: 'tw-border-line-strong',
            'x-strong': 'tw-border-line-x-strong',
        },
        direction: {
            horizontal: 'tw-border-t-[1px] tw-w-full',
            vertical: 'tw-border-r-[1px] tw-min-h-4 tw-h-full',
        },
    },
    defaultVariants: {
        style: 'solid',
        color: 'default',
        direction: 'horizontal',
    },
});
