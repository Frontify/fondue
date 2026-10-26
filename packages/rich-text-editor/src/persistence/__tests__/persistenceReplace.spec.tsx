/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { createPortalStore, type PortalEntry } from '#/bridge/nodeViews/helpers/portals';
import {
    type CommandResult,
    type EditorHandle,
    type PersistenceService,
    type RecoveryService,
    type ReplaceDocumentRequest,
    type ReplaceResult,
} from '#/index';
import { type RuntimeHandle, runtimeOf } from '#/runtime/runtime';
import { setSelection } from '#/testing';

import {
    para,
    chromeBlock,
    loaded,
    serviceOf,
    settle,
    peek,
    mount,
    replacing,
    textIn,
    replace,
    steps,
    installPersistenceHooks,
} from './fixtures/mounted';

vi.mock('#/bridge/nodeViews/helpers/portals', { spy: true });
const { createPortalStore: actualStore } = await vi.importActual<{
    createPortalStore: typeof createPortalStore;
}>('#/bridge/nodeViews/helpers/portals');

installPersistenceHooks();

/** The handle with the command IDs of any model, as the test model's are not the shipped ones. */
const untyped = (handle: EditorHandle<object>) => handle as unknown as RuntimeHandle;
/** Runs `history.undo` until it no longer applies, and returns how many steps it undid. */
const undoSteps = (handle: EditorHandle<object>) => {
    const results: CommandResult[] = [];
    do {
        act(() => {
            results.push(untyped(handle).execute('history.undo'));
        });
    } while (results.at(-1)?.status === 'applied');

    return results.length - 1;
};

