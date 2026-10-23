/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DOMParser, DOMSerializer, Fragment, type Schema, Slice } from 'prosemirror-model';
import { type EditorState, NodeSelection } from 'prosemirror-state';

// One report per page, whichever editor sees the second copy first.
let reported = false;

/** Whether `prosemirror-state` or `prosemirror-transform` builds model objects with another copy of `prosemirror-model`. */
const engineCopyDisagrees = (state: EditorState): boolean => {
    // `NodeSelection.content` builds its slice with the `Slice` that `prosemirror-state` imports.
    if (!(NodeSelection.create(state.doc, 0).content() instanceof Slice)) {
        return true;
    }
    try {
        // `replaceWith` passes this fragment to the `Fragment.from` of `prosemirror-transform`, which throws for another copy's.
        state.tr.replaceWith(0, 0, Fragment.empty);
    } catch (error) {
        return error instanceof RangeError;
    }
    return false;
};

/** Whether the parser or serializer that `prosemirror-view` caches on the schema comes from another copy. */
const viewCopyDisagrees = (schema: Schema): boolean => {
    const { domParser, domSerializer } = schema.cached as {
        readonly domParser?: unknown;
        readonly domSerializer?: unknown;
    };
    return (
        (domParser !== undefined && !(domParser instanceof DOMParser)) ||
        (domSerializer !== undefined && !(domSerializer instanceof DOMSerializer))
    );
};

/** True the first time on this page that `found` holds, so a page reports a second copy once. */
const firstOnPage = (found: () => boolean): boolean => {
    if (reported || !found()) {
        return false;
    }
    reported = true;
    return true;
};

/**
 * Whether a mounting editor is the first on this page to see a second copy of `prosemirror-model` in an engine
 * package, checked by the identity of the objects that cross between them, as ProseMirror's own `Fragment.from`
 * check does.
 */
export const secondCopyAtMount = (state: EditorState): boolean =>
    firstOnPage(() => engineCopyDisagrees(state) || viewCopyDisagrees(state.schema));

/** The same, after a commit, for the parser and serializer that `prosemirror-view` caches once it reads or copies. */
export const secondCopyInView = (schema: Schema): boolean => firstOnPage(() => viewCopyDisagrees(schema));
