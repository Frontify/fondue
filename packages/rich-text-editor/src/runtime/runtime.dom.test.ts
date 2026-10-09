/* (c) Copyright Frontify Ltd., all rights reserved. */

import fc from 'fast-check';
import { joinBackward, splitBlock } from 'prosemirror-commands';
import { Fragment, Node, Schema, Slice } from 'prosemirror-model';
import { type EditorState, Plugin, TextSelection, type Transaction } from 'prosemirror-state';
import { tableEditing, tableNodes } from 'prosemirror-tables';
import { Step, StepResult } from 'prosemirror-transform';
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
    compileDefinition,
    type CompiledDefinition,
    countAppends,
    type EngineCommand,
    NORMALIZE_META,
    ORIGIN_META,
} from '#/definition';
import {
    fixtureHeadingSet,
    fixtureImage,
    fixtureInputRules,
    fixtureItalic,
    fixtureLink,
    fixtureMedia,
    fixtureMention,
    fixtureTable,
} from '#/features/__fixtures__/features';
import { notesModel } from '#/features/__fixtures__/notes';
import { vocabularyLists, vocabularyMention } from '#/features/__fixtures__/vocabulary';
import { core } from '#/features/core/feature';
import { bold } from '#/features/marks-bold/feature';
import { defineEditor, type CommandsOfModel, type EditorHandle } from '#/index';
import {
    compileContentModel,
    type ContentModel,
    defineFeature,
    type Diagnostic,
    featureFromManifest,
    type JsonValue,
    migrateDocument,
    type ResourceLimits,
    setBlock,
    toggleMark,
} from '#/model';
import { decodeToTree, limitsOf } from '#/model/decode';
import { createTestEnvironment, pressKey, setSelection, type TestEnvironment, typeText } from '#/testing';
import { probeRuntimes } from '#/testing/probe';

import newerNotes from '../../fixtures/migration/v3-current.json';

import { type AsyncRequest } from './async';
import { CAPABILITIES } from './capabilities';
import { browserEnvironment } from './environment';
import { canRedo, canUndo, reset } from './history';
import { createLimitCheck } from './limits';
import { authoringOf } from './policy';
import { createEditorRuntime, type EditorRuntime } from './runtime';
import { SETTLE_MS } from './settle';
import { countTargets } from './targets';
import {
    type AuthoringPolicy,
    type CaptureTargetOptions,
    type CommandResult,
    type DocumentChange,
    type FeaturePolicy,
} from './types';

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

const started: EditorRuntime[] = [];
afterEach(() => {
    for (const runtime of started.splice(0)) {
        runtime.handle.dispose();
    }
    document.body.replaceChildren();
});

interface Start {
    readonly model?: ContentModel;
    readonly mode?: 'editable' | 'readonly';
    /** Adds plugins to the compiled definition, as the engine runs them after the definition's own. */
    readonly plugins?: readonly Plugin[];
    /** Adds commands to the compiled definition's command map. */
    readonly commands?: Readonly<Record<string, EngineCommand>>;
    readonly policy?: Partial<AuthoringPolicy>;
    readonly limits?: Partial<ResourceLimits>;
    readonly environment?: TestEnvironment;
}

/** A runtime on an attached surface, `ready` after the first frame. */
const start = (input: unknown, options: Start = {}) => {
    const { model = boldModel, mode = 'editable', plugins = [], commands = {} } = options;
    const { environment = createTestEnvironment({ seed: 1 }) } = options;
    const { result, tree } = decodeToTree(input, model);
    if (result.status !== 'editable' || tree === undefined) {
        throw new Error('expected an editable document');
    }
    const compiled = compileDefinition(model, CAPABILITIES);
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
        environment,
        mode,
        policy: authoringOf(model, options.policy),
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
    environment.flushFrames();
    const view = runtime.view;
    if (view === undefined) {
        throw new Error('no view');
    }
    return { runtime, handle: runtime.handle, changes, diagnostics, element, view, environment };
};

const contentOf = (change: DocumentChange | undefined) => change?.readDocument().content;

/** Starts an operation through the coordinator whose service call resolves when the test resolves it. */
const pending = (runtime: EditorRuntime, request: Partial<AsyncRequest> = {}) => {
    let settle: (result: unknown) => void = () => undefined;
    const call = new Promise<unknown>((resolve) => {
        settle = resolve;
    });
    const operation = runtime.startAsync({
        key: 'upload',
        service: 'uploads',
        featureId: 'core',
        action: 'create',
        command: 'text.insert',
        run: () => call,
        ...request,
    });
    return {
        operation,
        resolve: async (result: unknown) => {
            settle(result);
            await call;
        },
    };
};
/** Runs `history.undo` until it no longer applies, and returns how many steps it undid. */
const undoSteps = (handle: EditorRuntime['handle']) => {
    let steps = 0;
    while (handle.execute('history.undo').status === 'applied') {
        steps += 1;
    }
    return steps;
};
const discarded = (reason: string) => ({
    code: 'runtime.async-discarded',
    severity: 'info',
    messageKey: 'runtime.async-discarded',
    details: { reason },
});

