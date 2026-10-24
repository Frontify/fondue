/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { act, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createCodecs } from '#/codecs';
import { featuresById } from '#/features';
import { defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import {
    compileContentModel,
    type Diagnostic,
    decodeDocument,
    type ResourceLimits,
    type RichTextDocument,
    type RichTextSlice,
} from '#/model';
import { SLICE_TYPE } from '#/runtime/clipboard/slice';
import { runtimeOf } from '#/runtime/runtime';
import { paste, typeText } from '#/testing';

import { PERF_FEATURES } from '../../model/__tests__/fixtures/perf/documents';

// happy-dom's `URL` reads no files, so the folder is a path.
const HOSTILE = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'model', '__tests__', 'fixtures', 'hostile');
// A hostile input may take this long beyond a valid input of its size, or a limit must reject it.
const EXTRA_MS = 50;
const RUNS = 3;

interface Fixture {
    readonly name: string;
    readonly boundary: string;
    readonly limits?: Partial<ResourceLimits>;
    readonly input: unknown;
}
type Part = string | { readonly repeat: string; readonly times: number };

/** A value with each `{ text: [...] }` of parts joined, as the hostile fixtures keep their long strings small. */
const expand = (value: unknown): unknown => {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return value;
    }
    const entries = Object.entries(value);
    const [first] = entries;
    if (entries.length === 1 && first?.[0] === 'text' && Array.isArray(first[1])) {
        return (first[1] as readonly Part[])
            .map((part) => (typeof part === 'string' ? part : part.repeat.repeat(part.times)))
            .join('');
    }
    return Object.fromEntries(entries.map(([key, member]) => [key, expand(member)]));
};

const fixtures: readonly Fixture[] = readdirSync(HOSTILE)
    .filter((file) => file.endsWith('.json'))
    .sort()
    .map((file) => {
        const parsed = JSON.parse(readFileSync(join(HOSTILE, file), 'utf8')) as Omit<Fixture, 'name'>;
        return { ...parsed, name: file.replace('.json', ''), input: expand(parsed.input) };
    });
const inBoundary = (boundary: string) => fixtures.filter((fixture) => fixture.boundary === boundary);

const model = compileContentModel(featuresById(PERF_FEATURES), { id: 'test.hostile', version: 1 });

const now = performance.now.bind(performance);
/** The fastest of a few runs, so a pause on a busy machine does not count against the input. */
const fastest = (run: () => unknown): number => {
    let best = Number.POSITIVE_INFINITY;
    for (let index = 0; index < RUNS; index += 1) {
        const started = now();
        run();
        best = Math.min(best, now() - started);
    }
    return best;
};

const words = (length: number): string => 'brand '.repeat(Math.ceil(length / 6)).slice(0, length);

/** A valid stored document of about `size` characters of JSON, in the form `like` has: text or a parsed value. */
const validDocument = (size: number, like: unknown): unknown => {
    const paragraphs = Array.from({ length: Math.max(1, Math.floor(size / 1100)) }, () => ({
        type: 'paragraph',
        attrs: { lang: null },
        content: [{ type: 'text', text: words(1000) }],
    }));
    const document = {
        format: 'frontify.rich-text',
        formatVersion: 1,
        model: model.ref,
        requiredCapabilities: model.capabilities,
        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: paragraphs },
    };
    return typeof like === 'string' ? JSON.stringify(document) : document;
};
const sizeOf = (input: unknown): number => (typeof input === 'string' ? input.length : JSON.stringify(input).length);

const rejectedByLimit = (diagnostics: readonly Diagnostic[]): boolean =>
    diagnostics.some(({ code }) => code === 'format.limit-exceeded');

/** The stored document a text or parsed fixture holds. */
const stored = (document: unknown): RichTextDocument =>
    (typeof document === 'string' ? JSON.parse(document) : document) as RichTextDocument;

const mountWith = async (document: unknown, limits: Partial<ResourceLimits> = {}) => {
    const limited = defineEditor({ id: 'test.hostile', model, limits });
    const ref = { current: null as EditorHandle<object> | null };
    const rendered = render(
        <RichTextEditor
            aria-label="Notes"
            definition={limited}
            defaultValue={{ documentId: 'document-1', revision: null, document: stored(document) }}
            ref={(handle) => {
                ref.current = handle;
            }}
        />,
    );
    await act(async () => {
        vi.advanceTimersToNextFrame();
        await vi.advanceTimersByTimeAsync(1000);
    });
    const runtime = ref.current === null ? undefined : runtimeOf(ref.current);
    if (ref.current === null || runtime === undefined || runtime.view === undefined) {
        throw new Error('The editor did not mount.');
    }
    return { handle: ref.current, runtime, view: runtime.view, unmount: rendered.unmount };
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

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});
afterEach(() => {
    vi.useRealTimers();
});

