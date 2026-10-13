/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { describe, expect, it } from 'vitest';

import { buildPluginRegistry, defineBlock, defineMark, type RtePlugin } from '#/core';

import { buildSchema as buildSchemaFromRegistry } from './schema';

const buildSchema = (plugins: RtePlugin[]) => buildSchemaFromRegistry(buildPluginRegistry(plugins));

const plugins: RtePlugin[] = [
    {
        id: 'bold',
        marks: {
            bold: defineMark({
                toHtml: () => ({ tag: 'strong', children: true }),
                parse: [{ tag: 'strong' }, { tag: 'b' }],
            }),
        },
    },
    {
        id: 'link',
        marks: {
            link: defineMark<{ href: string }>({
                toHtml: ({ href }) => ({ tag: 'a', attrs: { href }, children: true }),
                parse: [{ tag: 'a', value: (element) => ({ href: element.getAttribute('href') ?? '' }) }],
            }),
        },
    },
    {
        id: 'quote',
        blocks: {
            quote: defineBlock({
                content: 'text',
                toHtml: () => ({ tag: 'blockquote', children: true }),
                parse: [{ tag: 'blockquote' }],
            }),
        },
    },
];

describe('buildSchema', () => {
    it('uses the declared parse rules', () => {
        const { schema } = buildSchema(plugins);

        expect(schema.marks.bold?.spec.parseDOM?.map((rule) => rule.tag)).toEqual(['strong', 'b']);
        expect(schema.marks.link?.spec.parseDOM?.map((rule) => rule.tag)).toEqual(['a']);
        expect(schema.nodes.quote?.spec.parseDOM?.map((rule) => rule.tag)).toEqual(['blockquote']);
    });

    it('turns HtmlSpec children:true into a content hole', () => {
        const { schema } = buildSchema(plugins);
        const mark = schema.marks.bold?.create();
        if (!mark || !schema.marks.bold?.spec.toDOM) {
            throw new Error('bold mark missing');
        }

        expect(schema.marks.bold.spec.toDOM(mark, true)).toEqual(['strong', 0]);
    });

    it('declares the paragraph baseline first, so it is the default block', () => {
        const { schema } = buildSchema(plugins);

        expect(schema.topNodeType.contentMatch.defaultType?.name).toBe('paragraph');
    });

    it('keeps list items out of the top-level block group', () => {
        const { schema, itemTypeByList } = buildSchema([
            {
                id: 'list',
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
        ]);

        expect(itemTypeByList.get('bulletList')).toBe('listItem');
        expect(schema.nodes.listItem?.spec.group).toBeUndefined();
        expect(schema.nodes.bulletList?.spec.group).toBe('block');
    });
});
