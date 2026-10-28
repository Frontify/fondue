/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PointerEvent } from 'react';

import { type EditorApi } from '#/bridge/pluginApi/plugin';

export type ResizeDrag = {
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
 * Captures the pointer and listens for Escape on the surface. `undefined` when the frame has no width to measure
 * against. The returned drag's `stop` removes that listener.
 */
export const startResizeDrag = (
    event: PointerEvent<HTMLSpanElement>,
    frame: HTMLSpanElement,
    api: EditorApi | undefined,
    end: () => void,
    show: (width: number | undefined) => void,
): ResizeDrag | undefined => {
    const figure = frame.closest('figure') ?? frame.parentElement;
    if (figure === null || figure.clientWidth <= 0) {
        return undefined;
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

    return {
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
