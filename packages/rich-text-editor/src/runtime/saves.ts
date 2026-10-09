/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type SaveStatus, type ServerRevision } from './types';

/** The save coordinator of a session whose host sets `services.persistence`, which `src/persistence` builds (DR-006). */
export interface SaveCoordinator {
    /** The same object until one of its fields changes. */
    status(): SaveStatus;
    /** A batch published an effective change; the batch emits `saveStatusChange` after this returns. */
    changed(): void;
    /** Input has settled after a composition, so a write that waited for it may capture now (SPEC-rich-text-persistence/AC-057). */
    settled(): void;
    /** The host replaced `services.persistence`, so the write in flight goes to the new service (SPEC-rich-text-runtime/AC-073). */
    serviceChanged(): void;
    /** Runs before the session is disposed, while listeners still hear its diagnostics (AC-040, AC-041). */
    dispose(): void;
}

/**
 * The status of a session with no save coordinator: `unmanaged`, with the load's acknowledgment, the same object while
 * the sequence holds (SPEC-rich-text-persistence/AC-001, AC-004, AC-005).
 */
export const createUnmanagedStatus = (revision: ServerRevision | null) => {
    let acknowledgedSequence = 0;
    if (revision === null) {
        acknowledgedSequence = -1;
    }
    let status: SaveStatus | undefined;
    return (sequence: number): SaveStatus => {
        if (status === undefined || status.latestSequence !== sequence) {
            status = Object.freeze({
                state: 'unmanaged',
                latestSequence: sequence,
                acknowledgedSequence,
                revision,
                inFlightOperationId: null,
                diagnostic: null,
            });
        }
        return status;
    };
};
