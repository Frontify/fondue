/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, render, screen } from '@testing-library/react';
import { createRef, type FormEvent, type RefObject } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { fixtureMediaImage } from '#/features/__fixtures__/media/feature';
import { vocabularyLists, vocabularyMention } from '#/features/__fixtures__/vocabulary';
import { core } from '#/features/core/feature';
import { bold } from '#/features/marks-bold/feature';
import {
    type CommitResult,
    defineEditor,
    defineReactPresentation,
    type EditorHandle,
    type PersistenceOptions,
    type PersistenceService,
    RichTextEditor,
    type RichTextFormField,
    type SaveRequest,
    type SaveResponse,
    type ServiceContext,
    useRichTextFormField,
} from '#/index';
import {
    compileContentModel,
    type ContentNodeJSON,
    type Diagnostic,
    featureFromManifest,
    type JsonValue,
} from '#/model';
import { type RuntimeHandle, runtimeOf } from '#/runtime/runtime';
import {
    createFakePersistenceService,
    createTestEnvironment,
    setSelection,
    type TestEnvironment,
    typeText,
} from '#/testing';
import { probeRuntimes } from '#/testing/probe';

import { type RichTextEditorBaseProps } from './types';

// A data manifest feature with one inline atom, which a blank check must count as content.
const badge = featureFromManifest({
    id: 'acme.badge',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    nodes: {
        acme_badge: {
            group: 'inline',
            atom: true,
            attrs: { label: { type: 'string', default: '' } },
            html: ['span', { class: 'acme-badge' }],
            parse: [{ tag: 'span.acme-badge' }],
        },
    },
});
const model = compileContentModel(
    [core(), bold(), vocabularyLists(), vocabularyMention(), fixtureMediaImage(), badge()],
    { id: 'test.forms', version: 1 },
);
const definition = defineEditor({ id: 'test.forms', model });
const CAPABILITIES = ['core', 'fixture.lists', 'fixture.mention', 'fixture.media-image', 'acme.badge'];

const text = (value: string) => ({ type: 'text', text: value });
const para = (...content: readonly JsonValue[]) => ({ type: 'paragraph', attrs: { lang: null }, content });
const loaded = (documentId: string, revision: string | null, ...blocks: readonly JsonValue[]) => ({
    documentId,
    revision,
    document: {
        format: 'frontify.rich-text' as const,
        formatVersion: 1 as const,
        model: { id: 'test.forms', version: 1 },
        requiredCapabilities: CAPABILITIES.map((id) => ({ id, version: 1 })),
        content: {
            type: 'doc',
            attrs: { lang: null, dir: 'auto' },
            content: blocks as unknown as readonly ContentNodeJSON[],
        },
    },
});
const STORED = loaded('document-1', null, para(text('ab')));

/** One `save` call, which waits until the test answers it. */
interface Call {
    readonly request: SaveRequest;
    /** Resolves with `response`, or with the reference fake's answer. */
    answer(response?: SaveResponse): void;
    fail(): void;
}
const serviceOf = () => {
    const server = createFakePersistenceService();
    const calls: Call[] = [];
    const service: PersistenceService = {
        save: vi.fn(
            (request: SaveRequest, context: ServiceContext) =>
                new Promise<SaveResponse>((resolve, reject) => {
                    calls.push({
                        request,
                        answer: (response) => resolve(response ?? server.save(request, context)),
                        fail: () => reject(new Error('The connection dropped.')),
                    });
                }),
        ),
        read: server.read,
    };
    return { service, calls };
};

type Props = Partial<RichTextEditorBaseProps<object>>;

/** The host of a form: the editor and its field, read through the ref the host passes (SPEC-rich-text-persistence/AC-050). */
const Host = ({
    editorRef,
    fieldRef,
    ...props
}: Props & {
    readonly editorRef: RefObject<EditorHandle<object>>;
    readonly fieldRef: { current: RichTextFormField | null };
}) => {
    fieldRef.current = useRichTextFormField(editorRef);
    return (
        <RichTextEditor aria-label="Notes" definition={definition} defaultValue={STORED} ref={editorRef} {...props} />
    );
};

