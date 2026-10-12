/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { act, fireEvent, render, screen } from '@testing-library/react';
import fc from 'fast-check';
import { createRef } from 'react';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { createPortalStore, type PortalEntry } from '#/bridge/portals';
import { fixtureChromeViews } from '#/features/__tests__/fixtures/chrome/view';
import { core } from '#/features/core/feature';
import { bold } from '#/features/marks-bold/feature';
import {
    type CommitResult,
    defineEditor,
    type EditorHandle,
    type OperationMetric,
    type PersistenceOptions,
    type PersistenceService,
    RichTextEditor,
    type SaveRequest,
    type SaveResponse,
    type ServiceContext,
} from '#/index';
import {
    compileContentModel,
    decodeDocument,
    defineFeature,
    type Diagnostic,
    type Feature,
    type JsonValue,
    setBlock,
} from '#/model';
import { encodeTree } from '#/model/encode';
import { type RuntimeHandle, runtimeOf } from '#/runtime/runtime';
import { SETTLE_MS } from '#/runtime/settle';
import { createFakePersistenceService, runPersistenceConformance, setSelection, typeText } from '#/testing';
import { STORAGE, stubStorage } from '#/testing/__tests__/fixtures/storage';
import { createFakeServer } from '#/testing/persistence';

vi.mock('#/bridge/portals', { spy: true });
vi.mock('#/model/encode', { spy: true });
const { createPortalStore: actualStore } = await vi.importActual<{
    readonly createPortalStore: typeof createPortalStore;
}>('#/bridge/portals');

// A block whose new occurrences get their `nodeId` from the `node-ids` normalizer.
const stampedBlock = defineFeature({
    id: 'test.stamped',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    nodes: {
        stamped: {
            group: 'block',
            content: 'text*',
            marks: [],
            attrs: { nodeId: { type: 'string', required: true } },
            html: ['aside', 0],
            parse: [{ tag: 'aside' }],
        },
    },
    commands: { 'test.stamped.set': setBlock('stamped', { toggle: true }) },
});
const features: readonly Feature[] = [core(), bold(), fixtureChromeViews(), stampedBlock()];
const model = compileContentModel(features, { id: 'test.persistence', version: 1 });
const definition = defineEditor({ id: 'test.persistence', model });
const packageFile = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..', 'package.json');
const { version: PACKAGE_VERSION } = JSON.parse(readFileSync(packageFile, 'utf8')) as { readonly version: string };
const WRITER: SaveRequest['writer'] = {
    build: PACKAGE_VERSION,
    formatVersion: 1,
    model: { id: 'test.persistence', version: 1 },
    capabilities: model.capabilities.map(({ id, version }) => ({ id, version })),
};

const para = (text: string) => ({ type: 'paragraph', attrs: { lang: null }, content: [{ type: 'text', text }] });
const chromeBlock = (nodeId: string) => ({
    type: 'chrome_block',
    attrs: { nodeId, language: 'plain', checked: false },
    content: [{ type: 'text', text: 'code' }],
});
const loaded = (revision: string | null, ...blocks: readonly JsonValue[]) => ({
    documentId: 'document-1',
    revision,
    document: {
        format: 'frontify.rich-text' as const,
        formatVersion: 1 as const,
        model: { id: 'test.persistence', version: 1 },
        requiredCapabilities: [
            { id: 'core', version: 1 },
            { id: 'fixture.chrome', version: 1 },
        ],
        content: {
            type: 'doc',
            attrs: { lang: null, dir: 'auto' },
            content: blocks,
        } as never,
    },
});
const textOf = (request: SaveRequest) => JSON.stringify(request.document.content).match(/"text":"([^"]*)"/)?.[1];

/** One `save` call: what it got, when, and how the test answers it. */
interface Call {
    readonly request: SaveRequest;
    readonly context: ServiceContext;
    readonly at: number;
    /** Resolves with `response`, or with the reference fake's answer when none is given. */
    answer(response?: SaveResponse): void;
    fail(): void;
}

/** A service in front of the reference fake that records each call; `held` saves wait until the test answers them. */
const serviceOf = (held = false) => {
    const server = createFakePersistenceService();
    const calls: Call[] = [];
    const service = {
        save: vi.fn(
            (request: SaveRequest, context: ServiceContext) =>
                new Promise<SaveResponse>((resolve, reject) => {
                    const call: Call = {
                        request,
                        context,
                        at: Date.now(),
                        answer: (response) => {
                            if (response === undefined) {
                                resolve(server.save(request, context));
                                return;
                            }
                            resolve(response);
                        },
                        fail: () => reject(new Error('The connection dropped.')),
                    };
                    calls.push(call);
                    if (!held) {
                        call.answer();
                    }
                }),
        ),
        read: vi.fn((documentId: string, context: ServiceContext) => server.read(documentId, context)),
    };
    return { service, calls, server };
};

/** Lets every pending promise continuation run, as the browser does between tasks. */
const settle = () =>
    act(async () => {
        await vi.advanceTimersByTimeAsync(0);
    });
/** The promise's value, or `pending` while it has none once the pending continuations ran. */
const peek = async <T,>(promise: Promise<T>) => {
    await settle();
    // An already settled promise wins the race over the second entry.
    return Promise.race([promise, Promise.resolve('pending' as const)]);
};

interface MountOptions {
    readonly service?: PersistenceService;
    readonly revision?: string | null;
    readonly persistenceOptions?: PersistenceOptions;
    readonly blocks?: readonly JsonValue[];
    /** Time that passes between the mount and its first frame. */
    readonly beforeReady?: number;
    /** Leaves the editor `mounting`, before its first frame. */
    readonly mounting?: boolean;
}

/** Mounts an editor on a test then runs its first frame, so it is `ready`. */
const mount = (options: MountOptions = {}) => {
    const ref = createRef<EditorHandle<object>>();
    const diagnostics: Diagnostic[] = [];
    const metrics: OperationMetric[] = [];
    const props: Record<string, unknown> = {};
    if (options.persistenceOptions !== undefined) {
        props.persistenceOptions = options.persistenceOptions;
    }
    let revision: string | null = null;
    if (options.revision !== undefined) {
        revision = options.revision;
    }
    const blocks = options.blocks ?? [para('ab')];
    let generated = 0;
    const generateId = () => {
        generated += 1;
        return `id-${generated}`;
    };
    const element = (readOnly: boolean, service = options.service) => {
        const managed: Record<string, unknown> = { ...props };
        if (service !== undefined) {
            managed.services = { persistence: service };
        }
        return (
            <RichTextEditor
                aria-label="Notes"
                definition={definition}
                defaultValue={loaded(revision, ...blocks)}
                generateId={generateId}
                readOnly={readOnly}
                onDiagnostic={(diagnostic) => diagnostics.push(diagnostic)}
                ref={ref}
                {...managed}
            />
        );
    };
    const view = render(element(false));
    const handle = () => {
        if (ref.current === null) {
            throw new Error('no handle');
        }
        return ref.current;
    };
    handle().subscribe('operationMetric', (metric) => metrics.push(metric));
    if (options.mounting !== true) {
        act(() => {
            vi.advanceTimersByTime(options.beforeReady ?? 0);
            vi.advanceTimersToNextFrame();
        });
    }
    return {
        ...view,
        handle,
        diagnostics,
        metrics,
        rerender: (readOnly: boolean, service?: PersistenceService) => view.rerender(element(readOnly, service)),
        type: (text: string) => act(() => typeText(handle(), text)),
        advance: (ms: number) =>
            act(() => {
                vi.advanceTimersByTime(ms);
            }),
        /** Runs the microtask in which `requestCommit` captures. */
        flush: () =>
            act(async () => {
                await vi.advanceTimersByTimeAsync(0);
            }),
    };
};

