/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { describe, expect, it } from 'vitest';

import { buildPluginRegistry, defineMark, type RtePlugin } from '#/core';

import { buildSchema as buildSchemaFromRegistry } from './schema';

const buildSchema = (plugins: RtePlugin[]) => buildSchemaFromRegistry(buildPluginRegistry(plugins));

const plugins: RtePlugin[] = [
    {
        id: 'bold',
        marks: {
            bold: defineMark({
                toHtml: () => ({ tag: 'strong', children: true }),
                parse: [
                    { tag: 'strong', value: () => ({}) },
                    { tag: 'b', value: () => ({}) },
                ],
                renderComponent: ({ children }) => <strong>{children}</strong>,
            }),
        },
    },
    {
        id: 'link',
        marks: {
            link: defineMark<{ href: string }>({
                toHtml: ({ href }) => ({ tag: 'a', attrs: { href }, children: true }),
                parse: [{ tag: 'a', value: (element) => ({ href: element.getAttribute('href') ?? '' }) }],
                renderComponent: ({ children, value }) => <a href={value.href}>{children}</a>,
            }),
        },
    },
    {
        id: 'quote',
        schema: [
            {
                kind: 'block',
                type: 'quote',
                children: 'text',
                toDom: () => ({ tag: 'blockquote', children: true }),
                renderComponent: ({ children }) => <blockquote>{children}</blockquote>,
                parseRules: [{ tag: 'blockquote' }],
            },
        ],
    },
];

describe('buildSchema', () => {
    it('uses the declared parseRules', () => {
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
                schema: [
                    {
                        kind: 'block',
                        type: 'bulletList',
                        children: { items: 'listItem' },
                        toDom: () => ({ tag: 'ul', children: true }),
                        renderComponent: ({ children }) => <ul>{children}</ul>,
                        parseRules: [{ tag: 'ul' }],
                    },
                    {
                        kind: 'block',
                        type: 'listItem',
                        children: { blocks: ['paragraph'] },
                        toDom: () => ({ tag: 'li', children: true }),
                        renderComponent: ({ children }) => <li>{children}</li>,
                        parseRules: [{ tag: 'li' }],
                    },
                ],
            },
        ]);

        expect(itemTypeByList.get('bulletList')).toBe('listItem');
        expect(schema.nodes.listItem?.spec.group).toBeUndefined();
        expect(schema.nodes.bulletList?.spec.group).toBe('block');
    });
});
