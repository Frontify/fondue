/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MutableRefObject, useEffect } from 'react';

export const useContainScroll = (overlayRef: MutableRefObject<HTMLDivElement | null>, { isDisabled = false }) => {
    useEffect(() => {
        const overlay = overlayRef.current;

        const closestScrollableAncestor = (element: HTMLElement | null): HTMLElement | null => {
            const SCROLL_TYPES = ['auto', 'scroll'];
            if (!element || element === overlay) {
                return null;
            }
            const hasVisibleScroll = SCROLL_TYPES.includes(window.getComputedStyle(element).overflowY);
            if (element.scrollHeight > element.clientHeight && hasVisibleScroll) {
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
                const deltaY = event.deltaY;
                const up = deltaY < 0;
                const scrollableAncestor = closestScrollableAncestor(event.target as HTMLElement) ?? overlay;
                const { scrollTop, scrollHeight, clientHeight } = scrollableAncestor;

                if (!up && deltaY > scrollHeight - clientHeight - scrollTop) {
                    // Scrolling down, but this will take us past the bottom.
                    scrollableAncestor.scrollTop = scrollHeight;
                    prevent();
                    return false;
                } else if (up && -deltaY > scrollTop) {
                    // Scrolling up, but this will take us past the top.
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
