/* (c) Copyright Frontify Ltd., all rights reserved. */

import { RefObject, useState } from "react";

export const useScrollWrapper = (scrollingContainer: RefObject<HTMLDivElement>) => {
    const [scrollTop, setScrollTop] = useState(0);
    const [scrollHeight, setScrollHeight] = useState(Infinity);

    const onScroll = (event: UIEvent) => {
        const target = event.target as HTMLDivElement;
        setScrollTop(target.scrollTop);
        setScrollHeight(target.scrollHeight);
    };

    const currentHeight = scrollingContainer.current?.clientHeight ?? 0;

    const showTopShadow = scrollHeight > 0 && scrollTop !== 0;
    const showBottomShadow = scrollHeight !== 0 && scrollTop < scrollHeight - currentHeight;

    return [
        {
            showTopShadow,
            showBottomShadow,
        },
        { onScroll },
    ];
};
