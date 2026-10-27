/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState } from 'prosemirror-state';

export type Store = {
    /** The state the view shows; read-only through this property, changed with `set`. */
    state: EditorState;
    set(next: EditorState): void;
};

export const createStore = (initial: EditorState): Store => {
    let state = initial;

    return {
        get state() {
            return state;
        },
        set(next) {
            state = next;
        },
    };
};
