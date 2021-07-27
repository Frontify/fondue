/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from "@elements/Icon/Icon";
import { merge } from "@utilities/merge";
import { cloneElement, MouseEvent, ReactElement, ReactNode } from "react";

export enum Style {
    Secondary = "Secondary",
    Primary = "Primary",
    Danger = "Danger",
    Positive = "Positive",
}

export enum Size {
    Small = "Small",
    Medium = "Medium",
    Large = "Large",
}

const sizeClasses: Record<Size, string> = {
    [Size.Small]: "px-3 py-1 text-xs",
    [Size.Medium]: "px-4 py-2 text-s",
    [Size.Large]: "px-6 py-3 text-m",
};

const iconOnlySizeClasses: Record<Size, string> = {
    [Size.Small]: "p-1",
    [Size.Medium]: "p-2",
    [Size.Large]: "p-3",
};

const iconSpacing: Record<Size, string> = {
    [Size.Small]: "mr-1",
    [Size.Medium]: "mr-1.5",
    [Size.Large]: "mr-2",
};

const styles: Record<"solid" | "translucent", Record<Style, string>> = {
    solid: {
        [Style.Primary]:
            "text-white bg-black-90 hover:bg-black-100 active:bg-black-superdark dark:text-black dark:bg-white dark:hover:bg-black-10 dark:active:bg-black-20",
        [Style.Secondary]:
            "text-black bg-black-10 hover:bg-black-20 active:bg-black-30 dark:text-white dark:bg-black-80 dark:hover:bg-black-95 dark:active:bg-black-superdark",
        [Style.Danger]: "text-black bg-red-50 hover:bg-red-65 active:bg-red-70",
        [Style.Positive]: "text-black bg-green-60 hover:bg-green-70 active:bg-green-75 dark:active:bg-green-90",
    },
    translucent: {
        [Style.Primary]: "text-white bg-black-90 hover:bg-black-100 active:bg-black-superdark",
        [Style.Secondary]:
            "text-black-80 bg-transparent hover:bg-black-10 hover:text-black active:bg-black-20 active:text-black dark:text-white dark:hover:bg-black-95 dark:active:bg-black-superdark dark:hover:text-white",
        [Style.Danger]:
            "text-red-65 bg-transparent hover:bg-black-10 active:bg-black-20 dark:text-red-50 dark:hover:bg-black-95 dark:active:bg-black-superdark",
        [Style.Positive]:
            "text-green-75 bg-transparent hover:bg-black-10 active:bg-black-20 dark:text-green-60 dark:hover:bg-black-95 dark:active:bg-black-superdark",
    },
};

const iconSizes: Record<Size, IconSize> = {
    [Size.Small]: IconSize.Size16,
    [Size.Medium]: IconSize.Size20,
    [Size.Large]: IconSize.Size24,
};

export type ButtonProps = {
    style?: Style;
    size?: Size;
    solid?: boolean;
    disabled?: boolean;
    icon?: ReactElement;
    children?: string;
    onClick?: (event: MouseEvent) => void;
};

export default function Button({
    style = Style.Secondary,
    size = Size.Small,
    solid = true,
    disabled = false,
    icon,
    children,
    onClick,
}: ButtonProps): ReactElement<ButtonProps> {
    const wrap = (child: ReactNode) => (children ? <span className={iconSpacing[size]}>{child}</span> : child);

    return (
        <button
            className={merge([
                "outline-none relative flex items-center justify-center border-0 rounded cursor-pointer font-sans transition-colors",
                icon ? iconOnlySizeClasses[size] : sizeClasses[size],
                disabled
                    ? merge([
                          "not-allowed pointer-events-none text-black-40 dark:text-black-60",
                          solid ? "bg-black-5 dark:bg-black-90" : "bg-transparent",
                      ])
                    : `focus:outline-none focus:ring-4 focus:border-violet-70 ${
                          styles[solid ? "solid" : "translucent"][style]
                      }`,
            ])}
            disabled={disabled}
            onClick={onClick}
            data-test-id="button"
        >
            {icon && wrap(cloneElement(icon, { size: iconSizes[size] }))}
            {children}
        </button>
    );
}
