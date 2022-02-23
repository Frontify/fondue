/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from "@foundation/Icon/IconSize";
import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";
import { useForwardedRef } from "@utilities/useForwardedRef";
import React, {
    cloneElement,
    forwardRef,
    ForwardRefRenderFunction,
    MouseEvent,
    ReactElement,
    ReactNode,
    useCallback,
} from "react";

export enum ButtonStyle {
    Secondary = "Secondary",
    Primary = "Primary",
    Danger = "Danger",
    Positive = "Positive",
}

export enum ButtonSize {
    Small = "Small",
    Medium = "Medium",
    Large = "Large",
}

export enum ButtonType {
    Button = "Button",
    Submit = "Submit",
    Reset = "Reset",
}

export enum ButtonRounding {
    Medium = "Medium",
    Full = "Full",
}

const sizeClasses: Record<ButtonSize, string> = {
    [ButtonSize.Small]: "tw-px-3 tw-h-6 tw-text-body-small",
    [ButtonSize.Medium]: "tw-px-4 tw-h-9 tw-text-body-medium",
    [ButtonSize.Large]: "tw-px-6 tw-h-12 tw-text-body-large",
};

const iconOnlySizeClasses: Record<ButtonSize, string> = {
    [ButtonSize.Small]: "tw-p-1",
    [ButtonSize.Medium]: "tw-p-2",
    [ButtonSize.Large]: "tw-p-3",
};

const iconOnlyFullRoundingSizeClasses: Record<ButtonSize, string> = {
    [ButtonSize.Small]: "tw-p-0.5",
    [ButtonSize.Medium]: "tw-p-1",
    [ButtonSize.Large]: "tw-p-2",
};

const iconSpacing: Record<ButtonSize, string> = {
    [ButtonSize.Small]: "tw--ml-0.5 tw-mr-1",
    [ButtonSize.Medium]: "tw--ml-1 tw-mr-1.5",
    [ButtonSize.Large]: "tw--ml-1 tw-mr-2",
};

const styles: Record<"solid" | "translucent" | "inverted", Record<ButtonStyle, string>> = {
    solid: {
        [ButtonStyle.Primary]:
            "tw-text-button-strong-text tw-bg-button-strong-background " +
            "hover:tw-text-button-strong-text-hover hover:tw-bg-button-strong-background-hover " +
            "active:tw-text-button-strong-text-pressed active:tw-bg-button-strong-background-pressed ",
        [ButtonStyle.Secondary]:
            "tw-text-button-text tw-bg-button-background " +
            "hover:tw-text-button-text-hover hover:tw-bg-button-background-hover " +
            "active:tw-text-button-text-pressed active:tw-bg-button-background-pressed ",
        [ButtonStyle.Danger]:
            "tw-text-button-danger-text tw-bg-button-danger-background " +
            "hover:tw-text-button-danger-text-hover hover:tw-bg-button-danger-background-hover " +
            "active:tw-text-button-danger-text-pressed active:tw-bg-button-danger-background-pressed ",
        [ButtonStyle.Positive]:
            "tw-text-box-positive-strong-inverse tw-bg-box-positive-strong " +
            "hover:tw-text-box-positive-strong-inverse-hover hover:tw-bg-box-positive-strong-hover " +
            "active:tw-text-box-positive-strong-inverse-pressed active:tw-bg-box-positive-strong-pressed " +
            "dark:active:tw-bg-green-90 ",
    },
    inverted: {
        [ButtonStyle.Primary]:
            "tw-text-button-text tw-bg-base " +
            "hover:tw-text-button-text-hover hover:tw-bg-button-background-hover " +
            "active:tw-text-button-text-pressed active:tw-bg-button-background-pressed ",
        [ButtonStyle.Secondary]:
            "tw-text-button-strong-text tw-bg-button-strong-background " +
            "hover:tw-text-button-strong-text-hover hover:tw-bg-button-strong-background-hover " +
            "active:tw-text-button-strong-text-pressed active:tw-bg-button-strong-background-pressed ",
        [ButtonStyle.Danger]:
            "tw-text-button-danger-text tw-bg-button-danger-background " +
            "hover:tw-text-button-danger-text-hover hover:tw-bg-button-danger-background-hover " +
            "active:tw-text-button-danger-text-pressed active:tw-bg-button-danger-background-pressed ",
        [ButtonStyle.Positive]:
            "tw-text-box-positive-strong-inverse tw-bg-box-positive-strong " +
            "hover:tw-text-box-positive-strong-inverse-hover hover:tw-bg-box-positive-strong-hover " +
            "active:tw-text-box-positive-strong-inverse-pressed active:tw-bg-box-positive-strong-pressed " +
            "dark:active:tw-bg-green-90 ",
    },
    translucent: {
        [ButtonStyle.Primary]:
            "tw-text-button-text " +
            "hover:tw-text-button-text-hover hover:tw-bg-button-background-hover " +
            "active:tw-text-button-text-pressed active:tw-bg-button-background-pressed ",
        [ButtonStyle.Secondary]:
            "tw-text-button-text " +
            "hover:tw-text-button-text-hover hover:tw-bg-button-background-hover " +
            "active:tw-text-button-text-pressed active:tw-bg-button-background-pressed ",
        [ButtonStyle.Danger]:
            "tw-text-button-negative-icon " +
            "hover:tw-bg-button-negative-background-hover " +
            "active:tw-bg-button-negative-background-pressed ",
        [ButtonStyle.Positive]:
            "tw-text-button-positive-icon " +
            "hover:tw-bg-button-positive-background-hover " +
            "active:tw-bg-button-positive-background-pressed ",
    },
};

