/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import {
    blockquote,
    cell,
    doc,
    envelope,
    type Json,
    link,
    paragraph,
    row,
    table,
    text,
} from '#/features/__fixtures__/documents';
import { vocabularyModel } from '#/features/__fixtures__/vocabulary';
import { decodeDocument, defaultLimits, type ResourceLimits } from '#/model';

import { readInput } from './read';

const model = vocabularyModel();
const MIB = 1024 * 1024;
const limits = (overrides: Partial<ResourceLimits>): ResourceLimits => Object.assign({ ...defaultLimits }, overrides);
const bytesOf = (value: unknown) =>
    new TextEncoder().encode(typeof value === 'string' ? value : JSON.stringify(value)).length;
const limitOf = (input: unknown, overrides: Partial<ResourceLimits> = {}) => {
    const read = readInput(input, limits(overrides));
    return read.ok ? undefined : read.diagnostic.details?.limit;
};
/** A doc whose deepest node, a paragraph, sits at `depth`. */
const deep = (depth: number): Json => {
    let content: Json = paragraph();
    for (let level = depth - 1; level > 1; level -= 1) {
        content = blockquote(content);
    }
    return doc(content);
};
const nested = (levels: number): Json => (levels === 0 ? 'leaf' : { a: nested(levels - 1) });
const withAttrs = (attrs: Json): Json => envelope(doc({ type: 'paragraph', attrs }));

describe('decode input that is not JSON', () => {
    const sparse: unknown[] = [1];
    sparse[2] = 3;
    const cyclic: Record<string, unknown> = {};
    cyclic.self = cyclic;
    const values: readonly (readonly [string, unknown])[] = [
        ['NaN', Number.NaN],
        ['Infinity', Number.POSITIVE_INFINITY],
        ['a Date', new Date(0)],
        ['a sparse array', sparse],
        ['an array with an extra property', Object.assign([1], { extra: true })],
        ['a symbol key', { [Symbol('key')]: 1 }],
        ['a getter', Object.defineProperty({}, 'value', { enumerable: true, get: () => 1 })],
        ['a __proto__ key', JSON.parse('{"__proto__": {"polluted": true}}') as unknown],
        ['a function', () => 1],
        ['a class instance', new (class Box {})()],
        ['a cycle', cyclic],
    ];
    const notJson = (input: unknown) => {
        const result = decodeDocument(input, model);
        expect(result).toEqual({
            status: 'blocked',
            reason: 'invalid',
            original: input,
            diagnostics: [expect.objectContaining({ code: 'format.not-json', severity: 'error' })],
        });
        expect(result.status === 'blocked' && result.original).toBe(input);
    };

    it.each([
        ['null', null],
        ['undefined', undefined],
        ["''", ''],
        ["'null'", 'null'],
        ['text that is not JSON', '{"format":'],
        [
            'text with a repeated key',
            JSON.stringify(envelope(doc(paragraph()))).replace(
                '"formatVersion":1',
                '"formatVersion":1,"formatVersion":1',
            ),
        ],
        ['a repeated key written with an escape', '{"a":1,"\\u0061":2}'],
    ])('SPEC-rich-text-format/AC-004 blocks %s as format.not-json', (_, input) => {
        notJson(input);
    });

    it.each(values)('SPEC-rich-text-format/AC-004 blocks %s at the top and deep inside attrs', (_, value) => {
        notJson(value);
        notJson(withAttrs({ lang: null, extra: [{ deep: { deeper: value } }] } as unknown as Json));
    });

    it('SPEC-rich-text-format/AC-004 blocks an undefined member deep inside attrs', () => {
        notJson(withAttrs({ lang: null, extra: { deep: undefined } } as unknown as Json));
    });

    it('SPEC-rich-text-format/AC-004 blocks a repeated key deep inside attrs and decodes an Object.create(null) object', () => {
        const textWithRepeat = JSON.stringify(withAttrs({ lang: null, x: { a: 1 } })).replace('"a":1', '"a":1,"a":2');
        notJson(textWithRepeat);
        const attrs = Object.assign(Object.create(null) as object, {
            lang: null,
            styleId: null,
            align: null,
            indent: 0,
        });
        expect(decodeDocument(envelope(doc({ type: 'paragraph', attrs } as unknown as Json)), model)).toMatchObject({
            status: 'editable',
            diagnostics: [],
        });
    });

    it('SPEC-rich-text-format/AC-004 reads a rounded number as no fault', () => {
        expect(
            decodeDocument(
                '{"format":"frontify.rich-text","formatVersion":1.0000000000000001,"model":{"id":"fixture.vocabulary","version":1},"requiredCapabilities":[],"content":{"type":"doc","content":[{"type":"paragraph"}]}}',
                model,
            ).status,
        ).toBe('editable');
    });
});