const viewOf = (handle: EditorHandle<object>) => {
    const view = runtimeOf(handle)?.view;
    if (view === undefined) {
        throw new Error('no view');
    }
    return view;
};
/** Starts a composition as the browser does, so ProseMirror's own handler sets `view.composing`, and composes `text`. */
const compose = (handle: EditorHandle<object>, text: string) =>
    act(() => {
        const view = viewOf(handle);
        view.dom.dispatchEvent(new CompositionEvent('compositionstart'));
        // ProseMirror marks the composed text it reads from the DOM with its composition ID.
        view.dispatch(view.state.tr.insertText(text).setMeta('composition', 1));
    });
/** Ends the composition, then runs the microtask and the timer after which input has settled. */
const endComposition = async (handle: EditorHandle<object>) => {
    act(() => {
        viewOf(handle).dom.dispatchEvent(new CompositionEvent('compositionend'));
    });
    await act(async () => {
        await vi.advanceTimersByTimeAsync(0);
    });
    act(() => {
        vi.advanceTimersByTime(SETTLE_MS);
    });
};

// every browser storage API fails while this suite runs.
let storage: ReturnType<typeof stubStorage>;
beforeAll(() => {
    storage = stubStorage();
});
afterAll(() => {
    const { accessed } = storage;
    storage.restore();
    expect(accessed).toEqual([]);
});
/** Seeded so backoff delays stay repeatable. */
const seededRandom = (seed: number) => {
    let state = seed >>> 0;
    return () => {
        state = (state + 0x6d2b79f5) >>> 0;
        let value = Math.imul(state ^ (state >>> 15), state | 1);
        value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
        return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
    };
};
beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random').mockImplementation(seededRandom(1));
});
afterEach(() => {
    vi.useRealTimers();
});

describe('save state at load', () => {
    it('runs the persistence suite with every browser storage API failing', () => {
        for (const name of STORAGE) {
            expect(() => {
                Reflect.get(Reflect.get(globalThis, name) as object, 'open');
            }).toThrow(name);
        }
        // The probe above is the only access this suite may make.
        expect(storage.accessed.splice(0)).toEqual([...STORAGE]);
    });

    it('reports unmanaged without services.persistence, after mount and after typing', () => {
        const { handle, type, unmount } = mount();
        expect(handle().getSaveStatus().state).toBe('unmanaged');
        type('x');
        expect(handle().getSaveStatus()).toMatchObject({ state: 'unmanaged', latestSequence: 1 });
        unmount();
    });

    it('resolves requestCommit blocked with unmanaged without services.persistence', async () => {
        const { handle, unmount } = mount();
        await expect(handle().requestCommit({ reason: 'manual' })).resolves.toEqual({
            status: 'blocked',
            code: 'unmanaged',
        });
        unmount();
    });

    it.each([
        ['a new record', null],
        ['an existing record', 'revision-7'],
    ])('sends no write for %s over 60 seconds after load', async (_name, revision) => {
        const { service } = serviceOf();
        const { advance, unmount } = mount({ service, revision });
        advance(60_000);
        await settle();
        expect(service.save).not.toHaveBeenCalled();
        unmount();
    });

    it('starts a new record at latestSequence 0 and acknowledgedSequence -1', () => {
        const { handle, unmount } = mount({ service: serviceOf().service });
        expect(handle().getSaveStatus()).toEqual({
            state: 'clean',
            latestSequence: 0,
            acknowledgedSequence: -1,
            revision: null,
            inFlightOperationId: null,
            diagnostic: null,
        });
        unmount();
    });

    it('starts an existing record at latestSequence 0 and acknowledgedSequence 0', () => {
        const { handle, unmount } = mount({
            service: serviceOf().service,
            revision: 'revision-7',
        });
        expect(handle().getSaveStatus()).toMatchObject({
            state: 'clean',
            latestSequence: 0,
            acknowledgedSequence: 0,
            revision: 'revision-7',
        });
        expect(handle().getSnapshot().acknowledgedRevision).toBe('revision-7');
        unmount();
    });
});

