/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ButtonRounding,
    ButtonSize,
    ButtonStyle
} from './ButtonTypes';

export const ButtonCommonClasses =
    'tw-group ' +
    'tw-border ' +
    'tw-box-box tw-relative tw-flex tw-items-center tw-justify-center ' +
    'tw-cursor-pointer tw-outline-none tw-font-body tw-font-medium ';

export const ButtonDisabledClasses =
    'tw-not-allowed tw-pointer-events-none tw-border-transparent tw-text-box-disabled-inverse tw-bg-box-disabled ';

export const ButtonRoundingClasses: Record<ButtonRounding, string> = {
    "medium": 'tw-rounded',
    "full": 'tw-rounded-full',
};

export const ButtonSizeClasses: Record<ButtonSize, Record<'default' | 'iconOnly', string>> = {
    "small": {
        default: 'tw-px-2 tw-h-6 tw-text-body-small ',
        iconOnly: 'tw-h-6 tw-w-6 ',
    },
    "medium": {
        default: 'tw-px-4 tw-h-9 tw-text-body-medium ',
        iconOnly: 'tw-h-9 tw-w-9 ',
    },
    "large": {
        default: 'tw-px-6 tw-h-12 tw-text-body-large ',
        iconOnly: 'tw-h-12 tw-w-12 ',
    },
};

export const IconSpacingClasses: Record<ButtonSize, string> = {
    "small": 'tw--ml-0.5 tw-mr-1 ',
    "medium": 'tw--ml-1 tw-mr-1.5 ',
    "large": 'tw--ml-1 tw-mr-2 ',
};

export const ButtonEmphasisClasses: Record<ButtonStyle, Record<"button" | "icon" | "text", string>> = {
    "default": {
        button:
            'tw-border-transparent ' +
            'hover:tw-bg-button-background-hover hover:tw-border-button-border ' +
            'active:tw-bg-button-background-pressed ',
        icon:
            'tw-text-button-icon ' +
            'group-hover:tw-text-button-icon-hover ' +
            'group-active:tw-text-button-icon-pressed tw-leading-none ',
        text:
            'tw-text-button-text ' +
            'group-hover:tw-text-button-text-hover ' +
            'group-active:tw-text-button-text-pressed ',
    },
    "positive": {
        button:
            'tw-border-transparent ' +
            'hover:tw-bg-button-positive-background-hover hover:tw-border-button-positive-border ' +
            'active:tw-bg-button-positive-background-pressed ',
        icon:
            'tw-text-button-strong-positive-icon ' +
            'group-hover:tw-text-button-strong-positive-icon-hover' +
            'group-active:tw-text-button-strong-positive-icon-pressed tw-leading-none ',
        text:
            'tw-text-button-positive-text ' +
            'group-hover:tw-text-button-positive-text-hover ' +
            'group-active:tw-text-button-positive-text-pressed ',
    },
    "negative": {
        button:
            'tw-border-transparent ' +
            'hover:tw-bg-button-negative-background-hover hover:tw-border-button-negative-border ' +
            'active:tw-bg-button-negative-background-pressed ',
        icon:
            'tw-text-button-negative-icon ' +
            'group-hover:tw-text-button-negative-icon-hover' +
            'group-active:tw-text-button-negative-icon-pressed tw-leading-none ',
        text:
            'tw-text-button-negative-text ' +
            'group-hover:tw-text-button-negative-text-hover' +
            'group-active:tw-text-button-negative-text-pressed ',
    },
    "danger": {
        button:
            'tw-border-transparent ' +
            'hover:tw-bg-button-background-hover ' +
            'active:tw-bg-button-background-pressed ',
        icon:
            'tw-text-button-negative-icon ' +
            'group-hover:tw-text-button-negative-icon-hover' +
            'group-active:tw-text-button-negative-icon-pressed tw-leading-none ',
        text:
            'tw-text-button-negative-icon ' +
            'group-hover:tw-text-button-negative-icon-hover' +
            'group-active:tw-text-button-negative-icon-pressed ',
    },
    "loud": {
        button: 'tw-border-transparent hover:tw-bg-box-selected-hover active:tw-bg-box-selected-pressed ',
        icon:
            'tw-text-box-selected-inverse ' +
            'group-hover:tw-text-box-selected-inverse-hover' +
            'group-active:tw-text-box-selected-inverse-pressed tw-leading-none ',
        text:
            'tw-text-box-selected-inverse ' +
            'group-hover:tw-text-box-selected-inverse-hover' +
            'group-active:tw-text-box-selected-inverse-pressed ',
    },
};
