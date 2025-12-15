/* (c) Copyright Frontify Ltd., all rights reserved. */

import { sv } from '#/utilities/styleUtilities';

export const iconStyles = sv({
    variants: {
        emphasis: {
            default: '',
            weak: '',
            strong: '',
        },
        variant: {
            default: '',
            positive: '',
            negative: '',
            danger: '',
            loud: '',
        },
        disabled: {
            true: 'tw-text-container-disabled-on-disabled-container forced-colors:tw-text-[GrayText]',
        },
    },
    compoundVariants: [
        {
            disabled: false,
            variant: 'default',
            emphasis: 'default',
            class:
                '[&_svg]:tw-text-primary [&_svg]:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:hover:tw-text-primary [&_svg]:hover:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:active:tw-text-primary [&_svg]:active:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'default',
            emphasis: 'weak',
            class:
                '[&_svg]:tw-text-primary [&_svg]:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:hover:tw-text-primary [&_svg]:hover:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:active:tw-text-primary [&_svg]:active:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'default',
            emphasis: 'strong',
            class:
                '[&_svg]:tw-text-primary-on-primary [&_svg]:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:hover:tw-text-primary-on-primary [&_svg]:hover:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:active:tw-text-primary-on-primary [&_svg]:active:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'positive',
            emphasis: 'default',
            class:
                '[&_svg]:tw-text-container-success-on-success-container [&_svg]:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:hover:tw-text-container-success-on-success-container [&_svg]:hover:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:active:tw-text-container-success-on-success-container [&_svg]:active:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'positive',
            emphasis: 'weak',
            class:
                '[&_svg]:tw-text-success [&_svg]:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:hover:tw-text-container-success-on-success-container [&_svg]:hover:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:active:tw-text-container-success-on-success-container [&_svg]:active:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'positive',
            emphasis: 'strong',
            class:
                '[&_svg]:tw-text-success-on-success [&_svg]:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:hover:tw-text-success-on-success [&_svg]:hover:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:active:tw-text-success-on-success [&_svg]:active:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'negative',
            emphasis: 'default',
            class:
                '[&_svg]:tw-text-container-error-on-error-container [&_svg]:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:hover:tw-text-button-negative-icon-hover [&_svg]:hover:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:active:tw-text-button-negative-icon-pressed [&_svg]:active:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'negative',
            emphasis: 'weak',
            class:
                '[&_svg]:tw-text-error [&_svg]:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:hover:tw-text-container-error-on-error-container [&_svg]:hover:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:active:tw-text-container-error-on-error-container [&_svg]:active:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'negative',
            emphasis: 'strong',
            class:
                '[&_svg]:tw-text-error-on-error [&_svg]:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:hover:tw-text-error-on-error [&_svg]:hover:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:active:tw-text-error-on-error [&_svg]:active:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'danger',
            emphasis: 'default',
            class:
                '[&_svg]:tw-text-error-on-error [&_svg]:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:hover:tw-text-error-on-error [&_svg]:hover:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:active:tw-text-error-on-error [&_svg]:active:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'danger',
            emphasis: 'weak',
            class:
                '[&_svg]:tw-text-error-on-error [&_svg]:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:hover:tw-text-error-on-error [&_svg]:hover:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:active:tw-text-error-on-error [&_svg]:active:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'danger',
            emphasis: 'strong',
            class:
                '[&_svg]:tw-text-error-on-error [&_svg]:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:hover:tw-text-error-on-error [&_svg]:hover:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:active:tw-text-error-on-error [&_svg]:active:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'loud',
            emphasis: 'default',
            class:
                '[&_svg]:tw-text-container-highlight-on-highlight-container [&_svg]:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:hover:tw-text-container-highlight-on-highlight-container [&_svg]:hover:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:active:tw-text-container-highlight-on-highlight-container [&_svg]:active:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'loud',
            emphasis: 'weak',
            class:
                '[&_svg]:tw-text-highlight [&_svg]:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:hover:tw-text-container-highlight-on-highlight-container [&_svg]:hover:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:active:tw-text-container-highlight-on-highlight-container [&_svg]:active:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'loud',
            emphasis: 'strong',
            class:
                '[&_svg]:tw-text-highlight-on-highlight [&_svg]:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:hover:tw-text-highlight-on-highlight [&_svg]:hover:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:active:tw-text-highlight-on-highlight [&_svg]:active:forced-colors:tw-text-[CanvasText] ' +
                '[&_svg]:tw-leading-none',
        },
    ],
    defaultVariants: {
        emphasis: 'strong',
        variant: 'default',
        disabled: false,
    },
});
