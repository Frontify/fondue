/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, expectTypeOf, it } from 'vitest';

import {
    fixtureBold,
    fixtureColor,
    fixtureHeading,
    fixtureHistory,
    fixtureItalic,
    fixtureLink,
    fixtureRedo,
} from '#/features/__tests__/fixtures/features';
import { fixtureProfiles } from '#/features/__tests__/fixtures/profiles';
import { core } from '#/features/core/feature';
import {
    compileContentModel,
    defineFeature,
    DefinitionError,
    type CommandDefinition,
    type Feature,
    type FeatureDeclaration,
    history,
    type HtmlAttributeValue,
    type HtmlSpec,
    type JsonObject,
    type JsonValue,
    insertNode,
    setBlock,
} from '#/model';

import { orderPlugins, type PluginDescriptor } from '../capabilities';
import { pointer } from '../errors';
import { canonicalJson } from '../hash';

const options = { id: 'test.model', version: 1 };
const compile = (features: readonly Feature[]) => compileContentModel(features, options);
const requiresCore = [{ id: 'core', version: 1 }];
const feature = (declaration: FeatureDeclaration) => defineFeature(declaration)();

const failureOf = (run: () => unknown) => {
    try {
        run();
    } catch (error) {
        if (error instanceof DefinitionError) {
            return { code: error.code, details: error.details };
        }
        throw error;
    }
    throw new Error('expected a DefinitionError');
};

const block = (content: string) => ({
    group: 'block' as const,
    content,
    attrs: {},
    html: ['div', 0] as const,
    parse: [],
});

describe('compileContentModel duplicates', () => {
    it('rejects a feature listed twice', () => {
        expect(failureOf(() => compile([core(), core()]))).toEqual({
            code: 'definition.duplicate-id',
            details: { kind: 'feature', id: 'core', features: ['core', 'core'] },
        });
    });

    it('rejects two features that declare one node', () => {
        const quote = feature({ id: 'a.quote', version: 1, nodes: { paragraph: block('inline*') } });
        expect(failureOf(() => compile([core(), quote]))).toEqual({
            code: 'definition.duplicate-id',
            details: { kind: 'node', id: 'paragraph', features: ['core', 'a.quote'] },
        });
    });

    it('rejects two features that declare one mark', () => {
        const other = feature({ id: 'a.bold', version: 1, marks: { bold: { attrs: {}, html: ['b', 0], parse: [] } } });
        expect(failureOf(() => compile([core(), fixtureBold(), other]))).toEqual({
            code: 'definition.duplicate-id',
            details: { kind: 'mark', id: 'bold', features: ['fixture.bold', 'a.bold'] },
        });
    });

    it('rejects two shared attributes of one name on one node', () => {
        const align = (id: string) =>
            feature({
                id,
                version: 1,
                attributes: { align: { on: ['paragraph'], value: { type: 'string', nullable: true, default: null } } },
            });
        expect(failureOf(() => compile([core(), align('a.align'), align('b.align')]))).toEqual({
            code: 'definition.duplicate-id',
            details: { kind: 'attribute', id: 'paragraph.align', features: ['a.align', 'b.align'] },
        });
        expect(
            failureOf(() =>
                compile([
                    core(),
                    feature({
                        id: 'c.lang',
                        version: 1,
                        attributes: {
                            lang: { on: 'textblocks', value: { type: 'language', nullable: true, default: null } },
                        },
                    }),
                ]),
            ).details,
        ).toEqual({ kind: 'attribute', id: 'paragraph.lang', features: ['core', 'c.lang'] });
    });

    it('rejects two features that register one command', () => {
        const again = feature({ id: 'a.history', version: 1, commands: { 'fixture.undo': history('undo') } });
        expect(failureOf(() => compile([core(), fixtureHistory(), again]))).toEqual({
            code: 'definition.duplicate-id',
            details: { kind: 'command', id: 'fixture.undo', features: ['fixture.history', 'a.history'] },
        });
    });

    it('rejects a node and a mark of one name, in either order', () => {
        const badge = { attrs: {}, html: ['span', 0], parse: [] } as const;
        const both = feature({ id: 'a.badge', version: 1, nodes: { badge: block('inline*') }, marks: { badge } });
        expect(failureOf(() => compile([core(), both]))).toEqual({
            code: 'definition.duplicate-id',
            details: { kind: 'mark', id: 'badge', features: ['a.badge', 'a.badge'] },
        });
        const mark = feature({ id: 'a.mark', version: 1, marks: { badge } });
        const node = feature({ id: 'a.node', version: 1, nodes: { badge: block('inline*') } });
        expect(failureOf(() => compile([core(), mark, node]))).toEqual({
            code: 'definition.duplicate-id',
            details: { kind: 'node', id: 'badge', features: ['a.mark', 'a.node'] },
        });
    });

    it('rejects one command ID in two features whatever a guard option says', () => {
        const guarded = defineFeature({
            id: 'a.guarded',
            version: 1,
            options: { undo: { type: 'boolean', default: false } },
            commands: { 'a.undo': { ...history('undo'), when: { option: 'undo', equals: true } } },
        });
        const other = feature({ id: 'b.undo', version: 1, commands: { 'a.undo': history('undo') } });
        for (const undo of [false, true]) {
            expect(failureOf(() => compile([core(), guarded({ undo }), other]))).toEqual({
                code: 'definition.duplicate-id',
                details: { kind: 'command', id: 'a.undo', features: ['a.guarded', 'b.undo'] },
            });
        }
    });

    it('does not take a shared attribute named toString for a duplicate', () => {
        const name: string = 'toString';
        const shared = feature({
            id: 'a.shared',
            version: 1,
            attributes: { [name]: { on: ['paragraph'], value: { type: 'string', default: '' } } },
        });
        expect(compile([core(), shared]).manifest.features).toContainEqual({ id: 'a.shared', version: 1, options: {} });
    });

    it('rejects two different plugins with one ID', () => {
        const run = () =>
            orderPlugins([
                { featureId: 'a', plugin: { id: 'shared', phase: 'late' } },
                { featureId: 'b', plugin: { id: 'shared', phase: 'guard' } },
            ]);
        expect(failureOf(run)).toEqual({
            code: 'definition.duplicate-id',
            details: { kind: 'plugin', id: 'shared', features: ['a', 'b'] },
        });
    });
});