describe('writes', () => {
    it('keeps at most one write in flight across random edits, requestCommit calls and delayed responses', async () => {
        const step = fc.oneof(
            fc.constant({ kind: 'type' as const }),
            fc.record({ kind: fc.constant('advance' as const), ms: fc.integer({ min: 0, max: 40_000 }) }),
            fc.record({ kind: fc.constant('answer' as const), saved: fc.boolean() }),
            fc.constant({ kind: 'commit' as const }),
        );
        await fc.assert(
            fc.asyncProperty(fc.array(step, { maxLength: 25 }), async (steps) => {
                const server = createFakePersistenceService();
                let open = 0;
                let most = 0;
                const waiting: { readonly saved: () => void; readonly failed: () => void }[] = [];
                const service: PersistenceService = {
                    save: (request, context) =>
                        new Promise((resolve, reject) => {
                            open += 1;
                            most = Math.max(most, open);
                            let ended = false;
                            const end = () => {
                                if (!ended) {
                                    ended = true;
                                    open -= 1;
                                }
                            };
                            // An aborted request is no longer in flight for the coordinator.
                            context.signal.addEventListener('abort', end);
                            waiting.push({
                                saved: () => {
                                    end();
                                    resolve(server.save(request, context));
                                },
                                failed: () => {
                                    end();
                                    reject(new Error('lost'));
                                },
                            });
                        }),
                    read: server.read,
                };
                const { handle, flush, type, advance, unmount } = mount({ service });
                const commits: Promise<CommitResult>[] = [];
                for (const next of steps) {
                    if (next.kind === 'type') {
                        type('x');
                    } else if (next.kind === 'commit') {
                        commits.push(handle().requestCommit({ reason: 'manual' }));
                        await flush();
                    } else if (next.kind === 'advance') {
                        advance(next.ms);
                    } else {
                        const first = waiting.shift();
                        if (first !== undefined && next.saved) {
                            first.saved();
                        } else if (first !== undefined) {
                            first.failed();
                        }
                    }
                    await settle();
                }
                unmount();
                expect(most).toBeLessThanOrEqual(1);
                // Dispose resolves every call still pending.
                await Promise.all(commits);
            }),
            { numRuns: 40 },
        );
    });

    it('writes at 5 s and 10 s of continuous typing and 500 ms after the last character', async () => {
        const { service, calls } = serviceOf();
        const { type, advance, unmount } = mount({ service });
        const start = Date.now();
        for (let character = 0; character < 120; character += 1) {
            type('x');
            advance(100);
            await settle();
        }
        advance(1000);
        await settle();
        expect(calls.map(({ at }) => at - start)).toEqual([5000, 10_000, 12_400]);
        expect(calls.map(({ request }) => textOf(request)?.length)).toEqual([52, 102, 122]);
        unmount();
    });

    it('neither serializes the document nor schedules a write for 100 selection moves', async () => {
        const { service } = serviceOf();
        const { handle, advance, unmount } = mount({ service, blocks: [para('abcdef')] });
        const status = handle().getSaveStatus();
        vi.mocked(encodeTree).mockClear();
        for (let move = 0; move < 100; move += 1) {
            act(() => setSelection(handle(), { text: 'abcdef', from: move % 6, to: (move % 6) + 1 }));
        }
        expect(encodeTree).not.toHaveBeenCalled();
        advance(10_000);
        await settle();
        expect(service.save).not.toHaveBeenCalled();
        expect(handle().getSaveStatus()).toBe(status);
        unmount();
    });

    it('builds each write from the ID source, the snapshot, the acknowledged revision and the writer', async () => {
        const { service, calls } = serviceOf();
        const { handle, type, advance, unmount } = mount({ service });
        const snapshots = [];
        type('x');
        snapshots.push(handle().getSnapshot());
        advance(500);
        await settle();
        type('y');
        snapshots.push(handle().getSnapshot());
        advance(500);
        await settle();

        expect(calls[0]?.request.operationId).toMatch(/^id-/);
        expect(calls[1]?.request.operationId).toMatch(/^id-/);
        expect(calls[0]?.request.operationId).not.toBe(calls[1]?.request.operationId);
        expect(calls.map(({ request }) => ({ ...request, operationId: 'id' }))).toEqual([
            {
                operationId: 'id',
                stamp: snapshots[0]?.stamp,
                baseRevision: null,
                document: snapshots[0]?.document,
                writer: WRITER,
            },
            {
                operationId: 'id',
                stamp: snapshots[1]?.stamp,
                baseRevision: 'revision-1',
                document: snapshots[1]?.document,
                writer: WRITER,
            },
        ]);
        unmount();
    });

    it.each([
        ['another operation ID', (request: SaveRequest) => ({ ...request, operationId: 'operation-99' })],
        ['another generation', (request: SaveRequest) => ({ ...request, stamp: { ...request.stamp, generation: 1 } })],
        [
            'a sequence one higher',
            (request: SaveRequest) => ({
                ...request,
                stamp: { ...request.stamp, sequence: request.stamp.sequence + 1 },
            }),
        ],
        [
            'another session ID',
            (request: SaveRequest) => ({ ...request, stamp: { ...request.stamp, sessionId: 'other' } }),
        ],
        [
            'another document ID',
            (request: SaveRequest) => ({ ...request, stamp: { ...request.stamp, documentId: 'document-2' } }),
        ],
    ])('ignores an acknowledgment with %s and warns persistence.ack-mismatch', async (_name, change) => {
        const { service, calls } = serviceOf(true);
        const { handle, diagnostics, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        const [call] = calls;
        if (call === undefined) {
            throw new Error('no write');
        }
        const other = change(call.request);
        call.answer({
            status: 'saved',
            acknowledgment: { operationId: other.operationId, stamp: other.stamp, revision: 'revision-1' },
        });
        await settle();

        expect(diagnostics.map(({ code, severity }) => [code, severity])).toEqual([
            ['persistence.ack-mismatch', 'warning'],
        ]);
        expect(handle().getSaveStatus()).toMatchObject({
            state: 'saving',
            acknowledgedSequence: -1,
            revision: null,
            inFlightOperationId: call.request.operationId,
        });
        unmount();
    });

    it('stays dirty after an older acknowledgment and bases the next write on its revision (trace 15.7)', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        type('y');
        calls[0]?.answer();
        await settle();
        expect(handle().getSaveStatus()).toMatchObject({
            state: 'dirty',
            latestSequence: 2,
            acknowledgedSequence: 1,
            revision: 'revision-1',
        });

        advance(500);
        expect(calls[1]?.request).toMatchObject({ baseRevision: 'revision-1', stamp: { sequence: 2 } });
        calls[1]?.answer();
        await settle();
        expect(handle().getSaveStatus()).toMatchObject({
            state: 'clean',
            latestSequence: 2,
            acknowledgedSequence: 2,
            revision: 'revision-2',
        });
        unmount();
    });

    it.each(['a rejected promise', 'a timeout'])(
        'replays the same request after %s, writer included',
        async (cause) => {
            const { service, calls } = serviceOf(true);
            const { handle, type, advance, unmount } = mount({ service });
            type('x');
            advance(500);
            if (cause === 'a timeout') {
                advance(30_000);
                expect(calls[0]?.context.signal.aborted).toBe(true);
            } else {
                calls[0]?.fail();
            }
            await settle();
            expect(handle().getSaveStatus().state).toBe('uncertain');

            advance(1200);
            const [first, replayed] = calls.map(({ request }) => request);
            expect(calls).toHaveLength(2);
            expect(replayed).toEqual(first);
            expect(replayed?.writer).toEqual(WRITER);
            unmount();
        },
    );

    it('sends only replays while uncertain, then the newer snapshot once the replay is answered', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        calls[0]?.fail();
        await settle();
        for (let round = 0; round < 3; round += 1) {
            type('y');
            advance(10_000);
            calls.at(-1)?.fail();
            await settle();
        }
        const first = calls[0]?.request.operationId;
        expect(calls.map(({ request }) => request.operationId)).toEqual(calls.map(() => first));

        advance(20_000);
        // Every replay carries the stamp and document of the first try, not the newer edits.
        for (const call of calls) {
            expect(call.request).toEqual(calls[0]?.request);
        }
        calls.at(-1)?.answer();
        await settle();
        advance(500);
        expect(calls.at(-1)?.request.operationId).not.toBe(first);
        expect(textOf(calls.at(-1)?.request as SaveRequest)).toBe('xyyyab');
        expect(handle().getSaveStatus().state).toBe('saving');
        unmount();
    });

    it('replays the unresolved write unchanged on the online event, ahead of newer edits', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        const onLine = vi.spyOn(navigator, 'onLine', 'get');
        onLine.mockReturnValue(false);
        calls[0]?.fail();
        await settle();
        expect(handle().getSaveStatus().state).toBe('offline');
        type('y');
        advance(10_000);
        expect(calls).toHaveLength(1);

        onLine.mockReturnValue(true);
        act(() => {
            window.dispatchEvent(new Event('online'));
        });
        onLine.mockRestore();
        expect(calls).toHaveLength(2);
        const [first, replayed] = calls.map(({ request }) => request);
        expect(replayed).toEqual(first);
        unmount();
    });

    it('replays after about 1, 2, 4, 8 and 16 seconds, then reports retries-exhausted', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, diagnostics, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        const failedAt: number[] = [];
        for (let attempt = 0; attempt < 6; attempt += 1) {
            failedAt.push(Date.now());
            calls.at(-1)?.fail();
            await settle();
            advance(20_000);
        }
        const delays = calls.slice(1).map(({ at }, index) => at - (failedAt[index] ?? 0));
        for (const [index, delay] of delays.entries()) {
            const expected = 1000 * 2 ** index;
            expect(delay).toBeGreaterThanOrEqual(expected * 0.8);
            expect(delay).toBeLessThanOrEqual(expected * 1.2);
        }
        expect(delays).toHaveLength(5);
        expect(new Set(calls.map(({ request }) => request.operationId)).size).toBe(1);
        expect(handle().getSaveStatus()).toMatchObject({
            state: 'error',
            diagnostic: { code: 'persistence.retries-exhausted' },
        });
        expect(diagnostics.map(({ code }) => code)).toEqual(['persistence.retries-exhausted']);
        unmount();
    });

    it('replays the kept operation unchanged on the next requestCommit after retries ran out', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, advance, unmount } = mount({
            service,
            persistenceOptions: { maxRetries: 0 },
        });
        type('x');
        advance(500);
        calls[0]?.fail();
        await settle();
        advance(60_000);
        expect(handle().getSaveStatus().state).toBe('error');
        expect(calls).toHaveLength(1);

        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        const [first, replayed] = calls.map(({ request }) => request);
        expect(calls).toHaveLength(2);
        expect(replayed).toEqual(first);
        calls[1]?.answer();
        await settle();
        expect(await result).toEqual({
            status: 'acknowledged',
            acknowledgment: {
                operationId: calls[0]?.request.operationId,
                stamp: calls[0]?.request.stamp,
                revision: 'revision-1',
            },
        });
        expect(handle().getSaveStatus().state).toBe('clean');
        unmount();
    });

    it('replays a failed checkpoint unchanged on a second requestCommit with no edit', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, unmount } = mount({ service, persistenceOptions: { maxRetries: 0 } });
        type('x');
        const first = handle().requestCommit({ reason: 'manual' });
        await flush();
        calls[0]?.fail();
        expect(await first).toEqual({ status: 'failed', code: 'transport', outcome: 'unknown' });
        expect(handle().getSaveStatus().state).toBe('error');

        const second = handle().requestCommit({ reason: 'manual' });
        await flush();
        const [sent, replayed] = calls.map(({ request }) => request);
        expect(calls).toHaveLength(2);
        expect(replayed).toEqual(sent);
        calls[1]?.answer();
        expect(await second).toMatchObject({
            status: 'acknowledged',
            acknowledgment: { operationId: calls[0]?.request.operationId },
        });
        unmount();
    });

    it('replays the kept operation for a requestCommit that joins a checkpoint an earlier call timed out on', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, advance, unmount } = mount({
            service,
            persistenceOptions: { maxRetries: 0 },
        });
        type('x');
        advance(500);
        type('y');
        const first = handle().requestCommit({ reason: 'manual' });
        await flush();
        calls[0]?.fail();
        await settle();
        advance(30_000);
        expect(await first).toEqual({ status: 'failed', code: 'timeout', outcome: 'not-sent' });

        const second = handle().requestCommit({ reason: 'manual' });
        await flush();
        const [sent, replayed] = calls.map(({ request }) => request);
        expect(calls).toHaveLength(2);
        expect(replayed).toEqual(sent);
        calls[1]?.answer();
        await settle();
        expect(textOf(calls[2]?.request as SaveRequest)).toBe('xyab');
        calls[2]?.answer();
        expect(await second).toMatchObject({
            status: 'acknowledged',
            acknowledgment: { operationId: calls[2]?.request.operationId },
        });
        unmount();
    });

    it('gives equal seeds equal backoff delays and different seeds different ones', async () => {
        const delaysFor = async (seed: number) => {
            const random = vi.spyOn(Math, 'random').mockImplementation(seededRandom(seed));
            const { service, calls } = serviceOf(true);
            const { type, advance, unmount } = mount({ service });
            type('x');
            advance(500);
            const failedAt: number[] = [];
            for (let attempt = 0; attempt < 5; attempt += 1) {
                failedAt.push(Date.now());
                calls.at(-1)?.fail();
                await settle();
                advance(20_000);
            }
            unmount();
            random.mockRestore();
            return calls.slice(1).map(({ at }, index) => at - (failedAt[index] ?? 0));
        };
        const seven = await delaysFor(7);
        expect(await delaysFor(7)).toEqual(seven);
        expect(await delaysFor(8)).not.toEqual(seven);
        expect(seven.some((delay, index) => delay !== 1000 * 2 ** index)).toBe(true);
    });

    it('reports the operation ID in flight, and null before and after', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, type, advance, unmount } = mount({ service });
        type('x');
        expect(handle().getSaveStatus().inFlightOperationId).toBeNull();
        advance(500);
        expect(handle().getSaveStatus()).toMatchObject({
            state: 'saving',
            inFlightOperationId: calls[0]?.request.operationId,
        });
        calls[0]?.answer();
        await settle();
        expect(handle().getSaveStatus()).toMatchObject({ state: 'clean', inFlightOperationId: null });
        unmount();
    });

    it('reports no operation ID in flight during the backoff of an uncertain write', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        calls[0]?.fail();
        await settle();
        expect(handle().getSaveStatus()).toMatchObject({ state: 'uncertain', inFlightOperationId: null });
        advance(1200);
        expect(handle().getSaveStatus()).toMatchObject({
            state: 'saving',
            inFlightOperationId: calls[0]?.request.operationId,
        });
        unmount();
    });
});

