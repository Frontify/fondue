/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { createPortalStore, type PortalEntry } from '#/bridge/nodeViews/helpers/portals';
import { type EditorHandle, RichTextEditor, type SaveRequest } from '#/index';
import { decodeDocument } from '#/model';
import { type RuntimeHandle, runtimeOf } from '#/runtime/runtime';
import { setSelection, typeText } from '#/testing';

import {
    model,
    definition,
    para,
    chromeBlock,
    loaded,
    textOf,
    serviceOf,
    settle,
    peek,
    mount,
    installPersistenceHooks,
} from './fixtures/mounted';

vi.mock('#/bridge/nodeViews/helpers/portals', { spy: true });
const { createPortalStore: actualStore } = await vi.importActual<{
    createPortalStore: typeof createPortalStore;
}>('#/bridge/nodeViews/helpers/portals');

installPersistenceHooks();

describe('the runtime with a save coordinator', () => {
    it('warns of an undeclared capability on decode and saves the corrected list after one edit', async () => {
        const boldText = { type: 'text', text: 'ab', marks: [{ type: 'bold' }] };
        const blocks = [{ type: 'paragraph', attrs: { lang: null }, content: [boldText] }];
        const decoded = decodeDocument(loaded(null, ...blocks).document, model);
        expect(decoded.status).toBe('editable');
        expect(decoded.diagnostics).toEqual([
            {
                code: 'format.capability-undeclared',
                severity: 'warning',
                messageKey: 'format.capability-undeclared',
                path: '/requiredCapabilities',
                details: { capability: 'marks.bold' },
            },
        ]);
        const { service, calls } = serviceOf();
        const { type, advance, unmount } = mount({ service, blocks });
        type('x');
        advance(500);
        await settle();
        expect(calls[0]?.request.document.requiredCapabilities).toEqual([
            { id: 'core', version: 1 },
            { id: 'marks.bold', version: 1 },
        ]);
        unmount();
    });

    it('notifies selector stores, then emits the change, selection, save status and metric', () => {
        const { handle, type, unmount } = mount({ service: serviceOf().service });
        const runtime = runtimeOf(handle());
        const order: string[] = [];
        runtime?.watch(
            () => handle().getSummary().sequence,
            Object.is,
            () => order.push('selector'),
        );
        for (const event of ['documentChange', 'selectionChange', 'saveStatusChange', 'operationMetric'] as const) {
            handle().subscribe(event, () => order.push(event));
        }

        act(() => setSelection(handle(), { text: 'ab' }));
        order.length = 0;
        type('x');
        expect(order).toEqual(['selector', 'documentChange', 'selectionChange', 'saveStatusChange', 'operationMetric']);

        // A caret that stays in the same kind of block leaves the selection summary as it was.
        order.length = 0;
        type('y');
        expect(order).toEqual(['selector', 'documentChange', 'saveStatusChange', 'operationMetric']);
        unmount();
    });

    it('emits undo as a history change and autosaves it', async () => {
        const { service, calls } = serviceOf();
        const { handle, type, advance, unmount } = mount({ service });
        const origins: string[] = [];
        handle().subscribe('documentChange', ({ origin }) => origins.push(origin));
        type('x');
        advance(500);
        await settle();
        act(() => {
            (handle() as unknown as Pick<RuntimeHandle, 'execute'>).execute('history.undo');
        });
        advance(500);
        await settle();
        expect(origins).toEqual(['input', 'history']);
        expect(calls.map(({ request }) => textOf(request))).toEqual(['xab', 'ab']);
        unmount();
    });

    it('keeps the save state and the autosave due time across two mode changes', async () => {
        const { service, calls } = serviceOf();
        const { handle, type, advance, rerender, unmount } = mount({ service });
        type('x');
        const due = Date.now() + 500;
        const status = handle().getSaveStatus();
        advance(200);
        rerender(true);
        expect(handle().getSaveStatus()).toBe(status);
        rerender(false);
        expect(handle().getSaveStatus()).toBe(status);
        advance(1000);
        await settle();
        expect(calls.map(({ at }) => at)).toEqual([due]);
        unmount();
    });

    it('stops autosave once a node view update faults a dirty session', async () => {
        vi.mocked(createPortalStore).mockImplementationOnce(() => {
            const store = actualStore();

            return {
                ...store,
                set: (entry: PortalEntry) => {
                    if (entry.state.attrs.language === 'boom') {
                        throw new Error('node view failed');
                    }

                    store.set(entry);
                },
            };
        });
        const { service } = serviceOf();
        const { handle, type, advance, unmount } = mount({
            service,
            blocks: [para('ab'), chromeBlock('b1')],
        });
        await act(async () => {
            await vi.advanceTimersByTimeAsync(0);
        });
        type('x');
        act(() => {
            runtimeOf(handle())?.nodeActions('b1').update({ language: 'boom' });
        });
        await act(async () => {
            await vi.advanceTimersByTimeAsync(0);
        });
        expect(handle().getSummary().phase).toBe('faulted');
        expect(handle().getSaveStatus().state).toBe('dirty');

        advance(10_000);
        await settle();
        expect(service.save).not.toHaveBeenCalled();
        unmount();
    });

    it.each(['a backoff replay', 'the online event'])(
        'sends no write through %s once a dirty session faulted',
        async (path) => {
            vi.mocked(createPortalStore).mockImplementationOnce(() => {
                const store = actualStore();

                return {
                    ...store,
                    set: (entry: PortalEntry) => {
                        if (entry.state.attrs.language === 'boom') {
                            throw new Error('node view failed');
                        }

                        store.set(entry);
                    },
                };
            });
            const { service, calls } = serviceOf(true);
            const { handle, type, advance, unmount } = mount({
                service,
                blocks: [para('ab'), chromeBlock('b1')],
            });
            await act(async () => {
                await vi.advanceTimersByTimeAsync(0);
            });
            type('x');
            advance(500);
            act(() => {
                runtimeOf(handle())?.nodeActions('b1').update({ language: 'boom' });
            });
            await act(async () => {
                await vi.advanceTimersByTimeAsync(0);
            });
            expect(handle().getSummary().phase).toBe('faulted');
            const onLine = vi.spyOn(navigator, 'onLine', 'get');
            onLine.mockReturnValue(path === 'a backoff replay');
            calls[0]?.fail();
            await settle();
            onLine.mockReturnValue(true);
            act(() => {
                window.dispatchEvent(new Event('online'));
            });
            advance(10_000);
            await settle();
            onLine.mockRestore();
            expect(service.save).toHaveBeenCalledTimes(1);
            unmount();
        },
    );

    /** Mounts a dirty session whose chrome node view throws once its `language` is `boom`, and how to fault it. */
    const breakable = async (held: boolean) => {
        vi.mocked(createPortalStore).mockImplementationOnce(() => {
            const store = actualStore();

            return {
                ...store,
                set: (entry: PortalEntry) => {
                    if (entry.state.attrs.language === 'boom') {
                        throw new Error('node view failed');
                    }

                    store.set(entry);
                },
            };
        });
        const services = serviceOf(held);
        const mounted = mount({ service: services.service, blocks: [para('ab'), chromeBlock('b1')] });
        await act(async () => {
            await vi.advanceTimersByTimeAsync(0);
        });
        const fault = async () => {
            act(() => {
                runtimeOf(mounted.handle())?.nodeActions('b1').update({ language: 'boom' });
            });
            await act(async () => {
                await vi.advanceTimersByTimeAsync(0);
            });
            expect(mounted.handle().getSummary().phase).toBe('faulted');
        };

        return { ...mounted, service: services.service, calls: services.calls, fault };
    };

    it('saves the last published snapshot of a faulted session through requestCommit', async () => {
        const { handle, flush, service, calls, type, advance, fault, unmount } = await breakable(false);
        type('x');
        await fault();
        advance(10_000);
        await settle();
        expect(service.save).not.toHaveBeenCalled();

        const published = handle().getSnapshot();
        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        await settle();
        expect(calls.map(({ request }) => [request.stamp, request.document])).toEqual([
            [published.stamp, published.document],
        ]);
        expect(textOf(calls[0]?.request as SaveRequest)).toBe('xab');
        expect(await result).toMatchObject({ status: 'acknowledged', acknowledgment: { stamp: published.stamp } });
        unmount();
    });

    it('holds the write a fault left unresolved until requestCommit, then replays it unchanged first', async () => {
        const { handle, flush, calls, type, advance, fault, unmount } = await breakable(true);
        type('x');
        advance(500);
        type('y');
        await fault();
        calls[0]?.fail();
        await settle();
        advance(60_000);
        await settle();
        expect(calls).toHaveLength(1);

        const published = handle().getSnapshot();
        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        const [first, replayed] = calls.map(({ request }) => request);
        expect(calls).toHaveLength(2);
        expect(replayed).toEqual(first);
        calls[1]?.answer();
        await settle();
        expect(calls[2]?.request).toMatchObject({ stamp: published.stamp, baseRevision: 'revision-1' });
        expect(textOf(calls[2]?.request as SaveRequest)).toBe('xyab');
        calls[2]?.answer();
        expect(await result).toMatchObject({ status: 'acknowledged', acknowledgment: { stamp: published.stamp } });
        advance(60_000);
        await settle();
        expect(calls).toHaveLength(3);
        unmount();
    });

    it('writes the unsaved edit once on requestCommit after Retry, not an acknowledgment of the loaded record', async () => {
        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
        const { service, calls } = serviceOf(true);
        const ref = createRef<EditorHandle<object>>();
        const Bomb = ({ armed }: { armed: boolean }) => {
            if (armed) {
                throw new Error('render failed');
            }

            return null;
        };

        const tree = (armed: boolean) => (
            <RichTextEditor.Root
                aria-label="Notes"
                definition={definition}
                defaultValue={loaded('revision-1', para('ab'))}
                services={{ persistence: service }}
                ref={ref}
            >
                <RichTextEditor.Surface />
                <Bomb armed={armed} />
            </RichTextEditor.Root>
        );
        const view = render(tree(false));
        act(() => {
            vi.advanceTimersToNextFrame();
        });
        act(() => typeText(ref.current as EditorHandle<object>, 'c'));
        view.rerender(tree(true));
        view.rerender(tree(false));
        fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
        act(() => {
            vi.advanceTimersToNextFrame();
        });
        const handle = ref.current as EditorHandle<object>;
        const result = handle.requestCommit({ reason: 'manual' });
        await act(async () => {
            await vi.advanceTimersByTimeAsync(0);
        });
        await settle();
        expect(calls).toHaveLength(1);
        expect(textOf(calls[0]?.request as SaveRequest)).toBe('cab');
        expect(await peek(result)).toBe('pending');
        const { operationId, stamp } = calls[0]?.request as SaveRequest;
        calls[0]?.answer({ status: 'saved', acknowledgment: { operationId, stamp, revision: 'revision-2' } });
        expect(await result).toMatchObject({ status: 'acknowledged', acknowledgment: { operationId, stamp } });
        expect(calls).toHaveLength(1);
        view.unmount();
        consoleError.mockRestore();
    });

    it('keeps the write in flight across rerenders that pass services inline with the same functions', () => {
        const { service, calls } = serviceOf(true);
        const { type, advance, rerender, unmount } = mount({ service });
        type('x');
        advance(500);
        for (let render = 0; render < 3; render += 1) {
            rerender(false, { save: service.save, read: service.read });
        }

        expect(service.save).toHaveBeenCalledTimes(1);
        expect(calls[0]?.context.signal.aborted).toBe(false);
        unmount();
    });

    it('replays the write in flight through a replaced services.persistence', async () => {
        const first = serviceOf(true);
        const second = serviceOf(true);
        const { handle, type, advance, rerender, unmount } = mount({ service: first.service });
        type('x');
        advance(500);
        const view = runtimeOf(handle())?.view;
        rerender(false, second.service);
        const [held] = first.calls;
        expect(held?.context.signal.aborted).toBe(true);
        expect(second.calls.map(({ request }) => request)).toEqual([held?.request]);

        held?.answer();
        await settle();
        expect(handle().getSaveStatus()).toMatchObject({ state: 'saving', acknowledgedSequence: -1 });
        second.calls[0]?.answer();
        await settle();
        expect(handle().getSaveStatus()).toMatchObject({ state: 'clean', acknowledgedSequence: 1 });
        expect(runtimeOf(handle())?.view).toBe(view);
        unmount();
    });

    it('runs the node-ids normalizer in a managed session with no service call', () => {
        const failing = () => {
            throw new Error('A normalizer reached a service.');
        };

        const service = { save: vi.fn(failing), read: vi.fn(failing) };
        const { handle, metrics, unmount } = mount({ service });
        metrics.length = 0;
        act(() => {
            (handle() as unknown as Pick<RuntimeHandle, 'execute'>).execute('test.stamped.set');
        });
        expect(metrics.map(({ kind, normalizationTransactions }) => [kind, normalizationTransactions])).toEqual([
            ['commit', 1],
        ]);
        expect(service.save).not.toHaveBeenCalled();
        expect(service.read).not.toHaveBeenCalled();
        unmount();
    });
});
