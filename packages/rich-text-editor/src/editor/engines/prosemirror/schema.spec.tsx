/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { describe, expect, it } from 'vitest';

import {
    buildPluginRegistry,
    defineBlock,
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
        content: {
            marks: {
                bold: defineMark({
                    toHtml: () => ({ tag: 'strong', children: true }),
                    parse: [{ tag: 'strong' }, { tag: 'b' }],
                }),
            },
        },
    }),
    definePlugin({
        id: 'link',
        content: {
            marks: {
                link: defineMark<{ href: string }>({
                    toHtml: ({ href }) => ({ tag: 'a', attrs: { href }, children: true }),
                    parse: [{ tag: 'a', value: (element) => ({ href: element.getAttribute('href') ?? '' }) }],
                }),
            },
        },
    }),
    definePlugin({
        id: 'quote',
        content: {
            blocks: {
                quote: defineBlock({
                    content: 'text',
                    toHtml: () => ({ tag: 'blockquote', children: true }),
                    parse: [{ tag: 'blockquote' }],
                }),
            },
        },
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
                content: {
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
                },
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
                    content: {
                        blocks: {
                            bulletList: defineBlock({
                                content: { items: 'nope' },
                                toHtml: () => ({ tag: 'ul', children: true }),
                                parse: [{ tag: 'ul' }],
                            }),
                        },
                    },
                }),
            ]),
        ).toThrow('Block "bulletList" declares items of type "nope", which is not registered.');
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
                content: {
                    marks: {
                        highlight: defineMark<{ color: string }>({
                            defaults: { color: 'yellow' },
                            toHtml: ({ color }) => ({ tag: 'mark', attrs: { 'data-color': color }, children: true }),
                            parse: [{ tag: 'mark' }],
                        }),
                    },
                },
            }),
        ]);

        expect(schema.marks.highlight?.create().attrs).toEqual({ value: { color: 'yellow' } });
    });

    it('gives an inline without editing UI its declared defaults, and one with editing UI a draft', () => {
        const schema = buildSchema([
            definePlugin({
                id: 'chips',
                content: {
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
                },
                edit: { draft: () => null },
            }),
        ]);

        expect(schema.nodes.chip?.create().attrs).toEqual({ value: { label: 'new' } });
        expect(schema.nodes.draft?.create().attrs).toEqual({ value: null });
    });
});
