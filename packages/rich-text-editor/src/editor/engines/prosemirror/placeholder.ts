/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node as PmNode } from 'prosemirror-model';
import { Plugin as PmPlugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

/** A single empty text block. Not "no text anywhere": the placeholder must not talk over an empty paragraph plus a void block (a column break). */
const isEmptyDoc = (doc: PmNode): boolean =>
    doc.childCount === 1 && doc.firstChild !== null && doc.firstChild.isTextblock && doc.firstChild.content.size === 0;

/**
 * Draws the placeholder shown while nothing has been typed. The text is read
 * through a thunk so changing the prop does not re-create the editor.
 *
 * A decoration on the empty block rather than an overlay, so it lines up with
 * where typing starts; the text rides in `data-placeholder` for the stylesheet.
 */
export const placeholderPlugin = (getPlaceholder: () => string, className: string): PmPlugin =>
    new PmPlugin({
        props: {
            decorations(state) {
                const placeholder = getPlaceholder();
                const block = state.doc.firstChild;
                if (!placeholder || block === null || !isEmptyDoc(state.doc)) {
                    return null;
                }
                return DecorationSet.create(state.doc, [
                    Decoration.node(0, block.nodeSize, {
                        class: className,
                        'data-placeholder': placeholder,
                    }),
                ]);
            },
        },
    });
