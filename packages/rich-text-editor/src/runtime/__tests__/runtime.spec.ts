/* (c) Copyright Frontify Ltd., all rights reserved. */

import { joinBackward } from 'prosemirror-commands';
import { Node } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { defineEditorPlugin, type EditorApi, type EditorPlugin } from '#/bridge/plugin';
import { compileDefinition, type CompiledDefinition, type EngineCommand } from '#/definition';
import { fixtureHeadingSet } from '#/features/__tests__/fixtures/features';
import { countingIds, notesModel } from '#/features/__tests__/fixtures/notes';
import { core } from '#/features/core/feature';
import { bold } from '#/features/marks-bold/feature';
import {
    compileContentModel,
    type ContentModel,
    defineFeature,
    type Diagnostic,
    type FeatureDeclaration,
    type JsonValue,
    migrateDocument,
    type ResourceLimits,
} from '#/model';
import { decodeToTree, limitsOf } from '#/model/decode';
import { extensionsOf } from '#/react/engine';
import { pressKey, probeRuntimes, setSelection, typeText } from '#/testing';

import newerNotes from '../../model/__tests__/fixtures/migration/v3-current.json';
import { RUNTIME_PLUGINS } from '../capabilities';
import { createEditorRuntime, type EditorRuntime } from '../runtime';
import { type CommandResult, type DocumentChange } from '../types';

const boldModel = compileContentModel([core(), bold()], { id: 'test.bold', version: 1 });
const stored = (...blocks: readonly JsonValue[]) => ({
    format: 'frontify.rich-text',
    formatVersion: 1,
    model: { id: 'test.bold', version: 1 },
    requiredCapabilities: [{ id: 'core', version: 1 }],
    content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: blocks },
});
const para = (...content: readonly JsonValue[]) => ({ type: 'paragraph', attrs: { lang: null }, content });
const strong = (value: string) => ({ type: 'text', text: value, marks: [{ type: 'bold' }] });
const words = (value: string) => ({ type: 'text', text: value });
/** Inserts the payload's text, as `text.insert` does. */
const TEXT_INSERT = {
    payload: { fields: { text: { type: 'string' } } },
    run: (api: EditorApi, { text }: { readonly text: string }) => api.insert.text(text),
} as const;

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
    readonly mode?: 'editable' | 'readonly';
    /** Adds plugins to the compiled definition, as the engine runs them after the definition's own. */
    readonly plugins?: readonly Plugin[];
    /** Adds commands to the compiled definition's command map. */
    readonly commands?: Readonly<Record<string, EngineCommand>>;
    readonly limits?: Partial<ResourceLimits>;
    readonly generateId?: () => string;
    /** Editor parts beside the shipped ones, as a host passes them. */
    readonly parts?: readonly EditorPlugin[];
}

