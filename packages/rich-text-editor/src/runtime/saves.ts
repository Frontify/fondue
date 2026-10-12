/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type CommitOptions,
    type CommitResult,
    type DocumentStamp,
    type SaveStatus,
    type ServerRevision,
} from './types';

export const sameStamp = (a: DocumentStamp, b: DocumentStamp) =>
    a.documentId === b.documentId &&
    a.sessionId === b.sessionId &&
    a.generation === b.generation &&
    a.sequence === b.sequence;

/** The save coordinator of a session whose host sets `services.persistence`, which `src/persistence` builds. */
export interface SaveCoordinator {
    /** The same object until one of its fields changes. */
    status(): SaveStatus;
    /** A batch published an effective change; the batch emits `saveStatusChange` after this returns. */
    changed(): void;
    /** Input has settled after a composition, so a write that waited for it may capture now. */
    settled(): void;
    /** The host replaced `services.persistence`, so the write in flight goes to the new service. */
    serviceChanged(): void;
    /** `EditorHandle.requestCommit` of a managed session. */
    commit(options: CommitOptions): Promise<CommitResult>;
    /** Runs before the session is disposed, while listeners still hear its diagnostics. */
    dispose(): void;
}

/**
 * The status of a session with no save coordinator: `unmanaged`, with the load's acknowledgment, the same object while
 * the sequence holds.
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
