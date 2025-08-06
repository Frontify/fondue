/* (c) Copyright Frontify Ltd., all rights reserved. */

import { sv } from '#/utilities/styleUtilities';

export const textStyles = sv({
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
            true: 'tw-text-container-disabled-on-disabled-container',
        },
    },
    compoundVariants: [
        {
            disabled: false,
            variant: 'default',
            emphasis: 'default',
            class: 'tw-text-primary hover:tw-text-primary-hover active:tw-text-primary-pressed',
        },
        {
            disabled: false,
            variant: 'default',
            emphasis: 'weak',
            class: 'tw-text-primary hover:tw-text-primary-hover active:tw-text-primary-pressed',
        },
        {
            disabled: false,
            variant: 'default',
            emphasis: 'strong',
            class:
                'tw-text-primary-on-primary ' +
                'hover:tw-text-primary-on-primary-hover ' +
                'active:tw-text-primary-on-primary-pressed',
        },
        {
            disabled: false,
            variant: 'positive',
            emphasis: 'default',
            class:
                'tw-text-container-success-on-success-container ' +
                'hover:tw-text-container-success-on-success-container ' +
                'active:tw-text-container-success-on-success-container-pressed',
        },
        {
            disabled: false,
            variant: 'positive',
            emphasis: 'weak',
            class:
                'tw-text-success ' +
                'hover:tw-text-container-success-on-success-container ' +
                'active:tw-text-container-success-on-success-container',
        },
        {
            disabled: false,
            variant: 'positive',
            emphasis: 'strong',
            class:
                'tw-text-success-on-success ' +
                'hover:tw-text-success-on-success ' +
                'active:tw-text-success-on-success',
        },
        {
            disabled: false,
            variant: 'negative',
            emphasis: 'default',
            class:
                'tw-text-container-error-on-error-container ' +
                'hover:tw-text-container-error-on-error-container ' +
                'active:tw-text-container-error-on-error-container',
        },
        {
            disabled: false,
            variant: 'negative',
            emphasis: 'weak',
            class:
                'tw-text-error ' +
                'hover:tw-text-container-error-on-error-container ' +
                'active:tw-text-container-error-on-error-container',
        },
        {
            disabled: false,
            variant: 'negative',
            emphasis: 'strong',
            class: 'tw-text-error-on-error hover:tw-text-error-on-error active:tw-text-error-on-error',
        },
        {
            disabled: false,
            variant: 'danger',
            emphasis: 'default',
            class: 'tw-text-error-on-error hover:tw-text-error-on-error active:tw-text-error-on-error',
        },
        {
            disabled: false,
            variant: 'danger',
            emphasis: 'weak',
            class: 'tw-text-error-on-error hover:tw-text-error-on-error active:tw-text-error-on-error',
        },
        {
            disabled: false,
            variant: 'danger',
            emphasis: 'strong',
            class: 'tw-text-error-on-error hover:tw-text-error-on-error active:tw-text-error-on-error',
        },
        {
            disabled: false,
            variant: 'loud',
            emphasis: 'default',
            class:
                'tw-text-container-highlight-on-highlight-container ' +
                'hover:tw-text-container-highlight-on-highlight-container ' +
                'active:tw-text-container-highlight-on-highlight-container',
        },
        {
            disabled: false,
            variant: 'loud',
            emphasis: 'weak',
            class:
                'tw-text-highlight ' +
                'hover:tw-text-container-highlight-on-highlight-container ' +
                'active:tw-text-container-highlight-on-highlight-container',
        },
        {
            disabled: false,
            variant: 'loud',
            emphasis: 'strong',
            class:
                'tw-text-highlight-on-highlight ' +
                'hover:tw-text-highlight-on-highlight ' +
                'active:tw-text-highlight-on-highlight',
        },
    ],
    defaultVariants: {
        emphasis: 'strong',
        variant: 'default',
        disabled: false,
    },
});
