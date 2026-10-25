/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { act, render } from '@testing-library/react';
import { type EditorState, type Selection } from 'prosemirror-state';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createCodecs } from '#/codecs';
import { bold, code, core, featuresById, heading, italic, links, mediaImage, mentions, quote } from '#/features';
import { doc, envelope, paragraph, text } from '#/features/__tests__/fixtures/documents';
import { unitsOf } from '#/features/__tests__/fixtures/units';
import { bulletList } from '#/features/lists-bullet/feature';
import { listItem } from '#/features/lists-item/feature';
import { strike } from '#/features/marks-strike/feature';
import { subscript } from '#/features/marks-subscript/feature';
import { superscript } from '#/features/marks-superscript/feature';
import { underline } from '#/features/marks-underline/feature';
import {
    compileContentModel,
    DefinitionError,
    type Diagnostic,
    decodeDocument,
    migrateDocument,
    type ResourceLimits,
    type RichTextDocument,
    type RichTextSlice,
} from '#/model';
import { defineEditor, defineReactPresentation } from '#/react/define';
import { RichTextEditor } from '#/react/RichTextEditor';
import { type EditorHandle, type OperationMetric } from '#/react/types';
import { SLICE_TYPE } from '#/runtime/clipboard/slice';
import { canRedo, undoDepth } from '#/runtime/history';
import { runtimeOf } from '#/runtime/runtime';
import { type AuthoringPolicy } from '#/runtime/types';
import { paste, setSelection, typeText } from '#/testing';

// happy-dom's `URL` reads no files, so the folder is a path.
const HOSTILE = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'model', '__tests__', 'fixtures', 'hostile');
const CANARY = 'CANARY-4f9a2b';

const BOUNDARIES = [
    'remote-configuration',
    'loaded-document',
    'command-payload',
    'paste-and-drop',
    'markdown-import',
    'async-service-result',
] as const;
type Boundary = (typeof BOUNDARIES)[number];

interface Fixture {
    readonly name: string;
    readonly boundary: Boundary;
    readonly limits?: Partial<ResourceLimits>;
    readonly unresolved?: true;
    readonly input: unknown;
    readonly expected: Readonly<Record<string, unknown>>;
}
type Part = string | { readonly repeat: string; readonly times: number };

/** A value with each `{ text: [...] }` of parts joined, where a part is a string or `{ repeat, times }`, so the files stay small. */
const expand = (value: unknown): unknown => {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return value;
    }
    const entries = Object.entries(value);
    const [first] = entries;
    if (entries.length === 1 && first?.[0] === 'text' && Array.isArray(first[1])) {
        return (first[1] as readonly Part[])
            .map((part) => {
                if (typeof part === 'string') {
                    return part;
                }
                return part.repeat.repeat(part.times);
            })
            .join('');
    }
    return Object.fromEntries(entries.map(([key, member]) => [key, expand(member)]));
};

const fixtureFiles = readdirSync(HOSTILE)
    .filter((file) => file.endsWith('.json'))
    .sort();
const sources = fixtureFiles.map((file) => readFileSync(join(HOSTILE, file), 'utf8'));
const fixtures: readonly Fixture[] = fixtureFiles.map((file, index) => {
    const parsed = JSON.parse(sources[index] ?? '') as Omit<Fixture, 'name'>;
    return { ...parsed, name: file.replace('.json', ''), input: expand(parsed.input) };
});
const inBoundary = (boundary: Boundary) => fixtures.filter((fixture) => fixture.boundary === boundary);

const model = compileContentModel(
    [
        core(),
        heading(),
        quote(),
        bold(),
        italic(),
        underline(),
        strike(),
        code(),
        subscript(),
        superscript(),
        links(),
        mentions(),
        mediaImage(),
        listItem(),
        bulletList(),
    ],
    { id: 'test.hostile', version: 1 },
);

/** A host that answers every mention and image as deleted. */
const unresolved = defineReactPresentation({
    resolveReference: () => ({ status: 'unavailable', code: 'deleted' }),
    resolveAssetUrl: () => null,
});
const plain = defineReactPresentation({});
const presentationOf = ({ unresolved: fails }: Fixture) => {
    if (fails === true) {
        return unresolved;
    }
    return plain;
};

