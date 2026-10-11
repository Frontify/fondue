/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MIN_COLUMN_WIDTH } from '#/model/output';

/** A length in CSS pixels from a computed style, or 0 for `normal` and other keywords. */
const pixels = (value: string): number => {
    const parsed = Number.parseFloat(value);
    if (Number.isNaN(parsed)) {
        return 0;
    }
    return parsed;
};

/**
 * Writes the presentation's `count` columns and `gap` on the surface, and marks it, and tells `onFit`, while its
 * content box has room for every column at the narrowest column width; returns what undoes it.
 */
export const showColumns = (
    surface: HTMLElement,
    count: number,
    gap: string,
    onFit: (fits: boolean) => void,
): (() => void) => {
    surface.setAttribute('data-rte-columns', String(count));
    surface.style.setProperty('--rte-columns', String(count));
    surface.style.setProperty('--rte-column-gap', gap);
    const measure = () => {
        const style = getComputedStyle(surface);
        const width = surface.clientWidth - pixels(style.paddingInlineStart) - pixels(style.paddingInlineEnd);
        const fits = width >= count * MIN_COLUMN_WIDTH + (count - 1) * pixels(style.columnGap);
        surface.toggleAttribute('data-rte-columns-fit', fits);
        onFit(fits);
    };
    measure();
    let observer: ResizeObserver | undefined;
    if (typeof ResizeObserver !== 'undefined') {
        observer = new ResizeObserver(measure);
        observer.observe(surface);
    }
    return () => {
        observer?.disconnect();
        surface.removeAttribute('data-rte-columns');
        surface.removeAttribute('data-rte-columns-fit');
        surface.style.removeProperty('--rte-columns');
        surface.style.removeProperty('--rte-column-gap');
        onFit(false);
    };
};
