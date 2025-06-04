/* (c) Copyright Frontify Ltd., all rights reserved. */

import { sv } from '#/utilities/styleUtilities';

export const lineStyles = sv({
    base: 'tw-self-stretch',
    variants: {
        style: {
            solid: 'tw-border-solid',
            dashed: 'tw-border-dashed',
            noline: 'tw-border-none',
        },
        color: {
            weak: 'tw-border-line-subtle',
            default: 'tw-border-line-mid',
            strong: 'tw-border-line-strong',
            'x-strong': 'tw-border-line-strong',
        },
        direction: {
            horizontal: 'tw-border-t tw-w-full',
            vertical: 'tw-border-r tw-min-h-4 tw-h-full',
        },
    },
    defaultVariants: {
        style: 'solid',
        color: 'default',
        direction: 'horizontal',
    },
});
