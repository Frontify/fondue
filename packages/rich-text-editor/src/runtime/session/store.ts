/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState } from 'prosemirror-state';

export type Store = {
    readonly state: EditorState;
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
