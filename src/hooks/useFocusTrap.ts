/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef } from 'react';
import { Modality } from '../types/dialog';

export const useFocusTrap = (modality: Modality = Modality.Modal) => {
    const overlayReference = useRef<HTMLDivElement | null>(null);

    const handleFocus = (event: KeyboardEvent) => {
        if (modality === Modality.NonModal) {
            return;
        }

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
    };

    useEffect(() => {
        overlayReference?.current?.addEventListener('keydown', handleFocus);
    }, [handleFocus]);

    return overlayReference;
};
