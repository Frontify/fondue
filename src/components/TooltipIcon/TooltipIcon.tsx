/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { Tooltip, TooltipProps } from "@components/Tooltip/Tooltip";

export type TooltipIconProps = {
    tooltip?: Omit<TooltipProps, "tooltipAriaProps">;
};

export const TooltipIcon: FC<TooltipIconProps> = ({ tooltip }: TooltipIconProps) => {
    return <div data-test-id="tooltip-icon">{tooltip && <Tooltip {...tooltip} />}</div>;
};
