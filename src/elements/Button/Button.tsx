/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from "@utilities/merge";
import { MouseEvent, PropsWithChildren, ReactElement } from "react";

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

export type ButtonProps = PropsWithChildren<{
    style?: Style;
    size?: Size;
    solid?: boolean;
    disabled?: boolean;
    onClick?: (event: MouseEvent) => void;
}>;

const sizeClasses: Record<Size, string> = {
    [Size.Small]: "px-3 py-1 text-xs",
    [Size.Medium]: "px-4 py-2 text-s",
    [Size.Large]: "px-6 py-3 text-m",
};

const styles: Record<"solid" | "translucent", Record<Style, string>> = {
    solid: {
        [Style.Primary]: "text-white bg-black-90 hover:bg-black-100 active:bg-black-superdark",
        [Style.Secondary]:
            "text-black bg-black-10 hover:bg-black-20 active:bg-black-30 dark:text-white dark:bg-black-80 dark:hover:bg-black-95 dark:active:bg-black-superblack",
        [Style.Danger]: "text-black bg-red-50 hover:bg-red-65 active:bg-red-70",
        [Style.Positive]: "text-black bg-green-60 hover:bg-green-70 active:bg-green-75",
    },
    translucent: {
        [Style.Primary]: "text-white bg-black-90 hover:bg-black-100 active:bg-black-superdark",
        [Style.Secondary]:
            "text-black-80 bg-transparent hover:bg-black-10 hover:text-black active:bg-black-20 active:text-black dark:text-white dark:hover:bg-black-95 dark:active:bg-black-superblack dark:hover:text-white",
        [Style.Danger]: "text-red-65 bg-transparent hover:bg-black-10 active:bg-black-20",
        [Style.Positive]: "text-green-75 bg-transparent hover:bg-black-10 active:bg-black-20",
    },
};

export default function Button({
    style = Style.Secondary,
    size = Size.Small,
    solid = true,
    disabled = false,
    onClick,
    children,
}: ButtonProps): ReactElement<ButtonProps> {
    return (
        <button
            className={merge([
                "outline-none relative flex items-center justify-center border-0 rounded cursor-pointer font-sans transition-colors",
                sizeClasses[size],
                disabled
                    ? merge(["not-allowed pointer-events-none text-black-40 ", solid ? "bg-black-5" : "bg-transparent"])
                    : `focus:outline-none focus:ring-4 focus:border-violet-70 ${
                          styles[solid ? "solid" : "translucent"][style]
                      }`,
            ])}
            disabled={disabled}
            onClick={onClick}
            data-test-id="button"
        >
            {children}
        </button>
    );
}
