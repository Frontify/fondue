/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Node } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { compileDefinition, type CompiledDefinition } from '#/definition';
import { countingIds, notesModel } from '#/features/__tests__/fixtures/notes';
import { core } from '#/features/core/feature';
import { bold } from '#/features/marks-bold/feature';
import { compileContentModel, type ContentModel, type Diagnostic, type JsonValue, migrateDocument } from '#/model';
import { decodeToTree } from '#/model/decode';
import { probeRuntimes, setSelection, typeText } from '#/testing';

import newerNotes from '../../model/__tests__/fixtures/migration/v3-current.json';
import { RUNTIME_PLUGINS } from '../capabilities';
import { createEditorRuntime, type EditorRuntime } from '../runtime';
import { type DocumentChange } from '../types';

const boldModel = compileContentModel([core(), bold()], { id: 'test.bold', version: 1 });
const stored = (...blocks: readonly JsonValue[]) => ({
    format: 'frontify.rich-text',
    formatVersion: 1,
    model: { id: 'test.bold', version: 1 },
    requiredCapabilities: [{ id: 'core', version: 1 }],
    content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: blocks },
});
const para = (...content: readonly JsonValue[]) => ({ type: 'paragraph', attrs: { lang: null }, content });
const words = (value: string) => ({ type: 'text', text: value });

const started: EditorRuntime[] = [];
beforeEach(() => {
    vi.useFakeTimers();
});
afterEach(() => {
    for (const runtime of started.splice(0)) {
        runtime.handle.dispose();
    }
    document.body.replaceChildren();
    vi.useRealTimers();
});

interface Start {
    readonly model?: ContentModel;
    /** Adds plugins to the compiled definition, as the engine runs them after the definition's own. */
    readonly plugins?: readonly Plugin[];
}

/** A runtime on an attached surface, `ready` after the first frame. */
const start = (input: unknown, options: Start = {}) => {
    const { model = boldModel, plugins = [] } = options;
    const { result, tree } = decodeToTree(input, model);
    if (result.status !== 'editable' || tree === undefined) {
        throw new Error('expected an editable document');
    }
    const compiled = compileDefinition(model, RUNTIME_PLUGINS);
    const definition: CompiledDefinition = {
        ...compiled,
        plugins: [...compiled.plugins, ...plugins],
    };

    const runtime = createEditorRuntime({
        definition,
        documentId: 'document-1',
        tree,
        capabilities: result.document.requiredCapabilities,
        generateId: countingIds(),
        mode: 'editable',
    });
    started.push(runtime);
    const changes: DocumentChange[] = [];
    runtime.handle.subscribe('documentChange', (change: DocumentChange) => changes.push(change));
    const diagnostics: Diagnostic[] = [];
    runtime.handle.subscribe('diagnostic', (diagnostic: Diagnostic) => diagnostics.push(diagnostic));
    const element = document.createElement('div');
    document.body.append(element);
    runtime.attach(element);
    vi.runAllTimers();
    const view = runtime.view;
    if (view === undefined) {
        throw new Error('no view');
    }
    return { runtime, handle: runtime.handle, changes, diagnostics, view };
};

const contentOf = (change: DocumentChange | undefined) => change?.readDocument().content;