describe('persistence options', () => {
    it('follows delayMs, maxWaitMs, timeoutMs and maxRetries', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, diagnostics, type, advance, unmount } = mount({
            service,
            persistenceOptions: { delayMs: 100, maxWaitMs: 300, timeoutMs: 2000, maxRetries: 2 },
        });
        const start = Date.now();
        type('x');
        advance(99);
        expect(calls).toHaveLength(0);
        advance(1);
        expect(calls.map(({ at }) => at - start)).toEqual([100]);
        calls[0]?.answer();
        await settle();

        // Typing every 50 ms keeps resetting the delay, so only the longest wait writes.
        const typing = Date.now();
        for (let character = 0; character < 6; character += 1) {
            type('y');
            advance(50);
        }
        expect(calls.map(({ at }) => at - typing).slice(1)).toEqual([300]);
        advance(1999);
        expect(calls[1]?.context.signal.aborted).toBe(false);
        advance(1);
        expect(calls[1]?.context.signal.aborted).toBe(true);
        await settle();

        // Two replays, then no more.
        advance(1200);
        calls[2]?.fail();
        await settle();
        advance(2400);
        calls[3]?.fail();
        await settle();
        advance(60_000);
        expect(calls).toHaveLength(4);
        expect(new Set(calls.slice(1).map(({ request }) => request.operationId)).size).toBe(1);
        expect(handle().getSaveStatus()).toMatchObject({
            state: 'error',
            diagnostic: { code: 'persistence.retries-exhausted', details: { retries: 2 } },
        });
        expect(diagnostics.map(({ code }) => code)).toEqual(['persistence.retries-exhausted']);
        unmount();
    });

    it('writes nothing on its own with autosave off', async () => {
        const { service } = serviceOf();
        const { handle, type, advance, unmount } = mount({
            service,
            persistenceOptions: { autosave: 'off' },
        });
        type('x');
        advance(60_000);
        await settle();
        expect(service.save).not.toHaveBeenCalled();
        expect(handle().getSaveStatus().state).toBe('dirty');
        unmount();
    });
});

