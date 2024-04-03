/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RefObject, type UIEvent, useEffect, useState } from 'react';

const getScrollDimensions = (HTMLElement: HTMLElement) => ({
    top: Math.ceil(HTMLElement.scrollTop),
    height: HTMLElement.scrollHeight,
    left: Math.ceil(HTMLElement.scrollLeft),
    width: HTMLElement.scrollWidth,
});

export const useScrollWrapper = (scrollingContainer: RefObject<HTMLElement>) => {
    const [scrollDimensions, setScrollDimensions] = useState({ top: 0, height: Infinity, width: Infinity, left: 0 });

    const onScroll = (event: UIEvent) => {
        const target = event.target as HTMLElement;
        const dimensions = getScrollDimensions(target);
        setScrollDimensions(dimensions);
    };

    useEffect(() => {
        const updateDimensionsFromRef = () => {
            if (scrollingContainer.current) {
                const dimensions = getScrollDimensions(scrollingContainer.current);
                /* setTimeout is required to prevent error "ResizeObserver loop limit exceeded"
                from being thrown during cypress component tests */
                setTimeout(() => setScrollDimensions(dimensions), 0);
            }
        };

        updateDimensionsFromRef();

        const resizeObserver = new ResizeObserver(updateDimensionsFromRef);
        if (scrollingContainer.current) {
            resizeObserver.observe(scrollingContainer.current);
        }
        window.addEventListener('resize', updateDimensionsFromRef);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', updateDimensionsFromRef);
        };
    }, [scrollingContainer]);

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
