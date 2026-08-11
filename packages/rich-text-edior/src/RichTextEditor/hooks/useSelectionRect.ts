/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useReducer } from 'react';

import { type EditorHandle, type FloatingRect } from '../prosemirror';

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
        window.addEventListener('scroll', follow, true);
        window.addEventListener('resize', follow);
        return () => {
            window.removeEventListener('scroll', follow, true);
            window.removeEventListener('resize', follow);
        };
    }, [enabled]);

    return enabled && handle ? handle.floating.selectionRect() : null;
};
