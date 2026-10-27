/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorState, TextSelection } from 'prosemirror-state';

import { type CompiledDefinition } from '#/runtime/definition';

export type ConformanceState = EditorState;

/** An editor state on `tree`, a document of `definition`'s schema, with the selection at the start. */
export const stateFromTree = (definition: CompiledDefinition, tree: unknown): ConformanceState =>
    EditorState.create({ doc: definition.schema.nodeFromJSON(tree) });

/** `state` with a text selection from the start of its document to the end. */
export const withWholeDocumentSelected = (state: ConformanceState): ConformanceState => {
    const { doc } = state;

    return state.apply(state.tr.setSelection(TextSelection.between(doc.resolve(0), doc.resolve(doc.content.size))));
};
