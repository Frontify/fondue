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
            true: 'tw-text-box-disabled-inverse',
        },
    },
    compoundVariants: [
        {
            disabled: false,
            variant: 'default',
            emphasis: 'default',
            class:
                '[&_svg]:tw-text-button-icon ' +
                'group-hover:[&_svg]:tw-text-button-icon-hover ' +
                'group-active:[&_svg]:tw-text-button-icon-pressed [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'default',
            emphasis: 'weak',
            class:
                '[&_svg]:tw-text-button-icon ' +
                'group-hover:[&_svg]:tw-text-button-icon-hover ' +
                'group-active:[&_svg]:tw-text-button-icon-pressed [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'default',
            emphasis: 'strong',
            class:
                '[&_svg]:tw-text-button-strong-icon ' +
                'group-hover:[&_svg]:tw-text-button-strong-icon-hover ' +
                'group-active:[&_svg]:tw-text-button-strong-icon-pressed [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'positive',
            emphasis: 'default',
            class:
                '[&_svg]:tw-text-button-positive-icon ' +
                'group-hover:[&_svg]:tw-text-button-positive-icon-hover ' +
                'group-active:[&_svg]:tw-text-button-positive-icon-pressed [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'positive',
            emphasis: 'weak',
            class:
                '[&_svg]:tw-text-button-strong-positive-icon ' +
                'group-hover:[&_svg]:tw-text-button-strong-positive-icon-hover' +
                'group-active:[&_svg]:tw-text-button-strong-positive-icon-pressed [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'positive',
            emphasis: 'strong',
            class:
                '[&_svg]:tw-text-button-strong-positive-icon ' +
                'group-hover:[&_svg]:tw-text-button-strong-positive-icon-hover ' +
                'group-active:[&_svg]:tw-text-button-strong-positive-icon-pressed [&_svg]:tw-leading-none',
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
                '[&_svg]:tw-text-button-negative-icon ' +
                'group-hover:[&_svg]:tw-text-button-negative-icon-hover' +
                'group-active:[&_svg]:tw-text-button-negative-icon-pressed [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'negative',
            emphasis: 'strong',
            class:
                '[&_svg]:tw-text-button-strong-negative-icon ' +
                'group-hover:[&_svg]:tw-text-button-strong-negative-icon-hover' +
                'group-active:[&_svg]:tw-text-button-strong-negative-icon-pressed [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'danger',
            emphasis: 'default',
            class:
                '[&_svg]:tw-text-button-negative-icon ' +
                'group-hover:[&_svg]:tw-text-button-negative-icon-hover' +
                'group-active:[&_svg]:tw-text-button-negative-icon-pressed [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'danger',
            emphasis: 'weak',
            class:
                '[&_svg]:tw-text-button-negative-icon ' +
                'group-hover:[&_svg]:tw-text-button-negative-icon-hover' +
                'group-active:[&_svg]:tw-text-button-negative-icon-pressed [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'danger',
            emphasis: 'strong',
            class:
                '[&_svg]:tw-text-button-danger-icon ' +
                'group-hover:[&_svg]:tw-text-button-danger-icon-hover' +
                'group-active:[&_svg]:tw-text-button-danger-icon-pressed [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'loud',
            emphasis: 'default',
            class:
                '[&_svg]:tw-text-box-selected-inverse ' +
                'group-hover:[&_svg]:tw-text-box-selected-inverse-hover' +
                'group-active:[&_svg]:tw-text-box-selected-inverse-pressed [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'loud',
            emphasis: 'weak',
            class:
                '[&_svg]:tw-text-box-selected-inverse ' +
                'group-hover:[&_svg]:tw-text-box-selected-inverse-hover' +
                'group-active:[&_svg]:tw-text-box-selected-inverse-pressed [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            variant: 'loud',
            emphasis: 'strong',
            class:
                '[&_svg]:tw-text-box-selected-strong-inverse ' +
                'group-hover:[&_svg]:tw-text-box-selected-strong-inverse' +
                'group-active:[&_svg]:tw-text-box-selected-strong-inverse [&_svg]:tw-leading-none',
        },
    ],
    defaultVariants: {
        emphasis: 'strong',
        variant: 'default',
        disabled: false,
    },
});
