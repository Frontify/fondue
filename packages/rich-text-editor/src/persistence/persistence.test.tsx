/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { act, render } from '@testing-library/react';
import fc from 'fast-check';
import { Node } from 'prosemirror-model';
import { createRef } from 'react';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import { createPortalStore, type PortalEntry } from '#/bridge/portals';
import { fixtureChromeViews } from '#/features/__fixtures__/chrome/view';
import { core } from '#/features/core/feature';
import { bold } from '#/features/marks-bold/feature';
import {
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
import { type RuntimeHandle, runtimeOf } from '#/runtime/runtime';
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

interface MountOptions {
    readonly service?: PersistenceService;
    readonly revision?: string | null;
    readonly persistenceOptions?: PersistenceOptions;
    readonly environment?: TestEnvironment;
    readonly blocks?: readonly JsonValue[];
    /** Time that passes between the mount and its first frame. */
    readonly beforeReady?: number;
}

/** Mounts an editor on a test environment, then runs its first frame, so it is `ready`. */
const mount = (options: MountOptions = {}) => {
    const environment = options.environment ?? createTestEnvironment({ seed: 1 });
    const ref = createRef<EditorHandle<object>>();
    const diagnostics: Diagnostic[] = [];
    const metrics: OperationMetric[] = [];
    const props: Record<string, unknown> = {};
    if (options.service !== undefined) {
        props.services = { persistence: options.service };
    }
    if (options.persistenceOptions !== undefined) {
        props.persistenceOptions = options.persistenceOptions;
    }
    let revision: string | null = null;
    if (options.revision !== undefined) {
        revision = options.revision;
    }
    const blocks = options.blocks ?? [para('ab')];
    const element = (readOnly: boolean) => (
        <RichTextEditor
            aria-label="Notes"
            definition={definition}
            defaultValue={loaded(revision, ...blocks)}
            environment={environment}
            readOnly={readOnly}
            onDiagnostic={(diagnostic) => diagnostics.push(diagnostic)}
            ref={ref}
            {...props}
        />
    );
    const view = render(element(false));
    const handle = () => {
        if (ref.current === null) {
            throw new Error('no handle');
        }
        return ref.current;
    };
    handle().subscribe('operationMetric', (metric) => metrics.push(metric));
    act(() => {
        environment.advance(options.beforeReady ?? 0);
        environment.flushFrames();
    });
    return {
        ...view,
        environment,
        handle,
        diagnostics,
        metrics,
        rerender: (readOnly: boolean) => view.rerender(element(readOnly)),
        type: (text: string) => act(() => typeText(handle(), text)),
        advance: (ms: number) => act(() => environment.advance(ms)),
    };
};

// SPEC-rich-text-persistence/AC-044: every browser storage API fails while this suite runs.
let restoreStorage: () => void;
beforeAll(() => {
    restoreStorage = stubStorage();
});
afterAll(() => restoreStorage());

describe('save state at load', () => {
    it('SPEC-rich-text-persistence/AC-044 runs the persistence suite with every browser storage API failing', () => {
        for (const name of STORAGE) {
            expect(() => {
                Reflect.get(Reflect.get(globalThis, name) as object, 'open');
            }).toThrow(name);
        }
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
    it('SPEC-rich-text-persistence/AC-006 keeps at most one write in flight across random edits and delayed responses', async () => {
        const step = fc.oneof(
            fc.constant({ kind: 'type' as const }),
            fc.record({ kind: fc.constant('advance' as const), ms: fc.integer({ min: 0, max: 40_000 }) }),
            fc.record({ kind: fc.constant('answer' as const), saved: fc.boolean() }),
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
                const { type, advance, unmount } = mount({ service, environment });
                for (const next of steps) {
                    if (next.kind === 'type') {
                        type('x');
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
        const toJSON = vi.spyOn(Node.prototype, 'toJSON');
        for (let move = 0; move < 100; move += 1) {
            act(() => setSelection(handle(), { text: 'abcdef', from: move % 6, to: (move % 6) + 1 }));
        }
        expect(toJSON).not.toHaveBeenCalled();
        toJSON.mockRestore();
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
        calls.at(-1)?.answer();
        await settle();
        advance(500);
        expect(calls.at(-1)?.request.operationId).not.toBe(first);
        expect(textOf(calls.at(-1)?.request as SaveRequest)).toBe('xyyyab');
        expect(handle().getSaveStatus().state).toBe('saving');
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
            type('x');
            advance(500);
            calls[0]?.answer({ status: 'rejected', code, diagnostics: [reported] });
            await settle();
            type('y');
            advance(60_000);
            await settle();

            expect(handle().getSaveStatus()).toMatchObject({ state: 'error', diagnostic: reported });
            expect(diagnostics).toEqual([reported]);
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
            { ...common, kind: 'save', durationMs: 40, failureCode: 'transport' },
            { ...common, kind: 'save', durationMs: replayedFor, failureCode: null },
        ]);
        expect(replayedFor).toBeGreaterThan(0);
        unmount();
    });
});

describe('the persistence conformance kit', () => {
    describe('SPEC-rich-text-persistence/AC-049 runs against the reference fake', () => {
        runPersistenceConformance(() => ({
            ...createFakeServer(),
            rejectedWriter: { ...WRITER, capabilities: [] },
        }));
    });
});
