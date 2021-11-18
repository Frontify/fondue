/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { Tooltip, TooltipProps } from "@components/Tooltip/Tooltip";
import IconQuestion from "@foundation/Icon/Generated/IconQuestion";
import { IconSize } from "@foundation/Icon/IconSize";

export type TooltipIconProps = {
    tooltip?: Omit<TooltipProps, "tooltipAriaProps">;
    iconSize?: IconSize;
};

export const TooltipIcon: FC<TooltipIconProps> = ({ tooltip, iconSize = IconSize.Size16 }: TooltipIconProps) => {
    return (
        <div data-test-id="tooltip-icon">
            {tooltip && (
        <>
            <IconQuestion size={iconSize} />
            <Tooltip {...tooltip} />
        </>
            )}
        </div>
    );
};
