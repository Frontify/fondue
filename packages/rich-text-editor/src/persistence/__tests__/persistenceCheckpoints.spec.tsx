/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { type CommitResult, type EditorHandle, type SaveRequest } from '#/index';
import { SETTLE_MS } from '#/runtime/dom/settle';
import { typeText } from '#/testing';

import {
    WRITER,
    textOf,
    serviceOf,
    settle,
    peek,
    mount,
    viewOf,
    compose,
    installPersistenceHooks,
} from './fixtures/mounted';

installPersistenceHooks();

/** Ends the composition, then runs the microtask and the timer after which input has settled. */
const endComposition = async (handle: EditorHandle<object>) => {
    act(() => {
        viewOf(handle).dom.dispatchEvent(new CompositionEvent('compositionend'));
    });
    await act(async () => {
        await vi.advanceTimersByTimeAsync(0);
    });
    act(() => {
        vi.advanceTimersByTime(SETTLE_MS);
    });
};

describe('commit checkpoints', () => {
    it('pins the snapshot with the keystroke typed in the same task', async () => {
        const { service, calls } = serviceOf();
        const { handle, flush, unmount } = mount({ service });
        let result: Promise<CommitResult> | undefined;
        act(() => {
            // ProseMirror reads a typed character in a microtask queued at the DOM mutation, before the call.
            queueMicrotask(() => typeText(handle(), 'x'));
            result = handle().requestCommit({ reason: 'submit' });
        });
        await flush();
        await settle();
        const snapshot = handle().getSnapshot();
        expect(calls[0]?.request.operationId).toMatch(/^id-/);
        expect(calls.map(({ request }) => ({ ...request, operationId: 'id' }))).toEqual([
            {
                operationId: 'id',
                stamp: snapshot.stamp,
                baseRevision: null,
                document: snapshot.document,
                writer: WRITER,
            },
        ]);
        expect(textOf(calls[0]?.request as SaveRequest)).toBe('xab');
        expect(await result).toMatchObject({ status: 'acknowledged', acknowledgment: { stamp: snapshot.stamp } });
        unmount();
    });

    it('writes the pinned payload unchanged while later edits come due for autosave', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, advance, unmount } = mount({ service });
        type('x');
        const pinned = handle().getSnapshot();
        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        type('y');
        advance(10_000);
        await settle();
        expect(calls.map(({ request }) => [request.stamp, request.document])).toEqual([
            [pinned.stamp, pinned.document],
        ]);

        calls[0]?.answer();
        await settle();
        expect(calls.map(({ request }) => textOf(request))).toEqual(['xab', 'xyab']);
        expect(await result).toMatchObject({ status: 'acknowledged', acknowledgment: { stamp: pinned.stamp } });
        unmount();
    });

    it('keeps a checkpoint pending when the autosave in flight carries an older stamp', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        type('y');
        const pinned = handle().getSnapshot();
        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        expect(calls).toHaveLength(1);
        calls[0]?.answer();
        await settle();
        expect(await peek(result)).toBe('pending');
        expect(calls).toHaveLength(2);
        expect(textOf(calls[1]?.request as SaveRequest)).toBe('xyab');
        calls[1]?.answer();
        expect(await result).toMatchObject({ status: 'acknowledged', acknowledgment: { stamp: pinned.stamp } });
        unmount();
    });

    it('joins the autosave in flight when it carries the same stamp', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        expect(await peek(result)).toBe('pending');
        calls[0]?.answer();
        expect(await result).toMatchObject({
            status: 'acknowledged',
            acknowledgment: { stamp: calls[0]?.request.stamp },
        });
        await settle();
        expect(calls).toHaveLength(1);
        unmount();
    });

    it('writes pinned checkpoints in call order before the trailing autosave', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, advance, unmount } = mount({ service });
        const pinned = [];
        const results = [];
        type('x');
        pinned.push(handle().getSnapshot());
        results.push(handle().requestCommit({ reason: 'manual' }));
        await flush();
        type('y');
        pinned.push(handle().getSnapshot());
        results.push(handle().requestCommit({ reason: 'manual' }));
        await flush();
        type('z');
        advance(10_000);
        for (let call = 0; call < 3; call += 1) {
            calls[call]?.answer();
            await settle();
        }

        expect(calls.map(({ request }) => textOf(request))).toEqual(['xab', 'xyab', 'xyzab']);
        expect(calls.slice(0, 2).map(({ request }) => [request.stamp, request.document])).toEqual(
            pinned.map(({ stamp, document }) => [stamp, document]),
        );
        const settled = await Promise.all(results);
        expect(settled.map(({ status }) => status)).toEqual(['acknowledged', 'acknowledged']);
        unmount();
    });

    it('resolves acknowledged with the acknowledgment of the pinned stamp after later edits', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, unmount } = mount({ service });
        type('x');
        const pinned = handle().getSnapshot();
        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        type('y');
        calls[0]?.answer();
        expect(await result).toEqual({
            status: 'acknowledged',
            acknowledgment: { operationId: calls[0]?.request.operationId, stamp: pinned.stamp, revision: 'revision-1' },
        });
        expect(handle().getSaveStatus()).toMatchObject({ latestSequence: 2, acknowledgedSequence: 1 });
        unmount();
    });

    it('answers an acknowledged sequence with no write, right after load and after one accepted save', async () => {
        const existing = serviceOf();
        const atLoad = mount({ service: existing.service, revision: 'revision-7' });
        const atLoadResult = atLoad.handle().requestCommit({ reason: 'manual' });
        await atLoad.flush();
        expect(await atLoadResult).toEqual({
            status: 'acknowledged',
            acknowledgment: { operationId: null, stamp: atLoad.handle().getSnapshot().stamp, revision: 'revision-7' },
        });
        expect(existing.service.save).not.toHaveBeenCalled();
        atLoad.unmount();
        const { service, calls } = serviceOf();
        const { handle, flush, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        await settle();
        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        expect(await result).toEqual({
            status: 'acknowledged',
            acknowledgment: {
                operationId: calls[0]?.request.operationId,
                stamp: handle().getSnapshot().stamp,
                revision: 'revision-1',
            },
        });
        expect(calls).toHaveLength(1);
        unmount();
    });

    it('writes the new stamp after one accepted save and a later keystroke, without answering early', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        calls[0]?.answer();
        await settle();
        type('y');
        const pinned = handle().getSnapshot();
        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        expect(await peek(result)).toBe('pending');
        expect(calls).toHaveLength(2);
        expect(calls[1]?.request).toMatchObject({ stamp: pinned.stamp });
        expect(textOf(calls[1]?.request as SaveRequest)).toBe('xyab');
        calls[1]?.answer();
        expect(await result).toMatchObject({ status: 'acknowledged', acknowledgment: { stamp: pinned.stamp } });
        unmount();
    });

    it('shares one write and one result between two calls that pin the same stamp', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, unmount } = mount({ service });
        type('x');
        const first = handle().requestCommit({ reason: 'manual' });
        const second = handle().requestCommit({ reason: 'submit' });
        await flush();
        calls[0]?.answer();
        const results = await Promise.all([first, second]);
        expect(results[1]).toEqual(results[0]);
        expect(results[0]).toMatchObject({ status: 'acknowledged' });
        expect(service.save).toHaveBeenCalledTimes(1);
        unmount();
    });

    it('captures the snapshot once a composition ends within timeoutMs', async () => {
        const { service, calls } = serviceOf();
        const { handle, advance, unmount } = mount({ service });
        compose(handle(), 'c');
        const result = handle().requestCommit({ reason: 'manual', composition: 'wait', timeoutMs: 1000 });
        advance(500);
        expect(await peek(result)).toBe('pending');
        expect(calls).toHaveLength(0);

        await endComposition(handle());
        await settle();
        expect(calls.map(({ request }) => textOf(request))).toEqual(['cab']);
        expect(await result).toMatchObject({
            status: 'acknowledged',
            acknowledgment: { stamp: handle().getSnapshot().stamp },
        });
        unmount();
    });

    it('resolves failed with timeout and not-sent when the composition outlasts timeoutMs', async () => {
        const { service } = serviceOf();
        const { handle, advance, unmount } = mount({ service });
        compose(handle(), 'c');
        const result = handle().requestCommit({ reason: 'manual', composition: 'wait', timeoutMs: 1000 });
        advance(999);
        expect(await peek(result)).toBe('pending');
        advance(1);
        expect(await peek(result)).toEqual({ status: 'failed', code: 'timeout', outcome: 'not-sent' });
        expect(service.save).not.toHaveBeenCalled();
        // A call that timed out must not capture when the composition ends later.
        await endComposition(handle());
        await settle();
        expect(service.save).not.toHaveBeenCalled();
        unmount();
    });

    it('blocks with composition-active during a composition when asked to reject', async () => {
        const { service } = serviceOf();
        const { handle, unmount } = mount({ service });
        compose(handle(), 'c');
        expect(await peek(handle().requestCommit({ reason: 'manual', composition: 'reject' }))).toEqual({
            status: 'blocked',
            code: 'composition-active',
        });
        await endComposition(handle());
        await settle();
        expect(service.save).not.toHaveBeenCalled();
        unmount();
    });

    it.each([
        ['conflict', { status: 'conflict', currentRevision: 'revision-9' }, { status: 'blocked', code: 'conflict' }],
        [
            'forbidden',
            { status: 'rejected', code: 'forbidden', diagnostics: [] },
            { status: 'blocked', code: 'forbidden' },
        ],
        [
            'invalid',
            { status: 'rejected', code: 'invalid', diagnostics: [] },
            { status: 'failed', code: 'invalid', outcome: 'rejected' },
        ],
        [
            'incompatible-writer',
            { status: 'rejected', code: 'incompatible-writer', diagnostics: [] },
            { status: 'failed', code: 'incompatible-writer', outcome: 'rejected' },
        ],
    ] as const)(
        'resolves the checkpoint of a %s answer with its matching result',
        async (_name, response, expected) => {
            const { service, calls } = serviceOf(true);
            const { handle, flush, type, unmount } = mount({ service });
            type('x');
            const result = handle().requestCommit({ reason: 'manual' });
            await flush();
            calls[0]?.answer(response);
            expect(await result).toEqual(expected);
            // A settled checkpoint must leave the queue, or it would be written again.
            await settle();
            expect(calls).toHaveLength(1);
            unmount();
        },
    );

    it('resolves every pinned checkpoint blocked with conflict on one conflict answer', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, unmount } = mount({ service });
        type('x');
        const first = handle().requestCommit({ reason: 'manual' });
        await flush();
        type('y');
        const second = handle().requestCommit({ reason: 'manual' });
        await flush();
        calls[0]?.answer({ status: 'conflict', currentRevision: 'revision-9' });
        await settle();
        expect(await peek(first)).toEqual({ status: 'blocked', code: 'conflict' });
        expect(await peek(second)).toEqual({ status: 'blocked', code: 'conflict' });
        expect(calls).toHaveLength(1);
        unmount();
    });

    it('writes the second pinned checkpoint after the first is rejected', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, unmount } = mount({ service });
        type('x');
        const first = handle().requestCommit({ reason: 'manual' });
        await flush();
        type('y');
        const pinned = handle().getSnapshot();
        const second = handle().requestCommit({ reason: 'manual' });
        await flush();
        calls[0]?.answer({ status: 'rejected', code: 'invalid', diagnostics: [] });
        await settle();
        expect(await peek(first)).toEqual({ status: 'failed', code: 'invalid', outcome: 'rejected' });
        expect(calls).toHaveLength(2);
        expect(calls[1]?.request).toMatchObject({ stamp: pinned.stamp, document: pinned.document });
        expect(textOf(calls[1]?.request as SaveRequest)).toBe('xyab');
        calls[1]?.answer();
        expect(await second).toMatchObject({ status: 'acknowledged', acknowledgment: { stamp: pinned.stamp } });
        unmount();
    });

    it('resolves failed with timeout and unknown at timeoutMs and keeps replaying', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, advance, unmount } = mount({ service });
        type('x');
        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        advance(29_999);
        expect(await peek(result)).toBe('pending');
        advance(1);
        expect(await peek(result)).toEqual({ status: 'failed', code: 'timeout', outcome: 'unknown' });
        expect(handle().getSaveStatus().state).toBe('uncertain');
        advance(1200);
        const [first, replayed] = calls.map(({ request }) => request);
        expect(calls).toHaveLength(2);
        expect(replayed).toEqual(first);
        unmount();
    });

    it('waits for a composition up to the persistenceOptions timeoutMs', async () => {
        const { service } = serviceOf();
        const { handle, advance, unmount } = mount({ service, persistenceOptions: { timeoutMs: 5000 } });
        compose(handle(), 'c');
        const result = handle().requestCommit({ reason: 'manual' });
        advance(4999);
        expect(await peek(result)).toBe('pending');
        advance(1);
        expect(await peek(result)).toEqual({ status: 'failed', code: 'timeout', outcome: 'not-sent' });
        unmount();
    });

    it('times the write out at the persistenceOptions timeoutMs', async () => {
        const { service } = serviceOf(true);
        const { handle, flush, type, advance, unmount } = mount({
            service,
            persistenceOptions: { timeoutMs: 5000 },
        });
        type('x');
        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        advance(4999);
        expect(await peek(result)).toBe('pending');
        advance(1);
        expect(await peek(result)).toEqual({ status: 'failed', code: 'timeout', outcome: 'unknown' });
        expect(handle().getSaveStatus().state).toBe('uncertain');
        unmount();
    });

    it('blocks with not-ready while mounting and after dispose, with no write', async () => {
        const { service } = serviceOf();
        const { handle, unmount } = mount({ service, mounting: true });
        expect(handle().getSummary().phase).toBe('mounting');
        expect(await peek(handle().requestCommit({ reason: 'manual' }))).toEqual({
            status: 'blocked',
            code: 'not-ready',
        });
        act(() => {
            vi.advanceTimersToNextFrame();
        });
        act(() => typeText(handle(), 'x'));
        act(() => handle().dispose());
        expect(await peek(handle().requestCommit({ reason: 'manual' }))).toEqual({
            status: 'blocked',
            code: 'not-ready',
        });
        await settle();
        expect(service.save).not.toHaveBeenCalled();
        unmount();
    });

    it('resolves failed with transport and unknown when the write fails online, and keeps replaying', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, advance, unmount } = mount({ service });
        type('x');
        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        calls[0]?.fail();
        expect(await peek(result)).toEqual({ status: 'failed', code: 'transport', outcome: 'unknown' });
        advance(1200);
        const [first, replayed] = calls.map(({ request }) => request);
        expect(calls).toHaveLength(2);
        expect(replayed).toEqual(first);
        unmount();
    });

    it('holds a checkpoint behind the backoff, replays the failed write once, then writes the checkpoint', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        calls[0]?.fail();
        await settle();
        type('y');
        const pinned = handle().getSnapshot();
        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        expect(calls).toHaveLength(1);
        advance(1200);
        await settle();
        expect(calls).toHaveLength(2);
        const [first, replayed] = calls.map(({ request }) => request);
        expect(replayed).toEqual(first);
        calls[1]?.answer();
        await settle();
        expect(calls).toHaveLength(3);
        expect(calls[2]?.request).toMatchObject({ stamp: pinned.stamp });
        expect(textOf(calls[2]?.request as SaveRequest)).toBe('xyab');
        calls[2]?.answer();
        expect(await result).toMatchObject({ status: 'acknowledged', acknowledgment: { stamp: pinned.stamp } });
        unmount();
    });

    it('resolves failed with transport and not-sent offline, then writes the pinned snapshot online', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, unmount } = mount({ service });
        const onLine = vi.spyOn(navigator, 'onLine', 'get');
        onLine.mockReturnValue(false);
        type('x');
        const pinned = handle().getSnapshot();
        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        expect(await peek(result)).toEqual({ status: 'failed', code: 'transport', outcome: 'not-sent' });
        expect(calls).toHaveLength(0);
        type('y');

        onLine.mockReturnValue(true);
        act(() => {
            window.dispatchEvent(new Event('online'));
        });
        onLine.mockRestore();
        expect(calls.map(({ request }) => [request.stamp, request.document])).toEqual([
            [pinned.stamp, pinned.document],
        ]);
        unmount();
    });

    it('answers an offline requestCommit at once on a checkpoint an earlier call timed out on', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        type('y');
        const first = handle().requestCommit({ reason: 'manual', timeoutMs: 1000 });
        await flush();
        advance(1000);
        expect(await first).toEqual({ status: 'failed', code: 'timeout', outcome: 'not-sent' });
        const onLine = vi.spyOn(navigator, 'onLine', 'get');
        onLine.mockReturnValue(false);
        calls[0]?.fail();
        await settle();

        const second = handle().requestCommit({ reason: 'manual' });
        await flush();
        const outcome = await peek(second);
        onLine.mockRestore();
        expect(outcome).toEqual({ status: 'failed', code: 'transport', outcome: 'not-sent' });
        expect(calls).toHaveLength(1);
        unmount();
    });

    it('resolves unknown offline for the stamp of a sent write left unresolved', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        const onLine = vi.spyOn(navigator, 'onLine', 'get');
        onLine.mockReturnValue(false);
        calls[0]?.fail();
        await settle();
        expect(handle().getSaveStatus().state).toBe('offline');

        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        const outcome = await peek(result);
        onLine.mockRestore();
        expect(outcome).toEqual({ status: 'failed', code: 'transport', outcome: 'unknown' });
        expect(calls).toHaveLength(1);
        unmount();
    });

    it('resolves not-sent offline for a newer stamp than the write left unresolved', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        const onLine = vi.spyOn(navigator, 'onLine', 'get');
        onLine.mockReturnValue(false);
        calls[0]?.fail();
        await settle();
        type('y');
        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        const outcome = await peek(result);
        onLine.mockRestore();
        expect(outcome).toEqual({ status: 'failed', code: 'transport', outcome: 'not-sent' });
        expect(calls).toHaveLength(1);
        unmount();
    });

    it('resolves with the write timeout when it fires before the call timeoutMs', async () => {
        const { service } = serviceOf(true);
        const { handle, flush, type, advance, unmount } = mount({ service });
        type('x');
        const result = handle().requestCommit({ reason: 'manual', timeoutMs: 60_000 });
        await flush();
        advance(30_000);
        expect(await peek(result)).toEqual({ status: 'failed', code: 'timeout', outcome: 'unknown' });
        unmount();
    });

    it.each(['submit', 'navigate'] as const)(
        'captures, writes and resolves the same with reason %s as with manual',
        async (reason) => {
            const trace = async (given: 'submit' | 'navigate' | 'manual') => {
                const { service, calls } = serviceOf();
                const { handle, flush, type, unmount } = mount({ service });
                type('x');
                const pending = handle().requestCommit({ reason: given });
                await flush();
                const result = await pending;
                unmount();

                return { requests: calls.map(({ request }) => request), result };
            };

            const manual = await trace('manual');
            expect(manual.requests).toHaveLength(1);
            expect(await trace(reason)).toEqual(manual);
        },
    );

    it.each(['submit', 'navigate'] as const)(
        'waits through a composition and pins a same-task keystroke the same with reason %s as with manual',
        async (reason) => {
            const trace = async (given: 'submit' | 'navigate' | 'manual') => {
                const { service, calls } = serviceOf();
                const { handle, advance, unmount } = mount({ service });
                compose(handle(), 'c');
                let pending: Promise<CommitResult> | undefined;
                act(() => {
                    queueMicrotask(() => typeText(handle(), 'x'));
                    pending = handle().requestCommit({ reason: given });
                });
                advance(100);
                const during = await peek(pending as Promise<CommitResult>);
                await endComposition(handle());
                await settle();
                const result = await pending;
                unmount();

                return { during, requests: calls.map(({ request }) => request), result };
            };

            const manual = await trace('manual');
            expect(manual.during).toBe('pending');
            expect(manual.requests).toHaveLength(1);
            expect(manual.result).toMatchObject({ status: 'acknowledged' });
            expect(await trace(reason)).toEqual(manual);
        },
    );

    it.each(['ends', 'outlasts the timeout'])(
        'waits for a composition that %s with the default options',
        async (ending) => {
            const { service, calls } = serviceOf();
            const { handle, advance, unmount } = mount({ service });
            compose(handle(), 'c');
            const result = handle().requestCommit({ reason: 'manual' });
            advance(29_000);
            expect(await peek(result)).toBe('pending');
            if (ending === 'ends') {
                await endComposition(handle());
                await settle();
                expect(calls.map(({ request }) => textOf(request))).toEqual(['cab']);
                expect(await result).toMatchObject({ status: 'acknowledged' });
            } else {
                advance(999);
                expect(await peek(result)).toBe('pending');
                advance(1);
                expect(await peek(result)).toEqual({ status: 'failed', code: 'timeout', outcome: 'not-sent' });
                expect(calls).toHaveLength(0);
                // A call that timed out must not capture when the composition ends later.
                await endComposition(handle());
                await settle();
                expect(calls).toHaveLength(0);
            }

            unmount();
        },
    );
});
