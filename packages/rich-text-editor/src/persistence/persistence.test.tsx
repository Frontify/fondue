/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { act, fireEvent, render, screen } from '@testing-library/react';
import fc from 'fast-check';
import { createRef } from 'react';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import { createPortalStore, type PortalEntry } from '#/bridge/portals';
import { fixtureChromeViews } from '#/features/__fixtures__/chrome/view';
import { core } from '#/features/core/feature';
import { bold } from '#/features/marks-bold/feature';
import {
    type CommandResult,
    type CommitResult,
    defineEditor,
    type EditorHandle,
    type OperationMetric,
    type PersistenceOptions,
    type PersistenceService,
    type RecoveryService,
    type ReplaceDocumentRequest,
    type ReplaceResult,
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
    type RichTextDocument,
    setBlock,
} from '#/model';
import { encodeTree } from '#/model/encode';
import { type RuntimeHandle, runtimeOf } from '#/runtime/runtime';
import { SETTLE_MS } from '#/runtime/settle';
import {
    createFakePersistenceService,
    createTestEnvironment,
    runPersistenceConformance,
    setSelection,
    type TestEnvironment,
    typeText,
} from '#/testing';
import { createFakeServer } from '#/testing/persistence';
import { STORAGE, stubStorage } from '#/testing/storage';

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
const packageFile = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'package.json');
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

/** One `save` call: what it got, when on the environment clock, and how the test answers it. */
interface Call {
    readonly request: SaveRequest;
    readonly context: ServiceContext;
    readonly at: number;
    /** Resolves with `response`, or with the reference fake's answer when none is given. */
    answer(response?: SaveResponse): void;
    fail(): void;
}

