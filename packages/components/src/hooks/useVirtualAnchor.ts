/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef } from 'react';

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
        if (enabled) {
            focusBeforeOpenRef.current = document.activeElement;
        }
    };

    const onCloseAutoFocus = (event: Event) => {
        const focusBeforeOpen = focusBeforeOpenRef.current;
        focusBeforeOpenRef.current = null;
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
 * Calls `callback` after any scroll, in any container, and after a window resize.
 *
 * @param {() => void} callback - Called after scroll or resize. Keep it stable, for example with `useCallback`.
 */
export const useScrollOrResize = (callback: () => void) => {
    useEffect(() => {
        window.addEventListener('scroll', callback, { capture: true, passive: true });
        window.addEventListener('resize', callback);
        return () => {
            window.removeEventListener('scroll', callback, { capture: true });
            window.removeEventListener('resize', callback);
        };
    }, [callback]);
};