describe('conflicts and rejections', () => {
    const conflicted = async (options: PersistenceOptions = {}) => {
        const services = serviceOf(true);
        const mounted = mount({ service: services.service, persistenceOptions: options });
        // The server holds a newer copy of the record.
        await services.server.save(
            {
                operationId: 'elsewhere-1',
                stamp: { documentId: 'document-1', sessionId: 'elsewhere', generation: 0, sequence: 1 },
                baseRevision: null,
                document: loaded(null, para('remote')).document,
                writer: WRITER,
            },
            { signal: new AbortController().signal, session: mounted.handle().getSummary().session },
        );
        mounted.type('x');
        mounted.advance(500);
        services.calls[0]?.answer();
        await settle();
        return { ...mounted, calls: services.calls, service: services.service };
    };

    it('pauses writes on a conflict and keeps local content editable', async () => {
        const { handle, calls, diagnostics, type, advance, unmount } = await conflicted();
        expect(handle().getSaveStatus()).toMatchObject({
            state: 'conflict',
            diagnostic: { code: 'persistence.conflict', details: { currentRevision: 'revision-1' } },
        });
        expect(diagnostics.map(({ code }) => code)).toEqual(['persistence.conflict']);

        type('y');
        advance(10_000);
        await settle();
        expect(calls).toHaveLength(1);
        expect(JSON.stringify(handle().getSnapshot().document)).toContain('xyab');
        unmount();
    });

    it('never retries against the server revision on its own', async () => {
        const { calls, type, advance, unmount } = await conflicted();
        type('y');
        advance(60_000);
        await settle();
        expect(calls.filter(({ request }) => request.baseRevision === 'revision-1')).toEqual([]);
        expect(calls).toHaveLength(1);
        unmount();
    });

    it('blocks requestCommit with conflict at once and sends no write', async () => {
        const { handle, calls, type, advance, unmount } = await conflicted();
        type('y');
        expect(await peek(handle().requestCommit({ reason: 'manual' }))).toEqual({
            status: 'blocked',
            code: 'conflict',
        });
        advance(60_000);
        await settle();
        expect(calls).toHaveLength(1);
        unmount();
    });

    it('hands one read of the server copy and the local snapshot to onConflict', async () => {
        const onConflict = vi.fn();
        const { service, handle, unmount } = await conflicted({ onConflict });
        await settle();
        expect(service.read).toHaveBeenCalledTimes(1);
        expect(service.read.mock.calls[0]?.[0]).toBe('document-1');
        expect(onConflict).toHaveBeenCalledTimes(1);
        const [remote, local] = onConflict.mock.calls[0] as [{ readonly revision: string }, unknown];
        expect(remote).toMatchObject({ documentId: 'document-1', revision: 'revision-1' });
        expect(JSON.stringify(remote)).toContain('remote');
        expect(local).toBe(handle().getSnapshot());
        expect(JSON.stringify(local)).toContain('xab');
        unmount();
    });

    it('hands null to onConflict when the read fails', async () => {
        const onConflict = vi.fn();
        const { service, calls } = serviceOf(true);
        service.read.mockRejectedValueOnce(new Error('The read failed.'));
        const { handle, type, advance, unmount } = mount({
            service,
            persistenceOptions: { onConflict },
        });
        type('x');
        advance(500);
        calls[0]?.answer({ status: 'conflict', currentRevision: 'revision-9' });
        await settle();
        expect(service.read).toHaveBeenCalledTimes(1);
        expect(onConflict).toHaveBeenCalledTimes(1);
        expect(onConflict).toHaveBeenCalledWith(null, handle().getSnapshot());
        unmount();
    });

    it.each(['forbidden', 'invalid', 'incompatible-writer'] as const)(
        'enters error with the service diagnostics on %s, with no retry',
        async (code) => {
            const { service, calls } = serviceOf(true);
            const { handle, diagnostics, type, advance, unmount } = mount({ service });
            const reported: Diagnostic = {
                code: 'format.invalid-structure',
                severity: 'error',
                messageKey: `server.${code}`,
            };
            const alsoReported: Diagnostic = { ...reported, messageKey: `server.${code}.detail` };
            type('x');
            advance(500);
            calls[0]?.answer({ status: 'rejected', code, diagnostics: [reported, alsoReported] });
            await settle();
            type('y');
            advance(60_000);
            await settle();

            expect(handle().getSaveStatus()).toMatchObject({ state: 'error', diagnostic: reported });
            expect(diagnostics).toEqual([reported, alsoReported]);
            expect(calls).toHaveLength(1);
            unmount();
        },
    );
});

describe('disposal', () => {
    it('aborts the signal of the write in flight on dispose', () => {
        const { service, calls } = serviceOf(true);
        const { handle, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        act(() => handle().dispose());
        expect(calls[0]?.context.signal.aborted).toBe(true);
        expect(handle().getSaveStatus().inFlightOperationId).toBeNull();
        unmount();
    });

    it('resolves a pending requestCommit failed with disposed on dispose', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, unmount } = mount({ service });
        type('x');
        const result = handle().requestCommit({ reason: 'navigate' });
        await flush();
        act(() => handle().dispose());
        expect(calls[0]?.context.signal.aborted).toBe(true);
        expect(await peek(result)).toEqual({ status: 'failed', code: 'disposed', outcome: 'unknown' });
        unmount();
    });

    it('resolves a requestCommit that waits for a composition failed with disposed on dispose', async () => {
        const { service } = serviceOf();
        const { handle, unmount } = mount({ service });
        compose(handle(), 'c');
        const result = handle().requestCommit({ reason: 'navigate' });
        expect(await peek(result)).toBe('pending');
        act(() => handle().dispose());
        expect(await peek(result)).toEqual({ status: 'failed', code: 'disposed', outcome: 'unknown' });
        expect(service.save).not.toHaveBeenCalled();
        unmount();
    });

    it('answers a requestCommit from a disposed-dirty listener disposed at once', async () => {
        const { service } = serviceOf();
        const { handle, type, unmount } = mount({ service });
        const results: Promise<CommitResult>[] = [];
        handle().subscribe('diagnostic', ({ code }) => {
            if (code === 'persistence.disposed-dirty') {
                results.push(handle().requestCommit({ reason: 'navigate' }));
            }
        });
        type('x');
        act(() => handle().dispose());
        expect(results).toHaveLength(1);
        expect(await peek(results[0] as Promise<CommitResult>)).toEqual({
            status: 'failed',
            code: 'disposed',
            outcome: 'unknown',
        });
        expect(service.save).not.toHaveBeenCalled();
        unmount();
    });

    it('warns persistence.disposed-dirty on dispose with unsaved changes and starts no write', async () => {
        const { service } = serviceOf();
        const { handle, diagnostics, type, advance, unmount } = mount({ service });
        type('x');
        act(() => handle().dispose());
        advance(10_000);
        await settle();
        expect(diagnostics.map(({ code, severity }) => [code, severity])).toEqual([
            ['persistence.disposed-dirty', 'warning'],
        ]);
        expect(service.save).not.toHaveBeenCalled();
        unmount();
    });
});

