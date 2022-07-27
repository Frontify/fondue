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
            if (overlay !== null) {
                const pixelPositionDifference = event.deltaY;
                const isScrollingUpwards = pixelPositionDifference < 0;
                const scrollableAncestor = closestScrollableAncestor(event.target as HTMLElement) ?? overlay;
                const { scrollTop, scrollHeight, clientHeight } = scrollableAncestor;

                const willScrollPastBottom =
                    !isScrollingUpwards && pixelPositionDifference > scrollHeight - clientHeight - scrollTop;
                const willScrollPastTop = isScrollingUpwards && -pixelPositionDifference > scrollTop;

                /* On Safari scrollbar can go past the boundaries of the element height 
                and does not bubble up on the same scroll event so resetting the scrollHeight makes it glitchy */
                const safariBouncedPastTop = scrollTop < 0;
                const safariBouncedPastBottom = scrollTop > scrollHeight - clientHeight;

                if (willScrollPastBottom) {
                    // Scrolling down, but this will take us past the bottom.
                    if (!safariBouncedPastBottom) {
                        scrollableAncestor.scrollTop = scrollHeight;
                    }
                    event.preventDefault();
                } else if (willScrollPastTop) {
                    // Scrolling up, but this will take us past the top.
                    if (!safariBouncedPastTop) {
                        scrollableAncestor.scrollTop = safariBouncedPastTop ? scrollableAncestor.scrollTop : 0;
                    }
                    event.preventDefault();
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
