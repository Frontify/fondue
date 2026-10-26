/* (c) Copyright Frontify Ltd., all rights reserved. */

import { NodeSelection, type Selection } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';

type Band = {
    top: number;
    bottom: number;
};

// ProseMirror's own default margin.
const DEFAULT_MARGIN = 5;

const marginsOf = (view: EditorView) => {
    const margin = view.someProp('scrollMargin') ?? DEFAULT_MARGIN;
    if (typeof margin === 'number') {
        return { top: margin, bottom: margin };
    }

    return { top: margin.top, bottom: margin.bottom };
};

const scrolls = (element: Element, owner: Window) =>
    /auto|scroll|overlay/.test(owner.getComputedStyle(element).overflowY) &&
    element.scrollHeight > element.clientHeight;

/**
 * Scrolls `from` and each ancestor that scrolls so `band` shows inside it, past the margins the view keeps clear of the
 * chrome, its start first when it is taller than the space, as ProseMirror scrolls to a focused selection.
 */
const scrollBandIntoView = (view: EditorView, band: Band, from: Element) => {
    const owner = from.ownerDocument.defaultView;
    if (owner === null) {
        return;
    }

    const margin = marginsOf(view);
    const page = from.ownerDocument.scrollingElement;
    let { top, bottom } = band;
    for (let parent: Element | null = from; parent !== null; parent = parent.parentElement) {
        const atPage = parent === page || parent === from.ownerDocument.body;
        if (!atPage && !scrolls(parent, owner)) {
            continue;
        }

        const bounds = atPage ? { top: 0, bottom: owner.innerHeight } : parent.getBoundingClientRect();
        let move = 0;
        if (top < bounds.top + margin.top) {
            move = top - bounds.top - margin.top;
        } else if (bottom > bounds.bottom - margin.bottom) {
            move = Math.min(bottom - bounds.bottom + margin.bottom, top - bounds.top - margin.top);
        }

        if (move !== 0) {
            const before = atPage ? owner.scrollY : parent.scrollTop;
            if (atPage) {
                owner.scrollBy(0, move);
            } else {
                parent.scrollTop += move;
            }

            const moved = (atPage ? owner.scrollY : parent.scrollTop) - before;
            top -= moved;
            bottom -= moved;
        }

        if (atPage) {
            return;
        }
    }
};

/** The scroll offsets of `from` and each ancestor now, put back by the returned function. */
export const keepScroll = (from: Element): (() => void) => {
    const kept: { element: Element; top: number; left: number }[] = [];
    for (let parent: Element | null = from; parent !== null; parent = parent.parentElement) {
        kept.push({ element: parent, top: parent.scrollTop, left: parent.scrollLeft });
    }

    return () => {
        for (const { element, top, left } of kept) {
            if (element.scrollTop !== top) {
                element.scrollTop = top;
            }

            if (element.scrollLeft !== left) {
                element.scrollLeft = left;
            }
        }
    };
};

/** Scrolls `selection` into view, the caret or the start of a selected node, wherever focus is. */
export const scrollSelectionIntoView = (view: EditorView, selection: Selection): void => {
    if (selection instanceof NodeSelection) {
        const node = view.nodeDOM(selection.from);
        if (node instanceof Element) {
            scrollBandIntoView(view, node.getBoundingClientRect(), node);
        }

        return;
    }

    scrollBandIntoView(view, view.coordsAtPos(selection.head), view.dom);
};
