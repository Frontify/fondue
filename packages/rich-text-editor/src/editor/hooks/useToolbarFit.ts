/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RefObject, useLayoutEffect, useRef, useState } from 'react';

import { fittingSlotCount, type SlotGroup } from '../helpers/toolbarFit';

/** Marks a slot's element with its item key, for the measuring to find. */
export const SLOT_ATTRIBUTE = 'data-toolbar-slot';
/** Marks the More button, for the measuring to find. */
export const MORE_ATTRIBUTE = 'data-toolbar-more';

/**
 * Whether the row has been measured for the current items.
 *
 * - `'measuring'` — draw every slot and More, so each has a size to read.
 * - `'fitted'` — draw the first `shown` slots, and More when some are left.
 */
export type ToolbarFit = { kind: 'measuring' } | { kind: 'fitted'; shown: number };

/**
 * How many leading slots of a one-row toolbar fit its width. Each slot is
 * measured while every slot shows, once per item set; after that the row is
 * fitted again whenever it, or a slot in it, changes size. With `fits` off
 * every slot shows.
 */
export const useToolbarFit = (
    toolbarRef: RefObject<HTMLElement | null>,
    groups: readonly SlotGroup<{ key: string }>[],
    fits: boolean,
): ToolbarFit => {
    const keys = groups.map((group) => group.items.map((item) => item.key));
    const itemsKey = JSON.stringify(keys);
    const [fitted, setFitted] = useState<{ itemsKey: string; shown: number } | null>(null);
    // By item key, so a slot moved behind More keeps the width it had in the row.
    const widthsRef = useRef(new Map<string, number>());
    const moreWidthRef = useRef(0);
    const shown = fitted?.shown;

    useLayoutEffect(() => {
        const toolbar = toolbarRef.current;
        if (!fits || toolbar === null) {
            return undefined;
        }
        const slots = [...toolbar.querySelectorAll<HTMLElement>(`[${SLOT_ATTRIBUTE}]`)];

        const fit = (): void => {
            for (const slot of slots) {
                widthsRef.current.set(slot.getAttribute(SLOT_ATTRIBUTE) ?? '', slot.getBoundingClientRect().width);
            }
            const more = toolbar.querySelector(`[${MORE_ATTRIBUTE}]`);
            if (more !== null) {
                moreWidthRef.current = more.getBoundingClientRect().width;
            }
            const style = getComputedStyle(toolbar);
            const next = fittingSlotCount({
                groups: keys.map((group) => group.map((key) => widthsRef.current.get(key) ?? 0)),
                gap: pixels(style.columnGap),
                more: moreWidthRef.current,
                available:
                    toolbar.getBoundingClientRect().width -
                    pixels(style.paddingInlineStart) -
                    pixels(style.paddingInlineEnd),
            });
            // Only the drawn slots tell what fits, so the layout effect sets it before paint.
            // eslint-disable-next-line @eslint-react/set-state-in-effect
            setFitted((previous) => {
                if (previous?.itemsKey === itemsKey && previous.shown === next) {
                    return previous;
                }
                return { itemsKey, shown: next };
            });
        };

        fit();
        const observer = new ResizeObserver(fit);
        observer.observe(toolbar);
        for (const slot of slots) {
            observer.observe(slot);
        }
        return () => observer.disconnect();
        // The key stands for `keys`, new arrays every render; a new `shown` changes which slots are drawn.
        // eslint-disable-next-line @eslint-react/exhaustive-deps
    }, [toolbarRef, fits, itemsKey, shown]);

    if (!fits) {
        return { kind: 'fitted', shown: keys.flat().length };
    }
    if (fitted === null || fitted.itemsKey !== itemsKey) {
        return { kind: 'measuring' };
    }
    return { kind: 'fitted', shown: fitted.shown };
};

/** A computed length in pixels; `normal`, the initial gap, is no space in a flex row. */
const pixels = (value: string): number => {
    const parsed = Number.parseFloat(value);
    if (Number.isNaN(parsed)) {
        return 0;
    }
    return parsed;
};
