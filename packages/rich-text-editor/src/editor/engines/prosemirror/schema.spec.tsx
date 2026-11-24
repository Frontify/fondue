/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { describe, expect, it } from 'vitest';

import {
    buildPluginRegistry,
    defineBlock,
    defineContent,
    defineInline,
    defineMark,
    definePlugin,
    type RteDocumentOf,
    type RtePlugin,
} from '#/core';

import { toEngineDocument, toRteDocument } from './documentConversion';
import { buildSchema as buildSchemaFromRegistry } from './schema';
import { shipped } from './testEditor';

const buildSchema = (plugins: RtePlugin[]) => buildSchemaFromRegistry(buildPluginRegistry(plugins));

const plugins: RtePlugin[] = [
    definePlugin({
        id: 'bold',
        content: defineContent({
            marks: {
                bold: defineMark({
                    toHtml: () => ({ tag: 'strong', children: true }),
                    parse: [{ tag: 'strong' }, { tag: 'b' }],
                }),
            },
        }),
    }),
    definePlugin({
        id: 'link',
        content: defineContent({
            marks: {
                link: defineMark<{ href: string }>({
                    toHtml: ({ href }) => ({ tag: 'a', attrs: { href }, children: true }),
                    parse: [{ tag: 'a', value: (element) => ({ href: element.getAttribute('href') ?? '' }) }],
                }),
            },
        }),
    }),
    definePlugin({
        id: 'quote',
        content: defineContent({
            blocks: {
                quote: defineBlock({
                    content: 'text',
                    toHtml: () => ({ tag: 'blockquote', children: true }),
                    parse: [{ tag: 'blockquote' }],
                }),
            },
        }),
    }),
];

