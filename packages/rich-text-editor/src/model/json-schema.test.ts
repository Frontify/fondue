/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readdirSync, readFileSync } from 'node:fs';

import Ajv2020, { type ValidateFunction } from 'ajv/dist/2020';
import { describe, expect, it } from 'vitest';

import {
    blockquote,
    codeBlock,
    doc,
    envelope,
    type Json,
    link,
    mark,
    mention,
    node,
    paragraph,
    text,
} from '#/features/__fixtures__/documents';
import { vocabularyFeatures, vocabularyModel } from '#/features/__fixtures__/vocabulary';
import {
    type AttributeDeclarations,
    type Feature,
    featureFromManifest,
    type JsonObject,
    toJsonSchema,
    type ValueDeclaration,
} from '#/model';

import { attributesOf, compiledModel } from './compile';
import { featureInternals } from './feature';

const ajvOf = () => new Ajv2020({ strict: true, strictTypes: false, allowUnionTypes: true });
const compile = (schema: JsonObject) => ajvOf().compile(schema);
const fixturesIn = (directory: string) =>
    readdirSync(new URL(`../../fixtures/model/${directory}`, import.meta.url)).map(
        (name) =>
            [
                name,
                JSON.parse(
                    readFileSync(new URL(`../../fixtures/model/${directory}/${name}`, import.meta.url), 'utf8'),
                ) as Json,
            ] as const,
    );

type Record_ = Record<string, Json>;
/** A copy of `target` with each change applied; an `undefined` change removes the key. */
const merge = (target: Json, changes: Readonly<Record<string, Json | undefined>>): Json => {
    const next = { ...(target as Record_) };
    for (const [key, value] of Object.entries(changes)) {
        if (value === undefined) {
            delete next[key];
        } else {
            next[key] = value;
        }
    }
    return next;
};

const model = vocabularyModel();
const schema = toJsonSchema(model);
const validate = compile(schema);
const accepts = (value: unknown) => validate(value);
const content = (...blocks: readonly Json[]) => envelope(doc(...blocks));
const headingWith = (changes: Record_) =>
    node('heading', { nodeId: 'h', level: 2, lang: null, styleId: null, align: null, indent: 0, ...changes });

const walk = (value: Json, visit: (found: Record_) => void) => {
    if (Array.isArray(value)) {
        for (const item of value as readonly Json[]) {
            walk(item, visit);
        }
    } else if (typeof value === 'object' && value !== null) {
        visit(value as Record_);
        for (const item of Object.values(value)) {
            walk(item, visit);
        }
    }
};
const objectsIn = (value: Json, found: Record_[] = []) => {
    walk(value, (item) => found.push(item));
    return found;
};

