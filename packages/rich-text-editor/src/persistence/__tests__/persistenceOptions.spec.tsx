/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { serviceOf, settle, mount, installPersistenceHooks } from './fixtures/mounted';

installPersistenceHooks();

describe('persistence options', () => {
    it('follows delayMs, maxWaitMs, timeoutMs and maxRetries', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, diagnostics, type, advance, unmount } = mount({
            service,
            persistenceOptions: { delayMs: 100, maxWaitMs: 300, timeoutMs: 2000, maxRetries: 2 },
        });
        const start = Date.now();
        type('x');
        advance(99);
        expect(calls).toHaveLength(0);
        advance(1);
        expect(calls.map(({ at }) => at - start)).toEqual([100]);
        calls[0]?.answer();
        await settle();

        // Typing every 50 ms keeps resetting the delay, so only the longest wait writes.
        const typing = Date.now();
        for (let character = 0; character < 6; character += 1) {
            type('y');
            advance(50);
        }
        expect(calls.map(({ at }) => at - typing).slice(1)).toEqual([300]);
        advance(1999);
        expect(calls[1]?.context.signal.aborted).toBe(false);
        advance(1);
        expect(calls[1]?.context.signal.aborted).toBe(true);
        await settle();

        // Two replays, then no more.
        advance(1200);
        calls[2]?.fail();
        await settle();
        advance(2400);
        calls[3]?.fail();
        await settle();
        advance(60_000);
        expect(calls).toHaveLength(4);
        expect(new Set(calls.slice(1).map(({ request }) => request.operationId)).size).toBe(1);
        expect(handle().getSaveStatus()).toMatchObject({
            state: 'error',
            diagnostic: { code: 'persistence.retries-exhausted', details: { retries: 2 } },
        });
        expect(diagnostics.map(({ code }) => code)).toEqual(['persistence.retries-exhausted']);
        unmount();
    });

    it('writes nothing on its own with autosave off', async () => {
        const { service } = serviceOf();
        const { handle, type, advance, unmount } = mount({
            service,
            persistenceOptions: { autosave: 'off' },
        });
        type('x');
        advance(60_000);
        await settle();
        expect(service.save).not.toHaveBeenCalled();
        expect(handle().getSaveStatus().state).toBe('dirty');
        unmount();
    });
});
