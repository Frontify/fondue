/* (c) Copyright Frontify Ltd., all rights reserved. */

import { sv } from '@utilities/styleUtilities';

export const iconStyles = sv({
    variants: {
        iconSpacing: {
            none: '',
            small: 'tw--ml-0.5 tw-mr-1 ',
            medium: 'tw--ml-1 tw-mr-1.5 ',
            large: 'tw--ml-1 tw-mr-2 ',
        },
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
    },
    compoundVariants: [
        {
            style: 'default',
            emphasis: 'default',
            class:
                'tw-text-button-icon ' +
                'group-hover:tw-text-button-icon-hover ' +
                'group-active:tw-text-button-icon-pressed tw-leading-none ',
        },
        {
            style: 'default',
            emphasis: 'weak',
            class:
                'tw-text-button-icon ' +
                'group-hover:tw-text-button-icon-hover ' +
                'group-active:tw-text-button-icon-pressed tw-leading-none ',
        },
        {
            style: 'default',
            emphasis: 'strong',
            class:
                'tw-text-button-strong-icon ' +
                'group-hover:tw-text-button-strong-icon-hover ' +
                'group-active:tw-text-button-strong-icon-pressed tw-leading-none ',
        },
        {
            style: 'positive',
            emphasis: 'default',
            class:
                'tw-text-button-positive-icon ' +
                'group-hover:tw-text-button-positive-icon-hover ' +
                'group-active:tw-text-button-positive-icon-pressed tw-leading-none ',
        },
        {
            style: 'positive',
            emphasis: 'weak',
            class:
                'tw-text-button-strong-positive-icon ' +
                'group-hover:tw-text-button-strong-positive-icon-hover' +
                'group-active:tw-text-button-strong-positive-icon-pressed tw-leading-none ',
        },
        {
            style: 'positive',
            emphasis: 'strong',
            class:
                'tw-text-button-strong-positive-icon ' +
                'group-hover:tw-text-button-strong-positive-icon-hover ' +
                'group-active:tw-text-button-strong-positive-icon-pressed tw-leading-none ',
        },
        {
            style: 'negative',
            emphasis: 'default',
            class:
                'tw-text-button-negative-icon ' +
                'group-hover:tw-text-button-negative-icon-hover' +
                'group-active:tw-text-button-negative-icon-pressed tw-leading-none ',
        },
        {
            style: 'negative',
            emphasis: 'weak',
            class:
                'tw-text-button-negative-icon ' +
                'group-hover:tw-text-button-negative-icon-hover' +
                'group-active:tw-text-button-negative-icon-pressed tw-leading-none ',
        },
        {
            style: 'negative',
            emphasis: 'strong',
            class:
                'tw-text-button-strong-negative-icon ' +
                'group-hover:tw-text-button-strong-negative-icon-hover' +
                'group-active:tw-text-button-strong-negative-icon-pressed tw-leading-none ',
        },
        {
            style: 'danger',
            emphasis: 'default',
            class:
                'tw-text-button-negative-icon ' +
                'group-hover:tw-text-button-negative-icon-hover' +
                'group-active:tw-text-button-negative-icon-pressed tw-leading-none ',
        },
        {
            style: 'danger',
            emphasis: 'weak',
            class:
                'tw-text-button-negative-icon ' +
                'group-hover:tw-text-button-negative-icon-hover' +
                'group-active:tw-text-button-negative-icon-pressed tw-leading-none ',
        },
        {
            style: 'danger',
            emphasis: 'strong',
            class:
                'tw-text-button-danger-icon ' +
                'group-hover:tw-text-button-danger-icon-hover' +
                'group-active:tw-text-button-danger-icon-pressed tw-leading-none ',
        },
        {
            style: 'loud',
            emphasis: 'default',
            class:
                'tw-text-box-selected-inverse ' +
                'group-hover:tw-text-box-selected-inverse-hover' +
                'group-active:tw-text-box-selected-inverse-pressed tw-leading-none ',
        },
        {
            style: 'loud',
            emphasis: 'weak',
            class:
                'tw-text-box-selected-inverse ' +
                'group-hover:tw-text-box-selected-inverse-hover' +
                'group-active:tw-text-box-selected-inverse-pressed tw-leading-none ',
        },
        {
            style: 'loud',
            emphasis: 'strong',
            class:
                'tw-text-box-selected-strong-inverse ' +
                'group-hover:tw-text-box-selected-strong-inverse' +
                'group-active:tw-text-box-selected-strong-inverse tw-leading-none ',
        },
    ],
});
