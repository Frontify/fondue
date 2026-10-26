/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import {
    type CapabilityRef,
    type ContentModel,
    type ContentNodeJSON,
    type DecodeOptions,
    defaultLimits,
    type JsonValue,
    type ResourceLimits,
} from '#/model';
import { compiledModel } from '#/model/compile/compile';
import { brandDocumentModel, commentModel, documentModel, inlineModel } from '#/plugins';
import { storedIn } from '#/plugins/__tests__/fixtures/documents';
import { fcSettings, seeded } from '#/plugins/__tests__/fixtures/generated';
import { longestAttributeValue } from '#/react/compile/compileEditor';

import { decodeToTree } from '../document/decode';
import { encodeTree } from '../document/encode';
import { canonicalJson } from '../helpers/hash';

import { type JsonNode, modelDocumentArb } from './helpers/documents';

const PROFILES: readonly (readonly [string, ContentModel])[] = [
    ['inline', inlineModel],
    ['comment', commentModel],
    ['document', documentModel],
    ['brand-document', brandDocumentModel],
];
const FORMAT_CODES = [
    'format.not-json',
    'format.envelope-invalid',
    'format.unknown-format-version',
    'format.wrong-model',
    'format.unknown-capability',
    'format.capability-undeclared',
    'format.unknown-node',
    'format.unknown-mark',
    'format.unknown-attribute',
    'format.invalid-attribute',
    'format.invalid-structure',
    'format.limit-exceeded',
    'format.duplicate-occurrence-id',
    'format.unsafe-url',
];

const encoded = (input: unknown, model: ContentModel, limits?: Partial<ResourceLimits>) => {
    let options: DecodeOptions = {};
    if (limits !== undefined) {
        options = { limits };
    }

    const { result, tree } = decodeToTree(input, model, options);
    if (tree === undefined) {
        return { result, document: undefined };
    }

    let stored = (input as { requiredCapabilities?: unknown }).requiredCapabilities;
    if (!Array.isArray(stored)) {
        stored = [];
    }

    return { result, document: encodeTree(tree, model, stored as CapabilityRef[]).document };
};

const same = (a: unknown, b: unknown) => expect(canonicalJson(a as JsonValue)).toBe(canonicalJson(b as JsonValue));
/** A stored document of `model` around `root`, which may be any JSON value. */
const storedAround = (model: ContentModel, root: unknown) => ({
    ...storedIn(model, []),
    content: root as ContentNodeJSON,
});
/** A stored document of `model` with these blocks below a default root. */
const storedWith = (model: ContentModel, blocks: readonly JsonValue[]) =>
    storedIn(model, blocks as unknown as ContentNodeJSON[]);

/** Omits default attributes, empties no key, reverses marks and splits texts: the forms decode accepts and encoding undoes. */
const denormalize = (model: ContentModel, value: JsonValue): JsonValue => {
    const { nodes, marks } = compiledModel(model);
    const defaults = (declared: Readonly<Record<string, { default?: JsonValue }>>, attrs: JsonNode) =>
        Object.fromEntries(
            Object.entries(attrs).filter(([name, item]) => {
                const declaration = declared[name];

                return declaration === undefined || !('default' in declaration) || declaration.default !== item;
            }),
        );
    const visit = (input: JsonValue): JsonValue => {
        const node = { ...(input as JsonNode) };
        const declaration = nodes.find(({ name }) => name === node.type);
        if (declaration !== undefined && node.attrs !== undefined) {
            const declared = { ...declaration.declaration.attrs };
            for (const shared of declaration.shared) {
                declared[shared.name] = shared.declaration.value;
            }

            node.attrs = defaults(declared, node.attrs as JsonNode);
        }

        if (Array.isArray(node.marks)) {
            node.marks = [...(node.marks as JsonNode[])].reverse().map((mark) => {
                const markDeclaration = marks.find(({ name }) => name === mark.type);
                if (markDeclaration === undefined || mark.attrs === undefined) {
                    return mark;
                }

                return { ...mark, attrs: defaults(markDeclaration.declaration.attrs, mark.attrs as JsonNode) };
            });
        }

        if (Array.isArray(node.content)) {
            node.content = (node.content as JsonValue[]).flatMap((child) => {
                const copy = visit(child) as JsonNode;
                if (typeof copy.text !== 'string' || [...copy.text].length < 2) {
                    return [copy];
                }

                const chars = [...copy.text];

                return [
                    { ...copy, text: chars[0] ?? '' },
                    { ...copy, text: chars.slice(1).join('') },
                ];
            });
        } else if (node.type === 'paragraph') {
            node.content = [];
        }

        return node;
    };

    return visit(value);
};

