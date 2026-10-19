/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';

/**
 * What ends a drag besides the button coming up. A native drag and drop of the
 * selected text swallows the mouseup, and so does the window losing focus
 * mid-drag or the browser taking the pointer over.
 */
const ENDS_DRAG = ['mouseup', 'dragend', 'drop', 'pointercancel'] as const;

/**
 * Whether a mouse drag started by `startDragging` is still going. It ends on
 * the next mouseup anywhere in the window, since the button can come up
 * outside the element the drag began in, or on anything else that ends it
 * without one (`ENDS_DRAG`, the window losing focus).
 */
export const useMouseDrag = (): { isDragging: boolean; startDragging: () => void } => {
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (!isDragging) {
            return;
        }
        const release = (): void => setIsDragging(false);
        // Captured: a drop target that stops the event must not leave the drag running.
        for (const type of ENDS_DRAG) {
            window.addEventListener(type, release, true);
        }
        window.addEventListener('blur', release);
        return () => {
            for (const type of ENDS_DRAG) {
                window.removeEventListener(type, release, true);
            }
            window.removeEventListener('blur', release);
        };
    }, [isDragging]);

    return { isDragging, startDragging: () => setIsDragging(true) };
};
