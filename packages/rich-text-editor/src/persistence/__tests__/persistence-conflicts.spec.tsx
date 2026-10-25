/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it, vi } from 'vitest';

import { type PersistenceOptions } from '#/index';
import { type Diagnostic } from '#/model';

import { WRITER, para, loaded, serviceOf, settle, peek, mount, installPersistenceHooks } from './fixtures/mounted';

installPersistenceHooks();

describe('conflicts and rejections', () => {
    const conflicted = async (options: PersistenceOptions = {}) => {
        const services = serviceOf(true);
        const mounted = mount({ service: services.service, persistenceOptions: options });
        // The server holds a newer copy of the record.
        await services.server.save(
            {
                operationId: 'elsewhere-1',
                stamp: { documentId: 'document-1', sessionId: 'elsewhere', generation: 0, sequence: 1 },
                baseRevision: null,
                document: loaded(null, para('remote')).document,
                writer: WRITER,
            },
            { signal: new AbortController().signal, session: mounted.handle().getSummary().session },
        );
        mounted.type('x');
        mounted.advance(500);
        services.calls[0]?.answer();
        await settle();
        return { ...mounted, calls: services.calls, service: services.service };
    };

    it('pauses writes on a conflict and keeps local content editable', async () => {
        const { handle, calls, diagnostics, type, advance, unmount } = await conflicted();
        expect(handle().getSaveStatus()).toMatchObject({
            state: 'conflict',
            diagnostic: { code: 'persistence.conflict', details: { currentRevision: 'revision-1' } },
        });
        expect(diagnostics.map(({ code }) => code)).toEqual(['persistence.conflict']);

        type('y');
        advance(10_000);
        await settle();
        expect(calls).toHaveLength(1);
        expect(JSON.stringify(handle().getSnapshot().document)).toContain('xyab');
        unmount();
    });

    it('never retries against the server revision on its own', async () => {
        const { calls, type, advance, unmount } = await conflicted();
        type('y');
        advance(60_000);
        await settle();
        expect(calls.filter(({ request }) => request.baseRevision === 'revision-1')).toEqual([]);
        expect(calls).toHaveLength(1);
        unmount();
    });

    it('blocks requestCommit with conflict at once and sends no write', async () => {
        const { handle, calls, type, advance, unmount } = await conflicted();
        type('y');
        expect(await peek(handle().requestCommit({ reason: 'manual' }))).toEqual({
            status: 'blocked',
            code: 'conflict',
        });
        advance(60_000);
        await settle();
        expect(calls).toHaveLength(1);
        unmount();
    });

    it('hands one read of the server copy and the local snapshot to onConflict', async () => {
        const onConflict = vi.fn();
        const { service, handle, unmount } = await conflicted({ onConflict });
        await settle();
        expect(service.read).toHaveBeenCalledTimes(1);
        expect(service.read.mock.calls[0]?.[0]).toBe('document-1');
        expect(onConflict).toHaveBeenCalledTimes(1);
        const [remote, local] = onConflict.mock.calls[0] as [{ readonly revision: string }, unknown];
        expect(remote).toMatchObject({ documentId: 'document-1', revision: 'revision-1' });
        expect(JSON.stringify(remote)).toContain('remote');
        expect(local).toBe(handle().getSnapshot());
        expect(JSON.stringify(local)).toContain('xab');
        unmount();
    });

    it('hands null to onConflict when the read fails', async () => {
        const onConflict = vi.fn();
        const { service, calls } = serviceOf(true);
        service.read.mockRejectedValueOnce(new Error('The read failed.'));
        const { handle, type, advance, unmount } = mount({
            service,
            persistenceOptions: { onConflict },
        });
        type('x');
        advance(500);
        calls[0]?.answer({ status: 'conflict', currentRevision: 'revision-9' });
        await settle();
        expect(service.read).toHaveBeenCalledTimes(1);
        expect(onConflict).toHaveBeenCalledTimes(1);
        expect(onConflict).toHaveBeenCalledWith(null, handle().getSnapshot());
        unmount();
    });

    it.each(['forbidden', 'invalid', 'incompatible-writer'] as const)(
        'enters error with the service diagnostics on %s, with no retry',
        async (code) => {
            const { service, calls } = serviceOf(true);
            const { handle, diagnostics, type, advance, unmount } = mount({ service });
            const reported: Diagnostic = {
                code: 'format.invalid-structure',
                severity: 'error',
                messageKey: `server.${code}`,
            };
            const alsoReported: Diagnostic = { ...reported, messageKey: `server.${code}.detail` };
            type('x');
            advance(500);
            calls[0]?.answer({ status: 'rejected', code, diagnostics: [reported, alsoReported] });
            await settle();
            type('y');
            advance(60_000);
            await settle();

            expect(handle().getSaveStatus()).toMatchObject({ state: 'error', diagnostic: reported });
            expect(diagnostics).toEqual([reported, alsoReported]);
            expect(calls).toHaveLength(1);
            unmount();
        },
    );
});