describe('the commit path', () => {
    it('publishes a root transaction and its appended one as one change', () => {
        const append = new Plugin({
            appendTransaction: (transactions, _old, state) => {
                if (
                    !transactions.some((transaction) => transaction.docChanged) ||
                    state.doc.textContent.endsWith('!')
                ) {
                    return null;
                }
                return state.tr.insertText('!', state.doc.content.size - 1);
            },
        });
        const { handle, changes } = start(stored(para()), { plugins: [append] });

        typeText(handle, 'a');

        expect(changes).toHaveLength(1);
        expect(contentOf(changes[0])).toEqual(stored(para({ type: 'text', text: 'a!' })).content);
        expect(handle.getSummary().commitSequence).toBe(1);
    });

    it('installs nothing, counts nothing and emits nothing for a filtered batch', () => {
        const reject = new Plugin({ filterTransaction: (transaction) => !transaction.docChanged });
        const { handle, changes, runtime } = start(stored(para()), { plugins: [reject] });

        typeText(handle, 'a');

        expect(handle.getSummary()).toMatchObject({ commitSequence: 0, sequence: 0 });
        expect(changes).toEqual([]);
        expect(runtime.view?.state.doc.textContent).toBe('');
    });

    it('compares documents with Node.eq and serializes nothing while no one reads', () => {
        const { handle } = start(stored(para()));
        const toJSON = vi.spyOn(Node.prototype, 'toJSON');
        const eq = vi.spyOn(Node.prototype, 'eq');

        typeText(handle, 'a'.repeat(100));

        expect(toJSON).not.toHaveBeenCalled();
        expect(eq).toHaveBeenCalled();
        toJSON.mockRestore();
        eq.mockRestore();
    });

    it('publishes no change for an edit that leaves an equal document', () => {
        const { handle, changes, view } = start(stored(para({ type: 'text', text: 'ab' })));

        view.dispatch(view.state.tr.insertText('a', 1, 2));

        expect(view.state.doc.textContent).toBe('ab');
        expect(changes).toEqual([]);
        expect(handle.getSummary()).toMatchObject({ commitSequence: 1, sequence: 0 });
    });

    it('reads the document of its own commit once, and the same object after', () => {
        const { handle, changes } = start(stored(para()));

        typeText(handle, 'a');
        typeText(handle, 'b');
        const first = changes[0];
        if (first === undefined) {
            throw new Error('no change');
        }

        expect(contentOf(first)).toEqual(stored(para({ type: 'text', text: 'a' })).content);
        expect(first.readDocument()).toBe(first.readDocument());
        expect(first.stamp).toMatchObject({ documentId: 'document-1', sequence: 1, generation: 0 });
    });

    it('reports unknown for a bare transaction and input after a recorded beforeinput', () => {
        const { handle, changes, view } = start(stored(para()));

        view.dispatch(view.state.tr.insertText('x'));
        typeText(handle, 'y');
        view.dispatch(view.state.tr.insertText('z'));

        expect(changes.map(({ origin, commandId }) => [origin, commandId])).toEqual([
            ['unknown', null],
            ['input', null],
            ['unknown', null],
        ]);
    });

    it('forgets a recorded beforeinput whose batch a plugin rejected', () => {
        const reject = new Plugin({ filterTransaction: (transaction) => !transaction.doc.textContent.includes('z') });
        const { handle, changes, view } = start(stored(para()), { plugins: [reject] });

        typeText(handle, 'z');
        view.dispatch(view.state.tr.insertText('x'));

        expect(changes.map(({ origin }) => origin)).toEqual(['unknown']);
    });

    it('rejects a transaction built from an older state as stale, keeping state and counters', () => {
        const { handle, view, diagnostics, changes } = start(stored(para()));
        const old = view.state;
        typeText(handle, 'a');
        const summary = handle.getSummary();
        const current = view.state;

        view.dispatch(old.tr.insertText('b'));

        expect(view.state).toBe(current);
        expect(handle.getSummary()).toEqual(summary);
        expect(changes).toHaveLength(1);
        expect(diagnostics).toEqual([
            { code: 'runtime.stale-transaction', severity: 'error', messageKey: 'runtime.stale-transaction' },
        ]);
    });
});

describe('origins with an appended normalization', () => {
    /** Appends `!` to the document after any batch that changed it and left it without one. */
    const repair = new Plugin({
        appendTransaction: (transactions, _old, state) => {
            if (!transactions.some(({ docChanged }) => docChanged) || state.doc.textContent.endsWith('!')) {
                return null;
            }
            return state.tr.insertText('!', state.doc.content.size - 1);
        },
    });
    const cases: readonly (readonly [string, (session: ReturnType<typeof start>) => unknown])[] = [
        ['input', ({ handle }) => typeText(handle, 'c')],
        ['unknown', ({ view }) => view.dispatch(view.state.tr.insertText('f'))],
    ];
    for (const [origin, act] of cases) {
        it(`reports the root's origin ${origin} for a batch with an appended normalization`, () => {
            const session = start(stored(para(words('ab'))), { plugins: [repair] });

            act(session);

            expect(session.changes.map((change) => change.origin)).toEqual([origin]);
            expect(session.view.state.doc.textContent.endsWith('!')).toBe(true);
        });
    }
});

