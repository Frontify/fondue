/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type SaveCoordinator } from '#/runtime/reporting/saves';
import { type EditorRuntime } from '#/runtime/runtime';

import { outcomeUnknown, unsavedOf, type Rejection } from './saveMachine';
import { createTransport, type SaveCoordinatorOptions } from './transport';
import { type SaveRequest } from './types';

export type { Rejection, SaveCoordinatorOptions };

/**
 * Orders a session's writes through the host's `PersistenceService`: one write in flight, a debounced autosave with a
 * longest wait, the same operation replayed while its outcome is unknown, and writes paused on a conflict or a
 * rejection. The save machine decides each step; the transport runs it.
 */
export const createSaveCoordinator = (
    runtime: EditorRuntime,
    given: SaveCoordinatorOptions,
): SaveCoordinator & {
    unresolved: () => SaveRequest | undefined;
    /** Why the state is `error`: the rejection code, or `null` once retries ran out. */
    rejection: () => Rejection | null;
    /** Whether the last accepted acknowledgment answered a `requestCommit` call. */
    committed: () => boolean;
} => {
    const transport = createTransport(runtime, given);

    return {
        status: transport.status,
        changed: () => {
            transport.dispatch({ type: 'changed' });
        },
        settled: () => {
            transport.captureWaiting();
            transport.dispatch({ type: 'send' });
        },
        commit: transport.commit,
        serviceChanged: () => {
            transport.dispatch({ type: 'serviceChanged' });
        },
        // Reads the session's sequence, which a `documentChange` listener sees before `changed` runs.
        unsaved: () => unsavedOf(transport.machine(), runtime.handle.getSummary().sequence),
        outcomeUnknown: () => outcomeUnknown(transport.machine()),
        replaced: (revision, previous) => {
            transport.dispatch({ type: 'replaced', revision, previous });
        },
        unresolved: () => transport.machine().unresolved,
        rejection: () => transport.machine().rejection,
        committed: () => transport.machine().committed,
        dispose: () => {
            transport.dispatch({ type: 'dispose' });
        },
    };
};
