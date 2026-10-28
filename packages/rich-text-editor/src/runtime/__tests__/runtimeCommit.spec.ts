/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Node } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { describe, expect, it, vi } from 'vitest';

import { pressKey, setSelection, typeText } from '#/testing';

import { stored, para, words, start, contentOf, pending, dropHTML, installRuntimeHooks } from './fixtures/start';

installRuntimeHooks();

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
        const nodeEquals = vi.spyOn(Node.prototype, 'eq');

        typeText(handle, 'a'.repeat(100));

        expect(toJSON).not.toHaveBeenCalled();
        expect(nodeEquals).toHaveBeenCalled();
        toJSON.mockRestore();
        nodeEquals.mockRestore();
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

describe('the engine copies', () => {
    it('reports no second engine copy when the page loads one, after the view caches its parser and serializer', () => {
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
        ['drop', ({ view }) => dropHTML(view, '<p>d</p>')],
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
        it(`reports the root's origin ${origin} for a batch with an appended normalization`, async () => {
            const session = start(stored(para(words('ab'))), { plugins: [repair] });

            await act(session);

            expect(session.changes.map((change) => change.origin)).toEqual([origin]);
            expect(session.view.state.doc.textContent.endsWith('!')).toBe(true);
        });
    }

    it("reports the root's origin history for an undo with an appended normalization", () => {
        const { handle, changes, view } = start(stored(para(words('ab'))), { plugins: [repair] });
        typeText(handle, 'c');

        handle.execute('history.undo');

        expect(changes.map((change) => change.origin)).toEqual(['input', 'history']);
        expect(changes.map((change) => change.commandId)).toEqual([null, null]);
        expect(view.state.doc.textContent).toBe('ab!');
    });
});
