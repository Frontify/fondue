/* (c) Copyright Frontify Ltd., all rights reserved. */

import { sv } from '#/utilities/styleUtilities';

export const iconStyles = sv({
    variants: {
        emphasis: {
            default: '',
            weak: '',
            strong: '',
        },
        style: {
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
            style: 'default',
            emphasis: 'default',
            class:
                '[&_svg]:tw-text-button-icon ' +
                'group-hover:[&_svg]:tw-text-button-icon-hover ' +
                'group-active:[&_svg]:tw-text-button-icon-pressed [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            style: 'default',
            emphasis: 'weak',
            class:
                '[&_svg]:tw-text-button-icon ' +
                'group-hover:[&_svg]:tw-text-button-icon-hover ' +
                'group-active:[&_svg]:tw-text-button-icon-pressed [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            style: 'default',
            emphasis: 'strong',
            class:
                '[&_svg]:tw-text-button-strong-icon ' +
                'group-hover:[&_svg]:tw-text-button-strong-icon-hover ' +
                'group-active:[&_svg]:tw-text-button-strong-icon-pressed [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            style: 'positive',
            emphasis: 'default',
            class:
                '[&_svg]:tw-text-button-positive-icon ' +
                'group-hover:[&_svg]:tw-text-button-positive-icon-hover ' +
                'group-active:[&_svg]:tw-text-button-positive-icon-pressed [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            style: 'positive',
            emphasis: 'weak',
            class:
                '[&_svg]:tw-text-button-strong-positive-icon ' +
                'group-hover:[&_svg]:tw-text-button-strong-positive-icon-hover' +
                'group-active:[&_svg]:tw-text-button-strong-positive-icon-pressed [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            style: 'positive',
            emphasis: 'strong',
            class:
                '[&_svg]:tw-text-button-strong-positive-icon ' +
                'group-hover:[&_svg]:tw-text-button-strong-positive-icon-hover ' +
                'group-active:[&_svg]:tw-text-button-strong-positive-icon-pressed [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            style: 'negative',
            emphasis: 'default',
            class:
                '[&_svg]:tw-text-button-negative-icon ' +
                'group-hover:[&_svg]:tw-text-button-negative-icon-hover' +
                'group-active:[&_svg]:tw-text-button-negative-icon-pressed [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            style: 'negative',
            emphasis: 'weak',
            class:
                '[&_svg]:tw-text-button-negative-icon ' +
                'group-hover:[&_svg]:tw-text-button-negative-icon-hover' +
                'group-active:[&_svg]:tw-text-button-negative-icon-pressed [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            style: 'negative',
            emphasis: 'strong',
            class:
                '[&_svg]:tw-text-button-strong-negative-icon ' +
                'group-hover:[&_svg]:tw-text-button-strong-negative-icon-hover' +
                'group-active:[&_svg]:tw-text-button-strong-negative-icon-pressed [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            style: 'danger',
            emphasis: 'default',
            class:
                '[&_svg]:tw-text-button-negative-icon ' +
                'group-hover:[&_svg]:tw-text-button-negative-icon-hover' +
                'group-active:[&_svg]:tw-text-button-negative-icon-pressed [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            style: 'danger',
            emphasis: 'weak',
            class:
                '[&_svg]:tw-text-button-negative-icon ' +
                'group-hover:[&_svg]:tw-text-button-negative-icon-hover' +
                'group-active:[&_svg]:tw-text-button-negative-icon-pressed [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            style: 'danger',
            emphasis: 'strong',
            class:
                '[&_svg]:tw-text-button-danger-icon ' +
                'group-hover:[&_svg]:tw-text-button-danger-icon-hover' +
                'group-active:[&_svg]:tw-text-button-danger-icon-pressed [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            style: 'loud',
            emphasis: 'default',
            class:
                '[&_svg]:tw-text-box-selected-inverse ' +
                'group-hover:[&_svg]:tw-text-box-selected-inverse-hover' +
                'group-active:[&_svg]:tw-text-box-selected-inverse-pressed [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            style: 'loud',
            emphasis: 'weak',
            class:
                '[&_svg]:tw-text-box-selected-inverse ' +
                'group-hover:[&_svg]:tw-text-box-selected-inverse-hover' +
                'group-active:[&_svg]:tw-text-box-selected-inverse-pressed [&_svg]:tw-leading-none',
        },
        {
            disabled: false,
            style: 'loud',
            emphasis: 'strong',
            class:
                '[&_svg]:tw-text-box-selected-strong-inverse ' +
                'group-hover:[&_svg]:tw-text-box-selected-strong-inverse' +
                'group-active:[&_svg]:tw-text-box-selected-strong-inverse [&_svg]:tw-leading-none',
        },
    ],
    defaultVariants: {
        emphasis: 'strong',
        style: 'default',
        disabled: false,
    },
});
