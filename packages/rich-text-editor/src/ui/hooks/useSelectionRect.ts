/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useReducer } from 'react';

import { type EditorHandle, type FloatingRect } from '#/ports';

/**
 * Where the selection sits on screen, for UI that hangs over it. Read during
 * render rather than kept in state: the component re-renders on every editor
 * state change, so the box is recomputed exactly when the selection can have
 * moved.
 *
 * Scrolling and resizing move the text without the editor state changing at all,
 * and neither would re-render on its own — which is what the listeners are for.
 * Scroll is listened for in the capture phase because a scroll event does not
 * bubble: the page is not always what moved, and the editor may well be inside a
 * container of its own.
 *
 * Both listeners are throttled to a frame and marked passive, which is about the
 * one thing scrolling cannot afford. A scroll fires far faster than the screen
 * refreshes, and re-reading the box for every one of those events would put a
 * layout and a re-render into the middle of a gesture the browser is trying to
 * keep smooth — there is no point computing a position twice before it is drawn
 * once. Passive says the same thing to the browser: this handler will never call
 * `preventDefault`, so scrolling need not wait for it.
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

    // `handle.selectionRect()`, not `handle.floating.*`: this box is for the
    // editor's own chrome. The plugins' mechanism is `useFloating`.
    return enabled && handle ? handle.selectionRect() : null;
};
