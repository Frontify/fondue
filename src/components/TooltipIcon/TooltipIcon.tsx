/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, ReactElement, cloneElement } from "react";
import IconQuestion from "@foundation/Icon/Generated/IconQuestion";
import { IconSize } from "@foundation/Icon/IconSize";
import { Tooltip, TooltipProps } from "@components/Tooltip/Tooltip";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";
import { IconProps } from "@foundation/Icon";
import { useFocusRing } from "@react-aria/focus";

export type TooltipIconProps = {
    tooltip?: TooltipProps;
    iconSize?: IconSize;
    triggerIcon?: ReactElement<IconProps>;
    triggerStyle?: TooltipIconTriggerStyle;
};

export enum TooltipIconTriggerStyle {
    Danger = "Danger",
    Warning = "Warning",
    Primary = "Primary",
}

const tooltipTriggerStyleClass: Record<TooltipIconTriggerStyle, string> = {
    [TooltipIconTriggerStyle.Danger]: "tw-text-box-negative-strong hover:tw-text-box-negative-strong-hover",
    [TooltipIconTriggerStyle.Warning]: "tw-text-box-warning-strong hover:tw-text-box-warning-strong-hover",
    [TooltipIconTriggerStyle.Primary]: "tw-text-text-weak hover:tw-text-text-x-weak",
};

export const TooltipIcon: FC<TooltipIconProps> = ({
    tooltip,
    iconSize = IconSize.Size16,
    triggerIcon = <IconQuestion />,
    triggerStyle = TooltipIconTriggerStyle.Primary,
}: TooltipIconProps) => {
    const { isFocusVisible, focusProps } = useFocusRing();

    return (
        <div data-test-id="tooltip-icon">
            {tooltip && (
                <div>
                    <Tooltip
                        triggerElement={
                            <button
                                {...focusProps}
                                data-test-id="tooltip-icon-trigger"
                                className={merge([
                                    "tw-inline-flex tw-justify-center tw-items-center  dark:tw-text-black-40 dark:hover:tw-text-white tw-cursor-default tw-outline-none tw-rounded-full",
                                    isFocusVisible && FOCUS_STYLE,
                                    tooltipTriggerStyleClass[triggerStyle],
                                ])}
                            >
                                {cloneElement(triggerIcon, { size: iconSize })}
                            </button>
                        }
                        withArrow={true}
                        {...tooltip}
                    />
                </div>
            )}
        </div>
    );
};