describe('compileContentModel dependencies', () => {
    it('reports the path to a dependency two levels down', () => {
        const top = feature({ id: 'a.top', version: 1, requires: [{ id: 'a.middle', version: 1 }] });
        const middle = feature({ id: 'a.middle', version: 1, requires: [{ id: 'a.bottom', version: 1 }] });
        expect(failureOf(() => compile([core(), top, middle]))).toEqual({
            code: 'definition.missing-dependency',
            details: { path: ['a.top', 'a.middle', 'a.bottom'] },
        });
    });

    it('reports a three-feature cycle in order', () => {
        const linked = (id: string, next: string) => feature({ id, version: 1, requires: [{ id: next, version: 1 }] });
        expect(
            failureOf(() =>
                compile([linked('a.one', 'a.two'), linked('a.two', 'a.three'), linked('a.three', 'a.one')]),
            ),
        ).toEqual({
            code: 'definition.dependency-cycle',
            details: { kind: 'feature', path: ['a.one', 'a.two', 'a.three', 'a.one'] },
        });
    });

    it('reports a cycle of plugin ordering constraints', () => {
        const plugins: PluginDescriptor[] = [
            { id: 'one', phase: 'structure-keys', before: ['two'] },
            { id: 'two', phase: 'structure-keys', before: ['three'] },
            { id: 'three', phase: 'structure-keys', before: ['one'] },
        ];
        expect(failureOf(() => orderPlugins(plugins.map((plugin) => ({ featureId: 'a', plugin }))))).toEqual({
            code: 'definition.dependency-cycle',
            details: { kind: 'plugin', path: ['one', 'two', 'three', 'one'] },
        });
    });

    it('names the feature, the required and the installed version', () => {
        const next = feature({ id: 'a.next', version: 1, requires: [{ id: 'core', version: 2 }] });
        expect(failureOf(() => compile([core(), next]))).toEqual({
            code: 'definition.version-mismatch',
            details: { feature: 'a.next', requires: 'core', required: 2, installed: 1 },
        });
    });

    it('rejects a model or feature version that is not a positive integer', () => {
        for (const version of [0, -1, 1.5, Number.NaN]) {
            expect(failureOf(() => compileContentModel([core()], { id: 'test.model', version }))).toEqual({
                code: 'definition.invalid-declaration',
                details: { path: '/version' },
            });
            expect(failureOf(() => compile([core(), feature({ id: 'a.next', version })]))).toEqual({
                code: 'definition.invalid-declaration',
                details: { feature: 'a.next', path: '/version' },
            });
        }
    });
});

