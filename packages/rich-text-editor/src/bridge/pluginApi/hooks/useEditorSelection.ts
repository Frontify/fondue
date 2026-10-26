/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorPort, type SelectionSummary } from '#/runtime/port';

import { useSessionValue } from '../../session/hooks/useSessionValue';

// What the selection reads before the session is ready, as during `mounting`.
const NO_SELECTION: SelectionSummary = { kind: 'none', collapsed: true, blockType: null, selectedNodeId: null };

const selectionOf = (runtime: EditorPort | undefined): SelectionSummary => {
    if (runtime === undefined) {
        return NO_SELECTION;
    }

    return runtime.handle.getSummary().selection;
};

/** A value selected from the editor's selection, which rerenders the caller only when `isEqual` finds it changed. */
export const useEditorSelection = <T>(
    select: (selection: SelectionSummary) => T,
    isEqual: (a: T, b: T) => boolean = Object.is,
): T => useSessionValue((runtime) => select(selectionOf(runtime)), isEqual);
