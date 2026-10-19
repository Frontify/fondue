/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FocusEventHandler, useEffect, useRef, useState } from 'react';

/**
 * Whether focus is anywhere inside — the editable element, the toolbar, or a
 * flyout one of them opens.
 *
 * Built on React's focus events, which travel the component tree: a flyout is
 * a portal elsewhere in the DOM but still a child here. Focus moving from one
 * element inside to another blurs the first and focuses the second, so a blur
 * only counts once no focus has followed it within the same task.
 */
export const useFocusWithin = (): {
    focusWithin: boolean;
    /** Spread onto the element the question is about. */
    focusProps: { onFocus: FocusEventHandler; onBlur: FocusEventHandler };
} => {
    const [focusWithin, setFocusWithin] = useState(false);
    const leaveRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => () => clearTimeout(leaveRef.current), []);

    return {
        focusWithin,
        focusProps: {
            onFocus: () => {
                clearTimeout(leaveRef.current);
                setFocusWithin(true);
            },
            onBlur: () => {
                leaveRef.current = setTimeout(() => setFocusWithin(false), 0);
            },
        },
    };
};
