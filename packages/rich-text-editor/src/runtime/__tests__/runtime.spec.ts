/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Node } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { compileDefinition, type CompiledDefinition } from '#/definition';
import { fixtureLink } from '#/features/__tests__/fixtures/features';
import { countingIds, notesModel } from '#/features/__tests__/fixtures/notes';
import { core } from '#/features/core/feature';
import { bold } from '#/features/marks-bold/feature';
import { compileContentModel, type ContentModel, defineFeature, type JsonValue, migrateDocument } from '#/model';
import { decodeToTree } from '#/model/decode';
import { pressKey, probeRuntimes, setSelection, typeText } from '#/testing';

import newerNotes from '../../model/__tests__/fixtures/migration/v3-current.json';
import { CAPABILITIES } from '../capabilities';
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
const strong = (value: string) => ({ type: 'text', text: value, marks: [{ type: 'bold' }] });

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
}

/** A runtime on an attached surface, `ready` after the first frame. */
const start = (input: unknown, options: Start = {}) => {
    const { model = boldModel, mode = 'editable', plugins = [] } = options;
    const { result, tree } = decodeToTree(input, model);
    if (result.status !== 'editable' || tree === undefined) {
        throw new Error('expected an editable document');
    }
    const compiled = compileDefinition(model, CAPABILITIES);
    const definition: CompiledDefinition = { ...compiled, plugins: [...compiled.plugins, ...plugins] };
    const runtime = createEditorRuntime({
        definition,
        documentId: 'document-1',
        tree,
        capabilities: result.document.requiredCapabilities,
        generateId: countingIds(),
        mode,
    });
    started.push(runtime);
    const changes: DocumentChange[] = [];
    runtime.handle.subscribe('documentChange', (change: DocumentChange) => changes.push(change));
    const element = document.createElement('div');
    document.body.append(element);
    runtime.attach(element);
    vi.runAllTimers();
    return { runtime, handle: runtime.handle, changes, element };
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
        const { handle, changes, runtime } = start(stored(para({ type: 'text', text: 'ab' })));
        const view = runtime.view;
        if (view === undefined) {
            throw new Error('no view');
        }

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
        const { handle, changes, runtime } = start(stored(para()));
        const view = runtime.view;
        if (view === undefined) {
            throw new Error('no view');
        }

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
        const { handle, changes, runtime } = start(stored(para()), { plugins: [reject] });
        const view = runtime.view;
        if (view === undefined) {
            throw new Error('no view');
        }

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
        const { handle, changes, runtime } = start(stored(para(strong('a')), plain, para(strong('c'))), { model });
        const view = runtime.view;
        if (view === undefined) {
            throw new Error('no view');
        }
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
            definition: compileDefinition(boldModel, CAPABILITIES),
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
        expect(probeRuntimes()).toEqual({ views: [], subscriptions: 0, frames: 0 });
        expect(handle.getSummary().phase).toBe('disposed');
    });
});

describe('stored content the session keeps', () => {
    const linked = compileContentModel([core(), bold(), fixtureLink()], { id: 'test.bold', version: 1 });
    const link = {
        type: 'link',
        attrs: { href: 'https://frontify.com', openInNewWindow: false, styleId: null, rel: 'x' },
    };

    it('writes undeclared attributes back under their own names after an unrelated edit', () => {
        const plain = { type: 'paragraph', attrs: { lang: null, tone: 'warm', unknownAttributes: 5 }, content: [] };
        const marked = para({ type: 'text', text: 'a', marks: [link] });
        const input = stored(plain, marked);
        const root = { ...input.content, attrs: { lang: null, dir: 'auto', unknownAttributes: { a: 1 } } };
        const { handle, changes } = start({ ...input, content: root }, { model: linked });

        setSelection(handle, { text: 'a', from: 1, to: 1 });
        typeText(handle, 'b');

        const { content: _plainContent, ...withoutContent } = plain;
        expect(contentOf(changes[0])).toEqual({
            ...root,
            content: [withoutContent, para({ type: 'text', text: 'a', marks: [link] }, { type: 'text', text: 'b' })],
        });
    });

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