/** A runtime on an attached surface, `ready` after the first frame. */
const start = (input: unknown, options: Start = {}) => {
    const { model = boldModel, mode = 'editable', plugins = [], commands = {}, generateId = countingIds() } = options;
    const { result, tree } = decodeToTree(input, model);
    if (result.status !== 'editable' || tree === undefined) {
        throw new Error('expected an editable document');
    }
    const parts = [...(options.parts ?? [])];
    const compiled = compileDefinition(model, RUNTIME_PLUGINS, extensionsOf(model, parts));
    const definition: CompiledDefinition = {
        ...compiled,
        plugins: [...compiled.plugins, ...plugins],
        commands: new Map([...compiled.commands, ...Object.entries(commands)]),
    };

    const runtime = createEditorRuntime({
        definition,
        documentId: 'document-1',
        tree,
        capabilities: result.document.requiredCapabilities,
        generateId,
        mode,
        limits: limitsOf(options.limits),
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
    return { runtime, handle: runtime.handle, changes, diagnostics, element, view };
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

    it('counts each accepted batch: a selection move, a stored mark and a typed character', () => {
        const { handle } = start(stored(para({ type: 'text', text: 'ab' })));

        setSelection(handle, { text: 'ab', from: 1, to: 1 });
        expect(handle.getSummary().commitSequence).toBe(1);
        pressKey(handle, 'Mod-b');
        expect(handle.getSummary().commitSequence).toBe(2);
        typeText(handle, 'c');
        expect(handle.getSummary()).toMatchObject({ commitSequence: 3, sequence: 1 });
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
        setSelection(handle, { text: 'xyz' });
        pressKey(handle, 'Mod-b');

        expect(changes.map(({ origin, commandId }) => [origin, commandId])).toEqual([
            ['unknown', null],
            ['input', null],
            ['unknown', null],
            ['command', 'mark.bold.toggle'],
        ]);
    });

    it('forgets a recorded beforeinput whose batch a plugin rejected', () => {
        const reject = new Plugin({ filterTransaction: (transaction) => !transaction.doc.textContent.includes('z') });
        const { handle, changes, view } = start(stored(para()), { plugins: [reject] });

        typeText(handle, 'z');
        view.dispatch(view.state.tr.insertText('x'));

        expect(changes.map(({ origin }) => origin)).toEqual(['unknown']);
    });

    it('queries every command without changing state or emitting events', () => {
        const { handle, changes } = start(stored(para({ type: 'text', text: 'ab' })));
        setSelection(handle, { text: 'ab' });
        const before = handle.getSummary();

        expect(handle.query('mark.bold.toggle')).toEqual({ enabled: true, active: false, disabledReason: null });
        expect(handle.query('mark.missing.toggle')).toEqual({
            enabled: false,
            active: false,
            disabledReason: 'unknown-command',
        });

        expect(handle.getSummary()).toEqual(before);
        expect(changes).toEqual([]);
    });
});

describe('marks.bold', () => {
    it('toggles the stored mark at a caret, which the next typed character takes', () => {
        const { handle, changes } = start(stored(para({ type: 'text', text: 'ab' })));
        setSelection(handle, { text: 'ab', from: 2, to: 2 });

        pressKey(handle, 'Mod-b');
        expect(handle.getSummary()).toMatchObject({ sequence: 0, selection: { collapsed: true } });
        expect(handle.query('mark.bold.toggle').active).toBe(true);
        typeText(handle, 'c');

        expect(contentOf(changes[0])).toEqual(stored(para({ type: 'text', text: 'ab' }, strong('c'))).content);
    });

    it('bolds a half-bold range whole, and a range with spaces at its edges with them', () => {
        const half = start(stored(para(strong('ab'), { type: 'text', text: 'cd' })));
        setSelection(half.handle, { text: 'abcd' });
        expect(half.handle.query('mark.bold.toggle').active).toBe('mixed');
        pressKey(half.handle, 'Mod-b');
        expect(contentOf(half.changes[0])).toEqual(stored(para(strong('abcd'))).content);

        const spaced = start(stored(para({ type: 'text', text: 'a b c' })));
        setSelection(spaced.handle, { text: ' b ' });
        pressKey(spaced.handle, 'Mod-b');
        expect(contentOf(spaced.changes[0])).toEqual(
            stored(para({ type: 'text', text: 'a' }, strong(' b '), { type: 'text', text: 'c' })).content,
        );
    });

    it('removes bold from a range that is bold throughout', () => {
        const { handle, changes } = start(stored(para(strong('abcd'))));
        setSelection(handle, { text: 'bc' });
        expect(handle.query('mark.bold.toggle').active).toBe(true);

        pressKey(handle, 'Mod-b');

        expect(contentOf(changes[0])).toEqual(
            stored(para(strong('a'), { type: 'text', text: 'bc' }, strong('d'))).content,
        );
    });

    it('bolds the whole range when only a space between bold words is plain', () => {
        const { handle, changes } = start(stored(para(strong('a'), { type: 'text', text: ' ' }, strong('b'))));
        setSelection(handle, { text: 'a b' });
        expect(handle.query('mark.bold.toggle').active).toBe('mixed');

        pressKey(handle, 'Mod-b');

        expect(contentOf(changes[0])).toEqual(stored(para(strong('a b'))).content);
    });

    it('removes bold from bold text around a hard break', () => {
        const { handle, changes } = start(stored(para(strong('a'), { type: 'hard_break' }, strong('b'))));
        setSelection(handle, { text: 'a\uFFFCb' });
        expect(handle.query('mark.bold.toggle').active).toBe(true);

        pressKey(handle, 'Mod-b');

        expect(changes).toHaveLength(1);
        expect(contentOf(changes[0])).toEqual(
            stored(para({ type: 'text', text: 'a' }, { type: 'hard_break' }, { type: 'text', text: 'b' })).content,
        );
    });

    it('finds nothing to toggle in a selection that holds only a hard break', () => {
        const { handle, changes, runtime } = start(
            stored(para({ type: 'text', text: 'a' }, { type: 'hard_break' }, { type: 'text', text: 'b' })),
        );
        runtime.select({ anchor: 2, head: 3 });

        expect(handle.query('mark.bold.toggle')).toEqual({
            enabled: false,
            active: false,
            disabledReason: 'not-applicable',
        });
        pressKey(handle, 'Mod-b');

        expect(changes).toEqual([]);
    });

    it('reads a range as fully bold when its only plain text sits where bold is not allowed', () => {
        const line = defineFeature({
            id: 'test.line',
            version: 1,
            requires: [{ id: 'core', version: 1 }],
            nodes: {
                plain_line: { group: 'block', content: 'text*', marks: [], attrs: {}, html: ['pre', 0], parse: [] },
            },
        });
        const model = compileContentModel([core(), bold(), line()], { id: 'test.bold', version: 1 });
        const plain = { type: 'plain_line', content: [{ type: 'text', text: 'b' }] };
        const { handle, changes, runtime, view } = start(stored(para(strong('a')), plain, para(strong('c'))), {
            model,
        });
        runtime.select({ anchor: 1, head: view.state.doc.content.size - 1 });

        expect(handle.query('mark.bold.toggle').active).toBe(true);
        pressKey(handle, 'Mod-b');

        expect(contentOf(changes[0])).toEqual(
            stored(para({ type: 'text', text: 'a' }), plain, para({ type: 'text', text: 'c' })).content,
        );
    });
});

describe('the session lifecycle', () => {
    it('emits ready once with the session token after the first frame', () => {
        const { tree } = decodeToTree(stored(para()), boldModel);
        const runtime = createEditorRuntime({
            definition: compileDefinition(boldModel, RUNTIME_PLUGINS, extensionsOf(boldModel)),
            documentId: 'document-1',
            tree: tree as NonNullable<typeof tree>,
            capabilities: [],
            generateId: countingIds(),
            mode: 'editable',
            limits: limitsOf(undefined),
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

const heading = (level: number, ...content: readonly JsonValue[]) => ({
    type: 'heading',
    attrs: { nodeId: 'h-1', level },
    content,
});
/** The document's text, with `@` for each inline node. */
const textOf = (doc: Node) => doc.textBetween(0, doc.content.size, '', '@');

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

    it('rejects execute as busy from a documentChange listener and a plugin view update', () => {
        let target: EditorRuntime | undefined;
        const results: CommandResult[] = [];
        const viewUpdate = new Plugin({
            view: () => ({
                update: () => {
                    if (target !== undefined) {
                        results.push(target.handle.execute('text.insert', { text: 'v' }));
                    }
                },
            }),
        });
        const { handle, runtime, view } = start(stored(para()), { plugins: [viewUpdate] });
        target = runtime;
        handle.subscribe('documentChange', () => results.push(handle.execute('text.insert', { text: 'l' })));

        typeText(handle, 'a');

        expect(results).toEqual([
            { status: 'rejected', code: 'busy' },
            { status: 'rejected', code: 'busy' },
        ]);
        expect(view.state.doc.textContent).toBe('a');
    });

    it('runs a command built on joinBackward with no view, so a focused host button keeps focus', () => {
        const join: EngineCommand = { run: (state, dispatch) => joinBackward(state, dispatch), active: () => false };
        const { handle, view } = start(stored(para(words('a')), para(words('b'))), {
            commands: { 'fixture.join': join },
        });
        setSelection(handle, { text: 'b', from: 0, to: 0 });
        const button = document.body.appendChild(document.createElement('button'));
        button.focus();
        const endOfTextblock = vi.spyOn(view, 'endOfTextblock');

        expect(handle.query('fixture.join').enabled).toBe(true);
        expect(handle.execute('fixture.join').status).toBe('applied');

        expect(document.activeElement).toBe(button);
        expect(endOfTextblock).not.toHaveBeenCalled();
        expect(view.state.doc.childCount).toBe(1);
    });

    it('rejects a wrapped native command that dispatches twice', () => {
        const twice: EngineCommand = {
            run: (state, dispatch) => {
                dispatch?.(state.tr.insertText('a'));
                dispatch?.(state.tr.insertText('b'));
                return true;
            },
            active: () => false,
        };
        const { handle, view, diagnostics } = start(stored(para()), { commands: { 'fixture.twice': twice } });
        const before = view.state;

        expect(handle.execute('fixture.twice')).toEqual({ status: 'rejected', code: 'not-applicable' });
        expect(diagnostics.map(({ code }) => code)).toEqual(['runtime.multiple-dispatch']);
        expect(view.state).toBe(before);
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

describe('command payloads', () => {
    it('never runs a command whose payload fails its declaration', () => {
        const run = vi.fn(() => true);
        const declared: EngineCommand = {
            run,
            active: () => false,
            payload: { fields: { level: { type: 'integer', min: 1, max: 6 } } },
        };
        const { handle } = start(stored(para(words('ab'))), { commands: { 'fixture.declared': declared } });
        const invalid = { status: 'rejected', code: 'invalid-payload' };

        expect(handle.execute('fixture.declared', { level: 'two' })).toEqual(invalid);
        expect(handle.query('fixture.declared', { level: 'two' }).disabledReason).toBe('invalid-payload');
        expect(run).not.toHaveBeenCalled();
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

describe('the focus and the replacement of a session', () => {
    it('puts the selection at the start or at the end of the document when it takes focus there', () => {
        const { handle, runtime } = start(stored(para(words('ab'))));

        handle.focus('end');
        const atEnd = runtime.state.selection.from;
        handle.focus('start');

        expect([atEnd, runtime.state.selection.from]).toEqual([3, 1]);
    });
});

describe('the published snapshot and composition', () => {
    it('keeps sequence for a selection move and a stored mark, and counts a typed character', () => {
        const { handle } = start(stored(para(words('ab'))));

        setSelection(handle, { text: 'ab', from: 1, to: 1 });
        expect(handle.getSummary().sequence).toBe(0);
        pressKey(handle, 'Mod-b');
        expect(handle.getSummary().sequence).toBe(0);
        typeText(handle, 'c');
        expect(handle.getSummary().sequence).toBe(1);
    });
});

describe('key precedence', () => {
    it('runs the commands features bind to one key in plugin order until one applies', () => {
        const leaveHeading = defineFeature({
            id: 'fixture.leave-heading',
            version: 1,
            requires: [{ id: 'fixture.heading-set', version: 1 }],
        });
        const markLine = defineFeature({
            id: 'fixture.mark-line',
            version: 1,
            requires: [{ id: 'core', version: 1 }],
        });
        const parts = [
            defineEditorPlugin(leaveHeading, {
                commands: { 'fixture.paragraph.set': { run: (api) => api.blocks.set('paragraph') } },
                keys: { Enter: 'fixture.paragraph.set' },
            }),
            defineEditorPlugin(markLine, {
                commands: { 'fixture.text.insert': TEXT_INSERT },
                keys: { Enter: { command: 'fixture.text.insert', payload: { text: '¶' } } },
            }),
        ];
        const model = compileContentModel([core(), bold(), fixtureHeadingSet(), leaveHeading(), markLine()], {
            id: 'test.bold',
            version: 1,
        });
        const { handle, view, changes } = start(stored(para(words('ab')), heading(2, words('cd'))), {
            model,
            parts,
        });

        setSelection(handle, { text: 'ab', from: 2, to: 2 });
        pressKey(handle, 'Enter');
        setSelection(handle, { text: 'cd', from: 2, to: 2 });
        pressKey(handle, 'Enter');

        expect(changes.map(({ commandId }) => commandId)).toEqual(['fixture.text.insert', 'fixture.paragraph.set']);
        expect([textOf(view.state.doc), view.state.doc.child(1).type.name]).toEqual(['ab¶cd', 'paragraph']);
    });
});

describe('platform key bindings', () => {
    const pullQuoteDeclaration = {
        id: 'acme.pull-quote',
        version: 1,
        requires: [{ id: 'core', version: 1 }],
        nodes: {
            acme_pull_quote: {
                group: 'block',
                content: 'inline*',
                attrs: { tone: { type: 'enum', values: ['neutral', 'brand'], default: 'neutral' } },
                html: ['blockquote', { class: 'acme-pull-quote', 'data-tone': { attr: 'tone' } }, 0],
                parse: [{ tag: 'blockquote.acme-pull-quote', attrs: { tone: { from: 'data-tone' } } }],
            },
        },
        formats: { html: 'lossless', text: 'lossy', markdown: 'unsupported' },
    } as const satisfies FeatureDeclaration;
    const pullQuote = defineFeature(pullQuoteDeclaration);
    const pullQuoteSet = {
        run: (api: EditorApi) => api.blocks.set('acme_pull_quote', undefined, { toggle: true }),
    };
    const part = defineEditorPlugin(pullQuote, {
        commands: { 'acme.pull-quote.set': pullQuoteSet },
        keys: { 'mac:Mod-Alt-q': 'acme.pull-quote.set', 'other:Ctrl-Shift-q': 'acme.pull-quote.set' },
    });
    const model = compileContentModel([core(), pullQuote()], {
        id: 'test.bold',
        version: 1,
    });
    const firstType = ({ view }: ReturnType<typeof start>) => view.state.doc.child(0).type.name;
    afterEach(() => vi.restoreAllMocks());

    it('compiles the mac: and other: keys of a feature and runs each on its platform only', () => {
        const platform = vi.spyOn(navigator, 'platform', 'get').mockReturnValue('Win32');
        const session = start(stored(para(words('ab'))), { model, parts: [part] });
        setSelection(session.handle, { text: 'ab', from: 1, to: 1 });

        pressKey(session.handle, 'Ctrl-Shift-q');
        expect(firstType(session)).toBe('acme_pull_quote');
        platform.mockReturnValue('MacIntel');
        // The `other:` binding does nothing on an Apple platform, where the `mac:` one turns the block back.
        pressKey(session.handle, 'Ctrl-Shift-q');
        expect(firstType(session)).toBe('acme_pull_quote');
        pressKey(session.handle, 'Mod-Alt-q');
        expect(firstType(session)).toBe('paragraph');
    });

    it('runs the mac: binding over a plain binding of the same key on an Apple platform', () => {
        const both = defineEditorPlugin(pullQuote, {
            commands: {
                'acme.pull-quote.set': pullQuoteSet,
                'acme.pull-quote.unset': { run: (api) => api.blocks.set('paragraph') },
            },
            keys: { 'mac:Mod-Alt-q': 'acme.pull-quote.set', 'Mod-Alt-q': 'acme.pull-quote.unset' },
        });
        const platform = vi.spyOn(navigator, 'platform', 'get').mockReturnValue('MacIntel');
        const session = start(stored(para(words('ab'))), { model, parts: [both] });
        setSelection(session.handle, { text: 'ab', from: 1, to: 1 });

        pressKey(session.handle, 'Mod-Alt-q');
        expect(firstType(session)).toBe('acme_pull_quote');
        platform.mockReturnValue('Win32');
        pressKey(session.handle, 'Mod-Alt-q');
        expect(firstType(session)).toBe('paragraph');
    });

    it('runs a mac:Mod binding on the Meta key when only userAgentData names macOS', () => {
        vi.spyOn(navigator, 'platform', 'get').mockReturnValue('');
        Object.defineProperty(navigator, 'userAgentData', { configurable: true, get: () => ({ platform: 'macOS' }) });
        try {
            const bound = defineEditorPlugin(pullQuote, {
                commands: { 'acme.pull-quote.set': pullQuoteSet },
                keys: { 'mac:Mod-b': 'acme.pull-quote.set' },
            });
            const session = start(stored(para(words('ab'))), { model, parts: [bound] });
            setSelection(session.handle, { text: 'ab', from: 1, to: 1 });

            session.view.dom.dispatchEvent(new KeyboardEvent('keydown', { key: 'b', metaKey: true, bubbles: true }));
            expect(firstType(session)).toBe('acme_pull_quote');
        } finally {
            Reflect.deleteProperty(navigator, 'userAgentData');
        }
    });
});
