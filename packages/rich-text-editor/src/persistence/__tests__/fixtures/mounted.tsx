/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { act, render } from '@testing-library/react';
import { createRef } from 'react';
import { afterAll, afterEach, beforeAll, beforeEach, expect, vi } from 'vitest';

import { defineEditorPart } from '#/entries/authoring';
import {
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
    defineFeature,
    type Diagnostic,
    type Feature,
    type JsonValue,
    type RichTextDocument,
} from '#/model';
import { fixtureChrome } from '#/plugins/__tests__/fixtures/chrome/feature';
import { pluginsFor } from '#/plugins/__tests__/fixtures/pluginsFor';
import { bold } from '#/plugins/Bold/feature';
import { core } from '#/plugins/Core/feature';
import { runtimeOf } from '#/runtime/runtime';
import { createFakePersistenceService, typeText } from '#/testing';
import { stubStorage } from '#/testing/__tests__/fixtures/storage';

/** Seeded so backoff delays stay repeatable. */
export const seededRandom = (seed: number) => {
    let state = seed >>> 0;

    return () => {
        state = (state + 0x6d2b79f5) >>> 0;
        let value = Math.imul(state ^ (state >>> 15), state | 1);
        value ^= value + Math.imul(value ^ (value >>> 7), value | 61);

        return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
    };
};

/** Installs the hooks every persistence spec runs under: no storage, fake timers and a seeded Math.random. */
export const installPersistenceHooks = () => {
    // every browser storage API fails while this suite runs.
    let storage: ReturnType<typeof stubStorage> | undefined;
    beforeAll(() => {
        storage = stubStorage();
    });
    afterAll(() => {
        if (storage === undefined) {
            return;
        }

        const { accessed } = storage;
        storage.restore();
        expect(accessed).toEqual([]);
    });
    beforeEach(() => {
        vi.useFakeTimers();
        vi.spyOn(Math, 'random').mockImplementation(seededRandom(1));
    });
    afterEach(() => {
        vi.useRealTimers();
    });

    return {
        storage: () => {
            if (storage === undefined) {
                throw new Error('storage is not stubbed');
            }

            return storage;
        },
    };
};

// A block whose new occurrences get their `nodeId` from the `node-ids` normalizer.
export const stampedBlock = defineFeature({
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
});
export const stampedEditor = defineEditorPart(stampedBlock, {
    needs: ['blocks'],
    commands: { 'test.stamped.set': { run: (api) => api.blocks.set('stamped', undefined, { toggle: true }) } },
});
export const features: readonly Feature[] = [core(), bold(), fixtureChrome(), stampedBlock()];
export const model = compileContentModel(features, { id: 'test.persistence', version: 1 });
export const definition = defineEditor({ id: 'test.persistence', model, plugins: pluginsFor(model, [stampedEditor]) });
const packageFile = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '..', 'package.json');
export const { version: PACKAGE_VERSION } = JSON.parse(readFileSync(packageFile, 'utf8')) as {
    version: string;
};
export const WRITER: SaveRequest['writer'] = {
    build: PACKAGE_VERSION,
    formatVersion: 1,
    model: { id: 'test.persistence', version: 1 },
    capabilities: model.capabilities.map(({ id, version }) => ({ id, version })),
};
export const para = (text: string) => ({ type: 'paragraph', attrs: { lang: null }, content: [{ type: 'text', text }] });
export const chromeBlock = (nodeId: string) => ({
    type: 'chrome_block',
    attrs: { nodeId, language: 'plain', checked: false },
    content: [{ type: 'text', text: 'code' }],
});
export const loaded = (revision: string | null, ...blocks: readonly JsonValue[]) => ({
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
export const textOf = (request: SaveRequest) => JSON.stringify(request.document.content).match(/"text":"([^"]*)"/)?.[1];
/** One `save` call: what it got, when, and how the test answers it. */
export type Call = {
    request: SaveRequest;
    context: ServiceContext;
    at: number;
    /** Resolves with `response`, or with the reference fake's answer when none is given. */
    answer(response?: SaveResponse): void;
    fail(): void;
};
/** A service in front of the reference fake that records each call; `held` saves wait until the test answers them. */
export const serviceOf = (held = false) => {
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
export const settle = () =>
    act(async () => {
        await vi.advanceTimersByTimeAsync(0);
    });
/** The promise's value, or `pending` while it has none once the pending continuations ran. */
export const peek = async <T,>(promise: Promise<T>) => {
    await settle();

    // An already settled promise wins the race over the second entry.
    return Promise.race([promise, Promise.resolve('pending' as const)]);
};

export type MountOptions = {
    service?: PersistenceService;
    recovery?: RecoveryService;
    revision?: string | null;
    persistenceOptions?: PersistenceOptions;
    blocks?: readonly JsonValue[];
    /** Time that passes between the mount and its first frame. */
    beforeReady?: number;
    /** Leaves the editor `mounting`, before its first frame. */
    mounting?: boolean;
};
/** Mounts an editor on a test then runs its first frame, so it is `ready`. */
export const mount = (options: MountOptions = {}) => {
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
            managed.services = { persistence: service, recovery: options.recovery };
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

export const viewOf = (handle: EditorHandle<object>) => {
    const view = runtimeOf(handle)?.view;
    if (view === undefined) {
        throw new Error('no view');
    }

    return view;
};

/** Starts a composition as the browser does, so ProseMirror's own handler sets `view.composing`, and composes `text`. */
export const compose = (handle: EditorHandle<object>, text: string) =>
    act(() => {
        const view = viewOf(handle);
        view.dom.dispatchEvent(new CompositionEvent('compositionstart'));
        // ProseMirror marks the composed text it reads from the DOM with its composition ID.
        view.dispatch(view.state.tr.insertText(text).setMeta('composition', 1));
    });
export type Mounted = ReturnType<typeof mount>;
export type ReplaceCode = Extract<ReplaceResult, { status: 'rejected' }>['code'];
/** A request that replaces the editor's document by `document-2` at `revision-9`, rejecting unsaved changes unless `overrides` says otherwise. */
export const replacing = (
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
export const textIn = (document: RichTextDocument) => JSON.stringify(document.content).match(/"text":"([^"]*)"/)?.[1];
export const replace = (handle: EditorHandle<object>, overrides: Partial<ReplaceDocumentRequest> = {}) =>
    act(() => handle.replaceDocument(replacing(handle, overrides)));
export type Step = {
    step: number;
    code: ReplaceCode;
    /** Holds each save until the case answers it. */
    held?: boolean;
    mounting?: boolean;
    /** Runs before the call and returns what the request changes. */
    setup?: (
        editor: Mounted,
        calls: readonly Call[],
    ) => Partial<ReplaceDocumentRequest> | Promise<Partial<ReplaceDocumentRequest>>;
    /** Runs while the replacement waits at step 5. */
    during?: (editor: Mounted, calls: readonly Call[]) => Promise<void>;
    /** The step 5 `save` write may change the save state. */
    saves?: boolean;
    /** The view reads a keystroke while the replacement waits, which the document keeps. */
    kept?: boolean;
};
export const typed = ({ type }: Mounted) => {
    type('x');

    return {};
};

export const steps: readonly Step[] = [
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
