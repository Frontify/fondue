/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ANY_LIST,
    defineBlock,
    defineContent,
    defineMark,
    definePlugin,
    PARAGRAPH,
    type RtePlugin,
    type StyleMap,
} from '#/core';

// The engine reads declarations, never which shipped plugin makes them, so specs on these fail for engine reasons only.

type MarkFixtureParams = { name: string; tag: string };

const markFixture = ({ name, tag }: MarkFixtureParams): RtePlugin =>
    definePlugin({
        id: `fixture-${name}`,
        content: defineContent({ marks: { [name]: defineMark({ tag, parse: [{ tag }] }) } }),
    });

type RefFixtureValue = { target: string };

const refFixture: RtePlugin = definePlugin({
    id: 'fixture-ref',
    content: defineContent({
        marks: {
            ref: defineMark<RefFixtureValue>({
                survivesClear: true,
                toHtml: ({ target }) => ({ tag: 'a', attrs: { href: target }, children: true }),
                parse: [{ tag: 'a', value: (element) => ({ target: element.getAttribute('href') ?? '' }) }],
            }),
        },
    }),
});

const listItem = defineBlock({
    content: { blocks: [PARAGRAPH, ANY_LIST] },
    toHtml: () => ({ tag: 'li', children: true }),
    parse: [{ tag: 'li' }],
});

const bulletList = defineBlock({
    content: { items: 'listItem' },
    toHtml: () => ({ tag: 'ul', children: true }),
    parse: [{ tag: 'ul' }],
});

const numberedList = defineBlock({
    content: { items: 'listItem' },
    toHtml: () => ({ tag: 'ol', children: true }),
    parse: [{ tag: 'ol' }],
});

const listFixture: RtePlugin = definePlugin({
    id: 'fixture-lists',
    content: defineContent({ blocks: { bulletList, numberedList, listItem } }),
});

type HeadingFixtureValue = { level: number };

const headingFixture: RtePlugin = definePlugin({
    id: 'fixture-heading',
    content: defineContent({
        blocks: {
            heading: defineBlock<HeadingFixtureValue>({
                content: 'text',
                defaults: { level: 1 },
                toHtml: () => ({ tag: 'h2', children: true }),
                parse: [],
            }),
        },
    }),
});

const attributeFixture: RtePlugin = definePlugin({
    id: 'fixture-attribute',
    content: defineContent({
        blockAttributes: {
            tone: {
                style: (value): StyleMap => ({ color: String(value) }),
                parse: () => null,
            },
        },
    }),
});

/**
 * Marks named `bold`, `italic`, `underline` and `code`, a `ref` mark with a value that survives a clear, `bulletList`
 * and `numberedList` over one `listItem`, a `heading` block with a `level`, and a `tone` block attribute.
 */
export const fixturePlugins: RtePlugin[] = [
    markFixture({ name: 'bold', tag: 'strong' }),
    markFixture({ name: 'italic', tag: 'em' }),
    markFixture({ name: 'underline', tag: 'u' }),
    markFixture({ name: 'code', tag: 'code' }),
    refFixture,
    listFixture,
    headingFixture,
    attributeFixture,
];
