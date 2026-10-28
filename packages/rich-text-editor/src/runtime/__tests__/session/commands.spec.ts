/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorState, TextSelection, type Transaction } from 'prosemirror-state';
import { describe, expect, it, vi } from 'vitest';

import { compileContentModel, type Diagnostic } from '#/model';
import { core } from '#/plugins/Core/feature';
import { compileDefinition, type EngineCommand } from '#/runtime/definition';

import { createCommands } from '../../session/editing/commands';
import { createBusy } from '../../session/state/busy';
import { createIdentity } from '../../session/state/identity';
import { createLifecycle } from '../../session/state/lifecycle';
import { createMode } from '../../session/state/mode';
import { createStore } from '../../session/state/store';

const model = compileContentModel([core()], { id: 'test.commands', version: 1 });
const compiled = compileDefinition(model);
const { schema } = compiled;
const doc = schema.node('doc', null, [schema.node('paragraph', null, [schema.text('hello')])]);

const insert = (extra: Partial<EngineCommand> = {}): EngineCommand => ({
    run: (state, dispatch, payload) => {
        const text = (payload as { text?: string } | undefined)?.text ?? 'x';
        dispatch?.(state.tr.insertText(text, 1));

        return true;
    },
    active: () => false,
    payload: { fields: { text: { type: 'string', optional: true } } },
    ...extra,
});

const setup = (commands: Record<string, EngineCommand>, options: { mode?: 'editable' | 'readonly' } = {}) => {
    const calls: string[] = [];
    const reported: Diagnostic[] = [];
    let notices = 0;
    const state = { inRender: false, installs: 0 };
    let next = 0;
    const identity = createIdentity({ documentId: 'doc', generate: () => `id-${++next}` });
    const lifecycle = createLifecycle();
    lifecycle.to('ready');
    const store = createStore(EditorState.create({ doc, selection: TextSelection.create(doc, 1), plugins: [] }));
    const busy = createBusy();
    const mode = createMode({
        initial: options.mode ?? 'editable',
        isDisposed: () => false,
        onModeChange: () => undefined,
        onDisabledChange: () => undefined,
    });
    const service = createCommands({
        definition: { ...compiled, commands: new Map(Object.entries(commands)) },
        store,
        identity,
        lifecycle,
        mode,
        policy: { refusal: () => undefined },
        busy,
        composition: { active: () => false },
        commit: {
            prepare: (root: Transaction) => ({
                candidate: store.state.apply(root),
                root,
                transactions: [root],
                mapping: root.mapping,
                started: 0,
                appended: 0,
            }),
            install: (prepared) => {
                state.installs += 1;
                store.set(prepared.candidate);
                identity.bumpCommit();

                return true;
            },
            installedId: () => 'installed',
            queriedIds: () => () => 'queried',
        },
        baseOf: () => store.state,
        focus: () => calls.push('focus'),
        report: (found) => reported.push(found),
        fault: (found) => reported.push(found),
        inRender: () => state.inRender,
        commandHost: 'host',
        runtime: () => 'runtime',
        notifications: () => notices,
    });

    return {
        service,
        store,
        lifecycle,
        busy,
        mode,
        calls,
        reported,
        state,
        notify: () => {
            notices += 1;
        },
    };
};

