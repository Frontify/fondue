/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorView } from 'prosemirror-view';

/** A rectangle an overlay anchors to, as Fondue's `virtualAnchor` takes it. */
export interface RangeAnchor {
    getBoundingClientRect(): DOMRect;
}

/** The box around the document range that `range` returns when read, such as a whole link, which Floating UI reads each frame. */
export const rangeAnchor = (
    view: () => EditorView | undefined,
    range:
        | { readonly from: number; readonly to: number }
        | (() => { readonly from: number; readonly to: number } | undefined),
): RangeAnchor => ({
    getBoundingClientRect: () => {
        const current = view();
        const read = typeof range === 'function' ? range() : range;
        if (current === undefined || read === undefined) {
            return new DOMRect();
        }
        const size = current.state.doc.content.size;
        const from = Math.min(read.from, size);
        const to = Math.min(Math.max(read.to, from), size);
        const start = current.domAtPos(from);
        const end = current.domAtPos(to);
        const box = current.dom.ownerDocument.createRange();
        box.setStart(start.node, start.offset);
        box.setEnd(end.node, end.offset);
        return box.getBoundingClientRect();
    },
});
