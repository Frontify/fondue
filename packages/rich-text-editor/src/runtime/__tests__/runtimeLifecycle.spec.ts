/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Plugin } from 'prosemirror-state';
import { describe, expect, it, vi } from 'vitest';

import { decodeToTree, limitsOf } from '#/model/internal';
import { countingIds } from '#/plugins/__tests__/fixtures/notes';
import { pluginsFor } from '#/plugins/__tests__/fixtures/pluginsFor';
import { extensionsOf } from '#/react/compile/engine';
import { compileDefinition } from '#/runtime/definition';
import { probeRuntimes, typeText } from '#/testing';

import { RUNTIME_PLUGINS } from '../capabilities';
import { authoringOf } from '../guards/policy';
import { createEditorRuntime } from '../runtime';
import { type CommandResult, type DocumentChange } from '../types';

import {
    boldModel,
    stored,
    para,
    words,
    start,
    replacing,
    appendForever,
    installRuntimeHooks,
    started,
} from './fixtures/start';

installRuntimeHooks();

describe('the session lifecycle', () => {
    it('emits ready once with the session token after the first frame', () => {
        const { tree } = decodeToTree(stored(para()), boldModel);
        const runtime = createEditorRuntime({
            definition: compileDefinition(boldModel, RUNTIME_PLUGINS, extensionsOf(boldModel, pluginsFor(boldModel))),
            documentId: 'document-1',
            tree: tree as NonNullable<typeof tree>,
            capabilities: [],
            generateId: countingIds(),
            mode: 'editable',
            policy: authoringOf(boldModel),
            limits: limitsOf(undefined),
        });
        started.push(runtime);
        const ready = vi.fn();
        runtime.handle.subscribe('ready', ready);
        runtime.attach(document.body.appendChild(document.createElement('div')));

        expect(runtime.handle.getSummary().phase).toBe('mounting');
        expect(ready).not.toHaveBeenCalled();
        vi.runAllTimers();
        vi.runAllTimers();

        expect(ready).toHaveBeenCalledTimes(1);
        expect(ready).toHaveBeenCalledWith(runtime.handle.getSummary().session);
        expect(runtime.handle.getSummary().phase).toBe('ready');
    });

    it('emits no ready after a replacement', async () => {
        const { handle } = start(stored(para(words('ab'))));
        const ready = vi.fn();
        handle.subscribe('ready', ready);

        const result = await handle.replaceDocument(replacing(handle, stored(para(words('cd')))));
        vi.runAllTimers();

        expect(result).toEqual({ status: 'replaced', session: handle.getSummary().session });
        expect(ready).not.toHaveBeenCalled();
    });

    it('resolves intents queued during transitioning as not-ready on dispose', async () => {
        const { handle } = start(stored(para(words('ab'))));
        typeText(handle, 'x');
        // An unmanaged session refuses the `save` policy, but only once the step 5 call resolves.
        const replaced = handle.replaceDocument(replacing(handle, stored(para()), { action: 'save' }));
        expect(handle.getSummary().phase).toBe('transitioning');
        const queued = handle.enqueue('text.insert', { text: 'y' });

        handle.dispose();

        expect(await queued).toEqual({ status: 'rejected', code: 'not-ready' });
        expect(await replaced).toEqual({ status: 'rejected', code: 'not-ready' });
    });

    it('emits disposed with the final token, then holds no subscription, view or frame', () => {
        const { handle } = start(stored(para()));
        const disposed = vi.fn(() => probeRuntimes().subscriptions);

        handle.subscribe('disposed', disposed);
        handle.dispose();

        expect(disposed).toHaveBeenCalledTimes(1);
        expect(disposed).toHaveBeenCalledWith(handle.getSummary().session);
        expect(disposed.mock.results[0]?.value).toBeGreaterThan(0);
        expect(probeRuntimes()).toMatchObject({ views: [], installedFeatures: [], subscriptions: 0, frames: 0 });
        expect(handle.getSummary().phase).toBe('disposed');
    });

    it('replays a held async result before an intent queued during transitioning', async () => {
        let releaseHeld: ((result: unknown) => void) | undefined;
        let session: ReturnType<typeof start> | undefined;
        let queued: Promise<CommandResult> | undefined;
        let armed = true;
        const plugin = new Plugin({
            view: () => ({
                update: () => {
                    if (!armed || session?.handle.getSummary().phase !== 'transitioning') {
                        return;
                    }

                    armed = false;
                    queued = session.handle.enqueue('text.insert', { text: 'I' });
                    releaseHeld?.({ text: 'A' });
                },
            }),
        });
        session = start(stored(para(words('ab'))), { plugins: [plugin] });
        const { handle, runtime } = session;
        typeText(handle, 'x');
        const held = new Promise<unknown>((resolve) => {
            releaseHeld = resolve;
        });
        runtime.startAsync({
            key: 'upload',
            service: 'uploads',
            featureId: 'core',
            action: 'create',
            command: 'text.insert',
            run: () => held,
        });
        const origins: string[] = [];
        handle.subscribe('documentChange', (change: DocumentChange) => {
            origins.push(change.origin);
        });

        const replaced = handle.replaceDocument(replacing(handle, stored(para(words('cd'))), { action: 'reject' }));
        await replaced;
        if (queued === undefined) {
            throw new Error('The intent was not queued.');
        }

        await queued;

        expect(origins).toEqual(['async', 'command']);
    });

    it('runs an intent queued during mounting after the surface refresh and the ready listeners', async () => {
        let runtime: ReturnType<typeof createEditorRuntime> | undefined;
        const order: string[] = [];
        const plugin = new Plugin({
            view: () => ({
                update: () => {
                    if (runtime?.handle.getSummary().phase === 'ready') {
                        order.push('refresh');
                    }
                },
            }),
        });
        const { tree } = decodeToTree(stored(para(words('ab'))), boldModel);
        const compiled = compileDefinition(boldModel, RUNTIME_PLUGINS, extensionsOf(boldModel, pluginsFor(boldModel)));
        runtime = createEditorRuntime({
            definition: { ...compiled, plugins: [...compiled.plugins, plugin] },
            documentId: 'document-1',
            tree: tree as NonNullable<typeof tree>,
            capabilities: [],
            generateId: countingIds(),
            mode: 'editable',
            policy: authoringOf(boldModel),
            limits: limitsOf(undefined),
        });
        started.push(runtime);
        runtime.handle.subscribe('ready', () => {
            order.push('listener');
        });
        runtime.handle.subscribe('documentChange', () => {
            order.push('intent');
        });
        runtime.attach(document.body.appendChild(document.createElement('div')));
        const queued = runtime.handle.enqueue('text.insert', { text: 'Z' });

        vi.runAllTimers();

        expect(order.indexOf('refresh')).toBeGreaterThanOrEqual(0);
        expect(order.indexOf('listener')).toBeGreaterThan(order.indexOf('refresh'));
        expect(order.indexOf('intent')).toBeGreaterThan(order.indexOf('listener'));
        expect(runtime.view?.state.doc.textContent).toContain('Z');
        await queued;
    });
});

