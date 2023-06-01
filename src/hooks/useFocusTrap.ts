/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useEffect, useRef } from 'react';

export const useFocusTrap = () => {
    const overlayReference = useRef<HTMLDivElement | null>(null);
    const handleFocus = useCallback((event: KeyboardEvent) => {
        const focusableElements =
                overlayReference?.current?.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
                ) ?? [],
            firstFocusableElement = focusableElements[0] as HTMLElement,
            lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement;
        const isTabPressed = event.key === 'Tab';

        if (!isTabPressed) {
            return;
        }

        if (!event.shiftKey && event.target === lastFocusableElement) {
            firstFocusableElement.focus();
            event.preventDefault();
        }

        if (event.shiftKey && event.target === firstFocusableElement) {
            lastFocusableElement.focus();
            event.preventDefault();
        }
    }, []);

    useEffect(() => {
        overlayReference?.current?.addEventListener('keydown', handleFocus);

        return () => {
            overlayReference?.current?.removeEventListener('keydown', handleFocus);
        };
    }, [handleFocus]);

    return overlayReference;
};
