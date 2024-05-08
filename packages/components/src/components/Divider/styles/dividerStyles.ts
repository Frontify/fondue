/* (c) Copyright Frontify Ltd., all rights reserved. */

import { sv } from '#/utilities/styleUtilities';

export const dividerStyles = sv({
    base: 'tw-flex tw-self-stretch tw-justify-center ',
    variants: {
        direction: {
            horizontal: 'tw-flex-col tw-h-0 tw-border-t tw-w-full',
            vertical: 'tw-flex-row tw-w-0 tw-border-r tw-h-full ',
        },
        color: {
            weak: 'tw-border-line-weak',
            default: 'tw-border-line',
            strong: 'tw-bg-border-strong',
            'x-strong': 'tw-bg-border-x-strong',
        },
        style: {
            solid: 'tw-border-solid',
            dashed: 'tw-border-dashed',
            noline: 'tw-border-none',
        },
    },
    compoundVariants: [
        {
            direction: 'horizontal',
            padding: 'small',
            class: 'tw-my-9',
        },
        {
            direction: 'horizontal',
            padding: 'medium',
            class: 'tw-my-16',
        },
        {
            direction: 'horizontal',
            padding: 'large',
            class: 'tw-my-24',
        },
        {
            direction: 'vertical',
            padding: 'small',
            class: 'tw-mx-9',
        },
        {
            direction: 'vertical',
            padding: 'medium',
            class: 'tw-mx-16',
        },
        {
            direction: 'vertical',
            padding: 'large',
            class: 'tw-mx-24',
        },
    ],
    defaultVariants: {
        padding: 'medium',
        direction: 'horizontal',
        color: 'default',
        style: 'solid',
    },
});
