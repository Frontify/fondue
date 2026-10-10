/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { createHash } from 'node:crypto';

import { Node } from 'prosemirror-model';
import { afterEach, describe, expect, expectTypeOf, it, vi } from 'vitest';

import { compileDefinition } from '#/definition';
import { doc, envelope, type Json, mention, node, paragraph, text } from '#/features/__tests__/fixtures/documents';
import {
    vocabularyLink,
    vocabularyMarks,
    vocabularyModel,
    vocabularyTables,
} from '#/features/__tests__/fixtures/vocabulary';
import { core } from '#/features/core/feature';
import {
    compileContentModel,
    createEmptyDocument,
    decodeDocument,
    type DecodeResult,
    type DocumentOf,
    type FormatDiagnosticCode,
    hashDocument,
    type MarkOf,
    type RichTextDocument,
} from '#/model';

import { decodeToTree } from '../decode';
import { encodeTree } from '../encode';
import { canonicalJson } from '../hash';

const model = vocabularyModel();
const outcome = (result: DecodeResult) =>
    result.status === 'blocked'
        ? { status: result.status, reason: result.reason, codes: result.diagnostics.map(({ code }) => code) }
        : { status: result.status, codes: result.diagnostics.map(({ code }) => code) };
const unsupported = (code: FormatDiagnosticCode): ReturnType<typeof outcome> => ({
    status: 'blocked',
    reason: 'unsupported',
    codes: [code],
});
const valid = envelope(doc(paragraph(text('a'))));
const replace = (input: Json, key: string, value: Json | undefined): Json => {
    const copy: Record<string, Json> = { ...(input as Record<string, Json>) };
    if (value === undefined) {
        delete copy[key];
    } else {
        copy[key] = value;
    }
    return copy;
};

/** The island tree of an editable decode, and its encoding with the stored capabilities. */
const treeOf = (input: unknown) => {
    const { result, tree } = decodeToTree(input, model);
    if (tree === undefined) {
        throw new Error('expected an island tree');
    }
    const stored = (input as RichTextDocument).requiredCapabilities;
    const child = (index: number) => (tree.content === undefined ? undefined : tree.content[index]);
    return { result, tree, child, saved: encodeTree(tree, model, stored).document };
};

afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
});

describe('decode order', () => {
    const twoSteps: readonly (readonly [string, unknown, ReturnType<typeof outcome>])[] = [
        [
            'a parsed doc with attrs { lang: NaN }',
            envelope({ type: 'doc', attrs: { lang: Number.NaN }, content: [paragraph()] }),
            { status: 'blocked', reason: 'invalid', codes: ['format.not-json'] },
        ],
        [
            'a doc with a 9,000-unit lang',
            envelope({ type: 'doc', attrs: { lang: 'x'.repeat(9000) }, content: [paragraph()] }),
            { status: 'blocked', reason: 'limit-exceeded', codes: ['format.limit-exceeded'] },
        ],
        [
            'a formatVersion: 2 envelope with an extra key',
            { ...(envelope(doc(paragraph())) as object), formatVersion: 2, extra: true },
            unsupported('format.unknown-format-version'),
        ],
        [
            'a root of type foo',
            envelope({ type: 'foo', content: [paragraph()] }),
            { status: 'blocked', reason: 'invalid', codes: ['format.envelope-invalid'] },
        ],
        [
            'an unknown node with an extra key',
            envelope(doc({ type: 'acme_widget', extra: 1 })),
            { status: 'editable', codes: ['format.unknown-node'] },
        ],
        [
            'a mention with an unknown mark',
            envelope(doc(paragraph({ ...mention('m'), marks: [{ type: 'acme_glow' }] }))),
            { status: 'editable', codes: ['format.invalid-structure'] },
        ],
    ];

    it.each(twoSteps)('reports only the earlier step for %s', (_, input, expected) => {
        expect(outcome(decodeDocument(input, model))).toEqual(expected);
    });

    it('constructs no engine node for any input', () => {
        const { schema } = compileDefinition(
            compileContentModel([core(), vocabularyMarks()], { id: 'fixture.marks', version: 1 }),
        );
        const fromJSON = vi.spyOn(Node, 'fromJSON');
        for (const [, input] of twoSteps) {
            decodeDocument(input, model);
        }
        decodeDocument(JSON.stringify(valid), model);
        expect(decodeDocument(valid, model).status).toBe('editable');
        expect(fromJSON).not.toHaveBeenCalled();
        Node.fromJSON(schema, { type: 'doc', content: [{ type: 'paragraph' }] });
        expect(fromJSON).toHaveBeenCalled();
    });

    it('returns a parsed input as the document and parses a JSON text', () => {
        const result = decodeDocument(valid, model);
        expect(result.status === 'editable' && result.document).toEqual(valid);
        expect(decodeDocument(JSON.stringify(valid), model)).toEqual({
            status: 'editable',
            document: valid,
            diagnostics: [],
        });
    });
});

