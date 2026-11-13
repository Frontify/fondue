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

/**
 * Content of the engine specs' own. The engine reads declarations (a mark that survives a clear, an item list, a
 * block attribute), never which shipped plugin makes them, so a spec built on these fails for an engine reason only.
 */

type MarkFixtureParams = { name: string; tag: string };

const markFixture = ({ name, tag }: MarkFixtureParams): RtePlugin =>
    definePlugin({
        id: `fixture-${name}`,
        content: defineContent({ marks: { [name]: defineMark({ tag, parse: [{ tag }] }) } }),
    });

type LinkFixtureValue = { href: string };

/** A mark with a value that declares it survives a clear. */
const linkFixture: RtePlugin = definePlugin({
    id: 'fixture-link',
    content: defineContent({
        marks: {
            link: defineMark<LinkFixtureValue>({
                survivesClear: true,
                toHtml: ({ href }) => ({ tag: 'a', attrs: { href }, children: true }),
                parse: [{ tag: 'a', value: (element) => ({ href: element.getAttribute('href') ?? '' }) }],
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

/** Two kinds of list that share one item. */
const listFixture: RtePlugin = definePlugin({
    id: 'fixture-lists',
    content: defineContent({ blocks: { bulletList, numberedList, listItem } }),
});

type HeadingFixtureValue = { level: number };

/** A text block with an attribute of its own, as a block type other than the paragraph. */
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

/** An attribute every text block carries, whichever plugin declared the block. */
const attributeFixture: RtePlugin = definePlugin({
    id: 'fixture-attribute',
    content: defineContent({
        blockAttributes: {
            align: {
                style: (value): StyleMap => ({ 'text-align': String(value) }),
                parse: () => null,
            },
        },
    }),
});

/**
 * Marks named `bold`, `italic`, `underline` and `code`, a `link` mark with a value that survives a clear, `bulletList`
 * and `numberedList` over one `listItem`, a `heading` block with a `level`, and an `align` block attribute.
 */
export const fixturePlugins: RtePlugin[] = [
    markFixture({ name: 'bold', tag: 'strong' }),
    markFixture({ name: 'italic', tag: 'em' }),
    markFixture({ name: 'underline', tag: 'u' }),
    markFixture({ name: 'code', tag: 'code' }),
    linkFixture,
    listFixture,
    headingFixture,
    attributeFixture,
];
