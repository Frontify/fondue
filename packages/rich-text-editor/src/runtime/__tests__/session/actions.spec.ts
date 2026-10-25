/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorState, NodeSelection, TextSelection, type Transaction } from 'prosemirror-state';
import { describe, expect, it } from 'vitest';

import { compileDefinition, type EngineCommand } from '#/definition';
import { core } from '#/features/core/feature';
import { compileContentModel, type ResourceLimits } from '#/model';

import { type AsyncOperation, type AsyncRequest } from '../../async';
import { createActions, type NodeTarget } from '../../session/actions';
import { type Commands } from '../../session/commands';
import { createStore } from '../../session/store';
import { type CommandResult, type SelectionHandle } from '../../types';

const model = compileContentModel([core()], { id: 'test.actions', version: 1 });
const compiled = compileDefinition(model);
const { schema } = compiled;
const doc = schema.node('doc', null, [
    schema.node('paragraph', null, [schema.text('hello')]),
    schema.node('paragraph', null, [schema.text('world')]),
]);

const applied: CommandResult = {
    status: 'applied',
    stamp: {} as never,
    contentChanged: true,
};

const setup = (commandsById: Record<string, EngineCommand> = {}) => {
    const store = createStore(EditorState.create({ doc, selection: TextSelection.create(doc, 1) }));
    const routes: string[] = [];
    const payloads: unknown[] = [];
    const committed: Transaction[] = [];
    const started: AsyncRequest[] = [];
    const aborted: AsyncOperation[][] = [];
    const operation = {} as AsyncOperation;
    const runOn: Commands['runOn'] = (command, checked, base, route) => {
        routes.push(route);
        payloads.push(checked?.payload);
        const state = base();
        if (typeof state === 'string') {
            return { status: 'rejected', code: state };
        }
        let changed = false;
        const ran = command?.run(state, (tr) => {
            store.set(store.state.apply(tr));
            changed = true;
        });
        if (ran !== true) {
            return { status: 'rejected', code: 'not-applicable' };
        }
        return changed ? applied : { ...applied, status: 'no-op' };
    };
    const queryOn: Commands['queryOn'] = (_command, _checked, base) => {
        routes.push('query');
        return { enabled: typeof base !== 'string', active: false } as never;
    };
    const actions = createActions({
        definition: { ...compiled, commands: new Map(Object.entries(commandsById)) },
        limits: { maxAttributeLength: 64 } as ResourceLimits,
        store,
        commit: { commit: (root) => committed.push(root) },
        commands: { runOn, queryOn },
        targets: {
            baseOf: (options) => {
                const { target } = options as { target: SelectionHandle | string };
                return target === 'bad' ? 'wrong-session' : store.state;
            },
            coordinator: {
                start: (request: AsyncRequest) => {
                    started.push(request);
                    return operation;
                },
                abortWhere: (matches: (other: AsyncOperation) => boolean) => {
                    aborted.push(matches(operation) ? [operation] : []);
                },
            } as never,
        },
    });
    return { actions, store, routes, payloads, committed, started, aborted, operation };
};

const first: NodeTarget = () => 0;