/** A service in front of the reference fake that records each call; `held` saves wait until the test answers them. */
const serviceOf = (environment: TestEnvironment, held = false) => {
    const server = createFakePersistenceService();
    const calls: Call[] = [];
    const service = {
        save: vi.fn(
            (request: SaveRequest, context: ServiceContext) =>
                new Promise<SaveResponse>((resolve, reject) => {
                    const call: Call = {
                        request,
                        context,
                        at: environment.clock.now(),
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
        await new Promise((resolve) => setTimeout(resolve, 0));
    });
/** The promise's value, or `pending` while it has none once the pending continuations ran. */
const peek = async <T,>(promise: Promise<T>) => {
    await settle();
    // An already settled promise wins the race over the second entry.
    return Promise.race([promise, Promise.resolve('pending' as const)]);
};

interface MountOptions {
    readonly service?: PersistenceService;
    readonly recovery?: RecoveryService;
    readonly revision?: string | null;
    readonly persistenceOptions?: PersistenceOptions;
    readonly environment?: TestEnvironment;
    readonly blocks?: readonly JsonValue[];
    /** Time that passes between the mount and its first frame. */
    readonly beforeReady?: number;
    /** Leaves the editor `mounting`, before its first frame. */
    readonly mounting?: boolean;
}

/** Mounts an editor on a test environment, then runs its first frame, so it is `ready`. */
const mount = (options: MountOptions = {}) => {
    const environment = options.environment ?? createTestEnvironment({ seed: 1 });
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
    const element = (readOnly: boolean, service = options.service) => {
        const managed: Record<string, unknown> = { ...props };
        if (service !== undefined) {
            managed.services = { persistence: service, recovery: options.recovery };
        }
        return (
            <RichTextEditor
                aria-label="Notes"
                definition={definition}
                defaultValue={loaded(revision, ...blocks)}
                environment={environment}
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
            environment.advance(options.beforeReady ?? 0);
            environment.flushFrames();
        });
    }
    return {
        ...view,
        environment,
        handle,
        diagnostics,
        metrics,
        rerender: (readOnly: boolean, service?: PersistenceService) => view.rerender(element(readOnly, service)),
        type: (text: string) => act(() => typeText(handle(), text)),
        advance: (ms: number) => act(() => environment.advance(ms)),
        /** Runs the environment microtasks, in which `requestCommit` captures. */
        flush: () => act(() => environment.flushMicrotasks()),
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
/** Ends the composition, then runs the environment microtask and the timer after which input has settled. */
const endComposition = async (handle: EditorHandle<object>, environment: TestEnvironment) => {
    act(() => {
        viewOf(handle).dom.dispatchEvent(new CompositionEvent('compositionend'));
    });
    await act(() => environment.flushMicrotasks());
    act(() => environment.advance(SETTLE_MS));
};

// SPEC-rich-text-persistence/AC-044: every browser storage API fails while this suite runs.
let storage: ReturnType<typeof stubStorage>;
beforeAll(() => {
    storage = stubStorage();
});
afterAll(() => {
    const { accessed } = storage;
    storage.restore();
    expect(accessed).toEqual([]);
});

describe('save state at load', () => {
    it('SPEC-rich-text-persistence/AC-044 runs the persistence suite with every browser storage API failing', () => {
        for (const name of STORAGE) {
            expect(() => {
                Reflect.get(Reflect.get(globalThis, name) as object, 'open');
            }).toThrow(name);
        }
        // The probe above is the only access this suite may make.
        expect(storage.accessed.splice(0)).toEqual([...STORAGE]);
    });

    it('SPEC-rich-text-persistence/AC-001 reports unmanaged without services.persistence, after mount and after typing', () => {
        const { handle, type, unmount } = mount();
        expect(handle().getSaveStatus().state).toBe('unmanaged');
        type('x');
        expect(handle().getSaveStatus()).toMatchObject({ state: 'unmanaged', latestSequence: 1 });
        unmount();
    });

    it('SPEC-rich-text-persistence/AC-002 resolves requestCommit blocked with unmanaged without services.persistence', async () => {
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
    ])(
        'SPEC-rich-text-persistence/AC-003 sends no write for %s over 60 seconds after load',
        async (_name, revision) => {
            const environment = createTestEnvironment({ seed: 1 });
            const { service } = serviceOf(environment);
            const { advance, unmount } = mount({ service, revision, environment });
            advance(60_000);
            await settle();
            expect(service.save).not.toHaveBeenCalled();
            unmount();
        },
    );

    it('SPEC-rich-text-persistence/AC-004 starts a new record at latestSequence 0 and acknowledgedSequence -1', () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { handle, unmount } = mount({ service: serviceOf(environment).service, environment });
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

    it('SPEC-rich-text-persistence/AC-005 starts an existing record at latestSequence 0 and acknowledgedSequence 0', () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { handle, unmount } = mount({
            service: serviceOf(environment).service,
            environment,
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
    it('SPEC-rich-text-persistence/AC-006 keeps at most one write in flight across random edits, requestCommit calls and delayed responses', async () => {
        const step = fc.oneof(
            fc.constant({ kind: 'type' as const }),
            fc.record({ kind: fc.constant('advance' as const), ms: fc.integer({ min: 0, max: 40_000 }) }),
            fc.record({ kind: fc.constant('answer' as const), saved: fc.boolean() }),
            fc.constant({ kind: 'commit' as const }),
        );
        await fc.assert(
            fc.asyncProperty(fc.array(step, { maxLength: 25 }), async (steps) => {
                const environment = createTestEnvironment({ seed: 1 });
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
                const { handle, flush, type, advance, unmount } = mount({ service, environment });
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

    it('SPEC-rich-text-persistence/AC-007 writes at 5 s and 10 s of continuous typing and 500 ms after the last character', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment);
        const { type, advance, unmount } = mount({ service, environment });
        const start = environment.clock.now();
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

    it('SPEC-rich-text-persistence/AC-008 neither serializes the document nor schedules a write for 100 selection moves', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service } = serviceOf(environment);
        const { handle, advance, unmount } = mount({ service, environment, blocks: [para('abcdef')] });
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

    it('SPEC-rich-text-persistence/AC-009 SPEC-rich-text-format/AC-041 builds each write from the ID source, the snapshot, the acknowledged revision and the writer', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment);
        const { handle, type, advance, unmount } = mount({ service, environment });
        const snapshots = [];
        type('x');
        snapshots.push(handle().getSnapshot());
        advance(500);
        await settle();
        type('y');
        snapshots.push(handle().getSnapshot());
        advance(500);
        await settle();

        expect(calls.map(({ request }) => request)).toEqual([
            {
                operationId: 'operation-1',
                stamp: snapshots[0]?.stamp,
                baseRevision: null,
                document: snapshots[0]?.document,
                writer: WRITER,
            },
            {
                operationId: 'operation-2',
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
    ])(
        'SPEC-rich-text-persistence/AC-010 ignores an acknowledgment with %s and warns persistence.ack-mismatch',
        async (_name, change) => {
            const environment = createTestEnvironment({ seed: 1 });
            const { service, calls } = serviceOf(environment, true);
            const { handle, diagnostics, type, advance, unmount } = mount({ service, environment });
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
        },
    );

    it('SPEC-rich-text-persistence/AC-011 stays dirty after an older acknowledgment and bases the next write on its revision (trace 15.7)', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, type, advance, unmount } = mount({ service, environment });
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
        'SPEC-rich-text-persistence/AC-012 SPEC-rich-text-format/AC-041 replays the same request after %s, writer included',
        async (cause) => {
            const environment = createTestEnvironment({ seed: 1 });
            const { service, calls } = serviceOf(environment, true);
            const { handle, type, advance, unmount } = mount({ service, environment });
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

    it('SPEC-rich-text-persistence/AC-013 sends only replays while uncertain, then the newer snapshot once the replay is answered', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, type, advance, unmount } = mount({ service, environment });
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

    it('SPEC-rich-text-persistence/AC-016 replays the unresolved write unchanged on the online event, ahead of newer edits', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, type, advance, unmount } = mount({ service, environment });
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

    it('SPEC-rich-text-persistence/AC-014 replays after about 1, 2, 4, 8 and 16 seconds, then reports retries-exhausted', async () => {
        const environment = createTestEnvironment({ seed: 7 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, diagnostics, type, advance, unmount } = mount({ service, environment });
        type('x');
        advance(500);
        const failedAt: number[] = [];
        for (let attempt = 0; attempt < 6; attempt += 1) {
            failedAt.push(environment.clock.now());
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

    it('SPEC-rich-text-persistence/AC-014 replays the kept operation unchanged on the next requestCommit after retries ran out', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, flush, type, advance, unmount } = mount({
            service,
            environment,
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
            acknowledgment: { operationId: 'operation-1', stamp: calls[0]?.request.stamp, revision: 'revision-1' },
        });
        expect(handle().getSaveStatus().state).toBe('clean');
        unmount();
    });

    it('SPEC-rich-text-persistence/AC-014 replays a failed checkpoint unchanged on a second requestCommit with no edit', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, flush, type, unmount } = mount({ service, environment, persistenceOptions: { maxRetries: 0 } });
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
        expect(await second).toMatchObject({ status: 'acknowledged', acknowledgment: { operationId: 'operation-1' } });
        unmount();
    });

    it('SPEC-rich-text-persistence/AC-014 replays the kept operation for a requestCommit that joins a checkpoint an earlier call timed out on', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, flush, type, advance, unmount } = mount({
            service,
            environment,
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
        expect(await second).toMatchObject({ status: 'acknowledged', acknowledgment: { operationId: 'operation-2' } });
        unmount();
    });

    it('SPEC-rich-text-persistence/AC-014 gives equal seeds equal backoff delays and different seeds different ones', async () => {
        const delaysFor = async (seed: number) => {
            const environment = createTestEnvironment({ seed });
            const { service, calls } = serviceOf(environment, true);
            const { type, advance, unmount } = mount({ service, environment });
            type('x');
            advance(500);
            const failedAt: number[] = [];
            for (let attempt = 0; attempt < 5; attempt += 1) {
                failedAt.push(environment.clock.now());
                calls.at(-1)?.fail();
                await settle();
                advance(20_000);
            }
            unmount();
            return calls.slice(1).map(({ at }, index) => at - (failedAt[index] ?? 0));
        };
        const seven = await delaysFor(7);
        expect(await delaysFor(7)).toEqual(seven);
        expect(await delaysFor(8)).not.toEqual(seven);
        expect(seven.some((delay, index) => delay !== 1000 * 2 ** index)).toBe(true);
    });

    it('SPEC-rich-text-persistence/AC-069 reports the operation ID in flight, and null before and after', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, type, advance, unmount } = mount({ service, environment });
        type('x');
        expect(handle().getSaveStatus().inFlightOperationId).toBeNull();
        advance(500);
        expect(handle().getSaveStatus()).toMatchObject({ state: 'saving', inFlightOperationId: 'operation-1' });
        calls[0]?.answer();
        await settle();
        expect(handle().getSaveStatus()).toMatchObject({ state: 'clean', inFlightOperationId: null });
        unmount();
    });

    it('SPEC-rich-text-persistence/AC-069 reports no operation ID in flight during the backoff of an uncertain write', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, type, advance, unmount } = mount({ service, environment });
        type('x');
        advance(500);
        calls[0]?.fail();
        await settle();
        expect(handle().getSaveStatus()).toMatchObject({ state: 'uncertain', inFlightOperationId: null });
        advance(1200);
        expect(handle().getSaveStatus()).toMatchObject({ state: 'saving', inFlightOperationId: 'operation-1' });
        unmount();
    });
});

describe('persistence options', () => {
    it('SPEC-rich-text-persistence/AC-007 SPEC-rich-text-persistence/AC-014 follows delayMs, maxWaitMs, timeoutMs and maxRetries', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, diagnostics, type, advance, unmount } = mount({
            service,
            environment,
            persistenceOptions: { delayMs: 100, maxWaitMs: 300, timeoutMs: 2000, maxRetries: 2 },
        });
        const start = environment.clock.now();
        type('x');
        advance(99);
        expect(calls).toHaveLength(0);
        advance(1);
        expect(calls.map(({ at }) => at - start)).toEqual([100]);
        calls[0]?.answer();
        await settle();

        // Typing every 50 ms keeps resetting the delay, so only the longest wait writes.
        const typing = environment.clock.now();
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

    it('SPEC-rich-text-persistence/AC-007 writes nothing on its own with autosave off', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service } = serviceOf(environment);
        const { handle, type, advance, unmount } = mount({
            service,
            environment,
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
        const environment = createTestEnvironment({ seed: 1 });
        const services = serviceOf(environment, true);
        const mounted = mount({ service: services.service, environment, persistenceOptions: options });
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

    it('SPEC-rich-text-persistence/AC-017 pauses writes on a conflict and keeps local content editable', async () => {
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

    it('SPEC-rich-text-persistence/AC-018 never retries against the server revision on its own', async () => {
        const { calls, type, advance, unmount } = await conflicted();
        type('y');
        advance(60_000);
        await settle();
        expect(calls.filter(({ request }) => request.baseRevision === 'revision-1')).toEqual([]);
        expect(calls).toHaveLength(1);
        unmount();
    });

    it('SPEC-rich-text-persistence/AC-073 blocks requestCommit with conflict at once and sends no write', async () => {
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

    it('SPEC-rich-text-persistence/AC-058 hands one read of the server copy and the local snapshot to onConflict', async () => {
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

    it('SPEC-rich-text-persistence/AC-058 hands null to onConflict when the read fails', async () => {
        const onConflict = vi.fn();
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        service.read.mockRejectedValueOnce(new Error('The read failed.'));
        const { handle, type, advance, unmount } = mount({
            service,
            environment,
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
        'SPEC-rich-text-persistence/AC-019 enters error with the service diagnostics on %s, with no retry',
        async (code) => {
            const environment = createTestEnvironment({ seed: 1 });
            const { service, calls } = serviceOf(environment, true);
            const { handle, diagnostics, type, advance, unmount } = mount({ service, environment });
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
    it('SPEC-rich-text-persistence/AC-040 aborts the signal of the write in flight on dispose', () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, type, advance, unmount } = mount({ service, environment });
        type('x');
        advance(500);
        act(() => handle().dispose());
        expect(calls[0]?.context.signal.aborted).toBe(true);
        expect(handle().getSaveStatus().inFlightOperationId).toBeNull();
        unmount();
    });

    it('SPEC-rich-text-persistence/AC-040 resolves a pending requestCommit failed with disposed on dispose', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, flush, type, unmount } = mount({ service, environment });
        type('x');
        const result = handle().requestCommit({ reason: 'navigate' });
        await flush();
        act(() => handle().dispose());
        expect(calls[0]?.context.signal.aborted).toBe(true);
        expect(await peek(result)).toEqual({ status: 'failed', code: 'disposed', outcome: 'unknown' });
        unmount();
    });

    it('SPEC-rich-text-persistence/AC-040 resolves a requestCommit that waits for a composition failed with disposed on dispose', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service } = serviceOf(environment);
        const { handle, unmount } = mount({ service, environment });
        compose(handle(), 'c');
        const result = handle().requestCommit({ reason: 'navigate' });
        expect(await peek(result)).toBe('pending');
        act(() => handle().dispose());
        expect(await peek(result)).toEqual({ status: 'failed', code: 'disposed', outcome: 'unknown' });
        expect(service.save).not.toHaveBeenCalled();
        unmount();
    });

    it('SPEC-rich-text-persistence/AC-040 answers a requestCommit from a disposed-dirty listener disposed at once', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service } = serviceOf(environment);
        const { handle, type, unmount } = mount({ service, environment });
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

    it('SPEC-rich-text-persistence/AC-041 warns persistence.disposed-dirty on dispose with unsaved changes and starts no write', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service } = serviceOf(environment);
        const { handle, diagnostics, type, advance, unmount } = mount({ service, environment });
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
    it('SPEC-rich-text-persistence/AC-020 SPEC-rich-text-format/AC-041 pins the snapshot with the keystroke typed in the same task', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment);
        const { handle, flush, unmount } = mount({ service, environment });
        let result: Promise<CommitResult> | undefined;
        act(() => {
            // ProseMirror reads a typed character in a microtask queued at the DOM mutation, before the call.
            environment.scheduler.microtask(() => typeText(handle(), 'x'));
            result = handle().requestCommit({ reason: 'submit' });
        });
        await flush();
        await settle();
        const snapshot = handle().getSnapshot();
        expect(calls.map(({ request }) => request)).toEqual([
            {
                operationId: 'operation-1',
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

    it('SPEC-rich-text-persistence/AC-021 writes the pinned payload unchanged while later edits come due for autosave', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, flush, type, advance, unmount } = mount({ service, environment });
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

    it('SPEC-rich-text-persistence/AC-021 keeps a checkpoint pending when the autosave in flight carries an older stamp', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, flush, type, advance, unmount } = mount({ service, environment });
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

    it('SPEC-rich-text-persistence/AC-021 joins the autosave in flight when it carries the same stamp', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, flush, type, advance, unmount } = mount({ service, environment });
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

    it('SPEC-rich-text-persistence/AC-022 writes pinned checkpoints in call order before the trailing autosave', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, flush, type, advance, unmount } = mount({ service, environment });
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

    it('SPEC-rich-text-persistence/AC-023 resolves acknowledged with the acknowledgment of the pinned stamp after later edits', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, flush, type, unmount } = mount({ service, environment });
        type('x');
        const pinned = handle().getSnapshot();
        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        type('y');
        calls[0]?.answer();
        expect(await result).toEqual({
            status: 'acknowledged',
            acknowledgment: { operationId: 'operation-1', stamp: pinned.stamp, revision: 'revision-1' },
        });
        expect(handle().getSaveStatus()).toMatchObject({ latestSequence: 2, acknowledgedSequence: 1 });
        unmount();
    });

    it('SPEC-rich-text-persistence/AC-024 answers an acknowledged sequence with no write, right after load and after one accepted save', async () => {
        const loadedEnvironment = createTestEnvironment({ seed: 1 });
        const existing = serviceOf(loadedEnvironment);
        const atLoad = mount({ service: existing.service, environment: loadedEnvironment, revision: 'revision-7' });
        const atLoadResult = atLoad.handle().requestCommit({ reason: 'manual' });
        await atLoad.flush();
        expect(await atLoadResult).toEqual({
            status: 'acknowledged',
            acknowledgment: { operationId: null, stamp: atLoad.handle().getSnapshot().stamp, revision: 'revision-7' },
        });
        expect(existing.service.save).not.toHaveBeenCalled();
        atLoad.unmount();

        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment);
        const { handle, flush, type, advance, unmount } = mount({ service, environment });
        type('x');
        advance(500);
        await settle();
        const result = handle().requestCommit({ reason: 'manual' });
        await flush();
        expect(await result).toEqual({
            status: 'acknowledged',
            acknowledgment: { operationId: 'operation-1', stamp: handle().getSnapshot().stamp, revision: 'revision-1' },
        });
        expect(calls).toHaveLength(1);
        unmount();
    });

    it('SPEC-rich-text-persistence/AC-024 writes the new stamp after one accepted save and a later keystroke, without answering early', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, flush, type, advance, unmount } = mount({ service, environment });
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

    it('SPEC-rich-text-persistence/AC-025 shares one write and one result between two calls that pin the same stamp', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, flush, type, unmount } = mount({ service, environment });
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

    it('SPEC-rich-text-persistence/AC-026 captures the snapshot once a composition ends within timeoutMs', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment);
        const { handle, advance, unmount } = mount({ service, environment });
        compose(handle(), 'c');
        const result = handle().requestCommit({ reason: 'manual', composition: 'wait', timeoutMs: 1000 });
        advance(500);
        expect(await peek(result)).toBe('pending');
        expect(calls).toHaveLength(0);

        await endComposition(handle(), environment);
        await settle();
        expect(calls.map(({ request }) => textOf(request))).toEqual(['cab']);
        expect(await result).toMatchObject({
            status: 'acknowledged',
            acknowledgment: { stamp: handle().getSnapshot().stamp },
        });
        unmount();
    });

    it('SPEC-rich-text-persistence/AC-026 resolves failed with timeout and not-sent when the composition outlasts timeoutMs', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service } = serviceOf(environment);
        const { handle, advance, unmount } = mount({ service, environment });
        compose(handle(), 'c');
        const result = handle().requestCommit({ reason: 'manual', composition: 'wait', timeoutMs: 1000 });
        advance(999);
        expect(await peek(result)).toBe('pending');
        advance(1);
        expect(await peek(result)).toEqual({ status: 'failed', code: 'timeout', outcome: 'not-sent' });
        expect(service.save).not.toHaveBeenCalled();
        // A call that timed out must not capture when the composition ends later.
        await endComposition(handle(), environment);
        await settle();
        expect(service.save).not.toHaveBeenCalled();
        unmount();
    });

    it('SPEC-rich-text-persistence/AC-028 blocks with composition-active during a composition when asked to reject', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service } = serviceOf(environment);
        const { handle, unmount } = mount({ service, environment });
        compose(handle(), 'c');
        expect(await peek(handle().requestCommit({ reason: 'manual', composition: 'reject' }))).toEqual({
            status: 'blocked',
            code: 'composition-active',
        });
        await endComposition(handle(), environment);
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
        'SPEC-rich-text-persistence/AC-029 resolves the checkpoint of a %s answer with its matching result',
        async (_name, response, expected) => {
            const environment = createTestEnvironment({ seed: 1 });
            const { service, calls } = serviceOf(environment, true);
            const { handle, flush, type, unmount } = mount({ service, environment });
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

    it('SPEC-rich-text-persistence/AC-029 resolves every pinned checkpoint blocked with conflict on one conflict answer', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, flush, type, unmount } = mount({ service, environment });
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

    it('SPEC-rich-text-persistence/AC-029 writes the second pinned checkpoint after the first is rejected', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, flush, type, unmount } = mount({ service, environment });
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

    it('SPEC-rich-text-persistence/AC-030 resolves failed with timeout and unknown at timeoutMs and keeps replaying', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, flush, type, advance, unmount } = mount({ service, environment });
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

    it('SPEC-rich-text-persistence/AC-072 waits for a composition up to the persistenceOptions timeoutMs', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service } = serviceOf(environment);
        const { handle, advance, unmount } = mount({ service, environment, persistenceOptions: { timeoutMs: 5000 } });
        compose(handle(), 'c');
        const result = handle().requestCommit({ reason: 'manual' });
        advance(4999);
        expect(await peek(result)).toBe('pending');
        advance(1);
        expect(await peek(result)).toEqual({ status: 'failed', code: 'timeout', outcome: 'not-sent' });
        unmount();
    });

    it('SPEC-rich-text-persistence/AC-030 times the write out at the persistenceOptions timeoutMs', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service } = serviceOf(environment, true);
        const { handle, flush, type, advance, unmount } = mount({
            service,
            environment,
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

    it('SPEC-rich-text-persistence/AC-064 blocks with not-ready while mounting and after dispose, with no write', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service } = serviceOf(environment);
        const { handle, unmount } = mount({ service, environment, mounting: true });
        expect(handle().getSummary().phase).toBe('mounting');
        expect(await peek(handle().requestCommit({ reason: 'manual' }))).toEqual({
            status: 'blocked',
            code: 'not-ready',
        });
        act(() => environment.flushFrames());
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

    it('SPEC-rich-text-persistence/AC-065 resolves failed with transport and unknown when the write fails online, and keeps replaying', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, flush, type, advance, unmount } = mount({ service, environment });
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

    it('SPEC-rich-text-persistence/AC-014 holds a checkpoint behind the backoff, replays the failed write once, then writes the checkpoint', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, flush, type, advance, unmount } = mount({ service, environment });
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

    it('SPEC-rich-text-persistence/AC-066 resolves failed with transport and not-sent offline, then writes the pinned snapshot online', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, flush, type, unmount } = mount({ service, environment });
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

    it('SPEC-rich-text-persistence/AC-066 answers an offline requestCommit at once on a checkpoint an earlier call timed out on', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, flush, type, advance, unmount } = mount({ service, environment });
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

    it('SPEC-rich-text-persistence/AC-066 resolves unknown offline for the stamp of a sent write left unresolved', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, flush, type, advance, unmount } = mount({ service, environment });
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

    it('SPEC-rich-text-persistence/AC-066 resolves not-sent offline for a newer stamp than the write left unresolved', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, flush, type, advance, unmount } = mount({ service, environment });
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

    it('SPEC-rich-text-persistence/AC-030 resolves with the write timeout when it fires before the call timeoutMs', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service } = serviceOf(environment, true);
        const { handle, flush, type, advance, unmount } = mount({ service, environment });
        type('x');
        const result = handle().requestCommit({ reason: 'manual', timeoutMs: 60_000 });
        await flush();
        advance(30_000);
        expect(await peek(result)).toEqual({ status: 'failed', code: 'timeout', outcome: 'unknown' });
        unmount();
    });

    it.each(['submit', 'navigate'] as const)(
        'SPEC-rich-text-persistence/AC-067 captures, writes and resolves the same with reason %s as with manual',
        async (reason) => {
            const trace = async (given: 'submit' | 'navigate' | 'manual') => {
                const environment = createTestEnvironment({ seed: 1 });
                const { service, calls } = serviceOf(environment);
                const { handle, flush, type, unmount } = mount({ service, environment });
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
        'SPEC-rich-text-persistence/AC-067 waits through a composition and pins a same-task keystroke the same with reason %s as with manual',
        async (reason) => {
            const trace = async (given: 'submit' | 'navigate' | 'manual') => {
                const environment = createTestEnvironment({ seed: 1 });
                const { service, calls } = serviceOf(environment);
                const { handle, advance, unmount } = mount({ service, environment });
                compose(handle(), 'c');
                let pending: Promise<CommitResult> | undefined;
                act(() => {
                    environment.scheduler.microtask(() => typeText(handle(), 'x'));
                    pending = handle().requestCommit({ reason: given });
                });
                advance(100);
                const during = await peek(pending as Promise<CommitResult>);
                await endComposition(handle(), environment);
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
        'SPEC-rich-text-persistence/AC-072 waits for a composition that %s with the default options',
        async (ending) => {
            const environment = createTestEnvironment({ seed: 1 });
            const { service, calls } = serviceOf(environment);
            const { handle, advance, unmount } = mount({ service, environment });
            compose(handle(), 'c');
            const result = handle().requestCommit({ reason: 'manual' });
            advance(29_000);
            expect(await peek(result)).toBe('pending');
            if (ending === 'ends') {
                await endComposition(handle(), environment);
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
                await endComposition(handle(), environment);
                await settle();
                expect(calls).toHaveLength(0);
            }
            unmount();
        },
    );
});

type Mounted = ReturnType<typeof mount>;
type ReplaceCode = Extract<ReplaceResult, { readonly status: 'rejected' }>['code'];

/** A request that replaces the editor's document by `document-2` at `revision-9`, rejecting unsaved changes unless `overrides` says otherwise. */
const replacing = (
    handle: EditorHandle<object>,
    overrides: Partial<ReplaceDocumentRequest> = {},
): ReplaceDocumentRequest => ({
    expected: handle.getSnapshot().stamp,
    next: { ...loaded('revision-9', para('next')), documentId: 'document-2' },
    unsaved: { action: 'reject' },
    selection: 'start',
    history: 'reset',
    ...overrides,
});
const textIn = (document: RichTextDocument) => JSON.stringify(document.content).match(/"text":"([^"]*)"/)?.[1];
const replace = (handle: EditorHandle<object>, overrides: Partial<ReplaceDocumentRequest> = {}) =>
    act(() => handle.replaceDocument(replacing(handle, overrides)));
/** The handle with the command IDs of any model, as the test model's are not the shipped ones. */
const untyped = (handle: EditorHandle<object>) => handle as unknown as RuntimeHandle;
/** Runs `history.undo` until it no longer applies, and returns how many steps it undid. */
const undoSteps = (handle: EditorHandle<object>) => {
    const results: CommandResult[] = [];
    do {
        act(() => {
            results.push(untyped(handle).execute('history.undo'));
        });
    } while (results.at(-1)?.status === 'applied');
    return results.length - 1;
};

interface Step {
    readonly step: number;
    readonly code: ReplaceCode;
    /** Holds each save until the case answers it. */
    readonly held?: boolean;
    readonly mounting?: boolean;
    /** Runs before the call and returns what the request changes. */
    readonly setup?: (
        editor: Mounted,
        calls: readonly Call[],
    ) => Partial<ReplaceDocumentRequest> | Promise<Partial<ReplaceDocumentRequest>>;
    /** Runs while the replacement waits at step 5. */
    readonly during?: (editor: Mounted, calls: readonly Call[]) => Promise<void>;
    /** The step 5 `save` write may change the save state (AC-032). */
    readonly saves?: boolean;
    /** The view reads a keystroke while the replacement waits, which the document keeps. */
    readonly kept?: boolean;
}
const typed = ({ type }: Mounted) => {
    type('x');
    return {};
};
const steps: readonly Step[] = [
    { step: 0, code: 'not-ready', mounting: true },
    {
        step: 2,
        code: 'wrong-model',
        setup: () => {
            const { document } = loaded('revision-9', para('next'));
            return {
                next: {
                    documentId: 'document-2',
                    revision: 'revision-9',
                    document: { ...document, model: { id: 'test.other', version: 1 } },
                },
            };
        },
    },
    {
        step: 2,
        code: 'invalid-document',
        setup: () => {
            const { document } = loaded('revision-9', para('next'));
            return {
                next: {
                    documentId: 'document-2',
                    revision: 'revision-9',
                    document: { ...document, formatVersion: 2 as 1 },
                },
            };
        },
    },
    {
        step: 3,
        code: 'changed-since-request',
        setup: ({ handle, type }) => {
            const expected = handle().getSnapshot().stamp;
            type('x');
            return { expected };
        },
    },
    {
        step: 4,
        code: 'composition-active',
        setup: ({ handle }) => {
            compose(handle(), 'x');
            return {};
        },
    },
    { step: 5, code: 'unsaved', setup: typed },
    {
        step: 5,
        code: 'unsaved',
        held: true,
        saves: true,
        setup: ({ type }) => {
            type('x');
            return { unsaved: { action: 'save' } };
        },
        during: async ({ flush }, calls) => {
            await flush();
            calls[0]?.answer({ status: 'rejected', code: 'forbidden', diagnostics: [] });
            await settle();
        },
    },
    {
        step: 5,
        code: 'checkpoint-invalid',
        setup: ({ handle, type }) => {
            const { stamp } = handle().getSnapshot();
            type('x');
            return { unsaved: { action: 'checkpoint', receipt: { stamp, receiptId: 'receipt-1' } } };
        },
    },
    {
        step: 6,
        code: 'save-unresolved',
        held: true,
        setup: async ({ type, advance }, calls) => {
            type('x');
            advance(500);
            calls[0]?.fail();
            await settle();
            return { unsaved: { action: 'discard', confirmed: true } };
        },
    },
    {
        step: 7,
        code: 'changed-since-request',
        held: true,
        saves: true,
        kept: true,
        setup: ({ type }) => {
            type('x');
            return { unsaved: { action: 'save' } };
        },
        during: async ({ handle, flush }, calls) => {
            await flush();
            // A keystroke the view reads from the DOM while the write runs.
            act(() => {
                const view = viewOf(handle());
                view.dispatch(view.state.tr.insertText('y'));
            });
            calls[0]?.answer();
            await settle();
        },
    },
];

describe('replacement', () => {
    it('SPEC-rich-text-persistence/AC-027 answers an echo of the acknowledged record with the current session, keeping history, selection and save state', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service } = serviceOf(environment);
        const { handle, type, advance, unmount } = mount({ service, environment });
        type('x');
        advance(500);
        await settle();
        const { session, selection } = handle().getSummary();
        const status = handle().getSaveStatus();
        const { document, acknowledgedRevision } = handle().getSnapshot();

        const result = await replace(handle(), {
            next: { documentId: 'document-1', revision: acknowledgedRevision, document },
        });

        expect(result).toEqual({ status: 'replaced', session });
        expect(handle().getSummary()).toMatchObject({ session: { generation: 0 }, selection });
        expect(handle().getSaveStatus()).toBe(status);
        expect(undoSteps(handle())).toBe(1);
        unmount();
    });

    it.each(steps)(
        'SPEC-rich-text-persistence/AC-031 SPEC-rich-text-persistence/AC-032 stops at step $step with $code and leaves the session as it was',
        async ({ code, held = false, mounting = false, setup, during, saves = false, kept = false }) => {
            const environment = createTestEnvironment({ seed: 1 });
            const { service, calls } = serviceOf(environment, held);
            const editor = mount({ service, environment, mounting });
            const { handle } = editor;
            let overrides: Partial<ReplaceDocumentRequest> = {};
            if (setup !== undefined) {
                overrides = await setup(editor, calls);
            }
            const record = () => ({
                phase: handle().getSummary().phase,
                document: handle().getSnapshot().document,
                selection: handle().getSummary().selection,
                state: runtimeOf(handle())?.state,
                status: handle().getSaveStatus(),
            });
            const before = record();

            const pending = handle().replaceDocument(replacing(handle(), overrides));
            await during?.(editor, calls);
            const result = await act(() => pending);

            expect(result).toEqual({ status: 'rejected', code });
            const after = record();
            expect(after.phase).toBe(before.phase);
            if (kept) {
                expect(textIn(after.document)).toBe('xyab');
            } else {
                expect(after.document).toEqual(before.document);
                expect(after.selection).toEqual(before.selection);
                expect(after.state).toBe(before.state);
            }
            if (!saves) {
                expect(after.status).toEqual(before.status);
            }
            editor.unmount();
        },
    );

    it('SPEC-rich-text-persistence/AC-033 runs an intent enqueued during a step 5 save on the old session once that save is rejected', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, type, flush, unmount } = mount({ service, environment });
        type('x');
        const replaced = handle().replaceDocument(replacing(handle(), { unsaved: { action: 'save' } }));
        await flush();
        const inserted = untyped(handle()).enqueue('text.insert', { text: 'y' });
        expect(await peek(inserted)).toBe('pending');

        calls[0]?.answer({ status: 'rejected', code: 'invalid', diagnostics: [] });

        expect(await act(() => replaced)).toEqual({ status: 'rejected', code: 'unsaved' });
        expect(await inserted).toMatchObject({ status: 'applied', contentChanged: true });
        expect(textIn(handle().getSnapshot().document)).toBe('xyab');
        unmount();
    });

    it('SPEC-rich-text-persistence/AC-034 SPEC-rich-text-persistence/AC-024 starts the next generation with the sequence of a load and empty history, and acknowledges it with no write', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service } = serviceOf(environment);
        const { handle, type, flush, unmount } = mount({ service, environment });
        type('x');
        const { session, commitSequence } = handle().getSummary();

        const result = await replace(handle(), { unsaved: { action: 'discard', confirmed: true } });

        const next = { documentId: 'document-2', sessionId: session.sessionId, generation: 1 };
        expect(result).toEqual({ status: 'replaced', session: next });
        expect(handle().getSummary()).toMatchObject({ session: next, sequence: 0 });
        expect(handle().getSummary().commitSequence).toBeGreaterThan(commitSequence);
        expect(handle().getSaveStatus()).toEqual({
            state: 'clean',
            latestSequence: 0,
            acknowledgedSequence: 0,
            revision: 'revision-9',
            inFlightOperationId: null,
            diagnostic: null,
        });
        expect(untyped(handle()).query('history.undo').enabled).toBe(false);
        const committed = handle().requestCommit({ reason: 'manual' });
        await flush();
        expect(await committed).toEqual({
            status: 'acknowledged',
            acknowledgment: { operationId: null, stamp: { ...next, sequence: 0 }, revision: 'revision-9' },
        });
        expect(service.save).not.toHaveBeenCalled();
        unmount();
    });

    it('SPEC-rich-text-persistence/AC-035 ignores a late save response and a late mention search from the old generation', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, type, advance, diagnostics, unmount } = mount({
            service,
            environment,
            persistenceOptions: { timeoutMs: 1000 },
        });
        type('x');
        advance(500);
        // The first write times out, and its replay is saved, so the session is clean with the first still open.
        advance(1000);
        advance(2000);
        calls[1]?.answer();
        await settle();
        expect(handle().getSaveStatus().state).toBe('clean');
        let found: (result: unknown) => void = () => undefined;
        runtimeOf(handle())?.startAsync({
            key: 'mention-search',
            service: 'references',
            featureId: 'core',
            action: 'create',
            command: 'text.insert',
            run: () =>
                new Promise((resolve) => {
                    found = resolve;
                }),
        });
        await replace(handle());
        const status = handle().getSaveStatus();
        const { document } = handle().getSnapshot();

        found({ text: 'late ' });
        calls[0]?.answer({ status: 'conflict', currentRevision: 'revision-8' });
        await settle();

        expect(handle().getSaveStatus()).toBe(status);
        expect(handle().getSnapshot().document).toEqual(document);
        expect(diagnostics.map(({ code, details }) => [code, details])).toEqual([
            ['runtime.async-discarded', { reason: 'wrong-session' }],
        ]);
        unmount();
    });

    it('SPEC-rich-text-runtime/AC-031 SPEC-rich-text-persistence/AC-035 resolves intents queued during transitioning as wrong-session in the next generation', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, type, flush, unmount } = mount({ service, environment });
        type('x');
        act(() => setSelection(handle(), { text: 'xab' }));
        const captured = handle().captureTarget({ purpose: 'format', onIntersectingEdit: 'map' });
        if (captured.status !== 'captured') {
            throw new Error('expected a target');
        }
        const replaced = handle().replaceDocument(replacing(handle(), { unsaved: { action: 'save' } }));
        await flush();
        const queued = [
            untyped(handle()).enqueue('mark.bold.toggle', undefined, { target: captured.target }),
            untyped(handle()).enqueue('text.insert', { text: 'y' }),
        ];

        calls[0]?.answer();

        expect(await act(() => replaced)).toMatchObject({ status: 'replaced' });
        expect(await Promise.all(queued)).toEqual([
            { status: 'rejected', code: 'wrong-session' },
            { status: 'rejected', code: 'wrong-session' },
        ]);
        expect(textIn(handle().getSnapshot().document)).toBe('next');
        unmount();
    });

    it('SPEC-rich-text-persistence/AC-064 blocks requestCommit with not-ready while transitioning, pinning nothing', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, type, flush, unmount } = mount({ service, environment });
        type('x');
        const replaced = handle().replaceDocument(replacing(handle(), { unsaved: { action: 'save' } }));
        expect(handle().getSummary().phase).toBe('transitioning');

        expect(await peek(handle().requestCommit({ reason: 'manual' }))).toEqual({
            status: 'blocked',
            code: 'not-ready',
        });
        await flush();
        calls[0]?.answer();
        await act(() => replaced);
        await settle();

        // The one write is the replacement's own `save`.
        expect(calls).toHaveLength(1);
        unmount();
    });

    it('SPEC-rich-text-persistence/AC-045 accepts a checkpoint only with a receipt for the current stamp, with no save', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service } = serviceOf(environment);
        const { handle, type, unmount } = mount({ service, environment });
        type('x');
        const older = handle().getSnapshot().stamp;
        type('y');
        const checkpoint = (stamp: typeof older) =>
            ({ action: 'checkpoint', receipt: { stamp, receiptId: 'receipt-1' } }) as const;

        expect(await replace(handle(), { unsaved: checkpoint(older) })).toEqual({
            status: 'rejected',
            code: 'checkpoint-invalid',
        });
        expect(await replace(handle(), { unsaved: checkpoint(handle().getSnapshot().stamp) })).toMatchObject({
            status: 'replaced',
        });
        await settle();
        expect(service.save).not.toHaveBeenCalled();
        unmount();
    });

    it('SPEC-rich-text-persistence/AC-059 resolves faulted and leaves the phase faulted when a node view of the next document throws', async () => {
        vi.mocked(createPortalStore).mockImplementationOnce((scheduler) => {
            const store = actualStore(scheduler);
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
        const environment = createTestEnvironment({ seed: 1 });
        const { service } = serviceOf(environment);
        const { handle, unmount } = mount({ service, environment, blocks: [para('ab'), chromeBlock('b1')] });
        await act(() => environment.flushMicrotasks());
        const replaced = vi.fn();
        handle().subscribe('replaced', replaced);
        const { document } = loaded('revision-9', para('next'), {
            ...chromeBlock('b2'),
            attrs: { nodeId: 'b2', language: 'boom', checked: false },
        });

        const result = await replace(handle(), {
            next: { documentId: 'document-2', revision: 'revision-9', document },
        });

        expect(result).toEqual({ status: 'rejected', code: 'faulted' });
        expect(handle().getSummary().phase).toBe('faulted');
        expect(replaced).not.toHaveBeenCalled();
        unmount();
    });

    it('SPEC-rich-text-persistence/AC-059 SPEC-rich-text-react/AC-022 shows the recovery shell with the old document after an install fault', async () => {
        vi.mocked(createPortalStore).mockImplementationOnce((scheduler) => {
            const store = actualStore(scheduler);
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
        const environment = createTestEnvironment({ seed: 1 });
        const { handle, type, unmount } = mount({
            service: serviceOf(environment).service,
            environment,
            blocks: [para('ab'), chromeBlock('b1')],
        });
        await act(() => environment.flushMicrotasks());
        type('x');
        const next = loaded('revision-9', para('next'), {
            ...chromeBlock('b2'),
            attrs: { nodeId: 'b2', language: 'boom', checked: false },
        });

        await replace(handle(), {
            next: { documentId: 'document-2', revision: 'revision-9', document: next.document },
            unsaved: { action: 'discard', confirmed: true },
        });

        const shell = document.querySelector('[data-rte-shell="recovery"]');
        expect(shell?.textContent).toContain('xab');
        expect(shell?.textContent).not.toContain('next');
        expect(document.querySelector('[role="textbox"]')).toBeNull();
        unmount();
    });

    it('SPEC-rich-text-persistence/AC-059 SPEC-rich-text-runtime/AC-015 stores no recovery checkpoint when the next document faults the install', async () => {
        vi.mocked(createPortalStore).mockImplementationOnce((scheduler) => {
            const store = actualStore(scheduler);
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
        const environment = createTestEnvironment({ seed: 1 });
        const store = vi.fn((checkpoint: Parameters<RecoveryService['store']>[0]) =>
            Promise.resolve({ stamp: checkpoint.stamp, receiptId: 'receipt-1' }),
        );
        const { handle, unmount } = mount({
            service: serviceOf(environment).service,
            recovery: { store },
            environment,
            blocks: [para('ab'), chromeBlock('b1')],
        });
        await act(() => environment.flushMicrotasks());
        const { document } = loaded('revision-9', para('next'), {
            ...chromeBlock('b2'),
            attrs: { nodeId: 'b2', language: 'boom', checked: false },
        });

        expect(
            await replace(handle(), { next: { documentId: 'document-2', revision: 'revision-9', document } }),
        ).toEqual({
            status: 'rejected',
            code: 'faulted',
        });
        await settle();

        expect(store).not.toHaveBeenCalled();
        unmount();
    });

    it('SPEC-rich-text-runtime/AC-031 resolves an intent queued during transitioning as wrong-session when a held async result settles first', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, type, flush, unmount } = mount({ service, environment });
        let found: (result: unknown) => void = () => undefined;
        const search = new Promise((resolve) => {
            found = resolve;
        });
        runtimeOf(handle())?.startAsync({
            key: 'mention-search',
            service: 'references',
            featureId: 'core',
            action: 'create',
            command: 'text.insert',
            run: () => search,
        });
        type('x');
        const replaced = handle().replaceDocument(replacing(handle(), { unsaved: { action: 'save' } }));
        await flush();
        const queued = untyped(handle()).enqueue('text.insert', { text: 'y' });
        // The result arrives while the replacement waits, so the coordinator holds it.
        found({ text: 'late ' });
        await settle();

        calls[0]?.answer();

        expect(await act(() => replaced)).toMatchObject({ status: 'replaced' });
        expect(await queued).toEqual({ status: 'rejected', code: 'wrong-session' });
        expect(textIn(handle().getSnapshot().document)).toBe('next');
        unmount();
    });

    it('SPEC-rich-text-persistence/AC-027 runs the full steps for another untouched new record with an equal document (DR-077)', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { handle, unmount } = mount({ service: serviceOf(environment).service, environment });
        const { document } = handle().getSnapshot();

        const result = await replace(handle(), { next: { documentId: 'document-2', revision: null, document } });

        expect(result).toMatchObject({ status: 'replaced', session: { documentId: 'document-2', generation: 1 } });
        expect(handle().getSummary().session.documentId).toBe('document-2');
        unmount();
    });

    it.each([
        ['an untouched new record', null, { status: 'failed', code: 'transport', outcome: 'not-sent' }],
        [
            'a clean existing record',
            'revision-1',
            {
                status: 'acknowledged',
                acknowledgment: {
                    operationId: null,
                    stamp: { documentId: 'document-1', sessionId: 'session-1', generation: 0, sequence: 0 },
                    revision: 'revision-1',
                },
            },
        ],
    ] as const)(
        'SPEC-rich-text-persistence/AC-024 answers a requestCommit made before a replacement in the same task for %s, with no save of the next document',
        async (_name, revision, expected) => {
            const environment = createTestEnvironment({ seed: 1 });
            const { service } = serviceOf(environment);
            const { handle, flush, unmount } = mount({ service, environment, revision });

            const committed = handle().requestCommit({ reason: 'navigate' });
            await replace(handle());
            await flush();
            await settle();

            expect(await committed).toEqual(expected);
            expect(service.save).not.toHaveBeenCalled();
            unmount();
        },
    );

    it('SPEC-rich-text-persistence/AC-031 refuses with unsaved when a documentChange listener replaces under the reject policy', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { handle, type, unmount } = mount({
            service: serviceOf(environment).service,
            environment,
            revision: 'revision-1',
        });
        const results: Promise<ReplaceResult>[] = [];
        handle().subscribe('documentChange', () => {
            if (results.length === 0) {
                results.push(handle().replaceDocument(replacing(handle())));
            }
        });

        type('x');

        expect(await act(() => results[0])).toEqual({ status: 'rejected', code: 'unsaved' });
        expect(textIn(handle().getSnapshot().document)).toBe('xab');
        unmount();
    });

    it('SPEC-rich-text-persistence/AC-032 gives the session back with unsaved when a host passes a checkpoint with no receipt', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { handle, type, unmount } = mount({ service: serviceOf(environment).service, environment });
        type('x');

        const result = await replace(handle(), { unsaved: { action: 'checkpoint' } as never });

        expect(result).toEqual({ status: 'rejected', code: 'unsaved' });
        expect(handle().getSummary().phase).toBe('ready');
        let inserted: CommandResult | undefined;
        act(() => {
            inserted = untyped(handle()).execute('text.insert', { text: 'y' });
        });
        expect(inserted).toMatchObject({ status: 'applied' });
        expect(textIn(handle().getSnapshot().document)).toBe('xyab');
        unmount();
    });

    it('SPEC-rich-text-persistence/AC-068 replaces an untouched new record under the reject policy and disposes it with no disposed-dirty', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service } = serviceOf(environment);
        const replaced = mount({ service, environment });
        expect(await replace(replaced.handle())).toMatchObject({ status: 'replaced' });
        replaced.unmount();
        const disposed = mount({ service, environment });
        disposed.unmount();

        expect([...replaced.diagnostics, ...disposed.diagnostics]).toEqual([]);
        expect(service.save).not.toHaveBeenCalled();
    });

    it('SPEC-rich-text-persistence/AC-071 notifies selector stores with the fresh state before replaced', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { handle, type, unmount } = mount({ service: serviceOf(environment).service, environment });
        let undoable = false;
        runtimeOf(handle())?.watch(
            () => untyped(handle()).query('history.undo').enabled,
            Object.is,
            (value) => {
                undoable = value;
            },
        );
        type('x');
        expect(undoable).toBe(true);
        const seen: boolean[] = [];
        handle().subscribe('replaced', () => seen.push(undoable));

        await replace(handle(), { unsaved: { action: 'discard', confirmed: true } });

        expect(seen).toEqual([false]);
        unmount();
    });
});

describe('recovery', () => {
    it('SPEC-rich-text-runtime/AC-015 stores the candidate of a view fault and reports the receipt', async () => {
        vi.mocked(createPortalStore).mockImplementationOnce((scheduler) => {
            const store = actualStore(scheduler);
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
        const environment = createTestEnvironment({ seed: 1 });
        const store = vi.fn((checkpoint: Parameters<RecoveryService['store']>[0]) =>
            Promise.resolve({ stamp: checkpoint.stamp, receiptId: 'receipt-1' }),
        );
        const { handle, type, diagnostics, unmount } = mount({
            service: serviceOf(environment).service,
            recovery: { store },
            environment,
            blocks: [para('ab'), chromeBlock('b1')],
        });
        await act(() => environment.flushMicrotasks());
        type('x');
        const { session, sequence } = handle().getSummary();

        act(() => {
            runtimeOf(handle())?.nodeActions('b1').update({ language: 'boom' });
        });
        await settle();

        expect(handle().getSummary().phase).toBe('faulted');
        expect(store).toHaveBeenCalledTimes(1);
        const [[checkpoint]] = store.mock.calls as unknown as [[Parameters<RecoveryService['store']>[0]]];
        expect(checkpoint).toMatchObject({ stamp: { ...session, sequence: sequence + 1 }, acknowledgedRevision: null });
        expect(checkpoint.document).toEqual(handle().getRecoveryCandidate());
        expect(diagnostics.filter(({ code }) => code === 'runtime.recovery-stored')).toEqual([
            {
                code: 'runtime.recovery-stored',
                severity: 'info',
                messageKey: 'runtime.recovery-stored',
                details: { receiptId: 'receipt-1' },
            },
        ]);
        unmount();
    });

    it('SPEC-rich-text-persistence/AC-063 states the host obligations for browser-stored checkpoints on the persistence docs page', () => {
        const page = readFileSync(
            join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'docs', 'persistence.md'),
            'utf8',
        );

        expect(page).toMatch(/namespace[^.]*by user, tenant and document/i);
        expect(page).toMatch(/retention period/i);
        expect(page).toMatch(/delete[^.]*on logout and on account switch/i);
    });
});

describe('the runtime with a save coordinator', () => {
    it('SPEC-rich-text-format/AC-012 warns of an undeclared capability on decode and saves the corrected list after one edit', async () => {
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

        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment);
        const { type, advance, unmount } = mount({ service, environment, blocks });
        type('x');
        advance(500);
        await settle();
        expect(calls[0]?.request.document.requiredCapabilities).toEqual([
            { id: 'core', version: 1 },
            { id: 'marks.bold', version: 1 },
        ]);
        unmount();
    });

    it('SPEC-rich-text-runtime/AC-024 notifies selector stores, then emits the change, selection, save status and metric', () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { handle, type, unmount } = mount({ service: serviceOf(environment).service, environment });
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

    it('SPEC-rich-text-runtime/AC-058 emits undo as a history change and autosaves it', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment);
        const { handle, type, advance, unmount } = mount({ service, environment });
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

    it('SPEC-rich-text-runtime/AC-067 keeps the save state and the autosave due time across two mode changes', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment);
        const { handle, type, advance, rerender, unmount } = mount({ service, environment });
        type('x');
        const due = environment.clock.now() + 500;
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

    it('SPEC-rich-text-runtime/AC-091 stops autosave once a node view update faults a dirty session', async () => {
        vi.mocked(createPortalStore).mockImplementationOnce((scheduler) => {
            const store = actualStore(scheduler);
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
        const environment = createTestEnvironment({ seed: 1 });
        const { service } = serviceOf(environment);
        const { handle, type, advance, unmount } = mount({
            service,
            environment,
            blocks: [para('ab'), chromeBlock('b1')],
        });
        await act(() => environment.flushMicrotasks());
        type('x');
        act(() => {
            runtimeOf(handle())?.nodeActions('b1').update({ language: 'boom' });
        });
        await act(() => environment.flushMicrotasks());
        expect(handle().getSummary().phase).toBe('faulted');
        expect(handle().getSaveStatus().state).toBe('dirty');

        advance(10_000);
        await settle();
        expect(service.save).not.toHaveBeenCalled();
        unmount();
    });

    it.each(['a backoff replay', 'the online event'])(
        'SPEC-rich-text-runtime/AC-091 sends no write through %s once a dirty session faulted',
        async (path) => {
            vi.mocked(createPortalStore).mockImplementationOnce((scheduler) => {
                const store = actualStore(scheduler);
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
            const environment = createTestEnvironment({ seed: 1 });
            const { service, calls } = serviceOf(environment, true);
            const { handle, type, advance, unmount } = mount({
                service,
                environment,
                blocks: [para('ab'), chromeBlock('b1')],
            });
            await act(() => environment.flushMicrotasks());
            type('x');
            advance(500);
            act(() => {
                runtimeOf(handle())?.nodeActions('b1').update({ language: 'boom' });
            });
            await act(() => environment.flushMicrotasks());
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
        vi.mocked(createPortalStore).mockImplementationOnce((scheduler) => {
            const store = actualStore(scheduler);
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
        const environment = createTestEnvironment({ seed: 1 });
        const services = serviceOf(environment, held);
        const mounted = mount({ service: services.service, environment, blocks: [para('ab'), chromeBlock('b1')] });
        await act(() => environment.flushMicrotasks());
        const fault = async () => {
            act(() => {
                runtimeOf(mounted.handle())?.nodeActions('b1').update({ language: 'boom' });
            });
            await act(() => environment.flushMicrotasks());
            expect(mounted.handle().getSummary().phase).toBe('faulted');
        };
        return { ...mounted, service: services.service, calls: services.calls, fault };
    };

    it('SPEC-rich-text-runtime/AC-016 saves the last published snapshot of a faulted session through requestCommit', async () => {
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

    it('SPEC-rich-text-runtime/AC-091 holds the write a fault left unresolved until requestCommit, then replays it unchanged first', async () => {
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

    it('SPEC-rich-text-react/AC-085 writes the unsaved edit once on requestCommit after Retry, not an acknowledgment of the loaded record', async () => {
        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
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
                environment={environment}
                services={{ persistence: service }}
                ref={ref}
            >
                <RichTextEditor.Surface />
                <Bomb armed={armed} />
            </RichTextEditor.Root>
        );
        const view = render(tree(false));
        act(() => environment.flushFrames());
        act(() => typeText(ref.current as EditorHandle<object>, 'c'));
        view.rerender(tree(true));
        view.rerender(tree(false));
        fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
        act(() => environment.flushFrames());
        const handle = ref.current as EditorHandle<object>;
        const result = handle.requestCommit({ reason: 'manual' });
        await act(() => environment.flushMicrotasks());
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

    it('SPEC-rich-text-runtime/AC-073 keeps the write in flight across rerenders that pass services inline with the same functions', () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { type, advance, rerender, unmount } = mount({ service, environment });
        type('x');
        advance(500);
        for (let render = 0; render < 3; render += 1) {
            rerender(false, { save: service.save, read: service.read });
        }
        expect(service.save).toHaveBeenCalledTimes(1);
        expect(calls[0]?.context.signal.aborted).toBe(false);
        unmount();
    });

    it('SPEC-rich-text-runtime/AC-073 replays the write in flight through a replaced services.persistence', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const first = serviceOf(environment, true);
        const second = serviceOf(environment, true);
        const { handle, type, advance, rerender, unmount } = mount({ service: first.service, environment });
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

    it('SPEC-rich-text/AC-059 runs the node-ids normalizer in a managed session with no service call', () => {
        const environment = createTestEnvironment({ seed: 1 });
        const failing = () => {
            throw new Error('A normalizer reached a service.');
        };
        const service = { save: vi.fn(failing), read: vi.fn(failing) };
        const { handle, metrics, unmount } = mount({ service, environment });
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
    it('SPEC-rich-text-quality/AC-029 emits one metric per mount, commit, paste and save round trip, with every field set', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, metrics, type, advance, unmount } = mount({ service, environment, beforeReady: 25 });
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
        const replayedFor = environment.clock.now() - replay.at;
        replay.answer();
        await settle();

        expect(metrics).toEqual([
            { ...common, kind: 'mount', durationMs: 25, failureCode: null },
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

    it('SPEC-rich-text-quality/AC-029 emits one replace metric for a replacement, timed from the call to its end', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { service, calls } = serviceOf(environment, true);
        const { handle, metrics, type, advance, flush, unmount } = mount({ service, environment });
        const common = {
            packageVersion: PACKAGE_VERSION,
            model: { id: 'test.persistence', version: 1 },
            capabilityIds: model.capabilities.map(({ id }) => id),
            normalizationTransactions: 0,
        };
        type('x');
        const { session } = handle().getSummary();

        const replaced = handle().replaceDocument(replacing(handle(), { unsaved: { action: 'save' } }));
        await flush();
        advance(40);
        calls[0]?.answer();
        const result = await act(() => replaced);

        const next = { ...session, documentId: 'document-2', generation: 1 };
        expect(result).toEqual({ status: 'replaced', session: next });
        expect(metrics.filter(({ kind }) => kind === 'replace')).toEqual([
            { ...common, session: next, kind: 'replace', durationMs: 40, failureCode: null },
        ]);
        unmount();
    });

    it('SPEC-rich-text-quality/AC-029 reports the code of a rejected replacement as its failureCode', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const { handle, metrics, type, unmount } = mount({ service: serviceOf(environment).service, environment });
        type('x');

        expect(await replace(handle())).toEqual({ status: 'rejected', code: 'unsaved' });

        expect(metrics.filter(({ kind }) => kind === 'replace')).toEqual([
            expect.objectContaining({ session: handle().getSummary().session, durationMs: 0, failureCode: 'unsaved' }),
        ]);
        unmount();
    });
});

describe('save metric failure codes', () => {
    it.each([
        ['conflict', { status: 'conflict', currentRevision: 'revision-9' } as const],
        ['forbidden', { status: 'rejected', code: 'forbidden', diagnostics: [] } as const],
    ])(
        'SPEC-rich-text-quality/AC-029 reports failureCode %s on the save metric of that answer',
        async (failureCode, response) => {
            const environment = createTestEnvironment({ seed: 1 });
            const { service, calls } = serviceOf(environment, true);
            const { metrics, type, advance, unmount } = mount({ service, environment });
            type('x');
            advance(500);
            calls[0]?.answer(response);
            await settle();
            expect(metrics.filter(({ kind }) => kind === 'save').map((metric) => metric.failureCode)).toEqual([
                failureCode,
            ]);
            unmount();
        },
    );
});

describe('the persistence conformance kit', () => {
    describe('SPEC-rich-text-persistence/AC-049 runs against the reference fake', () => {
        runPersistenceConformance(() => ({
            ...createFakeServer(),
            rejectedWriter: { ...WRITER, capabilities: [] },
            writer: WRITER,
            document: loaded(null, para('ab')).document,
        }));
    });
});