interface Published {
    readonly diagnostics: Diagnostic[];
    readonly metrics: OperationMetric[];
    readonly statuses: unknown[];
}
interface Held {
    readonly doc: EditorState['doc'];
    readonly selection: Selection;
    readonly undo: number;
    readonly redo: boolean;
}
/** What a boundary answered, whether it refused the input, and the editor state around the call. */
interface Outcome {
    readonly answer: Readonly<Record<string, unknown>>;
    readonly refused: boolean;
    readonly states?: { readonly before: Held; readonly after: Held };
    readonly published: Published;
    /** Every diagnostic and manifest a package API returned for the fixture. */
    readonly returned: readonly unknown[];
}

/** A ready editor of the shipped parts over `document`, with every diagnostic, metric and save status it publishes. */
const mount = async (fixture: Fixture, document: unknown) => {
    const definition = defineEditor({
        id: 'test.hostile',
        model,
        limits: fixture.limits ?? {},
        plugins: unitsOf(model),
    });
    const published: Published = { diagnostics: [], metrics: [], statuses: [] };
    let current: EditorHandle<object> | null = null;
    const seen = new WeakSet<object>();
    const rendered = render(
        <RichTextEditor
            aria-label="Notes"
            definition={definition}
            defaultValue={{ documentId: 'document-1', revision: null, document: document as RichTextDocument }}
            presentation={presentationOf(fixture)}
            ref={(handle) => {
                current = handle;
                // Subscribed as the handle appears, so the mount metric is seen too.
                if (handle !== null && !seen.has(handle)) {
                    seen.add(handle);
                    handle.subscribe('operationMetric', (metric) => published.metrics.push(metric));
                    handle.subscribe('saveStatusChange', (status) => published.statuses.push(status));
                }
            }}
            onDiagnostic={(diagnostic) => published.diagnostics.push(diagnostic)}
        />,
    );
    // Async, so the node views the editor portals into its surface have rendered and run their effects.
    await act(async () => {
        vi.advanceTimersToNextFrame();
        await vi.advanceTimersByTimeAsync(1000);
    });
    const handle = current as EditorHandle<object> | null;
    if (handle === null) {
        throw new Error('no editor');
    }
    const view = runtimeOf(handle)?.view;
    if (view === undefined) {
        throw new Error('no view');
    }
    return { handle, view, published, unmount: rendered.unmount };
};
type Mounted = Awaited<ReturnType<typeof mount>>;

const heldBy = ({ view }: Mounted): Held => ({
    doc: view.state.doc,
    selection: view.state.selection,
    undo: undoDepth(view.state),
    redo: canRedo(view.state),
});

const base = () => ({ ...envelope(doc(paragraph(text('ab')))), model: { id: 'test.hostile', version: 1 } });
/** An editor with one undo step and a caret at the end, so a change to the document, selection or history shows. */
const mountWithHistory = async (fixture: Fixture) => {
    const mounted = await mount(fixture, base());
    act(() => {
        typeText(mounted.handle, '!');
        setSelection(mounted.handle, { text: 'ab', from: 2, to: 2 });
    });
    return mounted;
};

const settle = () =>
    act(async () => {
        await vi.advanceTimersByTimeAsync(1000);
    });

const transfer = (data: Readonly<Record<string, string>>) => {
    const dataTransfer = new DataTransfer();
    for (const [type, value] of Object.entries(data)) {
        dataTransfer.setData(type, value);
    }
    return dataTransfer;
};
/** What `data` hands the paste order, as the `paste` helper takes it. */
const inputOf = (data: Readonly<Record<string, string>>): Parameters<typeof paste>[1] => {
    const html = data['text/html'] ?? '';
    const text = data['text/plain'] ?? '';
    const input = { html, text };
    const slice = data[SLICE_TYPE];
    if (slice === undefined) {
        return input;
    }
    return { ...input, slice: JSON.parse(slice) as RichTextSlice };
};
const pasteInto = ({ handle }: Mounted, data: Readonly<Record<string, string>>) => {
    act(() => {
        paste(handle, inputOf(data));
    });
};
const dropInto = ({ view }: Mounted, data: Readonly<Record<string, string>>) => {
    vi.spyOn(view, 'posAtCoords').mockReturnValue({ pos: 1, inside: 0 });
    const event = new DragEvent('drop', { bubbles: true, cancelable: true });
    // happy-dom's DragEvent ignores the `dataTransfer` init.
    Object.defineProperty(event, 'dataTransfer', { value: transfer(data) });
    act(() => {
        view.dom.dispatchEvent(event);
    });
};

