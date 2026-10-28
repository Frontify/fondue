/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Schema } from 'prosemirror-model';
import { EditorState, Plugin } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createView, isEmpty } from '../../session/editing/view';
import { createLifecycle } from '../../session/state/lifecycle';
import { createStore } from '../../session/state/store';
import { type SessionToken } from '../../types';

const schema = new Schema({
    nodes: { doc: { content: 'paragraph+' }, paragraph: { content: 'text*', toDOM: () => ['p', 0] }, text: {} },
});
const make = (text: string, plugins: Plugin[] = []) =>
    EditorState.create({
        doc: schema.node(
            'doc',
            undefined,
            text === '' ? [schema.node('paragraph')] : [schema.node('paragraph', undefined, [schema.text(text)])],
        ),
        plugins,
    });
const token = { documentId: 'd', sessionId: 's', generation: 0 } as SessionToken;

const setup = (options: { plugins?: Plugin[]; recovery?: boolean; composing?: boolean } = {}) => {
    const store = createStore(make('ab', options.plugins));
    const lifecycle = createLifecycle();
    const calls: string[] = [];
    const flags = {
        recovery: options.recovery === true,
        composing: options.composing === true,
        mode: 'editable' as const,
    };
    const resources = { views: new Set<EditorView>(), frames: 0 };
    const service = createView({
        store,
        lifecycle,
        shown: { mode: () => flags.mode, sync: (mode, columns) => calls.push(`sync:${mode}:${columns.count}`) },
        mode: { mode: () => 'editable', disabled: () => false },
        columns: { current: () => ({ count: 1 }) as never },
        metrics: { measure: (kind) => calls.push(`measure:${kind}`) },
        emit: (event) => calls.push(`emit:${event}`),
        session: () => token,
        resources,
        suggestionListId: 'list',
        createdAt: 0,
        composing: () => flags.composing,
        hasRecovery: () => flags.recovery,
        dispatch: (transaction) => store.set(store.state.apply(transaction)),
        fault: () => calls.push('fault'),
        viewFault: (_view, candidate) => calls.push(`viewFault:${candidate === store.state}`),
        onAttached: () => calls.push('attached'),
        scrollSelectionIntoView: () => undefined,
    });

    return { service, store, lifecycle, calls, flags, resources };
};

const surface = () => document.body.appendChild(document.createElement('div'));

beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    vi.useRealTimers();
    document.body.replaceChildren();
});

describe('isEmpty', () => {
    it('is true for one empty paragraph only', () => {
        expect(isEmpty(make(''))).toBe(true);
        expect(isEmpty(make('a'))).toBe(false);
        expect(isEmpty(make(' '))).toBe(false);
    });
});