describe('commit checkpoints', () => {
    it('pins the snapshot with the keystroke typed in the same task', async () => {
        const { service, calls } = serviceOf();
        const { handle, flush, unmount } = mount({ service });
        let result: Promise<CommitResult> | undefined;
        act(() => {
            // ProseMirror reads a typed character in a microtask queued at the DOM mutation, before the call.
            queueMicrotask(() => typeText(handle(), 'x'));
            result = handle().requestCommit({ reason: 'submit' });
        });
        await flush();
        await settle();
        const snapshot = handle().getSnapshot();
        expect(calls[0]?.request.operationId).toMatch(/^id-/);
        expect(calls.map(({ request }) => ({ ...request, operationId: 'id' }))).toEqual([
            {
                operationId: 'id',
                stamp: snapshot.stamp,
                baseRevision: null,
                document: snapshot.document,
                writer: WRITER,
            },
        ]);
        expect(textOf(calls[0]?.request as SaveRequest)).toBe('xab');
        expect(await result).toMatchObject({ status: 'acknowledged', acknowledgment: { stamp: snapshot.stamp } });
        unmount();
    });

    it('writes the pinned payload unchanged while later edits come due for autosave', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, advance, unmount } = mount({ service });
        type('x');
        const pinned = handle().getSnapshot();
        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        type('y');
        advance(10_000);
        await settle();
        expect(calls.map(({ request }) => [request.stamp, request.document])).toEqual([
            [pinned.stamp, pinned.document],
        ]);

        calls[0]?.answer();
        await settle();
        expect(calls.map(({ request }) => textOf(request))).toEqual(['xab', 'xyab']);
        expect(await result).toMatchObject({ status: 'acknowledged', acknowledgment: { stamp: pinned.stamp } });
        unmount();
    });

    it('keeps a checkpoint pending when the autosave in flight carries an older stamp', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        type('y');
        const pinned = handle().getSnapshot();
        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        expect(calls).toHaveLength(1);
        calls[0]?.answer();
        await settle();
        expect(await peek(result)).toBe('pending');
        expect(calls).toHaveLength(2);
        expect(textOf(calls[1]?.request as SaveRequest)).toBe('xyab');
        calls[1]?.answer();
        expect(await result).toMatchObject({ status: 'acknowledged', acknowledgment: { stamp: pinned.stamp } });
        unmount();
    });

    it('joins the autosave in flight when it carries the same stamp', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        expect(await peek(result)).toBe('pending');
        calls[0]?.answer();
        expect(await result).toMatchObject({
            status: 'acknowledged',
            acknowledgment: { stamp: calls[0]?.request.stamp },
        });
        await settle();
        expect(calls).toHaveLength(1);
        unmount();
    });

    it('writes pinned checkpoints in call order before the trailing autosave', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, advance, unmount } = mount({ service });
        const pinned = [];
        const results = [];
        type('x');
        pinned.push(handle().getSnapshot());
        results.push(handle().requestCommit({ reason: 'manual' }));
        await flush();
        type('y');
        pinned.push(handle().getSnapshot());
        results.push(handle().requestCommit({ reason: 'manual' }));
        await flush();
        type('z');
        advance(10_000);
        for (let call = 0; call < 3; call += 1) {
            calls[call]?.answer();
            await settle();
        }
        expect(calls.map(({ request }) => textOf(request))).toEqual(['xab', 'xyab', 'xyzab']);
        expect(calls.slice(0, 2).map(({ request }) => [request.stamp, request.document])).toEqual(
            pinned.map(({ stamp, document }) => [stamp, document]),
        );
        const settled = await Promise.all(results);
        expect(settled.map(({ status }) => status)).toEqual(['acknowledged', 'acknowledged']);
        unmount();
    });

    it('resolves acknowledged with the acknowledgment of the pinned stamp after later edits', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, unmount } = mount({ service });
        type('x');
        const pinned = handle().getSnapshot();
        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        type('y');
        calls[0]?.answer();
        expect(await result).toEqual({
            status: 'acknowledged',
            acknowledgment: { operationId: calls[0]?.request.operationId, stamp: pinned.stamp, revision: 'revision-1' },
        });
        expect(handle().getSaveStatus()).toMatchObject({ latestSequence: 2, acknowledgedSequence: 1 });
        unmount();
    });

    it('answers an acknowledged sequence with no write, right after load and after one accepted save', async () => {
        const existing = serviceOf();
        const atLoad = mount({ service: existing.service, revision: 'revision-7' });
        const atLoadResult = atLoad.handle().requestCommit({ reason: 'manual' });
        await atLoad.flush();
        expect(await atLoadResult).toEqual({
            status: 'acknowledged',
            acknowledgment: { operationId: null, stamp: atLoad.handle().getSnapshot().stamp, revision: 'revision-7' },
        });
        expect(existing.service.save).not.toHaveBeenCalled();
        atLoad.unmount();
        const { service, calls } = serviceOf();
        const { handle, flush, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        await settle();
        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        expect(await result).toEqual({
            status: 'acknowledged',
            acknowledgment: {
                operationId: calls[0]?.request.operationId,
                stamp: handle().getSnapshot().stamp,
                revision: 'revision-1',
            },
        });
        expect(calls).toHaveLength(1);
        unmount();
    });

    it('writes the new stamp after one accepted save and a later keystroke, without answering early', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        calls[0]?.answer();
        await settle();
        type('y');
        const pinned = handle().getSnapshot();
        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        expect(await peek(result)).toBe('pending');
        expect(calls).toHaveLength(2);
        expect(calls[1]?.request).toMatchObject({ stamp: pinned.stamp });
        expect(textOf(calls[1]?.request as SaveRequest)).toBe('xyab');
        calls[1]?.answer();
        expect(await result).toMatchObject({ status: 'acknowledged', acknowledgment: { stamp: pinned.stamp } });
        unmount();
    });

    it('shares one write and one result between two calls that pin the same stamp', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, unmount } = mount({ service });
        type('x');
        const first = handle().requestCommit({ reason: 'manual' });
        const second = handle().requestCommit({ reason: 'submit' });
        await flush();
        calls[0]?.answer();
        const results = await Promise.all([first, second]);
        expect(results[1]).toEqual(results[0]);
        expect(results[0]).toMatchObject({ status: 'acknowledged' });
        expect(service.save).toHaveBeenCalledTimes(1);
        unmount();
    });

    it('captures the snapshot once a composition ends within timeoutMs', async () => {
        const { service, calls } = serviceOf();
        const { handle, advance, unmount } = mount({ service });
        compose(handle(), 'c');
        const result = handle().requestCommit({ reason: 'manual', composition: 'wait', timeoutMs: 1000 });
        advance(500);
        expect(await peek(result)).toBe('pending');
        expect(calls).toHaveLength(0);

        await endComposition(handle());
        await settle();
        expect(calls.map(({ request }) => textOf(request))).toEqual(['cab']);
        expect(await result).toMatchObject({
            status: 'acknowledged',
            acknowledgment: { stamp: handle().getSnapshot().stamp },
        });
        unmount();
    });

    it('resolves failed with timeout and not-sent when the composition outlasts timeoutMs', async () => {
        const { service } = serviceOf();
        const { handle, advance, unmount } = mount({ service });
        compose(handle(), 'c');
        const result = handle().requestCommit({ reason: 'manual', composition: 'wait', timeoutMs: 1000 });
        advance(999);
        expect(await peek(result)).toBe('pending');
        advance(1);
        expect(await peek(result)).toEqual({ status: 'failed', code: 'timeout', outcome: 'not-sent' });
        expect(service.save).not.toHaveBeenCalled();
        // A call that timed out must not capture when the composition ends later.
        await endComposition(handle());
        await settle();
        expect(service.save).not.toHaveBeenCalled();
        unmount();
    });

    it('blocks with composition-active during a composition when asked to reject', async () => {
        const { service } = serviceOf();
        const { handle, unmount } = mount({ service });
        compose(handle(), 'c');
        expect(await peek(handle().requestCommit({ reason: 'manual', composition: 'reject' }))).toEqual({
            status: 'blocked',
            code: 'composition-active',
        });
        await endComposition(handle());
        await settle();
        expect(service.save).not.toHaveBeenCalled();
        unmount();
    });

    it.each([
        ['conflict', { status: 'conflict', currentRevision: 'revision-9' }, { status: 'blocked', code: 'conflict' }],
        [
            'forbidden',
            { status: 'rejected', code: 'forbidden', diagnostics: [] },
            { status: 'blocked', code: 'forbidden' },
        ],
        [
            'invalid',
            { status: 'rejected', code: 'invalid', diagnostics: [] },
            { status: 'failed', code: 'invalid', outcome: 'rejected' },
        ],
        [
            'incompatible-writer',
            { status: 'rejected', code: 'incompatible-writer', diagnostics: [] },
            { status: 'failed', code: 'incompatible-writer', outcome: 'rejected' },
        ],
    ] as const)(
        'resolves the checkpoint of a %s answer with its matching result',
        async (_name, response, expected) => {
            const { service, calls } = serviceOf(true);
            const { handle, flush, type, unmount } = mount({ service });
            type('x');
            const result = handle().requestCommit({ reason: 'manual' });
            await flush();
            calls[0]?.answer(response);
            expect(await result).toEqual(expected);
            // A settled checkpoint must leave the queue, or it would be written again.
            await settle();
            expect(calls).toHaveLength(1);
            unmount();
        },
    );

    it('resolves every pinned checkpoint blocked with conflict on one conflict answer', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, unmount } = mount({ service });
        type('x');
        const first = handle().requestCommit({ reason: 'manual' });
        await flush();
        type('y');
        const second = handle().requestCommit({ reason: 'manual' });
        await flush();
        calls[0]?.answer({ status: 'conflict', currentRevision: 'revision-9' });
        await settle();
        expect(await peek(first)).toEqual({ status: 'blocked', code: 'conflict' });
        expect(await peek(second)).toEqual({ status: 'blocked', code: 'conflict' });
        expect(calls).toHaveLength(1);
        unmount();
    });

    it('writes the second pinned checkpoint after the first is rejected', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, unmount } = mount({ service });
        type('x');
        const first = handle().requestCommit({ reason: 'manual' });
        await flush();
        type('y');
        const pinned = handle().getSnapshot();
        const second = handle().requestCommit({ reason: 'manual' });
        await flush();
        calls[0]?.answer({ status: 'rejected', code: 'invalid', diagnostics: [] });
        await settle();
        expect(await peek(first)).toEqual({ status: 'failed', code: 'invalid', outcome: 'rejected' });
        expect(calls).toHaveLength(2);
        expect(calls[1]?.request).toMatchObject({ stamp: pinned.stamp, document: pinned.document });
        expect(textOf(calls[1]?.request as SaveRequest)).toBe('xyab');
        calls[1]?.answer();
        expect(await second).toMatchObject({ status: 'acknowledged', acknowledgment: { stamp: pinned.stamp } });
        unmount();
    });

    it('resolves failed with timeout and unknown at timeoutMs and keeps replaying', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, advance, unmount } = mount({ service });
        type('x');
        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        advance(29_999);
        expect(await peek(result)).toBe('pending');
        advance(1);
        expect(await peek(result)).toEqual({ status: 'failed', code: 'timeout', outcome: 'unknown' });
        expect(handle().getSaveStatus().state).toBe('uncertain');
        advance(1200);
        const [first, replayed] = calls.map(({ request }) => request);
        expect(calls).toHaveLength(2);
        expect(replayed).toEqual(first);
        unmount();
    });

    it('waits for a composition up to the persistenceOptions timeoutMs', async () => {
        const { service } = serviceOf();
        const { handle, advance, unmount } = mount({ service, persistenceOptions: { timeoutMs: 5000 } });
        compose(handle(), 'c');
        const result = handle().requestCommit({ reason: 'manual' });
        advance(4999);
        expect(await peek(result)).toBe('pending');
        advance(1);
        expect(await peek(result)).toEqual({ status: 'failed', code: 'timeout', outcome: 'not-sent' });
        unmount();
    });

    it('times the write out at the persistenceOptions timeoutMs', async () => {
        const { service } = serviceOf(true);
        const { handle, flush, type, advance, unmount } = mount({
            service,
            persistenceOptions: { timeoutMs: 5000 },
        });
        type('x');
        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        advance(4999);
        expect(await peek(result)).toBe('pending');
        advance(1);
        expect(await peek(result)).toEqual({ status: 'failed', code: 'timeout', outcome: 'unknown' });
        expect(handle().getSaveStatus().state).toBe('uncertain');
        unmount();
    });

    it('blocks with not-ready while mounting and after dispose, with no write', async () => {
        const { service } = serviceOf();
        const { handle, unmount } = mount({ service, mounting: true });
        expect(handle().getSummary().phase).toBe('mounting');
        expect(await peek(handle().requestCommit({ reason: 'manual' }))).toEqual({
            status: 'blocked',
            code: 'not-ready',
        });
        act(() => {
            vi.advanceTimersToNextFrame();
        });
        act(() => typeText(handle(), 'x'));
        act(() => handle().dispose());
        expect(await peek(handle().requestCommit({ reason: 'manual' }))).toEqual({
            status: 'blocked',
            code: 'not-ready',
        });
        await settle();
        expect(service.save).not.toHaveBeenCalled();
        unmount();
    });

    it('resolves failed with transport and unknown when the write fails online, and keeps replaying', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, advance, unmount } = mount({ service });
        type('x');
        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        calls[0]?.fail();
        expect(await peek(result)).toEqual({ status: 'failed', code: 'transport', outcome: 'unknown' });
        advance(1200);
        const [first, replayed] = calls.map(({ request }) => request);
        expect(calls).toHaveLength(2);
        expect(replayed).toEqual(first);
        unmount();
    });

    it('holds a checkpoint behind the backoff, replays the failed write once, then writes the checkpoint', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        calls[0]?.fail();
        await settle();
        type('y');
        const pinned = handle().getSnapshot();
        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        expect(calls).toHaveLength(1);
        advance(1200);
        await settle();
        expect(calls).toHaveLength(2);
        const [first, replayed] = calls.map(({ request }) => request);
        expect(replayed).toEqual(first);
        calls[1]?.answer();
        await settle();
        expect(calls).toHaveLength(3);
        expect(calls[2]?.request).toMatchObject({ stamp: pinned.stamp });
        expect(textOf(calls[2]?.request as SaveRequest)).toBe('xyab');
        calls[2]?.answer();
        expect(await result).toMatchObject({ status: 'acknowledged', acknowledgment: { stamp: pinned.stamp } });
        unmount();
    });

    it('resolves failed with transport and not-sent offline, then writes the pinned snapshot online', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, unmount } = mount({ service });
        const onLine = vi.spyOn(navigator, 'onLine', 'get');
        onLine.mockReturnValue(false);
        type('x');
        const pinned = handle().getSnapshot();
        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        expect(await peek(result)).toEqual({ status: 'failed', code: 'transport', outcome: 'not-sent' });
        expect(calls).toHaveLength(0);
        type('y');

        onLine.mockReturnValue(true);
        act(() => {
            window.dispatchEvent(new Event('online'));
        });
        onLine.mockRestore();
        expect(calls.map(({ request }) => [request.stamp, request.document])).toEqual([
            [pinned.stamp, pinned.document],
        ]);
        unmount();
    });

    it('answers an offline requestCommit at once on a checkpoint an earlier call timed out on', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        type('y');
        const first = handle().requestCommit({ reason: 'manual', timeoutMs: 1000 });
        await flush();
        advance(1000);
        expect(await first).toEqual({ status: 'failed', code: 'timeout', outcome: 'not-sent' });
        const onLine = vi.spyOn(navigator, 'onLine', 'get');
        onLine.mockReturnValue(false);
        calls[0]?.fail();
        await settle();

        const second = handle().requestCommit({ reason: 'manual' });
        await flush();
        const outcome = await peek(second);
        onLine.mockRestore();
        expect(outcome).toEqual({ status: 'failed', code: 'transport', outcome: 'not-sent' });
        expect(calls).toHaveLength(1);
        unmount();
    });

    it('resolves unknown offline for the stamp of a sent write left unresolved', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        const onLine = vi.spyOn(navigator, 'onLine', 'get');
        onLine.mockReturnValue(false);
        calls[0]?.fail();
        await settle();
        expect(handle().getSaveStatus().state).toBe('offline');

        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        const outcome = await peek(result);
        onLine.mockRestore();
        expect(outcome).toEqual({ status: 'failed', code: 'transport', outcome: 'unknown' });
        expect(calls).toHaveLength(1);
        unmount();
    });

    it('resolves not-sent offline for a newer stamp than the write left unresolved', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, flush, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        const onLine = vi.spyOn(navigator, 'onLine', 'get');
        onLine.mockReturnValue(false);
        calls[0]?.fail();
        await settle();
        type('y');
        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        const outcome = await peek(result);
        onLine.mockRestore();
        expect(outcome).toEqual({ status: 'failed', code: 'transport', outcome: 'not-sent' });
        expect(calls).toHaveLength(1);
        unmount();
    });

    it('resolves with the write timeout when it fires before the call timeoutMs', async () => {
        const { service } = serviceOf(true);
        const { handle, flush, type, advance, unmount } = mount({ service });
        type('x');
        const result = handle().requestCommit({ reason: 'manual', timeoutMs: 60_000 });
        await flush();
        advance(30_000);
        expect(await peek(result)).toEqual({ status: 'failed', code: 'timeout', outcome: 'unknown' });
        unmount();
    });

    it.each(['submit', 'navigate'] as const)(
        'captures, writes and resolves the same with reason %s as with manual',
        async (reason) => {
            const trace = async (given: 'submit' | 'navigate' | 'manual') => {
                const { service, calls } = serviceOf();
                const { handle, flush, type, unmount } = mount({ service });
                type('x');
                const pending = handle().requestCommit({ reason: given });
                await flush();
                const result = await pending;
                unmount();
                return { requests: calls.map(({ request }) => request), result };
            };
            const manual = await trace('manual');
            expect(manual.requests).toHaveLength(1);
            expect(await trace(reason)).toEqual(manual);
        },
    );

    it.each(['submit', 'navigate'] as const)(
        'waits through a composition and pins a same-task keystroke the same with reason %s as with manual',
        async (reason) => {
            const trace = async (given: 'submit' | 'navigate' | 'manual') => {
                const { service, calls } = serviceOf();
                const { handle, advance, unmount } = mount({ service });
                compose(handle(), 'c');
                let pending: Promise<CommitResult> | undefined;
                act(() => {
                    queueMicrotask(() => typeText(handle(), 'x'));
                    pending = handle().requestCommit({ reason: given });
                });
                advance(100);
                const during = await peek(pending as Promise<CommitResult>);
                await endComposition(handle());
                await settle();
                const result = await pending;
                unmount();
                return { during, requests: calls.map(({ request }) => request), result };
            };
            const manual = await trace('manual');
            expect(manual.during).toBe('pending');
            expect(manual.requests).toHaveLength(1);
            expect(manual.result).toMatchObject({ status: 'acknowledged' });
            expect(await trace(reason)).toEqual(manual);
        },
    );

    it.each(['ends', 'outlasts the timeout'])(
        'waits for a composition that %s with the default options',
        async (ending) => {
            const { service, calls } = serviceOf();
            const { handle, advance, unmount } = mount({ service });
            compose(handle(), 'c');
            const result = handle().requestCommit({ reason: 'manual' });
            advance(29_000);
            expect(await peek(result)).toBe('pending');
            if (ending === 'ends') {
                await endComposition(handle());
                await settle();
                expect(calls.map(({ request }) => textOf(request))).toEqual(['cab']);
                expect(await result).toMatchObject({ status: 'acknowledged' });
            } else {
                advance(999);
                expect(await peek(result)).toBe('pending');
                advance(1);
                expect(await peek(result)).toEqual({ status: 'failed', code: 'timeout', outcome: 'not-sent' });
                expect(calls).toHaveLength(0);
                // A call that timed out must not capture when the composition ends later.
                await endComposition(handle());
                await settle();
                expect(calls).toHaveLength(0);
            }
            unmount();
        },
    );
});

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
        const Bomb = ({ armed }: { readonly armed: boolean }) => {
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

describe('operation metrics', () => {
    it('emits one metric per mount, commit, paste and save round trip, with every field set', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, metrics, type, advance, unmount } = mount({ service, beforeReady: 25 });
        const common = {
            session: handle().getSummary().session,
            packageVersion: PACKAGE_VERSION,
            model: { id: 'test.persistence', version: 1 },
            capabilityIds: model.capabilities.map(({ id }) => id),
            normalizationTransactions: 0,
        };
        type('x');
        act(() => {
            const view = runtimeOf(handle())?.view;
            view?.dispatch(view.state.tr.insertText('p').setMeta('uiEvent', 'paste'));
            view?.dispatch(view.state.tr.insertText('d').setMeta('uiEvent', 'drop'));
        });
        advance(500);
        advance(40);
        calls[0]?.fail();
        await settle();
        advance(1200);
        const [, replay] = calls;
        if (replay === undefined) {
            throw new Error('no replay');
        }
        const replayedFor = Date.now() - replay.at;
        replay.answer();
        await settle();

        expect(metrics).toEqual([
            { ...common, kind: 'mount', durationMs: 16, failureCode: null },
            { ...common, kind: 'commit', durationMs: 0, failureCode: null },
            { ...common, kind: 'paste', durationMs: 0, failureCode: null },
            // A drop is measured as a paste.
            { ...common, kind: 'paste', durationMs: 0, failureCode: null },
            { ...common, kind: 'save', durationMs: 40, failureCode: 'transport' },
            { ...common, kind: 'save', durationMs: replayedFor, failureCode: null },
        ]);
        expect(replayedFor).toBeGreaterThan(0);
        unmount();
    });
});

describe('save metric failure codes', () => {
    it.each([
        ['conflict', { status: 'conflict', currentRevision: 'revision-9' } as const],
        ['forbidden', { status: 'rejected', code: 'forbidden', diagnostics: [] } as const],
    ])('reports failureCode %s on the save metric of that answer', async (failureCode, response) => {
        const { service, calls } = serviceOf(true);
        const { metrics, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        calls[0]?.answer(response);
        await settle();
        expect(metrics.filter(({ kind }) => kind === 'save').map((metric) => metric.failureCode)).toEqual([
            failureCode,
        ]);
        unmount();
    });
});

describe('the persistence conformance kit', () => {
    describe('runs against the reference fake', () => {
        runPersistenceConformance(() => ({
            ...createFakeServer(),
            rejectedWriter: { ...WRITER, capabilities: [] },
            writer: WRITER,
            document: loaded(null, para('ab')).document,
        }));
    });
});
