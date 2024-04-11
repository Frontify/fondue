import { tv } from 'tailwind-variants';

export const buttonStyles = tv({
    base: 'tw-group tw-border tw-box-box tw-relative tw-flex tw-items-center tw-justify-center tw-cursor-pointer tw-outline-none tw-font-body tw-font-medium',
    variants: {
        disabled: {
            true: 'tw-not-allowed tw-pointer-events-none tw-border-transparent tw-text-box-disabled-inverse tw-bg-box-disabled ',
        },
        rounding: {
            medium: 'tw-rounded',
            full: 'tw-rounded-full',
        },
        size: {
            small: 'tw-px-2 tw-h-6 tw-text-body-small',
            medium: 'tw-px-4 tw-h-9 tw-text-body-medium ',
            large: 'tw-px-6 tw-h-12 tw-text-body-large ',
        },
        iconOnly: {
            true: 'tw-aspect-square tw-px-0',
        },
        hugWidth: {
            false: 'tw-w-full',
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
                'tw-bg-button-background tw-border-button-border ' +
                'hover:tw-bg-button-background-hover ' +
                'active:tw-bg-button-background-pressed ',
        },
        {
            style: 'default',
            emphasis: 'weak',
            class:
                'tw-border-transparent ' +
                'hover:tw-bg-button-background-hover hover:tw-border-button-border ' +
                'active:tw-bg-button-background-pressed ',
        },
        {
            style: 'default',
            emphasis: 'strong',
            class:
                'tw-bg-button-strong-background tw-border-button-strong-border ' +
                'hover:tw-bg-button-strong-background-hover ' +
                'active:tw-bg-button-strong-background-pressed ',
        },
        {
            style: 'positive',
            emphasis: 'default',
            class:
                'tw-bg-button-positive-background tw-border-button-positive-border ' +
                'hover:tw-bg-button-positive-background-hover ' +
                'active:tw-bg-button-positive-background-pressed ',
        },
        {
            style: 'positive',
            emphasis: 'weak',
            class:
                'tw-border-transparent ' +
                'hover:tw-bg-button-positive-background-hover hover:tw-border-button-positive-border ' +
                'active:tw-bg-button-positive-background-pressed ',
        },
        {
            style: 'positive',
            emphasis: 'strong',
            class:
                'tw-bg-button-strong-positive-background tw-border-button-strong-positive-border ' +
                'hover:tw-bg-button-strong-positive-background-hover ' +
                'active:tw-bg-button-strong-positive-background-pressed ',
        },
        {
            style: 'negative',
            emphasis: 'default',
            class:
                'tw-bg-button-negative-background tw-border-button-negative-border ' +
                'hover:tw-bg-button-negative-background-hover ' +
                'active:tw-bg-button-negative-background-pressed ',
        },
        {
            style: 'negative',
            emphasis: 'weak',
            class:
                'tw-border-transparent ' +
                'hover:tw-bg-button-negative-background-hover hover:tw-border-button-negative-border ' +
                'active:tw-bg-button-negative-background-pressed ',
        },
        {
            style: 'negative',
            emphasis: 'strong',
            class:
                'tw-bg-button-strong-negative-background tw-border-button-strong-negative-border ' +
                'hover:tw-bg-button-strong-negative-background-hover ' +
                'active:tw-bg-button-strong-negative-background-pressed ',
        },
        {
            style: 'danger',
            emphasis: 'default',
            class:
                'tw-bg-button-background tw-border-button-border ' +
                'hover:tw-bg-button-background-hover ' +
                'active:tw-bg-button-background-pressed ',
        },
        {
            style: 'danger',
            emphasis: 'weak',
            class:
                'tw-border-transparent ' +
                'hover:tw-bg-button-background-hover ' +
                'active:tw-bg-button-background-pressed ',
        },
        {
            style: 'danger',
            emphasis: 'strong',
            class:
                'tw-bg-button-danger-background tw-border-button-danger-border ' +
                'hover:tw-bg-button-danger-background-hover ' +
                'active:tw-bg-button-danger-background-pressed ',
        },
        {
            style: 'loud',
            emphasis: 'default',
            class:
                'tw-bg-box-selected tw-border-button-border ' +
                'hover:tw-bg-box-selected-hover ' +
                'active:tw-bg-box-selected-pressed ',
        },
        {
            style: 'loud',
            emphasis: 'weak',
            class: 'tw-border-transparent hover:tw-bg-box-selected-hover active:tw-bg-box-selected-pressed ',
        },
        {
            style: 'loud',
            emphasis: 'strong',
            class:
                'tw-bg-box-selected-strong tw-border-box-selected-strong ' +
                'hover:tw-bg-box-selected-strong-hover ' +
                'active:tw-bg-box-selected-strong-pressed ',
        },
    ],
});



