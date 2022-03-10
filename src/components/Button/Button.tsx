/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { cloneElement, forwardRef, ForwardRefRenderFunction, MouseEvent, ReactElement, ReactNode } from "react";

import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";

import { FOCUS_STYLE } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";
import { useForwardedRef } from "@utilities/useForwardedRef";

import { IconSize } from "@foundation/Icon/IconSize";
import { ButtonRounding, ButtonSize, ButtonType, ButtonStyle, ButtonEmphasis } from "./ButtonTypes";
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

export type ButtonProps = {
    type?: ButtonType;
    style?: ButtonStyle;
    emphasis?: ButtonEmphasis;
    hideLabel?: boolean;
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
        style = ButtonStyle.Default,
        size = ButtonSize.Medium,
        rounding = ButtonRounding.Medium,
        emphasis = ButtonEmphasis.Default,
        hideLabel = false,
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
    const { isFocusVisible, focusProps } = useFocusRing();
    const ref = useForwardedRef<HTMLButtonElement | null>(externalRef);
    const { buttonProps } = useButton(
        { onPress: () => onClick && onClick(), isDisabled: disabled, type: typesMap[type] },
        ref,
    );
    const invertedStyleKey = inverted ? "inverted" : "default";

    const getButtonStyleClasses = () => {
        if (!solid) {
            emphasis = ButtonEmphasis.Weak;
        }
        return ButtonStyleClasses[emphasis][style][invertedStyleKey];
    };

    const setStylingClass = (kind: string) => {
        const buttonClass = getButtonStyleClasses();

        if (!disabled) {
            switch (kind) {
                case "button":
                    if (isFocusVisible) {
                        return buttonClass.button && FOCUS_STYLE;
                    } else {
                        return buttonClass.button;
                    }
                case "icon":
                    return buttonClass.icon;
                case "text":
                    return buttonClass.text;
            }
        }

        if (disabled) {
            return (
                ButtonDisabledClasses.common && (!solid ? ButtonDisabledClasses.weak : ButtonDisabledClasses.default)
            );
        }
    };

    const buttonClassName = merge([
        ButtonCommonClasses,
        rounding === ButtonRounding.Full ? ButtonRoundingClasses.Full : ButtonRoundingClasses.Medium,
        (icon && !children) || hideLabel ? ButtonSizeClasses[size].iconOnly : ButtonSizeClasses[size].default,
        !hugWidth && "tw-w-full",
        setStylingClass("button"),
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
            {icon && (
                <span
                    data-test-id="button-icon"
                    className={merge([children && !hideLabel ? IconSpacingClasses[size] : "", setStylingClass("icon")])}
                >
                    {cloneElement(icon, { size: iconSizes[size] })}
                </span>
            )}
            {children && (
                <span
                    data-test-id="button-text"
                    className={merge([setStylingClass("text"), hideLabel && "tw-sr-only"])}
                >
                    {children}
                </span>
            )}
        </button>
    );
};

export const Button = forwardRef(ButtonComponent);
