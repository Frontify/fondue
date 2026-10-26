/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { countingIds } from '#/features/__tests__/fixtures/notes';
import { type PersistenceService } from '#/persistence/types';
import { createFakePersistenceService, setSelection, typeText } from '#/testing';

import { deferredUploads, mountUploads, pngFile, settle } from './fixtures/uploads';

beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    vi.useRealTimers();
});

/** The order of the events a run heard and the documents it published, by event name. */
const eventsOf = (mounted: Awaited<ReturnType<typeof mountUploads>>) => ({
    changes: mounted.changes.map(({ origin, commandId, stamp }) => ({ origin, commandId, stamp })),
    documents: mounted.changes.map((change) => change.readDocument()),
    diagnostics: mounted.diagnostics.map(({ code }) => code),
});

/** Uploads, cancels, retries and completes from one fresh session, and records everything it can observe. */
const uploadRun = async () => {
    const uploads = deferredUploads();
    const mounted = await mountUploads({ uploads, generateId: countingIds() });
    setSelection(mounted.handle, { text: 'Before', from: 6, to: 6 });
    await mounted.choose([pngFile('a.png'), pngFile('b.png'), pngFile('c.png'), pngFile('d.png')]);
    act(() => uploads.pending[0]?.context.reportProgress(0.5));
    await uploads.complete(0);
    act(() => {
        mounted.handle.execute('media.upload.cancel', { nodeId: mounted.imageIds()[1] ?? '' });
    });
    await settle();
    await uploads.fail(2);
    act(() => {
        mounted.handle.execute('media.upload.retry', { nodeId: mounted.imageIds()[2] ?? '' });
    });
    await settle();
    await mounted.undo();
    await uploads.complete(3);
    const trace = {
        ...eventsOf(mounted),
        requests: uploads.upload.mock.calls.map(([request]) => ({
            operationId: request.operationId,
            filename: request.filename,
            size: request.blob.size,
        })),
        released: uploads.released(),
        snapshot: mounted.handle.getSnapshot(),
        now: Date.now(),
    };
    mounted.unmount();

    return trace;
};

/** Types, saves and types again from one fresh session with the reference persistence fake, and records the writes. */
const persistenceRun = async () => {
    const server = createFakePersistenceService();
    const save = vi.fn<PersistenceService['save']>((request, context) => server.save(request, context));
    const mounted = await mountUploads({ services: { persistence: { ...server, save } }, generateId: countingIds() });
    setSelection(mounted.handle, { text: 'Before', from: 6, to: 6 });
    typeText(mounted.handle, ' one');
    await act(async () => {
        await mounted.handle.requestCommit({ reason: 'manual' });
    });
    typeText(mounted.handle, ' two');
    await act(async () => {
        await vi.advanceTimersByTimeAsync(10_000);
    });
    const trace = {
        ...eventsOf(mounted),
        requests: save.mock.calls.map(([request]) => request),
        status: mounted.handle.getSaveStatus(),
        snapshot: mounted.handle.getSnapshot(),
        now: Date.now(),
    };
    mounted.unmount();

    return trace;
};

describe('runs that depend on time and created IDs', () => {
    it.each([
        ['upload', uploadRun],
        ['persistence', persistenceRun],
    ])('records the same %s trace twice under fake timers with one generateId', async (_name, run) => {
        vi.setSystemTime(new Date('2026-10-12T08:00:00Z'));
        const first = await run();
        vi.setSystemTime(new Date('2026-10-12T08:00:00Z'));
        const second = await run();

        expect(first.requests.length).toBeGreaterThan(0);
        expect(second).toEqual(first);
    });
});
