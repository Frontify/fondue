/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Schema } from 'prosemirror-model';
import { EditorState, Plugin, type Transaction } from 'prosemirror-state';
import { describe, expect, it } from 'vitest';

import { APPEND_BATCH_META, NORMALIZE_META } from '#/definition';
import { type ResourceLimits } from '#/model';

import { createPrepare, DUPLICATE_ENGINE, pluginError } from '../../session/prepare';
import { createStore } from '../../session/store';

const schema = new Schema({
    nodes: {
        doc: { content: 'paragraph+' },
        paragraph: { content: 'text*' },
        text: {},
    },
});
const make = (plugins: Plugin[] = []) =>
    EditorState.create({
        doc: schema.node('doc', undefined, [schema.node('paragraph', undefined, [schema.text('ab')])]),
        plugins,
    });

const setup = ({
    plugins = [] as Plugin[],
    active = false,
    provisional = false,
    refuse = undefined as 'policy' | 'limit' | undefined,
    maxDocumentNodes = 100,
    rules = undefined as false | { exclude: readonly string[] } | undefined,
    features = {} as Record<string, { create: boolean }>,
} = {}) => {
    const store = createStore(make(plugins));
    const grouped: Transaction[] = [];
    let counter = 0;
    const service = createPrepare({
        store,
        composition: { active: () => active },
        shown: { provisional: () => (provisional ? store.state.tr.mapping : undefined) },
        policy: {
            current: () => ({ features }) as never,
            finalCheck: () => ({
                policy: refuse === 'policy',
                limit: refuse === 'limit' ? 'maxTextLength' : undefined,
            }),
        },
        history: { group: (root) => grouped.push(root) },
        limits: { maxAppendedTransactions: 8, maxDocumentNodes } as ResourceLimits,
        inputRules: () => rules,
        generate: () => {
            counter += 1;

            return `id${counter}`;
        },
    });

    return { service, store, grouped };
};

describe('pluginError', () => {
    it('names the error and the feature, never the message', () => {
        expect(pluginError(new TypeError('secret'), 'x.feature')).toMatchObject({
            code: 'runtime.plugin-error',
            details: { featureId: 'x.feature', name: 'TypeError' },
        });
        expect(pluginError(new TypeError('secret'), undefined).details).toEqual({ name: 'TypeError' });
    });
});

describe('DUPLICATE_ENGINE', () => {
    it('warns about a second copy of prosemirror-model', () => {
        expect(DUPLICATE_ENGINE).toMatchObject({ code: 'runtime.duplicate-engine', severity: 'warning' });
    });
});

describe('createPrepare prepare', () => {
    it('returns the candidate, the mapping and no appended transactions, and groups history first', () => {
        const { service, store, grouped } = setup();
        const root = store.state.tr.insertText('c', 1);
        const prepared = service.prepare(root, () => 'n', true);
        expect(prepared).toMatchObject({ root, appended: 0 });
        expect('candidate' in prepared && prepared.candidate.doc.textContent).toBe('cab');
        expect(grouped).toEqual([root]);
        expect(root.getMeta(APPEND_BATCH_META)).toBeDefined();
    });

    it('drops a batch that a plugin filter removes', () => {
        const { service, store } = setup({ plugins: [new Plugin({ filterTransaction: () => false })] });
        expect(service.prepare(store.state.tr.insertText('c', 1), () => 'n', true)).toEqual({
            code: 'not-applicable',
        });
    });

    it('reports a plugin that throws and keeps the session ready', () => {
        const throwing = new Plugin({
            appendTransaction: () => {
                throw new TypeError('boom');
            },
        });
        const { service, store } = setup({ plugins: [throwing] });
        const prepared = service.prepare(store.state.tr.insertText('c', 1), () => 'n', true);
        expect(prepared).toMatchObject({ code: 'not-applicable', diagnostic: { code: 'runtime.plugin-error' } });
    });

    it('refuses a changed document that the final check refuses, with its limit', () => {
        const { service, store } = setup({ refuse: 'limit' });
        expect(service.prepare(store.state.tr.insertText('c', 1), () => 'n', true)).toEqual({
            code: 'not-allowed',
            limit: 'maxTextLength',
        });
    });

    it('skips the final check for a selection move, a settle repair and a provisional view batch', () => {
        const { service, store } = setup({ refuse: 'policy' });
        expect(service.prepare(store.state.tr, () => 'n', true)).toHaveProperty('candidate');
        const repair = store.state.tr.insertText('c', 1).setMeta(NORMALIZE_META, 'now');
        expect(service.prepare(repair, () => 'n', false)).toHaveProperty('candidate');
        const composing = setup({ refuse: 'policy', active: true, provisional: true });
        const root = composing.store.state.tr.insertText('c', 1);
        expect(composing.service.prepare(root, () => 'n', true)).toHaveProperty('candidate');
        expect(root.getMeta(NORMALIZE_META)).toBe('later');
    });
});