describe.each(PROFILES)(seeded('the %s profile model'), (_, model) => {
    const documents = modelDocumentArb(model);

    it('decodes each generated document and encodes it back in canonical form, from canonical and denormalized input', () => {
        fc.assert(
            fc.property(documents, (stored) => {
                const denormalized = denormalize(model, stored.content as unknown as JsonValue);
                for (const input of [stored, storedAround(model, denormalized)]) {
                    const { result, document } = encoded(input, model);
                    expect(result).toMatchObject({ status: 'editable', diagnostics: [] });
                    same(document?.content, stored.content);
                }
            }),
            fcSettings(200),
        );
    });
});

describe('the document generator', () => {
    it('reaches every node and mark of each profile model', () => {
        for (const [, model] of PROFILES) {
            const seen = new Set<string>();
            const visit = (value: JsonValue) => {
                const node = value as JsonNode;
                seen.add(node.type as string);
                for (const mark of (node.marks ?? []) as JsonNode[]) {
                    seen.add(mark.type as string);
                }

                for (const child of (node.content ?? []) as JsonValue[]) {
                    visit(child);
                }
            };

            for (const { content } of fc.sample(modelDocumentArb(model), fcSettings(300))) {
                visit(content as unknown as JsonValue);
            }

            const { nodes, marks } = compiledModel(model);
            expect([...seen].sort()).toEqual([...nodes, ...marks].map(({ name }) => name).sort());
        }
    });
});

const LIMIT_NAMES = Object.keys(defaultLimits) as (keyof ResourceLimits)[];
const limitValue = (min: number, max: number) =>
    fc.oneof(
        { weight: 6, arbitrary: fc.integer({ min, max }) },
        { weight: 1, arbitrary: fc.constantFrom(Number.NaN, -1, Number.POSITIVE_INFINITY) },
    );
/** Small limits a definition of `model` accepts, so generated input meets them, and values decode must ignore. */
const limitsArb = (model: ContentModel) =>
    fc.option(
        fc.record(
            {
                maxDepth: limitValue(1, 12),
                maxTextLength: limitValue(0, 40),
                maxAttributeLength: limitValue(longestAttributeValue(model), 40),
                maxDocumentNodes: limitValue(1, 60),
                maxDocumentBytes: limitValue(200, 6000),
            },
            { requiredKeys: [] },
        ),
        { nil: undefined, freq: 1 },
    );

const isObject = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Decodes `input` and checks the result: a typed outcome with format diagnostics; a blocked one names its reason and
 * an error; an editable one encodes to a document that decodes again to itself.
 */
const checkDecode = (input: unknown, model: ContentModel, limits?: Partial<ResourceLimits>) => {
    const { result, document } = encoded(input, model, limits);
    for (const { code, severity, path } of result.diagnostics) {
        expect(FORMAT_CODES).toContain(code);
        expect(['info', 'warning', 'error']).toContain(severity);
        expect(path ?? '').toMatch(/^(\/.*)?$/s);
    }

    if (result.status === 'blocked') {
        expect(['invalid', 'unsupported', 'limit-exceeded']).toContain(result.reason);
        expect(result.diagnostics.some(({ severity }) => severity === 'error')).toBe(true);
        if (result.reason === 'limit-exceeded') {
            const exceeded = result.diagnostics.find(({ code }) => code === 'format.limit-exceeded');
            const details = exceeded?.details;
            expect(LIMIT_NAMES).toContain(details?.limit);
        }

        return result;
    }

    expect(result.status).toBe('editable');
    const again = encoded(document, model, limits);
    expect(again.result.status).toBe('editable');
    const againContent = again.document?.content;
    same(againContent, document?.content);

    return result;
};

