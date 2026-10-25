/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorRange } from '#/runtime/document-api';
import { positionsOf } from '#/runtime/editor-api';
import { caretRect, rangeRect, selectionRect, type SurfaceView } from '#/runtime/view-bridge';

import { type SelectionAnchor } from './overlays';
import { type AnchorTarget, type OverlayAnchor } from './plugin';

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

/** A rectangle an overlay anchors to, as Fondue's `virtualAnchor` takes it. */
export interface RangeAnchor {
    getBoundingClientRect(): DOMRect;
}

/** The box around the document range that `range` returns when read, such as a whole link, which Floating UI reads each frame. */
export const createRangeAnchor = (
    view: () => SurfaceView | undefined,
    range: () => { readonly from: number; readonly to: number } | undefined,
): RangeAnchor => ({
    getBoundingClientRect: () => {
        const current = view();
        const read = range();
        if (current === undefined || read === undefined) {
            return new DOMRect();
        }
        return rangeRect(current, read.from, read.to);
    },
});

/** The rectangle of `target`, or `undefined` where the selection stands in for it: no target, or a range that is gone or out of the document. */
const targetRect = (current: SurfaceView, target: AnchorTarget | undefined): DOMRect | undefined => {
    if (target === undefined || target === 'selection') {
        return undefined;
    }
    let read: EditorRange | Element | undefined;
    if (typeof target === 'function') {
        read = target();
    } else {
        read = target;
    }
    if (read === undefined) {
        return undefined;
    }
    const positions = positionsOf(read as EditorRange);
    if (positions === undefined) {
        // An element of an iframe's document is no `Element` of this window.
        return (read as Element).getBoundingClientRect();
    }
    if (positions.from === positions.to) {
        return caretRect(current, positions.from);
    }
    return rangeRect(current, positions.from, positions.to);
};

/**
 * Anchors an overlay to the selection and tells when a scrolling ancestor clips it. With `target`, it anchors to what
 * `target` returns when read, a collapsed range at its caret, and to the selection while it returns `undefined`.
 */
export const createSelectionAnchor = (
    view: () => SurfaceView | undefined,
    target?: () => AnchorTarget | undefined,
): SelectionAnchor => {
    // The held rectangle's offset from the surface, which scrolls and resizes with it.
    let held: { readonly x: number; readonly y: number; readonly width: number; readonly height: number } | undefined;
    let read = false;
    const anchorRect = (current: SurfaceView): DOMRect => {
        const targeted = targetRect(current, target?.());
        return targeted ?? selectionRect(current);
    };
    const rectOf = (current: SurfaceView): DOMRect => {
        if (held === undefined) {
            return anchorRect(current);
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
            read = true;
            return rectOf(current);
        },
        clipped: () => {
            const current = view();
            return read && current !== undefined && clipped(current.dom, rectOf(current));
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
            const rect = anchorRect(current);
            const surface = current.dom.getBoundingClientRect();
            held = { x: rect.left - surface.left, y: rect.top - surface.top, width: rect.width, height: rect.height };
        },
    };
};

/** The virtual anchor of `target` on the surface `view` returns. */
export const anchorOf = (view: () => SurfaceView | undefined, target: AnchorTarget): OverlayAnchor => {
    if (target === 'selection') {
        return createSelectionAnchor(view);
    }
    if (typeof target === 'function') {
        return createRangeAnchor(view, () => {
            const range = target();
            return range === undefined ? undefined : positionsOf(range);
        });
    }
    const positions = positionsOf(target as EditorRange);
    if (positions !== undefined) {
        return createRangeAnchor(view, () => positions);
    }
    // An element of an iframe's document is no `Element` of this window.
    const element = target as Element;
    return { getBoundingClientRect: () => element.getBoundingClientRect() };
};
