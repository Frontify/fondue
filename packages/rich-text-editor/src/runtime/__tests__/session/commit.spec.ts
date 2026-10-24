/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Schema } from 'prosemirror-model';
import { EditorState, NodeSelection, TextSelection, type Transaction } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';
import { describe, expect, it } from 'vitest';

import { ORIGIN_META } from '#/definition';
import { type Diagnostic, type ResourceLimits } from '#/model';
import { diagnostic } from '#/model/format';

import { ENTER_RULES_META } from '../../input-rules';
import { createCommit } from '../../session/commit';
import { createIdentity } from '../../session/identity';
import { createLifecycle } from '../../session/lifecycle';
import { createPrepare, type Prepare } from '../../session/prepare';
import { createStore } from '../../session/store';
import { type Prepared } from '../../session/types';

const schema = new Schema({
    nodes: {
        doc: { content: 'block+' },
        paragraph: { content: 'text*', group: 'block' },
        rule: { group: 'block', atom: true },
        text: {},
    },
});
const make = () =>
    EditorState.create({
        doc: schema.node('doc', undefined, [
            schema.node('paragraph', undefined, [schema.text('ab')]),
            schema.node('rule'),
        ]),
    });

const setup = ({
    broken = false,
    breaks = false,
    take = undefined as ((root: Transaction) => Prepared) | undefined,
    provisional = false,
    inputRules = (() => undefined) as () => false | { readonly exclude: readonly string[] } | undefined,
    onUpdate = undefined as ((next: EditorState, commit: (root: Transaction) => void) => void) | undefined,
} = {}) => {
    const store = createStore(make());
    const identity = createIdentity({ documentId: 'd', generate: () => 'id' });
    const lifecycle = createLifecycle();
    lifecycle.to('ready');
    const log: string[] = [];
    const diagnostics: Diagnostic[] = [];
    const faults: Diagnostic[] = [];
    const resources = { targets: 0 };
    let published = store.state;
    const provisionals: unknown[] = [];
    const shown = {
        published: () => published,
        setPublished: (next: EditorState) => {
            published = next;
        },
        provisional: () => (provisional ? store.state.tr.mapping : undefined),
        addProvisional: (mapping: unknown) => provisionals.push(mapping),
        emitSelection: () => log.push('selection'),
        emitSaveStatus: () => log.push('status'),
    };
    const prepareService = createPrepare({
        store,
        composition: { active: () => provisional },
        shown,
        policy: { current: () => ({ features: {} }) as never, finalCheck: () => ({ policy: false, limit: undefined }) },
        inputRules,
        history: { group: () => undefined },
        limits: { maxAppendedTransactions: 8, maxDocumentNodes: 100 } as ResourceLimits,
        generate: () => 'id',
    });
    const prepare: Prepare = take === undefined ? prepareService : { ...prepareService, take };
    const viewFaults: EditorState[] = [];
    const attached = {
        updateState: (next: EditorState) => {
            if (broken) {
                throw new Error('view');
            }
            onUpdate?.(next, (root) => service.commit(root));
        },
    } as unknown as EditorView;
    const service = createCommit({
        store,
        identity,
        lifecycle,
        policy: { breaks: () => breaks, exceeds: () => undefined },
        shown,
        views: {
            current: () => attached,
            call: (work) => {
                try {
                    return { threw: false, value: work() };
                } catch {
                    return { threw: true, value: undefined };
                }
            },
        },
        busy: { run: (work) => work() },
        metrics: { record: () => log.push('record') },
        prepare,
        encode: () => ({}) as never,
        emit: (event, value) => log.push(`${event}:${value.origin}`),
        notify: () => log.push('notify'),
        report: (found) => diagnostics.push(found),
        resources,
        hooks: {
            committed: (_transactions, fromHistory) => log.push(`committed:${String(fromHistory)}`),
            changed: () => log.push('changed'),
        },
        fault: (found) => faults.push(found),
        viewFault: (_view, candidate) => viewFaults.push(candidate),
    });
    return { service, store, identity, lifecycle, log, diagnostics, faults, viewFaults, resources, provisionals };
};