describe('the session lifecycle', () => {
    it('emits ready once with the session token after the first frame', () => {
        const { tree } = decodeToTree(stored(para()), boldModel);
        const runtime = createEditorRuntime({
            definition: compileDefinition(boldModel, RUNTIME_PLUGINS),
            documentId: 'document-1',
            tree: tree as NonNullable<typeof tree>,
            capabilities: [],
            generateId: countingIds(),
            mode: 'editable',
        });
        started.push(runtime);
        const ready = vi.fn();
        runtime.handle.subscribe('ready', ready);
        runtime.attach(document.body.appendChild(document.createElement('div')));

        expect(runtime.handle.getSummary().phase).toBe('mounting');
        expect(ready).not.toHaveBeenCalled();
        vi.runAllTimers();
        vi.runAllTimers();

        expect(ready).toHaveBeenCalledTimes(1);
        expect(ready).toHaveBeenCalledWith(runtime.handle.getSummary().session);
        expect(runtime.handle.getSummary().phase).toBe('ready');
    });

    it('emits disposed with the final token, then holds no subscription, view or frame', () => {
        const { handle } = start(stored(para()));
        const disposed = vi.fn(() => probeRuntimes().subscriptions);

        handle.subscribe('disposed', disposed);
        handle.dispose();

        expect(disposed).toHaveBeenCalledTimes(1);
        expect(disposed).toHaveBeenCalledWith(handle.getSummary().session);
        expect(disposed.mock.results[0]?.value).toBeGreaterThan(0);
        expect(probeRuntimes()).toMatchObject({ views: [], subscriptions: 0, frames: 0 });
        expect(handle.getSummary().phase).toBe('disposed');
    });
});

describe('stored content the session keeps', () => {
    it('applies the declared default of an invalid doc attribute and writes the stored value back', () => {
        const input = stored(para());
        const root = { ...input.content, attrs: { lang: 'en_US', dir: 'auto' } };
        const { handle, changes, runtime } = start({ ...input, content: root });

        expect(runtime.view?.state.doc.attrs).toMatchObject({ lang: null, unknownAttributes: { lang: 'en_US' } });
        typeText(handle, 'a');

        expect(contentOf(changes[0])).toEqual({ ...root, content: [para({ type: 'text', text: 'a' })] });
    });

    it('keeps an island of content the installed model cannot hold through an edit', () => {
        const unknown = {
            type: 'acme_callout',
            attrs: { tone: 'warm' },
            content: [para({ type: 'text', text: 'kept' })],
        };
        const input = {
            ...stored(para(), unknown),
            model: { id: 'test.bold', version: 2 },
            requiredCapabilities: [
                { id: 'acme.callout', version: 1 },
                { id: 'core', version: 1 },
            ],
        };
        const { handle, changes } = start(input);

        typeText(handle, 'a');
        const saved = changes[0]?.readDocument();

        expect(saved?.model).toEqual({ id: 'test.bold', version: 1 });
        expect(saved?.content).toEqual(stored(para({ type: 'text', text: 'a' }), unknown).content);
        expect(saved?.requiredCapabilities).toContainEqual({ id: 'acme.callout', version: 1 });
    });

    it('lets a newer model migrate what an older one saved after an edit through the session', () => {
        const { handle, changes } = start(newerNotes, { model: notesModel(1) });
        setSelection(handle, { text: 'keys', from: 4, to: 4 });
        typeText(handle, '!');
        const saved = changes[0]?.readDocument();
        if (saved === undefined) {
            throw new Error('no change');
        }

        const result = migrateDocument(saved, notesModel(3), { generateId: countingIds() });

        expect(saved.model).toEqual({ id: 'fixture.notes', version: 1 });
        expect(result.status).toBe('migrated');
        expect(result.manifest.steps).toEqual(['fixture.notes.divider-to-rule']);
        const blocks = result.document === null ? [] : result.document.content.content;
        expect(blocks?.[0]).toMatchObject({
            attrs: { nodeId: 'note-8', level: 'danger', collapsed: true },
            content: [{ content: [{ text: 'Rotate the signing keys!' }] }],
        });
        expect(blocks?.[1]).toEqual({ type: 'horizontal_rule' });
    });
});