/** Mounts the editor of a form on a test environment and runs its first frame, so it is `ready`. */
const mount = (props: Props = {}, environment: TestEnvironment = createTestEnvironment({ seed: 1 })) => {
    const editorRef = createRef<EditorHandle<object>>();
    const fieldRef: { current: RichTextFormField | null } = { current: null };
    const diagnostics: Diagnostic[] = [];
    const element = (extra: Props) => (
        <Host
            editorRef={editorRef}
            fieldRef={fieldRef}
            environment={environment}
            onDiagnostic={(diagnostic) => diagnostics.push(diagnostic)}
            {...props}
            {...extra}
        />
    );
    const view = render(element({}));
    act(() => environment.flushFrames());
    const handle = () => {
        if (editorRef.current === null) {
            throw new Error('no handle');
        }
        return editorRef.current;
    };
    const field = () => {
        if (fieldRef.current === null) {
            throw new Error('no field');
        }
        return fieldRef.current;
    };
    return {
        ...view,
        environment,
        handle,
        field,
        diagnostics,
        rerender: (extra: Props) => view.rerender(element(extra)),
        // Types at the end of the first paragraph, after `ab` and what was typed before.
        type: (typed: string) =>
            act(() => {
                setSelection(handle(), { text: 'ab', from: 2, to: 2 });
                typeText(handle(), typed);
            }),
        advance: (ms: number) => act(() => environment.advance(ms)),
    };
};

/** Lets every pending promise continuation run, as the browser does between tasks. */
const settle = () =>
    act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
    });
const statusText = () => screen.getByTestId('fondue-rich-text-editor-status').textContent;
const canUndo = (handle: EditorHandle<object>) =>
    (handle as unknown as Pick<RuntimeHandle, 'query'>).query('history.undo').enabled;
const textOf = (handle: EditorHandle<object>) => JSON.stringify(handle.getSnapshot().document.content);

/** Records each message the live region speaks from now on; each call returns those since the last. */
const listen = () => {
    const spoken: string[] = [];
    const collect = (records: readonly MutationRecord[]) => {
        for (const record of records) {
            spoken.push(...[...record.addedNodes].map((node) => (node.textContent ?? '').trim()));
        }
    };
    const observer = new MutationObserver(collect);
    observer.observe(screen.getByTestId('fondue-rich-text-editor-announcer'), { childList: true });
    return () => {
        collect(observer.takeRecords());
        return spoken.splice(0);
    };
};

/** Mounts a managed editor, types, and lets the autosave send its write, which waits for an answer. */
const mountSaving = (persistenceOptions: PersistenceOptions = {}) => {
    const { service, calls } = serviceOf();
    const mounted = mount({ services: { persistence: service }, persistenceOptions });
    mounted.type('c');
    mounted.advance(500);
    return { ...mounted, calls, service };
};
const lastCall = (calls: readonly Call[]) => {
    const call = calls.at(-1);
    if (call === undefined) {
        throw new Error('no save call');
    }
    return call;
};

const MESSAGES = {
    unsaved: 'Unsaved changes',
    saving: 'Saving…',
    saved: 'All changes saved',
    retrying: 'Saving failed. Trying again…',
    offline: 'Offline. Changes save when you are back online.',
    conflict: 'Someone else changed this content. Your changes are kept but not saved.',
    failed: 'Saving failed. Your changes are not saved.',
    forbidden: 'Not saved: you cannot edit this content. Ask for access or sign in again.',
    invalid: 'Not saved: the content was not accepted. Copy it to keep your changes.',
    'incompatible-writer': 'Not saved: this editor is out of date. Reload the page.',
};