describe('buildSchema', () => {
    it('uses the declared parse rules', () => {
        const schema = buildSchema(plugins);

        expect(schema.marks.bold?.spec.parseDOM?.map((rule) => rule.tag)).toEqual(['strong', 'b']);
        expect(schema.marks.link?.spec.parseDOM?.map((rule) => rule.tag)).toEqual(['a']);
        expect(schema.nodes.quote?.spec.parseDOM?.map((rule) => rule.tag)).toEqual(['blockquote']);
    });

    it('turns HtmlSpec children:true into a content hole', () => {
        const schema = buildSchema(plugins);
        const mark = schema.marks.bold?.create();
        if (!mark || !schema.marks.bold?.spec.toDOM) {
            throw new Error('bold mark missing');
        }

        expect(schema.marks.bold.spec.toDOM(mark, true)).toEqual(['strong', 0]);
    });

    it('declares the paragraph baseline first, so it is the default block', () => {
        const schema = buildSchema(plugins);

        expect(schema.topNodeType.contentMatch.defaultType?.name).toBe('paragraph');
    });

    it('keeps list items out of the top-level block group', () => {
        const schema = buildSchema([
            definePlugin({
                id: 'list',
                content: defineContent({
                    blocks: {
                        bulletList: defineBlock({
                            content: { items: 'listItem' },
                            toHtml: () => ({ tag: 'ul', children: true }),
                            parse: [{ tag: 'ul' }],
                        }),
                        listItem: defineBlock({
                            content: { blocks: ['paragraph'] },
                            toHtml: () => ({ tag: 'li', children: true }),
                            parse: [{ tag: 'li' }],
                        }),
                    },
                }),
            }),
        ]);

        expect(schema.nodes.bulletList?.contentMatch.defaultType?.name).toBe('listItem');
        expect(schema.nodes.listItem?.spec.group).toBeUndefined();
        expect(schema.nodes.bulletList?.spec.group).toBe('block');
    });

    it('refuses a list whose item type is not registered, rather than making it a leaf', () => {
        expect(() =>
            buildSchema([
                definePlugin({
                    id: 'list',
                    content: defineContent({
                        blocks: {
                            bulletList: defineBlock({
                                content: { items: 'nope' },
                                toHtml: () => ({ tag: 'ul', children: true }),
                                parse: [{ tag: 'ul' }],
                            }),
                        },
                    }),
                }),
            ]),
        ).toThrow('Block "bulletList" declares items of type "nope", which is not registered.');
    });

    describe('a block made of parts', () => {
        // Three levels, generic names: an outer block holds middles, a middle holds inners of two kinds, an inner holds blocks.
        const outer = definePlugin({
            id: 'outer',
            content: defineContent({
                blocks: {
                    outer: defineBlock({
                        content: { parts: ['middle'] },
                        toHtml: () => ({ tag: 'section', children: true }),
                        parse: [{ tag: 'section' }],
                    }),
                    middle: defineBlock({
                        content: { parts: ['inner', 'innerAlt'] },
                        toHtml: () => ({ tag: 'div', attrs: { class: 'middle' }, children: true }),
                        parse: [{ tag: 'div.middle' }],
                    }),
                    inner: defineBlock({
                        content: { blocks: ['paragraph'] },
                        toHtml: () => ({ tag: 'div', attrs: { class: 'inner' }, children: true }),
                        parse: [{ tag: 'div.inner' }],
                    }),
                    innerAlt: defineBlock({
                        content: { blocks: ['paragraph'] },
                        toHtml: () => ({ tag: 'div', attrs: { class: 'head' }, children: true }),
                        parse: [{ tag: 'div.head' }],
                    }),
                },
            }),
        });

        it('holds one or more of its parts, in any order', () => {
            const schema = buildSchema([outer]);

            expect(schema.nodes.outer?.spec.content).toBe('(middle)+');
            expect(schema.nodes.middle?.spec.content).toBe('(inner | innerAlt)+');
        });

        it('keeps its parts out of the top-level block group, where it stands itself', () => {
            const schema = buildSchema([outer]);

            expect(schema.nodes.outer?.spec.group).toBe('block');
            expect(schema.nodes.middle?.spec.group).toBeUndefined();
            expect(schema.nodes.inner?.spec.group).toBeUndefined();
            expect(schema.nodes.innerAlt?.spec.group).toBeUndefined();
            expect(schema.nodes.doc?.contentMatch.matchType(schema.nodes.middle!)).toBeNull();
        });

        it('is not a list, and not defining', () => {
            const schema = buildSchema([outer]);

            expect(schema.nodes.outer?.spec.defining).toBeUndefined();
            expect(schema.nodes.middle?.spec.defining).toBeUndefined();
        });

        it('round-trips through the engine, three levels deep', () => {
            const schema = buildSchema([outer]);
            const paragraph = (text: string) => ({ type: 'paragraph', children: [{ text }] });
            const stored = {
                version: 1,
                blocks: [
                    {
                        type: 'outer',
                        children: [
                            {
                                type: 'middle',
                                children: [
                                    { type: 'innerAlt', children: [paragraph('A')] },
                                    { type: 'innerAlt', children: [paragraph('B')] },
                                ],
                            },
                            {
                                type: 'middle',
                                children: [
                                    { type: 'inner', children: [paragraph('1')] },
                                    { type: 'inner', children: [paragraph('2'), paragraph('3')] },
                                ],
                            },
                        ],
                    },
                ],
            } as RteDocumentOf;

            expect(toRteDocument(toEngineDocument(stored, schema))).toEqual(stored);
        });

        it('refuses a part standing on its own in the document', () => {
            const schema = buildSchema([outer]);
            const stored = {
                version: 1,
                blocks: [{ type: 'inner', children: [{ type: 'paragraph', children: [{ text: 'x' }] }] }],
            } as RteDocumentOf;

            expect(() => toEngineDocument(stored, schema)).toThrow();
        });

        it('refuses a part type that is not registered', () => {
            expect(() =>
                buildSchema([
                    definePlugin({
                        id: 'outer',
                        content: defineContent({
                            blocks: {
                                outer: defineBlock({
                                    content: { parts: ['nope'] },
                                    toHtml: () => ({ tag: 'section', children: true }),
                                    parse: [{ tag: 'section' }],
                                }),
                            },
                        }),
                    }),
                ]),
            ).toThrow('Block "outer" declares parts of type "nope", which is not registered.');
        });

        it('refuses parts that name no type', () => {
            expect(() =>
                buildSchema([
                    definePlugin({
                        id: 'outer',
                        content: defineContent({
                            blocks: {
                                outer: defineBlock({
                                    content: { parts: [] },
                                    toHtml: () => ({ tag: 'section', children: true }),
                                    parse: [{ tag: 'section' }],
                                }),
                            },
                        }),
                    }),
                ]),
            ).toThrow('Block "outer" declares parts but names no type.');
        });
    });

    it('refuses a mark style rule whose property is not a CSS property name', () => {
        expect(() =>
            buildSchema([
                definePlugin({
                    id: 'bold',
                    content: defineContent({
                        marks: {
                            bold: defineMark({
                                toHtml: () => ({ tag: 'strong', children: true }),
                                parse: [{ style: 'fontWeight', value: () => ({}) }],
                            }),
                        },
                    }),
                }),
            ]),
        ).toThrow('The "bold" mark reads "fontWeight", which is not a CSS property name such as font-weight.');
    });

    it('lets a mark take off the marks it excludes, ignoring a type no mounted plugin registers', () => {
        const both = buildSchema(shipped('subscript', 'superscript'));
        const subscriptOnly = buildSchema(shipped('subscript'));
        const superscriptOnly = buildSchema(shipped('superscript'));

        expect(both.marks.subscript?.spec.excludes).toBe('subscript superscript');
        expect(both.marks.superscript?.spec.excludes).toBe('superscript subscript');
        expect(subscriptOnly.marks.subscript?.spec.excludes).toBe('subscript');
        expect(superscriptOnly.marks.superscript?.spec.excludes).toBe('superscript');
    });

    it('keeps a stored run that carries both until it is edited', () => {
        const schema = buildSchema(shipped('subscript', 'superscript'));
        const stored: RteDocumentOf = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'both', subscript: true, superscript: true }] }],
        };

        expect(toRteDocument(toEngineDocument(stored, schema))).toEqual(stored);
    });

    it('gives a mark turned on without a value its declared defaults', () => {
        const schema = buildSchema([
            definePlugin({
                id: 'highlight',
                content: defineContent({
                    marks: {
                        highlight: defineMark<{ color: string }>({
                            defaults: { color: 'yellow' },
                            toHtml: ({ color }) => ({ tag: 'mark', attrs: { 'data-color': color }, children: true }),
                            parse: [{ tag: 'mark' }],
                        }),
                    },
                }),
            }),
        ]);

        expect(schema.marks.highlight?.create().attrs).toEqual({ value: { color: 'yellow' } });
    });

    it('gives an inline without editing UI its declared defaults, and one with editing UI a draft', () => {
        const schema = buildSchema([
            definePlugin({
                id: 'chips',
                content: defineContent({
                    inlines: {
                        chip: defineInline<{ label: string }>({
                            defaults: { label: 'new' },
                            toHtml: ({ label }) => ({ tag: 'span', children: label }),
                            parse: [],
                        }),
                        draft: defineInline<{ label: string }>({
                            defaults: { label: 'new' },
                            toHtml: ({ label }) => ({ tag: 'span', children: label }),
                            parse: [],
                        }),
                    },
                }),
                edit: { draft: () => null },
            }),
        ]);

        expect(schema.nodes.chip?.create().attrs).toEqual({ value: { label: 'new' } });
        expect(schema.nodes.draft?.create().attrs).toEqual({ value: null });
    });
});
