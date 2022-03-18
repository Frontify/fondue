/* (c) Copyright Frontify Ltd., all rights reserved. */

import { RefObject, useState, UIEvent } from "react";

export const useScrollWrapper = (scrollingContainer: RefObject<HTMLElement>) => {
    const [scrollDimensions, setScrollDimensions] = useState({ top: 0, height: Infinity, width: Infinity, left: 0 });

    const onScroll = (event: UIEvent) => {
        const target = event.target as HTMLElement;
        setScrollDimensions({
            top: target.scrollTop,
            height: target.scrollHeight,
            left: target.scrollLeft,
            width: target.scrollWidth,
        });
    };

    const { top, height, left, width } = scrollDimensions;

    const currentHeight = scrollingContainer.current?.clientHeight ?? 0;
    const showTopShadow = height > 0 && top !== 0;
    const showBottomShadow = height !== 0 && top < height - currentHeight;

    const currentWidth = scrollingContainer.current?.clientWidth ?? 0;
    const showLeftShadow = width > 0 && left !== 0;
    const showRightShadow = width !== 0 && left < width - currentWidth;

    return [
        {
            showTopShadow,
            showBottomShadow,
            showLeftShadow,
            showRightShadow,
        },
        { onScroll },
    ];
};
