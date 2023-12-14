/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useEffect, useRef } from 'react';
import { TABBABLE_ELEMENTS } from '@utilities/elements';

export const useFocusTrap = <T extends HTMLElement = HTMLElement>(isOpen: boolean, ignoreFocusTrap = false) => {
    const elementRef = useRef<T>(null);

    const handleFocus = useCallback((event: KeyboardEvent) => {
        const focusableElements = [...(elementRef.current?.querySelectorAll(TABBABLE_ELEMENTS) ?? [])];
        const firstFocusableElement = focusableElements[0] as T;
        const lastFocusableElement = focusableElements[focusableElements.length - 1] as T;
        const lastFocusedElement = (document.activeElement ?? document.body) as HTMLElement;
        const isTabPressed = event.key === 'Tab';

        if (focusableElements.length === 0 || !isTabPressed) {
            return;
        }

        if (![...focusableElements].includes(lastFocusedElement)) {
            firstFocusableElement.focus();
            event.preventDefault();
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
        if (ignoreFocusTrap) {
            return;
        }

        const lastFocusedOutsideBoundaries = (document.activeElement ?? document.body) as T;

        if (isOpen) {
            window.addEventListener('keydown', handleFocus);
        }

        return () => {
            window.removeEventListener('keydown', handleFocus);
            lastFocusedOutsideBoundaries.focus();
        };
    }, [handleFocus, ignoreFocusTrap, isOpen]);

    return { elementRef };
};
