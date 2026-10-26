/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it, vi } from 'vitest';

import { type SaveCoordinator } from '../../saves';
import { createSaving } from '../../session/saving';
import { type CommitResult, type SaveStatus, type ServerRevision } from '../../types';

const revision = 'rev-1' as unknown as ServerRevision;

const make = (options: { revision?: ServerRevision | null; transitioning?: boolean } = {}) => {
    let sequence = 0;
    let transitioning = options.transitioning ?? false;
    const saving = createSaving({
        revision: options.revision ?? null,
        sequence: () => sequence,
        lifecycle: { is: () => transitioning },
    });

    return {
        saving,
        setSequence: (next: number) => {
            sequence = next;
        },
        setTransitioning: (next: boolean) => {
            transitioning = next;
        },
    };
};

const coordinator = () => {
    const status = { state: 'saved' } as unknown as SaveStatus;
    const acknowledged: CommitResult = { status: 'blocked', code: 'not-ready' };

    return {
        status: vi.fn(() => status),
        changed: vi.fn(),
        settled: vi.fn(),
        serviceChanged: vi.fn(),
        commit: vi.fn(() => Promise.resolve(acknowledged)),
        unsaved: vi.fn(() => true),
        outcomeUnknown: vi.fn(() => true),
        replaced: vi.fn(),
        dispose: vi.fn(),
    } satisfies SaveCoordinator;
};

describe('createSaving unmanaged', () => {
    it('reports the loaded revision as acknowledged and the same object while the sequence holds', () => {
        const { saving, setSequence } = make({ revision });
        const first = saving.status();
        expect(first.state).toBe('unmanaged');
        expect(first.revision).toBe(revision);
        expect(saving.status()).toBe(first);
        setSequence(2);
        expect(saving.status()).not.toBe(first);
        expect(saving.status().latestSequence).toBe(2);
    });

    it('has unsaved changes only after the sequence moved', () => {
        const { saving, setSequence } = make();
        expect(saving.unsaved()).toBe(false);
        setSequence(1);
        expect(saving.unsaved()).toBe(true);
    });

    it('blocks commits and requests as unmanaged', async () => {
        const { saving } = make();
        expect(await saving.commit({ reason: 'navigate' })).toEqual({ status: 'blocked', code: 'unmanaged' });
        expect(await saving.request({ reason: 'navigate' })).toEqual({ status: 'blocked', code: 'unmanaged' });
    });

    it('ignores the coordinator notifications and reports no unknown outcome', () => {
        const { saving } = make();
        saving.changed();
        saving.settled();
        saving.serviceChanged();
        saving.dispose();
        expect(saving.outcomeUnknown()).toBe(false);
    });

    it('starts again from the replaced record revision', () => {
        const { saving } = make({ revision });
        const next = 'rev-2' as unknown as ServerRevision;
        saving.replaced(next, { documentId: 'a', sessionId: 's', generation: 0, sequence: 0 });
        expect(saving.status().revision).toBe(next);
    });
});

describe('createSaving managed', () => {
    it('delegates status, unsaved, outcome and notifications to the coordinator', () => {
        const { saving } = make();
        const saves = coordinator();
        saving.attach(saves);
        expect(saving.status()).toBe(saves.status());
        expect(saving.unsaved()).toBe(true);
        expect(saving.outcomeUnknown()).toBe(true);
        saving.changed();
        saving.settled();
        saving.serviceChanged();
        saving.dispose();
        expect(saves.changed).toHaveBeenCalledOnce();
        expect(saves.settled).toHaveBeenCalledOnce();
        expect(saves.serviceChanged).toHaveBeenCalledOnce();
        expect(saves.dispose).toHaveBeenCalledOnce();
    });

    it('passes the stamp of a replacement to the coordinator', () => {
        const { saving } = make();
        const saves = coordinator();
        saving.attach(saves);
        const previous = { documentId: 'a', sessionId: 's', generation: 0, sequence: 3 };
        saving.replaced(revision, previous);
        expect(saves.replaced).toHaveBeenCalledWith(revision, previous);
    });

    it('commits through the coordinator', async () => {
        const { saving } = make();
        const saves = coordinator();
        saving.attach(saves);
        await saving.commit({ reason: 'navigate' });
        expect(saves.commit).toHaveBeenCalledWith({ reason: 'navigate' });
    });

    it('blocks a request while the document is replaced but lets commit through', async () => {
        const { saving, setTransitioning } = make({ transitioning: true });
        const saves = coordinator();
        saving.attach(saves);
        expect(await saving.request({ reason: 'navigate' })).toEqual({ status: 'blocked', code: 'not-ready' });
        expect(saves.commit).not.toHaveBeenCalled();
        await saving.commit({ reason: 'navigate' });
        expect(saves.commit).toHaveBeenCalledOnce();
        setTransitioning(false);
        await saving.request({ reason: 'navigate' });
        expect(saves.commit).toHaveBeenCalledTimes(2);
    });

    it('attaching undefined returns the session to unmanaged', async () => {
        const { saving } = make();
        saving.attach(coordinator());
        saving.attach(undefined);
        expect(await saving.commit({ reason: 'navigate' })).toEqual({ status: 'blocked', code: 'unmanaged' });
    });
});
