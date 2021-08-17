/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconQuestion from "@elements/Icon/Generated/IconQuestion";
import { IconSize } from "@elements/Icon/IconSize";
import { useTooltip, useTooltipTrigger } from "@react-aria/tooltip";
import { useTooltipTriggerState } from "@react-stately/tooltip";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";
import React, { FC, ReactNode, useRef, useState } from "react";
import { usePopper } from "react-popper";

export type TooltipProps = {
    tooltip: ReactNode;
};

const TOOLTIP_DISTANCE = 9;
const TOOLTIP_SKIDDING = 0;

export const Tooltip: FC<TooltipProps> = ({ tooltip }) => {
    const [tooltipTriggerElement, setTooltipTriggerElement] = useState<HTMLElement | null>(null);
    const [tooltipElement, setTooltipElement] = useState<HTMLDivElement | null>(null);
    const state = useTooltipTriggerState();
    const { triggerProps, tooltipProps } = useTooltipTrigger({}, state, useRef(tooltipTriggerElement));
    const { tooltipProps: tooltipAriaProps } = useTooltip(tooltipProps, state);
    const { isOpen } = state;
    const { styles, attributes } = usePopper(tooltipTriggerElement, tooltipElement, {
        placement: "auto-end",
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [TOOLTIP_SKIDDING, TOOLTIP_DISTANCE],
                },
            },
        ],
    });

    return (
        <>
            <button
                {...triggerProps}
                data-test-id="tooltip-icon"
                ref={setTooltipTriggerElement}
                onMouseEnter={() => state.open()}
                onMouseLeave={() => state.close(true)}
                className={merge([
                    "tw-inline-flex tw-items-center tw-justify-center tw-text-black-60 hover:tw-text-black dark:tw-text-black-40 dark:hover:white tw-cursor-default tw-outline-none",
                    isOpen && FOCUS_STYLE,
                ])}
            >
                <IconQuestion size={IconSize.Size16} />
            </button>
            {isOpen && (
                <div
                    {...tooltipAriaProps}
                    data-test-id="tooltip"
                    ref={setTooltipElement}
                    style={styles.popper}
                    {...attributes.popper}
                    className="tw-p-4 tw-border tw-border-black-10 tw-bg-white tw-rounded-md tw-shadow-mid dark:tw-bg-black-90 dark:tw-text-white tw-z-20"
                >
                    {tooltip}
                </div>
            )}
        </>
    );
};