describe('RichTextEditor with its default parts', () => {
    it('SPEC-rich-text-react/AC-001 renders the root, toolbar, surface and status around one runtime', async () => {
        // A definition and presentation pair stands in for a profile until TASK-rte-profiles (instruction 13).
        const presentation = defineReactPresentation({ toolbar: [['mark.bold.toggle']] });
        const { service } = serviceOf();
        const { type } = mount({ presentation, services: { persistence: service } });

        expect(probeRuntimes().views).toHaveLength(1);
        expect(probeRuntimes().installedFeatures).toHaveLength(1);
        const root = screen.getByTestId('fondue-rich-text-editor');
        expect(root).toContainElement(screen.getByRole('toolbar', { name: 'Text formatting' }));
        expect(root).toContainElement(screen.getByRole('textbox', { name: 'Notes' }));
        expect(root).toContainElement(screen.getByTestId('fondue-rich-text-editor-status'));
        // The status reads the same session the surface edits.
        type('c');
        await settle();
        expect(statusText()).toBe(MESSAGES.unsaved);
    });
});

describe('the defaultValue prop after mount', () => {
    it('SPEC-rich-text-persistence/AC-038 keeps the content and history when defaultValue changes', () => {
        const { handle, type, rerender } = mount();
        type('c');
        const before = handle().getSnapshot();

        rerender({ defaultValue: loaded('document-2', 'revision-9', para(text('other'))) });

        expect(handle().getSnapshot()).toBe(before);
        expect(textOf(handle())).toContain('"text":"abc"');
        expect(canUndo(handle())).toBe(true);
    });

    it('SPEC-rich-text-persistence/AC-039 warns once per change of the document ID or the document', () => {
        const { rerender, diagnostics } = mount();
        const changed = () => diagnostics.filter(({ code }) => code === 'react.default-value-changed');

        rerender({ defaultValue: loaded('document-2', null, para(text('ab'))) });
        rerender({ defaultValue: loaded('document-2', null, para(text('other'))) });
        // An equal record built again, or a new revision only, changes neither.
        rerender({ defaultValue: loaded('document-2', null, para(text('other'))) });
        rerender({ defaultValue: loaded('document-2', 'revision-2', para(text('other'))) });

        expect(changed()).toEqual([
            { code: 'react.default-value-changed', severity: 'warning', messageKey: 'react.default-value-changed' },
            { code: 'react.default-value-changed', severity: 'warning', messageKey: 'react.default-value-changed' },
        ]);
    });
});

describe('leaving the editor', () => {
    it('SPEC-rich-text-persistence/AC-042 registers no beforeunload, unload or pagehide listener', () => {
        const added = vi.spyOn(window, 'addEventListener');
        const { service } = serviceOf();
        const { type, unmount } = mount({ services: { persistence: service } });
        type('c');
        unmount();

        const types = added.mock.calls.map(([name]) => name);
        expect(types.filter((name) => ['beforeunload', 'unload', 'pagehide'].includes(name))).toEqual([]);
        added.mockRestore();
    });

    it('SPEC-rich-text-persistence/AC-043 starts no save when it unmounts while dirty', async () => {
        const { service } = serviceOf();
        const { type, unmount, environment } = mount({ services: { persistence: service } });
        type('c');

        unmount();
        act(() => environment.advance(60_000));
        await settle();

        expect(service.save).not.toHaveBeenCalled();
    });
});

