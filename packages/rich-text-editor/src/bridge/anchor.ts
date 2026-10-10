/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorView } from 'prosemirror-view';

/** A rectangle an overlay anchors to, as Fondue's `virtualAnchor` takes it, which Floating UI reads each frame. */
export interface SelectionAnchor {
    getBoundingClientRect(): DOMRect;
    /** Holds the rectangle where it is beside the surface, so content changes next to it leave the overlay in place. */
    hold(held: boolean): void;
}

/** The parent of a node, from a shadow root to its host. */
const parentOf = (node: Element): Element | null => {
    if (node.parentElement !== null) {
        return node.parentElement;
    }
    const root = node.getRootNode();
    if (root instanceof ShadowRoot) {
        return root.host;
    }
    return null;
};

/**
 * Whether a scrolling ancestor of the surface, below the viewport, clips all of `rect`. An ancestor clips only the
 * boxes it contains: none above a fixed box, and only positioned ones above an absolute box, as Floating UI's
 * clipping ancestors also skip; transforms are not followed.
 */
const clipped = (surface: HTMLElement, rect: DOMRect): boolean => {
    const view = surface.ownerDocument.defaultView;
    if (view === null) {
        return false;
    }
    let position = view.getComputedStyle(surface).position;
    for (
        let node = parentOf(surface);
        node !== null && node !== surface.ownerDocument.documentElement && position !== 'fixed';
        node = parentOf(node)
    ) {
        const style = view.getComputedStyle(node);
        const contains = position !== 'absolute' || style.position !== 'static';
        if (!contains) {
            continue;
        }
        position = style.position;
        if (style.overflowX === 'visible' && style.overflowY === 'visible') {
            continue;
        }
        const box = node.getBoundingClientRect();
        // A caret has no width, so touching an edge still counts as visible.
        if (rect.bottom < box.top || rect.top > box.bottom || rect.right < box.left || rect.left > box.right) {
            return true;
        }
    }
    return false;
};

/** The selection's rectangle: the selected node's box, the caret, or the box around every line of a text range. */
const selectionRect = (view: EditorView): DOMRect => {
    const { selection } = view.state;
    if ('node' in selection) {
        const dom = view.nodeDOM(selection.from);
        if (dom instanceof Element) {
            return dom.getBoundingClientRect();
        }
    }
    if (selection.empty) {
        const caret = view.coordsAtPos(selection.head);
        return new DOMRect(caret.left, caret.top, 0, caret.bottom - caret.top);
    }
    const start = view.domAtPos(selection.from);
    const end = view.domAtPos(selection.to);
    const range = view.dom.ownerDocument.createRange();
    range.setStart(start.node, start.offset);
    range.setEnd(end.node, end.offset);
    return range.getBoundingClientRect();
};

/**
 * Anchors an overlay to the selection, and hides `content` while a scrolling ancestor clips the whole rectangle,
 * keeping its state (SPEC-rich-text-react/AC-063, AC-064).
 */
export const createSelectionAnchor = (
    view: () => EditorView | undefined,
    content: () => HTMLElement | null,
): SelectionAnchor => {
    // The held rectangle's offset from the surface, which scrolls and resizes with it (SPEC-rich-text-accessibility/AC-041).
    let held: { readonly x: number; readonly y: number; readonly width: number; readonly height: number } | undefined;
    const rectOf = (current: EditorView): DOMRect => {
        if (held === undefined) {
            return selectionRect(current);
        }
        const surface = current.dom.getBoundingClientRect();
        return new DOMRect(surface.left + held.x, surface.top + held.y, held.width, held.height);
    };
    return {
        getBoundingClientRect: () => {
            const current = view();
            if (current === undefined) {
                return new DOMRect();
            }
            const rect = rectOf(current);
            const element = content();
            if (element !== null) {
                let visibility = '';
                if (clipped(current.dom, rect)) {
                    visibility = 'hidden';
                }
                element.style.visibility = visibility;
            }
            return rect;
        },
        hold: (next) => {
            const current = view();
            if (!next || current === undefined) {
                held = undefined;
                return;
            }
            if (held !== undefined) {
                return;
            }
            const rect = selectionRect(current);
            const surface = current.dom.getBoundingClientRect();
            held = { x: rect.left - surface.left, y: rect.top - surface.top, width: rect.width, height: rect.height };
        },
    };
};
