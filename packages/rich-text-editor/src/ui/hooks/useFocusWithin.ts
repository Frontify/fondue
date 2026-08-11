/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FocusEventHandler, useEffect, useRef, useState } from 'react';

/**
 * Whether focus is anywhere inside — the editable element, the toolbar, or a
 * flyout one of them opens.
 *
 * Built on React's focus events rather than `:focus-within` or a `contains`
 * check, because that last case is a portal: a flyout's content is somewhere
 * else entirely in the DOM while still being a child in the component tree, and
 * React events travel the component tree.
 *
 * Focus moving from one element inside to another fires the blur before the next
 * focus, so the answer is settled a tick later rather than the moment it is
 * asked: without that, every click inside would read as a departure.
 */
export const useFocusWithin = (): {
    focusWithin: boolean;
    /** Spread onto the element the question is about. */
    focusProps: { onFocus: FocusEventHandler; onBlur: FocusEventHandler };
} => {
    const [focusWithin, setFocusWithin] = useState(false);
    const settlingRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => () => clearTimeout(settlingRef.current), []);

    return {
        focusWithin,
        focusProps: {
            onFocus: () => {
                clearTimeout(settlingRef.current);
                setFocusWithin(true);
            },
            onBlur: () => {
                clearTimeout(settlingRef.current);
                settlingRef.current = setTimeout(() => setFocusWithin(false));
            },
        },
    };
};
