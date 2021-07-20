/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Size, Style, Theme } from "@utilities/enum";
import { ReactElement } from "react";
import css from "./Button.module.css";

export interface ButtonProps {
    theme?: Theme;
    style?: Style.Primary | Style.Secondary | Style.Danger;
    size?: Size;
    disabled?: boolean;

    onClick?: () => void;

    children: ReactElement | ReactElement[] | string;
}

export default function Button({
    theme = Theme.Light,
    style = Style.Primary,
    size = Size.Small,
    disabled = false,
    onClick,
    children,
}: ButtonProps): ReactElement<ButtonProps> {
    const onButtonKeyUp = (event: React.KeyboardEvent): void => {
        event.preventDefault();
        // `event.keyCode` for IE
        if (event.keyCode === 32 || event.code === "Space") {
            onClick && onClick();
        }
    };

    // Disable scrolling when pressing space
    const onButtonKeyDown = (event: React.KeyboardEvent): void => {
        if (event.keyCode == 32 || event.code === "Space") {
            event.preventDefault();
        }
    };

    const onButtonClick = (event: React.MouseEvent): void => {
        event.preventDefault();
        onClick && onClick();
    };

    const buttonClasses = [
        css.button,
        css[`theme${theme}`],
        css[`size${size}`],
        ...(disabled ? [css.disabled] : [css[`style${style}`]]),
    ].join(" ");

    const buttonConditionalAttributes = {
        ...(!disabled && {
            onClick: onButtonClick,
            onKeyUp: onButtonKeyUp,
            onKeyDown: onButtonKeyDown,
        }),
    };

    return (
        <button
            className={buttonClasses}
            tabIndex={disabled ? -1 : 0}
            {...buttonConditionalAttributes}
            data-test-id="button"
        >
            {children}
        </button>
    );
}
