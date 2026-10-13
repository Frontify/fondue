/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorView } from 'prosemirror-view';

import { type FloatingRect } from '#/editor/port';

/** Where the selected text sits on screen, for the editor's floating toolbar. */

const rectBetween = (view: EditorView, from: number, to: number): FloatingRect => {
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

export const createSelectionRectReader =
    (view: EditorView): (() => FloatingRect | null) =>
    () => {
        const { from, to, empty } = view.state.selection;
        return empty ? null : rectBetween(view, from, to);
    };
