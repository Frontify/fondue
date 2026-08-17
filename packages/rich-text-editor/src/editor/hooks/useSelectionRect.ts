/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useReducer } from 'react';

import { type EditorHandle, type FloatingRect } from '../port';

/**
 * Where the selection sits on screen, for UI that hangs over it. Read during
 * render rather than kept in state: the component re-renders on every editor
 * state change, so the box is recomputed exactly when the selection can have
 * moved.
 *
 * Scrolling and resizing move the text without changing editor state, and
 * neither re-renders on its own — hence the listeners. Scroll is listened for
 * in the capture phase because scroll events do not bubble, and the editor may
 * sit in a scrolling container of its own rather than on the page.
 *
 * Both listeners are throttled to a frame and passive. A scroll fires far
 * faster than the screen refreshes, so re-reading the box for every event would
 * put a layout and a re-render into the middle of a gesture; passive tells the
 * browser the handler never calls `preventDefault`, so scrolling need not wait
 * for it.
 */
export const useSelectionRect = ({
    handle,
    enabled,
}: {
    handle: EditorHandle | null;
    /** Off unless something is actually anchored to the selection. */
    enabled: boolean;
}): FloatingRect | null => {
    const [, follow] = useReducer((count: number) => count + 1, 0);

    useEffect(() => {
        if (!enabled) {
            return;
        }
        let frame: number | null = null;
        const followNextFrame = (): void => {
            if (frame !== null) {
                return;
            }
            frame = requestAnimationFrame(() => {
                frame = null;
                follow();
            });
        };

        window.addEventListener('scroll', followNextFrame, { capture: true, passive: true });
        window.addEventListener('resize', followNextFrame, { passive: true });
        return () => {
            if (frame !== null) {
                cancelAnimationFrame(frame);
            }
            window.removeEventListener('scroll', followNextFrame, true);
            window.removeEventListener('resize', followNextFrame);
        };
    }, [enabled]);

    // `selectionRect()`, not `handle.floating.*`: this box is for the editor's
    // own chrome. The plugins' mechanism is `useFloating`.
    return enabled && handle ? handle.selectionRect() : null;
};