/** Arbitrary JSON at node and mark positions: wrong types, unknown and island type names, missing and extra keys. */
const hostileArb = (model: ContentModel) => {
    const { nodes, marks } = compiledModel(model);
    const attributeNames = new Set(['href', 'nodeId', 'unknownAttributes', 'acme']);
    for (const member of [...nodes, ...marks]) {
        for (const name of Object.keys(member.declaration.attrs)) {
            attributeNames.add(name);
        }
    }

    const short = fc.string({ unit: fc.constantFrom('a', '😀', ' ', '\u0000', '\uD800', '<'), maxLength: 48 });
    const scalar = fc.oneof(
        fc.constantFrom(null, true, 0, -1, 1.5, '', 'javascript:alert(1)', 'https://frontify.com', '#ff0000', 'en'),
        fc.integer(),
        short,
    );
    // Decode blocks a `__proto__` key at any depth, so payloads meant to survive hold none.
    const plainJson = fc.jsonValue({ maxDepth: 3 }).filter((value) => !JSON.stringify(value).includes('"__proto__":'));
    const json = fc.oneof({ weight: 3, arbitrary: scalar }, { weight: 1, arbitrary: plainJson });
    const attributeName = fc.oneof(
        { weight: 20, arbitrary: fc.constantFrom(...attributeNames) },
        { weight: 1, arbitrary: fc.constantFrom('__proto__', 'constructor') },
    );
    const attributes = fc.dictionary(attributeName, json, { maxKeys: 4 });
    const attrs = fc.oneof({ weight: 4, arbitrary: attributes }, { weight: 1, arbitrary: json });
    const typeOf = (names: readonly string[]) =>
        fc.oneof({ weight: 4, arbitrary: fc.constantFrom(...names) }, { weight: 1, arbitrary: json });
    const mark = fc.oneof(
        {
            weight: 4,
            arbitrary: fc.record(
                { type: typeOf([...marks.map(({ name }) => name), 'unsupported_mark', 'acme_glow']), attrs },
                { requiredKeys: [] },
            ),
        },
        { weight: 1, arbitrary: json },
    );
    const nodeTypes = [...nodes.map(({ name }) => name), 'unsupported_block', 'unsupported_inline', 'acme_callout'];
    const { node } = fc.letrec<{ node: unknown }>((tie) => ({
        node: fc.oneof(
            { depthSize: 'small', withCrossShrink: true },
            json,
            fc.record(
                {
                    type: typeOf(nodeTypes),
                    attrs,
                    content: fc.oneof({ weight: 4, arbitrary: fc.array(tie('node'), { maxLength: 3 }) }, json),
                    marks: fc.oneof({ weight: 4, arbitrary: fc.array(mark, { maxLength: 3 }) }, json),
                    text: fc.oneof({ weight: 4, arbitrary: short }, json),
                    acme: json,
                },
                { requiredKeys: [] },
            ),
        ),
    }));

    return { node, attributes, json };
};

const positionsOf = (value: unknown): number => {
    if (Array.isArray(value)) {
        return 1 + value.reduce((sum: number, item) => sum + positionsOf(item), 0);
    }

    if (isObject(value)) {
        return 1 + Object.values(value).reduce((sum: number, item) => sum + positionsOf(item), 0);
    }

    return 1;
};

/** `value` with the JSON value at pre-order position `at`, modulo their count, replaced. */
const replaceAt = (value: unknown, at: number, replacement: unknown): unknown => {
    const index = at % positionsOf(value);
    let position = 0;
    const visit = (current: unknown): unknown => {
        position += 1;
        if (position - 1 === index) {
            return replacement;
        }

        if (Array.isArray(current)) {
            return current.map(visit);
        }

        if (isObject(current)) {
            return Object.fromEntries(Object.entries(current).map(([key, item]) => [key, visit(item)]));
        }

        return current;
    };

    return visit(value);
};

/** The envelope around `root`, or one with a broken header, or its JSON text, possibly cut short. */
const inputOf = (model: ContentModel, root: unknown, form: number, header: unknown) => {
    const envelope = storedAround(model, root);
    if (form === 0) {
        return JSON.stringify(envelope);
    }

    if (form === 1) {
        return JSON.stringify(envelope).slice(0, -1);
    }

    if (form === 2) {
        return Object.assign(envelope, header as object);
    }

    if (form === 3) {
        return root;
    }

    return envelope;
};

const headerArb = (json: fc.Arbitrary<unknown>) =>
    fc.record(
        {
            format: fc.oneof(fc.constant('frontify.rich-text-slice'), json),
            formatVersion: fc.oneof(fc.constantFrom(0, 2, '1'), json),
            model: fc.oneof(fc.constant({ id: 'frontify.other', version: 1 }), json),
            requiredCapabilities: json,
            acme: json,
        },
        { requiredKeys: [] },
    );