describe('the commit path', () => {
    it('SPEC-rich-text-runtime/AC-002 publishes a root transaction and its appended one as one change', () => {
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

    it('SPEC-rich-text-runtime/AC-003 installs nothing, counts nothing and emits nothing for a filtered batch', () => {
        const reject = new Plugin({ filterTransaction: (transaction) => !transaction.docChanged });
        const { handle, changes, runtime } = start(stored(para()), { plugins: [reject] });

        typeText(handle, 'a');

        expect(handle.getSummary()).toMatchObject({ commitSequence: 0, sequence: 0 });
        expect(changes).toEqual([]);
        expect(runtime.view?.state.doc.textContent).toBe('');
    });

    it('SPEC-rich-text-runtime/AC-017 counts each accepted batch: a selection move, a stored mark and a typed character', () => {
        const { handle } = start(stored(para({ type: 'text', text: 'ab' })));

        setSelection(handle, { text: 'ab', from: 1, to: 1 });
        expect(handle.getSummary().commitSequence).toBe(1);
        pressKey(handle, 'Mod-b');
        expect(handle.getSummary().commitSequence).toBe(2);
        typeText(handle, 'c');
        expect(handle.getSummary()).toMatchObject({ commitSequence: 3, sequence: 1 });
    });

    it('SPEC-rich-text-runtime/AC-019 compares documents with Node.eq and serializes nothing while no one reads', () => {
        const { handle } = start(stored(para()));
        const toJSON = vi.spyOn(Node.prototype, 'toJSON');
        const eq = vi.spyOn(Node.prototype, 'eq');

        typeText(handle, 'a'.repeat(100));

        expect(toJSON).not.toHaveBeenCalled();
        expect(eq).toHaveBeenCalled();
        toJSON.mockRestore();
        eq.mockRestore();
    });

    it('SPEC-rich-text-runtime/AC-019 publishes no change for an edit that leaves an equal document', () => {
        const { handle, changes, view } = start(stored(para({ type: 'text', text: 'ab' })));

        view.dispatch(view.state.tr.insertText('a', 1, 2));

        expect(view.state.doc.textContent).toBe('ab');
        expect(changes).toEqual([]);
        expect(handle.getSummary()).toMatchObject({ commitSequence: 1, sequence: 0 });
    });

    it('SPEC-rich-text-runtime/AC-020 reads the document of its own commit once, and the same object after', () => {
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

    it('SPEC-rich-text-runtime/AC-022 reports unknown for a bare transaction and input after a recorded beforeinput', () => {
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

    it('SPEC-rich-text-runtime/AC-022 forgets a recorded beforeinput whose batch a plugin rejected', () => {
        const reject = new Plugin({ filterTransaction: (transaction) => !transaction.doc.textContent.includes('z') });
        const { handle, changes, view } = start(stored(para()), { plugins: [reject] });

        typeText(handle, 'z');
        view.dispatch(view.state.tr.insertText('x'));

        expect(changes.map(({ origin }) => origin)).toEqual(['unknown']);
    });

    it('SPEC-rich-text-runtime/AC-035 queries every command without changing state or emitting events', () => {
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
    it('SPEC-rich-text-editing/AC-006 toggles the stored mark at a caret, which the next typed character takes', () => {
        const { handle, changes } = start(stored(para({ type: 'text', text: 'ab' })));
        setSelection(handle, { text: 'ab', from: 2, to: 2 });

        pressKey(handle, 'Mod-b');
        expect(handle.getSummary()).toMatchObject({ sequence: 0, selection: { collapsed: true } });
        expect(handle.query('mark.bold.toggle').active).toBe(true);
        typeText(handle, 'c');

        expect(contentOf(changes[0])).toEqual(stored(para({ type: 'text', text: 'ab' }, strong('c'))).content);
    });

    it('SPEC-rich-text-editing/AC-007 bolds a half-bold range whole, and a range with spaces at its edges with them', () => {
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

    it('SPEC-rich-text-editing/AC-008 removes bold from a range that is bold throughout', () => {
        const { handle, changes } = start(stored(para(strong('abcd'))));
        setSelection(handle, { text: 'bc' });
        expect(handle.query('mark.bold.toggle').active).toBe(true);

        pressKey(handle, 'Mod-b');

        expect(contentOf(changes[0])).toEqual(
            stored(para(strong('a'), { type: 'text', text: 'bc' }, strong('d'))).content,
        );
    });

    it('SPEC-rich-text-editing/AC-007 bolds the whole range when only a space between bold words is plain', () => {
        const { handle, changes } = start(stored(para(strong('a'), { type: 'text', text: ' ' }, strong('b'))));
        setSelection(handle, { text: 'a b' });
        expect(handle.query('mark.bold.toggle').active).toBe('mixed');

        pressKey(handle, 'Mod-b');

        expect(contentOf(changes[0])).toEqual(stored(para(strong('a b'))).content);
    });

    it('SPEC-rich-text-editing/AC-008 removes bold from bold text around a hard break', () => {
        const { handle, changes } = start(stored(para(strong('a'), { type: 'hard_break' }, strong('b'))));
        setSelection(handle, { text: 'a\uFFFCb' });
        expect(handle.query('mark.bold.toggle').active).toBe(true);

        pressKey(handle, 'Mod-b');

        expect(changes).toHaveLength(1);
        expect(contentOf(changes[0])).toEqual(
            stored(para({ type: 'text', text: 'a' }, { type: 'hard_break' }, { type: 'text', text: 'b' })).content,
        );
    });
    it('SPEC-rich-text-editing/AC-008 finds nothing to toggle in a selection that holds only a hard break', () => {
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

    it('SPEC-rich-text-editing/AC-007 reads a range as fully bold when its only plain text sits where bold is not allowed', () => {
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
    it('SPEC-rich-text-runtime/AC-083 emits ready once with the session token after the first frame', () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { tree } = decodeToTree(stored(para()), boldModel);
        const runtime = createEditorRuntime({
            definition: compileDefinition(boldModel, CAPABILITIES),
            documentId: 'document-1',
            tree: tree as NonNullable<typeof tree>,
            capabilities: [],
            environment,
            mode: 'editable',
            policy: authoringOf(boldModel),
            limits: limitsOf(undefined),
        });
        started.push(runtime);
        const ready = vi.fn();
        runtime.handle.subscribe('ready', ready);
        runtime.attach(document.body.appendChild(document.createElement('div')));

        expect(runtime.handle.getSummary().phase).toBe('mounting');
        expect(ready).not.toHaveBeenCalled();
        environment.flushFrames();
        environment.flushFrames();

        expect(ready).toHaveBeenCalledTimes(1);
        expect(ready).toHaveBeenCalledWith(runtime.handle.getSummary().session);
        expect(runtime.handle.getSummary().phase).toBe('ready');
    });

    it('SPEC-rich-text-runtime/AC-084 emits disposed with the final token, then holds no subscription, view or frame', () => {
        const { handle } = start(stored(para()));
        const disposed = vi.fn(() => probeRuntimes().subscriptions);

        handle.subscribe('disposed', disposed);
        handle.dispose();

        expect(disposed).toHaveBeenCalledTimes(1);
        expect(disposed).toHaveBeenCalledWith(handle.getSummary().session);
        expect(disposed.mock.results[0]?.value).toBeGreaterThan(0);
        expect(probeRuntimes()).toMatchObject({ views: [], installedFeatures: [], subscriptions: 0, frames: 0 });
        expect(handle.getSummary().phase).toBe('disposed');
    });
});

describe('stored content the session keeps', () => {
    const linked = compileContentModel([core(), bold(), fixtureLink()], { id: 'test.bold', version: 1 });
    const link = {
        type: 'link',
        attrs: { href: 'https://frontify.com', openInNewWindow: false, styleId: null, rel: 'x' },
    };

    it('SPEC-rich-text-format/AC-015 writes undeclared attributes back under their own names after an unrelated edit', () => {
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

    it('SPEC-rich-text-format/AC-016 applies the declared default of an invalid doc attribute and writes the stored value back', () => {
        const input = stored(para());
        const root = { ...input.content, attrs: { lang: 'en_US', dir: 'auto' } };
        const { handle, changes, runtime } = start({ ...input, content: root });

        expect(runtime.view?.state.doc.attrs).toMatchObject({ lang: null, unknownAttributes: { lang: 'en_US' } });
        typeText(handle, 'a');

        expect(contentOf(changes[0])).toEqual({ ...root, content: [para({ type: 'text', text: 'a' })] });
    });

    it('SPEC-rich-text-format/AC-009 keeps an island of content the installed model cannot hold through an edit', () => {
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

    it('SPEC-rich-text-format/AC-036 lets a newer model migrate what an older one saved after an edit through the session', () => {
        const { handle, changes } = start(newerNotes, { model: notesModel(1) });
        setSelection(handle, { text: 'keys', from: 4, to: 4 });
        typeText(handle, '!');
        const saved = changes[0]?.readDocument();
        if (saved === undefined) {
            throw new Error('no change');
        }

        const result = migrateDocument(saved, notesModel(3), { ids: createTestEnvironment({ seed: 1 }).ids });

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

const ALLOW: FeaturePolicy = { create: true, edit: true, remove: true, paste: true };
const forbid = (featureId: string, action: 'create' | 'edit' | 'remove'): Partial<AuthoringPolicy> => ({
    features: { [featureId]: { ...ALLOW, [action]: false } },
});
const policyModel = compileContentModel([core(), bold(), fixtureTable(), fixtureMention(), fixtureHeadingSet()], {
    id: 'test.bold',
    version: 1,
});
const table = (nodeId: string, ...paragraphs: readonly JsonValue[]) => ({
    type: 'table',
    attrs: { nodeId },
    content: paragraphs,
});
const mention = (nodeId: string) => ({ type: 'mention', attrs: { nodeId } });
const heading = (level: number, ...content: readonly JsonValue[]) => ({
    type: 'heading',
    attrs: { nodeId: 'h-1', level },
    content,
});
const boldBreak = { type: 'hard_break', marks: [{ type: 'bold' }] };
/** The document's text, with `@` for each inline node. */
const textOf = (doc: Node) => doc.textBetween(0, doc.content.size, '', '@');

/** A step class the policy check does not know, which swaps in the document it was given. */
class SwapStep extends Step {
    constructor(private readonly next: Node) {
        super();
    }
    apply() {
        return StepResult.ok(this.next);
    }
    invert(doc: Node) {
        return new SwapStep(doc);
    }
    map() {
        return this;
    }
    toJSON() {
        return { stepType: 'swap' };
    }
}

describe('the authoring policy and limits', () => {
    it('SPEC-rich-text-runtime/AC-004 rejects a paste over maxDocumentNodes and one of a forbidden node type, keeping the view state', () => {
        const overLimit = '<p>b</p><p>c</p><p>d</p>';
        const tableHtml = '<section data-pm-slice="0 0 []" data-table="t-2"><p>x</p></section>';
        const counted = start(stored(para(words('a'))), { model: policyModel, limits: { maxDocumentNodes: 6 } });
        const before = counted.view.state;
        counted.view.pasteHTML(overLimit);
        expect(counted.view.state).toBe(before);
        counted.view.pasteHTML('<p>b</p>');
        expect(counted.handle.getSummary().commitSequence).toBe(1);
        // The same pastes apply where no limit or policy stops them.
        const open = start(stored(para(words('a'))), { model: policyModel });
        open.view.pasteHTML(overLimit);
        open.view.pasteHTML(tableHtml);
        expect(open.changes.map(({ origin }) => origin)).toEqual(['paste', 'paste']);
        expect(open.view.state.doc.childCount).toBeGreaterThan(3);

        const forbidden = start(stored(para(words('a'))), {
            model: policyModel,
            policy: forbid('fixture.table', 'create'),
        });
        const kept = forbidden.view.state;
        forbidden.view.pasteHTML(tableHtml);
        expect(forbidden.view.state).toBe(kept);
        expect(forbidden.changes).toEqual([]);
        forbidden.view.pasteHTML('<p>x</p>');
        expect(forbidden.changes.map(({ origin }) => origin)).toEqual(['paste']);
    });

    it('SPEC-rich-text-runtime/AC-004 measures only the changed path on each keystroke after the first', () => {
        const { handle } = start(stored(...Array.from({ length: 500 }, (_, index) => para(words(`block ${index}`)))));
        setSelection(handle, { text: 'block 499', from: 9, to: 9 });
        typeText(handle, 'a');
        const encode = vi.spyOn(TextEncoder.prototype, 'encode');

        typeText(handle, 'bcde');

        // Each keystroke measures the new document, paragraph and text node; the other 499 blocks stay cached.
        expect(encode.mock.calls.length).toBeLessThanOrEqual(4 * 3);
        encode.mockRestore();
    });

    it('SPEC-rich-text-runtime/AC-004 rejects typing from the byte limit on, counting bytes with no toJSON call', () => {
        // Stands in for the `large` fixture of TASK-rte-performance: 1,500 blocks and about 100,000 characters.
        const blocks = Array.from({ length: 1500 }, (_, index) =>
            para(strong('b'.repeat(16)), words(`${index} `.padEnd(51, 'x'))),
        );
        const large = {
            ...stored(...blocks),
            requiredCapabilities: [
                { id: 'core', version: 1 },
                { id: 'marks.bold', version: 1 },
            ],
        };
        const size = new TextEncoder().encode(JSON.stringify(large)).byteLength;
        const { handle, view } = start(large, { limits: { maxDocumentBytes: size + 8 } });
        const last = '1499 '.padEnd(51, 'x');
        setSelection(handle, { text: last, from: last.length, to: last.length });
        const toJSON = vi.spyOn(Node.prototype, 'toJSON');

        const accepted: number[] = [];
        for (let index = 0; index < 100; index += 1) {
            const before = view.state;
            typeText(handle, 'y');
            if (view.state === before) {
                continue;
            }
            accepted.push(index);
        }

        expect(accepted).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
        expect(toJSON).not.toHaveBeenCalled();
        toJSON.mockRestore();
    });

    it('SPEC-rich-text-runtime/AC-006 reads every step kind, empty step maps and an unknown step class included', () => {
        // Positions: `ab` 1-3 and a break 3-4; bold `cd` 6-8; `e` 10-11 and a bold break 11-12.
        const input = stored(
            para(words('ab'), { type: 'hard_break' }),
            para(strong('cd')),
            para(words('e'), boldBreak),
        );
        const cases: readonly (readonly [string, Partial<AuthoringPolicy>, (state: EditorState) => Transaction])[] = [
            ['AttrStep', forbid('core', 'edit'), (state) => state.tr.setNodeAttribute(0, 'lang', 'de')],
            ['DocAttrStep', forbid('core', 'edit'), (state) => state.tr.setDocAttribute('lang', 'de')],
            [
                'AddMarkStep',
                forbid('marks.bold', 'create'),
                (state) => state.tr.addMark(1, 3, state.schema.mark('bold')),
            ],
            [
                'AddNodeMarkStep',
                forbid('marks.bold', 'create'),
                (state) => state.tr.addNodeMark(3, state.schema.mark('bold')),
            ],
            [
                'RemoveMarkStep',
                forbid('marks.bold', 'remove'),
                (state) => state.tr.removeMark(6, 8, state.schema.mark('bold')),
            ],
            [
                'RemoveNodeMarkStep',
                forbid('marks.bold', 'remove'),
                (state) => state.tr.removeNodeMark(11, state.schema.mark('bold')),
            ],
            [
                'SwapStep',
                forbid('core', 'edit'),
                (state) => {
                    const first = state.doc.firstChild as Node;
                    const changed = first.type.create({ ...first.attrs, lang: 'de' }, first.content);
                    const next = state.doc.replace(0, first.nodeSize, new Slice(Fragment.from(changed), 0, 0));
                    return state.tr.step(new SwapStep(next));
                },
            ],
        ];
        for (const [name, policy, build] of cases) {
            const forbidden = start(input, { policy });
            const before = forbidden.view.state;
            forbidden.view.dispatch(build(before));
            expect({ name, kept: forbidden.view.state === before }).toEqual({ name, kept: true });

            const allowed = start(input);
            allowed.view.dispatch(build(allowed.view.state));
            expect({ name, changes: allowed.changes.length }).toEqual({ name, changes: 1 });
        }
    });

    it('SPEC-rich-text-runtime/AC-007 keeps an existing table editable and movable under create: false and rejects pasting another', () => {
        const { handle, view, changes } = start(stored(table('t-1', para(words('a'))), para(words('b'))), {
            model: policyModel,
            policy: forbid('fixture.table', 'create'),
        });
        const moved = view.state.doc.firstChild as Node;
        const move = view.state.tr.delete(0, moved.nodeSize);
        view.dispatch(move.insert(move.doc.content.size, moved));
        setSelection(handle, { text: 'a', from: 1, to: 1 });
        typeText(handle, 'z');
        const before = view.state;
        view.pasteHTML('<section data-pm-slice="0 0 []" data-table="t-2"><p>c</p></section>');

        expect(changes.map(({ origin }) => origin)).toEqual(['unknown', 'input']);
        expect(view.state).toBe(before);
        expect(view.state.doc.lastChild?.type.name).toBe('table');
        expect(view.state.doc.lastChild?.textContent).toBe('az');

        const open = start(stored(table('t-1', para(words('a'))), para(words('b'))), { model: policyModel });
        setSelection(open.handle, { text: 'b', from: 1, to: 1 });
        open.view.pasteHTML('<section data-pm-slice="0 0 []" data-table="t-2"><p>c</p></section>');
        const tables: string[] = [];
        open.view.state.doc.descendants((node) => {
            if (node.type.name === 'table') {
                tables.push(node.attrs.nodeId as string);
            }
            return node.isBlock;
        });
        expect(tables).toEqual(['t-1', 't-2']);
    });

    it('SPEC-rich-text-runtime/AC-007 lets bold be removed from part of a run and typed inside under create: false, but not added', () => {
        const created = (setup: (session: ReturnType<typeof start>) => void, policy: Partial<AuthoringPolicy>) => {
            const session = start(stored(para(words('ab '), strong('one two three'))), { policy });
            setup(session);
            return session.changes.length;
        };
        const unboldMiddle = ({ handle }: ReturnType<typeof start>) => {
            setSelection(handle, { text: 'two' });
            pressKey(handle, 'Mod-b');
        };
        const typeInside = ({ handle }: ReturnType<typeof start>) => {
            setSelection(handle, { text: 'two', from: 1, to: 1 });
            typeText(handle, 'x');
        };
        const boldNew = ({ handle }: ReturnType<typeof start>) => {
            setSelection(handle, { text: 'ab' });
            pressKey(handle, 'Mod-b');
        };
        const boldNextToRun = ({ handle }: ReturnType<typeof start>) => {
            setSelection(handle, { text: 'b ' });
            pressKey(handle, 'Mod-b');
        };
        const noCreate = forbid('marks.bold', 'create');

        // Bolding text next to a run extends that run, which is an edit of it.
        expect([unboldMiddle, typeInside, boldNew, boldNextToRun].map((change) => created(change, noCreate))).toEqual([
            1, 1, 0, 1,
        ]);
        expect(created(typeInside, forbid('marks.bold', 'edit'))).toBe(0);
    });

    it('SPEC-rich-text-runtime/AC-008 rejects changes to the attributes or content of an existing occurrence per feature', () => {
        const typeInto = (text: string) => (session: ReturnType<typeof start>) => {
            setSelection(session.handle, { text, from: 1, to: 1 });
            typeText(session.handle, 'x');
        };
        const cases: readonly (readonly [string, JsonValue, (session: ReturnType<typeof start>) => void])[] = [
            ['core', para(words('ab')), typeInto('ab')],
            ['marks.bold', para(strong('ab')), typeInto('ab')],
            ['fixture.table', table('t-1', para(words('ab'))), typeInto('ab')],
            [
                'fixture.mention',
                para(words('a'), mention('m-1')),
                ({ view }) => view.dispatch(view.state.tr.setNodeAttribute(2, 'label', 'Ada')),
            ],
            [
                'fixture.heading-set',
                heading(2, words('ab')),
                (session) => {
                    setSelection(session.handle, { text: 'ab', from: 1, to: 1 });
                    session.handle.execute('heading.set', { level: 3 });
                },
            ],
        ];
        for (const [featureId, block, change] of cases) {
            const session = start(stored(block), { model: policyModel, policy: forbid(featureId, 'edit') });
            change(session);
            expect({ featureId, changes: session.changes }).toEqual({ featureId, changes: [] });
            // The same change applies under a policy that allows everything.
            const open = start(stored(block), { model: policyModel });
            change(open);
            expect({ featureId, applied: open.changes.length }).toEqual({ featureId, applied: 1 });
        }
    });

    it('SPEC-rich-text-runtime/AC-009 rejects deleting a mention by Backspace, by range delete and by cut under remove: false', () => {
        const input = stored(para(words('a'), mention('m-1'), words('b')));
        const backspace = (session: ReturnType<typeof start>) => {
            session.runtime.select({ anchor: 3, head: 3 });
            const key = new KeyboardEvent('keydown', { key: 'Backspace', keyCode: 8, bubbles: true, cancelable: true });
            session.view.dom.dispatchEvent(key);
        };
        const ways: readonly (readonly [string, (session: ReturnType<typeof start>) => void])[] = [
            ['Backspace', backspace],
            ['range delete', ({ view }) => view.dispatch(view.state.tr.delete(1, 4))],
            [
                'cut',
                ({ runtime, view }) => {
                    runtime.select({ anchor: 1, head: 4 });
                    const cut = new ClipboardEvent('cut', {
                        clipboardData: new DataTransfer(),
                        bubbles: true,
                        cancelable: true,
                    });
                    view.dom.dispatchEvent(cut);
                },
            ],
        ];
        for (const [name, remove] of ways) {
            const kept = start(input, { model: policyModel, policy: forbid('fixture.mention', 'remove') });
            remove(kept);
            expect({ name, text: textOf(kept.view.state.doc) }).toEqual({ name, text: 'a@b' });

            const removed = start(input, { model: policyModel });
            remove(removed);
            expect({ name, removed: !textOf(removed.view.state.doc).includes('@') }).toEqual({ name, removed: true });
        }
    });

    it('SPEC-rich-text-runtime/AC-011 applies a new policy to the next query and commit with the same view, schema and plugins', () => {
        const { handle, runtime, view, changes } = start(stored(para(words('ab'))));
        typeText(handle, 'x');
        const { schema, plugins } = view.state;
        setSelection(handle, { text: 'xab' });
        expect(handle.query('mark.bold.toggle').enabled).toBe(true);

        handle.updatePolicy({ ...authoringOf(boldModel), features: forbid('marks.bold', 'create').features ?? {} });
        expect(handle.query('mark.bold.toggle')).toMatchObject({ enabled: false, disabledReason: 'not-allowed' });
        pressKey(handle, 'Mod-b');

        expect(changes).toHaveLength(1);
        expect(runtime.view).toBe(view);
        expect(view.isDestroyed).toBe(false);
        expect(runtime.view?.state.schema).toBe(schema);
        expect(view.state.plugins).toBe(plugins);
        expect(undoSteps(handle)).toBe(1);
    });

    it('SPEC-rich-text-runtime/AC-079 notifies a command state selector of a new policy before updatePolicy returns, with no commit', () => {
        const { handle, runtime } = start(stored(para(words('ab'))), { model: policyModel });
        let returned = false;
        const seen: (readonly [boolean, boolean])[] = [];
        runtime.watch(
            () => handle.query('heading.set', { level: 2 }).enabled,
            Object.is,
            (enabled) => seen.push([enabled, returned]),
        );
        const sequence = handle.getSummary().commitSequence;

        handle.updatePolicy({
            ...authoringOf(policyModel),
            features: forbid('fixture.heading-set', 'create').features ?? {},
        });
        returned = true;

        expect(seen).toEqual([[false, false]]);
        expect(handle.getSummary().commitSequence).toBe(sequence);
    });

    it('SPEC-rich-text/AC-025 SPEC-rich-text/AC-030 rejects an unknown policy feature and unsafe policy values in defineEditor and updatePolicy', () => {
        const unknown = { features: { 'acme.missing': ALLOW } };
        const unsafe = { features: { core: { ...ALLOW, create: () => true } } } as unknown as Partial<AuthoringPolicy>;
        const { handle } = start(stored(para()));
        const codeOf = (call: () => unknown) => {
            try {
                call();
            } catch (error) {
                return error;
            }
            return undefined;
        };

        expect(codeOf(() => defineEditor({ id: 'x', model: boldModel, policy: unknown }))).toMatchObject({
            code: 'definition.unknown-policy-feature',
        });
        expect(
            codeOf(() => handle.updatePolicy({ ...authoringOf(boldModel), features: unknown.features })),
        ).toMatchObject({
            code: 'definition.unknown-policy-feature',
            details: { feature: 'acme.missing' },
        });
        expect(
            codeOf(() => handle.updatePolicy({ ...authoringOf(boldModel), features: unsafe.features ?? {} })),
        ).toMatchObject({
            code: 'definition.invalid-manifest',
            details: { path: '/policy/features/core/create' },
        });
    });
});

const applied = (result: CommandResult) => result.status === 'applied' || result.status === 'no-op';

/** A plugin that appends a transaction to every batch that holds one it did not append itself, forever. */
const appendForever = (featureId: string, capability: string) =>
    countAppends(
        new Plugin({
            appendTransaction: (transactions, _old, state) => {
                if (transactions.every((transaction) => transaction.getMeta('appendedBy') === featureId)) {
                    return null;
                }
                return state.tr.setMeta('appendedBy', featureId);
            },
        }),
        { featureId, capability },
    );

describe('occurrences the policy pairs across a batch', () => {
    const model = compileContentModel([core(), bold(), fixtureLink(), fixtureMention()], {
        id: 'test.bold',
        version: 1,
    });
    const link = (href: string) => ({ type: 'link', attrs: { href, openInNewWindow: false, styleId: null } });
    const linked = { type: 'text', text: 'go', marks: [link('https://frontify.com/a')] };
    const atoms = stored(para(words('a'), mention('m-1'), words('b')));
    const cases: readonly (readonly [
        string,
        JsonValue,
        Partial<AuthoringPolicy>,
        (state: EditorState) => Transaction,
        boolean,
    ])[] = [
        [
            'merge',
            stored(para(strong('a')), para(strong('b'))),
            forbid('marks.bold', 'create'),
            (state) => state.tr.join(3),
            true,
        ],
        [
            'gap delete',
            stored(para(strong('a'), words(' x '), strong('b'))),
            forbid('marks.bold', 'create'),
            (state) => state.tr.delete(2, 5),
            true,
        ],
        ['split', stored(para(strong('ab'))), forbid('marks.bold', 'remove'), (state) => state.tr.split(2), true],
        [
            'move',
            stored(para(words('a')), para(strong('b'))),
            { features: { 'marks.bold': { ...ALLOW, create: false, remove: false } } },
            (state) => {
                const moved = state.doc.child(1);
                return state.tr.delete(3, 6).insert(0, moved);
            },
            true,
        ],
        [
            'link href',
            stored(para(linked)),
            { features: { 'fixture.link': { ...ALLOW, create: false, remove: false } } },
            (state) => state.tr.addMark(1, 3, state.schema.mark('link', link('https://frontify.com/b').attrs)),
            true,
        ],
        [
            'link href, edit: false',
            stored(para(linked)),
            forbid('fixture.link', 'edit'),
            (state) => state.tr.addMark(1, 3, state.schema.mark('link', link('https://frontify.com/b').attrs)),
            false,
        ],
        [
            'mention replaced',
            atoms,
            { features: { 'fixture.mention': { ...ALLOW, create: false, remove: false } } },
            (state) => state.tr.replaceWith(2, 3, state.schema.node('mention', { nodeId: 'm-2' })),
            false,
        ],
        [
            'mention replaced, edit: false',
            atoms,
            forbid('fixture.mention', 'edit'),
            (state) => state.tr.replaceWith(2, 3, state.schema.node('mention', { nodeId: 'm-2' })),
            true,
        ],
        [
            'bold over a mention',
            atoms,
            forbid('fixture.mention', 'edit'),
            (state) => state.tr.addMark(1, 4, state.schema.mark('bold')),
            true,
        ],
        [
            'text with another link inserted at the end of a link',
            stored(para(linked)),
            forbid('fixture.link', 'create'),
            (state) =>
                state.tr.insert(
                    3,
                    state.schema.text('zz', [state.schema.mark('link', link('https://frontify.com/b').attrs)]),
                ),
            false,
        ],
        [
            'a pasted copy of a mention before the untouched one, which the repair renames',
            stored(para(words('a'), { type: 'mention', attrs: { nodeId: 'm-1', label: 'Ada' } }, words('b'))),
            forbid('fixture.mention', 'edit'),
            (state) => state.tr.insert(1, state.schema.node('mention', { nodeId: 'm-1', label: '' })),
            true,
        ],
        [
            'a pasted copy of a mention after the untouched one',
            stored(para(words('a'), { type: 'mention', attrs: { nodeId: 'm-1', label: 'Ada' } }, words('b'))),
            forbid('fixture.mention', 'edit'),
            (state) => state.tr.insert(3, state.schema.node('mention', { nodeId: 'm-1', label: '' })),
            true,
        ],
        ...(['remove', 'edit'] as const).map(
            (
                action,
            ): readonly [string, JsonValue, Partial<AuthoringPolicy>, (state: EditorState) => Transaction, boolean] => [
                `a label edit of one of two equal mentions, ${action}: false`,
                stored(
                    para({ type: 'mention', attrs: { nodeId: 'm-1', label: 'Ada' } }, words(' '), {
                        type: 'mention',
                        attrs: { nodeId: 'm-2', label: 'Ada' },
                    }),
                ),
                forbid('fixture.mention', action),
                (state) => state.tr.setNodeMarkup(1, undefined, { ...state.doc.nodeAt(1)?.attrs, label: 'Bo' }),
                action === 'remove',
            ],
        ),
    ];
    for (const [name, input, policy, build, accepted] of cases) {
        const verdict = accepted ? 'accepts' : 'rejects';
        it(`SPEC-rich-text-runtime/AC-007 SPEC-rich-text-runtime/AC-009 ${verdict} ${name}`, () => {
            const { view, changes } = start(input, { model, policy });
            view.dispatch(build(view.state));
            expect(changes.length === 1).toBe(accepted);
        });
    }
});

describe('commands, events and the commit path', () => {
    it('SPEC-rich-text-runtime/AC-001 installs every new state through commit and gives the view no event handler', async () => {
        const { handle, runtime, view } = start(stored(para(words('ab'))));
        const original = view.updateState.bind(view);
        const installed: EditorState[] = [];
        vi.spyOn(view, 'updateState').mockImplementation((next) => {
            if (next !== view.state) {
                installed.push(next);
            }
            original(next);
        });

        typeText(handle, 'c');
        view.pasteHTML('<p>d</p>');
        runtime.select({ anchor: 1, head: 2 });
        view.dom.dispatchEvent(new ClipboardEvent('cut', { clipboardData: new DataTransfer(), bubbles: true }));
        setSelection(handle, { text: 'b' });
        pressKey(handle, 'Mod-b');
        handle.execute('mark.bold.toggle');
        await handle.enqueue('text.insert', { text: 'e' });
        await pending(runtime).resolve({ text: 'f' });
        handle.execute('history.undo');

        expect(view.state.doc.textContent).toContain('f');
        expect(view.state.doc.textContent).not.toContain('e');
        expect(installed).toHaveLength(handle.getSummary().commitSequence);
        expect(installed.at(-1)).toBe(view.state);
        expect([view.props.handleDOMEvents, view.props.handleKeyDown, view.props.handleTextInput]).toEqual([
            undefined,
            undefined,
            undefined,
        ]);
    });

    it('SPEC-rich-text-runtime/AC-001 commits a root a plugin view dispatches during an install after that install publishes', () => {
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

    it('SPEC-rich-text-runtime/AC-026 reports a selector whose read throws and still notifies the others and emits the change', () => {
        const { handle, runtime, view, changes, diagnostics } = start(stored(para()));
        const other = vi.fn();
        let fail = false;
        runtime.watch(
            () => {
                if (fail) {
                    throw new Error('selector');
                }
                return 0;
            },
            Object.is,
            () => undefined,
        );
        runtime.watch(() => view.state.doc.textContent, Object.is, other);
        fail = true;

        typeText(handle, 'a');

        expect(other.mock.calls).toEqual([['a']]);
        expect(changes).toHaveLength(1);
        expect(diagnostics.map(({ code }) => code)).toEqual(['runtime.listener-error']);
    });

    it('SPEC-rich-text-runtime/AC-012 aborts a batch past the append limit, names the chain and faults', () => {
        const { handle, view, diagnostics, changes } = start(stored(para()), {
            plugins: [appendForever('fixture.a', 'insertNode'), appendForever('fixture.b', 'setBlock')],
        });
        const before = view.state;
        const snapshot = handle.getSnapshot();

        typeText(handle, 'x');

        expect(view.state).toBe(before);
        expect(handle.getSnapshot()).toBe(snapshot);
        expect(changes).toEqual([]);
        expect(handle.getSummary()).toMatchObject({ phase: 'faulted', commitSequence: 0, sequence: 0 });
        expect(handle.getRecoveryCandidate()).toBeNull();
        expect(view.editable).toBe(false);
        expect(diagnostics).toEqual([
            {
                code: 'runtime.append-limit',
                severity: 'error',
                messageKey: 'runtime.append-limit',
                details: { features: ['fixture.a', 'fixture.b'], capabilities: ['insertNode', 'setBlock'], count: 33 },
            },
        ]);
        expect(handle.execute('text.insert', { text: 'y' })).toEqual({ status: 'rejected', code: 'not-ready' });
    });

    it('SPEC-rich-text-runtime/AC-012 counts the tableEditing() repair and gives it the injected clock time', () => {
        const schema = new Schema({
            nodes: {
                doc: { content: 'block+' },
                paragraph: { group: 'block', content: 'text*', toDOM: () => ['p', 0] },
                text: {},
                ...tableNodes({ tableGroup: 'block', cellContent: 'paragraph+', cellAttributes: {} }),
            },
        });
        const cell = (value: string) => ({
            type: 'table_cell',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: value }] }],
        });
        // The second row lacks a cell, which the repair adds once the table changes.
        const tree = {
            type: 'doc',
            content: [
                {
                    type: 'table',
                    content: [
                        { type: 'table_row', content: [cell('a'), cell('b')] },
                        { type: 'table_row', content: [cell('c')] },
                    ],
                },
            ],
        };
        const run = (maxAppendedTransactions: number) => {
            const environment = createTestEnvironment({ seed: 1 });
            const seen: Transaction[] = [];
            const recorder = new Plugin({
                state: {
                    init: () => null,
                    apply: (transaction) => {
                        seen.push(transaction);
                        return null;
                    },
                },
            });
            const repair = countAppends(tableEditing(), { featureId: 'fixture.table', capability: 'table' });
            const runtime = createEditorRuntime({
                definition: { ...compileDefinition(boldModel, CAPABILITIES), schema, plugins: [repair, recorder] },
                documentId: 'document-1',
                tree,
                capabilities: [],
                environment,
                mode: 'editable',
                policy: authoringOf(boldModel),
                limits: limitsOf({ maxAppendedTransactions }),
            });
            started.push(runtime);
            const diagnostics: Diagnostic[] = [];
            runtime.handle.subscribe('diagnostic', (diagnostic: Diagnostic) => diagnostics.push(diagnostic));
            runtime.attach(document.body.appendChild(document.createElement('div')));
            environment.flushFrames();
            const view = runtime.view as NonNullable<EditorRuntime['view']>;
            view.dispatch(view.state.tr.insertText('!', 4));
            return { runtime, seen, diagnostics, now: environment.clock.now() };
        };

        const counted = run(32);
        const repairs = counted.seen.filter((transaction) => transaction.getMeta('appendedTransaction') !== undefined);
        expect(repairs.map(({ time }) => time)).toEqual([counted.now]);
        expect(counted.runtime.view?.state.doc.child(0).child(1).childCount).toBe(2);

        const capped = run(0);
        expect(capped.runtime.handle.getSummary().phase).toBe('faulted');
        expect(capped.diagnostics.map(({ details }) => details)).toEqual([
            { features: ['fixture.table'], capabilities: ['table'], count: 1 },
        ]);
    });

    it('SPEC-rich-text-runtime/AC-023 sets commandId for a command batch only, whatever its route', async () => {
        const { handle, runtime, view, changes } = start(stored(para(words('ab'))));
        typeText(handle, 'c');
        view.pasteHTML('<p>d</p>');
        runtime.select({ anchor: 1, head: 2 });
        view.dom.dispatchEvent(new ClipboardEvent('cut', { clipboardData: new DataTransfer(), bubbles: true }));
        view.dispatch(view.state.tr.insertText('e'));
        setSelection(handle, { text: 'e' });
        pressKey(handle, 'Mod-b');
        handle.execute('text.insert', { text: 'f' });
        await handle.enqueue('text.insert', { text: 'g' });

        expect(changes.map(({ origin, commandId }) => [origin, commandId])).toEqual([
            ['input', null],
            ['paste', null],
            ['cut', null],
            ['unknown', null],
            ['command', 'mark.bold.toggle'],
            ['command', 'text.insert'],
            ['command', 'text.insert'],
        ]);
    });

    it('SPEC-rich-text-runtime/AC-025 notifies a bold active-state selector only when its value changes', () => {
        const { handle, runtime, view } = start(stored(para(words('ab'))));
        setSelection(handle, { text: 'ab', from: 2, to: 2 });
        const notified = vi.fn();
        runtime.watch(() => handle.query('mark.bold.toggle').active, Object.is, notified);

        typeText(handle, 'cde');
        expect([view.state.doc.textContent, handle.getSummary().sequence]).toEqual(['abcde', 3]);
        expect(notified).not.toHaveBeenCalled();
        pressKey(handle, 'Mod-b');
        expect(notified.mock.calls).toEqual([[true]]);
    });

    it('SPEC-rich-text-runtime/AC-026 calls the remaining listeners and completes the commit when one throws', () => {
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

    it('SPEC-rich-text-runtime/AC-027 reports a throwing diagnostic listener once to the other listeners, with no recursion', () => {
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

    it('SPEC-rich-text-runtime/AC-028 rejects execute as busy from a documentChange listener and a plugin view update', () => {
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

    it('SPEC-rich-text-runtime/AC-029 runs intents enqueued during notification after it ends, in call order', async () => {
        const { handle, changes } = start(stored(para()));
        const results: Promise<CommandResult>[] = [];
        handle.subscribe('documentChange', () => {
            if (results.length === 0) {
                results.push(
                    handle.enqueue('text.insert', { text: 'x' }),
                    handle.enqueue('text.insert', { text: 'y' }),
                );
            }
        });

        typeText(handle, 'a');

        const settled = await Promise.all(results);
        expect(settled.map(({ status }) => status)).toEqual(['applied', 'applied']);
        expect(changes.map((change) => contentOf(change))).toEqual([
            stored(para(words('a'))).content,
            stored(para(words('ax'))).content,
            stored(para(words('axy'))).content,
        ]);
    });

    it('SPEC-rich-text-runtime/AC-030 ends the loop with one warning when a diagnostic listener enqueues too', async () => {
        const { handle, diagnostics } = start(stored(para()));
        const results: Promise<CommandResult>[] = [];
        let fromDiagnostics = 0;
        handle.subscribe('documentChange', () => results.push(handle.enqueue('text.insert', { text: 'x' })));
        handle.subscribe('diagnostic', () => {
            // Stops a loop that would not end, so the test fails instead of hanging.
            if (fromDiagnostics < 100) {
                fromDiagnostics += 1;
                results.push(handle.enqueue('text.insert', { text: 'y' }));
            }
        });

        await handle.enqueue('text.insert', { text: 'x' });
        await Promise.all(results);

        expect(diagnostics.filter(({ code }) => code === 'runtime.enqueue-loop')).toHaveLength(1);
        expect(fromDiagnostics).toBe(1);
    });

    it('SPEC-rich-text-runtime/AC-030 resolves an intent past 32 levels of enqueuing listeners as busy and warns once', async () => {
        const { handle, view, diagnostics } = start(stored(para()));
        const results: Promise<CommandResult>[] = [];
        handle.subscribe('documentChange', () => results.push(handle.enqueue('text.insert', { text: 'x' })));

        const first = await handle.enqueue('text.insert', { text: 'x' });
        const queued = await Promise.all(results);

        expect(first.status).toBe('applied');
        expect(queued.filter(applied)).toHaveLength(31);
        expect(queued.at(-1)).toEqual({ status: 'rejected', code: 'busy' });
        expect(view.state.doc.textContent).toBe('x'.repeat(32));
        expect(diagnostics).toEqual([
            { code: 'runtime.enqueue-loop', severity: 'warning', messageKey: 'runtime.enqueue-loop' },
        ]);
    });

    it('SPEC-rich-text-runtime/AC-036 executes exactly when the query is enabled, over generated states, selections, commands and policies', () => {
        const segment = fc.record({ value: fc.stringMatching(/^[ab ]{1,4}$/), marked: fc.boolean() });
        const blocks = fc.array(fc.array(segment, { maxLength: 3 }), { minLength: 1, maxLength: 3 });
        const rules = fc.record({
            create: fc.boolean(),
            edit: fc.boolean(),
            remove: fc.boolean(),
            paste: fc.constant(true),
        });
        const command = fc.oneof(
            fc.record({ id: fc.constant('mark.bold.toggle'), payload: fc.constant(undefined) }),
            fc.record({
                id: fc.constant('text.insert'),
                payload: fc.record({ text: fc.stringMatching(/^[xy]{0,2}$/) }),
            }),
        );
        const property = fc.property(
            blocks,
            fc.nat(),
            fc.nat(),
            command,
            rules,
            rules,
            fc.nat({ max: 3 }),
            (content, anchor, head, { id, payload }, coreRules, boldRules, spare) => {
                const paragraphs = content.map((segments) =>
                    para(
                        ...segments.map(({ value, marked }) => {
                            if (marked) {
                                return strong(value);
                            }
                            return words(value);
                        }),
                    ),
                );
                // The stored node count, which joining adjacent text can only lower, so the document starts within the limit.
                const nodes = content.reduce((total, segments) => total + 1 + segments.length, 1);
                const { handle, runtime, view } = start(stored(...paragraphs), {
                    policy: { features: { core: coreRules, 'marks.bold': boldRules } },
                    limits: { maxDocumentNodes: nodes + spare },
                });
                const { doc } = view.state;
                const selection = TextSelection.between(
                    doc.resolve(anchor % (doc.content.size + 1)),
                    doc.resolve(head % (doc.content.size + 1)),
                );
                runtime.select({ anchor: selection.anchor, head: selection.head });

                const queried = handle.query(id, payload);
                const executed = handle.execute(id, payload);
                handle.dispose();
                expect(applied(executed)).toBe(queried.enabled);
            },
        );
        fc.assert(property);
    });

    it('SPEC-rich-text-runtime/AC-036 disables and rejects a command that a filter, a normalizer over a limit or the policy stops', () => {
        const filter = new Plugin({ filterTransaction: (transaction) => !transaction.docChanged });
        const normalizer = new Plugin({
            appendTransaction: (transactions, _old, state) => {
                if (!transactions.some(({ docChanged }) => docChanged) || state.doc.childCount > 1) {
                    return null;
                }
                return state.tr.insert(
                    state.doc.content.size,
                    state.schema.node('paragraph', null, state.schema.text('n')),
                );
            },
        });
        const cases: readonly (readonly [string, Start])[] = [
            ['filter', { plugins: [filter] }],
            ['normalizer', { plugins: [normalizer], limits: { maxDocumentNodes: 4 } }],
            ['policy', { policy: forbid('marks.bold', 'create') }],
        ];
        for (const [name, options] of cases) {
            const { handle, view } = start(stored(para(words('ab'))), options);
            setSelection(handle, { text: 'ab' });
            const before = view.state;

            const queried = handle.query('mark.bold.toggle');
            const executed = handle.execute('mark.bold.toggle');

            expect({ name, enabled: queried.enabled, applied: applied(executed) }).toEqual({
                name,
                enabled: false,
                applied: false,
            });
            expect(view.state).toBe(before);
        }
    });

    it('SPEC-rich-text-runtime/AC-036 runs a command built on joinBackward with no view, so a focused host button keeps focus', () => {
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

    it('SPEC-rich-text-runtime/AC-039 rejects a wrapped native command that dispatches twice', () => {
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

    it('SPEC-rich-text-runtime/AC-075 rejects a transaction built from an older state as stale, keeping state and counters', () => {
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
        expect(undoSteps(handle)).toBe(1);
    });
});

describe('the engine copies', () => {
    it('SPEC-rich-text/AC-006 reports no second engine copy when the page loads one, after the view caches its parser and serializer', () => {
        const { handle, runtime, view, diagnostics } = start(stored(para(words('ab'))));
        typeText(handle, 'c');
        view.pasteHTML('<p>d</p>');
        runtime.select({ anchor: 1, head: 2 });
        view.dom.dispatchEvent(new ClipboardEvent('cut', { clipboardData: new DataTransfer(), bubbles: true }));
        typeText(handle, 'e');

        expect(Object.keys(view.state.schema.cached)).toEqual(expect.arrayContaining(['domParser', 'domSerializer']));
        expect(diagnostics).toEqual([]);
    });
});

describe('command payloads', () => {
    const pullQuote = featureFromManifest({
        id: 'acme.pull-quote',
        version: 1,
        requires: [{ id: 'core', version: 1 }],
        nodes: {
            acme_pull_quote: {
                group: 'block',
                content: 'inline*',
                attrs: { lang: { type: 'language', nullable: true, default: null } },
                html: ['blockquote', { class: 'acme-pull-quote' }, 0],
                parse: [{ tag: 'blockquote.acme-pull-quote' }],
            },
        },
        formats: { html: 'lossless', text: 'lossy', markdown: 'unsupported' },
        commands: { 'acme.pull-quote.set': { capability: 'setBlock', node: 'acme_pull_quote', toggle: true } },
    });
    const model = compileContentModel([core(), bold(), fixtureHeadingSet(), pullQuote()], {
        id: 'test.bold',
        version: 1,
    });

    const german = { type: 'paragraph', attrs: { lang: 'de' }, content: [words('ab')] };
    const first = ({ view }: ReturnType<typeof start>) => view.state.doc.child(0);

    it('SPEC-rich-text-format/AC-015 keeps unknown and other attributes that a block type change does not name', () => {
        const session = start(stored(german), { model });
        const { handle, changes } = session;
        setSelection(handle, { text: 'ab', from: 1, to: 1 });

        handle.execute('acme.pull-quote.set');
        expect([first(session).type.name, first(session).attrs.lang]).toEqual(['acme_pull_quote', 'de']);
        handle.execute('acme.pull-quote.set');
        expect([first(session).type.name, first(session).attrs.lang]).toEqual(['paragraph', 'de']);
        handle.execute('heading.set', { level: 2 });
        expect(first(session).attrs).toMatchObject({ level: 2, lang: 'de' });

        const kept = start(
            stored({ type: 'heading', attrs: { nodeId: 'h-1', level: 2, tone: 'warm' }, content: [words('ab')] }),
            {
                model,
            },
        );
        setSelection(kept.handle, { text: 'ab', from: 1, to: 1 });
        kept.handle.execute('heading.set', { level: 3 });
        const saved = kept.changes.at(-1)?.readDocument().content;
        expect(saved).toMatchObject({ content: [{ attrs: { level: 3, tone: 'warm' } }] });
        expect(changes).toHaveLength(3);
    });

    it('SPEC-rich-text-runtime/AC-064 checks and runs one copy of the payload', () => {
        const session = start(stored(german), { model });
        const { handle } = session;
        setSelection(handle, { text: 'ab', from: 1, to: 1 });
        let reads = 0;
        const shifting = {
            get level() {
                reads += 1;
                if (reads === 1) {
                    return 2;
                }
                return 9;
            },
        };

        expect(handle.execute('heading.set', shifting)).toEqual({ status: 'rejected', code: 'invalid-payload' });
        expect(first(session).type.name).toBe('paragraph');
        expect(handle.execute('heading.set', { level: 2, lang: undefined }).status).toBe('applied');
        expect(first(session).attrs).toMatchObject({ level: 2, lang: 'de' });
    });

    it('SPEC-rich-text-runtime/AC-035 reads a command as active only for the attributes its payload names', () => {
        const { handle } = start(
            stored({ type: 'heading', attrs: { nodeId: 'h-1', level: 3 }, content: [words('ab')] }),
            { model },
        );
        setSelection(handle, { text: 'ab', from: 1, to: 1 });

        expect([
            handle.query('heading.set', { level: 2 }).active,
            handle.query('heading.set', { level: 3 }).active,
        ]).toEqual([false, true]);
    });

    it('SPEC-rich-text-runtime/AC-064 never runs a command whose payload fails its declaration', async () => {
        const run = vi.fn(() => true);
        const declared: EngineCommand = {
            run,
            active: () => false,
            payload: { fields: { level: { type: 'integer', min: 1, max: 6 } } },
        };
        const { handle } = start(stored(para(words('ab'))), { commands: { 'fixture.declared': declared } });
        const invalid = { status: 'rejected', code: 'invalid-payload' };

        expect(handle.execute('fixture.declared', { level: 'two' })).toEqual(invalid);
        expect(await handle.enqueue('fixture.declared', { level: 9 })).toEqual(invalid);
        expect(handle.query('fixture.declared', { level: 'two' }).disabledReason).toBe('invalid-payload');
        expect(run).not.toHaveBeenCalled();
    });

    it('SPEC-rich-text/AC-054 SPEC-rich-text-runtime/AC-064 rejects a wrong payload before the command runs, from code and from a manifest', async () => {
        const { handle, view } = start(stored(para(words('ab'))), { model });
        const typed = handle as unknown as EditorHandle<CommandsOfModel<typeof model>>;
        setSelection(handle, { text: 'ab', from: 1, to: 1 });
        const before = view.state;
        const sequence = handle.getSummary().commitSequence;
        const invalid = { status: 'rejected', code: 'invalid-payload' };

        // @ts-expect-error: the declaration types `level` as a number.
        expect(typed.execute('heading.set', { level: 'two' })).toEqual(invalid);
        expect(typed.execute('heading.set', { level: 7 })).toEqual(invalid);
        expect(handle.execute('acme.pull-quote.set', { tone: 'brand' })).toEqual(invalid);
        // @ts-expect-error: the declaration types `level` as a number.
        expect(await typed.enqueue('heading.set', { level: 'two' })).toEqual(invalid);
        expect(await handle.enqueue('acme.pull-quote.set', { tone: 'brand' })).toEqual(invalid);
        expect(view.state).toBe(before);
        expect(handle.getSummary().commitSequence).toBe(sequence);

        expect(typed.execute('heading.set', { level: 2 }).status).toBe('applied');
        expect(view.state.doc.firstChild?.attrs).toMatchObject({ level: 2 });
        expect(handle.execute('acme.pull-quote.set').status).toBe('applied');
        expect(view.state.doc.firstChild?.type.name).toBe('acme_pull_quote');
        expect(handle.execute('acme.pull-quote.set').status).toBe('applied');
        expect(view.state.doc.firstChild?.type.name).toBe('paragraph');
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
        ['paste', ({ view }) => view.pasteHTML('<p>d</p>')],
        [
            'cut',
            ({ runtime, view }) => {
                runtime.select({ anchor: 1, head: 2 });
                view.dom.dispatchEvent(new ClipboardEvent('cut', { clipboardData: new DataTransfer(), bubbles: true }));
            },
        ],
        ['command', ({ handle }) => handle.execute('text.insert', { text: 'e' })],
        ['unknown', ({ view }) => view.dispatch(view.state.tr.insertText('f'))],
        ['async', ({ runtime }) => pending(runtime).resolve({ text: 'g' })],
    ];
    for (const [origin, act] of cases) {
        it(`SPEC-rich-text-runtime/AC-021 reports the root's origin ${origin} for a batch with an appended normalization`, async () => {
            const session = start(stored(para(words('ab'))), { plugins: [repair] });

            await act(session);

            expect(session.changes.map((change) => change.origin)).toEqual([origin]);
            expect(session.view.state.doc.textContent.endsWith('!')).toBe(true);
        });
    }

    it("SPEC-rich-text-runtime/AC-021 reports the root's origin history for an undo with an appended normalization", () => {
        const { handle, changes, view } = start(stored(para(words('ab'))), { plugins: [repair] });
        typeText(handle, 'c');

        handle.execute('history.undo');

        expect(changes.map((change) => change.origin)).toEqual(['input', 'history']);
        expect(changes.map((change) => change.commandId)).toEqual([null, null]);
        expect(view.state.doc.textContent).toBe('ab!');
    });
});

const linkSet = defineFeature({
    id: 'fixture.link-set',
    version: 1,
    requires: [{ id: 'fixture.link', version: 1 }],
    commands: { 'link.set': toggleMark('link', { href: 'https://frontify.com' }) },
});
/** An inline atom of another type that carries a `nodeId`, as a mention does. */
const chip = defineFeature({
    id: 'fixture.chip',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    nodes: {
        chip: {
            group: 'inline',
            atom: true,
            attrs: { nodeId: { type: 'string', required: true } },
            html: ['span'],
            parse: [],
        },
    },
});
const targetModel = compileContentModel([core(), bold(), fixtureLink(), linkSet(), fixtureMention(), chip()], {
    id: 'test.bold',
    version: 1,
});
const capture = (handle: EditorRuntime['handle'], options: CaptureTargetOptions) => {
    const result = handle.captureTarget(options);
    if (result.status !== 'captured') {
        throw new Error('expected a captured target');
    }
    return result.target;
};
/** The text of every run that carries `mark`. */
const markedText = (doc: Node, mark: string) => {
    let text = '';
    doc.descendants((node) => {
        if (node.isText && node.marks.some(({ type }) => type.name === mark)) {
            text += node.text;
        }
    });
    return text;
};
const INVALID: CommandResult = { status: 'rejected', code: 'target-invalid' };

describe('targets', () => {
    it('SPEC-rich-text-runtime/AC-040 maps a target through every accepted transaction once, never through a query or a rejected batch', () => {
        const reject = new Plugin({ filterTransaction: (transaction) => transaction.getMeta('rejected') !== true });
        const { handle, view } = start(stored(para(words('abcd'))), { model: targetModel, plugins: [reject] });
        setSelection(handle, { text: 'bc' });
        const target = capture(handle, { purpose: 'format', onIntersectingEdit: 'map' });
        /** Bolds the target's range, reads the bold text, then removes the bold again. */
        const covered = () => {
            handle.execute('mark.bold.toggle', undefined, { target });
            const text = markedText(view.state.doc, 'bold');
            handle.execute('mark.bold.toggle', undefined, { target });
            return text;
        };

        setSelection(handle, { text: 'abcd', from: 0, to: 0 });
        typeText(handle, 'x');
        expect([textOf(view.state.doc), covered()]).toEqual(['xabcd', 'bc']);

        setSelection(handle, { text: 'xabcd', from: 1, to: 1 });
        view.pasteHTML('<p>yz</p>');
        expect([textOf(view.state.doc), covered()]).toEqual(['xyzabcd', 'bc']);

        setSelection(handle, { text: 'xyzabcd', from: 0, to: 0 });
        expect(handle.query('text.insert', { text: 'q' }).enabled).toBe(true);
        view.dispatch(view.state.tr.insertText('r', 1).setMeta('rejected', true));
        expect([textOf(view.state.doc), covered()]).toEqual(['xyzabcd', 'bc']);
    });

    it('SPEC-rich-text-runtime/AC-040 maps a target through an undo', () => {
        const { handle, view } = start(stored(para(words('abcd'))), { model: targetModel });
        setSelection(handle, { text: 'bc' });
        const target = capture(handle, { purpose: 'format', onIntersectingEdit: 'map' });
        setSelection(handle, { text: 'abcd', from: 0, to: 0 });
        typeText(handle, 'x');

        handle.execute('history.undo');
        handle.execute('mark.bold.toggle', undefined, { target });

        expect([textOf(view.state.doc), markedText(view.state.doc, 'bold')]).toEqual(['abcd', 'bc']);
    });

    it('SPEC-rich-text-runtime/AC-041 rejects every later command through an invalidate target that an edit crossed', () => {
        const { handle, view } = start(stored(para(words('abcd'))), { model: targetModel });
        setSelection(handle, { text: 'bc' });
        const invalidating = capture(handle, { purpose: 'replace-text', onIntersectingEdit: 'invalidate' });
        const mapped = capture(handle, { purpose: 'replace-text', onIntersectingEdit: 'map' });

        setSelection(handle, { text: 'abcd', from: 0, to: 0 });
        typeText(handle, 'z');
        expect(handle.query('text.insert', { text: 'X' }, { target: invalidating }).enabled).toBe(true);

        setSelection(handle, { text: 'zabcd', from: 2, to: 3 });
        view.dispatch(view.state.tr.deleteSelection());
        expect(handle.query('text.insert', { text: 'X' }, { target: invalidating })).toMatchObject({
            enabled: false,
            disabledReason: 'target-invalid',
        });
        expect(handle.execute('text.insert', { text: 'X' }, { target: invalidating })).toEqual(INVALID);
        typeText(handle, 'y');
        expect(handle.execute('text.insert', { text: 'X' }, { target: invalidating })).toEqual(INVALID);

        expect(handle.execute('text.insert', { text: 'X' }, { target: mapped }).status).toBe('applied');
        expect(textOf(view.state.doc)).toBe('zayXd');
    });

    it('SPEC-rich-text-runtime/AC-042 invalidates a map target once its range is deleted, though its positions still resolve', () => {
        const { handle, view } = start(stored(para(words('ab')), para(words('cd'))), { model: targetModel });
        setSelection(handle, { text: 'cd' });
        const target = capture(handle, { purpose: 'format', onIntersectingEdit: 'map' });

        setSelection(handle, { text: 'cd', from: 0, to: 1 });
        view.dispatch(view.state.tr.deleteSelection());
        expect(handle.execute('mark.bold.toggle', undefined, { target }).status).toBe('applied');
        expect(markedText(view.state.doc, 'bold')).toBe('d');

        view.dispatch(view.state.tr.delete(4, view.state.doc.content.size));
        expect(textOf(view.state.doc)).toBe('ab');
        expect(handle.execute('mark.bold.toggle', undefined, { target })).toEqual(INVALID);

        // Text that replaces the whole range takes its place, but the range it named is gone.
        setSelection(handle, { text: 'ab' });
        const replaced = capture(handle, { purpose: 'format', onIntersectingEdit: 'map' });
        view.dispatch(view.state.tr.insertText('XY', 1, 3));
        expect(handle.execute('mark.bold.toggle', undefined, { target: replaced })).toEqual(INVALID);
    });

    it('SPEC-rich-text-runtime/AC-043 keeps an edit-node target valid only while its node with that nodeId and type sits at its position', () => {
        const { handle, view } = start(stored(para(words('a'), mention('m-1'), words('b'))), { model: targetModel });
        setSelection(handle, { nodeId: 'm-1' });
        const replaced = capture(handle, { purpose: 'edit-node', onIntersectingEdit: 'map' });

        setSelection(handle, { text: 'a', from: 0, to: 0 });
        typeText(handle, 'x');
        expect(handle.query('text.insert', { text: 'X' }, { target: replaced }).enabled).toBe(true);
        view.dispatch(view.state.tr.replaceWith(3, 4, view.state.schema.node('mention', { nodeId: 'm-2' })));
        expect(handle.execute('text.insert', { text: 'X' }, { target: replaced })).toEqual(INVALID);

        setSelection(handle, { nodeId: 'm-2' });
        const renamed = capture(handle, { purpose: 'edit-node', onIntersectingEdit: 'map' });
        view.dispatch(view.state.tr.setNodeAttribute(3, 'nodeId', 'm-3'));
        expect(handle.execute('text.insert', { text: 'X' }, { target: renamed })).toEqual(INVALID);
        expect(textOf(view.state.doc)).toBe('xa@b');
    });

    it('SPEC-rich-text-runtime/AC-043 invalidates an edit-node target once a node of another type holds its nodeId at its position', () => {
        const { handle, view } = start(stored(para(words('a'), mention('m-1'), words('b'))), { model: targetModel });
        setSelection(handle, { nodeId: 'm-1' });
        const target = capture(handle, { purpose: 'edit-node', onIntersectingEdit: 'map' });
        expect(handle.query('text.insert', { text: 'X' }, { target }).enabled).toBe(true);

        view.dispatch(view.state.tr.replaceWith(2, 3, view.state.schema.node('chip', { nodeId: 'm-1' })));

        expect(view.state.doc.nodeAt(2)?.type.name).toBe('chip');
        expect(handle.execute('text.insert', { text: 'X' }, { target })).toEqual(INVALID);
    });

    it('SPEC-rich-text-runtime/AC-044 keeps an insert target after the text typed at its position', () => {
        const { handle, view } = start(stored(para(words('abcd'))), { model: targetModel });
        setSelection(handle, { text: 'abcd', from: 2, to: 2 });
        const target = capture(handle, { purpose: 'insert', onIntersectingEdit: 'map' });

        typeText(handle, 'x');
        expect(handle.execute('text.insert', { text: 'Y' }, { target }).status).toBe('applied');

        expect(textOf(view.state.doc)).toBe('abxYcd');
    });

    for (const purpose of ['format', 'replace-text'] as const) {
        for (const onIntersectingEdit of ['map', 'invalidate'] as const) {
            it(`SPEC-rich-text-runtime/AC-076 keeps text typed at both ends out of a ${purpose} target that ${onIntersectingEdit}s`, () => {
                const { handle, view } = start(stored(para(words('abcdef'))), { model: targetModel });
                setSelection(handle, { text: 'cd' });
                const target = capture(handle, { purpose, onIntersectingEdit });

                setSelection(handle, { text: 'cd', from: 0, to: 0 });
                typeText(handle, 'X');
                setSelection(handle, { text: 'cd', from: 2, to: 2 });
                typeText(handle, 'Y');
                expect(handle.execute('link.set', undefined, { target }).status).toBe('applied');

                expect([textOf(view.state.doc), markedText(view.state.doc, 'link')]).toEqual(['abXcdYef', 'cd']);
            });
        }
    }

    it('SPEC-rich-text-runtime/AC-076 keeps a format target captured at a caret empty after text typed there', () => {
        const { handle, view } = start(stored(para(words('abcd'))), { model: targetModel });
        setSelection(handle, { text: 'abcd', from: 2, to: 2 });
        const target = capture(handle, { purpose: 'format', onIntersectingEdit: 'map' });

        typeText(handle, 'X');

        expect(handle.execute('mark.bold.toggle', undefined, { target }).status).toBe('applied');
        expect([textOf(view.state.doc), markedText(view.state.doc, 'bold')]).toEqual(['abXcd', '']);
    });

    it('SPEC-rich-text-runtime/AC-042 invalidates an insert target once a step removes the paragraph around it', () => {
        const { handle, view } = start(stored(para(words('ab')), para(words('cd'))), { model: targetModel });
        setSelection(handle, { text: 'cd', from: 1, to: 1 });
        const target = capture(handle, { purpose: 'insert', onIntersectingEdit: 'map' });

        view.dispatch(view.state.tr.delete(4, view.state.doc.content.size));

        expect(handle.execute('text.insert', { text: 'X' }, { target })).toEqual(INVALID);
        expect(textOf(view.state.doc)).toBe('ab');
    });

    it('SPEC-rich-text-runtime/AC-043 captures an edit-node target at a text caret as invalid, since no node with a nodeId follows', () => {
        const { handle, view } = start(stored(para(words('ab'))), { model: targetModel });
        setSelection(handle, { text: 'ab', from: 1, to: 1 });
        const target = capture(handle, { purpose: 'edit-node', onIntersectingEdit: 'map' });

        expect(handle.execute('text.insert', { text: 'X' }, { target })).toEqual(INVALID);
        expect(textOf(view.state.doc)).toBe('ab');
    });

    it('SPEC-rich-text-runtime/AC-042 SPEC-rich-text-runtime/AC-043 keeps an edit-node target invalid once its node is cut, even when a node with its nodeId lands there', () => {
        const { handle, runtime, view } = start(stored(para(words('a'), mention('m-1'), words('b'))), {
            model: targetModel,
        });
        setSelection(handle, { nodeId: 'm-1' });
        const target = capture(handle, { purpose: 'edit-node', onIntersectingEdit: 'map' });

        runtime.select({ node: 2 });
        view.dom.dispatchEvent(new ClipboardEvent('cut', { clipboardData: new DataTransfer(), bubbles: true }));
        expect(textOf(view.state.doc)).toBe('ab');
        view.dispatch(view.state.tr.replaceWith(2, 3, view.state.schema.node('mention', { nodeId: 'm-1' })));

        expect(view.state.doc.nodeAt(2)?.attrs.nodeId).toBe('m-1');
        expect(handle.execute('text.insert', { text: 'X' }, { target })).toEqual(INVALID);
    });

    it('SPEC-rich-text-runtime/AC-043 captures an edit-node target on a selected node whose type carries no nodeId', () => {
        const { handle, runtime } = start(stored(para(words('a'), { type: 'hard_break' }, words('b'))), {
            model: targetModel,
        });
        runtime.select({ node: 2 });
        const target = capture(handle, { purpose: 'edit-node', onIntersectingEdit: 'map' });

        expect(handle.query('text.insert', { text: 'X' }, { target }).enabled).toBe(true);
    });

    it('SPEC-rich-text-runtime/AC-043 keeps an edit-node target valid through an attribute edit of its leaf node', () => {
        const { handle, view } = start(stored(para(words('a'), mention('m-1'), words('b'))), { model: targetModel });
        setSelection(handle, { nodeId: 'm-1' });
        const target = capture(handle, { purpose: 'edit-node', onIntersectingEdit: 'map' });

        const node = view.state.doc.nodeAt(2) as Node;
        view.dispatch(view.state.tr.setNodeMarkup(2, undefined, { ...node.attrs, label: 'Bo' }));

        expect(view.state.doc.nodeAt(2)?.attrs.label).toBe('Bo');
        expect(handle.query('text.insert', { text: 'X' }, { target }).enabled).toBe(true);
    });

    it('SPEC-rich-text-runtime/AC-040 stores a target at once, and rejects a capture during event notification', () => {
        const { handle } = start(stored(para(words('abcd'))), { model: targetModel });
        const during: unknown[] = [];
        handle.subscribe('documentChange', () => {
            during.push(handle.captureTarget({ purpose: 'format', onIntersectingEdit: 'map' }));
        });

        typeText(handle, 'x');
        setSelection(handle, { text: 'xabcd', from: 1, to: 3 });
        const target = capture(handle, { purpose: 'format', onIntersectingEdit: 'map' });

        expect(during).toEqual([{ status: 'rejected', code: 'not-ready' }]);
        expect(handle.query('mark.bold.toggle', undefined, { target }).enabled).toBe(true);
    });
});

describe('node IDs', () => {
    const idModel = compileContentModel(
        [core(), bold(), fixtureHeadingSet(), vocabularyLists(), fixtureMedia(), vocabularyMention()],
        {
            id: 'test.bold',
            version: 1,
        },
    );
    /** Inserts a copy of the top-level block at the selection after it, as `block.duplicate` does. */
    const duplicate: EngineCommand = {
        run: (state, dispatch) => {
            const { $from } = state.selection;
            const index = $from.index(0);
            if (dispatch !== undefined) {
                dispatch(state.tr.insert($from.posAtIndex(index + 1, 0), state.doc.child(index)));
            }
            return true;
        },
        active: () => false,
    };
    const titled = (nodeId: string, value: string) => ({
        type: 'heading',
        attrs: { nodeId, level: 2 },
        content: [words(value)],
    });
    const task = (nodeId: string, value: string) => ({
        type: 'task_item',
        attrs: { nodeId, checked: false },
        content: [para(words(value))],
    });
    const figure = { type: 'figure', attrs: { nodeId: 'f-1' }, content: [para(words('Logo'))] };
    const embed = { type: 'embed', attrs: { nodeId: 'e-1', url: 'https://www.youtube.com/watch?v=1' } };
    const person = (nodeId: string) => ({
        type: 'mention',
        attrs: { nodeId, resourceType: 'user', resourceId: 'u-1', labelSnapshot: 'Ada' },
    });
    /** The `nodeId`s of the published document, in document order. */
    const idsIn = (value: unknown): unknown[] => {
        if (Array.isArray(value)) {
            return value.flatMap(idsIn);
        }
        if (typeof value !== 'object' || value === null) {
            return [];
        }
        const { attrs, content } = value as {
            readonly attrs?: { readonly nodeId?: unknown };
            readonly content?: unknown;
        };
        const own: unknown[] = [];
        if (attrs !== undefined && 'nodeId' in attrs) {
            own.push(attrs.nodeId);
        }
        return [...own, ...idsIn(content)];
    };
    /** Splits the node `depth` levels around the caret, as Enter in a list item does. */
    const splitAt =
        (depth: number) =>
        ({ view }: ReturnType<typeof start>) =>
            view.dispatch(view.state.tr.split(view.state.selection.from, depth));
    const cases: readonly (readonly [string, JsonValue, (session: ReturnType<typeof start>) => void, unknown[]])[] = [
        [
            'turns a paragraph into a heading',
            para(words('ab')),
            ({ handle }) => {
                setSelection(handle, { text: 'ab', from: 1, to: 1 });
                handle.execute('heading.set', { level: 2 });
            },
            ['node-1'],
        ],
        [
            'splits a heading in the middle',
            titled('h-1', 'cd'),
            (session) => {
                setSelection(session.handle, { text: 'cd', from: 1, to: 1 });
                splitBlock(session.view.state, (transaction) => session.view.dispatch(transaction));
            },
            ['h-1', 'node-1'],
        ],
        [
            'splits a heading at the start',
            titled('h-1', 'cd'),
            (session) => {
                setSelection(session.handle, { text: 'cd', from: 0, to: 0 });
                splitBlock(session.view.state, (transaction) => session.view.dispatch(transaction));
            },
            ['h-1'],
        ],
        [
            'splits a task item in the middle',
            { type: 'task_list', content: [task('t-1', 'gh')] },
            (session) => {
                setSelection(session.handle, { text: 'gh', from: 1, to: 1 });
                splitAt(2)(session);
            },
            ['t-1', 'node-1'],
        ],
        [
            'splits a task item at the start',
            { type: 'task_list', content: [task('t-1', 'gh')] },
            (session) => {
                setSelection(session.handle, { text: 'gh', from: 0, to: 0 });
                splitAt(2)(session);
            },
            ['t-1', 'node-1'],
        ],
        [
            'duplicates a figure',
            figure,
            ({ handle }) => {
                setSelection(handle, { nodeId: 'f-1' });
                handle.execute('block.duplicate');
            },
            ['f-1', 'node-1'],
        ],
        [
            'duplicates an embed',
            embed,
            ({ handle }) => {
                setSelection(handle, { nodeId: 'e-1' });
                handle.execute('block.duplicate');
            },
            ['e-1', 'node-1'],
        ],
        [
            'pastes a copy of a mention before it, which keeps the ID as the first in document order',
            para(words('a'), person('m-1')),
            ({ view }) => view.dispatch(view.state.tr.insert(1, view.state.doc.firstChild?.child(1) as Node)),
            ['m-1', 'node-1'],
        ],
    ];
    for (const [name, block, act, ids] of cases) {
        it(`SPEC-rich-text-runtime/AC-092 ${name} and gives each node without a unique nodeId a new one in the same batch`, () => {
            const appended: Transaction[] = [];
            const seen = new Plugin({
                state: {
                    init: () => null,
                    apply: (transaction) => {
                        if (transaction.getMeta('appendedTransaction') !== undefined) {
                            appended.push(transaction);
                        }
                        return null;
                    },
                },
            });
            const session = start(stored(block), {
                model: idModel,
                plugins: [seen],
                commands: { 'block.duplicate': duplicate },
            });
            const original = session.view.state.doc;
            const before = idsIn(original.toJSON());

            act(session);

            expect(session.changes).toHaveLength(1);
            const published = idsIn(contentOf(session.changes[0]));
            expect(published).toEqual(ids);
            expect(new Set(published).size).toBe(published.length);
            expect(published[0]).toBe(before[0] ?? 'node-1');
            expect(appended.length > 0).toBe(published.some((id) => !before.includes(id)));
            // The repair has origin `normalization` and joins the root's history event, while the event keeps the root's origin.
            for (const transaction of appended) {
                expect(transaction.getMeta(ORIGIN_META)).toBe('normalization');
                expect(transaction.getMeta('addToHistory')).toBeUndefined();
            }
            expect(session.changes[0]?.origin).not.toBe('normalization');
            // One undo step reverts the change with its repair.
            expect(undoSteps(session.handle)).toBe(1);
            expect(session.view.state.doc.eq(original)).toBe(true);
        });
    }

    it('SPEC-rich-text-runtime/AC-092 SPEC-rich-text-runtime/AC-004 reads only the nodes a keystroke, a mark step or an attribute step changed, and leaves a stored repeated nodeId alone', () => {
        const blocks: JsonValue[] = [para(words('a'), person('m-1'), person('m-1'))];
        for (let index = 0; index < 5000; index += 1) {
            blocks.push(titled(`h-${index}`, 'Title'), para(words('Some text')));
        }
        const { handle, changes, view } = start(stored(...blocks), {
            model: idModel,
            policy: forbid('fixture.mention', 'create'),
            limits: { maxDocumentNodes: 1_000_000, maxDocumentBytes: 100_000_000 },
        });
        const { nodesBetween } = Node.prototype;
        /** The nodes `act` visits, with a nested walk counted once, since it gets the counting callback already. */
        const visitsOf = (act: () => void) => {
            let visits = 0;
            let depth = 0;
            const counted = vi
                .spyOn(Node.prototype, 'nodesBetween')
                .mockImplementation(function (this: Node, from, to, visit, at) {
                    if (depth > 0) {
                        return nodesBetween.call(this, from, to, visit, at);
                    }
                    depth += 1;
                    try {
                        return nodesBetween.call(
                            this,
                            from,
                            to,
                            (...args) => {
                                visits += 1;
                                return visit(...args);
                            },
                            at,
                        );
                    } finally {
                        depth -= 1;
                    }
                });
            try {
                act();
            } finally {
                counted.mockRestore();
            }
            return visits;
        };
        setSelection(handle, { text: 'Some text', from: 4, to: 4 });
        const heading = view.state.doc.child(0).nodeSize;

        const typed = visitsOf(() => typeText(handle, 'x'));
        const marked = visitsOf(() =>
            view.dispatch(view.state.tr.addMark(heading + 1, heading + 3, view.state.schema.mark('bold'))),
        );
        const attributed = visitsOf(() => view.dispatch(view.state.tr.setNodeAttribute(heading, 'level', 3)));

        expect(changes.map(({ origin }) => origin)).toEqual(['input', 'unknown', 'unknown']);
        expect({ typed: typed < 50, marked: marked < 50, attributed: attributed < 50 }).toEqual({
            typed: true,
            marked: true,
            attributed: true,
        });
    });

    it('SPEC-rich-text-runtime/AC-092 SPEC-rich-text-runtime/AC-036 installs the IDs a query drew, so execute publishes what query judged', () => {
        const queried = start(stored(para(words('ab'))), { model: idModel });
        setSelection(queried.handle, { text: 'ab', from: 1, to: 1 });
        for (let count = 0; count < 3; count += 1) {
            expect(queried.handle.query('heading.set', { level: 2 }).enabled).toBe(true);
        }
        expect(queried.handle.execute('heading.set', { level: 2 }).status).toBe('applied');
        expect(contentOf(queried.changes[0])).toMatchObject({ content: [{ attrs: { nodeId: 'node-1' } }] });

        // With eight IDs drawn, a query draws `node-9` and the limit fits its document exactly, one byte below `node-10`.
        const atNine = (limits: Partial<ResourceLimits>) => {
            const environment = createTestEnvironment({ seed: 1 });
            const session = start(stored(para(words('ab'))), { model: idModel, limits, environment });
            for (let count = 0; count < 8; count += 1) {
                environment.ids.next('node');
            }
            setSelection(session.handle, { text: 'ab', from: 1, to: 1 });
            return session;
        };
        const open = atNine({ maxDocumentBytes: 100_000_000 });
        open.handle.execute('heading.set', { level: 2 });
        const exceeds = createLimitCheck(idModel, [{ id: 'core', version: 1 }]);
        let low = 1;
        let high = 100_000;
        while (low < high) {
            const middle = Math.floor((low + high) / 2);
            if (exceeds(open.view.state.doc, limitsOf({ maxDocumentBytes: middle }))) {
                low = middle + 1;
            } else {
                high = middle;
            }
        }
        const tight = atNine({ maxDocumentBytes: low });

        expect(tight.handle.query('heading.set', { level: 2 }).enabled).toBe(true);
        expect(tight.handle.execute('heading.set', { level: 2 }).status).toBe('applied');
        expect(contentOf(tight.changes[0])).toMatchObject({ content: [{ attrs: { nodeId: 'node-9' } }] });
    });
});

describe('disposal', () => {
    it('SPEC-rich-text-runtime/AC-060 settles an intent enqueued from a disposed listener or after a fault or dispose', async () => {
        const pending = (promise: Promise<CommandResult>) => Promise.race([promise, Promise.resolve('pending')]);
        const faulted = start(stored(para()), {
            plugins: [appendForever('fixture.a', 'insertNode'), appendForever('fixture.b', 'setBlock')],
        });
        typeText(faulted.handle, 'x');
        const disposed = start(stored(para()));
        const late: Promise<CommandResult>[] = [];
        disposed.handle.subscribe('disposed', () => late.push(disposed.handle.enqueue('text.insert', { text: 'a' })));
        disposed.handle.dispose();
        late.push(disposed.handle.enqueue('text.insert', { text: 'b' }));
        const intents = probeRuntimes().intents;

        const results = await Promise.all([
            pending(faulted.handle.enqueue('text.insert', { text: 'c' })),
            ...late.map(pending),
        ]);

        expect(results).toEqual(Array.from({ length: 3 }, () => ({ status: 'rejected', code: 'not-ready' })));
        expect(intents).toBe(0);
    });

    it('SPEC-rich-text-runtime/AC-060 counts nothing twice when a kept unsubscribe runs after dispose', () => {
        const { handle } = start(stored(para()));
        const before = probeRuntimes().subscriptions;
        const unsubscribe = handle.subscribe('documentChange', () => undefined);

        handle.dispose();
        unsubscribe();

        expect(probeRuntimes().subscriptions).toBe(before - 2);
    });

    it('SPEC-rich-text-runtime/AC-060 commits no root a plugin view dispatched once a listener disposed the session', () => {
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

    it('SPEC-rich-text-runtime/AC-060 stops notifying once a listener disposes the session', () => {
        const { handle } = start(stored(para()));
        const later = vi.fn();
        handle.subscribe('documentChange', () => handle.dispose());
        handle.subscribe('documentChange', later);

        typeText(handle, 'a');

        expect(handle.getSummary().phase).toBe('disposed');
        expect(later).not.toHaveBeenCalled();
    });

    it('SPEC-rich-text-runtime/AC-060 releases every listener, selector, queued intent, frame, view, plugin view and target over 10 mount and dispose cycles', async () => {
        const before = probeRuntimes();
        let pluginViews = 0;
        const counted = new Plugin({
            view: () => {
                pluginViews += 1;
                return {
                    destroy: () => {
                        pluginViews -= 1;
                    },
                };
            },
        });
        const { tree } = decodeToTree(stored(para()), boldModel);
        const compiled = compileDefinition(boldModel, CAPABILITIES);
        const pending: Promise<CommandResult>[] = [];
        const owned: ReturnType<typeof probeRuntimes>[] = [];
        for (let cycle = 0; cycle < 10; cycle += 1) {
            const environment = createTestEnvironment({ seed: cycle });
            const runtime = createEditorRuntime({
                definition: { ...compiled, plugins: [...compiled.plugins, counted] },
                documentId: `document-${cycle}`,
                tree: tree as NonNullable<typeof tree>,
                capabilities: [],
                environment,
                mode: 'editable',
                policy: authoringOf(boldModel),
                limits: limitsOf(undefined),
            });
            runtime.handle.subscribe('documentChange', () => undefined);
            runtime.watch(
                () => runtime.handle.getSummary().sequence,
                Object.is,
                () => undefined,
            );
            pending.push(runtime.handle.enqueue('text.insert', { text: 'a' }));
            runtime.attach(document.body.appendChild(document.createElement('div')));
            if (cycle % 2 === 1) {
                environment.flushFrames();
            }
            runtime.handle.captureTarget({ purpose: 'format', onIntersectingEdit: 'map' });
            owned.push(probeRuntimes());

            runtime.handle.dispose();
            expect(runtime.handle.getSummary().phase).toBe('disposed');
        }

        expect(owned[0]).toMatchObject({
            installedFeatures: [['core', 'marks.bold']],
            subscriptions: 1,
            selectors: 1,
            intents: 1,
            frames: 1,
            targets: 0,
        });
        expect(owned[1]).toMatchObject({ subscriptions: 1, selectors: 1, intents: 0, frames: 0, targets: 1 });
        expect(probeRuntimes()).toEqual(before);
        expect(pluginViews).toBe(0);
        const settled = await Promise.all(pending);
        expect(settled.map(({ status }) => status)).toEqual(
            Array.from({ length: 5 }).flatMap(() => ['rejected', 'applied']),
        );
    });
});

/** Starts a composition as the browser does, so ProseMirror's own handler sets `view.composing`, and composes `text`. */
const compose = ({ view }: ReturnType<typeof start>, text: string) => {
    view.dom.dispatchEvent(new CompositionEvent('compositionstart'));
    // ProseMirror marks the composed text it reads from the DOM with its composition ID.
    view.dispatch(view.state.tr.insertText(text).setMeta('composition', 1));
};
const endComposition = ({ view }: ReturnType<typeof start>) =>
    view.dom.dispatchEvent(new CompositionEvent('compositionend'));
/** Runs the environment microtask, then the 20 ms timer after which input has settled. */
const settleInput = async ({ environment }: ReturnType<typeof start>) => {
    await environment.flushMicrotasks();
    environment.advance(20);
};
const NOT_EDITABLE_CORE: Partial<AuthoringPolicy> = {
    features: { core: { create: true, edit: false, remove: true, paste: true } },
};

describe('the published snapshot and composition', () => {
    it('SPEC-rich-text-runtime/AC-018 keeps sequence for a selection move and a stored mark, and counts a typed character', () => {
        const { handle } = start(stored(para(words('ab'))));

        setSelection(handle, { text: 'ab', from: 1, to: 1 });
        expect(handle.getSummary().sequence).toBe(0);
        pressKey(handle, 'Mod-b');
        expect(handle.getSummary().sequence).toBe(0);
        typeText(handle, 'c');
        expect(handle.getSummary().sequence).toBe(1);
    });

    it('SPEC-rich-text-runtime/AC-065 returns one frozen snapshot until a commit, then the new one to every selector', () => {
        const { handle, runtime } = start(stored(para(words('ab'))));
        const first = handle.getSnapshot();
        const seen: unknown[] = [];
        runtime.watch(
            () => handle.getSnapshot(),
            Object.is,
            (value) => seen.push(value),
        );
        runtime.watch(
            () => handle.getSnapshot(),
            Object.is,
            (value) => seen.push(value),
        );

        expect(handle.getSnapshot()).toBe(first);
        expect(() => {
            (first.stamp as { sequence: number }).sequence = 9;
        }).toThrow(TypeError);
        expect(() => {
            (first.document as { formatVersion: number }).formatVersion = 2;
        }).toThrow(TypeError);
        typeText(handle, 'c');

        const next = handle.getSnapshot();
        expect(next).not.toBe(first);
        expect(seen).toEqual([next, next]);
        expect(seen.every((value) => value === next)).toBe(true);
        expect(next).toMatchObject({
            stamp: { sequence: 1 },
            acknowledgedRevision: null,
            compositionActive: false,
            document: stored(para(words('cab'))),
        });
    });

    it('SPEC-rich-text-runtime/AC-065 counts a composition commit and notifies selectors while the snapshot holds', () => {
        const session = start(stored(para(words('ab'))));
        const { handle, runtime } = session;
        const before = handle.getSnapshot();
        const seen: number[] = [];
        runtime.watch(
            () => handle.getSummary().commitSequence,
            Object.is,
            (value) => seen.push(value),
        );
        const { commitSequence } = handle.getSummary();

        compose(session, 'x');

        expect(seen).toEqual([commitSequence + 1]);
        expect(handle.getSummary()).toMatchObject({ commitSequence: commitSequence + 1, sequence: 0 });
        expect(handle.getSnapshot()).toMatchObject({
            stamp: { sequence: 0 },
            compositionActive: true,
            document: before.document,
        });
    });

    it('SPEC-rich-text-runtime/AC-070 SPEC-rich-text-runtime/AC-018 SPEC-rich-text-runtime/AC-033 publishes a composition and runs a queued intent once compositionend, a microtask and 20 ms passed', async () => {
        const session = start(stored(para(words('ab'))));
        const { handle, view, environment, changes } = session;
        setSelection(handle, { text: 'ab', from: 2, to: 2 });
        const before = handle.getSnapshot();
        const waiting = (promise: Promise<CommandResult>) => Promise.race([promise, Promise.resolve('pending')]);

        compose(session, 'c');
        const queued = handle.enqueue('text.insert', { text: '!' });
        endComposition(session);
        // ProseMirror reads the last composed characters in its flush after compositionend.
        view.dispatch(view.state.tr.insertText('d').setMeta('composition', 1));
        await environment.flushMicrotasks();
        environment.advance(19);

        expect(await waiting(queued)).toBe('pending');
        expect(changes).toEqual([]);
        expect(handle.getSummary()).toMatchObject({ sequence: 0, compositionActive: true });
        expect(handle.getSnapshot()).toMatchObject({ document: before.document, compositionActive: true });

        environment.advance(1);

        expect(await waiting(queued)).toMatchObject({ status: 'applied', contentChanged: true });
        expect(changes.map(contentOf)).toEqual([
            stored(para(words('abcd'))).content,
            stored(para(words('abcd!'))).content,
        ]);
        expect(changes.map(({ origin }) => origin)).toEqual(['input', 'command']);
        expect(handle.getSummary()).toMatchObject({ sequence: 2, compositionActive: false });
    });

    it('SPEC-rich-text-runtime/AC-005 SPEC-rich-text-runtime/AC-004 checks a composition once input settled and restores the state from before it', async () => {
        const session = start(stored(para(words('ab'))), { policy: NOT_EDITABLE_CORE });
        const { handle, view, changes } = session;
        const before = view.state;

        compose(session, 'x');
        expect(view.state.doc.textContent).toBe('xab');
        endComposition(session);
        await settleInput(session);

        expect(view.state).toBe(before);
        expect(changes).toEqual([]);
        expect(handle.getSummary()).toMatchObject({ sequence: 0, compositionActive: false });
    });

    it('SPEC-rich-text-runtime/AC-032 SPEC-rich-text-runtime/AC-034 SPEC-rich-text-runtime/AC-072 rejects a host execute and keeps the surface editable until input settled', async () => {
        const session = start(stored(para(words('ab'))));
        const { handle, view } = session;
        const surface = () => view.dom.getAttribute('contenteditable');

        compose(session, 'x');
        expect(handle.execute('text.insert', { text: 'y' })).toEqual({
            status: 'rejected',
            code: 'composition-active',
        });
        handle.setMode('readonly');
        const queued = handle.enqueue('text.insert', { text: 'z' });
        expect(handle.execute('text.insert', { text: 'y' })).toEqual({ status: 'rejected', code: 'readonly' });
        compose(session, 'w');
        expect([surface(), view.state.doc.textContent]).toEqual(['true', 'xwab']);
        endComposition(session);
        await settleInput(session);

        expect(await queued).toEqual({ status: 'rejected', code: 'readonly' });
        expect([surface(), view.state.doc.textContent]).toEqual(['false', 'xwab']);
    });

    it('SPEC-rich-text-runtime/AC-033 SPEC-rich-text-runtime/AC-070 keeps a composition active through a host stored-mark toggle until compositionend', async () => {
        const session = start(stored(para(words('ab'))));
        const { handle, view, changes } = session;
        const waiting = (promise: Promise<CommandResult>) => Promise.race([promise, Promise.resolve('pending')]);
        setSelection(handle, { text: 'ab', from: 2, to: 2 });

        compose(session, 'x');
        const queued = handle.enqueue('text.insert', { text: '!' });
        // Bold at a caret sets stored marks, and ProseMirror ends its own record of a composition for a state with them.
        expect(handle.execute('mark.bold.toggle').status).toBe('applied');
        expect(view.state.storedMarks).not.toBeNull();

        expect(handle.getSummary().compositionActive).toBe(true);
        expect(await waiting(queued)).toBe('pending');
        expect(changes).toEqual([]);
        endComposition(session);
        await settleInput(session);

        expect(await waiting(queued)).toMatchObject({ status: 'applied' });
        expect(changes.map(({ origin }) => origin)).toEqual(['input', 'command']);
        expect(view.state.doc.textContent).toBe('abx!');
    });

    it('SPEC-rich-text/AC-095 SPEC-rich-text-runtime/AC-070 waits as long as ProseMirror does after compositionend, on the real clock', async () => {
        const controlled = createTestEnvironment({ seed: 1 });
        const environment: TestEnvironment = {
            ...controlled,
            clock: browserEnvironment.clock,
            scheduler: { ...controlled.scheduler, microtask: browserEnvironment.scheduler.microtask },
        };
        const session = start(stored(para(words('ab'))), { environment });
        const { handle, view, changes } = session;
        setSelection(handle, { text: 'ab', from: 2, to: 2 });
        compose(session, 'x');
        const queued = handle.enqueue('text.insert', { text: '!' });
        const timers = vi.spyOn(globalThis, 'setTimeout');

        // The last composed character reaches the DOM right before compositionend, so ProseMirror reads it in its flush.
        (view.dom.firstChild?.firstChild as Text).appendData('y');
        endComposition(session);
        const delays = timers.mock.calls.map(([, delay]) => delay);
        timers.mockRestore();
        await new Promise((resolve) => browserEnvironment.clock.setTimeout(() => resolve(undefined), SETTLE_MS + 10));

        // ProseMirror ends a composition in its own timer of this delay, which the settle timer copies.
        expect(delays).toContain(SETTLE_MS);
        expect(await queued).toMatchObject({ status: 'applied' });
        expect(changes.map(contentOf)).toEqual([
            stored(para(words('abxy'))).content,
            stored(para(words('abxy!'))).content,
        ]);
    });

    it('SPEC-rich-text-runtime/AC-036 SPEC-rich-text-runtime/AC-032 answers query as a host execute during a composition', () => {
        const states = [{}, NOT_EDITABLE_CORE].map((policy) => {
            const session = start(stored(para(words('ab'))), { policy });
            compose(session, 'x');
            const { disabledReason } = session.handle.query('text.insert', { text: 'y' });
            return [disabledReason, session.handle.execute('text.insert', { text: 'y' })];
        });

        expect(states).toEqual([
            ['composition-active', { status: 'rejected', code: 'composition-active' }],
            ['not-allowed', { status: 'rejected', code: 'not-allowed' }],
        ]);
    });

    it('SPEC-rich-text-runtime/AC-034 SPEC-rich-text-runtime/AC-092 repairs a nodeId that a composition repeats only once input settled', async () => {
        const model = compileContentModel([core(), bold(), fixtureHeadingSet()], { id: 'test.bold', version: 1 });
        const session = start(stored(heading(2, words('abcd'))), { model });
        const { view, changes } = session;
        const ids = () => view.state.doc.children.map((node): unknown => node.attrs.nodeId);

        compose(session, 'x');
        // An Enter during a composition, as Android sends it, splits the heading under the composition's meta.
        view.dispatch(view.state.tr.split(3).setMeta('composition', 1));
        expect(ids()).toEqual(['h-1', 'h-1']);
        endComposition(session);
        await settleInput(session);

        const settled = ids();
        expect([settled[0], new Set(settled).size]).toEqual(['h-1', 2]);
        expect(changes).toHaveLength(1);
        expect(JSON.stringify(contentOf(changes[0])).split('"h-1"')).toHaveLength(2);
        expect(textOf(view.state.doc)).toBe('xabcd');
    });

    it('SPEC-rich-text-runtime/AC-034 SPEC-rich-text-runtime/AC-092 judges the settle repair with its composition, so a heading with remove false still gets unique IDs', async () => {
        const model = compileContentModel([core(), bold(), fixtureHeadingSet()], { id: 'test.bold', version: 1 });
        const policy = {
            features: { 'fixture.heading-set': { create: true, edit: true, remove: false, paste: true } },
        };
        const session = start(stored(heading(2, words('abcd'))), { model, policy });
        const { view, changes } = session;

        compose(session, 'x');
        view.dispatch(view.state.tr.split(3).setMeta('composition', 1));
        endComposition(session);
        await settleInput(session);

        const ids = view.state.doc.children.map((node): unknown => node.attrs.nodeId);
        expect([ids[0], new Set(ids).size, changes.length]).toEqual(['h-1', 2, 1]);
    });

    it('SPEC-rich-text-runtime/AC-070 SPEC-rich-text-runtime/AC-033 ends a composition when the view detaches, so held work settles', async () => {
        const session = start(stored(para(words('ab'))));
        const { handle, runtime } = session;

        compose(session, 'x');
        const queued = handle.enqueue('text.insert', { text: '!' });
        runtime.detach();
        await settleInput(session);

        expect(handle.getSummary().compositionActive).toBe(false);
        expect(await queued).toMatchObject({ status: 'applied' });
        expect(handle.execute('text.insert', { text: '?' }).status).toBe('applied');
    });

    it('SPEC-rich-text-runtime/AC-005 SPEC-rich-text-runtime/AC-089 keeps a target captured during a rejected composition, so its result applies', async () => {
        const policy = { features: { 'marks.bold': { create: true, edit: false, remove: true, paste: true } } };
        const session = start(stored(para(strong('ab'), words('cd'))), { model: targetModel, policy });
        const { handle, runtime, view } = session;
        setSelection(handle, { text: 'ab', from: 1, to: 1 });

        compose(session, 'x');
        setSelection(handle, { text: 'cd', from: 2, to: 2 });
        const target = capture(handle, { purpose: 'insert', onIntersectingEdit: 'map' });
        const upload = pending(runtime, { target });
        endComposition(session);
        await settleInput(session);
        expect(textOf(view.state.doc)).toBe('abcd');
        await upload.resolve({ text: '!' });

        expect(textOf(view.state.doc)).toBe('abcd!');
        expect(session.diagnostics).toEqual([]);
    });

    it('SPEC-rich-text-runtime/AC-005 SPEC-rich-text-runtime/AC-001 defers a root a plugin view dispatches while the settled state installs, so the check still judges the composition', async () => {
        const model = compileContentModel([core(), bold(), fixtureHeadingSet()], { id: 'test.bold', version: 1 });
        const policy = {
            features: { 'fixture.heading-set': { create: true, edit: false, remove: true, paste: true } },
        };
        let dispatched = false;
        // Dispatches once it sees the repaired headings, as a plugin view that reacts to a new state does.
        const late = new Plugin({
            view: () => ({
                update: (view) => {
                    const ids = view.state.doc.children
                        .filter((node) => node.type.name === 'heading')
                        .map((node): unknown => node.attrs.nodeId);
                    if (!dispatched && ids.length === 2 && ids[0] !== ids[1]) {
                        dispatched = true;
                        view.dispatch(view.state.tr.insertText('z', view.state.doc.content.size - 1));
                    }
                },
            }),
        });
        const session = start(stored(heading(2, words('abcd')), para(words('p'))), { model, policy, plugins: [late] });
        const { view, changes } = session;

        compose(session, 'x');
        view.dispatch(view.state.tr.split(3).setMeta('composition', 1));
        endComposition(session);
        await settleInput(session);

        expect(dispatched).toBe(true);
        expect(textOf(view.state.doc)).toBe('abcdp');
        expect(changes.filter((change) => JSON.stringify(contentOf(change)).includes('x'))).toEqual([]);
    });

    it('SPEC-rich-text-runtime/AC-077 SPEC-rich-text-runtime/AC-060 resolves intents queued during composition as not-ready on dispose and drops the settle timer', async () => {
        const session = start(stored(para(words('ab'))));
        const { handle, environment } = session;

        compose(session, 'x');
        const queued = [handle.enqueue('text.insert', { text: 'y' }), handle.enqueue('mark.bold.toggle')];
        endComposition(session);
        await environment.flushMicrotasks();
        expect(probeRuntimes()).toMatchObject({ intents: 2, timers: 1 });
        handle.dispose();

        expect(await Promise.all(queued)).toEqual([
            { status: 'rejected', code: 'not-ready' },
            { status: 'rejected', code: 'not-ready' },
        ]);
        expect(probeRuntimes()).toMatchObject({ intents: 0, timers: 0 });
    });
});

describe('targets on release and dispose', () => {
    it('SPEC-rich-text-runtime/AC-045 removes a released target, and every target on dispose, from plugin state', () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { handle, runtime } = start(stored(para(words('abcd'))), { model: targetModel, environment });
        const other = start(stored(para(words('abcd'))), { model: targetModel, environment });
        setSelection(handle, { text: 'bc' });
        const kept = capture(handle, { purpose: 'format', onIntersectingEdit: 'map' });
        const released = capture(handle, { purpose: 'format', onIntersectingEdit: 'map' });
        expect(probeRuntimes().targets).toBe(2);

        handle.releaseTarget(released);
        expect(probeRuntimes().targets).toBe(1);
        expect(handle.execute('mark.bold.toggle', undefined, { target: released })).toEqual(INVALID);
        expect(handle.execute('mark.bold.toggle', undefined, { target: kept }).status).toBe('applied');

        handle.dispose();
        expect(countTargets(runtime.state)).toBe(0);
        expect(probeRuntimes().targets).toBe(0);
        expect(other.handle.execute('mark.bold.toggle', undefined, { target: kept })).toEqual({
            status: 'rejected',
            code: 'wrong-session',
        });
    });

    it('SPEC-rich-text-runtime/AC-045 SPEC-rich-text-runtime/AC-005 keeps a target released during a composition released when the settled check restores the state', async () => {
        const session = start(stored(para(words('ab'))), { model: targetModel, policy: NOT_EDITABLE_CORE });
        const { handle } = session;
        setSelection(handle, { text: 'ab' });
        const target = capture(handle, { purpose: 'format', onIntersectingEdit: 'map' });

        compose(session, 'x');
        handle.releaseTarget(target);
        endComposition(session);
        await settleInput(session);

        expect(session.view.state.doc.textContent).toBe('ab');
        expect(probeRuntimes().targets).toBe(0);
        expect(handle.query('mark.bold.toggle', undefined, { target }).disabledReason).toBe('target-invalid');
    });

    it('SPEC-rich-text-runtime/AC-074 refuses a capture while mounting, faulted or disposed and creates no target', () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { tree } = decodeToTree(stored(para(words('ab'))), boldModel);
        const mounting = createEditorRuntime({
            definition: compileDefinition(boldModel, CAPABILITIES),
            documentId: 'document-1',
            tree: tree as NonNullable<typeof tree>,
            capabilities: [],
            environment,
            mode: 'editable',
            policy: authoringOf(boldModel),
            limits: limitsOf(undefined),
        });
        started.push(mounting);
        mounting.attach(document.body.appendChild(document.createElement('div')));
        const faulted = start(stored(para()), {
            plugins: [appendForever('fixture.a', 'insertNode'), appendForever('fixture.b', 'setBlock')],
        });
        typeText(faulted.handle, 'x');
        const disposed = start(stored(para(words('ab'))));
        disposed.handle.dispose();
        const options = { purpose: 'format', onIntersectingEdit: 'map' } as const;

        const phases = [mounting.handle, faulted.handle, disposed.handle].map((handle) => [
            handle.getSummary().phase,
            handle.captureTarget(options),
        ]);

        expect(phases).toEqual([
            ['mounting', { status: 'rejected', code: 'not-ready' }],
            ['faulted', { status: 'rejected', code: 'not-ready' }],
            ['disposed', { status: 'rejected', code: 'not-ready' }],
        ]);
        expect(probeRuntimes().targets).toBe(0);
    });
});

describe('the async coordinator', () => {
    it('SPEC-rich-text-runtime/AC-084 SPEC-rich-text-runtime/AC-014 returns applied for a command whose change a documentChange listener answers with dispose', () => {
        const { handle, view } = start(stored(para(words('ab'))));
        handle.subscribe('documentChange', () => handle.dispose());

        const result = handle.execute('text.insert', { text: 'x' });

        expect(result).toMatchObject({ status: 'applied', contentChanged: true });
        expect([handle.getSummary().phase, textOf(view.state.doc)]).toEqual(['disposed', 'xab']);
    });

    it('SPEC-rich-text-runtime/AC-046 registers each operation with its ID, session, target, policy revision, controller and request sequence', () => {
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

    it('SPEC-rich-text-runtime/AC-047 aborts an older request for the same interaction and ignores its result when it resolves last', async () => {
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
        ];
    for (const [name, reason, act] of failures) {
        it(`SPEC-rich-text-runtime/AC-048 discards a result with ${name} as ${reason}, with no content change`, async () => {
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

    it('SPEC-rich-text-runtime/AC-048 applies a result through its target from the current state as async, keeping the caret of an author typing elsewhere', async () => {
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

    it('SPEC-rich-text-runtime/AC-029 runs a queued intent through its target without moving the caret of an author typing elsewhere', async () => {
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

    it('SPEC-rich-text-runtime/AC-046 SPEC-rich-text-runtime/AC-048 applies a result started with no target where the selection was, keeping the caret, and releases the captured target', async () => {
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

    it('SPEC-rich-text-runtime/AC-038 SPEC-rich-text-runtime/AC-046 registers an operation a running command starts with a target where that command leaves the selection', async () => {
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

    it('SPEC-rich-text-runtime/AC-048 discards a result holding a revoked proxy as invalid-payload', async () => {
        const { runtime, view, diagnostics } = start(stored(para(words('ab'))));
        const upload = pending(runtime);
        const { proxy, revoke } = Proxy.revocable({}, {});
        revoke();

        // Promise resolution reads `then` on the result itself, so the revoked proxy sits one level down.
        await upload.resolve({ text: proxy });

        expect(view.state.doc.textContent).toBe('ab');
        expect(diagnostics).toEqual([discarded('invalid-payload')]);
    });

    it('SPEC-rich-text-runtime/AC-050 SPEC-rich-text-runtime/AC-060 starts nothing after dispose: the operation is aborted and never registered', () => {
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

    it('SPEC-rich-text-runtime/AC-050 aborts every pending operation on dispose and ignores their results', async () => {
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

    it('SPEC-rich-text-runtime/AC-069 aborts an upload once the policy disables create for its feature and discards its result', async () => {
        const { handle, runtime, view } = start(stored(para(words('ab'))));
        const upload = pending(runtime, { featureId: 'core', action: 'create' });

        handle.updatePolicy(
            authoringOf(boldModel, { features: { core: { create: false, edit: true, remove: true, paste: true } } }),
        );
        await upload.resolve({ text: 'x' });

        expect(upload.operation.controller.signal.aborted).toBe(true);
        expect(view.state.doc.textContent).toBe('ab');
    });

    it('SPEC-rich-text-runtime/AC-073 aborts only the operation of a changed services member and keeps the view', async () => {
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

    it('SPEC-rich-text-runtime/AC-089 SPEC-rich-text-runtime/AC-072 holds a result during composition and checks it again once input settled', async () => {
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
        await settleInput(session);
        expect(textOf(view.state.doc)).toBe('xabcd!');

        compose(session, 'y');
        handle.setMode('readonly');
        await refused.resolve({ text: '?' });
        endComposition(session);
        await settleInput(session);

        expect(textOf(view.state.doc)).toBe('xyabcd!');
        expect(diagnostics).toEqual([discarded('readonly')]);
    });
});

describe('history', () => {
    /** Types each character at the caret, `gap` ms after the one before. */
    const typeApart = ({ handle, environment }: ReturnType<typeof start>, characters: string, gap: number) => {
        for (const character of characters) {
            environment.advance(gap);
            typeText(handle, character);
        }
    };

    it('SPEC-rich-text-runtime/AC-051 keeps 120 separated edits as 120 undo steps and 100 after the 121st', () => {
        const kept = start(stored(para()));
        typeApart(kept, 'a'.repeat(120), 600);
        const trimmed = start(stored(para()));
        typeApart(trimmed, 'a'.repeat(121), 600);

        expect([undoSteps(kept.handle), undoSteps(trimmed.handle)]).toEqual([120, 100]);
    });

    // A repair the compiler wraps, so it takes the environment clock's time; it puts `!` before the first edit.
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
        it(`SPEC-rich-text-runtime/AC-051 groups adjacent edits 400 ms apart and not 600 ms apart${name}`, () => {
            const near = start(stored(para()), { plugins });
            typeApart(near, 'ab', 400);
            const far = start(stored(para()), { plugins });
            typeApart(far, 'ab', 600);

            expect([undoSteps(near.handle), undoSteps(far.handle)]).toEqual([1, 2]);
        });
    }

    it('SPEC-rich-text-runtime/AC-052 resets history to nothing to undo or redo with the same plugin instances', () => {
        const { handle, runtime, environment } = start(stored(para()));
        typeText(handle, 'a');
        environment.advance(600);
        typeText(handle, 'b');
        handle.execute('history.undo');
        const { state } = runtime;

        const next = reset(state);

        expect([canUndo(state), canRedo(state)]).toEqual([true, true]);
        expect([canUndo(next), canRedo(next)]).toEqual([false, false]);
        expect(next.plugins).toHaveLength(state.plugins.length);
        expect(next.plugins.every((plugin, index) => plugin === state.plugins[index])).toBe(true);
    });

    it('SPEC-rich-text-runtime/AC-053 closes the undo group around a command and a paste: typing, bold and typing, typing, an insert and typing, and typing, a paste and typing, are three steps each', () => {
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

    it('SPEC-rich-text-runtime/AC-054 adds no undo step for a selection move or a stored mark', () => {
        const { handle } = start(stored(para(words('ab'))));

        setSelection(handle, { text: 'ab', from: 1, to: 1 });
        handle.execute('mark.bold.toggle');

        expect(handle.getSummary().commitSequence).toBe(2);
        expect(handle.query('history.undo').enabled).toBe(false);
    });

    const imageModel = compileContentModel([core(), bold(), fixtureImage()], { id: 'test.bold', version: 1 });
    const image = { type: 'image', attrs: { assetId: null } };
    /** Sets the `assetId` of the document's last block, an image, as an upload completion does. */
    const complete: EngineCommand = {
        run: (state, dispatch, payload) => {
            const at = state.doc.content.size - state.doc.child(state.doc.childCount - 1).nodeSize;
            if (dispatch !== undefined) {
                dispatch(state.tr.setNodeAttribute(at, 'assetId', (payload as { readonly assetId: string }).assetId));
            }
            return true;
        },
        active: () => false,
        payload: { fields: { assetId: { type: 'string' } } },
    };
    const upload = (session: ReturnType<typeof start>) =>
        pending(session.runtime, { featureId: 'fixture.image', command: 'upload.complete' }).resolve({
            assetId: 'asset-1',
        });
    const shown = ({ view }: ReturnType<typeof start>): unknown[] => [
        view.state.doc.textContent,
        view.state.doc.child(1).attrs.assetId as unknown,
    ];

    it('SPEC-rich-text-runtime/AC-055 adds no undo step for an upload completion that sets an assetId', async () => {
        const session = start(stored(para(), image), { model: imageModel, commands: { 'upload.complete': complete } });
        typeText(session.handle, 'a');

        await upload(session);

        expect(shown(session)).toEqual(['a', 'asset-1']);
        expect(undoSteps(session.handle)).toBe(1);
        expect(shown(session)).toEqual(['', 'asset-1']);
    });

    it('SPEC-rich-text-runtime/AC-056 starts a new undo step for typing right after an upload completion', async () => {
        const session = start(stored(para(), image), { model: imageModel, commands: { 'upload.complete': complete } });
        typeText(session.handle, 'a');
        session.environment.advance(50);
        await upload(session);
        session.environment.advance(50);
        typeText(session.handle, 'b');

        session.handle.execute('history.undo');

        expect(shown(session)).toEqual(['a', 'asset-1']);
    });

    it('SPEC-rich-text-runtime/AC-068 reverts an edit and its repair with one undo, and repairs nothing after it', () => {
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

    it('SPEC-rich-text-editing/AC-049 returns the selection to where the undone change happened', () => {
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

    it('SPEC-rich-text-editing/AC-051 adds no undo step for a command that fails or does not apply', async () => {
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
        await settleInput(session);
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

describe('faults', () => {
    const pluginError = { code: 'runtime.plugin-error', severity: 'error', messageKey: 'runtime.plugin-error' };
    const viewFault = { code: 'runtime.view-fault', severity: 'error', messageKey: 'runtime.view-fault' };
    const NOT_READY: CommandResult = { status: 'rejected', code: 'not-ready' };

    it('SPEC-rich-text-runtime/AC-013 drops a batch whose plugin throws with a plugin-error diagnostic and stays ready, so typing still works', () => {
        let throws = 0;
        const failing = new Plugin({
            appendTransaction: (transactions) => {
                if (throws > 0 && transactions.some(({ docChanged }) => docChanged)) {
                    throws -= 1;
                    throw new Error('plugin failure');
                }
                return null;
            },
        });
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
        expect(diagnostics).toEqual([pluginError, pluginError]);
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

    it('SPEC-rich-text-runtime/AC-014 SPEC-rich-text-runtime/AC-078 faults once a node view update throws, keeps the snapshot and offers the faulting edit until dispose', () => {
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

    it('SPEC-rich-text-runtime/AC-071 SPEC-rich-text-runtime/AC-082 faults when a node view constructor throws while mounting, keeps the decoded document and settles queued intents as not-ready', async () => {
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
        const compiled = compileDefinition(boldModel, CAPABILITIES);
        const environment = createTestEnvironment({ seed: 1 });
        const runtime = createEditorRuntime({
            definition: { ...compiled, plugins: [...compiled.plugins, constructorFails] },
            documentId: 'document-1',
            tree,
            capabilities: result.document.requiredCapabilities,
            environment,
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
        environment.flushFrames();

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

    it('SPEC-rich-text-runtime/AC-014 SPEC-rich-text-runtime/AC-078 installs nothing once faulted when a captured target is released', () => {
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

    it('SPEC-rich-text-runtime/AC-014 SPEC-rich-text-runtime/AC-078 installs nothing once faulted when the view dispatches', () => {
        const session = start(stored(para(words('ab'))), { plugins: [updateFails] });
        const { handle, runtime, diagnostics } = session;
        faultView(session);
        const { commitSequence } = handle.getSummary();

        runtime.select({ anchor: 1, head: 2 });

        expect(handle.getSummary().commitSequence).toBe(commitSequence);
        expect(diagnostics).toEqual([viewFault]);
        expect(JSON.stringify(handle.getRecoveryCandidate())).toContain('"ab!"');
    });

    it('SPEC-rich-text-runtime/AC-014 SPEC-rich-text-runtime/AC-048 discards an async result whose install faults the view as not-ready', async () => {
        const session = start(stored(para(words('ab'))), { plugins: [updateFails] });
        setSelection(session.handle, { text: 'ab', from: 2, to: 2 });

        await pending(session.runtime).resolve({ text: '!' });

        expect(session.diagnostics).toEqual([viewFault, discarded('not-ready')]);
    });

    it('SPEC-rich-text-runtime/AC-012 SPEC-rich-text-runtime/AC-014 publishes nothing from a composition that settles after a fault', async () => {
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
        await settleInput(session);

        expect(handle.getSummary()).toMatchObject({ phase: 'faulted', sequence: 0 });
        expect(changes).toEqual([]);
        expect(handle.getSnapshot()).toBe(snapshot);
    });

    it('SPEC-rich-text-runtime/AC-089 SPEC-rich-text-runtime/AC-048 discards a result held for a composition as not-ready when the session faults before input settles', async () => {
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
        expect(probeRuntimes().operations).toEqual([]);
    });

    it('SPEC-rich-text-runtime/AC-013 reports a plugin that throws in the repair of a settling composition', async () => {
        const failing = new Plugin({
            appendTransaction: (transactions) => {
                if (transactions[0]?.getMeta(NORMALIZE_META) === 'now') {
                    throw new Error('plugin failure');
                }
                return null;
            },
        });
        const session = start(stored(para(words('ab'))), { plugins: [failing] });
        setSelection(session.handle, { text: 'ab', from: 2, to: 2 });
        compose(session, 'x');

        endComposition(session);
        await settleInput(session);

        expect(session.diagnostics).toEqual([pluginError]);
        expect(session.handle.getSummary()).toMatchObject({ phase: 'ready', sequence: 1 });
        expect(textOf(session.view.state.doc)).toBe('abx');
        expect(contentOf(session.changes[0])).toEqual(stored(para(words('abx'))).content);
    });

    it('SPEC-rich-text-runtime/AC-071 leaves nothing on the element that reaches the runtime after a plugin view throws while mounting', () => {
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
        const compiled = compileDefinition(boldModel, CAPABILITIES);
        const environment = createTestEnvironment({ seed: 1 });
        const runtime = createEditorRuntime({
            definition: { ...compiled, plugins: [...compiled.plugins, viewFails] },
            documentId: 'document-1',
            tree,
            capabilities: result.document.requiredCapabilities,
            environment,
            mode: 'editable',
            policy: authoringOf(boldModel),
            limits: limitsOf({}),
        });
        started.push(runtime);
        const element = document.body.appendChild(document.createElement('div'));
        runtime.attach(element);
        environment.flushFrames();

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

describe('key precedence', () => {
    it('SPEC-rich-text/AC-060 runs the commands features bind to one key in plugin order until one applies', () => {
        const leaveHeading = defineFeature({
            id: 'fixture.leave-heading',
            version: 1,
            requires: [{ id: 'fixture.heading-set', version: 1 }],
            commands: { 'fixture.paragraph.set': setBlock('paragraph') },
            keys: { Enter: 'fixture.paragraph.set' },
        });
        const markLine = defineFeature({
            id: 'fixture.mark-line',
            version: 1,
            requires: [{ id: 'core', version: 1 }],
            keys: { Enter: { command: 'text.insert', payload: { text: '¶' } } },
        });
        const model = compileContentModel([core(), bold(), fixtureHeadingSet(), leaveHeading(), markLine()], {
            id: 'test.bold',
            version: 1,
        });
        const { handle, view, changes } = start(stored(para(words('ab')), heading(2, words('cd'))), { model });

        setSelection(handle, { text: 'ab', from: 2, to: 2 });
        pressKey(handle, 'Enter');
        setSelection(handle, { text: 'cd', from: 2, to: 2 });
        pressKey(handle, 'Enter');

        expect(changes.map(({ commandId }) => commandId)).toEqual(['text.insert', 'fixture.paragraph.set']);
        expect([textOf(view.state.doc), view.state.doc.child(1).type.name]).toEqual(['ab¶cd', 'paragraph']);
    });
});

describe('input rules', () => {
    const ruleModel = compileContentModel([core(), bold(), fixtureItalic(), fixtureHeadingSet(), fixtureInputRules()], {
        id: 'test.bold',
        version: 1,
    });
    /** The first block's type, then each text run with its marks, such as `paragraph x[bold]`. */
    const shapeOf = (doc: Node) => {
        const block = doc.child(0);
        const runs: string[] = [block.type.name];
        for (const node of block.children) {
            runs.push(`${node.text ?? ''}${node.marks.map((mark) => `[${mark.type.name}]`).join('')}`);
        }
        return runs.join(' ');
    };
    // Each rule of the stand-in, what is typed, and the first block once it fired.
    const rules: readonly (readonly [string, string, string])[] = [
        ['heading.hashes', '## ', 'heading'],
        ['bold.stars', '**x**', 'paragraph x[bold]'],
        ['bold.underscores', '__x__', 'paragraph x[bold]'],
        ['italic.star', '*x*', 'paragraph x[italic]'],
        ['italic.underscore', '_x_', 'paragraph x[italic]'],
        ['strike.tildes', '~~x~~', 'paragraph x[strike]'],
        ['code.backtick', '`x`', 'paragraph x[code]'],
    ];
    const typedIn = (input: unknown, typed: string) => {
        const session = start(input, { model: ruleModel });
        typeText(session.handle, typed);
        return session;
    };

    for (const [id, typed, fired] of rules) {
        it(`SPEC-rich-text-editing/AC-087 SPEC-rich-text-editing/AC-100 restores ${typed} as typed with one undo and removes it with a second, for ${id}`, () => {
            const { handle, view } = typedIn(stored(para()), typed);
            const shapes = [shapeOf(view.state.doc)];
            for (const _undo of [1, 2]) {
                expect(handle.execute('history.undo').status).toBe('applied');
                shapes.push(shapeOf(view.state.doc));
            }

            expect(shapes).toEqual([fired, `paragraph ${typed}`, 'paragraph']);
        });

        it(`SPEC-rich-text-editing/AC-041 undoes ${id} with Backspace right after it fired, restoring ${typed}`, () => {
            const { handle, view } = typedIn(stored(para()), typed);

            pressKey(handle, 'Backspace');
            const restored = shapeOf(view.state.doc);
            // Backspace undoes nothing more once the rule is undone.
            pressKey(handle, 'Backspace');

            expect([restored, shapeOf(view.state.doc)]).toEqual([`paragraph ${typed}`, `paragraph ${typed}`]);
        });

        it(`SPEC-rich-text-editing/AC-039 fires no ${id} in a code block or inline code`, () => {
            const block = typedIn(stored({ type: 'code_block' }), typed);
            const inline = start(stored(para({ type: 'text', text: '..', marks: [{ type: 'code' }] })), {
                model: ruleModel,
            });
            setSelection(inline.handle, { text: '..', from: 1, to: 1 });
            typeText(inline.handle, typed);

            expect([shapeOf(block.view.state.doc), shapeOf(inline.view.state.doc)]).toEqual([
                `code_block ${typed}`,
                `paragraph .${typed}.[code]`,
            ]);
        });

        it(`SPEC-rich-text-editing/AC-040 fires no ${id} for its pattern pasted as plain text, inserted by a command or loaded`, () => {
            const pasted = start(stored(para()), { model: ruleModel });
            pasted.view.pasteText(typed);
            const inserted = start(stored(para()), { model: ruleModel });
            inserted.handle.execute('text.insert', { text: typed });
            const loaded = start(stored(para(words(typed))), { model: ruleModel });

            expect([pasted, inserted, loaded].map(({ view }) => shapeOf(view.state.doc))).toEqual([
                `paragraph ${typed}`,
                `paragraph ${typed}`,
                `paragraph ${typed}`,
            ]);
        });
    }

    const refusals: readonly (readonly [string, string])[] = [
        ['marks.bold', '**x**'],
        ['fixture.heading-set', '## '],
    ];
    for (const [featureId, typed] of refusals) {
        it(`SPEC-rich-text-editing/AC-037 keeps ${typed} as typed when the policy forbids creating what ${featureId} adds`, () => {
            const { handle, view } = start(stored(para()), { model: ruleModel, policy: forbid(featureId, 'create') });

            typeText(handle, typed);

            expect(shapeOf(view.state.doc)).toBe(`paragraph ${typed}`);
        });
    }

    it('SPEC-rich-text-editing/AC-038 fires no rule for composed text, which stays one undo step', async () => {
        const session = start(stored(para(words('ab.'))), { model: ruleModel });
        const { handle, view } = session;
        setSelection(handle, { text: 'ab.', from: 3, to: 3 });
        view.dom.dispatchEvent(new CompositionEvent('compositionstart'));
        for (const character of '**x**') {
            const event = new InputEvent('beforeinput', { inputType: 'insertCompositionText', data: character });
            view.dom.dispatchEvent(event);
            view.dispatch(view.state.tr.insertText(character).setMeta('composition', 1));
        }
        const composing = shapeOf(view.state.doc);
        endComposition(session);
        await settleInput(session);
        const settled = shapeOf(view.state.doc);

        handle.execute('history.undo');

        expect([composing, settled, shapeOf(view.state.doc)]).toEqual([
            'paragraph ab.**x**',
            'paragraph ab.**x**',
            'paragraph ab.',
        ]);
    });

    it('SPEC-rich-text-editing/AC-041 undoes no rule with Backspace once a stored mark changed after it', () => {
        const { handle, view } = typedIn(stored(para()), '**x**');

        pressKey(handle, 'Mod-b');
        pressKey(handle, 'Backspace');

        expect(shapeOf(view.state.doc)).toBe('paragraph x[bold]');
    });

    it('SPEC-rich-text-editing/AC-041 undoes no rule with Backspace once the caret moved or a character was typed after it', () => {
        const moved = typedIn(stored(para()), '**x**');
        setSelection(moved.handle, { text: 'x', from: 0, to: 0 });
        pressKey(moved.handle, 'Backspace');
        const typed = typedIn(stored(para()), '**x**y');
        pressKey(typed.handle, 'Backspace');

        expect([shapeOf(moved.view.state.doc), shapeOf(typed.view.state.doc)]).toEqual([
            'paragraph x[bold]',
            'paragraph x[bold] y',
        ]);
    });

    it('SPEC-rich-text-editing/AC-041 runs the rule undo before a feature that binds Backspace, which then gets the next one', () => {
        const backspaceMark = defineFeature({
            id: 'fixture.backspace-mark',
            version: 1,
            requires: [{ id: 'core', version: 1 }],
            keys: { Backspace: { command: 'text.insert', payload: { text: '!' } } },
        });
        const model = compileContentModel(
            [core(), bold(), fixtureItalic(), fixtureHeadingSet(), fixtureInputRules(), backspaceMark()],
            { id: 'test.bold', version: 1 },
        );
        const { handle, view } = start(stored(para()), { model });
        typeText(handle, '**x**');

        pressKey(handle, 'Backspace');
        const undone = shapeOf(view.state.doc);
        pressKey(handle, 'Backspace');

        expect([undone, shapeOf(view.state.doc)]).toEqual(['paragraph **x**', 'paragraph **x**!']);
    });

    it('SPEC-rich-text-editing/AC-100 undoes a rule with Mod-z and redoes it with Mod-Shift-z', () => {
        const { handle, view } = typedIn(stored(para()), '**x**');

        pressKey(handle, 'Mod-z');
        const undone = shapeOf(view.state.doc);
        pressKey(handle, 'Mod-Shift-z');

        expect([undone, shapeOf(view.state.doc)]).toEqual(['paragraph **x**', 'paragraph x[bold]']);
    });

    it('SPEC-rich-text-editing/AC-039 fires no rule whose match starts inside inline code', () => {
        const session = start(stored(para({ type: 'text', text: '**a', marks: [{ type: 'code' }] })), {
            model: ruleModel,
        });
        setSelection(session.handle, { text: '**a', from: 3, to: 3 });

        typeText(session.handle, '**');

        expect(shapeOf(session.view.state.doc)).toBe('paragraph **a[code] **');
    });

    it('SPEC-rich-text-editing/AC-040 fires no rule for a paste after a beforeinput that changed nothing', () => {
        const { view } = start(stored(para()), { model: ruleModel });
        view.dom.dispatchEvent(new InputEvent('beforeinput', { inputType: 'historyUndo', cancelable: true }));

        view.pasteText('**x**');

        expect(shapeOf(view.state.doc)).toBe('paragraph **x**');
    });

    it('SPEC-rich-text-editing/AC-100 undoes only a character typed right after a rule fired', () => {
        const { handle, view } = typedIn(stored(para()), '**x**y');
        expect(shapeOf(view.state.doc)).toBe('paragraph x[bold] y');

        handle.execute('history.undo');

        expect(shapeOf(view.state.doc)).toBe('paragraph x[bold]');
    });

    it('SPEC-rich-text-editing/AC-076 fires no mark rule after a word character, before one, or around text with an edge space', () => {
        const cases: readonly (readonly [string, JsonValue, string])[] = [
            ['re**ver**', para(), 're**ver**'],
            ['a~~b~~', para(), 'a~~b~~'],
            ['x`y`', para(), 'x`y`'],
            ['** x**', para(), '** x**'],
            ['**x **', para(), '**x **'],
            ['_x_', para(words('y')), '_x_y'],
        ];

        const shapes = cases.map(([typed, block]) => shapeOf(typedIn(stored(block), typed).view.state.doc));

        expect(shapes).toEqual(cases.map(([, , text]) => `paragraph ${text}`));
    });
});
