/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MutableRefObject, useEffect } from 'react';

export const useContainScroll = (overlayRef: MutableRefObject<HTMLDivElement | null>, { isDisabled = false }) => {
    useEffect(() => {
        const overlay = overlayRef.current;

        const closestScrollableAncestor = (element: HTMLElement | null): HTMLElement | null => {
            const SCROLL_TYPES = ['auto', 'scroll'];
            if (!element || element === overlay) {
                return null;
            }
            const hasVisibleScrollbar =
                element.scrollHeight > element.clientHeight &&
                SCROLL_TYPES.includes(window.getComputedStyle(element).overflowY);
            if (hasVisibleScrollbar) {
                return element;
            } else {
                return closestScrollableAncestor(element.parentElement);
            }
        };

        const scrollHandler = (event: WheelEvent) => {
            const prevent = () => {
                event.stopPropagation();
                event.preventDefault();
            };
            if (overlay !== null) {
                const pixelPositionDifference = event.deltaY;
                const isScrollingUpwards = pixelPositionDifference < 0;
                const scrollableAncestor = closestScrollableAncestor(event.target as HTMLElement) ?? overlay;
                const { scrollTop, scrollHeight, clientHeight } = scrollableAncestor;

                const scrolledPastBottom =
                    !isScrollingUpwards && pixelPositionDifference > scrollHeight - clientHeight - scrollTop;
                const scrolledPastTop = isScrollingUpwards && -pixelPositionDifference > scrollTop;

                if (scrolledPastBottom) {
                    // Scrolling down, but this will take us past the bottom so we prevent the event
                    // from moving up the tree past the overlay and set the scrollHeight to the bottom.
                    scrollableAncestor.scrollTop = scrollHeight;
                    prevent();
                    return false;
                } else if (scrolledPastTop) {
                    // Scrolling up, but this will take us past the top so we prevent the event
                    // from moving up the tree past the overlay and set the scrollHeight to the very top.
                    scrollableAncestor.scrollTop = 0;
                    prevent();
                    return false;
                }
            }
        };

        const eventProps = { passive: false, capture: false };

        if (!isDisabled && overlay !== null) {
            overlay.addEventListener('wheel', scrollHandler, eventProps);
        }

        return () => {
            if (!isDisabled && overlay !== null) {
                overlay.removeEventListener('wheel', scrollHandler, eventProps);
            }
        };
    }, [isDisabled, overlayRef]);
};