describe('RichTextEditor.Status', () => {
    it.each([
        ['uncertain', MESSAGES.retrying, (call: Call) => call.fail()],
        ['conflict', MESSAGES.conflict, (call: Call) => call.answer({ status: 'conflict', currentRevision: 'r-9' })],
        [
            'error',
            MESSAGES.forbidden,
            (call: Call) => call.answer({ status: 'rejected', code: 'forbidden', diagnostics: [] }),
        ],
    ] as const)(
        'SPEC-rich-text-persistence/AC-046 announces the change to %s once through the polite live region',
        async (state, message, respond) => {
            const { handle, calls } = mountSaving();
            const heard = listen();

            respond(lastCall(calls));
            await settle();

            expect(handle().getSaveStatus().state).toBe(state);
            expect(heard()).toEqual([message]);
            expect(screen.getByTestId('fondue-rich-text-editor-announcer')).toHaveAttribute('aria-live', 'polite');
        },
    );

    it('SPEC-rich-text-persistence/AC-046 announces the change to offline once', async () => {
        const onLine = vi.spyOn(navigator, 'onLine', 'get');
        const { service } = serviceOf();
        const { handle, type, advance } = mount({ services: { persistence: service } });
        const heard = listen();
        onLine.mockReturnValue(false);

        type('c');
        advance(500);
        await settle();

        expect(handle().getSaveStatus().state).toBe('offline');
        expect(heard()).toEqual([MESSAGES.offline]);
        onLine.mockRestore();
    });

    it('SPEC-rich-text-persistence/AC-047 updates the text silently during 20 autosaves, then announces a commit once', async () => {
        const { service, calls } = serviceOf();
        const { handle, type, advance, environment } = mount({ services: { persistence: service } });
        const heard = listen();
        const shown: (string | null)[] = [];

        for (let save = 0; save < 20; save += 1) {
            type('c');
            shown.push(statusText());
            advance(500);
            shown.push(statusText());
            lastCall(calls).answer();
            await settle();
            shown.push(statusText());
        }

        expect(calls).toHaveLength(20);
        expect(new Set(shown)).toEqual(new Set([MESSAGES.unsaved, MESSAGES.saving, MESSAGES.saved]));
        expect(heard()).toEqual([]);

        type('d');
        let committed: Promise<CommitResult> | undefined;
        // `requestCommit` captures in an environment microtask, then writes its checkpoint at once.
        await act(async () => {
            committed = handle().requestCommit({ reason: 'manual' });
            await environment.flushMicrotasks();
        });
        lastCall(calls).answer();
        await settle();

        expect(await committed).toMatchObject({ status: 'acknowledged' });
        expect(heard()).toEqual([MESSAGES.saved]);
    });

    it('SPEC-rich-text-persistence/AC-047 announces clean once after leaving uncertain', async () => {
        const { calls, environment } = mountSaving();
        const heard = listen();

        lastCall(calls).fail();
        await settle();
        act(() => environment.advance(1200));
        lastCall(calls).answer();
        await settle();

        expect(calls).toHaveLength(2);
        expect(heard()).toEqual([MESSAGES.retrying, MESSAGES.saved]);
    });

    it('SPEC-rich-text-persistence/AC-046 announces retrying once for one outage with five retries', async () => {
        const { calls, advance } = mountSaving({ maxRetries: 5 });
        const heard = listen();

        for (let attempt = 0; attempt < 3; attempt += 1) {
            lastCall(calls).fail();
            await settle();
            // Past the third backoff with its jitter and before the write timeout, so one replay is in flight.
            advance(5_000);
        }
        expect(calls).toHaveLength(4);
        lastCall(calls).answer();
        await settle();

        expect(heard()).toEqual([MESSAGES.retrying, MESSAGES.saved]);
    });

    it('SPEC-rich-text-persistence/AC-047 announces nothing saved when a reset discards the changes after a rejection', async () => {
        const { service, calls } = serviceOf();
        const { field, type, advance } = mount({
            services: { persistence: service },
            defaultValue: loaded('document-1', 'revision-1', para(text('ab'))),
        });
        type('c');
        advance(500);
        lastCall(calls).answer({ status: 'rejected', code: 'forbidden', diagnostics: [] });
        await settle();
        const heard = listen();

        await act(async () => {
            await field().reset();
        });

        expect(heard()).toEqual([]);
    });

    it.each([
        ['unsaved', 'dirty', MESSAGES.unsaved, () => undefined],
        ['saving', 'saving', MESSAGES.saving, () => undefined],
        ['saved', 'clean', MESSAGES.saved, (call: Call) => call.answer()],
        ['retrying', 'uncertain', MESSAGES.retrying, (call: Call) => call.fail()],
        [
            'conflict',
            'conflict',
            MESSAGES.conflict,
            (call: Call) => call.answer({ status: 'conflict', currentRevision: 'r-9' }),
        ],
    ] as const)(
        'SPEC-rich-text-persistence/AC-048 shows %s for the state %s',
        async (_name, state, message, respond) => {
            const { handle, calls, type } = mountSaving();
            if (state === 'dirty') {
                lastCall(calls).answer();
                await settle();
                type('d');
            }

            respond(lastCall(calls));
            await settle();

            expect(handle().getSaveStatus().state).toBe(state);
            expect(statusText()).toBe(message);
        },
    );

    it('SPEC-rich-text-persistence/AC-048 shows offline and failed', async () => {
        const failing = mountSaving({ maxRetries: 0 });
        lastCall(failing.calls).fail();
        await settle();
        expect(failing.handle().getSaveStatus().state).toBe('error');
        expect(statusText()).toBe(MESSAGES.failed);
        failing.unmount();

        const onLine = vi.spyOn(navigator, 'onLine', 'get');
        onLine.mockReturnValue(false);
        const offline = mountSaving();
        expect(offline.handle().getSaveStatus().state).toBe('offline');
        expect(statusText()).toBe(MESSAGES.offline);
        onLine.mockRestore();
    });

    it('SPEC-rich-text-persistence/AC-048 shows saved only for what the host acknowledged', async () => {
        const { calls, type } = mountSaving();
        // A record no save has reached shows nothing, and a sent request is not saved yet.
        expect(statusText()).toBe(MESSAGES.saving);

        type('d');
        expect(statusText()).toBe(MESSAGES.saving);
        lastCall(calls).answer();
        await settle();

        // The acknowledged revision holds `c` only, so `d` is still unsaved.
        expect(statusText()).toBe(MESSAGES.unsaved);
    });

    it('SPEC-rich-text-persistence/AC-048 shows nothing for a new record that no save reached', () => {
        const { service } = serviceOf();
        mount({ services: { persistence: service } });

        expect(statusText()).toBe('');
    });

    it.each(['forbidden', 'invalid', 'incompatible-writer'] as const)(
        'SPEC-rich-text-persistence/AC-062 names the recovery of a %s rejection',
        async (code) => {
            const { calls } = mountSaving();

            lastCall(calls).answer({ status: 'rejected', code, diagnostics: [] });
            await settle();

            expect(statusText()).toBe(MESSAGES[code]);
        },
    );

    it('SPEC-rich-text-accessibility/AC-017 keeps the save status shown for 10 minutes', async () => {
        const { calls, advance } = mountSaving();
        lastCall(calls).answer({ status: 'conflict', currentRevision: 'r-9' });
        await settle();

        advance(10 * 60_000);

        expect(statusText()).toBe(MESSAGES.conflict);
    });
});

