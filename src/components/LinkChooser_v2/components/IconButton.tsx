import { useFocusRing } from "@react-aria/focus";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";
import React, { FC, MouseEvent } from "react";
import { IconButtonProps } from "../types";

export const IconButton: FC<IconButtonProps> = ({
    disabled,
    title,
    ariaLabel,
    testId,
    icon,
    onClick,
    isComboBoxControl,
}) => {
    const { isFocusVisible, focusProps } = useFocusRing();

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onClick && onClick();
    };

    return (
        <button
            {...focusProps}
            className={merge([
                "tw-flex tw-items-center tw-justify-center tw-transition-colors tw-rounded tw-flex-none",
                disabled ? "tw-cursor-default tw-text-black-40" : "tw-text-black-80  hover:tw-text-black-100",
                isFocusVisible && FOCUS_STYLE,
            ])}
            data-test-id={testId}
            title={title}
            aria-label={ariaLabel}
            data-combo-box-control={isComboBoxControl}
            disabled={disabled}
            onClick={handleClick}
        >
            {icon}
        </button>
    );
};
