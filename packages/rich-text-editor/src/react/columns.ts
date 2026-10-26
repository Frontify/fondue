/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MIN_COLUMN_WIDTH } from '#/model/internal';

/** A length in CSS pixels from a computed style, or 0 for `normal` and other keywords. */
const pixels = (value: string): number => {
    const parsed = Number.parseFloat(value);
    if (Number.isNaN(parsed)) {
        return 0;
    }
    return parsed;
};

type Columns = {
    readonly count: number;
    readonly gap: string;
};

/** The surface's column layout: the latest presentation columns, and teardown. */
export type ColumnsLayout = {
    /** Shows `count` columns with `gap`, or one column when either is `undefined`. */
    update(count: number | undefined, gap: string | undefined): void;
    dispose(): void;
};

/**
 * Writes the presentation's columns and gap on the surface, and marks it, and tells `onFit`, while its content box has
 * room for every column at the narrowest column width. `holds` takes a write while a composition runs, which changes
 * nothing inside the editing host, and gives `true` once it calls that write again when input has settled; so neither
 * a resize nor a presentation change touches the surface mid-composition.
 */
export const showColumns = (
    surface: HTMLElement,
    onFit: (fits: boolean) => void,
    holds: (write: () => void) => boolean,
): ColumnsLayout => {
    let wanted: Columns | undefined;
    let shown: Columns | undefined;
    let waiting = false;
    let disposed = false;
    const clear = () => {
        surface.removeAttribute('data-rte-columns');
        surface.removeAttribute('data-rte-columns-fit');
        surface.style.removeProperty('--rte-columns');
        surface.style.removeProperty('--rte-column-gap');
        onFit(false);
    };
    const measure = (columns: Columns) => {
        const style = getComputedStyle(surface);
        const width = surface.clientWidth - pixels(style.paddingInlineStart) - pixels(style.paddingInlineEnd);
        const fits = width >= columns.count * MIN_COLUMN_WIDTH + (columns.count - 1) * pixels(style.columnGap);
        surface.toggleAttribute('data-rte-columns-fit', fits);
        onFit(fits);
    };
    const write = () => {
        if (wanted === undefined) {
            if (shown !== undefined) {
                clear();
            }
            shown = undefined;
            return;
        }
        if (shown?.count !== wanted.count || shown.gap !== wanted.gap) {
            surface.setAttribute('data-rte-columns', String(wanted.count));
            surface.style.setProperty('--rte-columns', String(wanted.count));
            surface.style.setProperty('--rte-column-gap', wanted.gap);
            shown = wanted;
        }
        measure(wanted);
    };
    const schedule = () => {
        if (disposed || waiting) {
            return;
        }
        waiting = holds(() => {
            waiting = false;
            schedule();
        });
        if (!waiting) {
            write();
        }
    };
    let observer: ResizeObserver | undefined;
    if (typeof ResizeObserver !== 'undefined') {
        observer = new ResizeObserver(schedule);
        observer.observe(surface);
    }
    return {
        update: (count, gap) => {
            wanted = count === undefined || gap === undefined ? undefined : { count, gap };
            schedule();
        },
        dispose: () => {
            disposed = true;
            observer?.disconnect();
            if (shown !== undefined) {
                clear();
            }
        },
    };
};