describe('commands, events and the commit path', () => {
    it('commits a root a plugin view dispatches during an install after that install publishes', () => {
        let inserted = false;
        const insertOnce = new Plugin({
            view: () => ({
                update: (view, previous) => {
                    if (!inserted && !view.state.doc.eq(previous.doc)) {
                        inserted = true;
                        view.dispatch(view.state.tr.insertText('x', 1));
                    }
                },
            }),
        });
        const { handle, view, changes } = start(stored(para()), { plugins: [insertOnce] });

        typeText(handle, 'a');

        expect(changes.map(({ stamp }) => stamp.sequence)).toEqual([1, 2]);
        expect(changes.at(-1)?.readDocument().content).toEqual(stored(para(words('xa'))).content);
        expect(view.state.doc.textContent).toBe('xa');
    });

    it('calls the remaining listeners and completes the commit when one throws', () => {
        const { handle, view } = start(stored(para()));
        const second = vi.fn();
        handle.subscribe('documentChange', () => {
            throw new Error('listener');
        });
        handle.subscribe('documentChange', second);

        typeText(handle, 'a');

        expect(second).toHaveBeenCalledTimes(1);
        expect(view.state.doc.textContent).toBe('a');
        expect(handle.getSummary().sequence).toBe(1);
    });

    it('reports a throwing diagnostic listener once to the other listeners, with no recursion', () => {
        const { handle, view } = start(stored(para()));
        const throwing = vi.fn(() => {
            throw new Error('listener');
        });
        const other = vi.fn((_diagnostic: Diagnostic) => undefined);
        handle.subscribe('diagnostic', throwing);
        handle.subscribe('diagnostic', other);
        const old = view.state;
        typeText(handle, 'a');

        view.dispatch(old.tr.insertText('b'));

        expect(throwing).toHaveBeenCalledTimes(1);
        expect(other.mock.calls.map(([diagnostic]) => diagnostic.code)).toEqual([
            'runtime.stale-transaction',
            'runtime.listener-error',
        ]);
    });
});

describe('disposal', () => {
    it('counts nothing twice when a kept unsubscribe runs after dispose', () => {
        const { handle } = start(stored(para()));
        const before = probeRuntimes().subscriptions;
        const unsubscribe = handle.subscribe('documentChange', () => undefined);

        handle.dispose();
        unsubscribe();

        expect(probeRuntimes().subscriptions).toBe(before - 2);
    });

    it('commits no root a plugin view dispatched once a listener disposed the session', () => {
        const dispatchOnce = new Plugin({
            view: () => ({
                update: (view, previous) => {
                    if (!view.state.doc.eq(previous.doc) && view.state.doc.textContent === 'a') {
                        view.dispatch(view.state.tr.insertText('x', 1));
                    }
                },
            }),
        });
        const { handle } = start(stored(para()), { plugins: [dispatchOnce] });
        let atDispose = -1;
        handle.subscribe('disposed', () => {
            atDispose = handle.getSummary().commitSequence;
        });
        handle.subscribe('documentChange', () => handle.dispose());

        typeText(handle, 'a');

        expect(handle.getSummary()).toMatchObject({ phase: 'disposed', commitSequence: atDispose });
    });

    it('stops notifying once a listener disposes the session', () => {
        const { handle } = start(stored(para()));
        const later = vi.fn();
        handle.subscribe('documentChange', () => handle.dispose());
        handle.subscribe('documentChange', later);

        typeText(handle, 'a');

        expect(handle.getSummary().phase).toBe('disposed');
        expect(later).not.toHaveBeenCalled();
    });
});