describe('host objects', () => {
    const throwing = (trap: 'ownKeys' | 'getPrototypeOf' | 'getOwnPropertyDescriptor') =>
        new Proxy(
            { lang: null },
            {
                [trap]: () => {
                    throw new Error('trap');
                },
            },
        );
    const revoked = () => {
        const { proxy, revoke } = Proxy.revocable({}, {});
        revoke();
        return proxy;
    };
    const hostile: readonly (readonly [string, () => unknown])[] = [
        ['a Proxy whose ownKeys trap throws', () => throwing('ownKeys')],
        ['a Proxy whose getPrototypeOf trap throws', () => throwing('getPrototypeOf')],
        ['a Proxy whose getOwnPropertyDescriptor trap throws', () => throwing('getOwnPropertyDescriptor')],
        ['a revoked Proxy', revoked],
    ];

    it.each(hostile)(
        'SPEC-rich-text-quality/AC-005 SPEC-rich-text-format/AC-004 blocks %s at the top and inside attrs',
        (_, make) => {
            for (const input of [make(), withAttrs({ lang: null, extra: make() } as unknown as Json)]) {
                const result = decodeDocument(input, model);
                expect(result).toMatchObject({
                    status: 'blocked',
                    reason: 'invalid',
                    diagnostics: [{ code: 'format.not-json' }],
                });
                expect(result.status === 'blocked' && result.original).toBe(input);
            }
        },
    );

    it('SPEC-rich-text-quality/AC-005 follows the descriptor value of a lying Proxy and keeps no host object', () => {
        const target = { type: 'paragraph', content: [text('a')] };
        const lying = new Proxy(target, {
            get: (object, key): unknown => (key === 'type' ? 'acme_widget' : (Reflect.get(object, key) as unknown)),
        });
        const input = envelope({ type: 'doc', content: [lying as unknown as Json] });
        const result = decodeDocument(input, model);
        expect(result).toMatchObject({ status: 'editable', diagnostics: [] });
        const first = result.status === 'editable' ? result.document.content.content?.[0] : undefined;
        expect(first).toEqual(target);
        expect(first).not.toBe(lying);
        expect(first?.type).toBe('paragraph');
    });

    it('SPEC-rich-text-quality/AC-005 keeps a decoded result when the parsed input changes afterwards', () => {
        const input = JSON.parse(JSON.stringify(envelope(doc(paragraph(text('a')))))) as {
            content: { content: { content: { text: string }[] }[] };
        };
        const result = decodeDocument(input, model);
        const [block] = input.content.content;
        const [leaf] = block === undefined ? [] : block.content;
        if (leaf !== undefined) {
            leaf.text = 'changed';
        }
        expect(result.status === 'editable' && result.document.content).toEqual(doc(paragraph(text('a'))));
    });
});

