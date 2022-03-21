/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, useRef } from "react";
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

    return (
        <div data-test-id="scroll-wrapper" className="tw-h-full tw-relative tw-overflow-hidden">
            {directionVertical && showTopShadow && (
                <div className="tw-h-10 tw-relative tw-z-10 tw-shadow-lg tw--mt-10" />
            )}
            {directionHorizontal && showLeftShadow && (
                <div className="tw-w-full tw-h-10 tw-absolute tw--left-1/2 tw-top-1/2 tw-z-10 tw-bg-white tw-shadow-lg tw--rotate-90 tw--translate-x-5" />
            )}
            <div ref={scrollingContainer} className={scrollWrapperDirections[direction]} {...scrollDivProps}>
                {children}
            </div>
            {directionVertical && showBottomShadow && (
                <div className="tw-h-10 tw-shadow-lg tw-transform tw-rotate-180" />
            )}
            {directionHorizontal && showRightShadow && (
                <div className="tw-w-full tw-h-10 tw-absolute tw-left-1/2 tw-top-1/2 tw-z-10 tw-bg-white tw-shadow-lg tw-rotate-90 tw-translate-x-5" />
            )}
        </div>
    );
};