describe('a hostile document', () => {
    it.each(inBoundary('loaded-document').map((fixture) => [fixture.name, fixture] as const))(
        'decodes %s within 50 ms beyond a valid document of its size, or a limit rejects it',
        (_name, { input, limits }) => {
            const options = { limits: limits ?? {} };
            const result = decodeDocument(input, model, options);
            if (result.status === 'blocked' && rejectedByLimit(result.diagnostics)) {
                return;
            }
            const valid = validDocument(sizeOf(input), input);

            expect(fastest(() => decodeDocument(input, model, options))).toBeLessThanOrEqual(
                fastest(() => decodeDocument(valid, model, options)) + EXTRA_MS,
            );
        },
        60_000,
    );

    it.each(inBoundary('loaded-document').map((fixture) => [fixture.name, fixture] as const))(
        'goes through the codecs for %s within 50 ms beyond a valid document of its size, or a limit rejects it',
        (_name, { input, limits }) => {
            const own = createCodecs(model, { limits: limits ?? {} });
            const result = decodeDocument(input, model, { limits: limits ?? {} });
            if (result.status !== 'editable') {
                return;
            }
            const valid = validDocument(sizeOf(input), input);
            const run = (document: unknown) => () => {
                own.toHTML(document as RichTextDocument);
                own.toPlainText(document as RichTextDocument);
                own.toMarkdown(document as RichTextDocument);
            };

            expect(fastest(run(input))).toBeLessThanOrEqual(fastest(run(valid)) + EXTRA_MS);
        },
        120_000,
    );

    it.each(
        inBoundary('loaded-document')
            .filter(({ name }) => ['slow-regex-strings', 'no-space-100000', 'every-mark-on-one-run'].includes(name))
            .map((fixture) => [fixture.name, fixture] as const),
    )(
        'runs the input rules over typing after %s within 50 ms beyond the same typing after a valid document of its size',
        async (_name, { input, limits }) => {
            const typed = async (document: unknown) => {
                const mounted = await mountWith(document, limits ?? {});
                const { doc } = mounted.runtime.state;
                // The caret goes to the end of the longest text block, where the rules read the text before it.
                let end = 1;
                let longest = 0;
                doc.descendants((node, position) => {
                    if (node.isTextblock && node.content.size > longest) {
                        longest = node.content.size;
                        end = position + 1 + node.content.size;
                    }
                    return true;
                });
                act(() => {
                    mounted.runtime.select({ anchor: end, head: end });
                });
                const started = now();
                act(() => {
                    typeText(mounted.handle, '*_~` 1. > # ');
                });
                const elapsed = now() - started;
                mounted.unmount();
                return elapsed;
            };
            const valid = validDocument(sizeOf(input), input);

            const hostile = await typed(input);
            expect(hostile).toBeLessThanOrEqual((await typed(valid)) + EXTRA_MS);
        },
        120_000,
    );
});

describe('hostile Markdown', () => {
    it.each(inBoundary('markdown-import').map((fixture) => [fixture.name, fixture] as const))(
        'imports %s within 50 ms beyond valid Markdown of its size, or a limit rejects it',
        (_name, { input, limits }) => {
            const { markdown } = input as { readonly markdown: string };
            const own = createCodecs(model, { limits: limits ?? {} });
            const result = own.fromMarkdown(markdown);
            if (result.status === 'blocked' && rejectedByLimit(result.diagnostics)) {
                return;
            }
            const valid = `${words(markdown.length - 1)}\n`;

            expect(fastest(() => own.fromMarkdown(markdown))).toBeLessThanOrEqual(
                fastest(() => own.fromMarkdown(valid)) + EXTRA_MS,
            );
        },
        60_000,
    );
});

describe('hostile pasted content', () => {
    const base = validDocument(1, {});

    const pasteTime = async (data: Readonly<Record<string, string>>) => {
        const mounted = await mountWith(base);
        const started = now();
        act(() => {
            paste(mounted.handle, inputOf(data));
        });
        const elapsed = now() - started;
        mounted.unmount();
        return elapsed;
    };

    it.each(inBoundary('paste-and-drop').map((fixture) => [fixture.name, fixture] as const))(
        'pastes %s within 50 ms beyond a valid paste of its size, or a limit rejects it',
        async (_name, { input }) => {
            const { mime } = input as { readonly mime: Readonly<Record<string, unknown>> };
            const data: Record<string, string> = {};
            for (const [type, value] of Object.entries(mime)) {
                data[type] = typeof value === 'string' ? value : JSON.stringify(value);
            }
            const size = Object.values(data).reduce((total, value) => total + value.length, 0);
            const valid = { 'text/html': `<p>${words(Math.max(1, size - 7))}</p>` };

            let hostile = Number.POSITIVE_INFINITY;
            let reference = Number.POSITIVE_INFINITY;
            for (let run = 0; run < RUNS; run += 1) {
                hostile = Math.min(hostile, await pasteTime(data));
                reference = Math.min(reference, await pasteTime(valid));
            }

            expect(hostile).toBeLessThanOrEqual(reference + EXTRA_MS);
        },
        120_000,
    );
});