describe('createActions', () => {
    describe('nodeActions', () => {
        it('updates a declared attribute of the node it finds when the action runs', () => {
            const { actions, store, routes } = setup();
            const result = actions.nodeActions(first).update({ lang: 'en' });
            expect(result.status).toBe('applied');
            expect(routes).toEqual(['host']);
            expect(store.state.doc.child(0).attrs.lang).toBe('en');
        });

        it('rejects a payload that is not a record, an undeclared attribute and the nodeId', () => {
            const { actions, store } = setup();
            expect(actions.nodeActions(first).update(5 as never)).toEqual({
                status: 'rejected',
                code: 'invalid-payload',
            });
            expect(actions.nodeActions(first).update({ missing: 1 })).toMatchObject({ status: 'rejected' });
            expect(actions.nodeActions(first).update({ nodeId: 'x' })).toMatchObject({ status: 'rejected' });
            expect(store.state.doc).toBe(doc);
        });

        it('removes the node at its live position', () => {
            const { actions, store } = setup();
            let position = 0;
            const result = actions.nodeActions(() => position).remove();
            expect(result.status).toBe('applied');
            expect(store.state.doc.childCount).toBe(1);
            position = 99;
            expect(actions.nodeActions(() => position).remove()).toMatchObject({ status: 'rejected' });
        });

        it('selects the node through a commit, and nothing for a position that holds none', () => {
            const { actions, committed } = setup();
            actions.nodeActions(() => 99).select();
            expect(committed).toEqual([]);
            actions.nodeActions(first).select();
            expect(committed).toHaveLength(1);
            expect(committed[0]?.selection).toBeInstanceOf(NodeSelection);
        });

        it('executes and queries a command on a state with the node selected, and refuses a stale target', () => {
            const seen: unknown[] = [];
            const probe: EngineCommand = {
                run: (state) => {
                    seen.push(state.selection instanceof NodeSelection);
                    return true;
                },
                active: () => false,
            };
            const { actions, routes } = setup({ probe });
            expect(actions.nodeActions(first).execute('probe', { a: 1 }).status).toBe('no-op');
            expect(seen).toEqual([true]);
            expect(routes).toEqual(['node']);
            expect(actions.nodeActions(() => 99).execute('probe', undefined)).toEqual({
                status: 'rejected',
                code: 'target-invalid',
            });
            expect(actions.nodeActions(first).query('probe', undefined)).toMatchObject({ enabled: true });
            expect(actions.nodeActions(() => 99).query('probe', undefined)).toMatchObject({ enabled: false });
        });
    });

    describe('acceptSuggestion', () => {
        const replace: EngineCommand = {
            run: (state, dispatch) => {
                dispatch?.(state.tr.replaceSelectionWith(schema.text('X')));
                return true;
            },
            active: () => false,
        };

        it('runs the command as the host on a state selecting exactly the range', () => {
            const { actions, store, routes } = setup({ replace });
            expect(actions.acceptSuggestion({ from: 1, to: 3 }, 'replace', {}).status).toBe('applied');
            expect(routes).toEqual(['host']);
            expect(store.state.doc.child(0).textContent).toBe('Xllo');
        });

        it('refuses a range outside the document, reversed, or splitting no text position', () => {
            const { actions, store } = setup({ replace });
            for (const range of [
                { from: -1, to: 2 },
                { from: 1, to: 999 },
                { from: 3, to: 2 },
                { from: 0, to: 12 },
            ]) {
                expect(actions.acceptSuggestion(range, 'replace', {})).toEqual({
                    status: 'rejected',
                    code: 'target-invalid',
                });
            }
            expect(store.state.doc).toBe(doc);
        });
    });

    describe('placeAsset', () => {
        const asset = { assetId: 'asset-1', mediaType: 'image/png', labelSnapshot: 'Logo' };

        it('rejects an asset that is not a picked one', () => {
            const { actions, routes } = setup();
            expect(actions.placeAsset({ assetId: '' }, { nodeId: 'a' })).toEqual({
                status: 'rejected',
                code: 'invalid-payload',
            });
            expect(routes).toEqual([]);
        });

        it('rejects a refill of a node that is not in the document', () => {
            const { actions, routes } = setup();
            expect(actions.placeAsset(asset, { nodeId: 'missing' })).toEqual({
                status: 'rejected',
                code: 'target-invalid',
            });
            expect(routes).toEqual([]);
        });

        it('inserts at a captured target through the host route, and reports a target the session refuses', () => {
            const { actions, routes } = setup();
            actions.placeAsset(asset, { target: 'bad' as never });
            expect(routes).toEqual(['host']);
            expect(actions.placeAsset(asset, { target: 'bad' as never })).toEqual({
                status: 'rejected',
                code: 'wrong-session',
            });
        });
    });

    describe('searchSuggestions', () => {
        it('starts one references operation of the create action and delivers results to receive', async () => {
            const { actions, started } = setup();
            const received: string[] = [];
            actions.searchSuggestions(
                { key: 'list', featureId: 'mention', command: 'mention.insert', run: () => Promise.resolve('hit') },
                (result) => received.push(result),
            );
            const request = started[0] as AsyncRequest;
            expect(request).toMatchObject({
                key: 'list',
                service: 'references',
                featureId: 'mention',
                action: 'create',
                command: 'mention.insert',
            });
            expect(await request.run({ signal: new AbortController().signal } as never)).toBe('hit');
            expect(request.deliver?.('hit')).toBeUndefined();
            expect(received).toEqual(['hit']);
        });

        it('aborts only its own operation', () => {
            const { actions, aborted, operation } = setup();
            const abort = actions.searchSuggestions(
                { key: 'list', featureId: 'mention', command: 'c', run: () => Promise.resolve(1) },
                () => undefined,
            );
            abort();
            expect(aborted).toEqual([[operation]]);
        });
    });
});
