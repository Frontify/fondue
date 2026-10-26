/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Schema } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { describe, expect, it } from 'vitest';

import { createDispose } from '../../session/lifecycle/dispose';
import { createLifecycle } from '../../session/state/lifecycle';
import { createStore } from '../../session/state/store';

const schema = new Schema({
    nodes: { doc: { content: 'paragraph+' }, paragraph: { content: 'text*', group: 'block' }, text: {} },
});

const setup = ({ disposedBySaving = false } = {}) => {
    const calls: string[] = [];
    const lifecycle = createLifecycle();
    lifecycle.to('ready');
    const store = createStore(EditorState.create({ schema }));
    const handle = {};
    const resources = { targets: 0, installedFeatures: new Map<object, unknown>([[handle, []]]) };
    const dispose = createDispose({
        lifecycle,
        saving: {
            dispose: () => {
                calls.push('saving.dispose');
                if (disposedBySaving) {
                    lifecycle.to('disposed');
                }
            },
        },
        composition: {
            cancel: () => calls.push(`composition.cancel:${lifecycle.phase()}`),
            resolve: (outcome) => calls.push(`composition.resolve:${outcome}`),
        },
        checks: { dispose: () => calls.push('checks.dispose') },
        targets: {
            coordinator: { dispose: () => calls.push('coordinator.dispose') } as never,
            clearDeferred: () => calls.push('targets.clearDeferred'),
        },
        uploads: { dispose: () => calls.push('uploads.dispose') },
        queue: { settle: (code) => calls.push(`queue.settle:${code}`) },
        commit: { clearDeferred: () => calls.push('commit.clearDeferred') },
        store,
        view: { detach: () => calls.push('view.detach') },
        events: { emit: (event) => calls.push(`emit:${event}`), clear: () => calls.push('events.clear') },
        identity: { session: () => ({ documentId: 'd', sessionId: 's', generation: 0 }) },
        resources,
        handle: () => handle,
    });

    return { dispose, calls, lifecycle, resources };
};

describe('createDispose', () => {
    it('ends every part of the session in order, with the final phase set first', () => {
        const { dispose, calls, lifecycle, resources } = setup();
        dispose();
        expect(lifecycle.phase()).toBe('disposed');
        expect(calls).toEqual([
            'saving.dispose',
            'composition.cancel:disposed',
            'checks.dispose',
            'composition.resolve:disposed',
            'coordinator.dispose',
            'uploads.dispose',
            'queue.settle:not-ready',
            'commit.clearDeferred',
            'targets.clearDeferred',
            'emit:disposed',
            'events.clear',
            'view.detach',
        ]);
        expect(resources.installedFeatures.size).toBe(0);
    });

    it('does nothing the second time', () => {
        const { dispose, calls } = setup();
        dispose();
        const count = calls.length;
        dispose();
        expect(calls).toHaveLength(count);
    });

    it('stops when a listener of the saving shutdown already disposed the session', () => {
        const { dispose, calls, resources } = setup({ disposedBySaving: true });
        dispose();
        expect(calls).toEqual(['saving.dispose']);
        expect(resources.installedFeatures.size).toBe(1);
    });
});
