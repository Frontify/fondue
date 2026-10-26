/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Schema } from 'prosemirror-model';
import { EditorState, TextSelection } from 'prosemirror-state';
import { describe, expect, it } from 'vitest';

import { type AsyncRequest } from '../../async';
import { createBusy } from '../../session/busy';
import { createIdentity } from '../../session/identity';
import { createLifecycle } from '../../session/lifecycle';
import { createStore } from '../../session/store';
import { createTargetsService } from '../../session/targets';
import { countTargets, targetsPlugin } from '../../targets';
import { type SelectionHandle } from '../../types';

const schema = new Schema({
    nodes: {
        doc: { content: 'paragraph+' },
        paragraph: { content: 'text*', group: 'block' },
        text: {},
    },
});

const setup = (phase: 'ready' | 'disposed' = 'ready') => {
    let next = 0;
    const generate = () => `id-${++next}`;
    const identity = createIdentity({ documentId: 'doc', generate });
    const lifecycle = createLifecycle();
    lifecycle.to('ready');
    if (phase === 'disposed') {
        lifecycle.to('disposed');
    }

    const busy = createBusy();
    const calls: string[] = [];
    const doc = schema.node('doc', null, [schema.node('paragraph', null, [schema.text('hello world')])]);
    const store = createStore(
        EditorState.create({ doc, selection: TextSelection.create(doc, 2, 5), plugins: [targetsPlugin] }),
    );
    const service = createTargetsService({
        store,
        identity,
        lifecycle,
        busy,
        policy: { revision: () => 0 },
        composition: { active: () => false },
        commit: (root) => store.set(store.state.apply(root)),
        generate,
        report: () => undefined,
        serviceChanged: () => calls.push('serviceChanged'),
        apply: () => undefined,
    });

    return { service, store, busy, lifecycle, calls };
};

const options = { purpose: 'format', onIntersectingEdit: 'map' } as const;

const capture = (service: ReturnType<typeof setup>['service']): SelectionHandle => {
    const result = service.captureRange(options, undefined);
    if (result.status !== 'captured') {
        throw new Error('not captured');
    }

    return result.target;
};

const request = (overrides: Partial<AsyncRequest> = {}): AsyncRequest => ({
    key: 'k',
    service: 'uploads',
    featureId: 'media.image',
    action: 'create',
    command: 'insert',
    run: () => new Promise(() => undefined),
    ...overrides,
});

describe('createTargetsService', () => {
    it('captures the selection as a target the base state selects', () => {
        const { service, store } = setup();
        const target = capture(service);
        expect(countTargets(store.state)).toBe(1);
        store.set(store.state.apply(store.state.tr.setSelection(TextSelection.create(store.state.doc, 1))));
        const base = service.baseOf({ target });
        expect(base).not.toBe(store.state);
        expect(typeof base === 'string' ? base : [base.selection.from, base.selection.to]).toEqual([2, 5]);
    });

    it('refuses a capture while a commit or notification runs, or when not ready', () => {
        const { service, busy, store } = setup();
        busy.run(() => {
            expect(service.captureRange(options, undefined)).toEqual({ status: 'rejected', code: 'not-ready' });
        });
        expect(countTargets(store.state)).toBe(0);
        expect(setup('disposed').service.captureRange(options, undefined)).toEqual({
            status: 'rejected',
            code: 'not-ready',
        });
    });

    it('answers the current state for a missing target and a code for a foreign or unknown one', () => {
        const { service, store } = setup();
        expect(service.baseOf(undefined)).toBe(store.state);
        expect(service.baseOf({ target: undefined })).toBe(store.state);
        expect(service.baseOf({ target: 'x' })).toBe('target-invalid');
        const foreign = Object.freeze({ id: 'id-9', session: { sessionId: 'other', generation: 0 } });
        expect(service.baseOf({ target: foreign })).toBe('wrong-session');
        const ownUnknown = Object.freeze({
            id: 'id-9',
            session: (capture(service) as unknown as { session: unknown }).session,
        });
        expect(service.baseOf({ target: ownUnknown })).toBe('target-invalid');
    });

    it('releases a target, and ignores the release once disposed', () => {
        const { service, store, lifecycle } = setup();
        const target = capture(service);
        lifecycle.to('disposed');
        service.releaseTarget(target);
        expect(countTargets(store.state)).toBe(1);
        const live = setup();
        const handle = capture(live.service);
        live.service.releaseTarget(handle);
        expect(countTargets(live.store.state)).toBe(0);
    });

    it('defers the capture of an operation started during a commit until flushCaptures', () => {
        const { service, store, busy } = setup();
        const operation = busy.run(() => service.coordinator.start(request()));
        expect(operation.target).not.toBeNull();
        expect(countTargets(store.state)).toBe(0);
        service.flushCaptures();
        expect(countTargets(store.state)).toBe(1);
    });

    it('drops a deferred capture when its target is released, or cleared', () => {
        const { service, store, busy } = setup();
        const operation = busy.run(() => service.coordinator.start(request()));
        if (operation.target === null) {
            throw new Error('no target');
        }

        service.releaseTarget(operation.target);
        service.flushCaptures();
        expect(countTargets(store.state)).toBe(0);
        busy.run(() => service.coordinator.start(request({ key: 'other' })));
        service.clearDeferred();
        service.flushCaptures();
        expect(countTargets(store.state)).toBe(0);
    });

    it('aborts the operations of changed services, and tells serviceChanged for persistence only', () => {
        const { service, calls } = setup();
        const operation = service.coordinator.start(request());
        service.changeServices(['other']);
        expect(operation.controller.signal.aborted).toBe(false);
        expect(calls).toEqual([]);
        service.changeServices(['uploads', 'persistence']);
        expect(operation.controller.signal.aborted).toBe(true);
        expect(calls).toEqual(['serviceChanged']);
    });
});
