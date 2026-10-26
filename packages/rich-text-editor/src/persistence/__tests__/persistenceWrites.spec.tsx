/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import fc from 'fast-check';
import { describe, expect, it, vi } from 'vitest';

import { type CommitResult, type PersistenceService, type SaveRequest } from '#/index';
import { encodeTree } from '#/model/internal';
import { createFakePersistenceService, setSelection } from '#/testing';

import {
    WRITER,
    para,
    textOf,
    serviceOf,
    settle,
    mount,
    installPersistenceHooks,
    seededRandom,
} from './fixtures/mounted';

vi.mock('#/model/document/encode', { spy: true });

installPersistenceHooks();

describe('writes', () => {
    it('keeps at most one write in flight across random edits, requestCommit calls and delayed responses', async () => {
        const step = fc.oneof(
            fc.constant({ kind: 'type' as const }),
            fc.record({ kind: fc.constant('advance' as const), ms: fc.integer({ min: 0, max: 40_000 }) }),
            fc.record({ kind: fc.constant('answer' as const), saved: fc.boolean() }),
            fc.constant({ kind: 'commit' as const }),
        );
        await fc.assert(
            fc.asyncProperty(fc.array(step, { maxLength: 25 }), async (steps) => {
                const server = createFakePersistenceService();
                let open = 0;
                let most = 0;
                const waiting: { saved: () => void; failed: () => void }[] = [];
                const service: PersistenceService = {
                    save: (request, context) =>
                        new Promise((resolve, reject) => {
                            open += 1;
                            most = Math.max(most, open);
                            let ended = false;
                            const end = () => {
                                if (!ended) {
                                    ended = true;
                                    open -= 1;
                                }
                            };

                            // An aborted request is no longer in flight for the coordinator.
                            context.signal.addEventListener('abort', end);
                            waiting.push({
                                saved: () => {
                                    end();
                                    resolve(server.save(request, context));
                                },
                                failed: () => {
                                    end();
                                    reject(new Error('lost'));
                                },
                            });
                        }),
                    read: server.read,
                };
                const { handle, flush, type, advance, unmount } = mount({ service });
                const commits: Promise<CommitResult>[] = [];
                for (const next of steps) {
                    if (next.kind === 'type') {
                        type('x');
                    } else if (next.kind === 'commit') {
                        commits.push(handle().requestCommit({ reason: 'manual' }));
                        await flush();
                    } else if (next.kind === 'advance') {
                        advance(next.ms);
                    } else {
                        const first = waiting.shift();
                        if (first !== undefined && next.saved) {
                            first.saved();
                        } else if (first !== undefined) {
                            first.failed();
                        }
                    }

                    await settle();
                }

                unmount();
                expect(most).toBeLessThanOrEqual(1);
                // Dispose resolves every call still pending.
                await Promise.all(commits);
            }),
            { numRuns: 40 },
        );
    });

    it('writes at 5 s and 10 s of continuous typing and 500 ms after the last character', async () => {
        const { service, calls } = serviceOf();
        const { type, advance, unmount } = mount({ service });
        const start = Date.now();
        for (let character = 0; character < 120; character += 1) {
            type('x');
            advance(100);
            await settle();
        }

        advance(1000);
        await settle();
        expect(calls.map(({ at }) => at - start)).toEqual([5000, 10_000, 12_400]);
        expect(calls.map(({ request }) => textOf(request)?.length)).toEqual([52, 102, 122]);
        unmount();
    });

    it('neither serializes the document nor schedules a write for 100 selection moves', async () => {
        const { service } = serviceOf();
        const { handle, advance, unmount } = mount({ service, blocks: [para('abcdef')] });
        const status = handle().getSaveStatus();
        vi.mocked(encodeTree).mockClear();
        for (let move = 0; move < 100; move += 1) {
            act(() => setSelection(handle(), { text: 'abcdef', from: move % 6, to: (move % 6) + 1 }));
        }

        expect(encodeTree).not.toHaveBeenCalled();
        advance(10_000);
        await settle();
        expect(service.save).not.toHaveBeenCalled();
        expect(handle().getSaveStatus()).toBe(status);
        unmount();
    });

    it('builds each write from the ID source, the snapshot, the acknowledged revision and the writer', async () => {
        const { service, calls } = serviceOf();
        const { handle, type, advance, unmount } = mount({ service });
        type('x');
        const first = handle().getSnapshot();
        advance(500);
        await settle();
        type('y');
        const second = handle().getSnapshot();
        advance(500);
        await settle();

        const firstId = calls[0]?.request.operationId;
        const secondId = calls[1]?.request.operationId;
        expect(firstId).toMatch(/^id-/);
        expect(secondId).toMatch(/^id-/);
        expect(firstId).not.toBe(secondId);
        expect(calls.map(({ request }) => ({ ...request, operationId: 'id' }))).toEqual([
            {
                operationId: 'id',
                stamp: first.stamp,
                baseRevision: null,
                document: first.document,
                writer: WRITER,
            },
            {
                operationId: 'id',
                stamp: second.stamp,
                baseRevision: 'revision-1',
                document: second.document,
                writer: WRITER,
            },
        ]);
        unmount();
    });

    it.each([
        ['another operation ID', (request: SaveRequest) => ({ ...request, operationId: 'operation-99' })],
        ['another generation', (request: SaveRequest) => ({ ...request, stamp: { ...request.stamp, generation: 1 } })],
        [
            'a sequence one higher',
            (request: SaveRequest) => ({
                ...request,
                stamp: { ...request.stamp, sequence: request.stamp.sequence + 1 },
            }),
        ],
        [
            'another session ID',
            (request: SaveRequest) => ({ ...request, stamp: { ...request.stamp, sessionId: 'other' } }),
        ],
        [
            'another document ID',
            (request: SaveRequest) => ({ ...request, stamp: { ...request.stamp, documentId: 'document-2' } }),
        ],
    ])('ignores an acknowledgment with %s and warns persistence.ack-mismatch', async (_name, change) => {
        const { service, calls } = serviceOf(true);
        const { handle, diagnostics, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        const [call] = calls;
        if (call === undefined) {
            throw new Error('no write');
        }

        const other = change(call.request);
        call.answer({
            status: 'saved',
            acknowledgment: { operationId: other.operationId, stamp: other.stamp, revision: 'revision-1' },
        });
        await settle();

        expect(diagnostics.map(({ code, severity }) => [code, severity])).toEqual([
            ['persistence.ack-mismatch', 'warning'],
        ]);
        expect(handle().getSaveStatus()).toMatchObject({
            state: 'saving',
            acknowledgedSequence: -1,
            revision: null,
            inFlightOperationId: call.request.operationId,
        });
        unmount();
    });

    it('stays dirty after an older acknowledgment and bases the next write on its revision (trace 15.7)', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        type('y');
        calls[0]?.answer();
        await settle();
        expect(handle().getSaveStatus()).toMatchObject({
            state: 'dirty',
            latestSequence: 2,
            acknowledgedSequence: 1,
            revision: 'revision-1',
        });

        advance(500);
        expect(calls[1]?.request).toMatchObject({ baseRevision: 'revision-1', stamp: { sequence: 2 } });
        calls[1]?.answer();
        await settle();
        expect(handle().getSaveStatus()).toMatchObject({
            state: 'clean',
            latestSequence: 2,
            acknowledgedSequence: 2,
            revision: 'revision-2',
        });
        unmount();
    });

    it.each(['a rejected promise', 'a timeout'])(
        'replays the same request after %s, writer included',
        async (cause) => {
            const { service, calls } = serviceOf(true);
            const { handle, type, advance, unmount } = mount({ service });
            type('x');
            advance(500);
            if (cause === 'a timeout') {
                advance(30_000);
                expect(calls[0]?.context.signal.aborted).toBe(true);
            } else {
                calls[0]?.fail();
            }

            await settle();
            expect(handle().getSaveStatus().state).toBe('uncertain');

            advance(1200);
            const [first, replayed] = calls.map(({ request }) => request);
            expect(calls).toHaveLength(2);
            expect(replayed).toEqual(first);
            expect(replayed?.writer).toEqual(WRITER);
            unmount();
        },
    );

    it('sends only replays while uncertain, then the newer snapshot once the replay is answered', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        calls[0]?.fail();
        await settle();
        for (let round = 0; round < 3; round += 1) {
            type('y');
            advance(10_000);
            calls.at(-1)?.fail();
            await settle();
        }

        const first = calls[0]?.request.operationId;
        expect(calls.map(({ request }) => request.operationId)).toEqual(calls.map(() => first));

        advance(20_000);
        // Every replay carries the stamp and document of the first try, not the newer edits.
        for (const call of calls) {
            expect(call.request).toEqual(calls[0]?.request);
        }

        calls.at(-1)?.answer();
        await settle();
        advance(500);
        expect(calls.at(-1)?.request.operationId).not.toBe(first);
        expect(textOf(calls.at(-1)?.request as SaveRequest)).toBe('xyyyab');
        expect(handle().getSaveStatus().state).toBe('saving');
        unmount();
    });

    it('replays the unresolved write unchanged on the online event, ahead of newer edits', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        const onLine = vi.spyOn(navigator, 'onLine', 'get');
        onLine.mockReturnValue(false);
        calls[0]?.fail();
        await settle();
        expect(handle().getSaveStatus().state).toBe('offline');
        type('y');
        advance(10_000);
        expect(calls).toHaveLength(1);

        onLine.mockReturnValue(true);
        act(() => {
            window.dispatchEvent(new Event('online'));
        });
        onLine.mockRestore();
        expect(calls).toHaveLength(2);
        const [first, replayed] = calls.map(({ request }) => request);
        expect(replayed).toEqual(first);
        unmount();
    });

    it('replays after about 1, 2, 4, 8 and 16 seconds, then reports retries-exhausted', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, diagnostics, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        const failedAt: number[] = [];
        for (let attempt = 0; attempt < 6; attempt += 1) {
            failedAt.push(Date.now());
            calls.at(-1)?.fail();
            await settle();
            advance(20_000);
        }

        const delays = calls.slice(1).map(({ at }, index) => at - (failedAt[index] ?? 0));
        for (const [index, delay] of delays.entries()) {
            const expected = 1000 * 2 ** index;
            expect(delay).toBeGreaterThanOrEqual(expected * 0.8);
            expect(delay).toBeLessThanOrEqual(expected * 1.2);
        }

        expect(delays).toHaveLength(5);
        expect(new Set(calls.map(({ request }) => request.operationId)).size).toBe(1);
        expect(handle().getSaveStatus()).toMatchObject({
            state: 'error',
            diagnostic: { code: 'persistence.retries-exhausted' },
        });
        expect(diagnostics.map(({ code }) => code)).toEqual(['persistence.retries-exhausted']);
        unmount();
    });

    it('replays the kept operation unchanged on the next requestCommit after retries ran out', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, advance, unmount } = mount({
            service,
            persistenceOptions: { maxRetries: 0 },
        });
        type('x');
        advance(500);
        calls[0]?.fail();
        await settle();
        advance(60_000);
        expect(handle().getSaveStatus().state).toBe('error');
        expect(calls).toHaveLength(1);

        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        const [first, replayed] = calls.map(({ request }) => request);
        expect(calls).toHaveLength(2);
        expect(replayed).toEqual(first);
        calls[1]?.answer();
        await settle();
        const operationId = first?.operationId;
        const stamp = first?.stamp;
        expect(await result).toEqual({
            status: 'acknowledged',
            acknowledgment: {
                operationId,
                stamp,
                revision: 'revision-1',
            },
        });
        expect(handle().getSaveStatus().state).toBe('clean');
        unmount();
    });

    it('replays a failed checkpoint unchanged on a second requestCommit with no edit', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, unmount } = mount({ service, persistenceOptions: { maxRetries: 0 } });
        type('x');
        const first = handle().requestCommit({ reason: 'manual' });
        await flush();
        calls[0]?.fail();
        expect(await first).toEqual({ status: 'failed', code: 'transport', outcome: 'unknown' });
        expect(handle().getSaveStatus().state).toBe('error');

        const second = handle().requestCommit({ reason: 'manual' });
        await flush();
        const [sent, replayed] = calls.map(({ request }) => request);
        expect(calls).toHaveLength(2);
        expect(replayed).toEqual(sent);
        calls[1]?.answer();
        expect(await second).toMatchObject({
            status: 'acknowledged',
            acknowledgment: { operationId: calls[0]?.request.operationId },
        });
        unmount();
    });

    it('replays the kept operation for a requestCommit that joins a checkpoint an earlier call timed out on', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, advance, unmount } = mount({
            service,
            persistenceOptions: { maxRetries: 0 },
        });
        type('x');
        advance(500);
        type('y');
        const first = handle().requestCommit({ reason: 'manual' });
        await flush();
        calls[0]?.fail();
        await settle();
        advance(30_000);
        expect(await first).toEqual({ status: 'failed', code: 'timeout', outcome: 'not-sent' });

        const second = handle().requestCommit({ reason: 'manual' });
        await flush();
        const [sent, replayed] = calls.map(({ request }) => request);
        expect(calls).toHaveLength(2);
        expect(replayed).toEqual(sent);
        calls[1]?.answer();
        await settle();
        expect(textOf(calls[2]?.request as SaveRequest)).toBe('xyab');
        calls[2]?.answer();
        expect(await second).toMatchObject({
            status: 'acknowledged',
            acknowledgment: { operationId: calls[2]?.request.operationId },
        });
        unmount();
    });

    it('gives equal seeds equal backoff delays and different seeds different ones', async () => {
        const delaysFor = async (seed: number) => {
            const random = vi.spyOn(Math, 'random').mockImplementation(seededRandom(seed));
            const { service, calls } = serviceOf(true);
            const { type, advance, unmount } = mount({ service });
            type('x');
            advance(500);
            const failedAt: number[] = [];
            for (let attempt = 0; attempt < 5; attempt += 1) {
                failedAt.push(Date.now());
                calls.at(-1)?.fail();
                await settle();
                advance(20_000);
            }

            unmount();
            random.mockRestore();

            return calls.slice(1).map(({ at }, index) => at - (failedAt[index] ?? 0));
        };

        const seven = await delaysFor(7);
        expect(await delaysFor(7)).toEqual(seven);
        expect(await delaysFor(8)).not.toEqual(seven);
        expect(seven.some((delay, index) => delay !== 1000 * 2 ** index)).toBe(true);
    });

    it('reports the operation ID in flight, and null before and after', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, type, advance, unmount } = mount({ service });
        type('x');
        expect(handle().getSaveStatus().inFlightOperationId).toBeNull();
        advance(500);
        expect(handle().getSaveStatus()).toMatchObject({
            state: 'saving',
            inFlightOperationId: calls[0]?.request.operationId,
        });
        calls[0]?.answer();
        await settle();
        expect(handle().getSaveStatus()).toMatchObject({ state: 'clean', inFlightOperationId: null });
        unmount();
    });

    it('reports no operation ID in flight during the backoff of an uncertain write', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        calls[0]?.fail();
        await settle();
        expect(handle().getSaveStatus()).toMatchObject({ state: 'uncertain', inFlightOperationId: null });
        advance(1200);
        expect(handle().getSaveStatus()).toMatchObject({
            state: 'saving',
            inFlightOperationId: calls[0]?.request.operationId,
        });
        unmount();
    });
});