/** Every `href` stored on a link mark of `value`. */
const hrefsOf = (value: unknown): string[] => {
    if (Array.isArray(value)) {
        return value.flatMap(hrefsOf);
    }
    if (typeof value !== 'object' || value === null) {
        return [];
    }
    const { type, attrs, content, marks } = value as Record<string, unknown>;
    const own: string[] = [];
    if (type === 'link') {
        own.push(String((attrs as { readonly href?: unknown }).href));
    }
    return [...own, ...hrefsOf(content), ...hrefsOf(marks)];
};

const throwsOf = (call: () => unknown): string => {
    try {
        call();
    } catch (error) {
        if (error instanceof DefinitionError) {
            return error.code;
        }
        throw error;
    }
    return 'nothing';
};

const decodedOf = (fixture: Fixture, input: unknown) => {
    const options = { limits: fixture.limits ?? {} };
    const decoded = decodeDocument(input, model, options);
    if (decoded.status === 'blocked') {
        return { answer: { status: decoded.status, reason: decoded.reason }, returned: decoded.diagnostics };
    }
    return { answer: { status: decoded.status }, returned: decoded.diagnostics };
};

const runRemoteConfiguration = async (fixture: Fixture): Promise<Outcome> => {
    const { call, argument } = fixture.input as { readonly call: string; readonly argument: unknown };
    if (call === 'featuresById') {
        const published = { diagnostics: [], metrics: [], statuses: [] };
        const throws = throwsOf(() => featuresById(argument as string[]));
        return { answer: { throws }, refused: throws !== 'nothing', published, returned: [] };
    }
    const mounted = await mountWithHistory(fixture);
    const before = heldBy(mounted);
    const policy = argument as AuthoringPolicy;
    const throws = throwsOf(() => mounted.handle.updatePolicy(policy));
    expect(throwsOf(() => defineEditor({ id: 'test.hostile', model, policy, plugins: unitsOf(model) }))).toBe(throws);
    const states = { before, after: heldBy(mounted) };
    mounted.unmount();
    return { answer: { throws }, refused: throws !== 'nothing', states, published: mounted.published, returned: [] };
};

const runLoadedDocument = async (fixture: Fixture): Promise<Outcome> => {
    const input = fixture.input as RichTextDocument;
    const { answer, returned } = decodedOf(fixture, input);
    const migration = migrateDocument(input, model);
    const manifests = [...returned, migration.manifest, ...migration.diagnostics];
    if (answer.status === 'editable') {
        const mounted = await mount(fixture, input);
        act(() => {
            typeText(mounted.handle, '!');
        });
        mounted.unmount();
        return { answer, refused: false, published: mounted.published, returned: manifests };
    }
    const mounted = await mountWithHistory(fixture);
    const before = heldBy(mounted);
    const { handle } = mounted;
    // A stored document as JSON text, and the same parsed.
    const forms: unknown[] = [input];
    if (typeof input === 'string') {
        forms.push(JSON.parse(input));
    }
    for (const document of forms) {
        const replaced = await handle.replaceDocument({
            expected: handle.getSnapshot().stamp,
            next: { documentId: 'document-2', revision: null, document: document as RichTextDocument },
            unsaved: { action: 'discard', confirmed: true },
            selection: 'start',
            history: 'reset',
        });
        expect(replaced).toEqual({ status: 'rejected', code: 'invalid-document' });
    }
    const states = { before, after: heldBy(mounted) };
    mounted.unmount();
    return { answer, refused: true, states, published: mounted.published, returned: manifests };
};

