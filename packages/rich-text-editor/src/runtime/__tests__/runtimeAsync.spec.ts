/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it, vi } from 'vitest';

import { type EngineCommand } from '#/definition';
import { probeRuntimes, setSelection, typeText } from '#/testing';

import { authoringOf } from '../policy';
import { type CommandResult } from '../types';

import {
    boldModel,
    stored,
    para,
    words,
    start,
    pending,
    undoSteps,
    replacing,
    discarded,
    textOf,
    targetModel,
    capture,
    markedText,
    compose,
    endComposition,
    settleInput,
    NOT_EDITABLE_CORE,
    installRuntimeHooks,
} from './fixtures/start';

installRuntimeHooks();

describe('the async coordinator', () => {
    it('returns applied for a command whose change a documentChange listener answers with dispose', () => {
        const { handle, view } = start(stored(para(words('ab'))));
        handle.subscribe('documentChange', () => handle.dispose());

        const result = handle.execute('text.insert', { text: 'x' });

        expect(result).toMatchObject({ status: 'applied', contentChanged: true });
        expect([handle.getSummary().phase, textOf(view.state.doc)]).toEqual(['disposed', 'xab']);
    });

    it('registers each operation with its ID, session, target, policy revision, controller and request sequence', () => {
        const { handle, runtime } = start(stored(para(words('abcd'))), { model: targetModel });
        setSelection(handle, { text: 'bc' });
        const target = capture(handle, { purpose: 'insert', onIntersectingEdit: 'map' });
        handle.updatePolicy(authoringOf(targetModel));

        pending(runtime, { key: 'mention-search', service: 'references', target });
        const search = pending(runtime, { key: 'mention-search', service: 'references', target }).operation;
        const upload = pending(runtime, { key: 'upload' }).operation;

        const { session } = handle.getSummary();
        const registry = probeRuntimes().operations;
        expect(registry).toEqual([search, upload]);
        expect(search).toMatchObject({ session, target, policyRevision: 1, key: 'mention-search', request: 2 });
        expect(upload).toMatchObject({ session, policyRevision: 1, key: 'upload', request: 1 });
        expect(upload.target).toMatchObject({ session });
        expect(search.id).not.toBe(upload.id);
        expect(registry.map(({ controller }) => controller instanceof AbortController)).toEqual([true, true]);
    });

    it('aborts an older request for the same interaction and ignores its result when it resolves last', async () => {
        const { runtime, view, diagnostics } = start(stored(para(words('ab'))));
        const older = pending(runtime, { key: 'mention-search' });
        const newer = pending(runtime, { key: 'mention-search' });

        expect([older.operation.controller.signal.aborted, newer.operation.controller.signal.aborted]).toEqual([
            true,
            false,
        ]);
        await newer.resolve({ text: 'new ' });
        await older.resolve({ text: 'old ' });

        expect(view.state.doc.textContent).toBe('new ab');
        expect(diagnostics).toEqual([discarded('superseded')]);
    });

    /** Each case starts an operation, makes one check fail, and returns the call that resolves it. */
    const failures: readonly (readonly [string, string, (session: ReturnType<typeof start>) => () => Promise<void>])[] =
        [
            [
                'a target that an edit invalidated',
                'target-invalid',
                ({ handle, runtime, view }) => {
                    setSelection(handle, { text: 'ab' });
                    const target = capture(handle, { purpose: 'replace-text', onIntersectingEdit: 'invalidate' });
                    const operation = pending(runtime, { target });
                    view.dispatch(view.state.tr.delete(1, 2));

                    return () => operation.resolve({ text: 'x' });
                },
            ],
            [
                'a policy that forbids the change',
                'not-allowed',
                ({ handle, runtime }) => {
                    const operation = pending(runtime);
                    handle.updatePolicy(authoringOf(targetModel, NOT_EDITABLE_CORE));

                    return () => operation.resolve({ text: 'x' });
                },
            ],
            [
                'a field of the wrong type',
                'invalid-payload',
                ({ runtime }) => {
                    const operation = pending(runtime);

                    return () => operation.resolve({ text: 7 });
                },
            ],
            [
                'a value that is not plain JSON',
                'invalid-payload',
                ({ runtime }) => {
                    const operation = pending(runtime);

                    return () => operation.resolve({ text: 'x', at: () => 1 });
                },
            ],
            [
                'a session generation that a replacement ended',
                'wrong-session',
                ({ handle, runtime }) => {
                    const operation = pending(runtime);
                    const replaced = handle.replaceDocument(replacing(handle, stored(para(words('cd')))));

                    return async () => {
                        await replaced;
                        await operation.resolve({ text: 'x' });
                    };
                },
            ],
        ];
    for (const [name, reason, act] of failures) {
        it(`discards a result with ${name} as ${reason}, with no content change`, async () => {
            const session = start(stored(para(words('ab'))), { model: targetModel });
            const resolve = act(session);
            const { sequence } = session.handle.getSummary();
            const before = session.view.state.doc;

            await resolve();

            expect(session.view.state.doc).toBe(before);
            expect(session.handle.getSummary().sequence).toBe(sequence);
            expect(session.diagnostics).toEqual([discarded(reason)]);
        });
    }

    it('applies a result through its target from the current state as async, keeping the caret of an author typing elsewhere', async () => {
        const { handle, runtime, view, changes } = start(stored(para(words('ab')), para(words('cd'))), {
            model: targetModel,
        });
        setSelection(handle, { text: 'cd', from: 2, to: 2 });
        const target = capture(handle, { purpose: 'insert', onIntersectingEdit: 'map' });
        const upload = pending(runtime, { target });
        setSelection(handle, { text: 'ab', from: 1, to: 1 });
        typeText(handle, 'x');
        const caret = view.state.selection;

        await upload.resolve({ text: '!' });

        expect(textOf(view.state.doc)).toBe('axbcd!');
        expect(view.state.selection.eq(caret)).toBe(true);
        expect(changes.at(-1)).toMatchObject({ origin: 'async', commandId: null });
    });

    it('runs a queued intent through its target without moving the caret of an author typing elsewhere', async () => {
        const { handle, view } = start(stored(para(words('ab')), para(words('cd'))), { model: targetModel });
        setSelection(handle, { text: 'cd' });
        const target = capture(handle, { purpose: 'format', onIntersectingEdit: 'map' });
        setSelection(handle, { text: 'ab', from: 1, to: 1 });
        let queued: Promise<CommandResult> | undefined;
        let caret = view.state.selection;
        handle.subscribe('documentChange', () => {
            if (queued === undefined) {
                caret = view.state.selection;
                queued = handle.enqueue('mark.bold.toggle', undefined, { target });
            }
        });

        typeText(handle, 'x');
        const result = await queued;

        expect(result?.status).toBe('applied');
        expect(textOf(view.state.doc)).toBe('axbcd');
        expect(markedText(view.state.doc, 'bold')).toBe('cd');
        expect(view.state.selection.eq(caret)).toBe(true);
    });

    it('applies a result started with no target where the selection was, keeping the caret, and releases the captured target', async () => {
        const { handle, runtime, view } = start(stored(para(words('ab')), para(words('cd'))), { model: targetModel });
        setSelection(handle, { text: 'ab', from: 1, to: 1 });
        const upload = pending(runtime);
        expect(upload.operation.target).not.toBeNull();
        setSelection(handle, { text: 'cd', from: 2, to: 2 });
        typeText(handle, 'x');
        const caret = view.state.selection;

        await upload.resolve({ text: '!' });

        expect(textOf(view.state.doc)).toBe('a!bcdx');
        // The caret after `cdx` maps one position on through the `!` inserted before it.
        expect([view.state.selection.empty, view.state.selection.head]).toEqual([true, caret.head + 1]);
        expect(probeRuntimes().targets).toBe(0);
    });

    it('registers an operation a running command starts with a target where that command leaves the selection', async () => {
        let upload: ReturnType<typeof pending> | undefined;
        let session: ReturnType<typeof start> | undefined;
        // Stands in for an `upload` capability: it changes the slot synchronously and hands the service call over.
        const startUpload: EngineCommand = {
            run: (state, dispatch) => {
                if (dispatch !== undefined && session !== undefined) {
                    dispatch(state.tr.insertText('[]'));
                    upload = pending(session.runtime);
                }

                return true;
            },
            active: () => false,
        };
        session = start(stored(para(words('ab')), para(words('cd'))), {
            model: targetModel,
            commands: { 'fixture.upload': startUpload },
        });
        const { handle, view } = session;
        setSelection(handle, { text: 'ab', from: 2, to: 2 });

        expect(handle.execute('fixture.upload').status).toBe('applied');
        expect(upload?.operation.target).not.toBeNull();
        expect(probeRuntimes()).toMatchObject({ targets: 1, operations: [upload?.operation] });
        setSelection(handle, { text: 'cd', from: 2, to: 2 });
        typeText(handle, 'x');
        const caret = view.state.selection;
        await upload?.resolve({ text: '!' });

        expect(textOf(view.state.doc)).toBe('ab[]!cdx');
        expect([view.state.selection.empty, view.state.selection.head]).toEqual([true, caret.head + 1]);
        expect(probeRuntimes().targets).toBe(0);
    });

    it('discards a result holding a revoked proxy as invalid-payload', async () => {
        const { runtime, view, diagnostics } = start(stored(para(words('ab'))));
        const upload = pending(runtime);
        const { proxy, revoke } = Proxy.revocable({}, {});
        revoke();

        // Promise resolution reads `then` on the result itself, so the revoked proxy sits one level down.
        await upload.resolve({ text: proxy });

        expect(view.state.doc.textContent).toBe('ab');
        expect(diagnostics).toEqual([discarded('invalid-payload')]);
    });

    it('starts nothing after dispose: the operation is aborted and never registered', () => {
        const { handle, runtime } = start(stored(para(words('ab'))));
        const run = vi.fn(() => new Promise<unknown>(() => undefined));
        handle.dispose();

        const operation = runtime.startAsync({
            key: 'upload',
            service: 'uploads',
            featureId: 'core',
            action: 'create',
            command: 'text.insert',
            run,
        });

        expect(operation.controller.signal.aborted).toBe(true);
        expect(run).not.toHaveBeenCalled();
        expect(probeRuntimes().operations).toEqual([]);
    });

    it('aborts every pending operation on dispose and ignores their results', async () => {
        const { handle, runtime, diagnostics } = start(stored(para(words('ab'))));
        const upload = pending(runtime);
        const search = pending(runtime, { key: 'mention-search', service: 'references' });

        handle.dispose();
        const { commitSequence } = handle.getSummary();
        const { document } = handle.getSnapshot();
        await upload.resolve({ text: 'x' });
        await search.resolve({ text: 'y' });

        expect(handle.getSummary().commitSequence).toBe(commitSequence);
        expect(handle.getSnapshot().document).toBe(document);

        expect([upload, search].map(({ operation }) => operation.controller.signal.aborted)).toEqual([true, true]);
        expect(probeRuntimes().operations).toEqual([]);
        expect(diagnostics).toEqual([]);
    });

    it('aborts an upload once the policy disables create for its feature and discards its result', async () => {
        const { handle, runtime, view } = start(stored(para(words('ab'))));
        const upload = pending(runtime, { featureId: 'core', action: 'create' });

        handle.updatePolicy(
            authoringOf(boldModel, { features: { core: { create: false, edit: true, remove: true, paste: true } } }),
        );
        await upload.resolve({ text: 'x' });

        expect(upload.operation.controller.signal.aborted).toBe(true);
        expect(view.state.doc.textContent).toBe('ab');
    });

    it('aborts only the operation of a changed services member and keeps the view', async () => {
        const { handle, runtime, view } = start(stored(para(words('ab'))));
        typeText(handle, 'x');
        const search = pending(runtime, { key: 'mention-search', service: 'references' });
        const upload = pending(runtime, { service: 'uploads' });

        runtime.changeServices(['references']);
        await search.resolve({ text: 'mention ' });
        await upload.resolve({ text: 'upload ' });

        expect([search, upload].map(({ operation }) => operation.controller.signal.aborted)).toEqual([true, false]);
        expect(view.state.doc.textContent).toBe('xupload ab');
        expect(runtime.view).toBe(view);
        // The completion is no undo step of its own, and the typed one stays.
        expect(undoSteps(handle)).toBe(1);
    });

    it('holds a result during composition and checks it again once input settled', async () => {
        const session = start(stored(para(words('ab')), para(words('cd'))), { model: targetModel });
        const { handle, runtime, view, diagnostics } = session;
        setSelection(handle, { text: 'cd', from: 2, to: 2 });
        const target = capture(handle, { purpose: 'insert', onIntersectingEdit: 'map' });
        const applied = pending(runtime, { target });
        const refused = pending(runtime, { key: 'other', target });
        setSelection(handle, { text: 'ab', from: 0, to: 0 });

        compose(session, 'x');
        await applied.resolve({ text: '!' });
        expect(textOf(view.state.doc)).toBe('xabcd');
        endComposition(session);
        await settleInput();
        expect(textOf(view.state.doc)).toBe('xabcd!');

        compose(session, 'y');
        handle.setMode('readonly');
        await refused.resolve({ text: '?' });
        endComposition(session);
        await settleInput();

        expect(textOf(view.state.doc)).toBe('xyabcd!');
        expect(diagnostics).toEqual([discarded('readonly')]);
    });
});
