/* (c) Copyright Frontify Ltd., all rights reserved. */

import { sv } from '#/utilities/styleUtilities';

export const dividerStyles = sv({
    base: 'tw-flex tw-self-stretch tw-justify-center ',
    variants: {
        direction: {
            horizontal: 'tw-flex-col tw-h-0 tw-border-t tw-w-full',
            vertical: 'tw-flex-row tw-w-0 tw-border-e tw-h-full ',
        },
        color: {
            weak: 'tw-border-line-subtle',
            default: 'tw-border-line-mid',
            strong: 'tw-border-line-strong',
        },
        variant: {
            solid: 'tw-border-solid',
            dashed: 'tw-border-dashed',
            noline: 'tw-border-none',
        },
    },
    compoundVariants: [
        {
            direction: 'horizontal',
            padding: 'small',
            class: 'tw-my-4',
        },
        {
            direction: 'horizontal',
            padding: 'medium',
            class: 'tw-my-7',
        },
        {
            direction: 'horizontal',
            padding: 'large',
            class: 'tw-my-12',
        },
        {
            direction: 'vertical',
            padding: 'small',
            class: 'tw-mx-4',
        },
        {
            direction: 'vertical',
            padding: 'medium',
            class: 'tw-mx-7',
        },
        {
            direction: 'vertical',
            padding: 'large',
            class: 'tw-mx-12',
        },
    ],
    defaultVariants: {
        padding: 'medium',
        direction: 'horizontal',
        color: 'default',
        variant: 'solid',
    },
});
