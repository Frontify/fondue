/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type DocumentStamp, type SessionToken } from '../types';

export interface Identity {
    session(): SessionToken;
    sequence(): number;
    commitSequence(): number;
    /** The session token with the current sequence. */
    stamp(): DocumentStamp;
    bumpSequence(): void;
    bumpCommit(): void;
    /** Moves to the next generation and document with the sequence reset; returns the stamp it left. */
    nextGeneration(documentId: string): DocumentStamp;
}

export const createIdentity = (args: { documentId: string; generate: () => string }): Identity => {
    let session: SessionToken = { documentId: args.documentId, sessionId: args.generate(), generation: 0 };
    let commitSequence = 0;
    let sequence = 0;
    const stamp = (): DocumentStamp => ({ ...session, sequence });
    return {
        session: () => session,
        sequence: () => sequence,
        commitSequence: () => commitSequence,
        stamp,
        bumpSequence: () => {
            sequence += 1;
        },
        bumpCommit: () => {
            commitSequence += 1;
        },
        nextGeneration: (documentId) => {
            const previous = stamp();
            session = { documentId, sessionId: session.sessionId, generation: session.generation + 1 };
            sequence = 0;
            return previous;
        },
    };
};
