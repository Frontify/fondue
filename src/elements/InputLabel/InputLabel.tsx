/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { PropsWithChildren, FC, useRef, useState } from "react";
import { merge } from "@utilities/merge";
import { usePopper } from "react-popper";
import { IconSize } from "@elements/Icon/IconSize";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import { useTooltipTrigger } from "@react-aria/tooltip";
import { useFocusVisible, useHover } from "@react-aria/interactions";
import { useTooltipTriggerState } from "@react-stately/tooltip";
import { TooltipArrow } from "@components/Tooltip/TooltipArrow";
import IconQuestion from "@elements/Icon/Generated/IconQuestion";
import { Tooltip, TooltipProps } from "@components/Tooltip/Tooltip";

export type InputLabelProps = PropsWithChildren<{
    htmlFor: string;
    required?: boolean;
    disabled?: boolean;
    tooltip?: Omit<TooltipProps, "tooltipAriaProps">;
    bold?: boolean;
}>;

const TOOLTIP_DISTANCE = 15;
const TOOLTIP_SKIDDING = 0;
const TOOLTIP_PADDING = 15;

export const InputLabel: FC<InputLabelProps> = ({
    children,
    htmlFor,
    required = false,
    disabled = false,
    tooltip,
    bold,
}) => {
    const tooltipElement = useRef<HTMLDivElement | null>(null);
    const [tooltipArrowElement, setTooltipArrowElement] = useState<HTMLElement | null>(null);
    const tooltipTriggerElement = useRef<HTMLButtonElement | null>(null);
    const state = useTooltipTriggerState();
    const { triggerProps, tooltipProps } = useTooltipTrigger({}, state, tooltipTriggerElement);
    const { isOpen } = state;

    const { isFocusVisible } = useFocusVisible();

    const { styles, attributes } = usePopper(tooltipTriggerElement.current, tooltipElement.current, {
        placement: "auto",
        modifiers: [
            { name: "offset", options: { offset: [TOOLTIP_SKIDDING, TOOLTIP_DISTANCE] } },
            { name: "arrow", options: { element: tooltipArrowElement, padding: TOOLTIP_PADDING } },
        ],
    });

    const { hoverProps } = useHover({
        onHoverStart: () => state.open(),
        onHoverEnd: () => state.close(),
    });

    return (
        <div
            className={merge([
                "tw-inline-flex tw-items-center tw-gap-1 tw-font-sans tw-text-s",
                disabled
                    ? "tw-text-black-40 hover:tw-text-black-40 dark:tw-text-black-60 dark:hover:tw-text-black-60"
                    : "tw-text-black-90 dark:tw-text-white",
            ])}
        >
            <label
                htmlFor={htmlFor}
                className={merge([
                    bold && "tw-font-medium",
                    disabled
                        ? "hover:tw-cursor-not-allowed tw-pointer-events-none"
                        : "hover:tw-cursor-pointer hover:tw-text-black dark:hover:tw-text-white",
                ])}
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
                    <div {...hoverProps}>
                        <button
                            data-test-id="tooltip-icon"
                            ref={tooltipTriggerElement}
                            className={merge([
                                "tw-inline-flex tw-justify-center tw-items-center tw-text-black-60 hover:tw-text-black-60 dark:tw-text-black-40 dark:hover:tw-text-white tw-cursor-default tw-outline-none tw-rounded-full",
                                isOpen && isFocusVisible && FOCUS_STYLE,
                            ])}
                            {...triggerProps}
                        >
                            <IconQuestion size={IconSize.Size16} />
                        </button>
                        {isOpen && (
                            <Tooltip
                                {...tooltip}
                                popperAttributes={attributes.popper}
                                ref={tooltipElement}
                                style={styles.popper}
                                tooltipAriaProps={tooltipProps}
                            >
                                <TooltipArrow ref={setTooltipArrowElement} style={styles.arrow} />
                            </Tooltip>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
