/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useEffect, useMemo } from 'react';

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
    const focusableElements = useMemo(() => reference?.querySelectorAll(TABBABLE_ELEMENTS) ?? [], [reference]);
    const firstFocusableElement = focusableElements[0] as HTMLElement,
        lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleFocus = useCallback(
        (event: KeyboardEvent) => {
            if (isOpen) {
                if (ignoreFocusTrap) {
                    return;
                }

                if (focusableElements.length === 0) {
                    event.preventDefault();
                    return;
                }

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
            }
        },
        [firstFocusableElement, focusableElements.length, ignoreFocusTrap, isOpen, lastFocusableElement],
    );

    useEffect(() => {
        window.addEventListener('keydown', handleFocus);

        return () => {
            window.removeEventListener('keydown', handleFocus);
        };
    }, [handleFocus]);

    return reference;
};
