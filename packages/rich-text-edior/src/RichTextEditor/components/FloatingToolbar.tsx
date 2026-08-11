/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode, useLayoutEffect, useRef, useState } from 'react';

import { classNames } from '../helpers/classNames';
import { type FloatingRect } from '../prosemirror';
import styles from '../richTextEditor.module.scss';

/** How close to the viewport edge the bar may come before it is pushed back in. */
const VIEWPORT_MARGIN = 8;

/**
 * The bar hung over the selection: fixed to the viewport at the box the editor
 * reports for the selected text, centred on it, above it where there is room and
 * below it where there is not.
 *
 * Its own size is measured rather than assumed, because both decisions need it —
 * whether it fits above, and how far in from the edge it has to sit. Watched
 * rather than read once: the bar's width follows what is in it (a longer style
 * name in the dropdown), and its height jumps the moment the controls wrap.
 */
export const FloatingToolbar = ({ rect, children }: { rect: FloatingRect; children: ReactNode }): ReactNode => {
    const barRef = useRef<HTMLDivElement | null>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        const bar = barRef.current;
        if (!bar) {
            return;
        }
        // The entry's own `contentRect` is the content box, which is not what is
        // being placed — the border and the padding are part of the bar.
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
            className={classNames(styles.floatingToolbar, above ? styles.floatingAbove : styles.floatingBelow)}
            style={{ left, top: above ? rect.top : rect.top + rect.height }}
        >
            {children}
        </div>
    );
};
