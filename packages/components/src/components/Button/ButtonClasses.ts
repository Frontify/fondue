/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ButtonElements,
    ButtonEmphasis,
    ButtonSize,
    ButtonStyle
} from './ButtonTypes';


export const IconSpacingClasses: Record<ButtonSize, string> = {
    "small": 'tw--ml-0.5 tw-mr-1 ',
    "medium": 'tw--ml-1 tw-mr-1.5 ',
    "large": 'tw--ml-1 tw-mr-2 ',
};



export const ButtonStyleClasses: Record<ButtonEmphasis, Record<ButtonStyle, ButtonElements>> = {
    "default": {
        "default": {
            icon:
                'tw-text-button-icon ' +
                'group-hover:tw-text-button-icon-hover ' +
                'group-active:tw-text-button-icon-pressed tw-leading-none ',
            text:
                ,
        },
        "positive": {
            icon:
                'tw-text-button-positive-icon ' +
                'group-hover:tw-text-button-positive-icon-hover ' +
                'group-active:tw-text-button-positive-icon-pressed tw-leading-none ',
            text:
                ,
        },
        "negative": {
            icon:
                'tw-text-button-negative-icon ' +
                'group-hover:tw-text-button-negative-icon-hover' +
                'group-active:tw-text-button-negative-icon-pressed tw-leading-none ',
            text:
                ,
        },
        "danger": {
            button:
                ,
            icon:
                'tw-text-button-negative-icon ' +
                'group-hover:tw-text-button-negative-icon-hover' +
                'group-active:tw-text-button-negative-icon-pressed tw-leading-none ',
            text:
                ,
        },
        "loud": {
            button:
                ,
            icon:
                'tw-text-box-selected-inverse ' +
                'group-hover:tw-text-box-selected-inverse-hover' +
                'group-active:tw-text-box-selected-inverse-pressed tw-leading-none ',
            text:
                ,
        },
    },
    "strong": {
        "default": {
            icon:
                'tw-text-button-strong-icon ' +
                'group-hover:tw-text-button-strong-icon-hover ' +
                'group-active:tw-text-button-strong-icon-pressed tw-leading-none ',
            text:
                ,
        },
        "positive": {
            icon:
                'tw-text-button-strong-positive-icon ' +
                'group-hover:tw-text-button-strong-positive-icon-hover ' +
                'group-active:tw-text-button-strong-positive-icon-pressed tw-leading-none ',
            text:
                ,
        },
        "negative": {
            icon:
                'tw-text-button-strong-negative-icon ' +
                'group-hover:tw-text-button-strong-negative-icon-hover' +
                'group-active:tw-text-button-strong-negative-icon-pressed tw-leading-none ',
            text:
                ,
        },
        "danger": {
            button:
                ,
            icon:
                'tw-text-button-danger-icon ' +
                'group-hover:tw-text-button-danger-icon-hover' +
                'group-active:tw-text-button-danger-icon-pressed tw-leading-none ',
            text:
                ,
        },
        "loud": {
            button:
                ,
            icon:
                'tw-text-box-selected-strong-inverse ' +
                'group-hover:tw-text-box-selected-strong-inverse' +
                'group-active:tw-text-box-selected-strong-inverse tw-leading-none ',
            text:
                ,
        },
    },
    "weak": {
        "default": {
            icon:
                'tw-text-button-icon ' +
                'group-hover:tw-text-button-icon-hover ' +
                'group-active:tw-text-button-icon-pressed tw-leading-none ',
            text:
                ,
        },
        "positive": {
            icon:
                'tw-text-button-strong-positive-icon ' +
                'group-hover:tw-text-button-strong-positive-icon-hover' +
                'group-active:tw-text-button-strong-positive-icon-pressed tw-leading-none ',
            text:
                ,
        },
        "negative": {
            icon:
                'tw-text-button-negative-icon ' +
                'group-hover:tw-text-button-negative-icon-hover' +
                'group-active:tw-text-button-negative-icon-pressed tw-leading-none ',
            text:
                ,
        },
        "danger": {
            button:
                ,
            icon:
                'tw-text-button-negative-icon ' +
                'group-hover:tw-text-button-negative-icon-hover' +
                'group-active:tw-text-button-negative-icon-pressed tw-leading-none ',
            text:
                ,
        },
        "loud": {
            button: ,
            icon:
                'tw-text-box-selected-inverse ' +
                'group-hover:tw-text-box-selected-inverse-hover' +
                'group-active:tw-text-box-selected-inverse-pressed tw-leading-none ',
            text:
                ,
        },
    },
};