describe('createCommands', () => {
    it('rejects an unknown command, in a run and a query alike', () => {
        const { service } = setup({});
        expect(service.execute('missing')).toEqual({ status: 'rejected', code: 'unknown-command' });
        expect(service.query('missing')).toEqual({ enabled: false, active: false, disabledReason: 'unknown-command' });
    });

    it('rejects a payload that is not plain JSON or does not match its declaration', () => {
        const { service } = setup({ insert: insert() });
        expect(service.execute('insert', { text: 1 })).toEqual({ status: 'rejected', code: 'invalid-payload' });
        expect(service.execute('insert', { text: () => 1 })).toEqual({ status: 'rejected', code: 'invalid-payload' });
    });

    it('stores each url field after checkHref, or rejects the payload', () => {
        const seen: unknown[] = [];
        const link = insert({
            payload: { fields: { href: { type: 'url' } } },
            run: (_state, _dispatch, payload) => {
                seen.push(payload);

                return true;
            },
        });
        const { service } = setup({ link });
        expect(service.execute('link', { href: ' https://a.test ' }).status).toBe('no-op');
        expect(seen).toEqual([{ href: 'https://a.test' }]);
        expect(service.execute('link', { href: 'http://[bad' })).toEqual({
            status: 'rejected',
            code: 'invalid-payload',
        });
    });

    it('installs the batch a command dispatches and answers with the new stamp', () => {
        const { service, store, state } = setup({ insert: insert() });
        const result = service.execute('insert', { text: 'ab' });
        expect(result).toMatchObject({ status: 'applied', contentChanged: true });
        expect(state.installs).toBe(1);
        expect(store.state.doc.textContent).toBe('abhello');
    });

    it('answers no-op when a command applies without a dispatch', () => {
        const { service, state } = setup({ idle: insert({ run: () => true }) });
        expect(service.execute('idle')).toMatchObject({ status: 'no-op', contentChanged: false });
        expect(state.installs).toBe(0);
    });

    it('rejects a command that is not applicable, refused as a write, or dispatches twice', () => {
        const refuse = insert({
            run: (_state, _dispatch, _payload, context) => {
                context?.refuse?.();

                return false;
            },
        });
        const twice = insert({
            run: (state, dispatch) => {
                dispatch?.(state.tr);
                dispatch?.(state.tr);

                return true;
            },
        });
        const { service, reported } = setup({ no: insert({ run: () => false }), refuse, twice });
        expect(service.execute('no')).toEqual({ status: 'rejected', code: 'not-applicable' });
        expect(service.execute('refuse')).toEqual({ status: 'rejected', code: 'not-allowed' });
        expect(service.execute('twice')).toEqual({ status: 'rejected', code: 'not-applicable' });
        expect(reported.map(({ code }) => code)).toEqual(['runtime.multiple-dispatch']);
    });

    it('reports a plugin that throws and rejects as not applicable', () => {
        const boom = insert({
            featureId: 'plugin.boom',
            run: () => {
                throw new TypeError('secret');
            },
        });
        const { service, reported } = setup({ boom });
        expect(service.execute('boom')).toEqual({ status: 'rejected', code: 'not-applicable' });
        expect(reported).toHaveLength(1);
        expect(JSON.stringify(reported[0])).not.toContain('secret');
        expect(JSON.stringify(reported[0])).toContain('TypeError');
    });

    it('refuses by phase and mode before it runs the command', () => {
        const { service, lifecycle, mode } = setup({ insert: insert() });
        mode.set('readonly');
        expect(service.execute('insert')).toEqual({ status: 'rejected', code: 'readonly' });
        mode.set('editable');
        lifecycle.to('transitioning');
        expect(service.execute('insert')).toEqual({ status: 'rejected', code: 'busy' });
        lifecycle.to('faulted');
        expect(service.execute('insert')).toEqual({ status: 'rejected', code: 'not-ready' });
    });

    it('lets a readOnly command run in a read-only editor, but never change content', () => {
        const { service, mode } = setup({
            open: insert({ readOnly: true }),
            plain: insert({ readOnly: true, run: () => true }),
        });
        mode.set('readonly');
        expect(service.execute('open')).toEqual({ status: 'rejected', code: 'readonly' });
        expect(service.execute('plain').status).toBe('no-op');
    });

    it('rejects a run while a commit or notification is in progress', () => {
        const { service, busy } = setup({ insert: insert() });
        const inner = busy.run(() => service.execute('insert'));
        expect(inner).toEqual({ status: 'rejected', code: 'busy' });
    });

    it('runs deferred effects after an accepted run only, and drops them in a query', () => {
        const effects: string[] = [];
        const open = insert({
            run: (_state, _dispatch, _payload, context) => {
                context?.defer(() => effects.push('open'));

                return true;
            },
        });
        const no = insert({
            run: (_state, _dispatch, _payload, context) => {
                context?.defer(() => effects.push('no'));

                return false;
            },
        });
        const { service } = setup({ open, no });
        service.query('open');
        expect(effects).toEqual([]);
        service.execute('no');
        expect(effects).toEqual([]);
        service.execute('open');
        expect(effects).toEqual(['open']);
    });

    it('reads a command session from the runtime and the host when the command runs', () => {
        const sessions: { runtime: unknown; host: unknown }[] = [];
        const read = insert({
            run: (_state, _dispatch, _payload, context) => {
                sessions.push(context?.session as { runtime: unknown; host: unknown });

                return true;
            },
        });
        const { service } = setup({ read });
        service.execute('read');
        expect(sessions[0]?.runtime).toBe('runtime');
        expect(sessions[0]?.host).toBe('host');
    });

    it('queries enabled and active without installing', () => {
        const probe = insert({
            active: () => 'mixed',
            run: (state, dispatch) => {
                dispatch?.(state.tr.insertText('q', 1));

                return true;
            },
        });
        const { service, state } = setup({ probe });
        expect(service.query('probe')).toEqual({ enabled: true, active: 'mixed', disabledReason: null });
        expect(state.installs).toBe(0);
    });

    it('focuses the editor after execute only when asked, and refuses an execute inside a render', () => {
        const { service, calls, state, reported } = setup({ insert: insert() });
        service.execute('insert', undefined, { focus: 'editor' });
        service.execute('insert');
        expect(calls).toEqual(['focus']);
        state.inRender = true;
        expect(service.execute('insert')).toEqual({ status: 'rejected', code: 'busy' });
        expect(reported.map(({ code }) => code)).toEqual(['react.execute-in-render']);
    });

    it('answers refusal by mode first, then by policy', () => {
        const { service, store, mode } = setup({});
        const command = insert();
        expect(service.refusal(command, store.state, undefined)).toBeUndefined();
        mode.set('readonly');
        expect(service.refusal(command, store.state, undefined)).toBe('readonly');
    });

    it('applies a repeated query once until the state or the notification count changes', () => {
        const { service, store, notify } = setup({ insert: insert() });
        const apply = vi.spyOn(EditorState.prototype, 'applyTransaction');
        const payload = { text: 'q' };
        service.query('insert', payload);
        service.query('insert', payload);
        expect(apply).toHaveBeenCalledTimes(1);
        notify();
        service.query('insert', payload);
        expect(apply).toHaveBeenCalledTimes(2);
        store.set(EditorState.create({ doc: store.state.doc, selection: TextSelection.create(store.state.doc, 1) }));
        service.query('insert', payload);
        expect(apply).toHaveBeenCalledTimes(3);
        apply.mockRestore();
    });

    it('answers a repeated query again after a payload changed in place or a phase change, with no notification', () => {
        const toggle = insert({ active: (_state, payload) => (payload as { text?: string }).text === 'on' });
        const { service, lifecycle } = setup({ toggle });
        const payload = { text: 'off' };
        expect(service.query('toggle', payload).active).toBe(false);
        payload.text = 'on';
        expect(service.query('toggle', payload).active).toBe(true);
        lifecycle.to('disposed');
        expect(service.query('toggle', payload)).toMatchObject({ enabled: false, disabledReason: 'not-ready' });
    });

    it('performs a command no feature installs without a registered id', () => {
        const { service, store } = setup({});
        expect(service.perform(insert()).status).toBe('applied');
        expect(store.state.doc.textContent).toBe('xhello');
    });
});
