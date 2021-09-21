/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { PropsWithChildren, FC, useRef, useState } from "react";
import { merge } from "@utilities/merge";
import { IconSize } from "@elements/Icon/IconSize";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import { useTooltipTrigger } from "@react-aria/tooltip";
import { useFocusVisible } from "@react-aria/interactions";
import { useTooltipTriggerState } from "@react-stately/tooltip";
import IconQuestion from "@elements/Icon/Generated/IconQuestion";
import { Tooltip, TooltipProps } from "@components/Tooltip/Tooltip";

export type InputLabelProps = PropsWithChildren<{
    htmlFor: string;
    required?: boolean;
    disabled?: boolean;
    tooltip?: Omit<TooltipProps, "tooltipAriaProps" | "tooltipState">;
    bold?: boolean;
}>;

export const InputLabel: FC<InputLabelProps> = ({
    children,
    htmlFor,
    required = false,
    disabled = false,
    tooltip,
    bold,
}) => {
    const [tooltipTriggerElement, setTooltipTriggerElement] = useState<HTMLElement | null>(null);
    const state = useTooltipTriggerState();
    const { triggerProps, tooltipProps } = useTooltipTrigger({}, state, useRef(tooltipTriggerElement));
    const { isOpen } = state;

    const { isFocusVisible } = useFocusVisible();

    return (
        <div
            className={merge([
                "tw-inline-flex tw-items-center tw-gap-1 tw-font-sans tw-text-s",
                bold && "tw-font-medium",
                disabled
                    ? "tw-text-black-40 hover:tw-text-black-40 dark:tw-text-black-60 dark:hover:tw-text-black-60"
                    : "tw-text-black-90 dark:tw-text-white",
            ])}
        >
            <label
                htmlFor={htmlFor}
                className={
                    disabled
                        ? "hover:tw-cursor-not-allowed tw-pointer-events-none"
                        : "hover:tw-cursor-pointer hover:tw-text-black dark:hover:tw-text-white"
                }
                data-test-id="input-label"
            >
                {children}
            </label>
            {required && (
                <span
                    data-test-id="input-label-required"
                    className="tw-h-4 tw-text-m tw-text-red-60 dark:tw-text-red-50"
                >
                    *
                </span>
            )}
            {tooltip && (
                <>
                    <button
                        {...triggerProps}
                        data-test-id="tooltip-icon"
                        ref={setTooltipTriggerElement}
                        onMouseEnter={() => state.open()}
                        onMouseLeave={() => state.close(true)}
                        className={merge([
                            "tw-inline-flex tw-justify-center tw-items-center tw-text-black-60 hover:tw-text-black-60 dark:tw-text-black-40 dark:hover:tw-text-white tw-cursor-default tw-outline-none tw-rounded-full",
                            isOpen && isFocusVisible && FOCUS_STYLE,
                        ])}
                    >
                        <IconQuestion size={IconSize.Size16} />
                    </button>
                    {isOpen && <Tooltip tooltip={tooltip} tooltipAriaProps={tooltipProps} />}
                </>
            )}
        </div>
    );
};
