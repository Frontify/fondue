/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RefObject, useRef, useState } from 'react';

import { useClientLayoutEffect } from '#/bridge/client-layout-effect';

/** The inline-end edge of each item, measured from the toolbar's inline-start edge while every item shows. */
const inlineEnds = (root: HTMLElement, rtl: boolean): number[] => {
    const box = root.getBoundingClientRect();
    return [...root.querySelectorAll('[data-rte-toolbar-item]')].map((item) => {
        const rect = item.getBoundingClientRect();
        if (rtl) {
            return box.right - rect.left;
        }
        return rect.right - box.left;
    });
};

interface Fitting {
    readonly itemsKey: string;
    readonly shown: number;
}

/** How many of `count` items fit before More, measured whenever the item set changes and fitted again on each resize. */
export const useFitting = (root: RefObject<HTMLDivElement | null>, count: number, itemsKey: string): number => {
    const [fitting, setFitting] = useState<Fitting>({ itemsKey, shown: count });
    const endsRef = useRef<readonly number[]>([]);
    const moreSizeRef = useRef(0);
    // A refit that removes the focused control sends focus to More, or to the first item More held, not to the body.
    const refocusRef = useRef<'more' | number | undefined>(undefined);
    const shownRef = useRef(count);
    // A new item set shows every item once, so the layout effect measures them all.
    let { shown } = fitting;
    if (fitting.itemsKey !== itemsKey) {
        shown = count;
        setFitting({ itemsKey, shown });
    }
    useClientLayoutEffect(() => {
        const element = root.current;
        if (element === null) {
            return undefined;
        }
        const style = getComputedStyle(element);
        const ends = inlineEnds(element, style.direction === 'rtl');
        if (ends.length === count) {
            endsRef.current = ends;
        }
        const fit = () => {
            const measured = endsRef.current;
            const gap = Number.parseFloat(style.columnGap) || 0;
            // More always shows, since it holds the toolbar mode switch (SPEC-rich-text-react/AC-095).
            const more = element.querySelector('[data-rte-toolbar-more]');
            if (more !== null) {
                moreSizeRef.current = gap + more.getBoundingClientRect().width;
            }
            const limit = element.getBoundingClientRect().width - Number.parseFloat(style.paddingInlineEnd);
            let next = 0;
            while (next < measured.length) {
                const needed = (measured[next] ?? 0) + moreSizeRef.current;
                // Subpixel layout rounds an exact fit either way.
                if (needed > limit + 0.5) {
                    break;
                }
                next += 1;
            }
            const { activeElement } = element.ownerDocument;
            const focused = [...element.querySelectorAll('[data-rte-toolbar-item]')].indexOf(activeElement as Element);
            if (focused >= next) {
                refocusRef.current = 'more';
            }
            // More's menu is a portal that its trigger names in `aria-controls` while open.
            const more = element.querySelector('[data-rte-toolbar-more]');
            const menuId = more?.getAttribute('aria-controls');
            let menu: Element | null = null;
            if (menuId !== null && menuId !== undefined) {
                menu = element.ownerDocument.getElementById(menuId);
            }
            const inMore = more !== null && (more === activeElement || (menu !== null && menu.contains(activeElement)));
            if (inMore && next === measured.length) {
                refocusRef.current = shownRef.current;
            }
            // Only the rendered items tell what fits, so the layout effect measures them before paint.
            // oxlint-disable-next-line @eslint-react/set-state-in-effect -- the state is the measured layout.
            setFitting((previous) => {
                if (previous.itemsKey === itemsKey && previous.shown === next) {
                    return previous;
                }
                return { itemsKey, shown: next };
            });
        };
        fit();
        const observer = new ResizeObserver(fit);
        observer.observe(element);
        return () => observer.disconnect();
    }, [root, count, itemsKey]);
    useClientLayoutEffect(() => {
        shownRef.current = shown;
        const target = refocusRef.current;
        const element = root.current;
        if (target === undefined || element === null) {
            return;
        }
        refocusRef.current = undefined;
        let control = element.querySelector<HTMLElement>('[data-rte-toolbar-more]');
        if (target !== 'more') {
            control = element.querySelectorAll<HTMLElement>('[data-rte-toolbar-item]')[target] ?? null;
        }
        if (control !== null) {
            control.focus();
        }
    }, [root, shown]);
    return shown;
};