describe('toJsonSchema of a model', () => {
    it('SPEC-rich-text-format/AC-002 returns a 2020-12 document that compiles under strict Ajv', () => {
        expect(schema.$schema).toBe('https://json-schema.org/draft/2020-12/schema');
        expect(Object.keys(schema.$defs as object)).toEqual(expect.arrayContaining(['n.doc', 'n.paragraph', 'm.link']));
        expect(typeof validate).toBe('function');
    });

    it('SPEC-rich-text-format/AC-002 puts additionalProperties: false on every object schema', () => {
        const objects = objectsIn(schema).filter((item) => item.type === 'object' && item.properties !== undefined);
        expect(objects.length).toBeGreaterThan(50);
        for (const item of objects) {
            expect(item.additionalProperties).toBe(false);
        }
    });

    it('SPEC-rich-text-format/AC-002 writes the same JSON for the same model and plain JSON only', () => {
        const again = JSON.stringify(toJsonSchema(vocabularyModel()));
        expect(again).toBe(JSON.stringify(schema));
        expect(JSON.parse(again)).toEqual(schema);
    });

    it.each(fixturesIn('valid'))('SPEC-rich-text-format/AC-002 accepts the valid fixture %s', (_, fixture) => {
        expect(accepts(fixture), JSON.stringify(validate.errors)).toBe(true);
    });

    it.each(fixturesIn('invalid'))('SPEC-rich-text-format/AC-002 rejects the invalid fixture %s', (_, fixture) => {
        expect(accepts(fixture)).toBe(false);
    });

    it('SPEC-rich-text-format/AC-002 rejects an island, which only decodeDocument keeps', () => {
        const island = { type: 'unsupported_block', attrs: { original: { type: 'x' }, feature: 'x' } };
        expect(accepts(content(island))).toBe(false);
        expect(accepts(content(paragraph(text('a', { type: 'unsupported_mark', attrs: { original: 1 } }))))).toBe(
            false,
        );
    });

    it('SPEC-rich-text-format/AC-002 describes child types and not their order or count', () => {
        const heading = node('heading', { nodeId: 'h', level: 1, lang: null, styleId: null, align: null, indent: 0 });
        const item = node('list_item', undefined, heading);
        // The content expression `paragraph block*` is not expressible, so decode alone islands this list.
        expect(accepts(content(node('bullet_list', { marker: null }, item)))).toBe(true);
        expect(accepts(content(blockquote(node('column_break'))))).toBe(false);
        expect(accepts(content(node('horizontal_rule', undefined, paragraph())))).toBe(false);
    });

    it.each([
        ['bold on a paragraph', content({ ...paragraph(), marks: [mark('bold')] }), false],
        ['bold on a hard break', content(paragraph({ type: 'hard_break', marks: [mark('bold')] })), true],
        ['bold on code block text', content(codeBlock(text('x', mark('bold')))), false],
        ['plain code block text', content(codeBlock(text('x'))), true],
        ['bold on a mention', content(paragraph({ ...mention('m'), marks: [mark('bold')] })), false],
        ['italic under a bold-only node', content(node('bold_only', undefined, text('a', mark('italic')))), false],
        ['bold under a bold-only node', content(node('bold_only', undefined, text('a', mark('bold')))), true],
        ['bold under a link-only node', content(node('link_only', undefined, text('a', mark('bold')))), false],
        ['a link under a link-only node', content(node('link_only', undefined, text('a', link('/a')))), true],
        ['an unknown mark', content(paragraph(text('a', mark('sparkle')))), false],
        ['a mark with attrs 5', content(paragraph(text('a', { type: 'bold', attrs: 5 }))), false],
        [
            'a font_color with only tokenId',
            content(paragraph(text('a', mark('font_color', { tokenId: 't', value: null })))),
            true,
        ],
        [
            'a font_color with only value',
            content(paragraph(text('a', mark('font_color', { tokenId: null, value: '#aabbcc' })))),
            true,
        ],
        [
            'a font_color with both null',
            content(paragraph(text('a', mark('font_color', { tokenId: null, value: null })))),
            false,
        ],
        [
            'a font_color with both set',
            content(paragraph(text('a', mark('font_color', { tokenId: 't', value: '#aabbcc' })))),
            false,
        ],
        ['a font_color with no attrs', content(paragraph(text('a', mark('font_color')))), false],
        ['a heading with no level', content(node('heading', { nodeId: 'h' })), false],
        ['a heading with no attrs', content(node('heading')), false],
        ['a paragraph with no attrs', content(node('paragraph')), true],
        ['a paragraph with a text child of a missing text', content(paragraph({ type: 'text' })), false],
        ['a heading with a null level', content(headingWith({ level: null })), false],
        ['a heading with a null nodeId', content(headingWith({ nodeId: null })), false],
        ['a heading with a null indent', content(headingWith({ indent: null })), false],
        ['a heading with a null lang', content(headingWith({ lang: null })), true],
    ] as const)('SPEC-rich-text-format/AC-002 judges %s', (_, value, expected) => {
        expect(accepts(value)).toBe(expected);
    });

    it.each([
        ['marks: [] on a paragraph', content({ ...paragraph(), marks: [] }), true],
        ['marks: [] on a mention', content(paragraph({ ...mention('m'), marks: [] })), true],
        ['marks: [] on text', content(paragraph({ ...text('a'), marks: [] })), true],
        ['marks: [] on code block text', content(codeBlock({ ...text('a'), marks: [] })), true],
        ['content: [] on a horizontal_rule', content({ ...node('horizontal_rule'), content: [] }), true],
        ['a child on a horizontal_rule', content(node('horizontal_rule', undefined, paragraph())), false],
        ['a mark on a paragraph', content({ ...paragraph(), marks: [mark('bold')] }), false],
        ['content: [] on text', content(paragraph({ ...text('a'), content: [] })), false],
        ['marks: [] on a doc', envelope(merge(doc(paragraph()), { marks: [] })), false],
    ] as const)('SPEC-rich-text-format/AC-002 judges an empty array: %s', (_, value, expected) => {
        expect(accepts(value)).toBe(expected);
    });
});

