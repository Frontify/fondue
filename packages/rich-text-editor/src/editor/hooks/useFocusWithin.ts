/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FocusEvent, type FocusEventHandler, useEffect, useRef, useState } from 'react';

/**
 * Whether focus is anywhere inside — the editable element, the toolbar, or a
 * flyout one of them opens.
 *
 * Built on React's focus events rather than `:focus-within` or a `contains`
 * check alone, because a flyout is a portal: its content sits elsewhere in the
 * DOM while still being a child in the component tree, and React events travel
 * that tree.
 *
 * Focus moving from one element to another fires the blur first, naming where
 * focus is going (`relatedTarget`), and the focus after. The blur alone settles
 * most moves:
 *
 * - nowhere (the window lost focus, a click on nothing focusable): it left;
 * - somewhere inside in the DOM: it stays.
 *
 * Anywhere else may still be ours — a portal a descendant rendered. That one
 * is settled by the focus arriving there: React hands the focus to the wrapper
 * in the capture phase, on its way down the component tree, before the element
 * receiving focus hears of it itself. So a listener on that element, run once,
 * knows whether the wrapper was passed on the way. No timer: the answer is
 * decided by the events of the move itself, in order.
 */
export const useFocusWithin = (): {
    focusWithin: boolean;
    /** Spread onto the element the question is about. */
    focusProps: { onFocusCapture: FocusEventHandler; onBlur: FocusEventHandler };
} => {
    const [focusWithin, setFocusWithin] = useState(false);
    // Set when focus came in through the component tree during the move under
    // way; read once it has arrived.
    const enteredRef = useRef(false);
    const pendingRef = useRef<(() => void) | null>(null);

    const settle = (): void => {
        pendingRef.current?.();
        pendingRef.current = null;
    };

    useEffect(() => () => pendingRef.current?.(), []);

    return {
        focusWithin,
        focusProps: {
            onFocusCapture: () => {
                enteredRef.current = true;
                setFocusWithin(true);
            },
            onBlur: (event: FocusEvent) => {
                settle();
                const next = event.relatedTarget;
                if (!(next instanceof Node)) {
                    setFocusWithin(false);
                    return;
                }
                if (event.currentTarget.contains(next)) {
                    return;
                }
                enteredRef.current = false;
                const arrived = (): void => {
                    settle();
                    if (!enteredRef.current) {
                        setFocusWithin(false);
                    }
                };
                // At the target, which comes after the capture phase React
                // dispatches from.
                next.addEventListener('focusin', arrived);
                pendingRef.current = () => next.removeEventListener('focusin', arrived);
            },
        },
    };
};
