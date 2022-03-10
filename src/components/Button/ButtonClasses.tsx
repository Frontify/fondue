/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ButtonRounding, ButtonSize, ButtonStyle, ButtonElements, ButtonEmphasis } from "./ButtonTypes";

export const ButtonCommonClasses =
    "tw-group " +
    "tw-border " +
    "tw-box-box tw-relative tw-flex tw-items-center tw-justify-center " +
    "tw-cursor-pointer tw-outline-none tw-font-body tw-font-medium ";

export const ButtonDisabledClasses: Record<"common" | "weak" | "default", string> = {
    common: "tw-not-allowed tw-pointer-events-none tw-border-transparent ",
    default: "tw-text-box-disabled-inverse tw-bg-box-disabled ",
    weak: "tw-text-text-disabled ",
};

export const ButtonRoundingClasses: Record<ButtonRounding, string> = {
    [ButtonRounding.Medium]: "tw-rounded",
    [ButtonRounding.Full]: "tw-rounded-full",
};

export const ButtonSizeClasses: Record<ButtonSize, Record<"default" | "iconOnly", string>> = {
    [ButtonSize.Small]: {
        default: "tw-px-2 tw-h-6 tw-text-body-small ",
        iconOnly: "tw-h-6 tw-w-6 ",
    },
    [ButtonSize.Medium]: {
        default: "tw-px-4 tw-h-9 tw-text-body-medium ",
        iconOnly: "tw-h-9 tw-w-9 ",
    },
    [ButtonSize.Large]: {
        default: "tw-px-6 tw-h-12 tw-text-body-large ",
        iconOnly: "tw-h-12 tw-w-12 ",
    },
};

export const IconSpacingClasses: Record<ButtonSize, string> = {
    [ButtonSize.Small]: "tw--ml-0.5 tw-mr-1 ",
    [ButtonSize.Medium]: "tw--ml-1 tw-mr-1.5 ",
    [ButtonSize.Large]: "tw--ml-1 tw-mr-2 ",
};

const setDefaultClasses = (keyword: string, isWeak: boolean) => {
    return {
        button: isWeak
            ? `tw-border-transparent hover:tw-border-button${keyword}-border `
            : `tw-bg-button${keyword}-background tw-border-button${keyword}-border ` +
              `hover:tw-bg-button${keyword}-background-hover ` +
              `active:tw-bg-button${keyword}-background-pressed `,
        icon:
            `tw-text-button${keyword}-icon ` +
            `group-hover:tw-text-button${keyword}-icon-hover ` +
            `group-active:tw-text-button${keyword}-icon-pressed `,
        text:
            `tw-text-button${keyword}-text ` +
            `group-hover:tw-text-button${keyword}-text-hover ` +
            `group-active:tw-text-button${keyword}-text-pressed `,
    };
};

/**
 * A NOTE ABOUT THIS BIG LONG LIST
 *
 * - We're deprecating Primary and Secondary in favour of 'emphasis' (-33%)
 * - Once we introduce the ThemeProvider we can deprecate all the 'inverted' variants (-50%)
 */

export const ButtonStyleClasses: Record<
    ButtonEmphasis,
    Record<ButtonStyle, Record<"default" | "inverted", ButtonElements>>
