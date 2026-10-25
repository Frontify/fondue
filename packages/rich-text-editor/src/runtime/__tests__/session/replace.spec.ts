/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { describe, expect, it } from 'vitest';

import { compileDefinition } from '#/definition';
import { unitsOf } from '#/features/__tests__/fixtures/units';
import { core } from '#/features/core/feature';
import { bold } from '#/features/marks-bold/feature';
import { compileContentModel, type JsonValue, type RichTextDocument } from '#/model';
import { limitsOf } from '#/model/internal';
import { extensionsOf } from '#/react/engine';

import { RUNTIME_PLUGINS } from '../../capabilities';
import { createBusy } from '../../session/busy';
import { createIdentity } from '../../session/identity';
import { createLifecycle } from '../../session/lifecycle';
import { createReplace } from '../../session/replace';
import { createStore } from '../../session/store';
import { type ReplaceDocumentRequest, type SaveStatus } from '../../types';

const model = compileContentModel([core(), bold()], { id: 'test.bold', version: 1 });
const definition = compileDefinition(model, RUNTIME_PLUGINS, extensionsOf(model, unitsOf(model)));
const stored = (text: string, id = 'test.bold') => ({
    format: 'frontify.rich-text',
    formatVersion: 1,
    model: { id, version: 1 },
    requiredCapabilities: [{ id: 'core', version: 1 }],
    content: {
        type: 'doc',
        attrs: { lang: null, dir: 'auto' },
        content: [
            { type: 'paragraph', attrs: { lang: null }, content: [{ type: 'text', text }] },
        ] as readonly JsonValue[],
    },
});

interface Options {
    ready?: boolean;
    active?: boolean;
    unsaved?: boolean;
    outcomeUnknown?: boolean;
    installs?: boolean;
    fresh?: () => EditorState;
    commit?: () => Promise<unknown>;
}

const setup = (options: Options = {}) => {
    const { ready = true, active = false, unsaved = false, outcomeUnknown = false, installs = true } = options;
    const calls: string[] = [];
    const lifecycle = createLifecycle();
    if (ready) {
        lifecycle.to('ready');
    }
    const identity = createIdentity({ documentId: 'document-1', generate: () => 'session-1' });
    const doc = definition.schema.nodeFromJSON(stored('ab').content);
    const store = createStore(EditorState.create({ doc }));
    const encoder = { capabilities: [{ id: 'core', version: 1 }] };
    const current = stored('ab') as unknown as RichTextDocument;
    const replace = createReplace({
        definition,
        limits: limitsOf(undefined),
        lifecycle,
        identity,
        store,
        encoder,
        policy: { setCapabilities: () => calls.push('policy.setCapabilities') },
        saving: {
            status: () => ({ revision: null }) as SaveStatus,
            commit: (commitOptions) => {
                calls.push(`saving.commit:${commitOptions.reason}`);
                return (options.commit?.() ?? Promise.resolve({ status: 'acknowledged' })) as never;
            },
            unsaved: () => unsaved,
            outcomeUnknown: () => outcomeUnknown,
            replaced: (revision, previous) => calls.push(`saving.replaced:${String(revision)}:${previous.sequence}`),
            settled: () => calls.push('saving.settled'),
        },
        composition: { active: () => active },
        shown: {
            snapshot: () => ({ document: current }) as never,
            setPublished: () => calls.push('shown.setPublished'),
            emitSelection: () => calls.push('shown.emitSelection'),
            emitSaveStatus: () => calls.push('shown.emitSaveStatus'),
        },
        view: { current: () => undefined, refresh: () => calls.push(`view.refresh:${lifecycle.phase()}`) },
        commit: {
            guarded: (work) => work(),
            installState: (next) => {
                calls.push('commit.installState');
                if (installs) {
                    store.set(next);
                }
                return installs;
            },
        },
        focus: { refocus: () => calls.push('focus.refocus') },
        targets: {
            coordinator: {
                settle: () => calls.push('coordinator.settle'),
                abortWhere: () => calls.push('coordinator.abortWhere'),
            } as never,
        },
        queue: { drain: () => calls.push('queue.drain'), settle: (code) => calls.push(`queue.settle:${code}`) },
        uploads: { reset: () => calls.push('uploads.reset') },
        faults: {
            fault: () => calls.push('faults.fault'),
            withoutRecovery: (work) => {
                calls.push('faults.withoutRecovery');
                return work();
            },
        },
        busy: createBusy(),
        events: { notify: () => calls.push('notify'), emit: (event) => calls.push(`emit:${event}`) },
        metrics: {
            measure: (kind, _started, failureCode) => calls.push(`measure:${kind}:${String(failureCode)}`),
        },
        history: {
            fresh: (next, selection) => {
                if (options.fresh !== undefined) {
                    return options.fresh();
                }
                return EditorState.create({ doc: next as Node, ...(selection === undefined ? {} : { selection }) });
            },
        },
    });
    const request = (patch: Partial<ReplaceDocumentRequest> = {}, document: unknown = stored('cd')) => ({
        expected: identity.stamp(),
        next: { documentId: 'document-2', revision: null, document: document as RichTextDocument },
        unsaved: { action: 'discard', confirmed: true } as const,
        selection: 'start' as const,
        history: 'reset' as const,
        ...patch,
    });
    return { replace, request, calls, lifecycle, identity, store, encoder, current };
};

