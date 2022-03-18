/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, useRef } from "react";
import { merge } from "../..";
import { useScrollWrapper } from "./hooks/useScrollWrapper";
import { ScrollWrapperDirection, scrollWrapperDirections, ScrollWrapperProps } from "./types";

export const ScrollWrapper: FC<ScrollWrapperProps> = ({ direction = ScrollWrapperDirection.Vertical, children }) => {
    const scrollingContainer = useRef<HTMLDivElement>(null);

    const [{ showTopShadow, showBottomShadow, showLeftShadow, showRightShadow }, scrollDivProps] =
        useScrollWrapper(scrollingContainer);

    const directionVertical =
        direction === ScrollWrapperDirection.Vertical || direction === ScrollWrapperDirection.Both;
    const directionHorizontal =
        direction === ScrollWrapperDirection.Horizontal || direction === ScrollWrapperDirection.Both;

    const scrollShadows = [];

    if (directionVertical && showTopShadow) {
        scrollShadows.push("inset 0 11px 10px -12px rgba(0,0,0,0.5)");
    }
    if (directionVertical && showBottomShadow) {
        scrollShadows.push("inset 0 -11px 10px -12px rgba(0,0,0,0.5)");
    }
    if (directionHorizontal && showLeftShadow) {
        scrollShadows.push("inset 11px 0 10px -12px rgba(0,0,0,0.5)");
    }
    if (directionHorizontal && showRightShadow) {
        scrollShadows.push("inset -11px 0 10px -12px rgba(0,0,0,0.5)");
    }

    return (
        <div
            data-test-id="scroll-wrapper"
            className="tw-h-full tw-relative tw-shadow-black-10 tw-z-20"
            style={{ boxShadow: scrollShadows.join(", ") }}
        >
            <div ref={scrollingContainer} className={merge([scrollWrapperDirections[direction]])} {...scrollDivProps}>
                {children}
            </div>
        </div>
    );
};
