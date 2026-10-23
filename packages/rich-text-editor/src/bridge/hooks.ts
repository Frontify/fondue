/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorRuntime } from '#/runtime/runtime';
import {
    type CommandArgs,
    type CommandKey,
    type CommandState,
    type SelectionSummary,
    type ShippedCommands,
} from '#/runtime/types';

import { useSessionValue } from './session';

// What the selection reads before the session is ready, as during `mounting`.
const NO_SELECTION: SelectionSummary = { kind: 'none', collapsed: true, blockType: null, selectedNodeId: null };

const selectionOf = (runtime: EditorRuntime | undefined): SelectionSummary => {
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

// What a command reads before the session is ready, as `query` answers during `mounting`.
const NOT_READY: CommandState = { enabled: false, active: false, disabledReason: 'not-ready' };

const sameCommandState = (a: CommandState, b: CommandState) =>
    a.enabled === b.enabled && a.active === b.active && a.disabledReason === b.disabledReason;

/** A command's state for `args`, which rerenders the caller only when the state changes. */
export const useCommandQuery = (id: string, ...args: readonly unknown[]): CommandState =>
    useSessionValue((runtime) => {
        if (runtime === undefined) {
            return NOT_READY;
        }
        return runtime.handle.query(id, ...args);
    }, sameCommandState);

/** The typed `useCommandState` of the public entry. */
export const useCommandState = <C extends object = ShippedCommands, K extends CommandKey<C> = CommandKey<C>>(
    id: K,
    ...args: CommandArgs<C, K>
): CommandState => useCommandQuery(id, ...args);