describe('useRichTextFormField', () => {
    it('SPEC-rich-text-persistence/AC-050 returns the committed document of a character typed in the same task', () => {
        const { handle, field } = mount();
        let value: unknown;

        act(() => {
            setSelection(handle(), { text: 'ab', from: 2, to: 2 });
            typeText(handle(), 'c');
            value = field().getValue();
        });

        expect(value).toBe(handle().getSnapshot().document);
        expect(JSON.stringify((value as { readonly content: unknown }).content)).toContain('"text":"abc"');
    });

    // The image stand-in: a leaf with an `assetId` (instruction 13).
    const image = { type: 'media_image', attrs: { nodeId: 'i1', assetId: 'a1', alt: 'Logo' } };
    const mention = {
        type: 'mention',
        attrs: { nodeId: 'm1', resourceType: 'user', resourceId: 'u1', labelSnapshot: 'Ada' },
    };
    it.each([
        ['whitespace-only', [para(text('    '))], { valid: false, reason: 'empty' }],
        ['hard-break-only', [para({ type: 'hard_break' }, { type: 'hard_break' })], { valid: false, reason: 'empty' }],
        [
            'empty list',
            [{ type: 'bullet_list', attrs: { marker: null }, content: [{ type: 'list_item', content: [para()] }] }],
            { valid: false, reason: 'empty' },
        ],
        ['image-only', [image], { valid: true }],
        ['mention-only', [para(mention)], { valid: true }],
        ['island-only', [{ type: 'quote_card', attrs: { author: 'Ada' } }], { valid: true }],
        ['data-manifest-atom-only', [para({ type: 'acme_badge', attrs: { label: 'New' } })], { valid: true }],
    ] as const)('SPEC-rich-text-persistence/AC-051 validates a required %s document', (_name, blocks, result) => {
        const { field } = mount({ required: true, defaultValue: loaded('document-1', null, ...blocks) });

        expect(field().validate()).toEqual(result);
    });

    it('SPEC-rich-text-persistence/AC-051 accepts a blank document that is not required', () => {
        const { field } = mount({ defaultValue: loaded('document-1', null, para()) });

        expect(field().validate()).toEqual({ valid: true });
    });

    it('SPEC-rich-text-persistence/AC-054 resets to the defaultValue record with empty history', async () => {
        const { service } = serviceOf();
        const { handle, field, type } = mount({ services: { persistence: service } });
        type('c');
        const replace = vi.spyOn(handle(), 'replaceDocument');

        let result: unknown;
        await act(async () => {
            result = await field().reset();
        });

        expect(replace).toHaveBeenCalledWith(
            expect.objectContaining({
                next: STORED,
                unsaved: { action: 'discard', confirmed: true },
                history: 'reset',
            }),
        );
        expect(result).toMatchObject({ status: 'replaced' });
        expect(handle().getSnapshot().document.content).toEqual(STORED.document.content);
        expect(canUndo(handle())).toBe(false);
        expect(service.save).not.toHaveBeenCalled();
    });
});

