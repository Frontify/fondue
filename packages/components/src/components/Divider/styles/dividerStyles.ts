/* (c) Copyright Frontify Ltd., all rights reserved. */

import { sv } from '#/utilities/styleUtilities';

export const dividerStyles = sv({
    base: 'tw-flex tw-self-stretch tw-justify-center ',
    variants: {
        direction: {
            horizontal: 'tw-flex-col tw-h-1 ',
            vertical: 'tw-flex-row tw-w-1 ',
        },
    },
    compoundVariants: [
        {
            direction: 'horizontal',
            padding: 'small',
            class: 'tw-h-9',
        },
        {
            direction: 'horizontal',
            padding: 'medium',
            class: 'tw-h-16',
        },
        {
            direction: 'horizontal',
            padding: 'large',
            class: 'tw-h-24',
        },
        {
            direction: 'vertical',
            padding: 'small',
            class: 'tw-w-9',
        },
        {
            direction: 'vertical',
            padding: 'medium',
            class: 'tw-w-16',
        },
        {
            direction: 'vertical',
            padding: 'large',
            class: 'tw-w-24',
        },
    ],
    defaultVariants: {
        padding: 'medium',
        direction: 'horizontal',
    },
});
