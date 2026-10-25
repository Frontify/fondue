/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Plugin } from 'prosemirror-state';
import { describe, expect, it } from 'vitest';

import { compileDefinition, countAppends, NORMALIZE_META } from '#/definition';
import { countingIds } from '#/features/__tests__/fixtures/notes';
import { unitsOf } from '#/features/__tests__/fixtures/units';
import { type Diagnostic } from '#/model';
import { decodeToTree, limitsOf } from '#/model/internal';
import { extensionsOf } from '#/react/engine';
import { probeRuntimes, setSelection, typeText } from '#/testing';

import { RUNTIME_PLUGINS } from '../capabilities';
import { authoringOf } from '../policy';
import { createEditorRuntime } from '../runtime';
import { type CommandResult } from '../types';

import {
    boldModel,
    stored,
    para,
    words,
    start,
    contentOf,
    pending,
    discarded,
    textOf,
    capture,
    compose,
    endComposition,
    settleInput,
    installRuntimeHooks,
    started,
} from './fixtures/start';

installRuntimeHooks();

describe('faults', () => {
    const pluginError = {
        code: 'runtime.plugin-error',
        severity: 'error',
        messageKey: 'runtime.plugin-error',
        details: { featureId: 'fixture.failing', name: 'TypeError' },
    };
    const viewFault = { code: 'runtime.view-fault', severity: 'error', messageKey: 'runtime.view-fault' };
    const NOT_READY: CommandResult = { status: 'rejected', code: 'not-ready' };

    it('drops a batch whose plugin throws with a plugin-error diagnostic and stays ready, so typing still works', () => {
        let throws = 0;
        const failing = countAppends(
            new Plugin({
                appendTransaction: (transactions) => {
                    if (throws > 0 && transactions.some(({ docChanged }) => docChanged)) {
                        throws -= 1;
                        throw new TypeError('plugin failure');
                    }
                    return null;
                },
            }),
            { featureId: 'fixture.failing', capability: 'failing' },
        );
        const { handle, view, diagnostics, changes } = start(stored(para(words('ab'))), { plugins: [failing] });
        const before = view.state;
        const snapshot = handle.getSnapshot();

        throws = 1;
        typeText(handle, 'x');
        expect([view.state, handle.getSnapshot()]).toEqual([before, snapshot]);
        throws = 1;
        expect(handle.execute('text.insert', { text: 'y' })).toEqual({ status: 'rejected', code: 'not-applicable' });
        typeText(handle, 'z');

        expect(handle.getSummary().phase).toBe('ready');
        expect(textOf(view.state.doc)).toBe('zab');
        expect(changes).toHaveLength(1);
        // The command's own feature is named when the throw comes from its write, not from a plugin's append.
        expect(diagnostics).toEqual([
            pluginError,
            { ...pluginError, details: { featureId: 'core', name: 'TypeError' } },
        ]);
        expect(JSON.stringify(diagnostics)).not.toContain('plugin failure');
    });

    it('names a thrown value that is no Error unknown and leaves its text out of the plugin-error diagnostic', () => {
        const failing = countAppends(
            new Plugin({
                appendTransaction: (transactions) => {
                    if (transactions.some(({ docChanged }) => docChanged)) {
                        const notAnError: unknown = 'secret document text';
                        throw notAnError;
                    }
                    return null;
                },
            }),
            { featureId: 'fixture.failing', capability: 'failing' },
        );
        const { handle, diagnostics } = start(stored(para(words('ab'))), { plugins: [failing] });

        typeText(handle, 'x');

        expect(diagnostics).toEqual([{ ...pluginError, details: { featureId: 'fixture.failing', name: 'unknown' } }]);
        expect(JSON.stringify(diagnostics)).not.toContain('secret document text');
    });

    it('omits the feature of a plugin-error diagnostic when the throwing plugin is no counted append', () => {
        const failing = new Plugin({
            filterTransaction: (transaction) => {
                if (transaction.docChanged) {
                    throw new RangeError('filter failure');
                }
                return true;
            },
        });
        const { handle, diagnostics } = start(stored(para(words('ab'))), { plugins: [failing] });

        typeText(handle, 'x');

        expect(diagnostics).toEqual([{ ...pluginError, details: { name: 'RangeError' } }]);
        expect(JSON.stringify(diagnostics)).not.toContain('filter failure');
    });

    /** A paragraph node view whose `update` throws once its paragraph holds `!`. */
    const updateFails = new Plugin({
        props: {
            nodeViews: {
                paragraph: (node) => {
                    const dom = document.createElement('p');
                    return {
                        dom,
                        contentDOM: dom,
                        update: (next) => {
                            if (next.textContent.includes('!')) {
                                throw new Error('node view update failure');
                            }
                            return next.type === node.type;
                        },
                    };
                },
            },
        },
    });

    it('faults once a node view update throws, keeps the snapshot and offers the faulting edit until dispose', () => {
        const { handle, element, diagnostics } = start(stored(para(words('ab'))), { plugins: [updateFails] });
        setSelection(handle, { text: 'ab', from: 2, to: 2 });
        const snapshot = handle.getSnapshot();
        expect(handle.getRecoveryCandidate()).toBeNull();

        typeText(handle, '!');

        expect(handle.getSummary().phase).toBe('faulted');
        expect(diagnostics).toEqual([viewFault]);
        expect(element.getAttribute('contenteditable')).toBe('false');
        expect(handle.getSnapshot()).toBe(snapshot);
        expect(snapshot.stamp).toEqual({ ...handle.getSummary().session, sequence: 0 });
        expect(JSON.stringify(handle.getRecoveryCandidate())).toContain('"ab!"');
        expect(JSON.stringify(snapshot.document)).not.toContain('!');
        expect(handle.execute('text.insert', { text: 'y' })).toEqual(NOT_READY);
        expect(() => handle.dispose()).not.toThrow();
        expect(handle.getRecoveryCandidate()).toBeNull();
    });

    it('faults when a node view constructor throws while mounting, keeps the decoded document and settles queued intents as not-ready', async () => {
        const { result, tree } = decodeToTree(stored(para(words('ab'))), boldModel);
        if (result.status !== 'editable' || tree === undefined) {
            throw new Error('expected an editable document');
        }
        const constructorFails = new Plugin({
            props: {
                nodeViews: {
                    paragraph: () => {
                        throw new Error('node view constructor failure');
                    },
                },
            },
        });
        const compiled = compileDefinition(boldModel, RUNTIME_PLUGINS, extensionsOf(boldModel, unitsOf(boldModel)));
        const runtime = createEditorRuntime({
            definition: { ...compiled, plugins: [...compiled.plugins, constructorFails] },
            documentId: 'document-1',
            tree,
            capabilities: result.document.requiredCapabilities,
            generateId: countingIds(),
            mode: 'editable',
            policy: authoringOf(boldModel),
            limits: limitsOf({}),
        });
        started.push(runtime);
        const { handle } = runtime;
        const diagnostics: Diagnostic[] = [];
        handle.subscribe('diagnostic', (diagnostic: Diagnostic) => diagnostics.push(diagnostic));
        const queued = handle.enqueue('text.insert', { text: 'x' });

        runtime.attach(document.body.appendChild(document.createElement('div')));

        expect(handle.getSummary().phase).toBe('faulted');
        expect(diagnostics).toEqual([viewFault]);
        expect(handle.getSnapshot().stamp).toEqual({ ...handle.getSummary().session, sequence: 0 });
        expect(textOf(runtime.state.doc)).toBe('ab');
        expect(JSON.stringify(handle.getSnapshot().document)).toContain('"ab"');
        expect(await queued).toEqual(NOT_READY);
        expect(handle.execute('text.insert', { text: 'y' })).toEqual(NOT_READY);
    });

    /** Faults the session through a node view whose `update` throws once its paragraph holds `!`. */
    const faultView = (session: ReturnType<typeof start>) => {
        setSelection(session.handle, { text: 'ab', from: 2, to: 2 });
        typeText(session.handle, '!');
    };

    it('installs nothing once faulted when a captured target is released', () => {
        const session = start(stored(para(words('ab'))), { plugins: [updateFails] });
        const { handle, diagnostics } = session;
        setSelection(handle, { text: 'ab' });
        const target = capture(handle, { purpose: 'format', onIntersectingEdit: 'map' });
        faultView(session);
        const { commitSequence } = handle.getSummary();

        handle.releaseTarget(target);

        expect(handle.getSummary().commitSequence).toBe(commitSequence);
        expect(diagnostics).toEqual([viewFault]);
        expect(JSON.stringify(handle.getRecoveryCandidate())).toContain('"ab!"');
    });

    it('installs nothing once faulted when the view dispatches', () => {
        const session = start(stored(para(words('ab'))), { plugins: [updateFails] });
        const { handle, runtime, diagnostics } = session;
        faultView(session);
        const { commitSequence } = handle.getSummary();

        runtime.select({ anchor: 1, head: 2 });

        expect(handle.getSummary().commitSequence).toBe(commitSequence);
        expect(diagnostics).toEqual([viewFault]);
        expect(JSON.stringify(handle.getRecoveryCandidate())).toContain('"ab!"');
    });

    it('discards an async result whose install faults the view as not-ready', async () => {
        const session = start(stored(para(words('ab'))), { plugins: [updateFails] });
        setSelection(session.handle, { text: 'ab', from: 2, to: 2 });

        await pending(session.runtime).resolve({ text: '!' });

        expect(session.diagnostics).toEqual([viewFault, discarded('not-ready')]);
    });

    it('publishes nothing from a composition that settles after a fault', async () => {
        // Two plugins that append to each other in a batch whose root asks for it, past the append limit.
        const looping = (featureId: string) =>
            countAppends(
                new Plugin({
                    appendTransaction: (transactions, _old, state) => {
                        const asked = transactions.some((transaction) => transaction.getMeta('loop') === true);
                        if (
                            !asked ||
                            transactions.every((transaction) => transaction.getMeta('appendedBy') === featureId)
                        ) {
                            return null;
                        }
                        return state.tr.setMeta('appendedBy', featureId).setMeta('loop', true);
                    },
                }),
                { featureId, capability: 'insertText' },
            );
        const session = start(stored(para(words('ab'))), { plugins: [looping('fixture.a'), looping('fixture.b')] });
        const { handle, view, changes } = session;
        setSelection(handle, { text: 'ab', from: 2, to: 2 });
        const snapshot = handle.getSnapshot();
        compose(session, 'x');

        view.dispatch(view.state.tr.insertText('y').setMeta('loop', true));
        endComposition(session);
        await settleInput();

        expect(handle.getSummary()).toMatchObject({ phase: 'faulted', sequence: 0 });
        expect(changes).toEqual([]);
        expect(handle.getSnapshot()).toBe(snapshot);
    });

    it('discards a result held for a composition as not-ready and aborts its call when the session faults before input settles', async () => {
        // Two plugins that append to each other in a batch whose root asks for it, past the append limit.
        const looping = (featureId: string) =>
            countAppends(
                new Plugin({
                    appendTransaction: (transactions, _old, state) => {
                        const asked = transactions.some((transaction) => transaction.getMeta('loop') === true);
                        if (
                            !asked ||
                            transactions.every((transaction) => transaction.getMeta('appendedBy') === featureId)
                        ) {
                            return null;
                        }
                        return state.tr.setMeta('appendedBy', featureId).setMeta('loop', true);
                    },
                }),
                { featureId, capability: 'insertText' },
            );
        const session = start(stored(para(words('ab'))), { plugins: [looping('fixture.a'), looping('fixture.b')] });
        const { handle, runtime, view, diagnostics } = session;
        setSelection(handle, { text: 'ab', from: 2, to: 2 });
        const held = pending(runtime);
        compose(session, 'x');
        await held.resolve({ text: '!' });
        endComposition(session);

        view.dispatch(view.state.tr.insertText('y').setMeta('loop', true));

        expect(handle.getSummary().phase).toBe('faulted');
        expect(diagnostics.map(({ code }) => code)).toEqual(['runtime.append-limit', 'runtime.async-discarded']);
        expect(diagnostics[1]).toEqual(discarded('not-ready'));
        expect(held.operation.controller.signal.aborted).toBe(true);
        expect(probeRuntimes().operations).toEqual([]);
    });

    it('reports a plugin that throws in the repair of a settling composition', async () => {
        const failing = countAppends(
            new Plugin({
                appendTransaction: (transactions) => {
                    if (transactions[0]?.getMeta(NORMALIZE_META) === 'now') {
                        throw new TypeError('plugin failure');
                    }
                    return null;
                },
            }),
            { featureId: 'fixture.failing', capability: 'failing' },
        );
        const session = start(stored(para(words('ab'))), { plugins: [failing] });
        setSelection(session.handle, { text: 'ab', from: 2, to: 2 });
        compose(session, 'x');

        endComposition(session);
        await settleInput();

        expect(session.diagnostics).toEqual([pluginError]);
        expect(session.handle.getSummary()).toMatchObject({ phase: 'ready', sequence: 1 });
        expect(textOf(session.view.state.doc)).toBe('abx');
        expect(contentOf(session.changes[0])).toEqual(stored(para(words('abx'))).content);
    });

    it('leaves nothing on the element that reaches the runtime after a plugin view throws while mounting', () => {
        const { result, tree } = decodeToTree(stored(para(words('ab'))), boldModel);
        if (result.status !== 'editable' || tree === undefined) {
            throw new Error('expected an editable document');
        }
        let halfBuilt: { readonly isDestroyed: boolean } | undefined;
        const viewFails = new Plugin({
            view: (editorView) => {
                halfBuilt = editorView;
                throw new Error('plugin view failure');
            },
        });
        const compiled = compileDefinition(boldModel, RUNTIME_PLUGINS, extensionsOf(boldModel, unitsOf(boldModel)));
        const runtime = createEditorRuntime({
            definition: { ...compiled, plugins: [...compiled.plugins, viewFails] },
            documentId: 'document-1',
            tree,
            capabilities: result.document.requiredCapabilities,
            generateId: countingIds(),
            mode: 'editable',
            policy: authoringOf(boldModel),
            limits: limitsOf({}),
        });
        started.push(runtime);
        const element = document.body.appendChild(document.createElement('div'));
        runtime.attach(element);

        const text = element.querySelector('p')?.firstChild;
        if (text !== null && text !== undefined) {
            document.getSelection()?.setBaseAndExtent(text, 0, text, 1);
        }
        document.dispatchEvent(new Event('selectionchange'));
        element.dispatchEvent(new InputEvent('beforeinput', { inputType: 'insertText', data: 'x', bubbles: true }));

        expect(runtime.handle.getSummary()).toMatchObject({ phase: 'faulted', commitSequence: 0 });
        expect(halfBuilt?.isDestroyed).toBe(true);
    });
});