describe('decode limits', () => {
    const tricky = envelope(doc(paragraph(text('é"\n\u0001😀\uD800 \\ ✓'))));

    it('SPEC-rich-text-format/AC-005 counts a parsed value as the UTF-8 bytes JSON.stringify writes, and a string as its own bytes', () => {
        const bytes = bytesOf(tricky);
        expect(limitOf(tricky, { maxDocumentBytes: bytes })).toBeUndefined();
        expect(limitOf(tricky, { maxDocumentBytes: bytes - 1 })).toBe('maxDocumentBytes');
        const spaced = JSON.stringify(tricky, null, 2);
        expect(limitOf(spaced, { maxDocumentBytes: bytesOf(spaced) })).toBeUndefined();
        expect(limitOf(spaced, { maxDocumentBytes: bytesOf(spaced) - 1 })).toBe('maxDocumentBytes');
    });

    it('SPEC-rich-text-format/AC-005 blocks a parsed value over the default byte limit without truncating it', () => {
        const input = envelope(doc(paragraph(text('x'.repeat(5 * MIB)))));
        const result = decodeDocument(input, model);
        expect(result).toMatchObject({
            status: 'blocked',
            reason: 'limit-exceeded',
            diagnostics: [{ code: 'format.limit-exceeded', details: { limit: 'maxDocumentBytes' } }],
        });
        expect(result.status === 'blocked' && result.original).toBe(input);
    });

    it('SPEC-rich-text-format/AC-005 counts nodes, the root included', () => {
        const input = envelope(doc(paragraph(text('a'))));
        expect(limitOf(input, { maxDocumentNodes: 3 })).toBeUndefined();
        const read = readInput(input, limits({ maxDocumentNodes: 2 }));
        expect(read).toMatchObject({
            ok: false,
            diagnostic: { path: '/content/content/0/content/0', details: { limit: 'maxDocumentNodes' } },
        });
    });

    it('SPEC-rich-text-format/AC-005 blocks a node at depth maxDepth + 1', () => {
        expect(decodeDocument(envelope(deep(64)), model).status).toBe('editable');
        expect(limitOf(envelope(deep(65)))).toBe('maxDepth');
    });

    it('SPEC-rich-text-format/AC-005 blocks an unknown attribute nested maxDepth + 1 levels below its node', () => {
        const at = (levels: number) => withAttrs({ lang: null, extra: nested(levels - 1) });
        expect(decodeDocument(at(64), model)).toMatchObject({
            status: 'editable',
            diagnostics: [{ code: 'format.unknown-attribute' }],
        });
        expect(limitOf(at(65))).toBe('maxDepth');
        expect(limitOf([[[nested(63)]]])).toBe('maxDepth');
        expect(limitOf([[nested(63)]])).toBeUndefined();
    });

    it('SPEC-rich-text-format/AC-005 counts the cells of each table', () => {
        const p = paragraph();
        const square = table('t', row(cell({}, p), cell({}, p)), row(cell({}, p), cell({}, p)));
        expect(limitOf(envelope(doc(square)), { maxTableCells: 4 })).toBeUndefined();
        const wide = table('t', row(cell({}, p), cell({}, p), cell({}, p)), row(cell({}, p), cell({}, p)));
        expect(limitOf(envelope(doc(wide)), { maxTableCells: 4 })).toBe('maxTableCells');
        expect(limitOf(envelope(doc(square, square)), { maxTableCells: 4 })).toBeUndefined();
    });

    it('SPEC-rich-text-format/AC-005 blocks a text one unit over maxTextLength', () => {
        expect(limitOf(envelope(doc(paragraph(text('x'.repeat(10))))), { maxTextLength: 10 })).toBeUndefined();
        expect(limitOf(envelope(doc(paragraph(text('x'.repeat(11))))), { maxTextLength: 10 })).toBe('maxTextLength');
    });

    it('SPEC-rich-text-format/AC-005 counts attribute strings at any depth, never an href or a non-object attrs', () => {
        expect(limitOf(withAttrs({ lang: null, title: 'x'.repeat(8192) }))).toBeUndefined();
        expect(limitOf(withAttrs({ lang: null, title: 'x'.repeat(8193) }))).toBe('maxAttributeLength');
        expect(limitOf(withAttrs({ lang: null, data: [{ note: 'x'.repeat(8193) }] }))).toBe('maxAttributeLength');
        const href = decodeDocument(
            envelope(doc(paragraph(text('a', link(`https://x.test/${'a'.repeat(9000)}`))))),
            model,
        );
        expect(href).toMatchObject({ status: 'editable', diagnostics: [{ code: 'format.unsafe-url' }] });
        const listed = decodeDocument(withAttrs(['x'.repeat(9000)]), model);
        expect(listed).toMatchObject({ status: 'editable', diagnostics: [{ code: 'format.invalid-structure' }] });
    });

    it.each([Number.NaN, -1, Number.POSITIVE_INFINITY])(
        'SPEC-rich-text-format/AC-005 keeps the default for a given limit of %s',
        (value) => {
            const options = { limits: { maxTextLength: value } };
            const long = decodeDocument(envelope(doc(paragraph(text('x'.repeat(1_000_001))))), model, options);
            expect(long).toMatchObject({ status: 'blocked', diagnostics: [{ details: { limit: 'maxTextLength' } }] });
            expect(decodeDocument(envelope(doc(paragraph(text('x'.repeat(1_000_000))))), model, options).status).toBe(
                'editable',
            );
        },
    );

    it('SPEC-rich-text-format/AC-005 stops at a NaN that comes before the byte limit', () => {
        expect(decodeDocument({ a: Number.NaN, b: 'x'.repeat(6 * MIB) }, model)).toMatchObject({
            diagnostics: [{ code: 'format.not-json' }],
        });
    });

    it('SPEC-rich-text-format/AC-005 reports maxDocumentNodes for the 50,001st node at depth 65', () => {
        const flat = Array.from({ length: 49_936 }, () => paragraph());
        const chain = (deep(65) as { readonly content: readonly Json[] }).content;
        const read = readInput(envelope(doc(...flat, ...chain)), defaultLimits);
        expect(read).toMatchObject({ ok: false, diagnostic: { details: { limit: 'maxDocumentNodes' } } });
    });

    it('SPEC-rich-text-format/AC-005 blocks at step 6 when joined text or the canonical encoding passes a limit', () => {
        const half = 'x'.repeat(600_000);
        const joined = decodeDocument(envelope(doc({ type: 'paragraph', content: [text(half), text(half)] })), model);
        expect(joined).toMatchObject({
            status: 'blocked',
            reason: 'limit-exceeded',
            diagnostics: [{ details: { limit: 'maxTextLength' } }],
        });
        const bare = Array.from({ length: 24_999 }, () => ({ type: 'paragraph', content: [text('y'.repeat(150))] }));
        const input = envelope({ type: 'doc', content: bare });
        expect(bytesOf(input)).toBeGreaterThan(4.85 * MIB);
        expect(bytesOf(input)).toBeLessThan(5 * MIB);
        expect(decodeDocument(input, model)).toMatchObject({
            status: 'blocked',
            reason: 'limit-exceeded',
            diagnostics: [{ details: { limit: 'maxDocumentBytes' } }],
        });
    });

    it('SPEC-rich-text-format/AC-005 counts an island in a clipboard slice at its island position', () => {
        const chain = (nodes: number): Json => (nodes === 1 ? paragraph() : blockquote(chain(nodes - 1)));
        const holder = (depth: number, inner: Json): Json =>
            depth === 1 ? inner : blockquote(holder(depth - 1, inner));
        const island = (original: Json): Json => ({
            type: 'unsupported_block',
            attrs: { original, feature: 'blockquote' },
        });
        const slice = (content: Json) => ({ format: 'frontify.rich-text-slice', formatVersion: 1, content: [content] });
        expect(readInput(slice(island(chain(40))), defaultLimits, true).ok).toBe(true);
        expect(readInput(slice(holder(24, island(chain(40)))), defaultLimits, true).ok).toBe(true);
        const read = readInput(slice(holder(30, island(chain(40)))), defaultLimits, true);
        expect(read).toMatchObject({ ok: false, diagnostic: { details: { limit: 'maxDepth' } } });
    });
});