describe('compileContentModel orphan behavior', () => {
    const cases: readonly (readonly [string, FeatureDeclaration, string])[] = [
        ['command', { id: 'a.x', version: 1, commands: { 'a.set': setBlock('callout') } }, '/commands/a.set/args/node'],
        ['key', { id: 'a.x', version: 1, keys: { 'Mod-q': 'a.missing' } }, '/keys/Mod-q'],
        [
            'input rule',
            {
                id: 'a.x',
                version: 1,
                inputRules: [{ id: 'a.stars', kind: 'mark-delimiter', open: '*', close: '*', mark: 'strong' }],
            },
            '/inputRules/0/mark',
        ],
        [
            'toolbar entry',
            {
                id: 'a.x',
                version: 1,
                toolbar: [{ kind: 'button', command: 'a.missing', labelKey: 'RichTextEditor_x', icon: 'IconX' }],
            },
            '/toolbar/0',
        ],
        [
            'shared attribute',
            {
                id: 'a.x',
                version: 1,
                attributes: { tone: { on: ['callout'], value: { type: 'string', default: '' } } },
            },
            '/attributes/tone/on',
        ],
        [
            'line-start rule without markers',
            {
                id: 'a.x',
                version: 1,
                inputRules: [{ id: 'a.rule', kind: 'line-start', markers: [], command: 'a.missing' }],
            },
            '/inputRules/0/command',
        ],
    ];
    it.each(cases)(
        'rejects the %s registration for an undeclared node, mark or command',
        (_kind, declaration, path) => {
            expect(failureOf(() => compile([core(), feature(declaration)]))).toEqual({
                code: 'definition.orphan-behavior',
                details: { feature: 'a.x', path },
            });
        },
    );
});

