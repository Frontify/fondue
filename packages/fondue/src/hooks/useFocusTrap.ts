/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useEffect, useRef } from 'react';

import { TABBABLE_ELEMENTS } from '@utilities/elements';

export const useFocusTrap = <T extends HTMLElement = HTMLElement>(
    isOpen: boolean,
    ignoreFocusTrap = false,
    anchor: HTMLElement | null = null,
) => {
    const elementRef = useRef<T>(null);

    const handleFocus = useCallback(
        (event: KeyboardEvent) => {
            const focusableElements = [...(elementRef.current?.querySelectorAll(TABBABLE_ELEMENTS) ?? [])];
            const firstFocusableElement = focusableElements[0] as T;
            const lastFocusableElement = focusableElements[focusableElements.length - 1] as T;
            const isTabPressed = event.key === 'Tab';

            if (focusableElements.length === 0 || !isTabPressed) {
                return;
            }

            if (anchor === event.target) {
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
        [anchor],
    );

    useEffect(() => {
        if (ignoreFocusTrap) {
            return;
        }

        const element = elementRef.current;
        const lastFocusedOutsideBoundaries = (document.activeElement ?? document.body) as T;

        if (isOpen) {
            anchor?.addEventListener('keydown', handleFocus);
            element?.addEventListener('keydown', handleFocus);
        }

        return () => {
            anchor?.removeEventListener('keydown', handleFocus);
            element?.removeEventListener('keydown', handleFocus);
            lastFocusedOutsideBoundaries.focus();
        };
    }, [handleFocus, ignoreFocusTrap, isOpen, anchor]);

    return { elementRef };
};
