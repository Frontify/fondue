/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from "@elements/Icon/IconSize";
import { merge } from "@utilities/merge";
import { cloneElement, FC, MouseEvent, ReactElement, ReactNode } from "react";

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
    [ButtonSize.Small]: "px-3 h-6 text-xs",
    [ButtonSize.Medium]: "px-4 h-8 text-s",
    [ButtonSize.Large]: "px-6 h-11 text-m",
};

const iconOnlySizeClasses: Record<ButtonSize, string> = {
    [ButtonSize.Small]: "p-1",
    [ButtonSize.Medium]: "p-2",
    [ButtonSize.Large]: "p-3",
};

const iconSpacing: Record<ButtonSize, string> = {
    [ButtonSize.Small]: "mr-1",
    [ButtonSize.Medium]: "mr-1.5",
    [ButtonSize.Large]: "mr-2",
};

const styles: Record<"solid" | "translucent", Record<ButtonStyle, string>> = {
    solid: {
        [ButtonStyle.Primary]:
            "text-white bg-black-90 hover:bg-black-100 active:bg-black-superdark dark:text-black dark:bg-white dark:hover:bg-black-10 dark:active:bg-black-20",
        [ButtonStyle.Secondary]:
            "text-black bg-black-10 hover:bg-black-20 active:bg-black-30 dark:text-white dark:bg-black-80 dark:hover:bg-black-95 dark:active:bg-black-superdark",
        [ButtonStyle.Danger]: "text-black bg-red-50 hover:bg-red-65 active:bg-red-70",
        [ButtonStyle.Positive]: "text-black bg-green-60 hover:bg-green-70 active:bg-green-75 dark:active:bg-green-90",
    },
    translucent: {
        [ButtonStyle.Primary]: "text-white bg-black-90 hover:bg-black-100 active:bg-black-superdark",
        [ButtonStyle.Secondary]:
            "text-black-80 bg-transparent hover:bg-black-10 hover:text-black active:bg-black-20 active:text-black dark:text-white dark:hover:bg-black-95 dark:active:bg-black-superdark dark:hover:text-white",
        [ButtonStyle.Danger]:
            "text-red-65 bg-transparent hover:bg-black-10 active:bg-black-20 dark:text-red-50 dark:hover:bg-black-95 dark:active:bg-black-superdark",
        [ButtonStyle.Positive]:
            "text-green-75 bg-transparent hover:bg-black-10 active:bg-black-20 dark:text-green-60 dark:hover:bg-black-95 dark:active:bg-black-superdark",
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

    return (
        <button
            className={merge([
                "outline-none relative flex items-center justify-center border-0 rounded cursor-pointer font-sans transition-colors",
                icon && !children ? iconOnlySizeClasses[size] : sizeClasses[size],
                merge(
                    disabled
                        ? [
                              "not-allowed pointer-events-none text-black-40 dark:text-black-60",
                              solid ? "bg-black-5 dark:bg-black-90" : "bg-transparent",
                          ]
                        : [
                              "focus:outline-none focus:ring-4 focus:border-violet-70",
                              styles[solid ? "solid" : "translucent"][style],
                          ],
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