> = {
    [ButtonEmphasis.Default]: {
        [ButtonStyle.Default]: {
            default: { ...setDefaultClasses("", false) },
            inverted: {
                ...setDefaultClasses("-strong", false),
                button:
                    "tw-bg-text-weak tw-border-button-border " +
                    "hover:tw-bg-button-strong-background-hover " +
                    "active:tw-bg-button-strong-background-pressed ",
            },
        },
        [ButtonStyle.Positive]: {
            default: { ...setDefaultClasses("-positive", false) },
            inverted: {
                ...setDefaultClasses("-strong", false),
                button:
                    "tw-bg-text-weak tw-border-button-positive-border " +
                    "hover:tw-bg-button-strong-background-hover " +
                    "active:tw-bg-button-strong-background-pressed ",
                icon:
                    "tw-text-green-mid " +
                    "group-hover:tw-text-button-positive-icon-hover " +
                    "group-active:tw-text-button-positive-icon-pressed ",
            },
        },
        [ButtonStyle.Negative]: {
            default: { ...setDefaultClasses("-negative", false) },
            inverted: {
                ...setDefaultClasses("-strong", false),
                button:
                    "tw-bg-text-weak tw-border-button-negative-border " +
                    "hover:tw-bg-button-strong-background-hover " +
                    "active:tw-bg-button-strong-background-pressed ",
                icon:
                    "tw-text-red-mid " +
                    "group-hover:tw-text-button-negative-icon-hover " +
                    "group-active:tw-text-button-negative-icon-pressed ",
            },
        },
        [ButtonStyle.Danger]: {
            default: { ...setDefaultClasses("-danger", false) },
            inverted: { ...setDefaultClasses("-danger", false) },
        },
        // DEPRECATING
        [ButtonStyle.Primary]: {
            default: { ...setDefaultClasses("-strong", false) },
            inverted: {
                ...setDefaultClasses("", false),
                button:
                    "tw-bg-base tw-border-button-strong-border " +
                    "hover:tw-bg-button-background-hover " +
                    "active:tw-bg-button-background-pressed ",
            },
        },
        // DEPRECATING
        [ButtonStyle.Secondary]: {
            default: { ...setDefaultClasses("", false) },
            inverted: {
                ...setDefaultClasses("-strong", false),
                button:
                    "tw-bg-text-weak tw-border-button-border " +
                    "hover:tw-bg-button-strong-background-hover " +
                    "active:tw-bg-button-strong-background-pressed ",
            },
        },
    },
    [ButtonEmphasis.Strong]: {
        [ButtonStyle.Default]: {
            default: { ...setDefaultClasses("-strong", false) },
            inverted: {
                ...setDefaultClasses("", false),
                button:
                    "tw-bg-base tw-border-button-strong-border " +
                    "hover:tw-bg-button-background-hover " +
                    "active:tw-bg-button-background-pressed ",
            },
        },
        [ButtonStyle.Positive]: {
            default: { ...setDefaultClasses("-strong-positive", false) },
            inverted: {
                ...setDefaultClasses("-positive", false),
                button:
                    "tw-bg-base tw-border-button-positive-border " +
                    "hover:tw-bg-button-positive-background-hover " +
                    "active:tw-bg-button-positive-background-pressed ",
                icon:
                    "tw-text-button-positive-icon " +
                    "group-hover:tw-text-button-positive-icon-hover " +
                    "group-active:tw-text-button-positive-icon-pressed ",
            },
        },
        [ButtonStyle.Negative]: {
            default: { ...setDefaultClasses("-strong-negative", false) },
            inverted: {
                ...setDefaultClasses("-negative", false),
                button:
                    "tw-bg-base tw-border-button-border tw-border-button-strong-negative-border " +
                    "hover:tw-bg-button-negative-background-hover " +
                    "active:tw-bg-button-negative-background-pressed ",
                text:
                    "tw-text-button-text " +
                    "group-hover:tw-text-button-negative-text-hover " +
                    "group-active:tw-text-button-negative-text-pressed ",
            },
        },
        [ButtonStyle.Danger]: {
            default: { ...setDefaultClasses("-danger", false) },
            inverted: { ...setDefaultClasses("-danger", false) },
        },
        // DEPRECATING
        [ButtonStyle.Primary]: {
            default: { ...setDefaultClasses("-strong", false) },
            inverted: {
                ...setDefaultClasses("", false),
                button:
                    "tw-bg-base tw-border-button-strong-border " +
                    "hover:tw-bg-button-background-hover " +
                    "active:tw-bg-button-background-pressed ",
            },
        },
        // DEPRECATING
        [ButtonStyle.Secondary]: {
            default: { ...setDefaultClasses("", false) },
            inverted: {
                ...setDefaultClasses("-strong", false),
                button:
                    "tw-bg-text-weak tw-border-button-border " +
                    "hover:tw-bg-button-strong-background-hover " +
                    "active:tw-bg-button-strong-background-pressed ",
            },
        },
    },
    [ButtonEmphasis.Weak]: {
        [ButtonStyle.Default]: {
            default: { ...setDefaultClasses("", true) },
            inverted: { ...setDefaultClasses("-strong", true) },
        },
        [ButtonStyle.Positive]: {
            default: { ...setDefaultClasses("-positive", true) },
            inverted: {
                ...setDefaultClasses("-positive", true),
                button:
                    "tw-border-transparent " +
                    "hover:tw-bg-button-strong-background-hover hover:tw-border-button-positive-border " +
                    "active:tw-bg-button-strong-background-pressed ",
                text:
                    "tw-text-button-strong-positive-text " +
                    "group-hover:tw-text-button-strong-positive-text-hover " +
                    "group-active:tw-text-button-strong-positive-text-pressed ",
            },
        },
        [ButtonStyle.Negative]: {
            default: { ...setDefaultClasses("-negative", true) },
            inverted: {
                ...setDefaultClasses("-negative", true),
                button:
                    "tw-border-transparent " +
                    "hover:tw-bg-button-strong-background-hover hover:tw-border-button-negative-border " +
                    "active:tw-bg-button-strong-background-pressed ",
                text:
                    "tw-text-button-strong-negative-text " +
                    "group-hover:tw-text-button-strong-negative-text-hover " +
                    "group-active:tw-text-button-strong-negative-text-pressed ",
            },
        },
        [ButtonStyle.Danger]: {
            default: { ...setDefaultClasses("-danger", false) },
            inverted: { ...setDefaultClasses("-danger", false) },
        },
        // DEPRECATING
        [ButtonStyle.Primary]: {
            default: {
                button:
                    "tw-border-transparent " +
                    "hover:tw-bg-button-background-hover hover:tw-border-button-border " +
                    "active:tw-bg-button-background-pressed ",
                icon:
                    "tw-text-button-icon " +
                    "group-hover:tw-text-button-icon-hover " +
                    "group-active:tw-text-button-icon-pressed ",
                text:
                    "tw-text-button-text " +
                    "group-hover:tw-text-button-text-hover " +
                    "group-active:tw-text-button-strong-text-pressed ",
            },
            inverted: {
                ...setDefaultClasses("", true),
                button:
                    "tw-bg-base tw-border-button-border " +
                    "hover:tw-bg-button-background-hover hover:tw-border-button-border " +
                    "active:tw-bg-button-background-pressed ",
            },
        },
        // DEPRECATING
        [ButtonStyle.Secondary]: {
            default: {
                button:
                    "tw-border-transparent " +
                    "hover:tw-bg-button-background-hover hover:tw-border-button-border " +
                    "active:tw-bg-button-background-pressed ",
                icon:
                    "tw-text-button-icon " +
                    "group-hover:tw-text-button-icon-hover " +
                    "group-active:tw-text-button-icon-pressed ",
                text:
                    "tw-text-button-text " +
                    "group-hover:tw-text-button-text-hover " +
                    "group-active:tw-text-button-strong-text-pressed ",
            },
            inverted: {
                ...setDefaultClasses("-strong", true),
                button:
                    "tw-bg-text-weak tw-border-button-border " +
                    "hover:tw-bg-button-strong-background-hover hover:tw-border-button-border " +
                    "active:tw-bg-button-strong-background-pressed ",
            },
        },
    },
};
