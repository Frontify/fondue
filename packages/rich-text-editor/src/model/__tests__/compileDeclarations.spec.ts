/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, expectTypeOf, it } from 'vitest';

import {
    defineFeature,
    type FeatureDeclaration,
    type HtmlAttributeValue,
    type HtmlSpec,
    type JsonValue,
} from '#/model';
import { fixtureHeading } from '#/plugins/__tests__/fixtures/features';
import { core } from '#/plugins/Core/feature';
import { links } from '#/plugins/Link/feature';

import { pointer } from '../errors';

import { compile, requiresCore, feature, failureOf, block } from './fixtures/compileFeatures';

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
        ['', 'is empty'],
        ['   ', 'is only whitespace'],
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

    const callout = (markdown: unknown) =>
        feature({
            id: 'a.x',
            version: 1,
            nodes: { callout: { ...block('inline*'), markdown } },
        } as FeatureDeclaration);
    const markdownAt = '/nodes/callout/markdown';
    it.each([
        ['both a prefix and a fence', { prefix: '> ', fence: '```' }, markdownAt],
        ['neither a prefix nor a fence', {}, markdownAt],
        ['a prefix longer than four characters', { prefix: '#####' }, `${markdownAt}/prefix`],
        ['a character a prefix cannot hold', { prefix: '<' }, `${markdownAt}/prefix`],
        ['a fence that starts with three tildes', { fence: '~~~#' }, `${markdownAt}/fence`],
        ['both a prefix and a dollar fence', { prefix: '> ', fence: '$$' }, markdownAt],
        ['a prefix that could open HTML', { prefix: '<b>' }, `${markdownAt}/prefix`],
        ['a prefix that could open a link', { prefix: '[x](' }, `${markdownAt}/prefix`],
        ['a prefix of a backslash', { prefix: '\\' }, `${markdownAt}/prefix`],
    ])('rejects a markdown form with %s', (_problem, markdown, path) => {
        expect(failureOf(() => compile([core(), callout(markdown)]))).toEqual({
            code: 'definition.invalid-declaration',
            details: { feature: 'a.x', path },
        });
    });

    it.each(['~~~ ', '``` ', '$$ ', '`', '``', '```~', '~~~$', '$`$'])(
        'rejects the fence form %j, which would open a code fence or span that the body cannot read back from',
        (fence) => {
            expect(failureOf(() => compile([core(), callout({ fence })]))).toEqual({
                code: 'definition.invalid-declaration',
                details: { feature: 'a.x', path: `${markdownAt}/fence` },
            });
        },
    );

    it.each([
        ['prefix', { prefix: '> ' }],
        ['fence of three backticks', { fence: '```' }],
        ['fence of three tildes', { fence: '~~~' }],
        ['fence of four backticks', { fence: '````' }],
        ['fence of four tildes', { fence: '~~~~' }],
        ['fence of two dollars', { fence: '$$' }],
        ['fence of two tildes', { fence: '~~' }],
    ])('accepts a markdown %s', (_form, markdown) => {
        expect(compile([core(), callout(markdown)]).manifest.nodes).toContain('callout');
    });

    const note = (markdown: unknown) =>
        feature({
            id: 'a.x',
            version: 1,
            marks: { note: { attrs: {}, html: ['em', 0], parse: [], markdown } },
        } as FeatureDeclaration);
    it.each([
        ['opening delimiter is longer than four characters', { open: '#####', close: '~~' }, '/open'],
        ['closing delimiter contains <', { open: '~~', close: '<' }, '/close'],
        ['opening delimiter contains <', { open: '<', close: '~~' }, '/open'],
        ['opening delimiter could open HTML', { open: '<b>', close: '==' }, '/open'],
        ['opening delimiter is an HTML entity', { open: '&lt;', close: '==' }, '/open'],
        ['opening delimiter is two letters', { open: 'ab', close: '==' }, '/open'],
        ['closing delimiter could close a link', { open: '==', close: ')' }, '/close'],
    ])('rejects a mark whose %s', (_problem, markdown, suffix) => {
        expect(failureOf(() => compile([core(), note(markdown)]))).toEqual({
            code: 'definition.invalid-declaration',
            details: { feature: 'a.x', path: `/marks/note/markdown${suffix}` },
        });
    });

    it.each(['~~', '=='])('accepts mark delimiters of %s', (delimiter) => {
        const declaration = {
            id: 'a.x',
            version: 1,
            marks: {
                note: {
                    attrs: {},
                    html: ['em', 0] as const,
                    parse: [],
                    markdown: { open: delimiter, close: delimiter },
                },
            },
        };
        expect(compile([core(), feature(declaration)]).manifest.marks).toContain('note');
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

    it('rejects an attribute binding that names only a prototype member', () => {
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

    it('rejects a javascript: literal src in a code feature and accepts the links feature', () => {
        const image = {
            id: 'a.image',
            version: 1,
            nodes: { picture: { group: 'block', attrs: {}, html: ['img', { src: 'javascript:alert(1)' }], parse: [] } },
        } as const;
        expect(failureOf(() => compile([core(), feature(image)]))).toEqual({
            code: 'definition.unsafe-url-binding',
            details: { feature: 'a.image', path: '/nodes/picture/html/1/src' },
        });
        expect(compile([core(), links()]).manifest.marks).toEqual(['link']);
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

    it('rejects a string attribute bound to a React URL prop or srcdoc', () => {
        for (const name of ['xlinkHref', 'srcDoc', 'formAction', 'srcSet', 'SRCDOC']) {
            const card = feature({
                id: 'a.card',
                version: 1,
                nodes: {
                    card: {
                        group: 'block',
                        attrs: { label: { type: 'string', default: '' } },
                        html: ['svg', { [name]: { attr: 'label' } }],
                        parse: [],
                    },
                },
            });
            expect(failureOf(() => compile([core(), card]))).toEqual({
                code: 'definition.unsafe-url-binding',
                details: { feature: 'a.card', path: `/nodes/card/html/1${pointer(name)}` },
            });
        }
    });

    it('rejects any srcdoc key, literal or binding, whatever the attribute type or the case', () => {
        const bound = (name: string, value: object) =>
            ({
                id: 'a.card',
                version: 1,
                options: { target: { type: 'url', default: '/x' } },
                nodes: {
                    card: {
                        group: 'block',
                        attrs: { page: { type: 'url', default: '/x' } },
                        html: ['iframe', { [name]: value }],
                        parse: [],
                    },
                },
            }) as FeatureDeclaration;
        for (const name of ['srcdoc', 'SRCDOC', 'srcDoc']) {
            for (const value of [{ attr: 'page' }, { option: 'target' }, '/brand']) {
                expect(failureOf(() => compile([core(), feature(bound(name, value as object))]))).toEqual({
                    code: 'definition.unsafe-url-binding',
                    details: { feature: 'a.card', path: `/nodes/card/html/1${pointer(name)}` },
                });
            }
        }
    });

    it('rejects a shared attribute bound to srcdoc even when it is a url', () => {
        const shared = feature({
            id: 'a.shared',
            version: 1,
            attributes: {
                page: {
                    on: ['paragraph'],
                    value: { type: 'url', default: null, nullable: true },
                    html: { attr: 'srcDoc' },
                },
            },
        });

        expect(failureOf(() => compile([core(), shared]))).toEqual({
            code: 'definition.unsafe-url-binding',
            details: { feature: 'a.shared', path: '/attributes/page/html' },
        });
    });

    it('rejects a stored value bound to the style attribute, whatever the case', () => {
        const bound = (name: string) =>
            feature({
                id: 'a.card',
                version: 1,
                nodes: {
                    card: {
                        group: 'block',
                        attrs: { css: { type: 'string', default: '' } },
                        html: ['div', { [name]: { attr: 'css' } }, 0],
                        parse: [],
                    },
                },
            });
        for (const name of ['style', 'STYLE', 'Style']) {
            expect(failureOf(() => compile([core(), bound(name)]))).toEqual({
                code: 'definition.invalid-declaration',
                details: { feature: 'a.card', path: `/nodes/card/html/1${pointer(name)}` },
            });
        }

        for (const name of ['style', 'STYLE']) {
            const shared = feature({
                id: 'a.shared',
                version: 1,
                attributes: {
                    css: {
                        on: ['paragraph'],
                        value: { type: 'string', default: null, nullable: true },
                        html: { attr: name },
                    },
                },
            });

            expect(failureOf(() => compile([core(), shared]))).toEqual({
                code: 'definition.invalid-declaration',
                details: { feature: 'a.shared', path: '/attributes/css/html' },
            });
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

    it('rejects a failing attribute default', () => {
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
        expect(failureOf(() => compile([core(), unsafeDefault])).details).toEqual({
            feature: 'a.card',
            path: '/nodes/card/attrs/href/default',
        });
    });

    it('types, defaults and checks code feature options', () => {
        expectTypeOf(core).parameter(0).toEqualTypeOf<object | undefined>();
        // Stays readonly: `OptionsOf` yields readonly members, and `toEqualTypeOf` compares the modifier.
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

    it('rejects a regular expression or a prototype key in an option value', () => {
        const json = defineFeature({
            id: 'a.json',
            version: 1,
            options: { tone: { type: 'json', nullable: true, default: null } },
        });
        for (const [value, path] of [
            [/x/, '/options/tone'],
            [JSON.parse('{ "constructor": 1 }'), '/options/tone/constructor'],
        ] as const) {
            expect(failureOf(() => compile([core(), json({ tone: value as unknown as JsonValue })]))).toEqual({
                code: 'definition.invalid-option',
                details: { feature: 'a.json', path },
            });
        }
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
