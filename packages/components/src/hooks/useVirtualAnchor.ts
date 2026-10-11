/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef, type RefObject } from 'react';

/**
 * A rectangle an overlay anchors to instead of its trigger, for example a text selection or a pointer position.
 */
export type VirtualAnchor = {
    getBoundingClientRect: () => DOMRect;
};

/**
 * Returns focus handlers for an overlay that opens at a virtual anchor.
 * On close, focus returns to the element that had focus before opening,
 * unless the event was prevented or the user already moved focus elsewhere.
 *
 * @param {boolean} enabled - Whether the overlay is anchored to a virtual anchor.
 */
export const useVirtualAnchorFocus = (enabled: boolean) => {
    const focusBeforeOpenRef = useRef<Element | null>(null);

    const onOpenAutoFocus = () => {
        focusBeforeOpenRef.current = null;
        if (enabled) {
            focusBeforeOpenRef.current = document.activeElement;
        }
    };

    // Strict Mode runs a close without unmounting, so the saved element is kept until the next open.
    const onCloseAutoFocus = (event: Event) => {
        const focusBeforeOpen = focusBeforeOpenRef.current;
        if (
            !event.defaultPrevented &&
            focusBeforeOpen instanceof HTMLElement &&
            document.activeElement === document.body
        ) {
            event.preventDefault();
            focusBeforeOpen.focus();
        }
    };

    return { onOpenAutoFocus, onCloseAutoFocus };
};

/**
 * Calls `callback` after any scroll, in any container, and after a window resize,
 * in the window and shadow root that hold `elementRef`.
 *
 * @param {RefObject<Element | null>} elementRef - An element in the window or shadow root to listen in.
 * @param {() => void} callback - Called after scroll or resize. Keep it stable, for example with `useCallback`.
 */
export const useScrollOrResize = (elementRef: RefObject<Element | null>, callback: () => void) => {
    useEffect(() => {
        const element = elementRef.current;
        const view = element?.ownerDocument.defaultView ?? window;
        // A scroll inside a shadow root does not reach the window, even in the capture phase.
        const rootNode = element?.getRootNode();
        const scrollTargets: EventTarget[] = [view];
        if (rootNode instanceof ShadowRoot) {
            scrollTargets.push(rootNode);
        }

        for (const target of scrollTargets) {
            target.addEventListener('scroll', callback, { capture: true, passive: true });
        }
        view.addEventListener('resize', callback);
        return () => {
            for (const target of scrollTargets) {
                target.removeEventListener('scroll', callback, { capture: true });
            }
            view.removeEventListener('resize', callback);
        };
    }, [elementRef, callback]);
};