describe('createCommit commit', () => {
    it('installs a changed document and publishes in the Event order', () => {
        const { service, store, identity, log } = setup();
        service.commit(store.state.tr.insertText('c', 1));
        expect(store.state.doc.textContent).toBe('cab');
        expect(log).toEqual([
            'notify',
            'documentChange:unknown',
            'record',
            'committed:false',
            'selection',
            'changed',
            'status',
        ]);
        expect(identity.commitSequence()).toBe(1);
        expect(identity.sequence()).toBe(1);
    });

    it('publishes a selection move without a change event', () => {
        const { service, store, log } = setup();
        service.commit(store.state.tr.setSelection(TextSelection.create(store.state.doc, 2)));
        expect(log).toEqual(['notify', 'selection', 'status']);
    });

    it('reports a root built on an older document and installs nothing', () => {
        const { service, store, diagnostics, log } = setup();
        const stale = store.state.tr.insertText('c', 1);
        store.set(make());
        service.commit(stale);
        expect(diagnostics.map(({ code }) => code)).toEqual(['runtime.stale-transaction']);
        expect(log).toEqual([]);
    });

    it('installs nothing in a faulted or disposed session', () => {
        const faulted = setup();
        faulted.lifecycle.to('faulted');
        faulted.service.commit(faulted.store.state.tr.insertText('c', 1));
        expect(faulted.store.state.doc.textContent).toBe('ab');
        const disposed = setup();
        disposed.lifecycle.to('disposed');
        disposed.service.commit(disposed.store.state.tr.insertText('c', 1));
        expect(disposed.log).toEqual([]);
    });

    it('marks a typed batch as input, once, and never a batch after it', () => {
        const rules = setup({ inputRules: () => false });
        rules.service.markTyping();
        rules.service.commit(rules.store.state.tr.insertText('c', 1));
        rules.service.commit(rules.store.state.tr.insertText('d', 1));
        expect(rules.log.filter((entry) => entry.startsWith('documentChange'))).toEqual([
            'documentChange:input',
            'documentChange:unknown',
        ]);
        const root = rules.store.state.tr.insertText('e', 1);
        rules.service.commit(root);
        expect(root.getMeta(ORIGIN_META)).toBeUndefined();
        const enter = rules.store.state.tr.insertText('f', 1).setMeta(ENTER_RULES_META, true);
        rules.service.commit(enter);
        expect(enter.getMeta(ORIGIN_META)).toBeUndefined();
    });

    it('reports a prepare diagnostic and faults on a prepare fault', () => {
        const found = diagnostic('runtime.plugin-error', undefined, { name: 'x' }, 'error');
        const reported = setup({ take: () => ({ code: 'not-applicable', diagnostic: found }) });
        reported.service.commit(reported.store.state.tr.insertText('c', 1));
        expect(reported.diagnostics).toEqual([found]);
        const faulted = setup({ take: () => ({ code: 'not-ready', fault: found }) });
        faulted.service.commit(faulted.store.state.tr.insertText('c', 1));
        expect(faulted.faults).toEqual([found]);
        expect(faulted.diagnostics).toEqual([]);
    });

    it('restores the state and reports the view fault when the view throws', () => {
        const { service, store, viewFaults, log, identity } = setup({ broken: true });
        const before = store.state;
        service.commit(before.tr.insertText('c', 1));
        expect(store.state).toBe(before);
        expect(viewFaults).toHaveLength(1);
        expect(viewFaults[0]?.doc.textContent).toBe('cab');
        expect(log).toEqual([]);
        expect(identity.commitSequence()).toBe(0);
    });

    it('keeps a provisional batch for input settling', () => {
        const { service, store, log, provisionals } = setup({ provisional: true });
        service.commit(store.state.tr.insertText('c', 1).setMeta('composition', true));
        expect(store.state.doc.textContent).toBe('cab');
        expect(provisionals).toHaveLength(1);
        expect(log).toEqual(['notify']);
    });
});

describe('createCommit guarded', () => {
    it('commits the roots that a plugin view dispatches during an install after it publishes', () => {
        let dispatched = false;
        const { service, store, log } = setup({
            onUpdate: (next, commit) => {
                if (!dispatched) {
                    dispatched = true;
                    commit(next.tr.insertText('d', 1));
                }
            },
        });
        service.commit(store.state.tr.insertText('c', 1));
        expect(store.state.doc.textContent).toBe('dcab');
        expect(log.filter((entry) => entry.startsWith('documentChange'))).toHaveLength(2);
        expect(log.indexOf('notify')).toBeLessThan(log.lastIndexOf('notify'));
    });

    it('commits nothing of the waiting roots once a listener faulted the session', () => {
        let dispatched = false;
        const ctx = setup({
            onUpdate: (next, commit) => {
                if (!dispatched) {
                    dispatched = true;
                    commit(next.tr.insertText('d', 1));
                }
            },
        });
        ctx.service.guarded(() => {
            ctx.service.installState(ctx.store.state.apply(ctx.store.state.tr.insertText('c', 1)));
            ctx.lifecycle.to('faulted');
        });
        expect(ctx.store.state.doc.textContent).toBe('cab');
        expect(ctx.log).toEqual([]);
    });

    it('forgets waiting roots on clearDeferred', () => {
        const ctx = setup();
        ctx.service.guarded(() => {
            ctx.service.commit(ctx.store.state.tr.insertText('c', 1));
            ctx.service.clearDeferred();
        });
        expect(ctx.store.state.doc.textContent).toBe('ab');
    });
});

describe('createCommit settleProvisional', () => {
    it('publishes the settled batch as input', () => {
        const { service, store, log } = setup();
        const mapping = store.state.tr.mapping;
        expect(service.settleProvisional(mapping)).toBe(true);
        expect(log).toEqual(['notify', 'selection', 'status']);
    });

    it('restores the published state when the settled change breaks the policy', () => {
        const { service, store, log } = setup({ breaks: true });
        const published = store.state;
        store.set(store.state.apply(store.state.tr.insertText('c', 1)));
        const mapping = store.state.tr.mapping;
        expect(service.settleProvisional(mapping)).toBe(true);
        expect(store.state.doc.eq(published.doc)).toBe(true);
        expect(log).toEqual(['notify']);
    });
});

describe('createCommit select', () => {
    it('commits a text selection and a node selection', () => {
        const { service, store } = setup();
        service.select({ anchor: 1, head: 2 });
        expect(store.state.selection).toBeInstanceOf(TextSelection);
        expect(store.state.selection.from).toBe(1);
        expect(store.state.selection.to).toBe(2);
        service.select({ node: 4 });
        expect(store.state.selection).toBeInstanceOf(NodeSelection);
    });
});
