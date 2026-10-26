/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState } from 'prosemirror-state';

export const WORD = /[\p{L}\p{M}\p{N}]/u;

/** Whether text between `from` and `to` carries a code mark, so a match there never fires. */
export const holdsCode = (state: EditorState, from: number, to: number) => {
    let code = false;
    state.doc.nodesBetween(from, to, (node) => {
        code ||= node.marks.some((mark) => mark.type.spec.code === true);
    });

    return code;
};
