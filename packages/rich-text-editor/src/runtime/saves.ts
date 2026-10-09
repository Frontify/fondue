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

/** The save coordinator of a session whose host sets `services.persistence`, which `src/persistence` builds (DR-006). */
export interface SaveCoordinator {
    /** The same object until one of its fields changes. */
    status(): SaveStatus;
    /** A batch published an effective change; the batch emits `saveStatusChange` after this returns. */
    changed(): void;
    /** Input has settled, or a failed replacement left `transitioning`, so a write that waited may go now (SPEC-rich-text-persistence/AC-057). */
    settled(): void;
    /** The host replaced `services.persistence`, so the write in flight goes to the new service (SPEC-rich-text-runtime/AC-073). */
    serviceChanged(): void;
    /** `EditorHandle.requestCommit` of a managed session, and the `save` policy of a replacement (SPEC-rich-text-persistence/AC-020). */
    commit(options: CommitOptions): Promise<CommitResult>;
    /** Whether the session has unsaved changes (`SPEC-rich-text-persistence`, Save states). */
    unsaved(): boolean;
    /** Whether a write's outcome is unknown, in flight or waiting for replay, which a replacement may not drop (step 6). */
    outcomeUnknown(): boolean;
    /** Replacement step 8: the session starts again from a loaded record with `revision`, in the new generation. */
    replaced(revision: ServerRevision | null): void;
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