describe('useRichTextFormField reset to the current content', () => {
    it('SPEC-rich-text-persistence/AC-054 empties the history when the defaultValue record equals the content', async () => {
        const { handle, field, type, rerender } = mount();
        // The record as the editor encodes it, so a reset to it is an echo of the current content.
        rerender({
            defaultValue: { documentId: 'document-1', revision: null, document: handle().getSnapshot().document },
        });
        type('c');
        // Deletes the typed `c`, the paragraph's third character, as one more undo step.
        act(() => {
            const view = runtimeOf(handle())?.view;
            view?.dispatch(view.state.tr.delete(3, 4));
        });
        expect(canUndo(handle())).toBe(true);

        let result: unknown;
        await act(async () => {
            result = await field().reset();
        });

        expect(result).toMatchObject({ status: 'replaced' });
        expect(canUndo(handle())).toBe(false);
    });
});

describe('RichTextEditor in a form', () => {
    it('SPEC-rich-text-persistence/AC-056 adds no entry to the FormData of an enclosing form', () => {
        const environment = createTestEnvironment({ seed: 1 });
        const ref = createRef<EditorHandle<object>>();
        let submitted: [string, FormDataEntryValue][] = [];
        const onSubmit = (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            submitted = [...new FormData(event.currentTarget).entries()];
        };
        const { container } = render(
            <form onSubmit={onSubmit}>
                <input name="title" defaultValue="Notes" />
                <RichTextEditor
                    aria-label="Notes"
                    definition={definition}
                    defaultValue={STORED}
                    environment={environment}
                    ref={ref}
                />
            </form>,
        );
        act(() => environment.flushFrames());
        act(() => typeText(ref.current as EditorHandle<object>, 'c'));

        fireEvent.submit(container.querySelector('form') as HTMLFormElement);

        expect(submitted).toEqual([['title', 'Notes']]);
    });
});