describe('disposal', () => {
    it('settles an intent enqueued from a disposed listener or after a fault or dispose', async () => {
        const pending = (promise: Promise<CommandResult>) => Promise.race([promise, Promise.resolve('pending')]);
        const faulted = start(stored(para()), {
            plugins: [appendForever('fixture.a', 'insertNode'), appendForever('fixture.b', 'setBlock')],
        });
        typeText(faulted.handle, 'x');
        const disposed = start(stored(para()));
        const late: Promise<CommandResult>[] = [];
        disposed.handle.subscribe('disposed', () => late.push(disposed.handle.enqueue('text.insert', { text: 'a' })));
        disposed.handle.dispose();
        late.push(disposed.handle.enqueue('text.insert', { text: 'b' }));
        const intents = probeRuntimes().intents;

        const results = await Promise.all([
            pending(faulted.handle.enqueue('text.insert', { text: 'c' })),
            ...late.map(pending),
        ]);

        expect(results).toEqual(Array.from({ length: 3 }, () => ({ status: 'rejected', code: 'not-ready' })));
        expect(intents).toBe(0);
    });

    it('takes no event listener and no selector store once the session is disposed', () => {
        const { handle, runtime } = start(stored(para()));
        handle.dispose();
        const before = { ...probeRuntimes() };

        const unsubscribe = handle.subscribe('documentChange', vi.fn());
        const unwatch = runtime.watch(() => 1, Object.is, vi.fn());

        expect(probeRuntimes().subscriptions).toBe(before.subscriptions);
        expect(probeRuntimes().selectors).toBe(before.selectors);
        unsubscribe();
        unwatch();
    });

    it('tells no later selector store of a change once an earlier one disposed the session', () => {
        const { handle, runtime, view } = start(stored(para()));
        const later = vi.fn();
        runtime.watch(
            () => view.state.doc.textContent,
            Object.is,
            () => handle.dispose(),
        );
        runtime.watch(() => view.state.doc.textContent, Object.is, later);

        typeText(handle, 'x');

        expect(later).not.toHaveBeenCalled();
    });

    it('reports a selector store whose listener throws as a listener error, and still tells the others', () => {
        const { handle, runtime, view, diagnostics } = start(stored(para()));
        const other = vi.fn();
        runtime.watch(
            () => view.state.doc.textContent,
            Object.is,
            () => {
                throw new Error('listener failed');
            },
        );
        runtime.watch(() => view.state.doc.textContent, Object.is, other);

        typeText(handle, 'x');

        expect(other).toHaveBeenCalledWith('x');
        expect(diagnostics.map(({ code, details }) => [code, details])).toEqual([
            ['runtime.listener-error', { event: 'selector', name: 'Error' }],
        ]);
        expect(JSON.stringify(diagnostics)).not.toContain('listener failed');
    });

    it('counts nothing twice when a kept unsubscribe runs after dispose', () => {
        const { handle } = start(stored(para()));
        const before = probeRuntimes().subscriptions;
        const unsubscribe = handle.subscribe('documentChange', () => undefined);

        handle.dispose();
        unsubscribe();

        expect(probeRuntimes().subscriptions).toBe(before - 2);
    });

    it('commits no root a plugin view dispatched once a listener disposed the session', () => {
        const dispatchOnce = new Plugin({
            view: () => ({
                update: (view, previous) => {
                    if (!view.state.doc.eq(previous.doc) && view.state.doc.textContent === 'a') {
                        view.dispatch(view.state.tr.insertText('x', 1));
                    }
                },
            }),
        });
        const { handle } = start(stored(para()), { plugins: [dispatchOnce] });
        let atDispose = -1;
        handle.subscribe('disposed', () => {
            atDispose = handle.getSummary().commitSequence;
        });
        handle.subscribe('documentChange', () => handle.dispose());

        typeText(handle, 'a');

        expect(handle.getSummary()).toMatchObject({ phase: 'disposed', commitSequence: atDispose });
    });

    it('stops notifying once a listener disposes the session', () => {
        const { handle } = start(stored(para()));
        const later = vi.fn();
        handle.subscribe('documentChange', () => handle.dispose());
        handle.subscribe('documentChange', later);

        typeText(handle, 'a');

        expect(handle.getSummary().phase).toBe('disposed');
        expect(later).not.toHaveBeenCalled();
    });

    it('releases every listener, selector, queued intent, frame, view, plugin view and target over 10 mount and dispose cycles', async () => {
        const before = probeRuntimes();
        let pluginViews = 0;
        const counted = new Plugin({
            view: () => {
                pluginViews += 1;

                return {
                    destroy: () => {
                        pluginViews -= 1;
                    },
                };
            },
        });
        const { tree } = decodeToTree(stored(para()), boldModel);
        const compiled = compileDefinition(boldModel, RUNTIME_PLUGINS, extensionsOf(boldModel, pluginsFor(boldModel)));
        const pending: Promise<CommandResult>[] = [];
        const owned: ReturnType<typeof probeRuntimes>[] = [];
        for (let cycle = 0; cycle < 10; cycle += 1) {
            const runtime = createEditorRuntime({
                definition: { ...compiled, plugins: [...compiled.plugins, counted] },
                documentId: `document-${cycle}`,
                tree: tree as NonNullable<typeof tree>,
                capabilities: [],
                generateId: countingIds(),
                mode: 'editable',
                policy: authoringOf(boldModel),
                limits: limitsOf(undefined),
            });
            runtime.handle.subscribe('documentChange', () => undefined);
            runtime.watch(
                () => runtime.handle.getSummary().sequence,
                Object.is,
                () => undefined,
            );
            pending.push(runtime.handle.enqueue('text.insert', { text: 'a' }));
            runtime.attach(document.body.appendChild(document.createElement('div')));
            if (cycle % 2 === 1) {
                vi.runAllTimers();
            }

            runtime.handle.captureTarget({ purpose: 'format', onIntersectingEdit: 'map' });
            owned.push(probeRuntimes());

            runtime.handle.dispose();
            expect(runtime.handle.getSummary().phase).toBe('disposed');
        }

        expect(owned[0]).toMatchObject({
            installedFeatures: [['core', 'marks.bold']],
            subscriptions: 1,
            selectors: 1,
            intents: 1,
            frames: 1,
            targets: 0,
        });
        expect(owned[1]).toMatchObject({ subscriptions: 1, selectors: 1, intents: 0, frames: 0, targets: 1 });
        expect(probeRuntimes()).toEqual(before);
        expect(pluginViews).toBe(0);
        const settled = await Promise.all(pending);
        expect(settled.map(({ status }) => status)).toEqual(
            Array.from({ length: 5 }).flatMap(() => ['rejected', 'applied']),
        );
    });
});