describe('replacement', () => {
    it('answers an echo of the acknowledged record with the current session, keeping history, selection and save state', async () => {
        const { service } = serviceOf();
        const { handle, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        await settle();
        const { session, selection } = handle().getSummary();
        const status = handle().getSaveStatus();
        const { document, acknowledgedRevision } = handle().getSnapshot();

        const result = await replace(handle(), {
            next: { documentId: 'document-1', revision: acknowledgedRevision, document },
        });

        expect(result).toEqual({ status: 'replaced', session });
        expect(handle().getSummary()).toMatchObject({ session: { generation: 0 }, selection });
        expect(handle().getSaveStatus()).toBe(status);
        expect(undoSteps(handle())).toBe(1);
        unmount();
    });

    it.each(steps)(
        'stops at step $step with $code and leaves the session as it was',
        async ({ code, held = false, mounting = false, setup, during, saves = false, kept = false }) => {
            const { service, calls } = serviceOf(held);
            const editor = mount({ service, mounting });
            const { handle } = editor;
            let overrides: Partial<ReplaceDocumentRequest> = {};
            if (setup !== undefined) {
                overrides = await setup(editor, calls);
            }

            const record = () => ({
                phase: handle().getSummary().phase,
                document: handle().getSnapshot().document,
                selection: handle().getSummary().selection,
                state: runtimeOf(handle())?.state,
                status: handle().getSaveStatus(),
            });
            const before = record();

            const pending = handle().replaceDocument(replacing(handle(), overrides));
            await during?.(editor, calls);
            const result = await act(() => pending);

            expect(result).toEqual({ status: 'rejected', code });
            const after = record();
            expect(after.phase).toBe(before.phase);
            if (kept) {
                expect(textIn(after.document)).toBe('xyab');
            } else {
                expect(after.document).toEqual(before.document);
                expect(after.selection).toEqual(before.selection);
                expect(after.state).toBe(before.state);
            }

            if (!saves) {
                expect(after.status).toEqual(before.status);
            }

            editor.unmount();
        },
    );

    it('runs an intent enqueued during a step 5 save on the old session once that save is rejected', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, type, flush, unmount } = mount({ service });
        type('x');
        const replaced = handle().replaceDocument(replacing(handle(), { unsaved: { action: 'save' } }));
        await flush();
        const inserted = untyped(handle()).enqueue('text.insert', { text: 'y' });
        expect(await peek(inserted)).toBe('pending');

        calls[0]?.answer({ status: 'rejected', code: 'invalid', diagnostics: [] });

        expect(await act(() => replaced)).toEqual({ status: 'rejected', code: 'unsaved' });
        expect(await inserted).toMatchObject({ status: 'applied', contentChanged: true });
        expect(textIn(handle().getSnapshot().document)).toBe('xyab');
        unmount();
    });

    it('starts the next generation with the sequence of a load and empty history, and acknowledges it with no write', async () => {
        const { service } = serviceOf();
        const { handle, type, flush, unmount } = mount({ service });
        type('x');
        const { session, commitSequence } = handle().getSummary();

        const result = await replace(handle(), { unsaved: { action: 'discard', confirmed: true } });

        const next = { documentId: 'document-2', sessionId: session.sessionId, generation: 1 };
        expect(result).toEqual({ status: 'replaced', session: next });
        expect(handle().getSummary()).toMatchObject({ session: next, sequence: 0 });
        expect(handle().getSummary().commitSequence).toBeGreaterThan(commitSequence);
        expect(handle().getSaveStatus()).toEqual({
            state: 'clean',
            latestSequence: 0,
            acknowledgedSequence: 0,
            revision: 'revision-9',
            inFlightOperationId: null,
            diagnostic: null,
        });
        expect(untyped(handle()).query('history.undo').enabled).toBe(false);
        const committed = handle().requestCommit({ reason: 'manual' });
        await flush();
        expect(await committed).toEqual({
            status: 'acknowledged',
            acknowledgment: { operationId: null, stamp: { ...next, sequence: 0 }, revision: 'revision-9' },
        });
        expect(service.save).not.toHaveBeenCalled();
        unmount();
    });

    it('ignores a late save response and a late mention search from the old generation', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, type, advance, diagnostics, unmount } = mount({
            service,
            persistenceOptions: { timeoutMs: 1000 },
        });
        type('x');
        advance(500);
        // The first write times out, and its replay is saved, so the session is clean with the first still open.
        advance(1000);
        advance(2000);
        calls[1]?.answer();
        await settle();
        expect(handle().getSaveStatus().state).toBe('clean');
        let found: (result: unknown) => void = () => undefined;
        runtimeOf(handle())?.startAsync({
            key: 'mention-search',
            service: 'references',
            featureId: 'core',
            action: 'create',
            command: 'text.insert',
            run: () =>
                new Promise((resolve) => {
                    found = resolve;
                }),
        });
        await replace(handle());
        const status = handle().getSaveStatus();
        const { document } = handle().getSnapshot();

        found({ text: 'late ' });
        calls[0]?.answer({ status: 'conflict', currentRevision: 'revision-8' });
        await settle();

        expect(handle().getSaveStatus()).toBe(status);
        expect(handle().getSnapshot().document).toEqual(document);
        expect(diagnostics.map(({ code, details }) => [code, details])).toEqual([
            ['runtime.async-discarded', { reason: 'wrong-session' }],
        ]);
        unmount();
    });

    it('hands no conflict read of the old document to onConflict after a replacement', async () => {
        const onConflict = vi.fn();
        const { service, calls } = serviceOf(true);
        type Remote = Awaited<ReturnType<PersistenceService['read']>>;
        let release: (remote: Remote) => void = () => undefined;
        service.read.mockImplementationOnce(
            () =>
                new Promise<Remote>((resolve) => {
                    release = resolve;
                }),
        );
        const { handle, type, advance, unmount } = mount({ service, persistenceOptions: { onConflict } });
        type('x');
        advance(500);
        calls[0]?.answer({ status: 'conflict', currentRevision: 'revision-1' });
        await settle();
        expect(service.read).toHaveBeenCalledTimes(1);

        await replace(handle(), { unsaved: { action: 'discard', confirmed: true } });
        release(loaded('revision-1', para('remote')));
        await settle();

        expect(handle().getSummary().session.documentId).toBe('document-2');
        expect(onConflict).not.toHaveBeenCalled();
        unmount();
    });

    it('resolves intents queued during transitioning as wrong-session in the next generation', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, type, flush, unmount } = mount({ service });
        type('x');
        act(() => setSelection(handle(), { text: 'xab' }));
        const captured = handle().captureTarget({ purpose: 'format', onIntersectingEdit: 'map' });
        if (captured.status !== 'captured') {
            throw new Error('expected a target');
        }

        const replaced = handle().replaceDocument(replacing(handle(), { unsaved: { action: 'save' } }));
        await flush();
        const queued = [
            untyped(handle()).enqueue('mark.bold.toggle', undefined, { target: captured.target }),
            untyped(handle()).enqueue('text.insert', { text: 'y' }),
        ];

        calls[0]?.answer();

        expect(await act(() => replaced)).toMatchObject({ status: 'replaced' });
        expect(await Promise.all(queued)).toEqual([
            { status: 'rejected', code: 'wrong-session' },
            { status: 'rejected', code: 'wrong-session' },
        ]);
        expect(textIn(handle().getSnapshot().document)).toBe('next');
        unmount();
    });

    it('blocks requestCommit with not-ready while transitioning, pinning nothing', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, type, flush, unmount } = mount({ service });
        type('x');
        const replaced = handle().replaceDocument(replacing(handle(), { unsaved: { action: 'save' } }));
        expect(handle().getSummary().phase).toBe('transitioning');

        expect(await peek(handle().requestCommit({ reason: 'manual' }))).toEqual({
            status: 'blocked',
            code: 'not-ready',
        });
        await flush();
        calls[0]?.answer();
        await act(() => replaced);
        await settle();

        // The one write is the replacement's own `save`.
        expect(calls).toHaveLength(1);
        unmount();
    });

    it('accepts a checkpoint only with a receipt for the current stamp, with no save', async () => {
        const { service } = serviceOf();
        const { handle, type, unmount } = mount({ service });
        type('x');
        const older = handle().getSnapshot().stamp;
        type('y');
        const checkpoint = (stamp: typeof older) =>
            ({ action: 'checkpoint', receipt: { stamp, receiptId: 'receipt-1' } }) as const;

        expect(await replace(handle(), { unsaved: checkpoint(older) })).toEqual({
            status: 'rejected',
            code: 'checkpoint-invalid',
        });
        expect(await replace(handle(), { unsaved: checkpoint(handle().getSnapshot().stamp) })).toMatchObject({
            status: 'replaced',
        });
        await settle();
        expect(service.save).not.toHaveBeenCalled();
        unmount();
    });

    it('resolves faulted and leaves the phase faulted when a node view of the next document throws', async () => {
        vi.mocked(createPortalStore).mockImplementationOnce(() => {
            const store = actualStore();

            return {
                ...store,
                set: (entry: PortalEntry) => {
                    if (entry.state.attrs.language === 'boom') {
                        throw new Error('node view failed');
                    }

                    store.set(entry);
                },
            };
        });
        const { service } = serviceOf();
        const { handle, unmount } = mount({ service, blocks: [para('ab'), chromeBlock('b1')] });
        await act(async () => {
            await vi.advanceTimersByTimeAsync(0);
        });
        const replaced = vi.fn();
        handle().subscribe('replaced', replaced);
        const { document } = loaded('revision-9', para('next'), {
            ...chromeBlock('b2'),
            attrs: { nodeId: 'b2', language: 'boom', checked: false },
        });

        const result = await replace(handle(), {
            next: { documentId: 'document-2', revision: 'revision-9', document },
        });

        expect(result).toEqual({ status: 'rejected', code: 'faulted' });
        expect(handle().getSummary().phase).toBe('faulted');
        expect(replaced).not.toHaveBeenCalled();
        unmount();
    });

    it('shows the recovery shell with the old document after an install fault', async () => {
        vi.mocked(createPortalStore).mockImplementationOnce(() => {
            const store = actualStore();

            return {
                ...store,
                set: (entry: PortalEntry) => {
                    if (entry.state.attrs.language === 'boom') {
                        throw new Error('node view failed');
                    }

                    store.set(entry);
                },
            };
        });
        const { handle, type, unmount } = mount({
            service: serviceOf().service,
            blocks: [para('ab'), chromeBlock('b1')],
        });
        await act(async () => {
            await vi.advanceTimersByTimeAsync(0);
        });
        type('x');
        const next = loaded('revision-9', para('next'), {
            ...chromeBlock('b2'),
            attrs: { nodeId: 'b2', language: 'boom', checked: false },
        });

        await replace(handle(), {
            next: { documentId: 'document-2', revision: 'revision-9', document: next.document },
            unsaved: { action: 'discard', confirmed: true },
        });

        const shell = document.querySelector('[data-rte-shell="recovery"]');
        expect(shell?.textContent).toContain('xab');
        expect(shell?.textContent).not.toContain('next');
        expect(document.querySelector('[role="textbox"]')).toBeNull();
        unmount();
    });

    it('stores no recovery checkpoint when the next document faults the install', async () => {
        vi.mocked(createPortalStore).mockImplementationOnce(() => {
            const store = actualStore();

            return {
                ...store,
                set: (entry: PortalEntry) => {
                    if (entry.state.attrs.language === 'boom') {
                        throw new Error('node view failed');
                    }

                    store.set(entry);
                },
            };
        });
        const store = vi.fn((checkpoint: Parameters<RecoveryService['store']>[0]) =>
            Promise.resolve({ stamp: checkpoint.stamp, receiptId: 'receipt-1' }),
        );
        const { handle, unmount } = mount({
            service: serviceOf().service,
            recovery: { store },
            blocks: [para('ab'), chromeBlock('b1')],
        });
        await act(async () => {
            await vi.advanceTimersByTimeAsync(0);
        });
        const { document } = loaded('revision-9', para('next'), {
            ...chromeBlock('b2'),
            attrs: { nodeId: 'b2', language: 'boom', checked: false },
        });

        expect(
            await replace(handle(), { next: { documentId: 'document-2', revision: 'revision-9', document } }),
        ).toEqual({
            status: 'rejected',
            code: 'faulted',
        });
        await settle();

        expect(store).not.toHaveBeenCalled();
        unmount();
    });

    it('resolves an intent queued during transitioning as wrong-session when a held async result settles first', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, type, flush, unmount } = mount({ service });
        let found: (result: unknown) => void = () => undefined;
        const search = new Promise((resolve) => {
            found = resolve;
        });
        runtimeOf(handle())?.startAsync({
            key: 'mention-search',
            service: 'references',
            featureId: 'core',
            action: 'create',
            command: 'text.insert',
            run: () => search,
        });
        type('x');
        const replaced = handle().replaceDocument(replacing(handle(), { unsaved: { action: 'save' } }));
        await flush();
        const queued = untyped(handle()).enqueue('text.insert', { text: 'y' });
        // The result arrives while the replacement waits, so the coordinator holds it.
        found({ text: 'late ' });
        await settle();

        calls[0]?.answer();

        expect(await act(() => replaced)).toMatchObject({ status: 'replaced' });
        expect(await queued).toEqual({ status: 'rejected', code: 'wrong-session' });
        expect(textIn(handle().getSnapshot().document)).toBe('next');
        unmount();
    });

    it('runs the full steps for another untouched new record with an equal document', async () => {
        const { handle, unmount } = mount({ service: serviceOf().service });
        const { document } = handle().getSnapshot();

        const result = await replace(handle(), { next: { documentId: 'document-2', revision: null, document } });

        expect(result).toMatchObject({ status: 'replaced', session: { documentId: 'document-2', generation: 1 } });
        expect(handle().getSummary().session.documentId).toBe('document-2');
        unmount();
    });

    it.each([
        ['an untouched new record', null, { status: 'failed', code: 'transport', outcome: 'not-sent' }],
        [
            'a clean existing record',
            'revision-1',
            {
                status: 'acknowledged',
                acknowledgment: {
                    operationId: null,
                    stamp: { documentId: 'document-1', sessionId: 'id-1', generation: 0, sequence: 0 },
                    revision: 'revision-1',
                },
            },
        ],
    ] as const)(
        'answers a requestCommit made before a replacement in the same task for %s, with no save of the next document',
        async (_name, revision, expected) => {
            const { service } = serviceOf();
            const { handle, flush, unmount } = mount({ service, revision });

            const committed = handle().requestCommit({ reason: 'navigate' });
            await replace(handle());
            await flush();
            await settle();

            expect(await committed).toEqual(expected);
            expect(service.save).not.toHaveBeenCalled();
            unmount();
        },
    );

    it('refuses with unsaved when a documentChange listener replaces under the reject policy', async () => {
        const { handle, type, unmount } = mount({
            service: serviceOf().service,
            revision: 'revision-1',
        });
        const results: Promise<ReplaceResult>[] = [];
        handle().subscribe('documentChange', () => {
            if (results.length === 0) {
                results.push(handle().replaceDocument(replacing(handle())));
            }
        });

        type('x');

        expect(await act(() => results[0])).toEqual({ status: 'rejected', code: 'unsaved' });
        expect(textIn(handle().getSnapshot().document)).toBe('xab');
        unmount();
    });

    it('gives the session back with unsaved when a host passes a checkpoint with no receipt', async () => {
        const { handle, type, unmount } = mount({ service: serviceOf().service });
        type('x');

        const result = await replace(handle(), { unsaved: { action: 'checkpoint' } as never });

        expect(result).toEqual({ status: 'rejected', code: 'unsaved' });
        expect(handle().getSummary().phase).toBe('ready');
        let inserted: CommandResult | undefined;
        act(() => {
            inserted = untyped(handle()).execute('text.insert', { text: 'y' });
        });
        expect(inserted).toMatchObject({ status: 'applied' });
        expect(textIn(handle().getSnapshot().document)).toBe('xyab');
        unmount();
    });

    it('replaces an untouched new record under the reject policy and disposes it with no disposed-dirty', async () => {
        const { service } = serviceOf();
        const replaced = mount({ service });
        expect(await replace(replaced.handle())).toMatchObject({ status: 'replaced' });
        replaced.unmount();
        const disposed = mount({ service });
        disposed.unmount();

        expect([...replaced.diagnostics, ...disposed.diagnostics]).toEqual([]);
        expect(service.save).not.toHaveBeenCalled();
    });

    it('notifies selector stores with the fresh state before replaced', async () => {
        const { handle, type, unmount } = mount({ service: serviceOf().service });
        let undoable = false;
        runtimeOf(handle())?.watch(
            () => untyped(handle()).query('history.undo').enabled,
            Object.is,
            (value) => {
                undoable = value;
            },
        );
        type('x');
        expect(undoable).toBe(true);
        const seen: boolean[] = [];
        handle().subscribe('replaced', () => seen.push(undoable));

        await replace(handle(), { unsaved: { action: 'discard', confirmed: true } });

        expect(seen).toEqual([false]);
        unmount();
    });
});