describe('createPrepare provisional', () => {
    it('holds while composing and a provisional batch or a composition meta exists', () => {
        const idle = setup();
        const root = idle.store.state.tr;
        expect(idle.service.isProvisional(root)).toBe(false);
        expect(setup({ active: true }).service.isProvisional(root)).toBe(false);
        expect(setup({ active: true }).service.isProvisional(root.setMeta('composition', true))).toBe(true);
        expect(setup({ active: true, provisional: true }).service.isProvisional(root)).toBe(true);
        expect(setup({ provisional: true }).service.isProvisional(root)).toBe(false);
    });
});

describe('createPrepare ids', () => {
    it('replays the recorded ids for a query, then records what it draws past them', () => {
        const { service } = setup();
        const first = service.queriedIds();
        expect([first(), first()]).toEqual(['id1', 'id2']);
        const second = service.queriedIds();
        expect([second(), second(), second()]).toEqual(['id1', 'id2', 'id3']);
    });

    it('hands the recorded ids to installs first, then new ones', () => {
        const { service } = setup();
        const query = service.queriedIds();
        query();
        query();
        expect([service.installedId(), service.installedId(), service.installedId()]).toEqual(['id1', 'id2', 'id3']);
    });
});

describe('createPrepare exceededLimit and take', () => {
    it('refuses a root over the node limit before it draws an id, unless it is a follow-up', () => {
        const { service, store } = setup({ maxDocumentNodes: 3 });
        const root = store.state.tr.insert(
            store.state.doc.content.size,
            schema.node('paragraph', undefined, [schema.text('c')]),
        );
        expect(service.exceededLimit(root)).toBe('maxDocumentNodes');
        expect(service.exceededLimit(root, true)).toBeUndefined();
    });

    it('reports the limit of the final check', () => {
        const { service, store } = setup({ refuse: 'limit' });
        expect(service.exceededLimit(store.state.tr.insertText('c', 1))).toBe('maxTextLength');
    });

    it('hands the checked batch to take once, and the ids it drew are spent', () => {
        const { service, store } = setup();
        const root = store.state.tr.insertText('c', 1);
        expect(service.exceededLimit(root)).toBeUndefined();
        const taken = service.take(root);
        expect(taken).toHaveProperty('candidate');
        expect(service.take(root)).not.toBe(taken);
    });

    it('prepares afresh when the state moved or the root is another', () => {
        const { service, store } = setup();
        const root = store.state.tr.insertText('c', 1);
        service.exceededLimit(root);
        const other = store.state.tr.insertText('d', 1);
        expect(service.take(other)).toMatchObject({ root: other });
        service.exceededLimit(root);
        store.set(make());
        expect(service.take(root)).toMatchObject({ root });
    });
});

describe('createPrepare markRules', () => {
    it('turns every rule off when the host turns them off', () => {
        const { service, store } = setup({ rules: false });
        const root = store.state.tr;
        service.markRules(root);
        expect(root.getMeta('rte.input-rules-off')).toBe(true);
    });

    it('carries the excluded rules and the features whose policy forbids creating', () => {
        const { service, store } = setup({
            rules: { exclude: ['quotes'] },
            features: { 'a.feature': { create: false }, 'b.feature': { create: true } },
        });
        const root = store.state.tr;
        service.markRules(root);
        expect(root.getMeta('rte.input-rules-setting')).toEqual({ exclude: ['quotes'], refused: ['a.feature'] });
    });

    it('excludes nothing without the host prop', () => {
        const { service, store } = setup();
        const root = store.state.tr;
        service.markRules(root);
        expect(root.getMeta('rte.input-rules-setting')).toEqual({ exclude: [], refused: [] });
    });
});
