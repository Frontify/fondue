/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { CSSProperties, forwardRef } from "react";
import "./TooltipArrow.css";

export type TooltipArrowProps = {
    style: CSSProperties;
};

export const TooltipArrow = forwardRef<HTMLDivElement, TooltipArrowProps>(({ style }, ref) => {
    return (
        <div
            ref={ref}
            className="arcade-tooltip-arrow tw-absolute tw-w-3 tw-h-3 tw-pointer-events-none before:tw-absolute before:tw--z-1 before:tw-w-3 before:tw-h-3 before:tw-bg-black-100 dark:before:tw-bg-white before:tw-rotate-45"
            style={style}
        />
    );
});
TooltipArrow.displayName = "TooltipArrow";
