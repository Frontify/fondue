/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode, useLayoutEffect, useRef, useState } from 'react';

import { type FloatingRect } from '#/ports';

import styles from '../richTextEditor.module.scss';

/** How close to the viewport edge the bar may come before it is pushed back in. */
const VIEWPORT_MARGIN = 8;

/**
 * The bar hung over the selection: fixed to the viewport at the box the editor
 * reports for the selected text, centred on it, above it where there is room
 * and below it where there is not.
 *
 * Its own size is measured rather than assumed, because both decisions need it:
 * whether it fits above, and how far in from the edge it has to sit. Watched
 * rather than read once, since its width follows what is in it (a longer style
 * name in the dropdown) and its height jumps the moment the controls wrap.
 *
 * The editor's OWN chrome, positioned from `handle.selectionRect()` — not the
 * plugins' floating mechanism, which is `FloatingLayer.tsx`.
 */
export const FloatingToolbar = ({ rect, children }: { rect: FloatingRect; children: ReactNode }): ReactNode => {
    const barRef = useRef<HTMLDivElement | null>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        const bar = barRef.current;
        if (!bar) {
            return;
        }
        // The entry's own `contentRect` is the content box; the border and
        // padding are part of the bar being placed.
        const observer = new ResizeObserver(() => {
            const { width, height } = bar.getBoundingClientRect();
            setSize((previous) =>
                previous.width === width && previous.height === height ? previous : { width, height },
            );
        });
        observer.observe(bar);
        return () => observer.disconnect();
    }, []);

    const above = rect.top - size.height - VIEWPORT_MARGIN >= 0;
    // The transform centres the bar on this point, so the clamp is about its
    // middle: half a bar's width away from either edge is as far as it may go.
    const half = size.width / 2;
    const left = Math.min(
        Math.max(rect.left + rect.width / 2, half + VIEWPORT_MARGIN),
        window.innerWidth - half - VIEWPORT_MARGIN,
    );

    return (
        <div
            ref={barRef}
            className={styles.floatingToolbar}
            // Which side of the selection the anchor point below is on; the
            // shift off it belongs to the stylesheet.
            data-side={above ? 'above' : 'below'}
            style={{ left, top: above ? rect.top : rect.top + rect.height }}
        >
            {children}
        </div>
    );
};
