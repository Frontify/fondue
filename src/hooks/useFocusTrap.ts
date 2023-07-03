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
    const handleFocus = useCallback(
        (event: KeyboardEvent) => {
            const focusableElements = reference?.querySelectorAll(TABBABLE_ELEMENTS) ?? [],
                firstFocusableElement = focusableElements[0] as HTMLElement,
                lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement,
                lastFocusedElement = (document.activeElement ?? document.body) as HTMLElement,
                isTabPressed = event.key === 'Tab';

            if (!reference || focusableElements.length === 0 || !isTabPressed || ignoreFocusTrap) {
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
        },
        [ignoreFocusTrap, reference],
    );

    useEffect(() => {
        const lastFocusedOutsideBoundaries = (document.activeElement ?? document.body) as HTMLElement;
        if (isOpen) {
            window.addEventListener('keydown', handleFocus);
        }

        return () => {
            window.removeEventListener('keydown', handleFocus);
            if (!ignoreFocusTrap) {
                lastFocusedOutsideBoundaries.focus();
            }
        };
    }, [handleFocus, ignoreFocusTrap, isOpen]);

    return reference;
};