describe('createReplace', () => {
    it('refuses outside ready and reports the failure code as the operation metric', async () => {
        const { replace, request, calls } = setup({ ready: false });
        expect(await replace.replaceDocument(request())).toEqual({ status: 'rejected', code: 'not-ready' });
        expect(calls).toEqual(['measure:replace:not-ready']);
    });

    it('refuses a document of another model, or no valid document', async () => {
        const { replace, request } = setup();
        expect(await replace.replaceDocument(request({}, stored('cd', 'other')))).toEqual({
            status: 'rejected',
            code: 'wrong-model',
        });
        expect(await replace.replaceDocument(request({}, 42))).toEqual({
            status: 'rejected',
            code: 'invalid-document',
        });
    });

    it('returns the current session when the host echoes its own save', async () => {
        const { replace, request, calls, current, identity } = setup();
        const result = await replace.replaceDocument(
            request({ next: { documentId: 'document-1', revision: null, document: current } }),
        );
        expect(result).toEqual({ status: 'replaced', session: identity.session() });
        expect(calls).toEqual(['measure:replace:null']);
    });

    it('refuses a stale request, and a composition that runs', async () => {
        const stale = setup();
        const old = stale.request();
        stale.identity.bumpSequence();
        expect(await stale.replace.replaceDocument(old)).toEqual({ status: 'rejected', code: 'changed-since-request' });
        const composing = setup({ active: true });
        expect(await composing.replace.replaceDocument(composing.request())).toEqual({
            status: 'rejected',
            code: 'composition-active',
        });
        expect(composing.lifecycle.phase()).toBe('ready');
    });

    it('resumes ready and runs what waited when the unsaved policy refuses', async () => {
        const { replace, request, calls, lifecycle } = setup({ unsaved: true });
        const unsaved = { action: 'reject' } as const;
        const result = await replace.replaceDocument(request({ unsaved }));
        expect(result).toEqual({ status: 'rejected', code: 'unsaved' });
        expect(lifecycle.phase()).toBe('ready');
        expect(calls).toEqual([
            'view.refresh:transitioning',
            'view.refresh:ready',
            'coordinator.settle',
            'saving.settled',
            'queue.drain',
            'focus.refocus',
            'measure:replace:unsaved',
        ]);
    });

    it('refuses a checkpoint of another stamp, or with no receipt', async () => {
        const { replace, request, identity } = setup({ unsaved: true });
        const receipt = { stamp: { ...identity.stamp(), sequence: 9 } } as never;
        expect(await replace.replaceDocument(request({ unsaved: { action: 'checkpoint', receipt } }))).toEqual({
            status: 'rejected',
            code: 'checkpoint-invalid',
        });
        expect(
            await replace.replaceDocument(request({ unsaved: { action: 'checkpoint', receipt: undefined as never } })),
        ).toEqual({ status: 'rejected', code: 'unsaved' });
    });

    it('goes on after a save that is acknowledged or unknown, and stops after one that failed', async () => {
        for (const [commit, status] of [
            [{ status: 'acknowledged' }, 'replaced'],
            [{ status: 'failed', outcome: 'unknown' }, 'replaced'],
            [{ status: 'failed', outcome: 'rejected' }, 'rejected'],
        ] as const) {
            const { replace, request } = setup({ unsaved: true, commit: () => Promise.resolve(commit) });
            const result = await replace.replaceDocument(request({ unsaved: { action: 'save' } }));
            expect(result.status).toBe(status);
        }
    });

    it('refuses while the outcome of a write is unknown', async () => {
        const { replace, request } = setup({ outcomeUnknown: true });
        expect(await replace.replaceDocument(request())).toEqual({ status: 'rejected', code: 'save-unresolved' });
    });

    it('refuses as not-ready when the session ends while the save runs, and keeps that phase', async () => {
        const { replace, request, lifecycle } = setup({
            unsaved: true,
            commit: () => {
                lifecycle.to('disposed');
                return Promise.resolve({ status: 'acknowledged' });
            },
        });
        expect(await replace.replaceDocument(request({ unsaved: { action: 'save' } }))).toEqual({
            status: 'rejected',
            code: 'not-ready',
        });
        expect(lifecycle.phase()).toBe('disposed');
    });

    it('installs the next document in the next generation and returns to ready', async () => {
        const { replace, request, calls, lifecycle, identity, store, encoder } = setup();
        const before = identity.session();
        const result = await replace.replaceDocument(request({ selection: 'end' }));
        expect(result).toEqual({ status: 'replaced', session: identity.session() });
        expect(identity.session()).toEqual({ documentId: 'document-2', sessionId: before.sessionId, generation: 1 });
        expect(lifecycle.phase()).toBe('ready');
        expect(store.state.doc.textContent).toBe('cd');
        expect(store.state.selection.from).toBe(store.state.doc.content.size - 1);
        expect(encoder.capabilities).toEqual([{ id: 'core', version: 1 }]);
        expect(calls).toEqual([
            'view.refresh:transitioning',
            'faults.withoutRecovery',
            'commit.installState',
            'queue.settle:wrong-session',
            'shown.setPublished',
            'policy.setCapabilities',
            'saving.replaced:null:0',
            'view.refresh:ready',
            'coordinator.abortWhere',
            'uploads.reset',
            'coordinator.settle',
            'notify',
            'shown.emitSelection',
            'shown.emitSaveStatus',
            'emit:replaced',
            'focus.refocus',
            'measure:replace:null',
        ]);
    });

    it('faults the session when the fresh state cannot be built, and when the view throws installing it', async () => {
        const building = setup({
            fresh: () => {
                throw new Error('bad');
            },
        });
        expect(await building.replace.replaceDocument(building.request())).toEqual({
            status: 'rejected',
            code: 'faulted',
        });
        expect(building.calls).toContain('faults.fault');
        const installing = setup({ installs: false });
        expect(await installing.replace.replaceDocument(installing.request())).toEqual({
            status: 'rejected',
            code: 'faulted',
        });
        expect(installing.calls).not.toContain('queue.settle:wrong-session');
    });
});