describe.each(PROFILES)(seeded('decoding hostile input for the %s profile model'), (_, model) => {
    const { node, attributes, json } = hostileArb(model);
    const documents = modelDocumentArb(model);
    const limits = limitsArb(model);

    it('returns a typed result for arbitrary JSON at the root, node and mark positions', () => {
        const doc = fc.record(
            { type: fc.constant('doc'), attrs: attributes, content: fc.array(node, { minLength: 1, maxLength: 4 }) },
            { requiredKeys: ['type', 'content'] },
        );
        const root = fc.oneof({ weight: 4, arbitrary: doc }, { weight: 1, arbitrary: node });
        fc.assert(
            fc.property(root, fc.nat(9), headerArb(json), limits, (value, form, header, given) => {
                checkDecode(inputOf(model, value, form, header), model, given);
            }),
            fcSettings(300),
        );
    });

    it('returns a typed result for valid documents with one value replaced', () => {
        fc.assert(
            fc.property(documents, fc.nat(), node, limits, (stored, index, replacement, given) => {
                const input = storedAround(model, replaceAt(stored.content, index, replacement));
                const result = checkDecode(input, model, given);
                expect(['editable', 'blocked']).toContain(result.status);
            }),
            fcSettings(300),
        );
    });

    it('keeps an unknown node, mark or attribute in place as an island or unknown attribute and writes it back unchanged', () => {
        const unknownKinds = fc.constantFrom('node', 'mark', 'attribute');
        const payload = fc.dictionary(fc.constantFrom('attrs', 'content', 'marks', 'text', 'acme'), json, {
            maxKeys: 3,
        });
        fc.assert(
            fc.property(documents, unknownKinds, fc.nat(), payload, (stored, kind, at, payloadJson) => {
                const extra = payloadJson as unknown as JsonNode;
                const slots: { node: JsonNode; parent: JsonNode | undefined }[] = [];
                const copy = structuredClone(stored.content) as unknown as JsonNode;
                const collect = (current: JsonNode, parent: JsonNode | undefined) => {
                    slots.push({ node: current, parent });
                    for (const child of (current.content ?? []) as JsonNode[]) {
                        collect(child, current);
                    }
                };

                collect(copy, undefined);
                const target = slots[at % slots.length] as (typeof slots)[number];
                let code = 'format.unknown-node';
                if (kind === 'node') {
                    fc.pre(target.node.type !== 'text');
                    const children = (target.node.content ?? []) as JsonValue[];
                    children.splice(at % (children.length + 1), 0, { ...extra, type: 'acme_widget' } as JsonValue);
                    target.node.content = children;
                } else if (kind === 'mark') {
                    fc.pre(target.parent !== undefined);
                    target.node.marks = [
                        ...((target.node.marks ?? []) as JsonValue[]),
                        { type: 'acme_glow', attrs: extra },
                    ];
                    code = '';
                } else {
                    fc.pre(target.node.type !== 'text');
                    target.node.attrs = { ...(target.node.attrs as JsonNode | undefined), acmeTone: extra };
                    code = 'format.unknown-attribute';
                }

                const { result, document } = encoded(storedAround(model, copy), model);
                expect(result.status).toBe('editable');
                expect(result.diagnostics.length).toBeGreaterThan(0);
                if (code !== '') {
                    expect(result.diagnostics.map((diagnostic) => diagnostic.code)).toContain(code);
                }

                same(document?.content, copy);
            }),
            fcSettings(300),
        );
    });

    it('blocks nodes, attribute values and marks nested past maxDepth, and keeps them at it', () => {
        const containers = compiledModel(model)
            .nodes.filter(({ declaration }) => declaration.group === 'block' && declaration.content === 'block+')
            .map(({ name }) => name);
        const chainTypes = fc.array(fc.constantFrom('acme_box', ...containers), { minLength: 70, maxLength: 70 });
        const nested = (levels: number): JsonValue => {
            let value: JsonValue = 'x';
            for (let level = 0; level < levels; level += 1) {
                value = [value];
            }

            return value;
        };

        fc.assert(
            fc.property(
                fc.option(fc.integer({ min: 1, max: 16 }), { nil: undefined }),
                fc.integer({ min: -2, max: 2 }),
                fc.constantFrom('nodes', 'attrs', 'marks'),
                chainTypes,
                (small, offset, where, types) => {
                    const maxDepth = small ?? defaultLimits.maxDepth;
                    const deepest = maxDepth + offset;
                    let block: JsonValue;
                    // The root is at depth 1, a block below it at 2 and a text in that block at 3.
                    if (where === 'nodes') {
                        fc.pre(deepest >= 2);
                        block = { type: types[0] ?? 'acme_box' };
                        for (let wraps = 1; wraps <= deepest - 2; wraps += 1) {
                            block = { type: types[wraps] ?? 'acme_box', content: [block] };
                        }
                    } else if (where === 'attrs') {
                        fc.pre(maxDepth >= 2 && deepest >= 1);
                        block = { type: 'paragraph', attrs: { acme: nested(deepest - 1) } };
                    } else {
                        fc.pre(maxDepth >= 3 && deepest >= 3);
                        const mark = { type: 'acme_glow', attrs: { acme: nested(deepest - 3) } };
                        block = { type: 'paragraph', content: [{ type: 'text', text: 'a', marks: [mark] }] };
                    }

                    const input = storedWith(model, [block]);
                    let limits: Partial<ResourceLimits> = {};
                    if (small !== undefined) {
                        limits = { maxDepth: small };
                    }

                    const result = checkDecode(input, model, limits);
                    if (deepest <= maxDepth) {
                        expect(result.status).toBe('editable');
                    } else {
                        expect(result).toMatchObject({ status: 'blocked', reason: 'limit-exceeded' });
                        expect(result.diagnostics).toContainEqual(
                            expect.objectContaining({ details: { limit: 'maxDepth' } }),
                        );
                    }
                },
            ),
            fcSettings(200),
        );
    });

    it('blocks texts, joined texts, attributes and node counts past their limits, keeps them at the limit, and never limits an href by maxAttributeLength', () => {
        const stringOf = (length: number, wide: boolean) => {
            if (!wide) {
                return 'a'.repeat(length);
            }

            let value = '😀'.repeat(Math.floor(length / 2));
            if (length % 2 === 1) {
                value += 'a';
            }

            return value;
        };

        const minimum = longestAttributeValue(model);
        fc.assert(
            fc.property(
                fc.integer({ min: 0, max: 40 }),
                fc.integer({ min: -2, max: 2 }),
                fc.constantFrom('text', 'joined', 'attribute', 'href', 'nodes'),
                fc.boolean(),
                (limit, offset, kind, wide) => {
                    const size = limit + offset;
                    let limits: Partial<ResourceLimits> = { maxTextLength: limit };
                    let name = 'maxTextLength';
                    let blocks: JsonValue[] = [];
                    if (kind === 'text') {
                        fc.pre(size >= 1);
                        blocks = [{ type: 'paragraph', content: [{ type: 'text', text: stringOf(size, wide) }] }];
                    } else if (kind === 'joined') {
                        fc.pre(size >= 2 && Math.ceil(size / 2) <= limit);
                        const half = Math.ceil(size / 2);
                        const parts = [stringOf(half, false), stringOf(size - half, false)];
                        blocks = [{ type: 'paragraph', content: parts.map((text) => ({ type: 'text', text })) }];
                    } else if (kind === 'attribute') {
                        fc.pre(limit >= minimum && size >= 0);
                        limits = { maxAttributeLength: limit };
                        name = 'maxAttributeLength';
                        blocks = [{ type: 'paragraph', attrs: { acme: stringOf(size, wide) } }];
                    } else if (kind === 'href') {
                        fc.pre(limit >= minimum);
                        limits = { maxAttributeLength: limit };
                        const href = `https://frontify.com/${'a'.repeat(limit + offset + 3)}`;
                        const link = { type: 'link', attrs: { href, openInNewWindow: false, styleId: null } };
                        blocks = [{ type: 'paragraph', content: [{ type: 'text', text: 'a', marks: [link] }] }];
                    } else {
                        fc.pre(size >= 2);
                        limits = { maxDocumentNodes: limit };
                        name = 'maxDocumentNodes';
                        blocks = Array.from({ length: size - 1 }, () => ({ type: 'paragraph' }));
                    }

                    const result = checkDecode(storedWith(model, blocks), model, limits);
                    if (kind === 'href' || size <= limit) {
                        expect(result.status).toBe('editable');
                    } else {
                        expect(result).toMatchObject({ status: 'blocked', reason: 'limit-exceeded' });
                        expect(result.diagnostics).toContainEqual(
                            expect.objectContaining({ details: { limit: name } }),
                        );
                    }
                },
            ),
            fcSettings(300),
        );
    });
});

describe(seeded('decoding huge strings at the default limits'), () => {
    it('keeps a text or attribute at its default limit and blocks one past it', () => {
        fc.assert(
            fc.property(fc.constantFrom('text', 'attribute'), fc.boolean(), (kind, over) => {
                let block: JsonValue;
                if (kind === 'text') {
                    const size = defaultLimits.maxTextLength + Number(over);
                    const text = '😀'.repeat(Math.floor(size / 2)) + 'a'.repeat(size % 2);
                    block = { type: 'paragraph', content: [{ type: 'text', text }] };
                } else {
                    block = {
                        type: 'paragraph',
                        attrs: { acme: 'a'.repeat(defaultLimits.maxAttributeLength + Number(over)) },
                    };
                }

                const result = checkDecode(storedWith(inlineModel, [block]), inlineModel);
                if (over) {
                    expect(result).toMatchObject({ status: 'blocked', reason: 'limit-exceeded' });
                } else {
                    expect(result.status).toBe('editable');
                }
            }),
            fcSettings(4),
        );
    });
});
