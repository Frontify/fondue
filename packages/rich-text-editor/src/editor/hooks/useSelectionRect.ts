/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RefObject, useEffect, useRef, useSyncExternalStore } from 'react';

import { type EditorHandle, type FloatingRect } from '../port';

import { type EditorStateStore } from './useEditorHandle';

/**
 * Where the caret is, read off the document's selection, for a toolbar called
 * up on a caret (Alt+F10) — the editor reports a box only for selected text.
 * The selection stays in the editable element while a toolbar control has
 * focus, so this still finds it then. Falls back to the editable element's top
 * edge when the caret has no box of its own (an empty line).
 */
const caretRect = (editable: HTMLElement): FloatingRect => {
    const selection = editable.ownerDocument.getSelection();
    const range = selection !== null && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
    if (range !== null && editable.contains(range.startContainer)) {
        const { left, top, width, height } = range.getBoundingClientRect();
        if (left !== 0 || top !== 0 || height !== 0) {
            return { left, top, width, height };
        }
    }
    const { left, top, width } = editable.getBoundingClientRect();
    return { left, top, width, height: 0 };
};

/**
 * Whether a box can be seen through every scrolling container around the
 * editor and the window. A selection scrolled out of its container is still
 * "on screen" by its coordinates, and a bar hung over it would float over
 * whatever is there instead.
 */
const isVisibleWithin = (rect: FloatingRect, editable: HTMLElement): boolean => {
    let clipTop = 0;
    let clipBottom = window.innerHeight;
    for (let element = editable.parentElement; element !== null; element = element.parentElement) {
        const { overflowY } = getComputedStyle(element);
        if (overflowY === 'visible') {
            continue;
        }
        const box = element.getBoundingClientRect();
        clipTop = Math.max(clipTop, box.top);
        clipBottom = Math.min(clipBottom, box.bottom);
    }
    return rect.top + rect.height >= clipTop && rect.top <= clipBottom;
};

type SelectionRectOptions = {
    handle: EditorHandle;
    /** Holds the editable element: where the caret is looked for, and what is scrolled. */
    editableRef: RefObject<HTMLElement | null>;
    /** Fall back to the caret's box when no text is selected. */
    caret: boolean;
};

/**
 * Where the selection sits on screen right now — or null when there is nothing
 * to hang over: no selected text (unless `caret` asks for the caret's box
 * instead), or a selection scrolled out of view.
 */
export const readSelectionRect = ({ handle, editableRef, caret }: SelectionRectOptions): FloatingRect | null => {
    const editable = editableRef.current;
    const rect = handle.selectionRect() ?? (caret && editable !== null ? caretRect(editable) : null);
    if (rect === null || editable === null) {
        return rect;
    }
    return isVisibleWithin(rect, editable) ? rect : null;
};

/**
 * `readSelectionRect` for a component that hangs UI over the selection, read
 * during render rather than kept in state: the calling component subscribes to
 * the editor state, so it re-renders — and the box is recomputed — exactly
 * when the selection can have moved. Only the caller re-renders, not the
 * editor around it.
 *
 * Scrolling and resizing move the text without changing editor state; the
 * caller follows those itself (`useFollowViewport`), without re-rendering for
 * every frame of a scroll.
 */
export const useSelectionRect = (
    options: SelectionRectOptions & { editorState: EditorStateStore },
): FloatingRect | null => {
    useSyncExternalStore(options.editorState.subscribe, options.editorState.getVersion, options.editorState.getVersion);
    return readSelectionRect(options);
};

/**
 * Calls `follow` once a frame while the page scrolls or the window resizes —
 * whatever moves text on screen without changing the editor state.
 *
 * Scroll is listened for in the capture phase because scroll events do not
 * bubble, and the editor may sit in a scrolling container of its own rather
 * than on the page. Both listeners are throttled to a frame and passive: a
 * scroll fires far faster than the screen refreshes, and passive tells the
 * browser the handler never calls `preventDefault`, so scrolling need not wait
 * for it.
 */
export const useFollowViewport = (follow: () => void): void => {
    const followRef = useRef(follow);
    followRef.current = follow;

    useEffect(() => {
        let frame: number | null = null;
        const followNextFrame = (): void => {
            if (frame !== null) {
                return;
            }
            frame = requestAnimationFrame(() => {
                frame = null;
                followRef.current();
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
};
