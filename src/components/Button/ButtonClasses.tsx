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
            default: {
                button:
                    "tw-bg-button-background tw-border-button-border " +
                    "hover:tw-bg-button-background-hover " +
                    "active:tw-bg-button-background-pressed ",
                icon:
                    "tw-text-button-icon " +
                    "group-hover:tw-text-button-icon-hover " +
                    "group-active:tw-text-button-icon-pressed ",
                text:
                    "tw-text-button-text " +
                    "group-hover:tw-text-button-text-hover " +
                    "group-active:tw-text-button-text-pressed ",
            },
            inverted: {
                button:
                    "tw-bg-text-weak tw-border-button-border " +
                    "hover:tw-bg-button-strong-background-hover " +
                    "active:tw-bg-button-strong-background-pressed ",
                icon:
                    "tw-text-button-strong-icon " +
                    "group-hover:tw-text-button-strong-icon-hover " +
                    "group-active:tw-text-button-strong-icon-pressed ",
                text:
                    "tw-text-button-strong-text " +
                    "group-hover:tw-text-button-strong-text-hover " +
                    "group-active:tw-text-button-strong-text-pressed  ",
            },
        },
        [ButtonStyle.Positive]: {
            default: {
                button:
                    "tw-bg-button-positive-background tw-border-button-positive-border " +
                    "hover:tw-bg-button-positive-background-hover " +
                    "active:tw-bg-button-positive-background-pressed ",
                icon:
                    "tw-text-button-positive-icon " +
                    "group-hover:tw-text-button-positive-icon-hover " +
                    "group-active:tw-text-button-positive-icon-pressed ",
                text:
                    "tw-text-button-positive-text " +
                    "group-hover:tw-text-button-positive-text-hover " +
                    "group-active:tw-text-button-positive-text-pressed ",
            },
            inverted: {
                button:
                    "tw-bg-text-weak tw-border-button-border " +
                    "hover:tw-bg-button-strong-background-hover " +
                    "active:tw-bg-button-strong-background-pressed ",
                icon:
                    "tw-text-green-mid " +
                    "group-hover:tw-text-button-positive-icon-hover " +
                    "group-active:tw-text-button-positive-icon-pressed ",
                text:
                    "tw-text-button-strong-text " +
                    "group-hover:tw-text-button-strong-text-hover " +
                    "group-active:tw-text-button-strong-text-pressed  ",
            },
        },
        [ButtonStyle.Negative]: {
            default: {
                button:
                    "tw-bg-button-negative-background tw-border-button-negative-border " +
                    "hover:tw-bg-button-negative-background-hover " +
                    "active:tw-bg-button-negative-background-pressed ",
                icon:
                    "tw-text-button-negative-icon " +
                    "group-hover:tw-text-button-negative-icon-hover" +
                    "group-active:tw-text-button-negative-icon-pressed ",
                text:
                    "tw-text-button-negative-text " +
                    "group-hover:tw-text-button-negative-text-hover" +
                    "group-active:tw-text-button-negative-text-pressed ",
            },
            inverted: {
                button:
                    "tw-bg-text-weak tw-border-button-border " +
                    "hover:tw-bg-button-strong-background-hover " +
                    "active:tw-bg-button-strong-background-pressed ",
                icon:
                    "tw-text-red-mid " +
                    "group-hover:tw-text-button-negative-icon-hover " +
                    "group-active:tw-text-button-negative-icon-pressed ",
                text:
                    "tw-text-button-strong-text " +
                    "group-hover:tw-text-button-strong-text-hover " +
                    "group-active:tw-text-button-strong-text-pressed  ",
            },
        },
        [ButtonStyle.Danger]: {
            default: {
                button:
                    "tw-bg-button-danger-background tw-border-button-danger-border " +
                    "hover:tw-bg-button-danger-background-hover " +
                    "active:tw-bg-button-danger-background-pressed ",
                icon:
                    "tw-text-button-danger-icon " +
                    "group-hover:tw-text-button-danger-icon-hover" +
                    "group-active:tw-text-button-danger-icon-pressed ",
                text:
                    "tw-text-button-danger-text " +
                    "group-hover:tw-text-button-danger-text-hover" +
                    "group-active:tw-text-button-danger-text-pressed ",
            },
            inverted: {
                button:
                    "tw-bg-button-danger-background tw-border-button-danger-border " +
                    "hover:tw-bg-button-danger-background-hover " +
                    "active:tw-bg-button-danger-background-pressed ",
                icon:
                    "tw-text-button-danger-icon " +
                    "group-hover:tw-text-button-danger-icon-hover" +
                    "group-active:tw-text-button-danger-icon-pressed ",
                text:
                    "tw-text-button-danger-text " +
                    "group-hover:tw-text-button-danger-text-hover" +
                    "group-active:tw-text-button-danger-text-pressed ",
            },
        },
        // DEPRECATING
        [ButtonStyle.Primary]: {
            default: {
                button:
                    "tw-bg-button-strong-background tw-border-button-strong-border " +
                    "hover:tw-bg-button-strong-background-hover " +
                    "active:tw-bg-button-strong-background-pressed ",
                icon:
                    "tw-text-button-strong-icon " +
                    "group-hover:tw-text-button-strong-icon-hover " +
                    "group-active:tw-text-button-strong-icon-pressed ",
                text:
                    "tw-text-button-strong-text " +
                    "group-hover:tw-text-button-strong-text-hover " +
                    "group-active:tw-text-button-strong-text-pressed ",
            },
            inverted: {
                button:
                    "tw-bg-base tw-border-button-border " +
                    "hover:tw-bg-button-background-hover " +
                    "active:tw-bg-button-background-pressed ",
                icon:
                    "tw-text-button-icon " +
                    "group-hover:tw-text-button-icon-hover " +
                    "group-active:tw-text-button-icon-pressed ",
                text:
                    "tw-text-button-text " +
                    "group-hover:tw-text-button-text-hover " +
                    "group-active:tw-text-button-text-pressed ",
            },
        },
        // DEPRECATING
        [ButtonStyle.Secondary]: {
            default: {
                button:
                    "tw-bg-button-background tw-border-button-border " +
                    "hover:tw-bg-button-background-hover " +
                    "active:tw-bg-button-background-pressed ",
                icon:
                    "tw-text-button-icon " +
                    "group-hover:tw-text-button-icon-hover " +
                    "group-active:tw-text-button-icon-pressed ",
                text:
                    "tw-text-button-text " +
                    "group-hover:tw-text-button-text-hover " +
                    "group-active:tw-text-button-text-pressed ",
            },
            inverted: {
                button:
                    "tw-bg-text-weak tw-border-button-border " +
                    "hover:tw-bg-button-strong-background-hover " +
                    "active:tw-bg-button-strong-background-pressed ",
                icon:
                    "tw-text-button-strong-icon " +
                    "group-hover:tw-text-button-strong-icon-hover " +
                    "group-active:tw-text-button-strong-icon-pressed ",
                text:
                    "tw-text-button-strong-text " +
                    "group-hover:tw-text-button-strong-text-hover " +
                    "group-active:tw-text-button-strong-text-pressed  ",
            },
        },
    },
    [ButtonEmphasis.Strong]: {
        [ButtonStyle.Default]: {
            default: {
                button:
                    "tw-bg-button-strong-background tw-border-button-strong-border " +
                    "hover:tw-bg-button-strong-background-hover " +
                    "active:tw-bg-button-strong-background-pressed ",
                icon:
                    "tw-text-button-strong-icon " +
                    "group-hover:tw-text-button-strong-icon-hover " +
                    "group-active:tw-text-button-strong-icon-pressed ",
                text:
                    "tw-text-button-strong-icon " +
                    "group-hover:tw-text-button-strong-icon-hover " +
                    "group-active:tw-text-button-strong-text-pressed ",
            },
            inverted: {
                button:
                    "tw-bg-base tw-border-button-border " +
                    "hover:tw-bg-button-background-hover " +
                    "active:tw-bg-button-background-pressed ",
                icon:
                    "tw-text-button-icon " +
                    "group-hover:tw-text-button-icon-hover " +
                    "group-active:tw-text-button-icon-pressed ",
                text:
                    "tw-text-button-text " +
                    "group-hover:tw-text-button-text-hover " +
                    "group-active:tw-text-button-text-pressed ",
            },
        },
        [ButtonStyle.Positive]: {
            default: {
                button:
                    "tw-bg-button-strong-positive-background tw-border-button-strong-positive-border " +
                    "hover:tw-bg-button-strong-positive-background-hover " +
                    "active:tw-bg-button-strong-positive-background-pressed ",
                icon:
                    "tw-text-button-strong-positive-icon " +
                    "group-hover:tw-text-button-strong-positive-icon-hover " +
                    "group-active:tw-text-button-strong-positive-icon-pressed ",
                text:
                    "tw-text-button-strong-positive-text " +
                    "group-hover:tw-text-button-strong-positive-text-hover " +
                    "group-active:tw-text-button-strong-positive-text-pressed ",
            },
            inverted: {
                button:
                    "tw-bg-base tw-border-button-border " +
                    "hover:tw-bg-button-positive-background-hover " +
                    "active:tw-bg-button-positive-background-pressed ",
                icon:
                    "tw-text-button-positive-icon " +
                    "group-hover:tw-text-button-positive-icon-hover " +
                    "group-active:tw-text-button-positive-icon-pressed ",
                text:
                    "tw-text-button-text " +
                    "group-hover:tw-text-button-positive-text-hover " +
                    "group-active:tw-text-button-positive-text-pressed ",
            },
        },
        [ButtonStyle.Negative]: {
            default: {
                button:
                    "tw-bg-button-strong-negative-background tw-border-button-strong-negative-border " +
                    "hover:tw-bg-button-strong-negative-background-hover " +
                    "active:tw-bg-button-strong-negative-background-pressed ",
                icon:
                    "tw-text-button-strong-negative-icon " +
                    "group-hover:tw-text-button-strong-negative-icon-hover" +
                    "group-active:tw-text-button-strong-negative-icon-pressed ",
                text:
                    "tw-text-button-strong-negative-text " +
                    "group-hover:tw-text-button-strong-negative-text-hover" +
                    "group-active:tw-text-button-strong-negative-text-pressed ",
            },
            inverted: {
                button:
                    "tw-bg-base tw-border-button-border " +
                    "hover:tw-bg-button-negative-background-hover " +
                    "active:tw-bg-button-negative-background-pressed ",
                icon:
                    "tw-text-button-negative-icon " +
                    "group-hover:tw-text-button-negative-icon-hover " +
                    "group-active:tw-text-button-negative-icon-pressed ",
                text:
                    "tw-text-button-text " +
                    "group-hover:tw-text-button-negative-text-hover " +
                    "group-active:tw-text-button-negative-text-pressed ",
            },
        },
        [ButtonStyle.Danger]: {
            default: {
                button:
                    "tw-bg-button-danger-background tw-border-button-danger-border " +
                    "hover:tw-bg-button-danger-background-hover " +
                    "active:tw-bg-button-danger-background-pressed ",
                icon:
                    "tw-text-button-danger-icon " +
                    "group-hover:tw-text-button-danger-icon-hover" +
                    "group-active:tw-text-button-danger-icon-pressed ",
                text:
                    "tw-text-button-danger-text " +
                    "group-hover:tw-text-button-danger-text-hover" +
                    "group-active:tw-text-button-danger-text-pressed ",
            },
            inverted: {
                button:
                    "tw-bg-button-danger-background tw-border-button-danger-border " +
                    "hover:tw-bg-button-danger-background-hover " +
                    "active:tw-bg-button-danger-background-pressed ",
                icon:
                    "tw-text-button-danger-icon " +
                    "group-hover:tw-text-button-danger-icon-hover" +
                    "group-active:tw-text-button-danger-icon-pressed ",
                text:
                    "tw-text-button-danger-text " +
                    "group-hover:tw-text-button-danger-text-hover" +
                    "group-active:tw-text-button-danger-text-pressed ",
            },
        },
        // DEPRECATING
        [ButtonStyle.Primary]: {
            default: {
                button:
                    "tw-bg-button-strong-background tw-border-button-strong-border " +
                    "hover:tw-bg-button-strong-background-hover " +
                    "active:tw-bg-button-strong-background-pressed ",
                icon:
                    "tw-text-button-strong-icon " +
                    "group-hover:tw-text-button-strong-icon-hover " +
                    "group-active:tw-text-button-strong-icon-pressed ",
                text:
                    "tw-text-button-strong-text " +
                    "group-hover:tw-text-button-strong-text-hover " +
                    "group-active:tw-text-button-strong-text-pressed ",
            },
            inverted: {
                button:
                    "tw-bg-base tw-border-button-border " +
                    "hover:tw-bg-button-background-hover " +
                    "active:tw-bg-button-background-pressed ",
                icon:
                    "tw-text-button-icon " +
                    "group-hover:tw-text-button-icon-hover " +
                    "group-active:tw-text-button-icon-pressed ",
                text:
                    "tw-text-button-text " +
                    "group-hover:tw-text-button-text-hover " +
                    "group-active:tw-text-button-text-pressed ",
            },
        },
        // DEPRECATING
        [ButtonStyle.Secondary]: {
            default: {
                button:
                    "tw-bg-button-background tw-border-button-border " +
                    "hover:tw-bg-button-background-hover " +
                    "active:tw-bg-button-background-pressed ",
                icon:
                    "tw-text-button-icon " +
                    "group-hover:tw-text-button-icon-hover " +
                    "group-active:tw-text-button-icon-pressed ",
                text:
                    "tw-text-button-text " +
                    "group-hover:tw-text-button-text-hover " +
                    "group-active:tw-text-button-text-pressed ",
            },
            inverted: {
                button:
                    "tw-bg-text-weak tw-border-button-border " +
                    "hover:tw-bg-button-strong-background-hover " +
                    "active:tw-bg-button-strong-background-pressed ",
                icon:
                    "tw-text-button-strong-icon " +
                    "group-hover:tw-text-button-strong-icon-hover " +
                    "group-active:tw-text-button-strong-icon-pressed ",
                text:
                    "tw-text-button-strong-text " +
                    "group-hover:tw-text-button-strong-text-hover " +
                    "group-active:tw-text-button-strong-text-pressed  ",
            },
        },
    },
    [ButtonEmphasis.Weak]: {
        [ButtonStyle.Default]: {
            default: {
                button:
                    "tw-border-transparent " +
                    "hover:tw-bg-button-background-hover " +
                    "active:tw-bg-button-background-pressed ",
                icon:
                    "tw-text-button-icon " +
                    "group-hover:tw-text-button-icon-hover " +
                    "group-active:tw-text-button-icon-pressed ",
                text:
                    "tw-text-button-text " +
                    "group-hover:tw-text-button-text-hover " +
                    "group-active:tw-text-button-text-pressed ",
            },
            inverted: {
                button:
                    "tw-border-transparent " +
                    "hover:tw-bg-button-strong-background-hover " +
                    "active:tw-bg-button-strong-background-pressed ",
                icon:
                    "tw-text-button-strong-icon " +
                    "group-hover:tw-text-button-strong-icon-hover " +
                    "group-active:tw-text-button-strong-icon-pressed ",
                text:
                    "tw-text-button-strong-text " +
                    "group-hover:tw-text-button-strong-text-hover " +
                    "group-active:tw-text-button-strong-text-pressed ",
            },
        },
        [ButtonStyle.Positive]: {
            default: {
                button:
                    "tw-border-transparent " +
                    "hover:tw-bg-button-positive-background-hover " +
                    "active:tw-bg-button-positive-background-pressed ",
                icon:
                    "tw-text-button-positive-icon " +
                    "group-hover:tw-text-button-positive-icon-hover " +
                    "group-active:tw-text-button-positive-icon-pressed ",
                text:
                    "tw-text-button-positive-text " +
                    "group-hover:tw-text-button-positive-text-hover " +
                    "group-active:tw-text-button-positive-text-pressed ",
            },
            inverted: {
                button:
                    "tw-border-transparent " +
                    "hover:tw-bg-button-strong-background-hover " +
                    "active:tw-bg-button-strong-background-pressed ",
                icon:
                    "tw-text-button-positive-icon " +
                    "group-hover:tw-text-button-positive-icon-hover " +
                    "group-active:tw-text-button-positive-icon-pressed ",
                text:
                    "tw-text-button-strong-positive-text " +
                    "group-hover:tw-text-button-strong-positive-text-hover " +
                    "group-active:tw-text-button-strong-positive-text-pressed ",
            },
        },
        [ButtonStyle.Negative]: {
            default: {
                button:
                    "tw-border-transparent " +
                    "hover:tw-bg-button-negative-background-hover " +
                    "active:tw-bg-button-negative-background-pressed ",
                icon:
                    "tw-text-button-negative-icon " +
                    "group-hover:tw-text-button-negative-icon-hover" +
                    "group-active:tw-text-button-negative-icon-pressed ",
                text:
                    "tw-text-button-negative-text " +
                    "group-hover:tw-text-button-negative-text-hover" +
                    "group-active:tw-text-button-negative-text-pressed ",
            },
            inverted: {
                button:
                    "tw-border-transparent " +
                    "hover:tw-bg-button-strong-background-hover " +
                    "active:tw-bg-button-strong-background-pressed ",
                icon:
                    "tw-text-button-negative-icon " +
                    "group-hover:tw-text-button-negative-icon-hover " +
                    "group-active:tw-text-button-negative-icon-pressed ",
                text:
                    "tw-text-button-strong-negative-text " +
                    "group-hover:tw-text-button-strong-negative-text-hover " +
                    "group-active:tw-text-button-strong-negative-text-pressed ",
            },
        },
        [ButtonStyle.Danger]: {
            default: {
                button:
                    "tw-bg-button-danger-background tw-border-button-danger-border " +
                    "hover:tw-bg-button-danger-background-hover " +
                    "active:tw-bg-button-danger-background-pressed ",
                icon:
                    "tw-text-button-danger-icon " +
                    "group-hover:tw-text-button-danger-icon-hover" +
                    "group-active:tw-text-button-danger-icon-pressed ",
                text:
                    "tw-text-button-danger-text " +
                    "group-hover:tw-text-button-danger-text-hover" +
                    "group-active:tw-text-button-danger-text-pressed ",
            },
            inverted: {
                button:
                    "tw-bg-button-danger-background tw-border-button-danger-border " +
                    "hover:tw-bg-button-danger-background-hover " +
                    "active:tw-bg-button-danger-background-pressed ",
                icon:
                    "tw-text-button-danger-icon " +
                    "group-hover:tw-text-button-danger-icon-hover" +
                    "group-active:tw-text-button-danger-icon-pressed ",
                text:
                    "tw-text-button-danger-text " +
                    "group-hover:tw-text-button-danger-text-hover" +
                    "group-active:tw-text-button-danger-text-pressed ",
            },
        },
        // DEPRECATING
        [ButtonStyle.Primary]: {
            default: {
                button:
                    "tw-border-transparent " +
                    "hover:tw-bg-button-background-hover " +
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
                button:
                    "tw-bg-base tw-border-button-border " +
                    "hover:tw-bg-button-background-hover " +
                    "active:tw-bg-button-background-pressed ",
                icon:
                    "tw-text-button-icon " +
                    "group-hover:tw-text-button-icon-hover " +
                    "group-active:tw-text-button-icon-pressed ",
                text:
                    "tw-text-button-text " +
                    "group-hover:tw-text-button-text-hover " +
                    "group-active:tw-text-button-text-pressed ",
            },
        },
        // DEPRECATING
        [ButtonStyle.Secondary]: {
            default: {
                button:
                    "tw-border-transparent " +
                    "hover:tw-bg-button-background-hover " +
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
                button:
                    "tw-bg-text-weak tw-border-button-border " +
                    "hover:tw-bg-button-strong-background-hover " +
                    "active:tw-bg-button-strong-background-pressed ",
                icon:
                    "tw-text-button-strong-icon " +
                    "group-hover:tw-text-button-strong-icon-hover " +
                    "group-active:tw-text-button-strong-icon-pressed ",
                text:
                    "tw-text-button-strong-text " +
                    "group-hover:tw-text-button-strong-text-hover " +
                    "group-active:tw-text-button-strong-text-pressed  ",
            },
        },
    },
};
