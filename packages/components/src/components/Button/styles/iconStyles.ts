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
            true: 'tw-text-disabled-on-disabled',
        },
    },
    compoundVariants: [
        {
            disabled: false,
            variant: 'default',
            emphasis: 'default',
            class:
                '[&_svg]:tw-text-primary ' +
                'group-hover:[&_svg]:tw-text-primary' +
                'group-active:[&_svg]:tw-text-primary [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'default',
            emphasis: 'weak',
            class:
                '[&_svg]:tw-text-primary ' +
                'group-hover:[&_svg]:tw-text-primary ' +
                'group-active:[&_svg]:tw-text-primary [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'default',
            emphasis: 'strong',
            class:
                '[&_svg]:tw-text-primary-on-primary ' +
                'group-hover:[&_svg]:tw-text-primary-on-primary ' +
                'group-active:[&_svg]:tw-text-primary-on-primary [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'positive',
            emphasis: 'default',
            class:
                '[&_svg]:tw-text-container-success-on-success-container ' +
                'group-hover:[&_svg]:tw-text-container-success-on-success-container ' +
                'group-active:[&_svg]:tw-text-container-success-on-success-container [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'positive',
            emphasis: 'weak',
            class:
                '[&_svg]:tw-text-success-on-success ' +
                'group-hover:[&_svg]:tw-text-success-on-success' +
                'group-active:[&_svg]:tw-text-success-on-success [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'positive',
            emphasis: 'strong',
            class:
                '[&_svg]:tw-text-success-on-success' +
                'group-hover:[&_svg]:tw-text-success-on-success ' +
                'group-active:[&_svg]:tw-text-success-on-success [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'negative',
            emphasis: 'default',
            class:
                '[&_svg]:tw-text-button-negative-icon ' +
                'group-hover:[&_svg]:tw-text-button-negative-icon-hover' +
                'group-active:[&_svg]:tw-text-button-negative-icon-pressed [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'negative',
            emphasis: 'weak',
            class:
                '[&_svg]:tw-text-container-error-on-error-container ' +
                'group-hover:[&_svg]:tw-text-container-error-on-error-container ' +
                'group-active:[&_svg]:tw-text-container-error-on-error-container [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'negative',
            emphasis: 'strong',
            class:
                '[&_svg]:tw-text-error-on-error ' +
                'group-hover:[&_svg]:tw-text-error-on-error' +
                'group-active:[&_svg]:tw-text-error-on-error [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'danger',
            emphasis: 'default',
            class:
                '[&_svg]:tw-text-container-error-on-error-container ' +
                'group-hover:[&_svg]:tw-text-container-error-on-error-container ' +
                'group-active:[&_svg]:tw-text-container-error-on-error-container [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'danger',
            emphasis: 'weak',
            class:
                '[&_svg]:tw-text-container-error-on-error-container ' +
                'group-hover:[&_svg]:tw-text-container-error-on-error-container ' +
                'group-active:[&_svg]:tw-text-container-error-on-error-container [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'danger',
            emphasis: 'strong',
            class:
                '[&_svg]:tw-text-error-on-error ' +
                'group-hover:[&_svg]:tw-text-error-on-error' +
                'group-active:[&_svg]:tw-text-error-on-error [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'loud',
            emphasis: 'default',
            class:
                '[&_svg]:tw-text-container-highlight-on-highlight-container ' +
                'group-hover:[&_svg]:tw-text-container-highlight-on-highlight-container ' +
                'group-active:[&_svg]:tw-text-container-highlight-on-highlight-container [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'loud',
            emphasis: 'weak',
            class:
                '[&_svg]:tw-text-container-highlight-on-highlight-container ' +
                'group-hover:[&_svg]:tw-text-container-highlight-on-highlight-container ' +
                'group-active:[&_svg]:tw-text-container-highlight-on-highlight-container [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'loud',
            emphasis: 'strong',
            class:
                '[&_svg]:tw-text-highlight-on-highlight ' +
                'group-hover:[&_svg]:tw-text-highlight-on-highlight ' +
                'group-active:[&_svg]:tw-text-highlight-on-highlight [&_svg]:tw-leading-none',
        },
    ],
    defaultVariants: {
        emphasis: 'strong',
        variant: 'default',
        disabled: false,
    },
});