const runCommandPayload = async (fixture: Fixture): Promise<Outcome> => {
    const { command, payload } = fixture.input as { readonly command: string; readonly payload: unknown };
    const mounted = await mountWithHistory(fixture);
    const before = heldBy(mounted);
    const result = (
        mounted.handle as { execute: (id: string, payload: unknown) => { status: string; code?: string } }
    ).execute(command, payload);
    const states = { before, after: heldBy(mounted) };
    mounted.unmount();
    const answer = { status: result.status, code: result.code };
    return { answer, refused: result.status === 'rejected', states, published: mounted.published, returned: [] };
};

const runPasteAndDrop = async (fixture: Fixture): Promise<Outcome> => {
    const { mime } = fixture.input as { readonly mime: Readonly<Record<string, unknown>> };
    const data: Record<string, string> = {};
    for (const [type, value] of Object.entries(mime)) {
        if (typeof value === 'string') {
            data[type] = value;
        } else {
            data[type] = JSON.stringify(value);
        }
    }
    const answers: Record<string, unknown>[] = [];
    let outcome: Outcome | undefined;
    for (const gesture of [pasteInto, dropInto]) {
        const mounted = await mountWithHistory(fixture);
        const before = heldBy(mounted);
        const typed = mounted.view.state.doc.textContent;
        gesture(mounted, data);
        const after = heldBy(mounted);
        const rejection = mounted.published.diagnostics.find(({ code }) => code === 'clipboard.paste-rejected');
        let answer: Record<string, unknown>;
        if (rejection !== undefined && after.doc === before.doc) {
            answer = { rejected: (rejection.details as { readonly reason: string }).reason };
        } else {
            // The paste lands after the typed text, a drop before it.
            const inserted = mounted.view.state.doc.textContent.replace(typed, '');
            answer = { inserted: { text: inserted, hrefs: hrefsOf(mounted.handle.getSnapshot().document.content) } };
        }
        answers.push(answer);
        const refused = rejection !== undefined && after.doc === before.doc;
        outcome = { answer, refused, states: { before, after }, published: mounted.published, returned: [] };
        mounted.unmount();
    }
    // A paste and a drop give the same answer.
    expect(answers[1]).toEqual(answers[0]);
    return outcome as Outcome;
};

const runMarkdownImport = (fixture: Fixture): Outcome => {
    const { markdown } = fixture.input as { readonly markdown: string };
    const published = { diagnostics: [], metrics: [], statuses: [] };
    const result = createCodecs(model, { limits: fixture.limits ?? {} }).fromMarkdown(markdown);
    if (result.status === 'blocked') {
        const answer = { status: result.status, reason: result.reason };
        return { answer, refused: true, published, returned: result.diagnostics };
    }
    const hrefs = hrefsOf(result.document.content);
    return { answer: { status: result.status, hrefs }, refused: false, published, returned: result.diagnostics };
};

const runAsyncResult = async (fixture: Fixture): Promise<Outcome> => {
    const { command, result } = fixture.input as { readonly command: string; readonly result: unknown };
    const mounted = await mountWithHistory(fixture);
    const before = heldBy(mounted);
    const runtime = runtimeOf(mounted.handle);
    if (runtime === undefined) {
        throw new Error('no runtime');
    }
    runtime.startAsync({
        key: 'search',
        service: 'references',
        featureId: 'mentions',
        action: 'create',
        command,
        run: () => Promise.resolve(result),
    });
    await settle();
    const discarded = mounted.published.diagnostics.find(({ code }) => code === 'runtime.async-discarded');
    const details = discarded?.details as { readonly reason?: string } | undefined;
    const reason = details?.reason;
    const states = { before, after: heldBy(mounted) };
    mounted.unmount();
    return {
        answer: { discarded: reason },
        refused: reason !== undefined,
        states,
        published: mounted.published,
        returned: [],
    };
};

