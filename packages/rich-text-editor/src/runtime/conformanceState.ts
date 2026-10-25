/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorState, TextSelection } from 'prosemirror-state';

import { type CompiledDefinition } from '#/definition';

export type ConformanceState = EditorState;

export const stateFromTree = (definition: CompiledDefinition, tree: unknown): ConformanceState =>
    EditorState.create({ doc: definition.schema.nodeFromJSON(tree) });

export const withWholeDocumentSelected = (state: ConformanceState): ConformanceState => {
    const { doc } = state;
    return state.apply(state.tr.setSelection(TextSelection.between(doc.resolve(0), doc.resolve(doc.content.size))));
};