/** A value that meets `declaration`, and one outside it, or `undefined` where JSON Schema cannot tell. */
const sample = (declaration: ValueDeclaration): Json => {
    switch (declaration.type) {
        case 'string':
            return 'x'.repeat(declaration.minLength ?? 1);
        case 'url':
            return 'https://frontify.com';
        case 'id':
            return 'a-b';
        case 'color':
            return '#aabbcc';
        case 'language':
            return 'de-CH';
        case 'integer':
        case 'number':
            return declaration.min === undefined ? (declaration.max ?? 1) : declaration.min;
        case 'boolean':
            return true;
        case 'enum':
            return declaration.values[0] ?? '';
        case 'list':
            return [];
        case 'json':
            return { a: 1 };
    }
};
const outside = (declaration: ValueDeclaration): Json | undefined => {
    switch (declaration.type) {
        case 'string':
            if (declaration.maxLength !== undefined) {
                return 'x'.repeat(declaration.maxLength + 1);
            }
            return declaration.minLength ? '' : 5;
        case 'url':
            return 'x'.repeat(2049);
        case 'id':
            return 'Has Space';
        case 'color':
            return '#FFF';
        case 'language':
            return 'en_US';
        case 'integer':
        case 'number':
            if (declaration.min !== undefined) {
                return declaration.min - 1;
            }
            if (declaration.max !== undefined) {
                return declaration.max + 1;
            }
            return declaration.type === 'integer' ? 1.5 : 'x';
        case 'boolean':
            return 'yes';
        case 'enum':
            return 'nope';
        case 'list': {
            if (declaration.maxItems !== undefined) {
                return Array.from({ length: declaration.maxItems + 1 }, () => sample(declaration.items));
            }
            const item = outside(declaration.items);
            return item === undefined ? 'not a list' : [item];
        }
        case 'json':
            return declaration.nullable ? undefined : null;
    }
};

const declarationOf = (feature: Feature) => {
    const internals = featureInternals(feature);
    if (internals === undefined) {
        throw new Error('not a feature');
    }
    return internals.declaration;
};
/** The nodes, then the marks, that a feature declares. */
const membersOf = (feature: Feature) => {
    const { nodes = {}, marks = {} } = declarationOf(feature);
    return [...Object.entries(nodes), ...Object.entries(marks)];
};

/**
 * Each declared attribute with one out-of-range value, and each required one missing, fails `check`, and
 * the instance with every attribute at a valid value passes. Returns the attributes whose range JSON Schema
 * cannot tell (a nullable `json` value).
 */
const faultsOf = (
    check: ValidateFunction,
    type: string,
    attrs: AttributeDeclarations,
    exactlyOne: readonly string[] = [],
) => {
    const extra = type === 'doc' ? { content: [paragraph()] } : {};
    const entries = Object.entries(attrs);
    const valueOf = (name: string): Json => {
        const declaration = attrs[name];
        return declaration === undefined ? null : sample(declaration);
    };
    /** Every attribute valid, and of the `exactlyOne` names only `keep` set. */
    const valid = (keep?: string) =>
        Object.fromEntries(
            entries.map(([name]) => [name, exactlyOne.includes(name) && name !== keep ? null : valueOf(name)]),
        );
    const run = (attributes: Record_) => check({ type, attrs: attributes, ...extra });
    const misses: string[] = [];
    expect(run(valid(exactlyOne[0])), `${type} with valid attributes`).toBe(true);
    for (const [name, declaration] of entries) {
        const bad = outside(declaration);
        // The other `exactlyOne` names stay null, so only the attribute under test can break the node.
        const alone = valid(exactlyOne.includes(name) ? name : exactlyOne[0]);
        if (bad === undefined) {
            misses.push(`${type}.${name}`);
        } else {
            expect(run({ ...alone, [name]: bad }), `${type}.${name} = ${JSON.stringify(bad).slice(0, 20)}`).toBe(false);
        }
        if (!('default' in declaration)) {
            const rest = Object.fromEntries(Object.entries(alone).filter(([key]) => key !== name));
            expect(run(rest), `${type} without ${name}`).toBe(false);
        }
    }
    if (exactlyOne.length > 0) {
        const all = Object.fromEntries(entries.map(([name]) => [name, valueOf(name)]));
        expect(run(valid()), `${type} none set`).toBe(false);
        expect(run(all), `${type} all set`).toBe(false);
    }
    return misses;
};

