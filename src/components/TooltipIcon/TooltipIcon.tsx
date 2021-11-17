/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, ReactElement } from "react";
import IconQuestion from "@foundation/Icon/Generated/IconQuestion";
import { IconSize } from "@foundation/Icon/IconSize";
import { TooltipProps } from "@components/Tooltip/Tooltip";
import { useHover } from "@react-aria/interactions";

export type TooltipIconProps = {
    tooltip: ReactElement<TooltipProps>;
};

export const TooltipIcon: FC<TooltipIconProps> = ({ tooltip }: TooltipIconProps) => {
    const { hoverProps, isHovered } = useHover({
        onHoverStart: () => console.log("hover start"),
        onHoverEnd: () => console.log("hover end"),
    });

    console.log("hoverProps:", hoverProps, isHovered);

    return (
        <div data-test-id="tooltip-icon" {...hoverProps}>
            <span className="tw-text-black-80">
                <IconQuestion size={IconSize.Size20} />
                {tooltip}
            </span>
        </div>
    );
};
