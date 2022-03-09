/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, useRef } from "react";
import { merge } from "@utilities/merge";
import { ScrollWrapperDirection, scrollWrapperDirections, ScrollWrapperProps } from "./types";
import { useScrollWrapper } from "./hooks/useScrollWrapper";

export const ScrollWrapper: FC<ScrollWrapperProps> = ({ direction, children }) => {
    const scrollingContainer = useRef<HTMLDivElement>(null);

    const [{ showTopShadow, showBottomShadow }, scrollDivProps] = useScrollWrapper(scrollingContainer);

    return (
        <div data-test-id="scroll-wrapper" className="tw-h-full">
            {showTopShadow && <div className="tw-h-10 tw-relative tw-z-10 tw-shadow-lg tw--mt-10" />}
            <div
                ref={scrollingContainer}
                className={merge([
                    "tw-h-full tw-py-6",
                    scrollWrapperDirections[direction ?? ScrollWrapperDirection.Vertical],
                ])}
                {...scrollDivProps}
            >
                {children}
            </div>
            {showBottomShadow && <div className="tw-h-10 tw-shadow-lg tw-transform tw-rotate-180" />}
        </div>
    );
};