describe('compileContentModel declarations', () => {
    it('rejects a doc attribute without a default and a doc exactlyOne', () => {
        const required = feature({
            id: 'a.root',
            version: 1,
            requires: requiresCore,
            attributes: { owner: { on: ['doc'], value: { type: 'string', required: true } } },
        });
        expect(failureOf(() => compile([core(), required]))).toEqual({
            code: 'definition.invalid-declaration',
            details: { feature: 'core', path: '/nodes/doc/attrs/owner' },
        });
        const doc = {
            content: 'paragraph+',
            attrs: { a: { type: 'string', nullable: true, default: null } },
            html: ['div', 0],
            parse: [],
        } as const;
        const oneOf = feature({
            id: 'a.doc',
            version: 1,
            nodes: {
                doc: { ...doc, exactlyOne: ['a'] },
                paragraph: block('text*'),
                text: { group: 'inline', attrs: {}, html: ['span', 0], parse: [] },
            },
        });
        expect(failureOf(() => compile([oneOf]))).toEqual({
            code: 'definition.invalid-declaration',
            details: { feature: 'a.doc', path: '/nodes/doc/exactlyOne' },
        });
    });

    it('rejects a node or a mark without an html spec', () => {
        const node = {
            id: 'a.x',
            version: 1,
            nodes: { callout: { group: 'block', content: 'inline*', attrs: {}, parse: [] } },
        };
        const mark = { id: 'a.y', version: 1, marks: { tone: { attrs: {}, parse: [] } } };
        expect(failureOf(() => compile([core(), feature(node as unknown as FeatureDeclaration)]))).toEqual({
            code: 'definition.missing-schema',
            details: { feature: 'a.x', path: '/nodes/callout/html' },
        });
        expect(failureOf(() => compile([core(), feature(mark as unknown as FeatureDeclaration)]))).toEqual({
            code: 'definition.missing-schema',
            details: { feature: 'a.y', path: '/marks/tone/html' },
        });
    });

    it.each([
        ['inline**', 'fails the grammar'],
        ['paragraph_x*', 'names an unknown node'],
        ['widget+', 'names an unknown group'],
        ['(paragraph | inline)+', 'mixes inline and block content'],
        ['inline{1,65}', 'repeats a term up to 65 times'],
        ['inline{65,}', 'repeats a term at least 65 times'],
        ['(inline{1,9}){1,8}', 'repeats a term up to 72 times through nesting'],
        ['(inline{1,32}){1,32}', 'repeats a term up to 1024 times through nesting'],
        [`${'('.repeat(17)}inline${')'.repeat(17)}`, 'nests parentheses 17 deep'],
    ])('rejects the content expression %j, which %s', (content) => {
        const declaration = { id: 'a.x', version: 1, nodes: { callout: block(content) } };
        expect(failureOf(() => compile([core(), feature(declaration)]))).toEqual({
            code: 'definition.invalid-declaration',
            details: { feature: 'a.x', path: '/nodes/callout/content' },
        });
    });

    it('rejects parentheses 5000 deep without overflowing the stack', () => {
        const declaration = { id: 'a.x', version: 1, nodes: { callout: block(`${'('.repeat(5000)}inline`) } };
        expect(failureOf(() => compile([core(), feature(declaration)]))).toEqual({
            code: 'definition.invalid-declaration',
            details: { feature: 'a.x', path: '/nodes/callout/content' },
        });
    });

    it.each([
        'inline{1,64}',
        '(inline{1,8}){1,8}',
        '((inline+){1,4} inline*){1,16}',
        `${'('.repeat(16)}inline${')'.repeat(16)}`,
    ])('accepts the content expression %j at the repeat and nesting limits', (content) => {
        const declaration = { id: 'a.x', version: 1, nodes: { callout: block(content) } };
        expect(compile([core(), feature(declaration)]).manifest.nodes).toContain('callout');
    });

    it('accepts groups, choices, ranges and nesting', () => {
        const declaration = { id: 'a.x', version: 1, nodes: { callout: block('(paragraph | block){1,3} section*') } };
        expect(compile([core(), feature(declaration)]).manifest.nodes).toEqual([
            'doc',
            'paragraph',
            'text',
            'hard_break',
            'callout',
        ]);
    });

    it('rejects a node or mark list naming an undeclared mark', () => {
        const box = feature({ id: 'a.box', version: 1, nodes: { box: { ...block('inline*'), marks: ['missing'] } } });
        expect(failureOf(() => compile([core(), box]))).toEqual({
            code: 'definition.invalid-declaration',
            details: { feature: 'a.box', path: '/nodes/box/marks/0' },
        });
        const tone = feature({
            id: 'a.tone',
            version: 1,
            marks: { tone: { attrs: {}, html: ['span', 0], parse: [], excludes: ['tone', 'missing'] } },
        });
        expect(failureOf(() => compile([core(), tone]))).toEqual({
            code: 'definition.invalid-declaration',
            details: { feature: 'a.tone', path: '/marks/tone/excludes/1' },
        });
    });

    it('rejects a feature list without the doc node', () => {
        const box = feature({
            id: 'a.box',
            version: 1,
            nodes: { box: { group: 'block', attrs: {}, html: ['hr'], parse: [] } },
        });
        for (const features of [[], [box]]) {
            expect(failureOf(() => compile(features))).toEqual({
                code: 'definition.invalid-declaration',
                details: { path: '/nodes/doc' },
            });
        }
    });

    it('rejects a capability, an attribute binding or a guard that names only a prototype member', () => {
        for (const capability of ['constructor', 'bogus']) {
            const command = { ...history('undo'), capability } as unknown as CommandDefinition;
            const run = () => compile([core(), feature({ id: 'a.x', version: 1, commands: { 'a.x': command } })]);
            expect(failureOf(run)).toEqual({
                code: 'definition.invalid-declaration',
                details: { feature: 'a.x', path: '/commands/a.x/capability' },
            });
        }
        const bound = feature({
            id: 'a.x',
            version: 1,
            nodes: { box: { ...block('inline*'), html: ['div', { 'data-x': { attr: 'constructor' } }, 0] } },
        });
        expect(failureOf(() => compile([core(), bound])).details).toEqual({
            feature: 'a.x',
            path: '/nodes/box/html/1/data-x',
        });
        const tagged = feature({
            id: 'a.x',
            version: 1,
            nodes: { box: { ...block('inline*'), html: [{ attr: 'toString', tags: {} }, 0] } },
        });
        expect(failureOf(() => compile([core(), tagged])).details).toEqual({
            feature: 'a.x',
            path: '/nodes/box/html/0',
        });
        const guarded = feature({
            id: 'a.x',
            version: 1,
            commands: { 'a.x': { ...history('undo'), when: { option: 'constructor', equals: true } } },
        });
        expect(failureOf(() => compile([core(), guarded]))).toEqual({
            code: 'definition.invalid-declaration',
            details: { feature: 'a.x', path: '/commands/a.x/when' },
        });
    });

    it('rejects an html spec nested deeper than 64 levels', () => {
        let html: HtmlSpec = ['div', 0];
        for (let depth = 0; depth < 5000; depth += 1) {
            html = ['div', html];
        }
        const deep = feature({ id: 'a.deep', version: 1, nodes: { deep: { ...block('inline*'), html } } });
        expect(failureOf(() => compile([core(), deep]))).toEqual({
            code: 'definition.invalid-declaration',
            details: { feature: 'a.deep', path: `/nodes/deep/html${'/1'.repeat(65)}` },
        });
    });

    it('rejects a javascript: literal src in a code feature and accepts the link stand-in', () => {
        const image = {
            id: 'a.image',
            version: 1,
            nodes: { picture: { group: 'block', attrs: {}, html: ['img', { src: 'javascript:alert(1)' }], parse: [] } },
        } as const;
        expect(failureOf(() => compile([core(), feature(image)]))).toEqual({
            code: 'definition.unsafe-url-binding',
            details: { feature: 'a.image', path: '/nodes/picture/html/1/src' },
        });
        expect(compile([core(), fixtureLink()]).manifest.marks).toEqual(['link']);
    });

    it('checks a namespaced or prefixed URL attribute by its local name', () => {
        const card = (name: string, value: HtmlAttributeValue) =>
            feature({
                id: 'a.card',
                version: 1,
                nodes: {
                    card: {
                        group: 'block',
                        attrs: { label: { type: 'string', default: '' }, href: { type: 'url', default: '/x' } },
                        html: ['svg', { [name]: value }],
                        parse: [],
                    },
                },
            });
        for (const name of ['http://www.w3.org/1999/xlink href', 'http://www.w3.org/1999/xlink xlink:HREF', 'x:src']) {
            for (const value of ['javascript:alert(1)', { attr: 'label' }]) {
                expect(failureOf(() => compile([core(), card(name, value)]))).toEqual({
                    code: 'definition.unsafe-url-binding',
                    details: { feature: 'a.card', path: `/nodes/card/html/1${pointer(name)}` },
                });
            }
            expect(compile([core(), card(name, { attr: 'href' })]).manifest.nodes).toContain('card');
        }
    });

    it('rejects a parse rule literal that fails its attribute declaration', () => {
        const link = (value: JsonValue) =>
            feature({
                id: 'a.link',
                version: 1,
                marks: {
                    anchor: {
                        attrs: { href: { type: 'url', default: '/x' } },
                        html: ['a', { href: { attr: 'href' } }, 0],
                        parse: [{ tag: 'a', attrs: { href: { value } } }],
                    },
                },
            });
        expect(compile([core(), link('/brand')]).manifest.marks).toEqual(['anchor']);
        for (const value of ['javascript:alert(1)', 7]) {
            expect(failureOf(() => compile([core(), link(value)]))).toEqual({
                code: 'definition.invalid-declaration',
                details: { feature: 'a.link', path: '/marks/anchor/parse/0/attrs/href/value' },
            });
        }
    });

    it('rejects a URL attribute bound to a string attribute or an option', () => {
        const bound = (value: object) =>
            ({
                id: 'a.card',
                version: 1,
                options: { target: { type: 'url', default: '/x' } },
                nodes: {
                    card: {
                        group: 'block',
                        attrs: { label: { type: 'string', default: '' } },
                        html: ['a', { href: value }],
                        parse: [],
                    },
                },
            }) as FeatureDeclaration;
        for (const value of [{ attr: 'label' }, { option: 'target' }]) {
            expect(failureOf(() => compile([core(), feature(bound(value))]))).toEqual({
                code: 'definition.unsafe-url-binding',
                details: { feature: 'a.card', path: '/nodes/card/html/1/href' },
            });
        }
    });

    it('rejects a failing attribute default, insertNode attribute and key payload', () => {
        const card = (overrides: Partial<FeatureDeclaration>) =>
            feature({
                id: 'a.card',
                version: 1,
                nodes: {
                    card: { group: 'block', attrs: { href: { type: 'url', default: '/x' } }, html: ['div'], parse: [] },
                },
                ...overrides,
            });
        const unsafeDefault = card({
            nodes: {
                card: {
                    group: 'block',
                    attrs: { href: { type: 'url', default: 'javascript:alert(1)' } },
                    html: ['div'],
                    parse: [],
                },
            },
        });
        const unsafeInsert = card({
            commands: { 'a.card.insert': insertNode('card', { attrs: { href: 'javascript:alert(1)' } }) },
        });
        expect(failureOf(() => compile([core(), unsafeDefault])).details).toEqual({
            feature: 'a.card',
            path: '/nodes/card/attrs/href/default',
        });
        expect(failureOf(() => compile([core(), unsafeInsert])).details).toEqual({
            feature: 'a.card',
            path: '/commands/a.card.insert/args/attrs/href',
        });
        const wrongKey = feature({
            id: 'a.keys',
            version: 1,
            requires: [{ id: 'fixture.heading', version: 1 }],
            keys: { 'Mod-Alt-9': { command: 'fixture.heading.set', payload: { level: 9 } } },
        });
        expect(failureOf(() => compile([core(), fixtureHeading(), wrongKey]))).toEqual({
            code: 'definition.invalid-declaration',
            details: { feature: 'a.keys', path: '/keys/Mod-Alt-9/payload/level' },
        });
    });

    it('types, defaults and checks code feature options', () => {
        expectTypeOf(core).parameter(0).toEqualTypeOf<object | undefined>();
        expectTypeOf(fixtureHeading).parameter(0).toEqualTypeOf<{ readonly defaultLevel?: number } | undefined>();
        expect(compile([core(), fixtureHeading()]).manifest.features).toEqual([
            { id: 'core', version: 1, options: {} },
            { id: 'fixture.heading', version: 1, options: { defaultLevel: 2 } },
        ]);
        const wrongType = { defaultLevel: 'two' } as unknown as { defaultLevel: number };
        expect(failureOf(() => compile([core(), fixtureHeading(wrongType)]))).toEqual({
            code: 'definition.invalid-option',
            details: { feature: 'fixture.heading', path: '/options/defaultLevel' },
        });
        expect(failureOf(() => compile([core(), fixtureHeading({ defaultLevel: 7 })])).details).toEqual({
            feature: 'fixture.heading',
            path: '/options/defaultLevel',
        });
        const unknown = { other: 1 } as unknown as { defaultLevel: number };
        expect(failureOf(() => compile([core(), fixtureHeading(unknown)])).details).toEqual({
            feature: 'fixture.heading',
            path: '/options/other',
        });
        const unsafe = { defaultLevel: () => 2 } as unknown as { defaultLevel: number };
        expect(failureOf(() => compile([core(), fixtureHeading(unsafe)])).code).toBe('definition.invalid-option');
    });

    it('treats an undefined option as an omitted one', () => {
        const omitted = compile([core(), fixtureHeading()]);
        const absent = { defaultLevel: undefined } as unknown as { defaultLevel: number };
        const undefinedLevel = compile([core(), fixtureHeading(absent)]);
        expect(undefinedLevel.manifest).toEqual(omitted.manifest);
        expect(undefinedLevel.fingerprint).toBe(omitted.fingerprint);
    });

    it('rejects a cyclic option and a json option default nested deeper than 64 levels', () => {
        const cyclic: Record<string, unknown> = {};
        cyclic.self = cyclic;
        const json = defineFeature({
            id: 'a.json',
            version: 1,
            options: { value: { type: 'json', nullable: true, default: null } },
        });
        expect(failureOf(() => compile([core(), json({ value: cyclic as JsonValue })]))).toEqual({
            code: 'definition.invalid-option',
            details: { feature: 'a.json', path: '/options/value/self' },
        });
        let nested: JsonValue = null;
        for (let depth = 0; depth < 10_000; depth += 1) {
            nested = { nested };
        }
        const deep = feature({ id: 'a.deep', version: 1, options: { value: { type: 'json', default: nested } } });
        expect(failureOf(() => compile([core(), deep]))).toEqual({
            code: 'definition.invalid-declaration',
            details: { feature: 'a.deep', path: '/options/value/default' },
        });
    });

    describe('a command guard value', () => {
        const guarded = (equals: JsonValue) =>
            defineFeature({
                id: 'a.guarded',
                version: 1,
                options: { mode: { type: 'string', default: 'a' } },
                commands: { 'a.undo': { ...history('undo'), when: { option: 'mode', equals } } },
            })();
        const nest = (depth: number) => {
            let value: JsonValue = null;
            for (let level = 0; level < depth; level += 1) {
                value = { nested: value };
            }
            return value;
        };

        it('rejects a cyclic guard value as definition.invalid-option', () => {
            const cyclic: Record<string, unknown> = {};
            cyclic.self = cyclic;
            expect(failureOf(() => compile([core(), guarded(cyclic as JsonValue)]))).toEqual({
                code: 'definition.invalid-option',
                details: { feature: 'a.guarded', path: '/commands/a.undo/when/equals/self' },
            });
        });

        it('rejects a guard value nested deeper than 64 levels, as an option value is', () => {
            expect(failureOf(() => compile([core(), guarded(nest(66))])).code).toBe('definition.invalid-option');
            expect(failureOf(() => compile([core(), guarded(nest(100))])).code).toBe('definition.invalid-option');
            expect(() => compile([core(), guarded(nest(65))])).not.toThrow();
        });

        it('compiles a plain guard value', () => {
            expect(compile([core(), guarded('a')]).manifest.commands).toContain('a.undo');
            expect(compile([core(), guarded('b')]).manifest.commands).not.toContain('a.undo');
        });
    });

    describe('a declaration name that is a prototype key', () => {
        const fixtures: readonly (readonly [string, (key: string) => FeatureDeclaration, string])[] = [
            ['node', (key) => ({ id: 'a.x', version: 1, nodes: { [key]: block('inline*') } }), '/nodes/{key}'],
            [
                'mark',
                (key) => ({ id: 'a.x', version: 1, marks: { [key]: { attrs: {}, html: ['b', 0], parse: [] } } }),
                '/marks/{key}',
            ],
            [
                'node attribute',
                (key) => ({
                    id: 'a.x',
                    version: 1,
                    nodes: { box: { ...block('inline*'), attrs: { [key]: { type: 'string', default: '' } } } },
                }),
                '/nodes/box/attrs/{key}',
            ],
            [
                'mark attribute',
                (key) => ({
                    id: 'a.x',
                    version: 1,
                    marks: {
                        tag: { attrs: { [key]: { type: 'string', default: '' } }, html: ['b', 0], parse: [] },
                    },
                }),
                '/marks/tag/attrs/{key}',
            ],
            [
                'shared attribute',
                (key) => ({
                    id: 'a.x',
                    version: 1,
                    attributes: { [key]: { on: ['paragraph'], value: { type: 'string', default: '' } } },
                }),
                '/attributes/{key}',
            ],
            [
                'option',
                (key) => ({ id: 'a.x', version: 1, options: { [key]: { type: 'string', default: 'a' } } }),
                '/options/{key}',
            ],
            ['command', (key) => ({ id: 'a.x', version: 1, commands: { [key]: history('undo') } }), '/commands/{key}'],
            [
                'payload field',
                (key) => ({
                    id: 'a.x',
                    version: 1,
                    commands: {
                        'a.undo': { ...history('undo'), payload: { fields: { [key]: { type: 'string' } } } },
                    },
                }),
                '/commands/a.undo/payload/fields/{key}',
            ],
            [
                'key binding',
                (key) => ({
                    id: 'a.x',
                    version: 1,
                    commands: { 'a.undo': history('undo') },
                    keys: { [key]: 'a.undo' },
                }),
                '/keys/{key}',
            ],
            [
                'html attribute',
                (key) => ({
                    id: 'a.x',
                    version: 1,
                    nodes: { box: { ...block('inline*'), html: ['div', { [key]: 'x' }, 0] } },
                }),
                '/nodes/box/html/1/{key}',
            ],
            [
                'parse attribute',
                (key) => ({
                    id: 'a.x',
                    version: 1,
                    nodes: {
                        box: { ...block('inline*'), parse: [{ tag: 'div', attrs: { [key]: { value: 'x' } } }] },
                    },
                }),
                '/nodes/box/parse/0/attrs/{key}',
            ],
        ];

        it.each(
            fixtures.flatMap(([kind, declare, path]) =>
                ['__proto__', 'constructor', 'prototype'].map((key) => [kind, key, declare, path] as const),
            ),
        )('rejects a %s named %s as definition.invalid-declaration', (_kind, key, declare, path) => {
            expect(failureOf(() => compile([core(), defineFeature(declare(key))()]))).toEqual({
                code: 'definition.invalid-declaration',
                details: { feature: 'a.x', path: path.replace('{key}', key) },
            });
        });

        it('still takes an ordinary name', () => {
            const ok = feature({
                id: 'a.x',
                version: 1,
                options: { mode: { type: 'string', default: 'a' } },
                nodes: { box: { ...block('inline*'), attrs: { tone: { type: 'string', default: '' } } } },
            });
            expect(() => compile([core(), ok])).not.toThrow();
        });
    });
});