describe('envelope', () => {
    it.each([
        ['formatVersion: 2', 2],
        ["formatVersion: '1'", '1'],
        ['formatVersion: null', null],
    ])('blocks %s as unsupported', (_, version) => {
        const expected = unsupported('format.unknown-format-version');
        expect(outcome(decodeDocument(replace(valid, 'formatVersion', version), model))).toEqual(expected);
        const extra = replace(replace(valid, 'formatVersion', version), 'extra', 1);
        expect(outcome(decodeDocument(extra, model))).toEqual(expected);
    });

    it('blocks a document of another model as unsupported', () => {
        const other = replace(valid, 'model', { id: 'fixture.other', version: 1 });
        expect(outcome(decodeDocument(other, model))).toEqual(unsupported('format.wrong-model'));
    });

    const root = (content: Json) => replace(valid, 'content', content);
    const misshapen: readonly (readonly [string, Json])[] = [
        ['5', 5],
        ['[]', []],
        ['a missing format', replace(valid, 'format', undefined)],
        ['another format', replace(valid, 'format', 'frontify.rich-text-slice')],
        ['a missing formatVersion', replace(valid, 'formatVersion', undefined)],
        ['one extra envelope key', replace(valid, 'extra', true)],
        ['a missing model', replace(valid, 'model', undefined)],
        ['model: 5', replace(valid, 'model', 5)],
        ['a model with an extra key', replace(valid, 'model', { id: 'fixture.vocabulary', version: 1, name: 'x' })],
        ['a model with version 1.5', replace(valid, 'model', { id: 'fixture.vocabulary', version: 1.5 })],
        ["a capability with version: '1'", replace(valid, 'requiredCapabilities', [{ id: 'core', version: '1' }])],
        [
            'two capabilities with one id',
            replace(valid, 'requiredCapabilities', [
                { id: 'core', version: 1 },
                { id: 'core', version: 2 },
            ]),
        ],
        ['a paragraph root', root(paragraph(text('a')))],
        ['a doc with style next to attrs', root({ ...(doc(paragraph()) as object), style: 'x' })],
        ['a doc with marks', root({ ...(doc(paragraph()) as object), marks: [] })],
        ['a doc with content: []', root({ type: 'doc', content: [] })],
        ['a doc with content: {}', root({ type: 'doc', content: {} })],
        ['a doc with no content key', root({ type: 'doc' })],
        ['a doc with attrs: 5', root({ type: 'doc', attrs: 5, content: [paragraph()] })],
        ['a doc with attrs: null', root({ type: 'doc', attrs: null, content: [paragraph()] })],
        ['a doc with attrs: []', root({ type: 'doc', attrs: [], content: [paragraph()] })],
    ];

    it.each(misshapen)('blocks %s as format.envelope-invalid', (_, input) => {
        const result = decodeDocument(input, model);
        expect(outcome(result)).toEqual({ status: 'blocked', reason: 'invalid', codes: ['format.envelope-invalid'] });
        expect(result.status === 'blocked' && result.original).toBe(input);
    });

    it('counts any element of the root content as its required child', () => {
        expect(outcome(decodeDocument(root({ type: 'doc', content: [null] }), model))).toEqual({
            status: 'editable',
            codes: ['format.invalid-structure'],
        });
    });
});

describe('versions', () => {
    it('judges a newer-version document by its content alone', () => {
        const known = envelope(doc(paragraph(text('a'))), ['core'], 9);
        expect(outcome(decodeDocument(known, model))).toEqual({ status: 'editable', codes: [] });
        const newer = envelope(doc(paragraph(), { type: 'acme_callout', content: [paragraph()] }), ['core'], 9);
        const { result, child, saved } = treeOf(newer);
        expect(outcome(result)).toEqual({ status: 'editable', codes: ['format.unknown-node'] });
        expect(child(1)).toMatchObject({ type: 'unsupported_block', attrs: { feature: 'acme_callout' } });
        expect(saved.model).toEqual({ id: 'fixture.vocabulary', version: 1 });
        const stored = (newer as unknown as RichTextDocument).content.content;
        expect(saved.content.content).toEqual(stored);
        expect(saved.content.content?.[1]).toEqual(stored === undefined ? undefined : stored[1]);
    });

    it('warns for an unknown capability and keeps its content as islands', () => {
        const input = replace(envelope(doc(paragraph(), { type: 'acme_callout' })), 'requiredCapabilities', [
            { id: 'acme.callout', version: 1 },
            { id: 'core', version: 1 },
        ]);
        const { result, child } = treeOf(input);
        expect(result.diagnostics).toEqual([
            expect.objectContaining({
                code: 'format.unknown-capability',
                path: '/requiredCapabilities/0',
                details: { capability: 'acme.callout', version: 1 },
            }),
            expect.objectContaining({ code: 'format.unknown-node', path: '/content/content/1' }),
        ]);
        expect(child(1)).toMatchObject({ type: 'unsupported_block' });
    });

    it('warns for a higher capability version and keeps its new attribute', () => {
        const grid = node(
            'table',
            { nodeId: 't', caption: 'Q3' },
            node('table_row', undefined, node('table_cell', { colspan: 1, rowspan: 1, colwidth: null }, paragraph())),
        );
        const input = replace(envelope(doc(grid)), 'requiredCapabilities', [
            { id: 'core', version: 1 },
            { id: 'fixture.tables', version: 2 },
        ]);
        const { result, child, saved } = treeOf(input);
        expect(outcome(result)).toEqual({
            status: 'editable',
            codes: ['format.unknown-capability', 'format.unknown-attribute'],
        });
        expect(child(0)).toMatchObject({ attrs: { unknownAttributes: { caption: 'Q3' } } });
        expect(saved.requiredCapabilities).toEqual([
            { id: 'core', version: 1 },
            { id: 'fixture.tables', version: 2 },
        ]);
    });

    it('decodes a lower version of a known capability with no warning', () => {
        const input = replace(valid, 'requiredCapabilities', [{ id: 'core', version: 0 }]);
        expect(outcome(decodeDocument(input, model))).toEqual({ status: 'editable', codes: [] });
    });
});