describe('decode limit performance', () => {
    const fifty = 50 * MIB;
    const attributes = Object.fromEntries(
        Array.from({ length: 51_200 }, (_, index) => [`a${index}`, 'v'.repeat(1024)]),
    );
    const inputs: readonly (readonly [string, unknown])[] = [
        ['JSON text', `{"a":"${'x'.repeat(fifty)}"}`],
        ['a parsed value with one long text', envelope(doc(paragraph(text('x'.repeat(fifty)))))],
        ['a parsed value with many attributes', withAttrs(attributes)],
        [
            'a parsed value with many nodes',
            envelope({
                type: 'doc',
                content: Array.from({ length: 640_000 }, () => ({
                    type: 'paragraph',
                    content: [text('x'.repeat(48))],
                })),
            }),
        ],
        ['a parsed array of numbers', Array.from({ length: fifty / 2 }, () => 0)],
    ];

    it.each(inputs)(
        'SPEC-rich-text-format/AC-006 returns limit-exceeded for 50 MiB of %s in under 200 ms',
        (_, input) => {
            const started = performance.now();
            const result = decodeDocument(input, model);
            const elapsed = performance.now() - started;
            expect(result).toMatchObject({ status: 'blocked', reason: 'limit-exceeded' });
            expect(elapsed).toBeLessThan(200);
        },
    );
});