describe('compileContentModel order', () => {
    it('orders plugins of one phase by the host list, in both orders', () => {
        const forward = compile([core(), fixtureBold(), fixtureHeading()]);
        const reverse = compile([core(), fixtureHeading(), fixtureBold()]);
        expect(forward.manifest.plugins).toEqual(['keymap:fixture.bold', 'keymap:fixture.heading']);
        expect(reverse.manifest.plugins).toEqual(['keymap:fixture.heading', 'keymap:fixture.bold']);
        expect(forward.fingerprint).not.toBe(reverse.fingerprint);
    });

    it('orders by phase before list order, and one keyed plugin sits at its first contributor', () => {
        const model = compile([core(), fixtureBold(), fixtureRedo(), fixtureHistory()]);
        expect(model.manifest.plugins).toEqual([
            'history',
            'keymap:fixture.bold',
            'keymap:fixture.redo',
            'keymap:fixture.history',
        ]);
    });

    it('applies before and after constraints inside a phase', () => {
        const contributions = [
            { featureId: 'a', plugin: { id: 'list.keys', phase: 'structure-keys', after: ['table.keys'] } },
            { featureId: 'b', plugin: { id: 'table.keys', phase: 'structure-keys' } },
            { featureId: 'b', plugin: { id: 'table.editing', phase: 'base-keys' } },
            { featureId: 'c', plugin: { id: 'guard', phase: 'guard', before: ['table.editing'] } },
        ] as const;
        expect(orderPlugins(contributions).map(({ id }) => id)).toEqual([
            'guard',
            'table.keys',
            'list.keys',
            'table.editing',
        ]);
    });

    it('rejects a constraint on a plugin key no capability contributes', () => {
        const run = () =>
            orderPlugins([
                { featureId: 'a', plugin: { id: 'list.keys', phase: 'structure-keys', after: ['table.keys'] } },
            ]);
        expect(failureOf(run)).toEqual({
            code: 'definition.unsatisfied-order',
            details: { plugin: 'list.keys', target: 'table.keys', before: false },
        });
    });

    it('skips a constraint on a package plugin whose capability the model does not use', () => {
        const known = new Set(['list.keys', 'table.keys', 'code.keys']);
        const contributions = [
            { featureId: 'a', plugin: { id: 'list.keys', phase: 'structure-keys', after: ['table.keys'] } },
            { featureId: 'b', plugin: { id: 'code.keys', phase: 'structure-keys', before: ['list.keys'] } },
        ] as const;
        expect(orderPlugins(contributions, known).map(({ id }) => id)).toEqual(['code.keys', 'list.keys']);
    });

    it('rejects a general-keys plugin that asks to run before a guard plugin', () => {
        const run = () =>
            orderPlugins([
                { featureId: 'a', plugin: { id: 'composition', phase: 'guard' } },
                { featureId: 'b', plugin: { id: 'shortcuts', phase: 'general-keys', before: ['composition'] } },
            ]);
        expect(failureOf(run)).toEqual({
            code: 'definition.unsatisfied-order',
            details: { plugin: 'shortcuts', target: 'composition', before: true },
        });
    });

    it('orders nodes as declared and marks by rank, then as declared', () => {
        const model = compile([
            core(),
            fixtureItalic(),
            fixtureBold(),
            fixtureColor(),
            fixtureLink(),
            fixtureHeading(),
        ]);
        expect(model.manifest.nodes).toEqual(['doc', 'paragraph', 'text', 'hard_break', 'heading', 'rule']);
        expect(model.manifest.marks).toEqual(['link', 'font_color', 'italic', 'bold']);
    });

    it('changes the fingerprint with mark order, an option, a key binding or a plugin', () => {
        const base = compile([core(), fixtureBold(), fixtureItalic(), fixtureHeading()]);
        const rebound = feature({
            id: 'fixture.bold',
            version: 1,
            requires: requiresCore,
            marks: { bold: { attrs: {}, html: ['strong', 0], parse: [] } },
            commands: { 'fixture.paragraph.set': setBlock('paragraph') },
            keys: { 'Mod-Shift-b': 'fixture.paragraph.set' },
        });
        const variants = [
            compile([core(), fixtureItalic(), fixtureBold(), fixtureHeading()]),
            compile([core(), fixtureBold(), fixtureItalic(), fixtureHeading({ defaultLevel: 4 })]),
            compile([core(), rebound, fixtureItalic(), fixtureHeading()]),
            compile([core(), fixtureBold(), fixtureItalic(), fixtureHeading(), fixtureHistory()]),
        ];
        expect(compile([core(), fixtureBold(), fixtureItalic(), fixtureHeading()]).fingerprint).toBe(base.fingerprint);
        expect(base.fingerprint).toMatch(/^[0-9a-f]{64}$/);
        for (const variant of variants) {
            expect(variant.fingerprint).not.toBe(base.fingerprint);
        }
    });

    it('gives a key payload with an undefined member the fingerprint of one without it', () => {
        const withPayload = (payload: JsonObject) =>
            feature({
                id: 'a.keys',
                version: 1,
                commands: {
                    'a.set': setBlock('paragraph', {
                        payload: { fields: { level: { type: 'integer', optional: true } } },
                    }),
                },
                keys: { 'Mod-1': { command: 'a.set', payload } },
            });
        const undefinedLevel = { level: undefined } as unknown as JsonObject;
        const absent = compile([core(), withPayload({})]);
        expect(compile([core(), withPayload(undefinedLevel)]).fingerprint).toBe(absent.fingerprint);
        expect(canonicalJson({ ...undefinedLevel, mode: 'x' })).toBe(canonicalJson({ mode: 'x' }));
    });

    it('keeps the manifest and fingerprint when the caller mutates an option or a declaration', () => {
        const items = ['a'];
        const payload = { level: 2 };
        const factory = defineFeature({
            id: 'a.items',
            version: 1,
            requires: [{ id: 'fixture.heading', version: 1 }],
            options: { items: { type: 'list', items: { type: 'string' }, default: [] } },
            keys: { 'Mod-1': { command: 'fixture.heading.set', payload } },
        });
        const itemsFeature = factory({ items });
        const model = compile([core(), fixtureHeading(), itemsFeature]);
        const before = JSON.stringify(model.manifest);
        items.push('b');
        payload.level = 3;
        expect(JSON.stringify(model.manifest)).toBe(before);
        expect(Object.isFrozen(model.manifest.features)).toBe(true);
        expect(compile([core(), fixtureHeading(), itemsFeature]).fingerprint).toBe(model.fingerprint);
        expect(compile([core(), fixtureHeading(), factory({ items: ['a'] })]).fingerprint).toBe(model.fingerprint);
    });
});

describe('compileContentModel manifest', () => {
    it.each(Object.entries(fixtureProfiles()))('emits the manifest of the %s profile stand-in', (_name, features) => {
        const model = compile(features);
        expect(model.manifest).toMatchSnapshot();
        expect(JSON.parse(JSON.stringify(model.manifest))).toEqual(model.manifest);
    });
});
