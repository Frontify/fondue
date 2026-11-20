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
 * Marks the element `data-keyboard-focus="true"` while focus inside it came
 * after a key rather than a pointer press, the heuristic `:focus-visible` and
 * react-aria's `useFocusVisible` use: a host box draws its focus ring from it,
 * as Fondue's Textarea does. Focus before any input counts as keyboard focus,
 * as it does for `:focus-visible`.
 *
 * Native listeners, not React props: React events follow the React tree, so
 * they would miss a press on a plugin's view portalled into the text, a click
 * beside the text that the editor turns into focus, and focus a flyout's button
 * hands back to the text. Focus moving to another element inside keeps the mark.
 * The attribute is written on the element, so nothing re-renders.
 *
 * A layout effect, because layout effects run before every passive effect, so
 * focus a passive effect gives the element on mount (the editor's Retry) is not missed.
 */
export const useKeyboardFocus = ({ elementRef, isMounted }: UseKeyboardFocusParams): void => {
    // Kept across the effect running again, so a toggle does not forget the last input.
    const modalityRef = useRef<InputModality>('keyboard');

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
