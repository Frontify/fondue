/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { cloneElement, FC, ReactElement, useRef, useState } from "react";
import { usePopper } from "react-popper";
import { useFocusVisible, useHover } from "@react-aria/interactions";
import { useTooltipTrigger } from "@react-aria/tooltip";
import { useTooltipTriggerState } from "@react-stately/tooltip";
import IconQuestion from "@foundation/Icon/Generated/IconQuestion";
import { IconSize } from "@foundation/Icon/IconSize";
import { Tooltip, TooltipProps } from "@components/Tooltip/Tooltip";
import { TooltipArrow } from "@components/Tooltip/TooltipArrow";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";
import { IconProps } from "@foundation/Icon";

export type TooltipIconProps = {
    tooltip?: Omit<TooltipProps, "tooltipAriaProps">;
    iconSize?: IconSize;
    triggerIcon?: ReactElement<IconProps>;
    triggerStyle?: TooltipIconTriggerStyle;
};

export type TooltipIconTriggerStyle = "Danger" | "Warning" | "Primary";

export const tooltipIconTriggerStyleClassMap: Record<TooltipIconTriggerStyle, string> = {
    Danger: "tw-text-box-negative-strong",
    Warning: "tw-text-box-warning-strong",
    Primary: "tw-text-black-60 hover:tw-text-black-60 dark:tw-text-black-40 dark:hover:tw-text-white",
};

const TOOLTIP_DISTANCE = 15;
const TOOLTIP_SKIDDING = 0;
const TOOLTIP_PADDING = 15;

export const TooltipIcon: FC<TooltipIconProps> = ({
    tooltip,
    triggerIcon = <IconQuestion />,
    iconSize = IconSize.Size16,
    triggerStyle = "Primary",
}: TooltipIconProps) => {
    const [tooltipArrowElement, setTooltipArrowElement] = useState<HTMLElement | null>(null);
    const tooltipTriggerElement = useRef<HTMLButtonElement | null>(null);
    const tooltipElement = useRef<HTMLDivElement | null>(null);
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
        <div data-test-id="tooltip-icon">
            {tooltip && (
                <div {...hoverProps}>
                    <button
                        data-test-id="tooltip-icon-trigger"
                        ref={tooltipTriggerElement}
                        className={merge([
                            "tw-inline-flex tw-justify-center tw-items-center tw-cursor-default tw-outline-none tw-rounded-full",
                            isOpen && isFocusVisible && FOCUS_STYLE,
                            tooltipIconTriggerStyleClassMap[triggerStyle],
                        ])}
                        {...triggerProps}
                    >
                        {cloneElement(triggerIcon, { size: iconSize })}
                    </button>
                    {isOpen && (
                        <Tooltip
                            {...tooltip}
                            popperAttributes={attributes.popper}
                            ref={tooltipElement}
                            style={styles.popper}
                            tooltipAriaProps={tooltipProps}
                        >
                            <TooltipArrow
                                ref={setTooltipArrowElement}
                                style={styles.arrow}
                                placement={attributes.popper?.["data-popper-placement"]}
                                headerColor={tooltip.brightHeader}
                            />
                        </Tooltip>
                    )}
                </div>
            )}
        </div>
    );
};
