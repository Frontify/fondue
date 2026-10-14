/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type MutableRefObject,
    type ReactNode,
    type RefObject,
    useLayoutEffect,
    useReducer,
    useRef,
    useState,
} from 'react';

import { type EditorStateStore } from './hooks/useEditorHandle';
import { readSelectionRect, useFollowViewport, useSelectionRect } from './hooks/useSelectionRect';
import { type EditorHandle, type FloatingRect } from './port';
import styles from './richTextEditor.module.scss';

/** How close to the viewport edge the bar may come before it is pushed back in. */
const VIEWPORT_MARGIN = 8;

type Size = { width: number; height: number };

type Placement = { side: 'above' | 'below'; left: number; top: number };

/**
 * Where a bar of this size goes for this box: centred on it, above it where
 * there is room and below it where there is not. Below, the anchor is the
 * box's bottom edge, so the bar never covers what it acts on.
 */
const placementOf = (rect: FloatingRect, { width, height }: Size): Placement => {
    const above = rect.top - height - VIEWPORT_MARGIN >= 0;
    // The transform centres the bar on this point, so the clamp is about its
    // middle: half a bar's width away from either edge is as far as it may go.
    const half = width / 2;
    const left = Math.min(
        Math.max(rect.left + rect.width / 2, half + VIEWPORT_MARGIN),
        window.innerWidth - half - VIEWPORT_MARGIN,
    );
    return { side: above ? 'above' : 'below', left, top: above ? rect.top : rect.top + rect.height };
};

/**
 * The bar hung over the selection, fixed to the viewport at the box the editor
 * reports for the selected text (`handle.selectionRect()`).
 *
 * Draws nothing while there is no selection to hang over or it is scrolled out
 * of sight; with `caret` set (toolbar asked for from the keyboard, or focused)
 * a caret is enough. It subscribes to the editor state itself, so a moving
 * caret re-renders only the bar. Mount it only while there is something to
 * show: it listens to scrolling for as long as it is mounted.
 */
export const FloatingToolbar = ({
    handle,
    editorState,
    editableRef,
    caret,
    children,
}: {
    handle: EditorHandle;
    editorState: EditorStateStore;
    editableRef: RefObject<HTMLElement | null>;
    caret: boolean;
    children: ReactNode;
}): ReactNode => {
    const rect = useSelectionRect({ handle, editorState, editableRef, caret });
    const [, rerender] = useReducer((count: number) => count + 1, 0);
    const barRef = useRef<HTMLDivElement | null>(null);
    const placedRef = useRef<Placement | null>(null);

    // A scroll moves the text, not the editor state: while the bar only has to
    // follow, move it in the DOM once a frame. Showing, hiding and flipping
    // sides go through React.
    useFollowViewport(() => {
        const next = readSelectionRect({ handle, editableRef, caret });
        const bar = barRef.current;
        const placed = placedRef.current;
        if (next === null || bar === null || placed === null) {
            if ((next === null) !== (placed === null)) {
                rerender();
            }
            return;
        }
        const placement = placementOf(next, { width: bar.offsetWidth, height: bar.offsetHeight });
        if (placement.side !== placed.side) {
            rerender();
            return;
        }
        placedRef.current = placement;
        bar.style.left = `${placement.left}px`;
        bar.style.top = `${placement.top}px`;
    });

    if (rect === null) {
        placedRef.current = null;
        return null;
    }
    return (
        <FloatingBar rect={rect} barRef={barRef} placedRef={placedRef}>
            {children}
        </FloatingBar>
    );
};

/**
 * The bar itself, at a box that exists. Its own component so the size observer
 * is set up when the bar is. The size is watched rather than read once: it
 * follows the content (a longer style name) and jumps when the controls wrap.
 */
const FloatingBar = ({
    rect,
    barRef,
    placedRef,
    children,
}: {
    rect: FloatingRect;
    barRef: MutableRefObject<HTMLDivElement | null>;
    /** Where this render put the bar, for the scroll handler to move on from. */
    placedRef: { current: Placement | null };
    children: ReactNode;
}): ReactNode => {
    // Null until measured. The first render guesses at the size, so it stays
    // transparent (not hidden, so a control can take focus straight away).
    const [size, setSize] = useState<Size | null>(null);

    useLayoutEffect(() => {
        const bar = barRef.current;
        if (!bar) {
            return;
        }
        // Not the entry's `contentRect`: that excludes border and padding.
        const measure = (): void => {
            const { width, height } = bar.getBoundingClientRect();
            setSize((previous) =>
                previous !== null && previous.width === width && previous.height === height
                    ? previous
                    : { width, height },
            );
        };
        const observer = new ResizeObserver(measure);
        observer.observe(bar);
        return () => observer.disconnect();
    }, [barRef]);

    const placement = placementOf(rect, size ?? { width: 0, height: 0 });
    // Written during render on purpose: it is exactly what this render puts on
    // screen, and the scroll handler moves on from it.
    placedRef.current = placement;

    return (
        <div
            ref={barRef}
            className={styles.floatingToolbar}
            // The stylesheet shifts the bar off the anchor point by side.
            data-side={placement.side}
            style={{ left: placement.left, top: placement.top, opacity: size === null ? 0 : undefined }}
        >
            {children}
        </div>
    );
};