describe('toJsonSchema of a model, attribute by attribute', () => {
    it('SPEC-rich-text-format/AC-002 rejects one out-of-range value per declared attribute of every node and mark', () => {
        const compiled = compiledModel(model);
        const defs = schema.$defs as Record<string, JsonObject>;
        const checker = ajvOf();
        checker.addSchema(schema, 'model');
        const defOf = (prefix: string) => {
            const key = Object.keys(defs).find((name) => name === prefix || name.startsWith(`${prefix}@`));
            return checker.getSchema(`model#/$defs/${encodeURIComponent(key ?? prefix)}`) as ValidateFunction;
        };
        let checked = 0;
        for (const entry of compiled.nodes.filter(({ name }) => name !== 'text')) {
            faultsOf(defOf(`n.${entry.name}`), entry.name, attributesOf(entry), entry.declaration.exactlyOne);
            checked += 1;
        }
        for (const entry of compiled.marks) {
            faultsOf(defOf(`m.${entry.name}`), entry.name, entry.declaration.attrs, entry.declaration.exactlyOne);
            checked += 1;
        }
        expect(checked).toBe(compiled.nodes.length - 1 + compiled.marks.length);
    });
});

describe('toJsonSchema of the envelope', () => {
    const textDoc = doc(paragraph(text('a')));
    const stored = (changes: Readonly<Record<string, Json | undefined>>) =>
        merge(content(paragraph(text('a'))), changes);
    const root = (changes: Readonly<Record<string, Json | undefined>>) => stored({ content: merge(textDoc, changes) });
    const cases: readonly (readonly [string, Json])[] = [
        ['5', 5],
        ['[]', []],
        ['null', null],
        ['a missing format', stored({ format: undefined })],
        ['another format', stored({ format: 'other' })],
        ['a missing formatVersion', stored({ formatVersion: undefined })],
        ['formatVersion 2', stored({ formatVersion: 2 })],
        ["formatVersion '1'", stored({ formatVersion: '1' })],
        ['one extra envelope key', stored({ extra: 1 })],
        ['a missing model', stored({ model: undefined })],
        ['model: 5', stored({ model: 5 })],
        ['a model with an extra key', stored({ model: { id: 'fixture.vocabulary', version: 1, extra: 1 } })],
        ['a model with version 1.5', stored({ model: { id: 'fixture.vocabulary', version: 1.5 } })],
        ['another model id', stored({ model: { id: 'other', version: 1 } })],
        ["a capability with version '1'", stored({ requiredCapabilities: [{ id: 'core', version: '1' }] })],
        ['a capability with an extra key', stored({ requiredCapabilities: [{ id: 'core', version: 1, extra: 1 }] })],
        [
            'a capability that repeats an entry',
            stored({
                requiredCapabilities: [
                    { id: 'core', version: 1 },
                    { id: 'core', version: 1 },
                ],
            }),
        ],
        ['requiredCapabilities: {}', stored({ requiredCapabilities: {} })],
        ['a paragraph root', stored({ content: paragraph() })],
        ['a doc with style next to attrs', root({ style: {} })],
        ['a doc with marks', root({ marks: [] })],
        ['a doc with content: []', root({ content: [] })],
        ['a doc with content: {}', root({ content: {} })],
        ['a doc with no content key', root({ content: undefined })],
        ['a doc with attrs: 5', root({ attrs: 5 })],
        ['a doc with attrs: null', root({ attrs: null })],
        ['a doc with attrs: []', root({ attrs: [] })],
        ['a doc with an unknown attribute', root({ attrs: { lang: null, dir: 'auto', tone: 'warm' } })],
        ['a doc with dir up', root({ attrs: { lang: null, dir: 'up' } })],
    ];

    it('SPEC-rich-text-format/AC-049 accepts the envelope that every case below changes', () => {
        expect(accepts(stored({}))).toBe(true);
        expect(accepts(stored({ requiredCapabilities: [] }))).toBe(true);
    });

    it.each(cases)('SPEC-rich-text-format/AC-049 makes Ajv reject %s', (_, value) => {
        expect(accepts(value)).toBe(false);
    });

    it('SPEC-rich-text-format/AC-049 leaves two capabilities with one id to decodeDocument, as uniqueItems compares whole entries', () => {
        const twice = stored({
            requiredCapabilities: [
                { id: 'core', version: 1 },
                { id: 'core', version: 2 },
            ],
        });
        expect(accepts(twice)).toBe(true);
    });

    const odd: readonly (readonly [string, Json])[] = [
        ['5', 5],
        ['null', null],
        ['{}', {}],
        ['{type: 7}', { type: 7 }],
    ];
    const positions: readonly (readonly [string, (value: Json) => Json])[] = [
        ['a block child', (value) => content(value)],
        ['an inline child', (value) => content(paragraph(value))],
        ['a mark', (value) => content(paragraph(text('a', value)))],
    ];
    const shapes: readonly (readonly [string, Json])[] = [
        ['an extra key on a node', content({ ...paragraph(), style: {} })],
        ['an extra key on a mark', content(paragraph(text('a', { type: 'bold', style: {} })))],
        ['attrs: 5 on a paragraph', content({ type: 'paragraph', attrs: 5 })],
        ['attrs: [] on a link', content(paragraph(text('a', { type: 'link', attrs: [] })))],
        ['attrs: null on a paragraph', content({ type: 'paragraph', attrs: null })],
        ['marks: {} on a text node', content(paragraph({ type: 'text', text: 'a', marks: {} }))],
        ['a text node with attrs', content(paragraph({ type: 'text', text: 'a', attrs: {} }))],
        ['a text node with content', content(paragraph({ type: 'text', text: 'a', content: [] }))],
        ["a text node with text ''", content(paragraph({ type: 'text', text: '' }))],
        ['a text node with no text', content(paragraph({ type: 'text' }))],
        ['a text node with text 5', content(paragraph({ type: 'text', text: 5 }))],
        ['a doc with content [5]', stored({ content: merge(textDoc, { content: [5] }) })],
    ];

    it.each(
        positions.flatMap(([where, place]) =>
            odd.map(([name, value]) => [`${name} as ${where}`, place(value)] as const),
        ),
    )('SPEC-rich-text-format/AC-053 makes Ajv reject %s', (_, value) => {
        expect(accepts(value)).toBe(false);
    });

    it.each(shapes)('SPEC-rich-text-format/AC-053 makes Ajv reject %s', (_, value) => {
        expect(accepts(value)).toBe(false);
    });
});

