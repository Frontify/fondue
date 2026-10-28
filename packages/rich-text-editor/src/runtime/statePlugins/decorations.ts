/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState, Plugin, PluginKey } from 'prosemirror-state';
import { DecorationSet } from 'prosemirror-view';

import { BLOCK_DECORATIONS_PLUGIN } from '#/model/internal';
import { type PluginImplementation } from '#/runtime/definition';

import {
    applyBlockDecorations,
    buildBlockDecorations,
    createDecorationContext,
    trackDecorationView,
} from './decorationSession';

const key = new PluginKey<DecorationSet>(BLOCK_DECORATIONS_PLUGIN.id);

const decorationsOfState = (state: EditorState) => key.getState(state) ?? DecorationSet.empty;

/** The decorations of every block decoration source, which derives a block again only once a change replaced it. */
export const blockDecorationsPlugin: PluginImplementation = ({ decorations: sources }) => {
    const context = createDecorationContext(sources, key);

    return new Plugin<DecorationSet>({
        key,
        state: {
            init: (_config, state) => buildBlockDecorations(context, state.doc),
            apply: (transaction, decorations) => applyBlockDecorations(context, transaction, decorations),
        },
        props: {
            decorations: decorationsOfState,
        },
        view: (editorView) => trackDecorationView(context, editorView),
    });
};
