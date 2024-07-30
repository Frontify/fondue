/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FOCUS_OUTLINE } from '#/utilities/focusStyle';
import { sv } from '#/utilities/styleUtilities';

export const buttonStyles = sv({
    base:
        'tw-group tw-border tw-relative tw-flex tw-flex-row tw-gap-2 tw-items-center tw-justify-center tw-cursor-pointer tw-font-body tw-font-medium ' +
        `${FOCUS_OUTLINE}`,
    variants: {
        disabled: {
            true: 'tw-not-allowed tw-pointer-events-none tw-border-transparent tw-text-box-disabled-inverse tw-bg-box-disabled',
        },
        rounding: {
            medium: 'tw-rounded',
            full: 'tw-rounded-full',
        },
        size: {
            small: 'tw-h-6 tw-text-body-small',
            medium: 'tw-h-9 tw-text-body-medium',
            large: 'tw-h-12 tw-text-body-large',
        },
        aspect: {
            square: 'tw-aspect-square tw-px-0',
            default: '',
        },
        hugWidth: {
            false: 'tw-w-full',
        },
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
    },
    compoundVariants: [
        {
            disabled: false,
            style: 'default',
            emphasis: 'default',
            class:
                'tw-bg-button-background tw-border-button-border ' +
                'hover:tw-bg-button-background-hover ' +
                'active:tw-bg-button-background-pressed',
        },
        {
            disabled: false,
            style: 'default',
            emphasis: 'weak',
            class:
                'tw-border-transparent ' +
                'hover:tw-bg-button-background-hover hover:tw-border-button-border ' +
                'active:tw-bg-button-background-pressed',
        },
        {
            disabled: false,
            style: 'default',
            emphasis: 'strong',
            class:
                'tw-bg-button-strong-background tw-border-button-strong-border ' +
                'hover:tw-bg-button-strong-background-hover ' +
                'active:tw-bg-button-strong-background-pressed',
        },
        {
            disabled: false,
            style: 'positive',
            emphasis: 'default',
            class:
                'tw-bg-button-positive-background tw-border-button-positive-border ' +
                'hover:tw-bg-button-positive-background-hover ' +
                'active:tw-bg-button-positive-background-pressed',
        },
        {
            disabled: false,
            style: 'positive',
            emphasis: 'weak',
            class:
                'tw-border-transparent ' +
                'hover:tw-bg-button-positive-background-hover hover:tw-border-button-positive-border ' +
                'active:tw-bg-button-positive-background-pressed',
        },
        {
            disabled: false,
            style: 'positive',
            emphasis: 'strong',
            class:
                'tw-bg-button-strong-positive-background tw-border-button-strong-positive-border ' +
                'hover:tw-bg-button-strong-positive-background-hover ' +
                'active:tw-bg-button-strong-positive-background-pressed',
        },
        {
            disabled: false,
            style: 'negative',
            emphasis: 'default',
            class:
                'tw-bg-button-negative-background tw-border-button-negative-border ' +
                'hover:tw-bg-button-negative-background-hover ' +
                'active:tw-bg-button-negative-background-pressed',
        },
        {
            disabled: false,
            style: 'negative',
            emphasis: 'weak',
            class:
                'tw-border-transparent ' +
                'hover:tw-bg-button-negative-background-hover hover:tw-border-button-negative-border ' +
                'active:tw-bg-button-negative-background-pressed',
        },
        {
            disabled: false,
            style: 'negative',
            emphasis: 'strong',
            class:
                'tw-bg-button-strong-negative-background tw-border-button-strong-negative-border ' +
                'hover:tw-bg-button-strong-negative-background-hover ' +
                'active:tw-bg-button-strong-negative-background-pressed',
        },
        {
            disabled: false,
            style: 'danger',
            emphasis: 'default',
            class:
                'tw-bg-button-background tw-border-button-border ' +
                'hover:tw-bg-button-background-hover ' +
                'active:tw-bg-button-background-pressed',
        },
        {
            disabled: false,
            style: 'danger',
            emphasis: 'weak',
            class:
                'tw-border-transparent ' +
                'hover:tw-bg-button-background-hover ' +
                'active:tw-bg-button-background-pressed',
        },
        {
            disabled: false,
            style: 'danger',
            emphasis: 'strong',
            class:
                'tw-bg-button-danger-background tw-border-button-danger-border ' +
                'hover:tw-bg-button-danger-background-hover ' +
                'active:tw-bg-button-danger-background-pressed',
        },
        {
            disabled: false,
            style: 'loud',
            emphasis: 'default',
            class:
                'tw-bg-box-selected tw-border-button-border ' +
                'hover:tw-bg-box-selected-hover ' +
                'active:tw-bg-box-selected-pressed ',
        },
        {
            disabled: false,
            style: 'loud',
            emphasis: 'weak',
            class: 'tw-border-transparent hover:tw-bg-box-selected-hover active:tw-bg-box-selected-pressed',
        },
        {
            disabled: false,
            style: 'loud',
            emphasis: 'strong',
            class:
                'tw-bg-box-selected-strong tw-border-box-selected-strong ' +
                'hover:tw-bg-box-selected-strong-hover ' +
                'active:tw-bg-box-selected-strong-pressed ',
        },
        {
            aspect: 'default',
            size: 'small',
            class: 'tw-px-2',
        },
        {
            aspect: 'default',
            size: 'medium',
            class: 'tw-px-4',
        },
        {
            aspect: 'default',
            size: 'large',
            class: 'tw-px-6',
        },
    ],
    defaultVariants: {
        style: 'default',
        emphasis: 'strong',
        size: 'medium',
        rounding: 'medium',
        hugWidth: true,
        aspect: 'default',
        disabled: false,
    },
});