describe('new documents', () => {
    it('never turns null, undefined or an empty string into a document', () => {
        for (const input of [null, undefined, '']) {
            expect(outcome(decodeDocument(input, model))).toEqual({
                status: 'blocked',
                reason: 'invalid',
                codes: ['format.not-json'],
            });
        }
    });

    it('creates a doc with one empty paragraph that decodes as editable', () => {
        const empty = createEmptyDocument(model);
        expect(empty).toEqual({
            format: 'frontify.rich-text',
            formatVersion: 1,
            model: { id: 'fixture.vocabulary', version: 1 },
            requiredCapabilities: [{ id: 'core', version: 1 }],
            content: doc(paragraph()),
        });
        expect(decodeDocument(empty, model)).toEqual({ status: 'editable', document: empty, diagnostics: [] });
    });
});

describe('text and hashing', () => {
    it('keeps NFC and NFD text byte for byte', () => {
        const forms = ['Caf\u00E9 \u1E9B\u0323', 'Cafe\u0301 \u017F\u0323\u0307'];
        const encoded = forms.map((form) => {
            const { tree } = decodeToTree(envelope(doc(paragraph(text(form)))), model);
            return tree === undefined ? '' : JSON.stringify(encodeTree(tree, model).document.content);
        });
        expect(encoded).toEqual(forms.map((form) => JSON.stringify(doc(paragraph(text(form))))));
        expect(encoded[0]).not.toBe(encoded[1]);
    });

    it('hashes key-permuted copies alike and reordered content apart, with no crypto global', () => {
        const document = envelope(doc(paragraph(text('a')), paragraph(text('b')))) as unknown as RichTextDocument;
        const permute = (value: unknown): unknown => {
            if (Array.isArray(value)) {
                return value.map(permute);
            }
            if (typeof value === 'object' && value !== null) {
                return Object.fromEntries(
                    Object.entries(value)
                        .reverse()
                        .map(([key, item]) => [key, permute(item)]),
                );
            }
            return value;
        };
        const permuted = permute(document) as RichTextDocument;
        const reversed = {
            ...document,
            content: { ...document.content, content: [...(document.content.content ?? [])].reverse() },
        };
        const expected = createHash('sha256')
            .update(canonicalJson(document as unknown as Json))
            .digest('hex');
        vi.stubGlobal('crypto', undefined);
        expect(JSON.stringify(permuted)).not.toBe(JSON.stringify(document));
        expect(hashDocument(document)).toBe(expected);
        expect(hashDocument(permuted)).toBe(expected);
        expect(hashDocument(reversed)).not.toBe(expected);
    });
});

describe('document types', () => {
    const features = [core(), vocabularyMarks()] as const;
    type Doc = DocumentOf<typeof features>;
    const withMark = (mark: MarkOf<typeof features>): Doc => ({
        format: 'frontify.rich-text',
        formatVersion: 1,
        model: { id: 'fixture.vocabulary', version: 1 },
        requiredCapabilities: [{ id: 'core', version: 1 }],
        content: {
            type: 'doc',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'a', marks: [mark] }] }],
        },
    });

    it('closes DocumentOf over the feature list and decodes a document typed with it', () => {
        // @ts-expect-error a misspelled mark
        withMark({ type: 'bodl' });
        // @ts-expect-error a mark from a feature not in the list
        withMark({ type: 'link', attrs: { href: '/a' } });
        const grown = [...features, vocabularyLink(), vocabularyTables()] as const;
        expectTypeOf<{ type: 'link'; attrs: { href: string } }>().toExtend<MarkOf<typeof grown>>();
        expectTypeOf<{ type: 'table_row' }>().toExtend<DocumentOf<typeof grown>['content']>();
        expectTypeOf<{ type: 'table_row' }>().not.toExtend<Doc['content']>();
        const typed: Doc = withMark({ type: 'bold' });
        expect(decodeDocument(typed, model)).toEqual({ status: 'editable', document: typed, diagnostics: [] });
    });
});
