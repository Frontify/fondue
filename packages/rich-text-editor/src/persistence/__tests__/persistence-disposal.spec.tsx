/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { type CommitResult } from '#/index';

import { serviceOf, settle, peek, mount, compose, installPersistenceHooks } from './fixtures/mounted';

installPersistenceHooks();

describe('disposal', () => {
    it('aborts the signal of the write in flight on dispose', () => {
        const { service, calls } = serviceOf(true);
        const { handle, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        act(() => handle().dispose());
        expect(calls[0]?.context.signal.aborted).toBe(true);
        expect(handle().getSaveStatus().inFlightOperationId).toBeNull();
        unmount();
    });

    it('resolves a pending requestCommit failed with disposed on dispose', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, unmount } = mount({ service });
        type('x');
        const result = handle().requestCommit({ reason: 'navigate' });
        await flush();
        act(() => handle().dispose());
        expect(calls[0]?.context.signal.aborted).toBe(true);
        expect(await peek(result)).toEqual({ status: 'failed', code: 'disposed', outcome: 'unknown' });
        unmount();
    });

    it('resolves a requestCommit that waits for a composition failed with disposed on dispose', async () => {
        const { service } = serviceOf();
        const { handle, unmount } = mount({ service });
        compose(handle(), 'c');
        const result = handle().requestCommit({ reason: 'navigate' });
        expect(await peek(result)).toBe('pending');
        act(() => handle().dispose());
        expect(await peek(result)).toEqual({ status: 'failed', code: 'disposed', outcome: 'unknown' });
        expect(service.save).not.toHaveBeenCalled();
        unmount();
    });

    it('answers a requestCommit from a disposed-dirty listener disposed at once', async () => {
        const { service } = serviceOf();
        const { handle, type, unmount } = mount({ service });
        const results: Promise<CommitResult>[] = [];
        handle().subscribe('diagnostic', ({ code }) => {
            if (code === 'persistence.disposed-dirty') {
                results.push(handle().requestCommit({ reason: 'navigate' }));
            }
        });
        type('x');
        act(() => handle().dispose());
        expect(results).toHaveLength(1);
        expect(await peek(results[0] as Promise<CommitResult>)).toEqual({
            status: 'failed',
            code: 'disposed',
            outcome: 'unknown',
        });
        expect(service.save).not.toHaveBeenCalled();
        unmount();
    });

    it('warns persistence.disposed-dirty on dispose with unsaved changes and starts no write', async () => {
        const { service } = serviceOf();
        const { handle, diagnostics, type, advance, unmount } = mount({ service });
        type('x');
        act(() => handle().dispose());
        advance(10_000);
        await settle();
        expect(diagnostics.map(({ code, severity }) => [code, severity])).toEqual([
            ['persistence.disposed-dirty', 'warning'],
        ]);
        expect(service.save).not.toHaveBeenCalled();
        unmount();
    });
});
