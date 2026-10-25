/* (c) Copyright Frontify Ltd., all rights reserved. */

import fc from 'fast-check';
import { joinBackward } from 'prosemirror-commands';
import { Schema } from 'prosemirror-model';
import { type EditorState, Plugin, TextSelection, type Transaction } from 'prosemirror-state';
import { tableEditing, tableNodes } from 'prosemirror-tables';
import { describe, expect, it, vi } from 'vitest';

import { defineEditorPart } from '#/bridge/plugin';
import { compileDefinition, countAppends, type EngineCommand } from '#/definition';
import { type fixtureHeadingSetEditor } from '#/features/__tests__/fixtures/editors';
import { fixtureHeadingSet } from '#/features/__tests__/fixtures/features';
import { type UnitCommands, unitsOf } from '#/features/__tests__/fixtures/units';
import { core } from '#/features/core/feature';
import { bold } from '#/features/marks-bold/feature';
import { type CommandsOfPart, type EditorHandle } from '#/index';
import { compileContentModel, defineFeature, type Diagnostic } from '#/model';
import { limitsOf } from '#/model/decode';
import { extensionsOf } from '#/react/engine';
import { pressKey, setSelection, typeText } from '#/testing';

import { RUNTIME_PLUGINS } from '../capabilities';
import { authoringOf } from '../policy';
import { createEditorRuntime, type EditorRuntime } from '../runtime';
import { type CommandResult } from '../types';

import {
    boldModel,
    stored,
    para,
    strong,
    words,
    type Start,
    start,
    contentOf,
    pending,
    undoSteps,
    forbid,
    applied,
    appendForever,
    dropHTML,
    installRuntimeHooks,
    started,
} from './fixtures/start';

installRuntimeHooks();

describe('commands, events and the commit path', () => {
    it('installs every new state through commit and gives the view no event handler', async () => {
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
        const beforeDrop = handle.getSummary().commitSequence;
        dropHTML(view, '<p>x</p>');
        expect(handle.getSummary().commitSequence).toBe(beforeDrop + 1);
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

    it('reports a selector whose read throws and still notifies the others and emits the change', () => {
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
        expect(diagnostics).toEqual([
            {
                code: 'runtime.listener-error',
                severity: 'error',
                messageKey: 'runtime.listener-error',
                details: { event: 'selector', name: 'Error' },
            },
        ]);
    });

    it('aborts a batch past the append limit, names the chain and faults', () => {
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

    it('counts the tableEditing repair and stamps the appended transaction with the current time', () => {
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
                definition: {
                    ...compileDefinition(boldModel, RUNTIME_PLUGINS, extensionsOf(boldModel, unitsOf(boldModel))),
                    schema,
                    plugins: [repair, recorder],
                },
                documentId: 'document-1',
                tree,
                capabilities: [],
                mode: 'editable',
                policy: authoringOf(boldModel),
                limits: limitsOf({ maxAppendedTransactions }),
            });
            started.push(runtime);
            const diagnostics: Diagnostic[] = [];
            runtime.handle.subscribe('diagnostic', (diagnostic: Diagnostic) => diagnostics.push(diagnostic));
            runtime.attach(document.body.appendChild(document.createElement('div')));
            vi.runAllTimers();
            const view = runtime.view as NonNullable<EditorRuntime['view']>;
            view.dispatch(view.state.tr.insertText('!', 4));
            return { runtime, seen, diagnostics, now: Date.now() };
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

    it('sets commandId for a command batch only, whatever its route', async () => {
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

    it('notifies a bold active-state selector only when its value changes', () => {
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
        expect(other.mock.calls[1]?.[0].details).toEqual({ event: 'diagnostic', name: 'Error' });
    });

    it('reports the event and the error name of a throwing listener, never its message', () => {
        const { handle, diagnostics } = start(stored(para()));
        handle.subscribe('documentChange', () => {
            throw new RangeError('secret document text');
        });
        handle.subscribe('documentChange', () => {
            const notAnError: unknown = 'not an error';
            throw notAnError;
        });

        typeText(handle, 'a');

        const faults = diagnostics.filter(({ code }) => code === 'runtime.listener-error');
        expect(faults.map(({ details }) => details)).toEqual([
            { event: 'documentChange', name: 'RangeError' },
            { event: 'documentChange', name: 'unknown' },
        ]);
        expect(JSON.stringify(faults)).not.toContain('secret document text');
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

    it('runs intents enqueued during notification after it ends, in call order', async () => {
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

    it('ends the loop with one warning when a diagnostic listener enqueues too', async () => {
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

    it('resolves an intent past 32 levels of enqueuing listeners as busy and warns once', async () => {
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

    it('executes exactly when the query is enabled, over generated states, selections, commands and policies', () => {
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

    it('disables and rejects a command that a filter, a normalizer over a limit or the policy stops', () => {
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
        expect(undoSteps(handle)).toBe(1);
    });
});

describe('command payloads', () => {
    const pullQuote = defineFeature({
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
    });
    const pullQuoteEditor = defineEditorPart(pullQuote, {
        needs: ['blocks'],
        commands: {
            'acme.pull-quote.set': {
                run: (api) => api.blocks.set('acme_pull_quote', undefined, { toggle: true }),
                active: (api) => api.blocks.active('acme_pull_quote'),
            },
        },
    });
    const model = compileContentModel([core(), bold(), fixtureHeadingSet(), pullQuote()], {
        id: 'test.bold',
        version: 1,
    });
    const parts = [pullQuoteEditor];

    const german = { type: 'paragraph', attrs: { lang: 'de' }, content: [words('ab')] };
    const first = ({ view }: ReturnType<typeof start>) => view.state.doc.child(0);

    it('keeps unknown and other attributes that a block type change does not name', () => {
        const session = start(stored(german), { model, parts });
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

    it('checks and runs one copy of the payload', () => {
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

    it('reads a command as active only for the attributes its payload names', () => {
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

    it('never runs a command whose payload fails its declaration', async () => {
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

    it('rejects a wrong payload before the command runs, for a typed and an untyped command', async () => {
        const { handle, view } = start(stored(para(words('ab'))), { model, parts });
        const typed = handle as unknown as EditorHandle<UnitCommands & CommandsOfPart<typeof fixtureHeadingSetEditor>>;
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
