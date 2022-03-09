/* (c) Copyright Frontify Ltd., all rights reserved. */

import { RefObject, useState } from "react";

export const useScrollWrapper = (scrollingContainer: RefObject<HTMLElement>) => {
    const [scrollTop, setScrollTop] = useState(0);
    const [scrollHeight, setScrollHeight] = useState(Infinity);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollWidth, setScrollWidth] = useState(Infinity);

    const onScroll = (event: UIEvent) => {
        const target = event.target as HTMLElement;
        setScrollTop(target.scrollTop);
        setScrollHeight(target.scrollHeight);
        setScrollLeft(target.scrollLeft);
        setScrollWidth(target.scrollWidth);
    };

    const currentHeight = scrollingContainer.current?.clientHeight ?? 0;
    const showTopShadow = scrollHeight > 0 && scrollTop !== 0;
    const showBottomShadow = scrollHeight !== 0 && scrollTop < scrollHeight - currentHeight;

    const currentWidth = scrollingContainer.current?.clientWidth ?? 0;
    const showLeftShadow = scrollWidth > 0 && scrollLeft !== 0;
    const showRightShadow = scrollWidth !== 0 && scrollLeft < scrollWidth - currentWidth;

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
