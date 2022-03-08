/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, RefObject, UIEvent, useRef, useState } from "react";
import { merge } from "@utilities/merge";
import { ScrollWrapperDirection, scrollWrapperDirections, ScrollWrapperProps } from "./types";

export const ScrollWrapper: FC<ScrollWrapperProps> = ({ direction, children }) => {
    const scrollingContainer = useRef<HTMLDivElement>(null);

    const useScrollTop = (scrollingContainer: RefObject<HTMLDivElement>) => {
        const [scrollTop, setScrollTop] = useState(0);
        const [scrollHeight, setScrollHeight] = useState(Infinity);

        const onScroll = (event: UIEvent) => {
            setScrollTop(event.target.scrollTop);
            setScrollHeight(event.target.scrollHeight);
        };

        const currentHeight = scrollingContainer.current?.clientHeight ?? 0;

        return [
            {
                showTopShadow: scrollHeight > 0 && scrollTop !== 0,
                showBottomShadow: scrollHeight !== 0 && scrollTop < scrollHeight - currentHeight,
            },
            { onScroll },
        ];
    };

    const [{ showTopShadow, showBottomShadow }, scrollDivProps] = useScrollTop(scrollingContainer);

    return (
        <div data-test-id="scroll-wrapper" className="tw-h-full">
            {showTopShadow && <div className="tw-h-10 tw-relative tw-z-10 tw-shadow-lg tw--mt-10" />}
            <div
                ref={scrollingContainer}
                className={merge([
                    "tw-h-full tw-py-8",
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
