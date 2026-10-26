/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Schema } from 'prosemirror-model';
import { EditorState, type Transaction } from 'prosemirror-state';
import { describe, expect, it } from 'vitest';

import { COMMAND_META, ORIGIN_META } from '#/runtime/definition';

import { historyPlugin, undo } from '../../history';
import { actionOrigin, createHistory, originOf } from '../../session/history';
import { createLifecycle } from '../../session/lifecycle';
import { createStore } from '../../session/store';

const schema = new Schema({
    nodes: {
        doc: { content: 'paragraph+' },
        paragraph: { content: 'text*', group: 'block' },
        text: {},
    },
});

const setup = ({ active = false, installs = true, ready = true } = {}) => {
    const lifecycle = createLifecycle();
    if (ready) {
        lifecycle.to('ready');
    }

    const store = createStore(EditorState.create({ schema }));
    const calls: string[] = [];
    const service = createHistory({
        store,
        lifecycle,
        composition: { active: () => active },
        notify: () => calls.push('notify'),
        install: (next) => {
            calls.push('install');
            if (installs) {
                store.set(next);
            }

            return installs;
        },
        publish: () => calls.push('publish'),
        uploads: (_doc, keep) => calls.push(`uploads:${String(keep)}`),
    });

    return { service, store, calls };
};

describe('actionOrigin and originOf', () => {
    const root = () => EditorState.create({ schema }).tr;

    it('names a command, paste, cut or drop an action', () => {
        expect(actionOrigin(root().setMeta(COMMAND_META, 'x'))).toBe('command');
        expect(actionOrigin(root().setMeta('uiEvent', 'paste'))).toBe('paste');
        expect(actionOrigin(root().setMeta('uiEvent', 'cut'))).toBe('cut');
        expect(actionOrigin(root().setMeta('uiEvent', 'drop'))).toBe('drop');
        expect(actionOrigin(root().setMeta('uiEvent', 'input'))).toBeUndefined();
    });

    it('ranks async, then action, then input, else unknown', () => {
        expect(originOf(root().setMeta(ORIGIN_META, 'async').setMeta(COMMAND_META, 'x'))).toBe('async');
        expect(originOf(root().setMeta(COMMAND_META, 'x').setMeta(ORIGIN_META, 'input'))).toBe('command');
        expect(originOf(root().setMeta(ORIGIN_META, 'input'))).toBe('input');
        expect(originOf(root())).toBe('unknown');
    });

    it('reports history for an undo transaction', () => {
        let state = EditorState.create({ schema, plugins: [historyPlugin({})] });
        state = state.apply(state.tr.insertText('a', 1));
        let undone: Transaction | undefined;
        undo(state, (tr) => {
            undone = tr;
        });
        expect(undone && originOf(undone)).toBe('history');
    });
});

describe('createHistory', () => {
    it('fresh keeps the document and selection by default', () => {
        const { service, store } = setup();
        const next = service.fresh();
        expect(next.doc).toBe(store.state.doc);
        expect(next.selection.eq(store.state.selection)).toBe(true);
        expect(next.plugins).toEqual(store.state.plugins);
    });

    it('fresh holds the given document', () => {
        const { service } = setup();
        const doc = schema.node('doc', null, [schema.node('paragraph', null, [schema.text('a')])]);
        expect(service.fresh(doc).doc).toBe(doc);
    });

    it('group does not throw for an action root', () => {
        const { service, store } = setup();
        expect(() => service.group(store.state.tr.setMeta(COMMAND_META, 'x'))).not.toThrow();
    });

    it('clear installs, publishes, keeps uploads and notifies in that order', () => {
        const { service, calls } = setup();
        service.clear();
        expect(calls).toEqual(['install', 'publish', 'uploads:true', 'notify']);
    });

    it('clear stops after a refused install', () => {
        const { service, calls } = setup({ installs: false });
        service.clear();
        expect(calls).toEqual(['install']);
    });

    it('clear does nothing outside ready', () => {
        const { service, calls } = setup({ ready: false });
        service.clear();
        expect(calls).toEqual([]);
    });

    it('clear does nothing while input is settling', () => {
        const { service, calls } = setup({ active: true });
        service.clear();
        expect(calls).toEqual([]);
    });
});
