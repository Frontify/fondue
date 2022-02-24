/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { cloneElement, forwardRef, ForwardRefRenderFunction } from "react";

import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";

import { FOCUS_STYLE } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";
import { useForwardedRef } from "@utilities/useForwardedRef";

import { IconSize } from "@foundation/Icon/IconSize";
import { ButtonRounding, ButtonSize, ButtonType, ButtonProps, ButtonStyle, ButtonEmphasis } from "./ButtonTypes";
import {
    ButtonStyleClasses,
    ButtonCommonClasses,
    ButtonSizeClasses,
    ButtonRoundingClasses,
    IconSpacingClasses,
    ButtonDisabledClasses,
} from "./ButtonClasses";

export * from "./ButtonTypes";

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

const ButtonComponent: ForwardRefRenderFunction<HTMLButtonElement | null, ButtonProps> = (
    {
        type = ButtonType.Button,
        style = ButtonStyle.Default,
        size = ButtonSize.Medium,
        rounding = ButtonRounding.Medium,
        emphasis = ButtonEmphasis.Default,
        hideLabel = false,
        solid,
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
    const { isFocusVisible, focusProps } = useFocusRing();
    const ref = useForwardedRef<HTMLButtonElement | null>(externalRef);
    const { buttonProps } = useButton(
        { onPress: () => onClick && onClick(), isDisabled: disabled, type: typesMap[type] },
        ref,
    );
    const invertedStyleKey = inverted ? "inverted" : "default";

    const buttonClassName = merge([
        ButtonCommonClasses,
        rounding === ButtonRounding.Full ? ButtonRoundingClasses.Full : ButtonRoundingClasses.Medium,
        icon && !children ? ButtonSizeClasses[size].iconOnly : ButtonSizeClasses[size].default,
        !hugWidth && "tw-w-full",
        !disabled && ButtonStyleClasses[emphasis][style][invertedStyleKey].button,
        !disabled && isFocusVisible && FOCUS_STYLE,
        disabled && ButtonDisabledClasses.common,
        disabled && (!solid ? ButtonDisabledClasses.weak : ButtonDisabledClasses.default),
    ]);

    const textClassName = merge([
        !disabled && ButtonStyleClasses[emphasis][style][invertedStyleKey].text,
        hideLabel && "tw-sr-only",
    ]);

    const iconClassName = merge([
        children ? IconSpacingClasses[size] : "",
        !disabled && ButtonStyleClasses[emphasis][style][invertedStyleKey].icon,
    ]);

    return (
        <button
            {...mergeProps(buttonProps, focusProps)}
            aria-label={ariaLabel}
            ref={ref}
            className={buttonClassName}
            disabled={disabled}
            data-test-id="button"
        >
            {icon && <span className={iconClassName}>{cloneElement(icon, { size: iconSizes[size] })}</span>}
            {children && <span className={textClassName}>{children}</span>}
        </button>
    );
};

export const Button = forwardRef(ButtonComponent);
