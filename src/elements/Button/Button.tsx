/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from "@elements/Icon/IconSize";
import { useFocusRing } from "@react-aria/focus";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";
import React, { cloneElement, FC, MouseEvent, ReactElement, ReactNode } from "react";

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

const sizeClasses: Record<ButtonSize, string> = {
    [ButtonSize.Small]: "tw-px-3 tw-h-6 tw-text-xs",
    [ButtonSize.Medium]: "tw-px-4 tw-h-9 tw-text-s",
    [ButtonSize.Large]: "tw-px-6 tw-h-12 tw-text-m",
};

const iconOnlySizeClasses: Record<ButtonSize, string> = {
    [ButtonSize.Small]: "tw-p-1",
    [ButtonSize.Medium]: "tw-p-2",
    [ButtonSize.Large]: "tw-p-3",
};

const iconSpacing: Record<ButtonSize, string> = {
    [ButtonSize.Small]: "tw--ml-0.5 tw-mr-1",
    [ButtonSize.Medium]: "tw--ml-1 tw-mr-1.5",
    [ButtonSize.Large]: "tw--ml-1 tw-mr-2",
};

const styles: Record<"solid" | "translucent", Record<ButtonStyle, string>> = {
    solid: {
        [ButtonStyle.Primary]:
            "tw-text-white tw-bg-black-90 hover:tw-bg-black-100 active:tw-bg-black-superdark dark:tw-text-black dark:tw-bg-white dark:hover:tw-bg-black-10 dark:active:tw-bg-black-20",
        [ButtonStyle.Secondary]:
            "tw-text-black tw-bg-black-10 hover:tw-bg-black-20 active:tw-bg-black-30 dark:tw-text-white dark:tw-bg-black-80 dark:hover:tw-bg-black-95 dark:active:tw-bg-black-superdark",
        [ButtonStyle.Danger]: "tw-text-black tw-bg-red-50 hover:tw-bg-red-65 active:tw-bg-red-70",
        [ButtonStyle.Positive]:
            "tw-text-black tw-bg-green-60 hover:tw-bg-green-70 active:tw-bg-green-75 dark:active:tw-bg-green-90",
    },
    translucent: {
        [ButtonStyle.Primary]: "tw-text-white tw-bg-black-90 hover:tw-bg-black-100 active:tw-bg-black-superdark",
        [ButtonStyle.Secondary]:
            "tw-text-black-80 tw-bg-transparent hover:tw-bg-black-10 hover:tw-text-black active:tw-bg-black-20 active:tw-text-black dark:tw-text-white dark:hover:tw-bg-black-95 dark:active:tw-bg-black-superdark dark:hover:tw-text-white",
        [ButtonStyle.Danger]:
            "tw-text-red-65 tw-bg-transparent hover:tw-bg-black-10 active:tw-bg-black-20 dark:tw-text-red-50 dark:hover:tw-bg-black-95 dark:active:tw-bg-black-superdark",
        [ButtonStyle.Positive]:
            "tw-text-green-75 tw-bg-transparent hover:tw-bg-black-10 active:tw-bg-black-20 dark:tw-text-green-60 dark:hover:tw-bg-black-95 dark:active:tw-bg-black-superdark",
    },
};

const iconSizes: Record<ButtonSize, IconSize> = {
    [ButtonSize.Small]: IconSize.Size16,
    [ButtonSize.Medium]: IconSize.Size20,
    [ButtonSize.Large]: IconSize.Size24,
};

export type ButtonProps = {
    style?: ButtonStyle;
    size?: ButtonSize;
    solid?: boolean;
    disabled?: boolean;
    icon?: ReactElement;
    children?: string;
    onClick?: (event: MouseEvent) => void;
};

export const Button: FC<ButtonProps> = ({
    style = ButtonStyle.Primary,
    size = ButtonSize.Medium,
    solid = true,
    disabled = false,
    icon,
    children,
    onClick,
}) => {
    const wrap = (child: ReactNode) => (children ? <span className={iconSpacing[size]}>{child}</span> : child);
    const { isFocusVisible, focusProps } = useFocusRing();

    return (
        <button
            {...focusProps}
            className={merge([
                "tw-outline-none tw-relative tw-flex tw-items-center tw-justify-center tw-border-0 tw-rounded tw-cursor-pointer tw-font-sans tw-transition-colors",
                icon && !children ? iconOnlySizeClasses[size] : sizeClasses[size],
                merge(
                    disabled
                        ? [
                              "tw-not-allowed tw-pointer-events-none tw-text-black-40 dark:tw-text-black-60",
                              solid ? "tw-bg-black-5 dark:tw-bg-black-90" : "tw-bg-transparent",
                          ]
                        : [isFocusVisible && FOCUS_STYLE, styles[solid ? "solid" : "translucent"][style]],
                ),
            ])}
            disabled={disabled}
            onClick={onClick}
            data-test-id="button"
        >
            {icon && wrap(cloneElement(icon, { size: iconSizes[size] }))}
            {children}
        </button>
    );
};
