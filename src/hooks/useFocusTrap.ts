/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useEffect } from 'react';

export const TABBABLE_ELEMENTS = [
    'input:not([disabled]):not([type=hidden])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'a[href]',
    'area[href]',
    'summary',
    'iframe',
    'object',
    'embed',
    'audio[controls]',
    'video[controls]',
    '[contenteditable]',
    '[tabindex]:not([tabindex="-1"]):not([disabled])',
].join(':not([hidden]):not([tabindex="-1"]),');

export const useFocusTrap = (reference: HTMLElement | null, isOpen: boolean, ignoreFocusTrap = false) => {
    const activeElement = (document.activeElement ?? reference?.parentElement ?? document.body) as HTMLElement;

    const handleFocus = useCallback(
        (event: KeyboardEvent) => {
            if (ignoreFocusTrap) {
                return;
            }

            if (isOpen) {
                const focusableElements = reference?.querySelectorAll(TABBABLE_ELEMENTS) ?? [];
                if (focusableElements.length === 0) {
                    event.preventDefault();
                    return;
                }
                const firstFocusableElement = focusableElements[0] as HTMLElement,
                    lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement,
                    isTabPressed = event.key === 'Tab';

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
            } else {
                activeElement?.focus();
            }
        },
        [activeElement, ignoreFocusTrap, isOpen, reference],
    );

    useEffect(() => {
        window.addEventListener('keydown', handleFocus);

        return () => {
            window.removeEventListener('keydown', handleFocus);
        };
    }, [handleFocus]);

    return reference;
};
