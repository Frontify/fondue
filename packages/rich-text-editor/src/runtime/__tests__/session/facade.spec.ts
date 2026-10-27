/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Schema } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { describe, expect, it, vi } from 'vitest';

import { createFacade } from '../../session/lifecycle/facade';
import { createStore } from '../../session/state/store';

const schema = new Schema({
    nodes: { doc: { content: 'paragraph+' }, paragraph: { content: 'text*', group: 'block' }, text: {} },
});

const setup = () => {
    const store = createStore(EditorState.create({ schema }));
    let policy = { id: 'first' };
    let view: object | undefined;
    const captureRange = vi.fn(() => ({ status: 'rejected' }) as never);
    const measure = vi.fn();
    const run = vi.fn(() => true);
    const wait = vi.fn();
    const clear = vi.fn();
    const handle = {} as never;
    const report = vi.fn();
    const facade = createFacade({
        handle,
        definition: {} as never,
        limits: {} as never,
        suggestionListId: 'list',
        interactionRoots: new Set(),
        identity: { session: () => ({ documentId: 'd', sessionId: 'abc', generation: 0 }) },
        store,
        policy: { current: () => policy as never, writeRefusal: vi.fn() },
        view: {
            current: () => view as never,
            nodeViews: {},
            attach: vi.fn(),
            detach: vi.fn(),
            faultView: vi.fn(),
        },
        commit: { select: vi.fn() },
        prepare: { exceededLimit: vi.fn() },
        report,
        watch: vi.fn(),
        targets: { captureRange, changeServices: vi.fn(), coordinator: { start: vi.fn() } as never },
        commands: { refusal: vi.fn(), perform: vi.fn() },
        mode: { setDisabled: vi.fn() },
        columns: { set: vi.fn() },
        actions: { nodeActions: vi.fn() },
        shown: { emitSaveStatus: vi.fn() },
        history: { clear },
        composition: { wait },
        metrics: { measure },
        checks: { run },
    });

    return {
        facade,
        report,
        handle,
        store,
        captureRange,
        measure,
        run,
        wait,
        clear,
        setPolicy: (next: { id: string }) => {
            policy = next;
        },
        setView: (next: object) => {
            view = next;
        },
    };
};

describe('createFacade', () => {
    it('reads the live state, policy and view from the services each time', () => {
        const { facade, store, setPolicy, setView } = setup();
        expect(facade.state).toBe(store.state);
        const next = EditorState.create({ schema });
        store.set(next);
        expect(facade.state).toBe(next);
        expect(facade.policy).toEqual({ id: 'first' });
        setPolicy({ id: 'second' });
        expect(facade.policy).toEqual({ id: 'second' });
        expect(facade.view).toBeUndefined();
        const view = {};
        setView(view);
        expect(facade.view).toBe(view);
    });

    it('reports a plugin error with its feature and the error name, never its message', () => {
        const { facade, report } = setup();
        facade.reportPluginError(new RangeError('secret'), 'fixture.feature');
        expect(report).toHaveBeenCalledWith(
            expect.objectContaining({
                code: 'runtime.plugin-error',
                details: { featureId: 'fixture.feature', name: 'RangeError' },
            }),
        );
        expect(JSON.stringify(report.mock.calls)).not.toContain('secret');
    });

    it('carries the handle and the session values as given', () => {
        const { facade, handle } = setup();
        expect(facade.handle).toBe(handle);
        expect(facade.suggestionListId).toBe('list');
        expect(facade.nextDomId()).toContain('abc');
    });

    it('passes the range, the timeouts and the metric on to the service that owns them', () => {
        const { facade, captureRange, measure, wait, clear, run } = setup();
        const options = { purpose: 'insert', onIntersectingEdit: 'map' } as const;
        facade.captureRange({ from: 1, to: 2 }, options);
        expect(captureRange).toHaveBeenCalledWith(options, { from: 1, to: 2 });
        facade.measure('replace', 5, null);
        expect(measure).toHaveBeenCalledWith('replace', 5, null);
        const settled = vi.fn();
        facade.afterInput(settled, 40);
        expect(wait).toHaveBeenCalledWith(settled, 40);
        facade.clearHistory();
        expect(clear).toHaveBeenCalled();
        expect(facade.runChecks()).toBe(true);
        expect(run).toHaveBeenCalled();
    });
});
