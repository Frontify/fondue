/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node as PmNode } from 'prosemirror-model';
import { Plugin as PmPlugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

/** The text shown while nothing has been typed. */

/**
 * "Nothing has been typed yet": a single empty text block. Deliberately not "no
 * text anywhere" — a placeholder should not talk over a document holding an
 * empty paragraph *and* an image.
 */
const isEmptyDoc = (doc: PmNode): boolean =>
    doc.childCount === 1 && doc.firstChild !== null && doc.firstChild.isTextblock && doc.firstChild.content.size === 0;

/**
 * Draws the placeholder, reading the current text through a thunk so changing
 * the prop does not mean re-creating the editor.
 *
 * A decoration on the empty block rather than an overlay, so it inherits the
 * block's box and lines up with where typing will start, whatever the block's
 * margins. The text rides along in `data-placeholder` for the stylesheet to
 * draw.
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
