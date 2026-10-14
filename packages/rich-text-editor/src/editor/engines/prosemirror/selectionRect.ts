/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorView } from 'prosemirror-view';

import { type FloatingRect } from '#/editor/port';

/**
 * The box around every line the selection covers, read from the DOM. Its two
 * ends alone are not enough: in a column layout the text between them can
 * reach further down than either end.
 */
const domRectBetween = (view: EditorView, from: number, to: number): FloatingRect | null => {
    const start = view.domAtPos(from);
    const end = view.domAtPos(to);
    const range = view.dom.ownerDocument.createRange();
    range.setStart(start.node, start.offset);
    range.setEnd(end.node, end.offset);
    // jsdom has no layout, so it has no rect to give either.
    const rect = typeof range.getBoundingClientRect === 'function' ? range.getBoundingClientRect() : null;
    return rect && (rect.width > 0 || rect.height > 0)
        ? { left: rect.left, top: rect.top, width: rect.width, height: rect.height }
        : null;
};

/** The box spanning the selection's two ends, for when the DOM has none to give. */
const rectBetweenEnds = (view: EditorView, from: number, to: number): FloatingRect => {
    const start = view.coordsAtPos(from);
    const end = view.coordsAtPos(to);
    const left = Math.min(start.left, end.left);
    const top = Math.min(start.top, end.top);
    return {
        left,
        top,
        width: Math.max(start.right, end.right) - left,
        height: Math.max(start.bottom, end.bottom) - top,
    };
};

/** Where the selected text sits on screen, for the floating toolbar; null when nothing is selected. */
export const createSelectionRectReader =
    (view: EditorView): (() => FloatingRect | null) =>
    () => {
        const { from, to, empty } = view.state.selection;
        return empty ? null : (domRectBetween(view, from, to) ?? rectBetweenEnds(view, from, to));
    };