const RUNNERS: Readonly<Record<Boundary, (fixture: Fixture) => Outcome | Promise<Outcome>>> = {
    'remote-configuration': runRemoteConfiguration,
    'loaded-document': runLoadedDocument,
    'command-payload': runCommandPayload,
    'paste-and-drop': runPasteAndDrop,
    'markdown-import': runMarkdownImport,
    'async-service-result': runAsyncResult,
};
const run = (fixture: Fixture) => RUNNERS[fixture.boundary](fixture);

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});
afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
});

describe('the hostile fixtures', () => {
    it('hold one input for every row of the Trust boundaries table', () => {
        expect([...new Set(fixtures.map(({ boundary }) => boundary))].sort()).toEqual([...BOUNDARIES].sort());
    });

    it.each(fixtures.map(({ name }, index) => [name, sources[index]] as const))(
        'carries the canary string in %s',
        (_name, source) => {
            expect(source).toContain(CANARY);
        },
    );
});

describe.each(BOUNDARIES)('the %s boundary', (boundary) => {
    it.each(inBoundary(boundary).map((fixture) => [fixture.name, fixture] as const))(
        'rejects or filters %s before any state change',
        async (_name, fixture) => {
            const { answer, refused, states } = await run(fixture);

            expect(answer).toMatchObject(fixture.expected);
            if (refused && states !== undefined) {
                expect(states.after.doc).toBe(states.before.doc);
                expect(states.after.selection.eq(states.before.selection)).toBe(true);
                expect(states.after.undo).toBe(states.before.undo);
                expect(states.after.redo).toBe(states.before.redo);
            }
        },
    );
});

describe('the hostile fixtures run through the boundaries', () => {
    it('leave Object.prototype as it was', async () => {
        for (const fixture of fixtures) {
            await run(fixture);
        }

        expect(Object.keys(Object.prototype)).toEqual([]);
        expect(({} as { polluted?: unknown }).polluted).toBeUndefined();
    });
});

describe('diagnostic privacy', () => {
    const everything = (outcome: Outcome) => JSON.stringify([outcome.returned, outcome.published]);

    it('finds the canary where a diagnostic carries it', () => {
        const leaking: Diagnostic = {
            code: 'clipboard.paste-rejected',
            severity: 'warning',
            messageKey: 'clipboard.paste-rejected',
            details: { reason: CANARY },
        };

        expect(JSON.stringify([leaking])).toContain(CANARY);
    });

    it('sees the diagnostics of a mention that fails to resolve, so its scan is not empty', async () => {
        const fixture = fixtures.find(({ unresolved }) => unresolved === true);
        if (fixture === undefined) {
            throw new Error('no unresolved fixture');
        }

        const { published } = await run(fixture);

        expect(published.diagnostics.map(({ code, details }) => [code, details])).toContainEqual([
            'reference.unavailable',
            { code: 'deleted' },
        ]);
    });

    it.each(fixtures.map((fixture) => [fixture.name, fixture] as const))(
        'puts no canary in a diagnostic, manifest or save status of %s',
        async (_name, fixture) => {
            const outcome = await run(fixture);

            expect(everything(outcome)).not.toContain(CANARY);
        },
    );
});

describe('operation metrics', () => {
    const FIELDS = [
        'capabilityIds',
        'durationMs',
        'failureCode',
        'kind',
        'model',
        'normalizationTransactions',
        'packageVersion',
        'session',
    ];

    it.each(fixtures.map((fixture) => [fixture.name, fixture] as const))(
        'hold only the OperationMetric fields, with no canary, in %s',
        async (_name, fixture) => {
            const { published } = await run(fixture);

            for (const metric of published.metrics) {
                expect(Object.keys(metric).sort()).toEqual(FIELDS);
                expect(JSON.stringify(metric)).not.toContain(CANARY);
            }
        },
    );

    it('are published for a mount, a commit, a paste and a rejected replacement of the fixtures, so the scan is not empty', async () => {
        const kinds = new Set<string>();
        for (const fixture of fixtures) {
            const { published } = await run(fixture);
            for (const { kind } of published.metrics) {
                kinds.add(kind);
            }
        }

        expect([...kinds].sort()).toEqual(['commit', 'mount', 'paste', 'replace']);
    });
});
