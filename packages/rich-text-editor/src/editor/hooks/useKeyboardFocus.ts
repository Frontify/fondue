/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FocusEventHandler, type MouseEventHandler, useRef } from 'react';

/** What to spread onto the element that carries the mark. */
type KeyboardFocusProps = {
    onMouseDownCapture: MouseEventHandler<HTMLElement>;
    onFocus: FocusEventHandler<HTMLElement>;
    onBlur: FocusEventHandler<HTMLElement>;
};

/**
 * Marks the element `data-keyboard-focus="true"` while focus inside it came by
 * keyboard rather than a click, the way Fondue's Textarea marks its focus
 * ring: a press before the focus marks it a click, and a blur forgets that.
 * A host box draws its focus ring from the mark.
 *
 * Built on React's focus events, which bubble: the editable element's focus
 * reaches the element the props are spread onto. The press is heard in the
 * capture phase, so the engine stopping it cannot hide a click. The attribute
 * is written on the element, so nothing re-renders.
 */
export const useKeyboardFocus = (): KeyboardFocusProps => {
    const wasClickedRef = useRef(false);

    return {
        onMouseDownCapture: (event) => {
            wasClickedRef.current = true;
            event.currentTarget.dataset.keyboardFocus = 'false';
        },
        onFocus: (event) => {
            if (!wasClickedRef.current) {
                event.currentTarget.dataset.keyboardFocus = 'true';
            }
        },
        onBlur: (event) => {
            // Focus moving to a control inside the text (a node view's field) has not left, so the press still counts.
            if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) {
                return;
            }

            event.currentTarget.dataset.keyboardFocus = 'false';
            wasClickedRef.current = false;
        },
    };
};
