/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Size, Style } from "@utilities/enum";
import { merge } from "@utilities/merge";
import React, { PropsWithChildren, ReactElement } from "react";

export type ButtonProps = PropsWithChildren<{
    style?: Style.Primary | Style.Secondary | Style.Danger;
    size?: Size;
    disabled?: boolean;
    onClick?: () => void;
}>;

const sizeClasses: Record<Size, string> = {
    [Size.Small]: "px-3 py-1",
    [Size.Medium]: "px-4 py-2",
    [Size.Large]: "px-5 py-3",
};

const variantClasses: Record<Style.Primary | Style.Secondary | Style.Danger, string> = {
    [Style.Primary]:
        "text-white bg-black-90 hover:bg-black active:bg-black-superdark dark:text-black dark:bg-white dark:hover:bg-black-10 active:bg-black-20",
    [Style.Secondary]:
        "text-black bg-black-10 hover:bg-black-20 active:bg-black-30 dark:text-white dark:bg-black-80 dark:hover:bg-black-95 active:bg-black-superdark",
    [Style.Danger]: "text-white bg-red-60 hober:bg-red-70 active:bg-red-90",
};

// `event.keyCode` for IE
const isSpaceKey = (event: React.KeyboardEvent) => event.keyCode == 32 || event.code === "Space";

export default function Button({
    style = Style.Primary,
    size = Size.Small,
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
                    ? "not-allowed pointer-events-none text-black-50 bg-black-10 dark:text-black-70 dark:bg-black-95"
                    : `focus:outline-none focus:ring focus:border-violet-70 ${variantClasses[style]}`,
            ])}
            disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(event) => {
                if (isSpaceKey(event)) {
                    event.preventDefault();
                }
            }}
            onKeyUp={(event) => {
                event.preventDefault();
                if (onClick && isSpaceKey(event)) {
                    onClick();
                }
            }}
            onClick={(event) => {
                event.preventDefault();
                if (onClick) {
                    onClick();
                }
            }}
            data-test-id="button"
        >
            {children}
        </button>
    );
}
