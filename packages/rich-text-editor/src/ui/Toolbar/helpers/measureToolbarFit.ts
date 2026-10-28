/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Dispatch, type MutableRefObject, type SetStateAction } from 'react';

export type ToolbarFitting = {
    itemsKey: string;
    shown: number;
};

/** One slot per item, which an item that failed to render holds empty, so slots and items keep their order. */
export const toolbarSlotsOf = (root: HTMLElement): Element[] =>
    [...root.children].filter((child) => !child.hasAttribute('data-rte-toolbar-more'));

/** The inline-end edge of each item, measured from the toolbar's inline-start edge while every item shows. */
export const toolbarInlineEnds = (root: HTMLElement, rtl: boolean): number[] => {
    const box = root.getBoundingClientRect();

    return toolbarSlotsOf(root).map((item) => {
        const rect = item.getBoundingClientRect();
        if (rtl) {
            return box.right - rect.left;
        }

        return rect.right - box.left;
    });
};

type FitReading = {
    element: HTMLElement;
    style: CSSStyleDeclaration;
    endsRef: MutableRefObject<readonly number[]>;
    moreSizeRef: MutableRefObject<number>;
    refocusRef: MutableRefObject<'more' | number | undefined>;
    shownRef: MutableRefObject<number>;
    itemsKey: string;
    setFitting: Dispatch<SetStateAction<ToolbarFitting>>;
};

/** How many measured items fit before More, and where focus goes when the focused item leaves the toolbar. */
export const measureToolbarFit = ({
    element,
    style,
    endsRef,
    moreSizeRef,
    refocusRef,
    shownRef,
    itemsKey,
    setFitting,
}: FitReading) => {
    const measured = endsRef.current;
    const gap = Number.parseFloat(style.columnGap) || 0;
    // More always shows, since it holds the toolbar mode switch.
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
    const focused = toolbarSlotsOf(element).findIndex((slot) => slot.contains(activeElement));
    if (focused >= next) {
        refocusRef.current = 'more';
    }

    // More stays for the mode switch, but its menu loses every command row once all items fit; the menu is a
    // portal that its trigger names in `aria-controls` while open.
    const menuId = more?.getAttribute('aria-controls');
    let menu: Element | null = null;
    if (menuId !== null && menuId !== undefined) {
        menu = element.ownerDocument.getElementById(menuId);
    }

    if (menu !== null && menu.contains(activeElement) && next === measured.length) {
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

/** Moves focus to More, or to the item its menu held, after a refit removed the focused control. */
export const focusFittedControl = (element: HTMLElement, target: 'more' | number) => {
    let control = element.querySelector<HTMLElement>('[data-rte-toolbar-more]');
    if (target !== 'more') {
        const slot = toolbarSlotsOf(element)[target];
        control = slot?.querySelector<HTMLElement>('[data-rte-toolbar-item]') ?? null;
        if (slot?.matches('[data-rte-toolbar-item]') === true) {
            control = slot as HTMLElement;
        }
    }

    if (control !== null) {
        control.focus();
    }
};
