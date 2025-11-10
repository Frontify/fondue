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
            true: 'tw-text-box-disabled-inverse',
        },
    },
    compoundVariants: [
        {
            disabled: false,
            variant: 'default',
            emphasis: 'default',
            class:
                'tw-text-button-text ' +
                'group-hover:tw-text-button-text-hover ' +
                'group-active:tw-text-button-text-pressed',
        },
        {
            disabled: false,
            variant: 'default',
            emphasis: 'weak',
            class:
                'tw-text-button-text ' +
                'group-hover:tw-text-button-text-hover ' +
                'group-active:tw-text-button-text-pressed',
        },
        {
            disabled: false,
            variant: 'default',
            emphasis: 'strong',
            class:
                'tw-text-button-strong-icon ' +
                'group-hover:tw-text-button-strong-icon-hover ' +
                'group-active:tw-text-button-strong-text-pressed',
        },
        {
            disabled: false,
            variant: 'positive',
            emphasis: 'default',
            class:
                'tw-text-button-positive-text ' +
                'group-hover:tw-text-button-positive-text-hover ' +
                'group-active:tw-text-button-positive-text-pressed',
        },
        {
            disabled: false,
            variant: 'positive',
            emphasis: 'weak',
            class:
                'tw-text-button-positive-text ' +
                'group-hover:tw-text-button-positive-text-hover ' +
                'group-active:tw-text-button-positive-text-pressed',
        },
        {
            disabled: false,
            variant: 'positive',
            emphasis: 'strong',
            class:
                'tw-text-button-strong-positive-text ' +
                'group-hover:tw-text-button-strong-positive-text-hover ' +
                'group-active:tw-text-button-strong-positive-text-pressed',
        },
        {
            disabled: false,
            variant: 'negative',
            emphasis: 'default',
            class:
                'tw-text-button-negative-text ' +
                'group-hover:tw-text-button-negative-text-hover' +
                'group-active:tw-text-button-negative-text-pressed',
        },
        {
            disabled: false,
            variant: 'negative',
            emphasis: 'weak',
            class:
                'tw-text-button-negative-text ' +
                'group-hover:tw-text-button-negative-text-hover' +
                'group-active:tw-text-button-negative-text-pressed',
        },
        {
            disabled: false,
            variant: 'negative',
            emphasis: 'strong',
            class:
                'tw-text-button-strong-negative-text ' +
                'group-hover:tw-text-button-strong-negative-text-hover' +
                'group-active:tw-text-button-strong-negative-text-pressed',
        },
        {
            disabled: false,
            variant: 'danger',
            emphasis: 'default',
            class:
                'tw-text-button-negative-icon ' +
                'group-hover:tw-text-button-negative-icon-hover' +
                'group-active:tw-text-button-negative-icon-pressed',
        },
        {
            disabled: false,
            variant: 'danger',
            emphasis: 'weak',
            class:
                'tw-text-button-negative-icon ' +
                'group-hover:tw-text-button-negative-icon-hover' +
                'group-active:tw-text-button-negative-icon-pressed',
        },
        {
            disabled: false,
            variant: 'danger',
            emphasis: 'strong',
            class:
                'tw-text-button-danger-text ' +
                'group-hover:tw-text-button-danger-text-hover' +
                'group-active:tw-text-button-danger-text-pressed',
        },
        {
            disabled: false,
            variant: 'loud',
            emphasis: 'default',
            class:
                'tw-text-box-selected-inverse ' +
                'group-hover:tw-text-box-selected-inverse-hover' +
                'group-active:tw-text-box-selected-inverse-pressed',
        },
        {
            disabled: false,
            variant: 'loud',
            emphasis: 'weak',
            class:
                'tw-text-box-selected-inverse ' +
                'group-hover:tw-text-box-selected-inverse-hover' +
                'group-active:tw-text-box-selected-inverse-pressed',
        },
        {
            disabled: false,
            variant: 'loud',
            emphasis: 'strong',
            class:
                'tw-text-box-selected-strong-inverse ' +
                'group-hover:tw-text-box-selected-strong-inverse' +
                'group-active:tw-text-box-selected-strong-inverse',
        },
    ],
    defaultVariants: {
        emphasis: 'strong',
        variant: 'default',
        disabled: false,
    },
});
