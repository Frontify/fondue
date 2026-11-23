/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RefObject, useLayoutEffect, useRef } from 'react';

type UseKeyboardFocusParams = {
    /** The element whose focus is marked. */
    elementRef: RefObject<HTMLElement | null>;
    /** Whether the element exists. It is created again when this turns on, so the listeners follow it. */
    isMounted: boolean;
};

/** What the last input was: a key press or a pointer press. */
type InputModality = 'keyboard' | 'pointer';

/**
 * Sets `data-keyboard-focus="true"` on the element while it holds focus that
 * followed a key, not a pointer press (the `:focus-visible` rule), so a host box
 * can draw its focus ring.
 */
export const useKeyboardFocus = ({ elementRef, isMounted }: UseKeyboardFocusParams): void => {
    const modalityRef = useRef<InputModality>('keyboard');

    // Before passive effects, so focus the editor gives on mount (Retry) is heard.
    useLayoutEffect(() => {
        const element = elementRef.current;
        if (!isMounted || element === null) {
            return;
        }

        const { ownerDocument } = element;

        const onKeyDown = (): void => {
            modalityRef.current = 'keyboard';
        };
        const onPointerDown = (): void => {
            modalityRef.current = 'pointer';
            if (element.contains(ownerDocument.activeElement)) {
                element.dataset.keyboardFocus = 'false';
            }
        };
        const onFocusIn = (): void => {
            element.dataset.keyboardFocus = String(modalityRef.current === 'keyboard');
        };
        const onFocusOut = (event: FocusEvent): void => {
            if (event.relatedTarget instanceof Node && element.contains(event.relatedTarget)) {
                return;
            }
            element.dataset.keyboardFocus = 'false';
        };

        // Capture on the document: the editor or a plugin may stop these before they bubble.
        ownerDocument.addEventListener('keydown', onKeyDown, true);
        ownerDocument.addEventListener('pointerdown', onPointerDown, true);
        element.addEventListener('focusin', onFocusIn);
        element.addEventListener('focusout', onFocusOut);

        return () => {
            ownerDocument.removeEventListener('keydown', onKeyDown, true);
            ownerDocument.removeEventListener('pointerdown', onPointerDown, true);
            element.removeEventListener('focusin', onFocusIn);
            element.removeEventListener('focusout', onFocusOut);
        };
    }, [elementRef, isMounted]);
};