describe('createView', () => {
    it('has no view before attach', () => {
        const { service } = setup();
        expect(service.current()).toBeUndefined();
    });

    it('attaches, registers the view, tells onAttached and goes ready after one frame', () => {
        const { service, lifecycle, calls, resources } = setup();
        service.attach(surface());
        const attached = service.current();
        expect(attached).toBeDefined();
        expect([...resources.views]).toEqual([attached]);
        expect(resources.frames).toBe(1);
        expect(calls).toEqual(['attached']);
        vi.runAllTimers();
        expect(lifecycle.phase()).toBe('ready');
        expect(resources.frames).toBe(0);
        expect(calls).toEqual(['attached', 'sync:editable:1', 'emit:ready', 'measure:mount']);
    });

    it('does nothing once the session is disposed', () => {
        const { service, lifecycle, resources } = setup();
        lifecycle.to('disposed');
        service.attach(surface());
        expect(service.current()).toBeUndefined();
        expect(resources.views.size).toBe(0);
    });

    it('detach destroys the view, drops it from the registry and cancels the pending frame', () => {
        const { service, lifecycle, resources } = setup();
        service.attach(surface());
        service.detach();
        expect(service.current()).toBeUndefined();
        expect(resources.views.size).toBe(0);
        expect(resources.frames).toBe(0);
        vi.runAllTimers();
        expect(lifecycle.phase()).toBe('mounting');
    });

    it('a second attach replaces the first view', () => {
        const { service, resources } = setup();
        service.attach(surface());
        const first = service.current();
        service.attach(surface());
        expect(service.current()).not.toBe(first);
        expect(resources.views.size).toBe(1);
        expect(resources.frames).toBe(1);
    });

    it('a plugin view that throws faults, destroys the half-built view and keeps no view', () => {
        const thrower = new Plugin({
            view: () => {
                throw new Error('boom');
            },
        });
        const { service, calls, resources } = setup({ plugins: [thrower] });
        service.attach(surface());
        expect(calls).toEqual(['fault']);
        expect(service.current()).toBeUndefined();
        expect(resources.views.size).toBe(0);
        expect(resources.frames).toBe(0);
    });

    it('capture keeps the half-built view, which a throwing plugin view leaves behind, to destroy', () => {
        const holder: { capture: (view: EditorView) => void; built?: EditorView } = { capture: () => undefined };
        const probe = new Plugin({
            view: (view) => {
                holder.capture(view);
                holder.built = view;
                throw new Error('boom');
            },
        });
        const { service, calls } = setup({ plugins: [probe] });
        holder.capture = service.capture;
        service.attach(surface());
        expect(calls).toEqual(['fault']);
        expect(holder.built?.isDestroyed).toBe(true);
    });

    it('call reports a throw and a node view throw the bridge reports through faultView', () => {
        const { service } = setup();
        expect(service.call(() => 1)).toEqual({ threw: false, value: 1 });
        expect(
            service.call(() => {
                throw new Error('x');
            }),
        ).toEqual({ threw: true, value: undefined });
        const nested = service.call(() => {
            service.faultView();

            return 2;
        });
        expect(nested).toEqual({ threw: true, value: 2 });
        expect(service.call(() => 3).threw).toBe(false);
    });

    it('faultView outside a call faults the shown view with the stored state, only while mounting or ready', () => {
        const { service, calls, lifecycle } = setup();
        service.faultView();
        expect(calls).toEqual([]);
        service.attach(surface());
        calls.length = 0;
        service.faultView();
        expect(calls).toEqual(['viewFault:true']);
        lifecycle.to('faulted');
        service.faultView();
        expect(calls).toEqual(['viewFault:true']);
    });

    it('refresh waits for composition and recovery, otherwise syncs then repaints', () => {
        const { service, calls, flags } = setup();
        service.attach(surface());
        calls.length = 0;
        flags.composing = true;
        service.refresh();
        flags.composing = false;
        flags.recovery = true;
        service.refresh();
        expect(calls).toEqual([]);
        flags.recovery = false;
        service.refresh();
        expect(calls).toEqual(['sync:editable:1']);
    });

    it('detach throws a destroy error unless a recovery candidate is held', () => {
        const failing = new Plugin({
            view: () => ({
                destroy: () => {
                    throw new Error('destroy');
                },
            }),
        });
        const first = setup({ plugins: [failing] });
        first.service.attach(surface());
        expect(() => first.service.detach()).toThrow('destroy');
        const second = setup({ plugins: [failing], recovery: true });
        second.service.attach(surface());
        expect(() => second.service.detach()).not.toThrow();
        expect(second.service.current()).toBeUndefined();
    });

    it('marks the surface from the mode, the document and the phase', () => {
        const { service, lifecycle } = setup();
        const element = surface();
        service.attach(element);
        const dom = service.current()?.dom;
        expect(dom?.getAttribute('data-rte-empty')).toBeNull();
        lifecycle.to('ready');
        lifecycle.to('transitioning');
        service.refresh();
        expect(dom?.getAttribute('aria-busy')).toBe('true');
    });

    it('hands the registered node views to the next attach', () => {
        const { service } = setup();
        const views = { paragraph: () => ({ dom: document.createElement('p') }) };
        service.setNodeViews(views);
        expect(service.nodeViews).toBe(views);
        service.setMarkViews({});
        service.attach(surface());
        expect(service.current()?.props.nodeViews).toHaveProperty('paragraph', views.paragraph);
    });
});
