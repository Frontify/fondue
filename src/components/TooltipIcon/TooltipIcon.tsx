/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, useRef } from "react";
import { useFocusVisible } from "@react-aria/interactions";
import IconQuestion from "@foundation/Icon/Generated/IconQuestion";
import { IconSize } from "@foundation/Icon/IconSize";
import { Tooltip, TooltipProps } from "@components/Tooltip/Tooltip";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";

export type TooltipIconProps = {
    tooltip?: TooltipProps;
    iconSize?: IconSize;
};

export const TooltipIcon: FC<TooltipIconProps> = ({ tooltip, iconSize = IconSize.Size16 }: TooltipIconProps) => {
    const tooltipTriggerElement = useRef<HTMLButtonElement | null>(null);
    const { isFocusVisible } = useFocusVisible();

    return (
        <div data-test-id="tooltip-icon">
            {tooltip && (
                <div>
                    <button
                        data-test-id="tooltip-icon-trigger"
                        ref={tooltipTriggerElement}
                        className={merge([
                            "tw-inline-flex tw-justify-center tw-items-center tw-text-black-60 hover:tw-text-black-60 dark:tw-text-black-40 dark:hover:tw-text-white tw-cursor-default tw-outline-none tw-rounded-full",
                            isFocusVisible && FOCUS_STYLE,
                        ])}
                    >
                        <IconQuestion size={iconSize} />
                    </button>
                    <Tooltip triggerRefElement={tooltipTriggerElement} withArrow={true} {...tooltip} />
                </div>
            )}
        </div>
    );
};
