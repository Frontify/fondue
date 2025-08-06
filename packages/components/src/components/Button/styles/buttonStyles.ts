/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FOCUS_OUTLINE } from '#/utilities/focusStyle';
import { sv } from '#/utilities/styleUtilities';

export const buttonStyles = sv({
    base:
        'tw-group tw-relative tw-flex tw-flex-row tw-gap-2 tw-items-center tw-justify-center tw-cursor-pointer tw-font-primary tw-font-medium tw-box-border tw-whitespace-nowrap tw-transition-colors ' +
        `${FOCUS_OUTLINE}`,
    variants: {
        disabled: {
            true: 'tw-cursor-not-allowed tw-pointer-events-none tw-bg-container-disabled',
        },
        rounding: {
            medium: 'tw-rounded-medium',
            full: 'tw-rounded-full',
        },
        size: {
            small: 'tw-h-6 tw-body-small',
            medium: 'tw-h-9 tw-body-medium',
            large: 'tw-h-12 tw-body-large',
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
            variant: 'default',
            emphasis: 'default',
            class:
                'tw-bg-container-secondary ' +
                'hover:tw-bg-container-secondary-hover ' +
                'active:tw-bg-container-secondary-active',
        },
        {
            disabled: false,
            variant: 'default',
            emphasis: 'weak',
            class: 'hover:tw-bg-container-secondary-hover active:tw-bg-container-secondary-active',
        },
        {
            disabled: false,
            variant: 'default',
            emphasis: 'strong',
            class: 'tw-bg-primary hover:tw-bg-primary-hover active:tw-bg-primary-active',
        },
        {
            disabled: false,
            variant: 'positive',
            emphasis: 'default',
            class:
                'tw-bg-container-success ' +
                'hover:tw-bg-container-success-hover ' +
                'active:tw-bg-container-success-active',
        },
        {
            disabled: false,
            variant: 'positive',
            emphasis: 'weak',
            class: 'hover:tw-bg-container-success-hover active:tw-bg-container-success-active',
        },
        {
            disabled: false,
            variant: 'positive',
            emphasis: 'strong',
            class: 'tw-bg-success hover:tw-bg-success-hover active:tw-bg-success-active',
        },
        {
            disabled: false,
            variant: 'negative',
            emphasis: 'default',
            class: 'tw-bg-container-error hover:tw-bg-container-error-hover active:tw-bg-container-error-active',
        },
        {
            disabled: false,
            variant: 'negative',
            emphasis: 'weak',
            class: 'hover:tw-bg-container-error-hover active:tw-bg-container-error-active',
        },
        {
            disabled: false,
            variant: 'negative',
            emphasis: 'strong',
            class: 'tw-bg-error hover:tw-bg-error-hover active:tw-bg-error-active',
        },
        {
            disabled: false,
            variant: 'danger',
            emphasis: 'default',
            class: 'tw-bg-error hover:tw-bg-error-hover active:tw-bg-error-active',
        },
        {
            disabled: false,
            variant: 'danger',
            emphasis: 'weak',
            class: 'tw-bg-error hover:tw-bg-error-hover active:tw-bg-error-active',
        },
        {
            disabled: false,
            variant: 'danger',
            emphasis: 'strong',
            class: 'tw-bg-error hover:tw-bg-error-hover active:tw-bg-error-active',
        },
        {
            disabled: false,
            variant: 'loud',
            emphasis: 'default',
            class: 'tw-bg-container-highlight hover:tw-bg-container-highlight-hover active:tw-bg-container-highlight-active',
        },
        {
            disabled: false,
            variant: 'loud',
            emphasis: 'weak',
            class: 'tw-border-transparent hover:tw-bg-container-highlight-hover active:tw-bg-container-highlight-active',
        },
        {
            disabled: false,
            variant: 'loud',
            emphasis: 'strong',
            class: 'tw-bg-highlight hover:tw-bg-highlight-hover active:tw-bg-highlight-active',
        },
        {
            aspect: 'default',
            size: 'small',
            class: 'tw-px-3 tw-gap-1.5',
        },
        {
            aspect: 'default',
            size: 'medium',
            class: 'tw-px-4 tw-gap-1.5',
        },
        {
            aspect: 'default',
            size: 'large',
            class: 'tw-px-6 tw-gap-2',
        },
    ],
    defaultVariants: {
        variant: 'default',
        emphasis: 'strong',
        size: 'medium',
        rounding: 'medium',
        hugWidth: true,
        aspect: 'default',
        disabled: false,
    },
});
