/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { createIdentity } from '../../session/identity';

const make = () => createIdentity({ documentId: 'doc-1', generate: () => 'session-1' });

describe('createIdentity', () => {
    it('starts at generation 0 with both counters at 0', () => {
        const identity = make();
        expect(identity.session()).toEqual({ documentId: 'doc-1', sessionId: 'session-1', generation: 0 });
        expect(identity.sequence()).toBe(0);
        expect(identity.commitSequence()).toBe(0);
        expect(identity.stamp()).toEqual({ documentId: 'doc-1', sessionId: 'session-1', generation: 0, sequence: 0 });
    });

    it('draws the session id once from generate', () => {
        let calls = 0;
        const identity = createIdentity({
            documentId: 'doc-1',
            generate: () => {
                calls += 1;

                return `id-${calls}`;
            },
        });
        identity.nextGeneration('doc-2');
        expect(calls).toBe(1);
        expect(identity.session().sessionId).toBe('id-1');
    });

    it('counts sequence and commit sequence apart', () => {
        const identity = make();
        identity.bumpSequence();
        identity.bumpCommit();
        identity.bumpCommit();
        expect(identity.sequence()).toBe(1);
        expect(identity.commitSequence()).toBe(2);
        expect(identity.stamp().sequence).toBe(1);
    });

    it('returns the same session object until the generation moves', () => {
        const identity = make();
        const first = identity.session();
        identity.bumpSequence();
        expect(identity.session()).toBe(first);
    });

    it('moves to the next generation, resets the sequence, and returns the stamp it left', () => {
        const identity = make();
        identity.bumpSequence();
        identity.bumpSequence();
        identity.bumpCommit();
        const previous = identity.nextGeneration('doc-2');
        expect(previous).toEqual({ documentId: 'doc-1', sessionId: 'session-1', generation: 0, sequence: 2 });
        expect(identity.session()).toEqual({ documentId: 'doc-2', sessionId: 'session-1', generation: 1 });
        expect(identity.sequence()).toBe(0);
        expect(identity.commitSequence()).toBe(1);
    });

    it('returns a stamp that does not follow later changes', () => {
        const identity = make();
        const stamp = identity.stamp();
        identity.bumpSequence();
        expect(stamp.sequence).toBe(0);
    });
});
