/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Plugin } from 'prosemirror-state';
import { describe, expect, it, vi } from 'vitest';

import { compileContentModel } from '#/model';
import { bold } from '#/plugins/Bold/feature';
import { core } from '#/plugins/Core/feature';
import { image } from '#/plugins/Image/feature';
import { countAppends } from '#/runtime/definition';
import { setSelection, typeText } from '#/testing';
import { declaredPng } from '#/testing/uploads';

import { type UploadServiceLike } from '../capabilities/media/uploads';
import { canRedo, canUndo, reset, undoDepth } from '../history';
import { mediaOf } from '../session/lifecycle/uploadsWiring';
import { type CommandResult } from '../types';

import {
    stored,
    para,
    words,
    start,
    undoSteps,
    replacing,
    forbid,
    textOf,
    compose,
    endComposition,
    settleInput,
    installRuntimeHooks,
} from './fixtures/start';

installRuntimeHooks();

describe('history', () => {
    /** Types each character at the caret, `gap` ms after the one before. */
    const typeApart = ({ handle }: ReturnType<typeof start>, characters: string, gap: number) => {
        for (const character of characters) {
            vi.advanceTimersByTime(gap);
            typeText(handle, character);
        }
    };

    it('keeps 120 separated edits as 120 undo steps and 100 after the 121st', () => {
        const kept = start(stored(para()));
        typeApart(kept, 'a'.repeat(120), 600);
        const trimmed = start(stored(para()));
        typeApart(trimmed, 'a'.repeat(121), 600);

        expect([undoSteps(kept.handle), undoSteps(trimmed.handle)]).toEqual([120, 100]);
    });

    // A repair the compiler wraps, so it takes the current time; it puts `!` before the first edit.
    const normalization = countAppends(
        new Plugin({
            appendTransaction: (transactions, _old, state) => {
                if (!transactions.some(({ docChanged }) => docChanged) || state.doc.textContent.includes('!')) {
                    return null;
                }

                return state.tr.insertText('!', 1);
            },
        }),
        { featureId: 'fixture.repair', capability: 'normalization' },
    );
    const groupings: readonly (readonly [string, readonly Plugin[]])[] = [
        ['', []],
        [' with an appended normalization between them', [normalization]],
    ];
    for (const [name, plugins] of groupings) {
        it(`groups adjacent edits 400 ms apart and not 600 ms apart${name}`, () => {
            const near = start(stored(para()), { plugins });
            typeApart(near, 'ab', 400);
            const far = start(stored(para()), { plugins });
            typeApart(far, 'ab', 600);

            expect([undoSteps(near.handle), undoSteps(far.handle)]).toEqual([1, 2]);
        });
    }

    it('resets history to nothing to undo or redo with the same plugin instances', () => {
        const { handle, runtime } = start(stored(para()));
        typeText(handle, 'a');
        vi.advanceTimersByTime(600);
        typeText(handle, 'b');
        handle.execute('history.undo');
        const { state } = runtime;

        const next = reset(state);

        expect([canUndo(state), canRedo(state)]).toEqual([true, true]);
        expect([canUndo(next), canRedo(next)]).toEqual([false, false]);
        expect(next.plugins).toHaveLength(state.plugins.length);
        expect(next.plugins.every((plugin, index) => plugin === state.plugins[index])).toBe(true);
    });

    it('resolves faulted when building the fresh state for the next document throws', async () => {
        // A plugin whose state cannot start on the next document, as a broken feature's would.
        const picky = new Plugin({
            state: {
                init: (_config, { doc }) => {
                    if (doc.textContent === 'boom') {
                        throw new Error('plugin state failed');
                    }

                    return null;
                },
                apply: (_tr, value: null) => value,
            },
        });
        const { handle, diagnostics } = start(stored(para(words('ab'))), { plugins: [picky] });
        const replaced = vi.fn();
        handle.subscribe('replaced', replaced);

        const result = await handle.replaceDocument(replacing(handle, stored(para(words('boom')))));

        expect(result).toEqual({ status: 'rejected', code: 'faulted' });
        expect(handle.getSummary().phase).toBe('faulted');
        expect(diagnostics.map(({ code }) => code)).toEqual(['runtime.view-fault']);
        expect(diagnostics[0]?.details).toEqual({ name: 'Error' });
        expect(replaced).not.toHaveBeenCalled();
    });

    it('leaves nothing to undo or redo after replaceDocument', async () => {
        const { handle, runtime } = start(stored(para()));
        typeText(handle, 'a');
        vi.advanceTimersByTime(600);
        typeText(handle, 'b');
        handle.execute('history.undo');
        expect([canUndo(runtime.state), canRedo(runtime.state)]).toEqual([true, true]);

        await handle.replaceDocument(replacing(handle, stored(para(words('cd')))));

        expect([canUndo(runtime.state), canRedo(runtime.state)]).toEqual([false, false]);
        expect(handle.execute('history.undo')).toEqual({ status: 'rejected', code: 'not-applicable' });
    });

    it('closes the undo group around a command and a paste: typing, bold and typing, typing, an insert and typing, and typing, a paste and typing, are three steps each', () => {
        const bolded = start(stored(para()));
        typeText(bolded.handle, 'ab');
        setSelection(bolded.handle, { text: 'ab' });
        bolded.handle.execute('mark.bold.toggle');
        setSelection(bolded.handle, { text: 'ab', from: 2, to: 2 });
        typeText(bolded.handle, 'cd');
        const inserted = start(stored(para()));
        typeText(inserted.handle, 'a');
        inserted.handle.execute('text.insert', { text: 'b' });
        typeText(inserted.handle, 'c');
        const pasted = start(stored(para()));
        typeText(pasted.handle, 'a');
        pasted.view.pasteText('b');
        typeText(pasted.handle, 'c');

        expect([undoSteps(bolded.handle), undoSteps(inserted.handle), undoSteps(pasted.handle)]).toEqual([3, 3, 3]);
    });

    it('adds no undo step for a selection move or a stored mark', () => {
        const { handle } = start(stored(para(words('ab'))));

        setSelection(handle, { text: 'ab', from: 1, to: 1 });
        handle.execute('mark.bold.toggle');

        expect(handle.getSummary().commitSequence).toBe(2);
        expect(handle.query('history.undo').enabled).toBe(false);
    });

    const imageModel = compileContentModel([core(), bold(), image()], { id: 'test.bold', version: 1 });
    /** An upload service whose one upload answers when `complete` runs. */
    const oneUpload = () => {
        let answer: (asset: unknown) => void = () => undefined;
        const service: UploadServiceLike = {
            upload: () =>
                new Promise((resolve) => {
                    answer = resolve;
                }),
            releaseUnused: () => Promise.resolve(),
        };
        const complete = async () => {
            answer({ assetId: 'asset-1', mediaType: 'image/png', labelSnapshot: 'logo.png' });
            await vi.advanceTimersByTimeAsync(0);
        };

        return { service, complete };
    };

    /** Starts an upload of `logo.png` from the toolbar into a new slot, which replaces the empty paragraph. */
    const startUpload = async (session: ReturnType<typeof start>) => {
        const file = new File([declaredPng(40, 30)], 'logo.png', { type: 'image/png' });
        await mediaOf(session.runtime)?.uploads.begin([file], { kind: 'insert', origin: 'command' });
    };

    /** The text of the paragraph after the slot, and the slot's asset. */
    const shown = ({ view }: ReturnType<typeof start>): unknown[] => [
        view.state.doc.textContent,
        view.state.doc.child(0).firstChild?.attrs.assetId as unknown,
    ];

    it('opens the asset picker for image.insert and the upload start control of its node for image.replace', () => {
        const opened: unknown[] = [];
        const image = {
            type: 'figure',
            attrs: { nodeId: 'figure-1', align: 'center' },
            content: [
                {
                    type: 'asset_image',
                    attrs: { nodeId: 'image-1', assetId: 'asset-1', labelSnapshot: 'logo.png', width: 40, height: 30 },
                },
            ],
        };
        const document = { ...stored(para(words('ab')), image), requiredCapabilities: imageModel.capabilities };
        const { handle } = start(document, {
            model: imageModel,
            pick: (nodeId) => opened.push(nodeId),
        });
        setSelection(handle, { text: 'ab', from: 2, to: 2 });

        handle.execute('image.insert');
        handle.execute('image.replace', { nodeId: 'image-1' });

        expect(opened).toEqual([undefined, 'image-1']);
    });

    it('adds no undo step for an upload completion that sets an assetId', async () => {
        const upload = oneUpload();
        const session = start(stored(para()), { model: imageModel, uploads: upload.service });
        await startUpload(session);
        typeText(session.handle, 'a');
        const depth = undoDepth(session.runtime.state);

        await upload.complete();

        expect(shown(session)).toEqual(['a', 'asset-1']);
        expect(undoDepth(session.runtime.state)).toBe(depth);
        session.handle.execute('history.undo');
        expect(shown(session)).toEqual(['', 'asset-1']);
    });

    it('starts a new undo step for typing right after an upload completion', async () => {
        const upload = oneUpload();
        const session = start(stored(para()), { model: imageModel, uploads: upload.service });
        await startUpload(session);
        typeText(session.handle, 'a');
        vi.advanceTimersByTime(50);
        await upload.complete();
        vi.advanceTimersByTime(50);
        typeText(session.handle, 'b');

        session.handle.execute('history.undo');

        expect(shown(session)).toEqual(['a', 'asset-1']);
    });

    it('reverts an edit and its repair with one undo, and repairs nothing after it', () => {
        let repairs = 0;
        // Turns a typed `x` into `X`.
        const upper = countAppends(
            new Plugin({
                appendTransaction: (transactions, _old, state) => {
                    const at = state.doc.textContent.indexOf('x');
                    if (!transactions.some(({ docChanged }) => docChanged) || at < 0) {
                        return null;
                    }

                    repairs += 1;

                    return state.tr.insertText('X', at + 1, at + 2);
                },
            }),
            { featureId: 'fixture.repair', capability: 'normalization' },
        );
        const { handle, view } = start(stored(para(words('ab'))), { plugins: [upper] });
        setSelection(handle, { text: 'ab', from: 2, to: 2 });
        typeText(handle, 'x');
        expect([textOf(view.state.doc), repairs]).toEqual(['abX', 1]);

        handle.execute('history.undo');

        expect([textOf(view.state.doc), repairs]).toEqual(['ab', 1]);
        expect(handle.query('history.undo').enabled).toBe(false);
    });

    it('returns the selection to where the undone change happened', () => {
        const { handle, view } = start(stored(para(words('ab cd'))));
        setSelection(handle, { text: 'ab', from: 2, to: 2 });
        typeText(handle, 'x');
        setSelection(handle, { text: 'cd', from: 2, to: 2 });
        typeText(handle, 'y');
        setSelection(handle, { text: 'abx', from: 0, to: 0 });

        handle.execute('history.undo');

        expect(textOf(view.state.doc)).toBe('abx cd');
        expect([view.state.selection.from, view.state.selection.empty]).toEqual([7, true]);
    });

    it('adds no undo step for a command that fails or does not apply', async () => {
        const session = start(stored(para(words('ab'))), { policy: forbid('marks.bold', 'create') });
        const { handle, runtime } = session;
        const results: CommandResult[] = [];
        const unsubscribe = handle.subscribe('documentChange', () => {
            results.push(handle.execute('text.insert', { text: 'y' }));
        });
        typeText(handle, 'x');
        unsubscribe();
        setSelection(handle, { text: 'xab' });
        const other = { id: 'target-1', session: { documentId: 'document-1', sessionId: 'other', generation: 0 } };

        results.push(
            handle.execute('fixture.missing'),
            handle.execute('text.insert', { text: 1 }),
            handle.execute('history.redo'),
            handle.execute('mark.bold.toggle'),
            handle.execute('text.insert', { text: 'y' }, { target: {} }),
            handle.execute('text.insert', { text: 'y' }, { target: other }),
        );
        handle.setMode('readonly');
        results.push(handle.execute('text.insert', { text: 'y' }));
        handle.setMode('editable');
        setSelection(handle, { text: 'xab', from: 3, to: 3 });
        compose(session, 'c');
        results.push(handle.execute('text.insert', { text: 'y' }));
        endComposition(session);
        await settleInput();
        // The typed and the composed text are the only steps.
        const steps = undoSteps(handle);
        handle.dispose();
        results.push(handle.execute('text.insert', { text: 'y' }));

        expect(results.map((result) => (result.status === 'rejected' ? result.code : result.status))).toEqual([
            'busy',
            'unknown-command',
            'invalid-payload',
            'not-applicable',
            'not-allowed',
            'target-invalid',
            'wrong-session',
            'readonly',
            'composition-active',
            'not-ready',
        ]);
        expect([steps, canUndo(runtime.state)]).toEqual([2, false]);
    });
});