/** The `acme.pull-quote` manifest of the Feature contract, without its commands, keys, rules and toolbar. */
const pullQuote = () =>
    featureFromManifest({
        id: 'acme.pull-quote',
        version: 1,
        requires: [{ id: 'core', version: 1 }],
        nodes: {
            acme_pull_quote: {
                group: 'block',
                content: 'inline*',
                attrs: { tone: { type: 'enum', values: ['neutral', 'brand'], default: 'neutral' } },
                html: ['blockquote', { class: 'acme-pull-quote', 'data-tone': { attr: 'tone' } }, 0],
                parse: [{ tag: 'blockquote.acme-pull-quote', attrs: { tone: { from: 'data-tone' } } }],
            },
        },
        formats: { html: 'lossless', text: 'lossy', markdown: 'unsupported' },
    })();

describe('toJsonSchema of a feature', () => {
    const features: readonly Feature[] = [...vocabularyFeatures(), pullQuote()];
    const harvested = fixturesIn('valid').flatMap(([, fixture]) => objectsIn(fixture));
    const sampleOf = (type: string, attrs: AttributeDeclarations, exactlyOne: readonly string[] = []): Json => ({
        type,
        ...(type === 'doc' ? { content: [paragraph()] } : {}),
        attrs: Object.fromEntries(
            Object.entries(attrs).map(([name, declaration]) => [
                name,
                exactlyOne.slice(1).includes(name) ? null : sample(declaration),
            ]),
        ),
    });

    it.each(features.map((feature) => [feature.id, feature] as const))(
        'SPEC-rich-text-format/AC-052 validates each fixture of %s under its own schema',
        (id, feature) => {
            const schemaOf = toJsonSchema(feature);
            const check = compile(schemaOf);
            expect(schemaOf.title).toBe(id);
            let validated = 0;
            for (const [name, member] of membersOf(feature)) {
                const own = Object.keys(member.attrs);
                const fixtures: Json[] = [
                    name === 'text' ? { type: 'text', text: 'a' } : sampleOf(name, member.attrs, member.exactlyOne),
                ];
                for (const found of harvested.filter((entry) => entry.type === name)) {
                    const given = found.attrs === undefined ? {} : (found.attrs as Record_);
                    const kept = Object.entries(given).filter(([key]) => own.includes(key));
                    fixtures.push(merge(found, { attrs: own.length === 0 ? undefined : Object.fromEntries(kept) }));
                }
                for (const fixture of fixtures) {
                    const shown = `${name} ${JSON.stringify(fixture).slice(0, 80)} ${JSON.stringify(check.errors)}`;
                    expect(check(fixture), shown).toBe(true);
                    validated += 1;
                }
            }
            expect(validated).toBeGreaterThanOrEqual(membersOf(feature).length);
        },
    );

    it.each(features.map((feature) => [feature.id, feature] as const))(
        'SPEC-rich-text-format/AC-052 rejects one out-of-range value per declared attribute of %s',
        (_, feature) => {
            const check = compile(toJsonSchema(feature));
            const skipped: string[] = [];
            for (const [name, member] of membersOf(feature).filter(([name]) => name !== 'text')) {
                skipped.push(...faultsOf(check, name, member.attrs, member.exactlyOne));
            }
            expect(skipped).toEqual([]);
        },
    );

    it('SPEC-rich-text-format/AC-052 rejects an attribute that the feature does not declare, and a type it does not own', () => {
        const check = compile(toJsonSchema(pullQuote()));
        expect(check({ type: 'acme_pull_quote', attrs: { tone: 'brand', size: 1 } })).toBe(false);
        expect(check({ type: 'acme_pull_quote', attrs: { tone: 'loud' } })).toBe(false);
        expect(check({ type: 'acme_pull_quote', content: [{ type: 'text', text: 'a' }] })).toBe(true);
        expect(check({ type: 'paragraph' })).toBe(false);
    });

    it('SPEC-rich-text-format/AC-052 closes a child of a feature schema to the keys of a node or mark', () => {
        const check = compile(toJsonSchema(pullQuote()));
        const quote = (child: Json) => ({ type: 'acme_pull_quote', content: [child] });
        expect(check(quote({ type: 'paragraph', evil: true }))).toBe(false);
        expect(check(quote({ type: 'paragraph', attrs: {}, content: [], marks: [], text: 'a' }))).toBe(true);
        expect(check(quote({ type: 'text', text: 'a', marks: [{ type: 'bold' }] }))).toBe(true);
        expect(check(quote({ type: 'paragraph', attrs: 5 }))).toBe(false);
    });

    it('SPEC-rich-text-format/AC-052 accepts an empty marks and content array on a node of a feature', () => {
        const owns = (type: string) => features.find((one) => membersOf(one).some(([name]) => name === type));
        const check = (type: string) => compile(toJsonSchema(owns(type) as Feature));
        expect(check('paragraph')({ type: 'paragraph', marks: [] })).toBe(true);
        expect(check('paragraph')({ type: 'paragraph', marks: [{ type: 'bold' }] })).toBe(false);
        expect(check('horizontal_rule')({ type: 'horizontal_rule', content: [] })).toBe(true);
        expect(check('horizontal_rule')({ type: 'horizontal_rule', content: [{ type: 'paragraph' }] })).toBe(false);
    });

    it('SPEC-rich-text-format/AC-052 rejects a mark on a node whose marks declaration is empty', () => {
        const check = compile(toJsonSchema(vocabularyFeatures().find(({ id }) => id === 'fixture.mention') as Feature));
        expect(check({ ...mention('m'), marks: [{ type: 'bold' }] })).toBe(false);
        expect(check({ ...mention('m'), marks: [] })).toBe(true);
    });

    it('SPEC-rich-text-format/AC-052 describes an attribute that a feature adds to other nodes under $defs', () => {
        const styles = vocabularyFeatures().find(({ id }) => id === 'fixture.styles');
        const checker = ajvOf();
        checker.addSchema(toJsonSchema(styles as Feature), 'styles');
        const styleId = checker.getSchema('styles#/$defs/a.styleId') as ValidateFunction;
        expect([styleId('brand.body'), styleId(null), styleId('Has Space'), styleId(5)]).toEqual([
            true,
            true,
            false,
            false,
        ]);
    });

    it('SPEC-rich-text-format/AC-052 is the same JSON for the same feature', () => {
        const first = vocabularyFeatures()[1];
        expect(JSON.stringify(toJsonSchema(first))).toBe(JSON.stringify(toJsonSchema(first)));
    });
});
