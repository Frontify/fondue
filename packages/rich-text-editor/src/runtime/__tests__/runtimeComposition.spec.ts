/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Node } from 'prosemirror-model';
import { Plugin, TextSelection } from 'prosemirror-state';
import { describe, expect, it, vi } from 'vitest';

// ProseMirror reads the platform once when it loads. Android ends an idle composition with no `compositionend`.
vi.hoisted(() => {
    Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Linux; Android 14) Chrome/126.0 Mobile',
        configurable: true,
    });
});

import { compileContentModel } from '#/model';
import { fixtureHeadingSet } from '#/plugins/__tests__/fixtures/features';
import { bold } from '#/plugins/Bold/feature';
import { core } from '#/plugins/Core/feature';
import { NORMALIZE_META } from '#/runtime/definition';
import { pressKey, probeRuntimes, setSelection, typeText } from '#/testing';

import { SETTLE_MS } from '../dom/settle';
import { type CommandResult } from '../types';

import {
    stored,
    para,
    strong,
    words,
    start,
    contentOf,
    pending,
    heading,
    textOf,
    targetModel,
    capture,
    compose,
    endComposition,
    settleInput,
    NOT_EDITABLE_CORE,
    installRuntimeHooks,
} from './fixtures/start';

installRuntimeHooks();

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

    it('returns one frozen snapshot until a commit, then the new one to every selector', () => {
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

    it('returns the snapshot of a document whose attribute holds a Date with that Date as given', () => {
        const { handle, view } = start(stored(para(words('ab'))));
        const value = new Date(0);
        view.dispatch(view.state.tr.setNodeAttribute(0, 'lang', value));

        const { document } = handle.getSnapshot();

        const first = document.content.content?.[0];
        const attrs = first?.attrs as { lang?: unknown } | undefined;
        expect(attrs?.lang).toBe(value);
    });

    it('serializes only the edited top-level block for the snapshot after an edit', () => {
        const { handle, view } = start(stored(para(words('ab')), para(words('cd')), para(words('ef'))));
        handle.getSnapshot();
        typeText(handle, 'x');
        const toJSON = vi.spyOn(Node.prototype, 'toJSON');

        const { document } = handle.getSnapshot();

        const serialized = toJSON.mock.contexts;
        toJSON.mockRestore();
        expect(serialized[0]).toBe(view.state.doc.firstChild);
        expect(serialized).not.toContain(view.state.doc);
        expect(serialized).not.toContain(view.state.doc.child(1));
        expect(serialized).not.toContain(view.state.doc.child(2));
        expect(document).toMatchObject(stored(para(words('xab')), para(words('cd')), para(words('ef'))));
    });

    it('counts a composition commit and notifies selectors while the snapshot holds', () => {
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

    it('does not report the composition ended while the published document is still the old one', async () => {
        // The settle repair changes the document, so installing it updates the view before publish.
        const widen = new Plugin({
            appendTransaction: (transactions, _oldState, state) => {
                if (!transactions.some((transaction) => transaction.getMeta(NORMALIZE_META) === 'now')) {
                    return null;
                }

                if (state.doc.textContent.endsWith('!')) {
                    return null;
                }

                return state.tr.insertText('!', state.doc.content.size - 1);
            },
        });
        const session = start(stored(para(words('ab'))), { plugins: [widen] });
        const before = JSON.stringify(session.handle.getSnapshot().document);
        const seen: { active: boolean; document: string }[] = [];
        session.runtime.watch(
            () => session.handle.getSnapshot(),
            (previous, next) => previous === next,
            (snapshot) => {
                seen.push({ active: snapshot.compositionActive, document: JSON.stringify(snapshot.document) });
            },
        );

        compose(session, 'cd');
        endComposition(session);
        await settleInput();

        expect(seen.some((snapshot) => !snapshot.active && snapshot.document === before)).toBe(false);
        expect(session.handle.getSnapshot().compositionActive).toBe(false);
        expect(JSON.stringify(session.handle.getSnapshot().document)).not.toBe(before);
    });

    it('publishes a composition restarted in the settle window when Android ends it without compositionend', async () => {
        const session = start(stored(para(words('ab'))));
        const { handle, view } = session;
        const before = JSON.stringify(handle.getSnapshot().document);
        const seen: { active: boolean; document: string }[] = [];
        session.runtime.watch(
            () => handle.getSnapshot(),
            (previous, next) => previous === next,
            (snapshot) => {
                seen.push({ active: snapshot.compositionActive, document: JSON.stringify(snapshot.document) });
            },
        );
        const selectAll = () => {
            view.dispatch(
                view.state.tr.setSelection(TextSelection.create(view.state.doc, 1, 3)).setMeta('composition', 1),
            );
        };

        view.focus();
        selectAll();
        view.dom.dispatchEvent(new CompositionEvent('compositionstart'));
        endComposition(session);
        seen.splice(0);

        expect(view.state.selection.empty).toBe(false);
        view.dom.dispatchEvent(new CompositionEvent('compositionstart'));
        await vi.advanceTimersByTimeAsync(0);
        expect(handle.getSnapshot().compositionActive).toBe(true);
        const text = view.dom.firstChild?.firstChild;
        if (!(text instanceof Text)) {
            throw new Error('The view has no text.');
        }

        const composed = document.createTextNode(`${text.data}cd`);
        text.parentNode?.replaceChild(composed, text);
        const range = document.createRange();
        range.setStart(composed, composed.length);
        range.collapse(true);
        const domSelection = document.getSelection();
        domSelection?.removeAllRanges();
        domSelection?.addRange(range);
        await vi.advanceTimersByTimeAsync(0);
        await vi.advanceTimersByTimeAsync(5000);
        await settleInput();

        expect(seen.some((snapshot) => !snapshot.active && snapshot.document === before)).toBe(false);
        expect(seen.some((snapshot) => !snapshot.active && snapshot.document.includes('cd'))).toBe(true);
        expect(handle.getSnapshot().compositionActive).toBe(false);
        expect(view.state.doc.textContent).toContain('cd');
        expect(JSON.stringify(handle.getSnapshot().document)).toContain('cd');
    });

    it('keeps a queued intent pending when a DOM edit starts a composition in the settle window', async () => {
        const session = start(stored(para(words('ab'))));
        const { handle, view } = session;
        const seen: { active: boolean; document: string }[] = [];
        const waiting = (promise: Promise<CommandResult>) => Promise.race([promise, Promise.resolve('pending')]);
        session.runtime.watch(
            () => {
                const snapshot = handle.getSnapshot();

                return { active: snapshot.compositionActive, document: JSON.stringify(snapshot.document) };
            },
            () => false,
            (snapshot) => {
                seen.push(snapshot);
            },
        );
        setSelection(handle, { text: 'ab', from: 0, to: 2 });
        view.dom.dispatchEvent(new CompositionEvent('compositionstart'));
        endComposition(session);
        const queued = handle.enqueue('text.insert', { text: '!' });
        seen.splice(0);
        const text = view.dom.firstChild?.firstChild;
        if (!(text instanceof Text)) {
            throw new Error('The view has no text.');
        }

        text.replaceData(0, text.length, 'cd');
        const range = document.createRange();
        range.setStart(text, 0);
        range.setEnd(text, text.length);
        const domSelection = document.getSelection();
        domSelection?.removeAllRanges();
        domSelection?.addRange(range);
        view.dom.dispatchEvent(new CompositionEvent('compositionstart'));

        expect(view.composing).toBe(true);
        expect(seen.every((snapshot) => snapshot.active)).toBe(true);
        expect(await waiting(queued)).toBe('pending');
        endComposition(session);
        await settleInput();

        expect(await queued).toMatchObject({ status: 'applied', contentChanged: true });
        expect(view.state.doc.textContent).toBe('!');
        expect(handle.getSnapshot().compositionActive).toBe(false);
    });

    it('publishes once when a compositionstart listener stores a mark', async () => {
        const session = start(stored(para(words('ab'))));
        const { handle, view, changes } = session;
        const waiting = (promise: Promise<CommandResult>) => Promise.race([promise, Promise.resolve('pending')]);
        setSelection(handle, { text: 'ab', from: 2, to: 2 });
        view.dom.addEventListener('compositionstart', () => {
            handle.execute('mark.bold.toggle');
        });
        view.dom.dispatchEvent(new CompositionEvent('compositionstart'));
        view.dispatch(view.state.tr.insertText('x').setMeta('composition', 1));
        const queued = handle.enqueue('text.insert', { text: '!' });

        expect(handle.getSummary().compositionActive).toBe(true);
        expect(await waiting(queued)).toBe('pending');
        expect(changes).toEqual([]);
        endComposition(session);
        await settleInput();

        expect(await queued).toMatchObject({ status: 'applied', contentChanged: true });
        expect(changes.map(({ origin }) => origin)).toEqual(['input', 'command']);
        expect(view.state.doc.textContent).toBe('abx!');
        expect(handle.getSnapshot().compositionActive).toBe(false);
    });

    it('publishes a composition ProseMirror ended silently when a non-composing key arrives', async () => {
        const session = start(stored(para(words('ab'))));
        const { handle, runtime, view, changes } = session;
        const waiting = (promise: Promise<CommandResult>) => Promise.race([promise, Promise.resolve('pending')]);
        const outcomes: string[] = [];
        setSelection(handle, { text: 'ab', from: 0, to: 0 });
        view.dom.dispatchEvent(new CompositionEvent('compositionstart'));
        view.dispatch(view.state.tr.insertText('Q').setMeta('composition', 1));

        expect(view.state.doc.textContent).toBe('Qab');
        expect(JSON.stringify(handle.getSnapshot().document)).toContain('"text":"ab"');
        expect(changes).toEqual([]);
        await vi.advanceTimersByTimeAsync(5000);

        expect([view.composing, handle.getSummary().compositionActive, changes.length]).toEqual([false, true, 0]);
        await vi.advanceTimersByTimeAsync(0);
        await vi.advanceTimersByTimeAsync(SETTLE_MS);
        expect([handle.getSummary().compositionActive, changes.length, view.state.doc.textContent]).toEqual([
            true,
            0,
            'Qab',
        ]);
        const boldMark = view.state.schema.marks.bold;
        if (boldMark === undefined) {
            throw new Error('The schema has no bold mark.');
        }

        view.dispatch(view.state.tr.addStoredMark(boldMark.create()));
        const held = pending(session.runtime);
        await held.resolve({ text: 'Z' });
        runtime.afterInput((outcome) => {
            outcomes.push(outcome);
        }, 10_000);
        const queued = handle.enqueue('text.insert', { text: '!' });
        view.dom.dispatchEvent(
            new KeyboardEvent('keydown', { key: 'Shift', keyCode: 16, bubbles: true, isComposing: false }),
        );

        expect(handle.getSummary().compositionActive).toBe(true);
        expect(await waiting(queued)).toBe('pending');
        expect(outcomes).toEqual([]);
        expect(view.state.doc.textContent).toBe('Qab');
        await vi.advanceTimersByTimeAsync(0);
        await vi.advanceTimersByTimeAsync(19);

        expect(handle.getSummary().compositionActive).toBe(true);
        expect(await waiting(queued)).toBe('pending');
        await vi.advanceTimersByTimeAsync(1);

        expect(handle.getSummary().compositionActive).toBe(false);
        expect(changes.map(({ origin }) => origin)).toEqual(['input', 'command', 'async']);
        expect(outcomes).toEqual(['settled']);
        expect(view.state.doc.textContent).toBe('Q!Zab');
    });

    it('publishes a composition and runs a queued intent once compositionend, a microtask and 20 ms passed', async () => {
        const session = start(stored(para(words('ab'))));
        const { handle, view, changes } = session;
        setSelection(handle, { text: 'ab', from: 2, to: 2 });
        const before = handle.getSnapshot();
        const waiting = (promise: Promise<CommandResult>) => Promise.race([promise, Promise.resolve('pending')]);

        compose(session, 'c');
        const queued = handle.enqueue('text.insert', { text: '!' });
        endComposition(session);
        // ProseMirror reads the last composed characters in its flush after compositionend.
        view.dispatch(view.state.tr.insertText('d').setMeta('composition', 1));
        await vi.advanceTimersByTimeAsync(0);
        await vi.advanceTimersByTimeAsync(19);

        expect(await waiting(queued)).toBe('pending');
        expect(changes).toEqual([]);
        expect(handle.getSummary()).toMatchObject({ sequence: 0, compositionActive: true });
        expect(handle.getSnapshot()).toMatchObject({ document: before.document, compositionActive: true });

        await vi.advanceTimersByTimeAsync(1);

        expect(await waiting(queued)).toMatchObject({ status: 'applied', contentChanged: true });
        expect(changes.map(contentOf)).toEqual([
            stored(para(words('abcd'))).content,
            stored(para(words('abcd!'))).content,
        ]);
        expect(changes.map(({ origin }) => origin)).toEqual(['input', 'command']);
        expect(handle.getSummary()).toMatchObject({ sequence: 2, compositionActive: false });
    });

    it('checks a composition once input settled and restores the state from before it', async () => {
        const session = start(stored(para(words('ab'))), { policy: NOT_EDITABLE_CORE });
        const { handle, view, changes } = session;
        const before = view.state;

        compose(session, 'x');
        expect(view.state.doc.textContent).toBe('xab');
        endComposition(session);
        await settleInput();

        expect(view.state).toBe(before);
        expect(changes).toEqual([]);
        expect(handle.getSummary()).toMatchObject({ sequence: 0, compositionActive: false });
    });

    it('rejects a host execute and keeps the surface editable until input settled', async () => {
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
        await settleInput();

        expect(await queued).toEqual({ status: 'rejected', code: 'readonly' });
        expect([surface(), view.state.doc.textContent]).toEqual(['false', 'xwab']);
    });

    it('keeps a composition active through a host stored-mark toggle until compositionend', async () => {
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
        await settleInput();

        expect(await waiting(queued)).toMatchObject({ status: 'applied' });
        expect(changes.map(({ origin }) => origin)).toEqual(['input', 'command']);
        expect(view.state.doc.textContent).toBe('abx!');
    });

    it('waits as long as ProseMirror does after compositionend', async () => {
        const session = start(stored(para(words('ab'))));
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
        await vi.advanceTimersByTimeAsync(0);
        await vi.advanceTimersByTimeAsync(SETTLE_MS);

        // ProseMirror ends a composition in its own timer of this delay, which the settle timer copies.
        expect(delays).toContain(SETTLE_MS);
        expect(await queued).toMatchObject({ status: 'applied' });
        expect(changes.map(contentOf)).toEqual([
            stored(para(words('abxy'))).content,
            stored(para(words('abxy!'))).content,
        ]);
    });

    it('answers query as a host execute during a composition', () => {
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

    it('repairs a nodeId that a composition repeats only once input settled', async () => {
        const model = compileContentModel([core(), bold(), fixtureHeadingSet()], { id: 'test.bold', version: 1 });
        const session = start(stored(heading(2, words('abcd'))), { model });
        const { view, changes } = session;
        const ids = () => view.state.doc.children.map((node): unknown => node.attrs.nodeId);

        compose(session, 'x');
        // An Enter during a composition, as Android sends it, splits the heading under the composition's meta.
        view.dispatch(view.state.tr.split(3).setMeta('composition', 1));
        expect(ids()).toEqual(['h-1', 'h-1']);
        endComposition(session);
        await settleInput();

        const settled = ids();
        expect([settled[0], new Set(settled).size]).toEqual(['h-1', 2]);
        expect(changes).toHaveLength(1);
        expect(JSON.stringify(contentOf(changes[0])).split('"h-1"')).toHaveLength(2);
        expect(textOf(view.state.doc)).toBe('xabcd');
    });

    it('judges the settle repair with its composition, so a heading with remove false still gets unique IDs', async () => {
        const model = compileContentModel([core(), bold(), fixtureHeadingSet()], { id: 'test.bold', version: 1 });
        const policy = {
            features: { 'fixture.heading-set': { create: true, edit: true, remove: false, paste: true } },
        };
        const session = start(stored(heading(2, words('abcd'))), { model, policy });
        const { view, changes } = session;

        compose(session, 'x');
        view.dispatch(view.state.tr.split(3).setMeta('composition', 1));
        endComposition(session);
        await settleInput();

        const ids = view.state.doc.children.map((node): unknown => node.attrs.nodeId);
        expect([ids[0], new Set(ids).size, changes.length]).toEqual(['h-1', 2, 1]);
    });

    it('ends a composition when the view detaches, so held work settles', async () => {
        const session = start(stored(para(words('ab'))));
        const { handle, runtime } = session;

        compose(session, 'x');
        const queued = handle.enqueue('text.insert', { text: '!' });
        runtime.detach();
        await settleInput();

        expect(handle.getSummary().compositionActive).toBe(false);
        expect(await queued).toMatchObject({ status: 'applied' });
        expect(handle.execute('text.insert', { text: '?' }).status).toBe('applied');
    });

    it('keeps a target captured during a rejected composition, so its result applies', async () => {
        const policy = { features: { 'marks.bold': { create: true, edit: false, remove: true, paste: true } } };
        const session = start(stored(para(strong('ab'), words('cd'))), { model: targetModel, policy });
        const { handle, runtime, view } = session;
        setSelection(handle, { text: 'ab', from: 1, to: 1 });

        compose(session, 'x');
        setSelection(handle, { text: 'cd', from: 2, to: 2 });
        const target = capture(handle, { purpose: 'insert', onIntersectingEdit: 'map' });
        const upload = pending(runtime, { target });
        endComposition(session);
        await settleInput();
        expect(textOf(view.state.doc)).toBe('abcd');
        await upload.resolve({ text: '!' });

        expect(textOf(view.state.doc)).toBe('abcd!');
        expect(session.diagnostics).toEqual([]);
    });

    it('defers a root a plugin view dispatches while the settled state installs, so the check still judges the composition', async () => {
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
        await settleInput();

        expect(dispatched).toBe(true);
        expect(textOf(view.state.doc)).toBe('abcdp');
        expect(changes.filter((change) => JSON.stringify(contentOf(change)).includes('x'))).toEqual([]);
    });

    it('resolves intents queued during composition as not-ready on dispose and drops the settle timer', async () => {
        const session = start(stored(para(words('ab'))));
        const { handle } = session;

        compose(session, 'x');
        const queued = [handle.enqueue('text.insert', { text: 'y' }), handle.enqueue('mark.bold.toggle')];
        endComposition(session);
        await vi.advanceTimersByTimeAsync(0);
        expect(probeRuntimes()).toMatchObject({ intents: 2, timers: 1 });
        handle.dispose();

        expect(await Promise.all(queued)).toEqual([
            { status: 'rejected', code: 'not-ready' },
            { status: 'rejected', code: 'not-ready' },
        ]);
        expect(probeRuntimes()).toMatchObject({ intents: 0, timers: 0 });
    });
});
