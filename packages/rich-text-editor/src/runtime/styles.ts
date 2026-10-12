/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState, Plugin, PluginKey } from 'prosemirror-state';

import { type PresentationStyle } from '#/model';

const key = new PluginKey<() => readonly PresentationStyle[]>('rte.styles');

/** The presentation's brand styles in the session, or none for a state that no editor session made. */
export const stylesOf = (state: EditorState): readonly PresentationStyle[] => {
    const read = key.getState(state);
    if (read === undefined) {
        return [];
    }
    return read();
};

/** The session's brand styles, which `read` gives, as `block.style.set` reads them for the block types a style applies to. */
export const stylesPlugin = (read: () => readonly PresentationStyle[]): Plugin =>
    new Plugin({ key, state: { init: () => read, apply: (_transaction, value) => value } });
