/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PointerEvent, type RefObject, useEffect, useRef, useState } from 'react';

import { type EditorApi } from '#/bridge/plugin';

import { MAX_WIDTH, MIN_WIDTH } from './dialogStrings';

// How far a pointer moves before a press on the handle counts as a horizontal resize, or as a scroll.
const SLOP = 8;

/** A drag's width as a whole percent of the content width, within the stored bounds. */
const percentOf = (pixels: number, total: number) =>
    Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, Math.round((pixels / total) * 100)));

type Drag = {
    startX: number;
    startY: number;
    startWidth: number;
    total: number;
    /** -1 where the inline end is on the left. */
    direction: number;
    /** The session generation the drag started in; a replacement since drops the drag. */
    generation: number | undefined;
    /** Whether the pointer moved past the slop horizontally, so the drag resizes. */
    resizing: boolean;
    stop: () => void;
};

/**
 * A resize drag from the frame's inline-end handle: once the pointer moves past the slop more across than down, the
 * frame shows the dragged width, and the drag's end runs `image.size.set` once, one undo step. A vertical move leaves
 * the page to scroll, and Escape during the drag, or a replaced document, restores the old width and runs nothing.
 */
export const useResize = (
    frameRef: RefObject<HTMLSpanElement>,
    api: EditorApi | undefined,
    commit: (displayWidth: number) => void,
) => {
    const [shown, setShown] = useState<number>();
    const dragRef = useRef<Drag | null>(null);
    const shownRef = useRef<number | undefined>(undefined);
    const show = (width: number | undefined) => {
        shownRef.current = width;
        setShown(width);
    };

    const end = () => {
        dragRef.current?.stop();
        dragRef.current = null;
    };

    useEffect(() => end, []);
    const onPointerDown = (event: PointerEvent<HTMLSpanElement>) => {
        const frame = frameRef.current;
        if (frame === null) {
            return;
        }

        const figure = frame.closest('figure') ?? frame.parentElement;
        if (figure === null || figure.clientWidth <= 0) {
            return;
        }

        // A touch may still scroll, which its `touch-action` leaves to the browser; a mouse drag never selects text.
        if (event.pointerType === 'mouse') {
            event.preventDefault();
        }

        const handle = event.currentTarget;
        handle.setPointerCapture?.(event.pointerId);
        const document = frame.ownerDocument;
        // The surface holds focus, so its capture phase sees Escape before the chrome's own keys; no document listener.
        const surface = frame.closest('[data-rte-surface]') ?? frame;
        const onKey = (key: KeyboardEvent) => {
            if (key.key !== 'Escape') {
                return;
            }

            key.preventDefault();
            key.stopPropagation();
            end();
            show(undefined);
        };

        surface.addEventListener('keydown', onKey as EventListener, true);
        let direction = 1;
        if (document.defaultView?.getComputedStyle(frame).direction === 'rtl') {
            direction = -1;
        }

        dragRef.current = {
            startX: event.clientX,
            startY: event.clientY,
            startWidth: frame.getBoundingClientRect().width,
            total: figure.clientWidth,
            direction,
            generation: api?.generation(),
            resizing: false,
            stop: () => {
                surface.removeEventListener('keydown', onKey as EventListener, true);
                if (handle.hasPointerCapture?.(event.pointerId) === true) {
                    handle.releasePointerCapture(event.pointerId);
                }
            },
        };
    };

    const onPointerMove = (event: PointerEvent<HTMLSpanElement>) => {
        const drag = dragRef.current;
        if (drag === null) {
            return;
        }

        const across = Math.abs(event.clientX - drag.startX);
        const down = Math.abs(event.clientY - drag.startY);
        if (!drag.resizing) {
            if (down > SLOP && down >= across) {
                end();

                return;
            }

            if (across <= SLOP) {
                return;
            }

            drag.resizing = true;
        }

        show(percentOf(drag.startWidth + (event.clientX - drag.startX) * drag.direction, drag.total));
    };

    const onPointerUp = () => {
        const drag = dragRef.current;
        let dragged: number | undefined;
        if (drag !== null && drag.resizing && drag.generation === api?.generation()) {
            dragged = shownRef.current;
        }

        end();
        if (dragged !== undefined) {
            commit(dragged);
        }

        show(undefined);
    };

    const onPointerCancel = () => {
        end();
        show(undefined);
    };

    return { shown, handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel } };
};
