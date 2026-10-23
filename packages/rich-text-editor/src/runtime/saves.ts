/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type SaveStatus, type ServerRevision } from './types';

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
