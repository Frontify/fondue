/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { describe, expect, it } from 'vitest';

import { countingIds } from '#/features/__tests__/fixtures/notes';
import { unitsOf } from '#/features/__tests__/fixtures/units';
import { decodeToTree, limitsOf } from '#/model/internal';
import { extensionsOf } from '#/react/engine';
import { compileDefinition } from '#/runtime/definition';
import { probeRuntimes, setSelection, typeText } from '#/testing';

import { RUNTIME_PLUGINS } from '../capabilities';
import { authoringOf } from '../policy';
import { createEditorRuntime } from '../runtime';
import { countTargets } from '../targets';
import { type CommandResult } from '../types';

import {
    boldModel,
    stored,
    para,
    words,
    start,
    replacing,
    mention,
    textOf,
    appendForever,
    targetModel,
    capture,
    markedText,
    compose,
    endComposition,
    settleInput,
    NOT_EDITABLE_CORE,
    installRuntimeHooks,
    started,
} from './fixtures/start';

installRuntimeHooks();

const INVALID: CommandResult = { status: 'rejected', code: 'target-invalid' };

describe('targets', () => {
    it('maps a target through every accepted transaction once, never through a query or a rejected batch', () => {
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

    it('maps a target through an undo', () => {
        const { handle, view } = start(stored(para(words('abcd'))), { model: targetModel });
        setSelection(handle, { text: 'bc' });
        const target = capture(handle, { purpose: 'format', onIntersectingEdit: 'map' });
        setSelection(handle, { text: 'abcd', from: 0, to: 0 });
        typeText(handle, 'x');

        handle.execute('history.undo');
        handle.execute('mark.bold.toggle', undefined, { target });

        expect([textOf(view.state.doc), markedText(view.state.doc, 'bold')]).toEqual(['abcd', 'bc']);
    });

    it('rejects every later command through an invalidate target that an edit crossed', () => {
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

    it('invalidates a map target once its range is deleted, though its positions still resolve', () => {
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

    it('keeps an edit-node target valid only while its node with that nodeId and type sits at its position', () => {
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

    it('invalidates an edit-node target once a node of another type holds its nodeId at its position', () => {
        const { handle, view } = start(stored(para(words('a'), mention('m-1'), words('b'))), { model: targetModel });
        setSelection(handle, { nodeId: 'm-1' });
        const target = capture(handle, { purpose: 'edit-node', onIntersectingEdit: 'map' });
        expect(handle.query('text.insert', { text: 'X' }, { target }).enabled).toBe(true);

        view.dispatch(view.state.tr.replaceWith(2, 3, view.state.schema.node('chip', { nodeId: 'm-1' })));

        expect(view.state.doc.nodeAt(2)?.type.name).toBe('chip');
        expect(handle.execute('text.insert', { text: 'X' }, { target })).toEqual(INVALID);
    });

    it('keeps an insert target after the text typed at its position', () => {
        const { handle, view } = start(stored(para(words('abcd'))), { model: targetModel });
        setSelection(handle, { text: 'abcd', from: 2, to: 2 });
        const target = capture(handle, { purpose: 'insert', onIntersectingEdit: 'map' });

        typeText(handle, 'x');
        expect(handle.execute('text.insert', { text: 'Y' }, { target }).status).toBe('applied');

        expect(textOf(view.state.doc)).toBe('abxYcd');
    });

    for (const purpose of ['format', 'replace-text'] as const) {
        for (const onIntersectingEdit of ['map', 'invalidate'] as const) {
            it(`keeps text typed at both ends out of a ${purpose} target that ${onIntersectingEdit}s`, () => {
                const { handle, view } = start(stored(para(words('abcdef'))), { model: targetModel });
                setSelection(handle, { text: 'cd' });
                const target = capture(handle, { purpose, onIntersectingEdit });

                setSelection(handle, { text: 'cd', from: 0, to: 0 });
                typeText(handle, 'X');
                setSelection(handle, { text: 'cd', from: 2, to: 2 });
                typeText(handle, 'Y');
                const value = { href: 'https://frontify.com', openInNewWindow: false, styleId: null };
                expect(handle.execute('link.set', value, { target }).status).toBe('applied');

                expect([textOf(view.state.doc), markedText(view.state.doc, 'link')]).toEqual(['abXcdYef', 'cd']);
            });
        }
    }

    it('keeps a format target captured at a caret empty after text typed there', () => {
        const { handle, view } = start(stored(para(words('abcd'))), { model: targetModel });
        setSelection(handle, { text: 'abcd', from: 2, to: 2 });
        const target = capture(handle, { purpose: 'format', onIntersectingEdit: 'map' });

        typeText(handle, 'X');

        expect(handle.execute('mark.bold.toggle', undefined, { target }).status).toBe('applied');
        expect([textOf(view.state.doc), markedText(view.state.doc, 'bold')]).toEqual(['abXcd', '']);
    });

    it('invalidates an insert target once a step removes the paragraph around it', () => {
        const { handle, view } = start(stored(para(words('ab')), para(words('cd'))), { model: targetModel });
        setSelection(handle, { text: 'cd', from: 1, to: 1 });
        const target = capture(handle, { purpose: 'insert', onIntersectingEdit: 'map' });

        view.dispatch(view.state.tr.delete(4, view.state.doc.content.size));

        expect(handle.execute('text.insert', { text: 'X' }, { target })).toEqual(INVALID);
        expect(textOf(view.state.doc)).toBe('ab');
    });

    it('captures an edit-node target at a text caret as invalid, since no node with a nodeId follows', () => {
        const { handle, view } = start(stored(para(words('ab'))), { model: targetModel });
        setSelection(handle, { text: 'ab', from: 1, to: 1 });
        const target = capture(handle, { purpose: 'edit-node', onIntersectingEdit: 'map' });

        expect(handle.execute('text.insert', { text: 'X' }, { target })).toEqual(INVALID);
        expect(textOf(view.state.doc)).toBe('ab');
    });

    it('keeps an edit-node target invalid once its node is cut, even when a node with its nodeId lands there', () => {
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

    it('captures an edit-node target on a selected node whose type carries no nodeId', () => {
        const { handle, runtime } = start(stored(para(words('a'), { type: 'hard_break' }, words('b'))), {
            model: targetModel,
        });
        runtime.select({ node: 2 });
        const target = capture(handle, { purpose: 'edit-node', onIntersectingEdit: 'map' });

        expect(handle.query('text.insert', { text: 'X' }, { target }).enabled).toBe(true);
    });

    it('keeps an edit-node target valid through an attribute edit of its leaf node', () => {
        const { handle, view } = start(stored(para(words('a'), mention('m-1'), words('b'))), { model: targetModel });
        setSelection(handle, { nodeId: 'm-1' });
        const target = capture(handle, { purpose: 'edit-node', onIntersectingEdit: 'map' });

        const node = view.state.doc.nodeAt(2) as Node;
        view.dispatch(view.state.tr.setNodeMarkup(2, undefined, { ...node.attrs, label: 'Bo' }));

        expect(view.state.doc.nodeAt(2)?.attrs.label).toBe('Bo');
        expect(handle.query('text.insert', { text: 'X' }, { target }).enabled).toBe(true);
    });

    it('stores a target at once, and rejects a capture during event notification', () => {
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

describe('targets on release and dispose', () => {
    it('removes a released target, and every target on dispose, from plugin state', () => {
        const generateId = countingIds();
        const { handle, runtime } = start(stored(para(words('abcd'))), { model: targetModel, generateId });
        const other = start(stored(para(words('abcd'))), { model: targetModel, generateId });
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

    it('keeps a target released during a composition released when the settled check restores the state', async () => {
        const session = start(stored(para(words('ab'))), { model: targetModel, policy: NOT_EDITABLE_CORE });
        const { handle } = session;
        setSelection(handle, { text: 'ab' });
        const target = capture(handle, { purpose: 'format', onIntersectingEdit: 'map' });

        compose(session, 'x');
        handle.releaseTarget(target);
        endComposition(session);
        await settleInput();

        expect(session.view.state.doc.textContent).toBe('ab');
        expect(probeRuntimes().targets).toBe(0);
        expect(handle.query('mark.bold.toggle', undefined, { target }).disabledReason).toBe('target-invalid');
    });

    it('removes every target from plugin state on replaceDocument, and later use is wrong-session', async () => {
        const { handle, runtime } = start(stored(para(words('abcd'))), { model: targetModel });
        setSelection(handle, { text: 'bc' });
        const target = capture(handle, { purpose: 'format', onIntersectingEdit: 'map' });
        capture(handle, { purpose: 'insert', onIntersectingEdit: 'map' });
        expect(probeRuntimes().targets).toBe(2);

        await handle.replaceDocument(replacing(handle, stored(para(words('cd')))));

        expect(countTargets(runtime.state)).toBe(0);
        expect(probeRuntimes().targets).toBe(0);
        expect(handle.execute('mark.bold.toggle', undefined, { target })).toEqual({
            status: 'rejected',
            code: 'wrong-session',
        });
    });

    it('refuses a capture while transitioning and creates no target', async () => {
        const { handle } = start(stored(para(words('ab'))), { model: targetModel });
        typeText(handle, 'x');
        const replaced = handle.replaceDocument(replacing(handle, stored(para()), { action: 'save' }));

        expect([
            handle.getSummary().phase,
            handle.captureTarget({ purpose: 'format', onIntersectingEdit: 'map' }),
        ]).toEqual(['transitioning', { status: 'rejected', code: 'not-ready' }]);
        expect(probeRuntimes().targets).toBe(0);
        expect(await replaced).toEqual({ status: 'rejected', code: 'unsaved' });
    });

    it('refuses a capture while mounting, faulted or disposed and creates no target', () => {
        const { tree } = decodeToTree(stored(para(words('ab'))), boldModel);
        const mounting = createEditorRuntime({
            definition: compileDefinition(boldModel, RUNTIME_PLUGINS, extensionsOf(boldModel, unitsOf(boldModel))),
            documentId: 'document-1',
            tree: tree as NonNullable<typeof tree>,
            capabilities: [],
            generateId: countingIds(),
            mode: 'editable',
            policy: authoringOf(boldModel),
            limits: limitsOf(undefined),
        });
        started.push(mounting);
        const faulted = start(stored(para()), {
            plugins: [appendForever('fixture.a', 'insertNode'), appendForever('fixture.b', 'setBlock')],
        });
        typeText(faulted.handle, 'x');
        const disposed = start(stored(para(words('ab'))));
        disposed.handle.dispose();
        // Attached after the other sessions' frames, so this one is still mounting.
        mounting.attach(document.body.appendChild(document.createElement('div')));
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