export const textStyles = tv({
    variants: {
        hideLabel: {
            true: 'tw-sr-only',
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
                'tw-text-button-text ' +
                'group-hover:tw-text-button-text-hover ' +
                'group-active:tw-text-button-text-pressed ',
        },
        {
            style: 'default',
            emphasis: 'weak',
            class:
                'tw-text-button-text ' +
                'group-hover:tw-text-button-text-hover ' +
                'group-active:tw-text-button-text-pressed ',
        },
        {
            style: 'default',
            emphasis: 'strong',
            class:
                'tw-text-button-strong-icon ' +
                'group-hover:tw-text-button-strong-icon-hover ' +
                'group-active:tw-text-button-strong-text-pressed ',
        },
        {
            style: 'positive',
            emphasis: 'default',
            class:
                'tw-text-button-positive-text ' +
                'group-hover:tw-text-button-positive-text-hover ' +
                'group-active:tw-text-button-positive-text-pressed ',
        },
        {
            style: 'positive',
            emphasis: 'weak',
            class:
                'tw-text-button-positive-text ' +
                'group-hover:tw-text-button-positive-text-hover ' +
                'group-active:tw-text-button-positive-text-pressed ',
        },
        {
            style: 'positive',
            emphasis: 'strong',
            class:
                'tw-text-button-strong-positive-text ' +
                'group-hover:tw-text-button-strong-positive-text-hover ' +
                'group-active:tw-text-button-strong-positive-text-pressed ',
        },
        {
            style: 'negative',
            emphasis: 'default',
            class:
                'tw-text-button-negative-text ' +
                'group-hover:tw-text-button-negative-text-hover' +
                'group-active:tw-text-button-negative-text-pressed ',
        },
        {
            style: 'negative',
            emphasis: 'weak',
            class:
                'tw-text-button-negative-text ' +
                'group-hover:tw-text-button-negative-text-hover' +
                'group-active:tw-text-button-negative-text-pressed ',
        },
        {
            style: 'negative',
            emphasis: 'strong',
            class:
                'tw-text-button-strong-negative-text ' +
                'group-hover:tw-text-button-strong-negative-text-hover' +
                'group-active:tw-text-button-strong-negative-text-pressed ',
        },
        {
            style: 'danger',
            emphasis: 'default',
            class:
                'tw-text-button-negative-icon ' +
                'group-hover:tw-text-button-negative-icon-hover' +
                'group-active:tw-text-button-negative-icon-pressed ',
        },
        {
            style: 'danger',
            emphasis: 'weak',
            class:
                'tw-text-button-negative-icon ' +
                'group-hover:tw-text-button-negative-icon-hover' +
                'group-active:tw-text-button-negative-icon-pressed ',
        },
        {
            style: 'danger',
            emphasis: 'strong',
            class:
                'tw-text-button-danger-text ' +
                'group-hover:tw-text-button-danger-text-hover' +
                'group-active:tw-text-button-danger-text-pressed ',
        },
        {
            style: 'loud',
            emphasis: 'default',
            class:
                'tw-text-box-selected-inverse ' +
                'group-hover:tw-text-box-selected-inverse-hover' +
                'group-active:tw-text-box-selected-inverse-pressed ',
        },
        {
            style: 'loud',
            emphasis: 'weak',
            class: 'tw-text-box-selected-inverse ' +
                'group-hover:tw-text-box-selected-inverse-hover' +
                'group-active:tw-text-box-selected-inverse-pressed ',
        },
        {
            style: 'loud',
            emphasis: 'strong',
            class:
                'tw-text-box-selected-strong-inverse ' +
                'group-hover:tw-text-box-selected-strong-inverse' +
                'group-active:tw-text-box-selected-strong-inverse ',
        },
    ],
});
