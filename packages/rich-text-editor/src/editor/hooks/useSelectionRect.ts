/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useReducer, useSyncExternalStore } from 'react';

import { type EditorHandle, type FloatingRect } from '../port';

import { type EditorStateStore } from './useEditorHandle';

/**
 * Where the selection sits on screen, for UI that hangs over it. Read during
 * render rather than kept in state: the calling component subscribes to the
 * editor state, so it re-renders — and the box is recomputed — exactly when the
 * selection can have moved. Only the caller re-renders, not the editor around
 * it.
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
    editorState,
}: {
    handle: EditorHandle;
    editorState: EditorStateStore;
}): FloatingRect | null => {
    useSyncExternalStore(editorState.subscribe, editorState.getVersion, editorState.getVersion);
    const [, follow] = useReducer((count: number) => count + 1, 0);

    useEffect(() => {
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
    }, []);

    return handle.selectionRect();
};