const iconSizes: Record<ButtonSize, IconSize> = {
    [ButtonSize.Small]: IconSize.Size16,
    [ButtonSize.Medium]: IconSize.Size20,
    [ButtonSize.Large]: IconSize.Size24,
};

const typesMap: Record<ButtonType, "button" | "submit" | "reset"> = {
    [ButtonType.Button]: "button",
    [ButtonType.Submit]: "submit",
    [ButtonType.Reset]: "reset",
};

export type ButtonProps = {
    type?: ButtonType;
    style?: ButtonStyle;
    size?: ButtonSize;
    rounding?: ButtonRounding;
    solid?: boolean;
    inverted?: boolean;
    disabled?: boolean;
    icon?: ReactElement;
    children?: ReactNode;
    onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    hugWidth?: boolean;
    "aria-label"?: string;
};

const ButtonComponent: ForwardRefRenderFunction<HTMLButtonElement | null, ButtonProps> = (
    {
        type = ButtonType.Button,
        style = ButtonStyle.Primary,
        size = ButtonSize.Medium,
        rounding = ButtonRounding.Medium,
        solid = true,
        inverted = false,
        disabled = false,
        icon,
        children,
        onClick,
        hugWidth = true,
        "aria-label": ariaLabel,
    },
    externalRef,
) => {
    const wrap = (child: ReactNode) => (children ? <span className={iconSpacing[size]}>{child}</span> : child);
    const { isFocusVisible, focusProps } = useFocusRing();
    const ref = useForwardedRef<HTMLButtonElement | null>(externalRef);
    const { buttonProps } = useButton(
        { onPress: () => onClick && onClick(), isDisabled: disabled, type: typesMap[type] },
        ref,
    );

    const getButtonTheme = useCallback(() => {
        if (inverted) {
            return "inverted";
        }

        return solid ? "solid" : "translucent";
    }, [solid, inverted]);

    const disabledClasses = [
        "tw-not-allowed tw-pointer-events-none",
        solid ? "tw-text-box-disabled-inverse tw-bg-box-disabled" : "tw-text-text-disabled",
    ];

    return (
        <button
            {...mergeProps(buttonProps, focusProps)}
            aria-label={ariaLabel}
            ref={ref}
            className={merge([
                "tw-outline-none tw-relative tw-flex tw-items-center tw-justify-center tw-border-0 tw-cursor-pointer tw-font-body tw-font-medium tw-transition-colors",
                rounding === ButtonRounding.Full
                    ? `tw-rounded-full ${iconOnlyFullRoundingSizeClasses[size]}`
                    : "tw-rounded",
                rounding === ButtonRounding.Medium &&
                    (icon && !children ? iconOnlySizeClasses[size] : sizeClasses[size]),
                merge(disabled ? disabledClasses : [isFocusVisible && FOCUS_STYLE, styles[getButtonTheme()][style]]),
                !hugWidth && "tw-w-full",
            ])}
            disabled={disabled}
            data-test-id="button"
        >
            {icon && wrap(cloneElement(icon, { size: iconSizes[size] }))}
            {children}
        </button>
    );
};

export const Button = forwardRef(ButtonComponent);
