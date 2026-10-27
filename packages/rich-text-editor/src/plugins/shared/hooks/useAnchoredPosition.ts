/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';

/**
 * Viewport position just under an element, kept in step with scrolling and
 * resizing — where a popup portaled to the page end goes to sit under text it
 * belongs to (a picker under the query typed into the text). Null while closed
 * and until the first measurement.
 */
export const useAnchoredPosition = (
    anchorRef: { current: HTMLElement | null },
    open: boolean,
    offset: number,
): { left: number; top: number } | null => {
    const [position, setPosition] = useState<{ left: number; top: number } | null>(null);

    useEffect(() => {
        if (!open) {
            return;
        }
        const place = (): void => {
            const box = anchorRef.current?.getBoundingClientRect();
            if (box) {
                setPosition((previous) =>
                    previous?.left === box.left && previous.top === box.bottom + offset
                        ? previous
                        : { left: box.left, top: box.bottom + offset },
                );
            }
        };
        // Next frame: the one the popup first appears in.
        const frame = requestAnimationFrame(place);
        window.addEventListener('scroll', place, { capture: true, passive: true });
        window.addEventListener('resize', place, { passive: true });
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', place, true);
            window.removeEventListener('resize', place);
        };
    }, [anchorRef, open, offset]);

    return open ? position : null;
};
