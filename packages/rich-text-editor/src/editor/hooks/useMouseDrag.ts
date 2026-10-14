/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';

/**
 * Whether a mouse drag started by `startDragging` is still going. It ends on
 * the next mouseup anywhere in the window, since the button can come up
 * outside the element the drag began in.
 */
export const useMouseDrag = (): { isDragging: boolean; startDragging: () => void } => {
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (!isDragging) {
            return;
        }
        const release = (): void => setIsDragging(false);
        window.addEventListener('mouseup', release);
        return () => window.removeEventListener('mouseup', release);
    }, [isDragging]);

    return { isDragging, startDragging: () => setIsDragging(true) };
};
