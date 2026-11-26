/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type MarkdownMarkForm } from '../../core';
import { bulletListContent, defaultContent, mentionContent } from '../../plugins';
import { type MarkdownOptions, parseMarkdown, parseMarkdownWithLosses } from '../index';

import { codeLanguageOverrideOptions, linkTargetOverrideOptions } from './markSuffixOverride.fixture';
import { mentionOverrideOptions } from './mentionOverride.fixture';

const OPTIONS: MarkdownOptions = { plugins: defaultContent };

const EMPTY_DOCUMENT = { version: 1, blocks: [{ type: 'paragraph', children: [{ text: '' }] }] };

describe('parseMarkdown', () => {
    it('reads an empty string as the empty document', () => {
        expect(parseMarkdown('', OPTIONS)).toEqual(EMPTY_DOCUMENT);
    });

    it('reads whitespace only as the empty document', () => {
        expect(parseMarkdown('  \n\n \n', OPTIONS)).toEqual(EMPTY_DOCUMENT);
    });

    it('reads the empty paragraph entity as an empty paragraph', () => {
        expect(parseMarkdown('&nbsp;', OPTIONS)).toEqual({
            version: 1,
            blocks: [{ type: 'paragraph', children: [] }],
        });
    });
});

describe('parseMarkdownWithLosses', () => {
    it('returns the parsed document without losses for supported Markdown', () => {
        const markdown = '# Title\n\n> **Quote**\n\n[Guide](/guide)\n\n&nbsp;';

        expect(parseMarkdownWithLosses(markdown, OPTIONS)).toEqual({
            document: parseMarkdown(markdown, OPTIONS),
            losses: [],
        });
    });

    it('reports lost image sources and link titles by source line', () => {
        const markdown = 'Intro\n\n![Logo](/logo.png)\n\n[Guide](/guide "A guide")';

        expect(parseMarkdownWithLosses(markdown, OPTIONS)).toEqual({
            document: parseMarkdown(markdown, OPTIONS),
            losses: [
                { type: 'image', line: 3 },
                { type: 'link_title', line: 5 },
            ],
        });
    });

    it.each(['> # Heading', '> - Item', '> > Nested quote', '> First\n>\n> Second'])(
        'reports quote structure that the document cannot keep in %j',
        (markdown) => {
            expect(parseMarkdownWithLosses(markdown, OPTIONS).losses).toContainEqual({
                type: 'blockquote_open',
                line: 1,
            });
        },
    );

    it('reports the loss of formatting without a reader', () => {
        const markdown = '**Bold**\n\n---\n\n```ts\nlet x = 1;\n```';

        expect(parseMarkdownWithLosses(markdown, { plugins: [] }).losses).toEqual([
            { type: 'strong_open', line: 1 },
            { type: 'hr', line: 3 },
            { type: 'fence', line: 5 },
        ]);
    });
});

describe('parseMarkdown line breaks', () => {
    it('reads a single newline as a space by default', () => {
        expect(parseMarkdown('a\nb', OPTIONS)).toEqual({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a b' }] }],
        });
    });

    it('reads a single newline as a break with breaks: true', () => {
        expect(parseMarkdown('a\nb', { plugins: defaultContent, breaks: true })).toEqual({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a' }, { type: 'break' }, { text: 'b' }] }],
        });
    });

    it('reads a hard break as a space when no plugin has a break', () => {
        expect(parseMarkdown('a\\\nb', { plugins: [] })).toEqual({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a b' }] }],
        });
    });
});

describe('parseMarkdown links', () => {
    it('reads a javascript: link as its text', () => {
        expect(parseMarkdown('[x](javascript:alert(1))', OPTIONS)).toEqual({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: '[x](javascript:alert(1))' }] }],
        });
    });

    it('reads a link to a scheme the link plugin does not allow as its text without the link', () => {
        expect(parseMarkdown('[x](ftp://example.com)', OPTIONS)).toEqual({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'x' }] }],
        });
    });

    it('reads a bare URL as a link', () => {
        expect(parseMarkdown('see https://example.com now', OPTIONS)).toEqual({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [
                        { text: 'see ' },
                        { text: 'https://example.com', link: { href: 'https://example.com' } },
                        { text: ' now' },
                    ],
                },
            ],
        });
    });
});

describe('parseMarkdown autolinks', () => {
    const linkOf = (text: string, href: string) => ({
        version: 1,
        blocks: [{ type: 'paragraph', children: [{ text, link: { href } }] }],
    });

    it('reads an address with a scheme as a link', () => {
        expect(parseMarkdown('https://x.com', OPTIONS)).toEqual(linkOf('https://x.com', 'https://x.com'));
    });

    it('reads an address starting with www as a link to https', () => {
        expect(parseMarkdown('www.x.com', OPTIONS)).toEqual(linkOf('www.x.com', 'http://www.x.com'));
    });

    it('reads an email address in angle brackets as a mailto link', () => {
        expect(parseMarkdown('<ana@example.com>', OPTIONS)).toEqual(
            linkOf('ana@example.com', 'mailto:ana@example.com'),
        );
    });

    it('reads a protocol relative address as text', () => {
        expect(parseMarkdown('see //evil.com', OPTIONS)).toEqual({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'see //evil.com' }] }],
        });
    });

    it('reads a bare domain as text', () => {
        expect(parseMarkdown('see example.com', OPTIONS)).toEqual({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'see example.com' }] }],
        });
    });
});

describe('parseMarkdown lists', () => {
    const TWO_ITEMS = '- a\n- b';

    it('reads a numbered list starting at 1 without a start', () => {
        expect(parseMarkdown('1. a', OPTIONS)).toEqual({
            version: 1,
            blocks: [
                {
                    type: 'numberedList',
                    children: [{ type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'a' }] }] }],
                },
            ],
        });
    });

    it('reads a list when only the list content is given, with no list plugin', () => {
        expect(parseMarkdown(TWO_ITEMS, { plugins: [bulletListContent()] })).toEqual({
            version: 1,
            blocks: [
                {
                    type: 'bulletList',
                    children: [
                        { type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'a' }] }] },
                        { type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'b' }] }] },
                    ],
                },
            ],
        });
    });

    it('reads each item as a top-level block when no list content is given', () => {
        expect(parseMarkdown(TWO_ITEMS, { plugins: [] })).toEqual({
            version: 1,
            blocks: [
                { type: 'paragraph', children: [{ text: 'a' }] },
                { type: 'paragraph', children: [{ text: 'b' }] },
            ],
        });
    });

    it('reads a heading inside a list item as a paragraph', () => {
        expect(parseMarkdown('- # a', OPTIONS)).toEqual({
            version: 1,
            blocks: [
                {
                    type: 'bulletList',
                    children: [{ type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'a' }] }] }],
                },
            ],
        });
    });
});

describe('parseMarkdown with no text to put in a block', () => {
    const EMPTY_ITEM_LIST = {
        version: 1,
        blocks: [
            {
                type: 'bulletList',
                children: [{ type: 'listItem', children: [{ type: 'paragraph', children: [] }] }],
            },
        ],
    };

    it('reads a list item with no content as an item holding one empty paragraph', () => {
        expect(parseMarkdown('-', OPTIONS)).toEqual(EMPTY_ITEM_LIST);
    });

    it('reads a list marker followed by a space as an item holding one empty paragraph', () => {
        expect(parseMarkdown('- ', OPTIONS)).toEqual(EMPTY_ITEM_LIST);
    });

    it('reads Markdown that is only a horizontal rule as the empty document', () => {
        expect(parseMarkdown('---', OPTIONS)).toEqual(EMPTY_DOCUMENT);
    });

    it('reads Markdown that is only an empty quote as the empty document', () => {
        expect(parseMarkdown('>', OPTIONS)).toEqual(EMPTY_DOCUMENT);
    });
});

describe('parseMarkdown with nothing to read a token by', () => {
    it('reads a heading as a paragraph when no plugin has a heading', () => {
        expect(parseMarkdown('## Title', { plugins: [] })).toEqual({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'Title' }] }],
        });
    });

    it('keeps the text of emphasis when no plugin has the mark', () => {
        expect(parseMarkdown('a **b** c', { plugins: [] })).toEqual({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a b c' }] }],
        });
    });

    it('reads a code fence as one paragraph with its lines joined by breaks', () => {
        expect(parseMarkdown('```\none\n\ntwo\n```', OPTIONS)).toEqual({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'one' }, { type: 'break' }, { type: 'break' }, { text: 'two' }],
                },
            ],
        });
    });

    it('drops the empty lines at the end of a code fence', () => {
        expect(parseMarkdown('```\nfoo\n\n```', OPTIONS)).toEqual({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'foo' }] }],
        });
    });

    it('reads a code fence of empty lines as the empty document', () => {
        expect(parseMarkdown('```\n\n\n```', OPTIONS)).toEqual(EMPTY_DOCUMENT);
    });

    it('keeps a literal non-breaking space from a code fence', () => {
        expect(parseMarkdown('```\n\u00A0\n```', OPTIONS)).toEqual({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: '\u00A0' }] }],
        });
    });

    it('reads the lines of a code fence joined by a space when no plugin has a break', () => {
        expect(parseMarkdown('```\none\ntwo\n```', { plugins: [] })).toEqual({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'one two' }] }],
        });
    });

    it('drops a horizontal rule', () => {
        expect(parseMarkdown('a\n\n---\n\nb', OPTIONS)).toEqual({
            version: 1,
            blocks: [
                { type: 'paragraph', children: [{ text: 'a' }] },
                { type: 'paragraph', children: [{ text: 'b' }] },
            ],
        });
    });

    it('reads an image as its alt text', () => {
        expect(parseMarkdown('![a cat](https://example.com/cat.png)', OPTIONS)).toEqual({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a cat' }] }],
        });
    });

    it('reads a table as one paragraph per cell', () => {
        expect(parseMarkdown('| a | b |\n| - | - |\n| c | d |', OPTIONS)).toEqual({
            version: 1,
            blocks: [
                { type: 'paragraph', children: [{ text: 'a' }] },
                { type: 'paragraph', children: [{ text: 'b' }] },
                { type: 'paragraph', children: [{ text: 'c' }] },
                { type: 'paragraph', children: [{ text: 'd' }] },
            ],
        });
    });

    it('keeps raw HTML as text', () => {
        expect(parseMarkdown('a <b>c</b>', OPTIONS)).toEqual({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a <b>c</b>' }] }],
        });
    });
});

describe('parseMarkdown mentions', () => {
    it('never reads a mention from text with the default mention content', () => {
        expect(parseMarkdown('Hi @ana', { plugins: [...defaultContent, mentionContent()] })).toEqual({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'Hi @ana' }] }],
        });
    });

    it('reads a mention where the override pattern matches', () => {
        expect(parseMarkdown('Hi @[user:123]', mentionOverrideOptions)).toEqual({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'Hi ' }, { type: 'mention', id: '123' }] }],
        });
    });

    it('reads an escaped override pattern as text', () => {
        expect(parseMarkdown(String.raw`@\[user:1\]`, mentionOverrideOptions)).toEqual({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: '@[user:1]' }] }],
        });
    });

    it('reads a pattern inside inline code as code, not a mention', () => {
        expect(parseMarkdown('`@[user:1]`', mentionOverrideOptions)).toEqual({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: '@[user:1]', code: true }] }],
        });
    });
});

describe('parseMarkdown mark suffixes', () => {
    const HREF = 'https://example.test';

    it('reads the suffix right after a link into the link and keeps the text after it', () => {
        expect(parseMarkdown(`[a](${HREF}){target="_blank"} after`, linkTargetOverrideOptions)).toEqual({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'a', link: { href: HREF, openInNewTab: true } }, { text: ' after' }],
                },
            ],
        });
    });

    it('leaves a suffix whose value reads as null as text and the link without it', () => {
        expect(parseMarkdown(`[a](${HREF}){target="_self"}`, linkTargetOverrideOptions)).toEqual({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'a', link: { href: HREF } }, { text: '{target="_self"}' }],
                },
            ],
        });
    });

    it('leaves a suffix after a space as text', () => {
        expect(parseMarkdown(`[a](${HREF}) {target="_blank"}`, linkTargetOverrideOptions)).toEqual({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'a', link: { href: HREF } }, { text: ' {target="_blank"}' }],
                },
            ],
        });
    });

    it('leaves an escaped suffix as text', () => {
        expect(parseMarkdown(String.raw`[a](${HREF})\{target="_blank"}`, linkTargetOverrideOptions)).toEqual({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'a', link: { href: HREF } }, { text: '{target="_blank"}' }],
                },
            ],
        });
    });

    it('consumes nothing when the suffix value throws', () => {
        const options: MarkdownOptions = {
            plugins: defaultContent,
            overrides: {
                marks: {
                    link: {
                        read: [
                            {
                                token: 'link_open',
                                value: ({ attrs }) => ({ href: attrs.href }),
                                suffix: {
                                    pattern: /\{target="([^"]*)"\}/,
                                    value: () => {
                                        throw new Error('suffix value');
                                    },
                                },
                            },
                        ],
                        write: ({ href }) => ({ open: '[', close: `](${String(href)})` }),
                    },
                },
            },
        };

        expect(parseMarkdown(`[a](${HREF}){target="_blank"}`, options)).toEqual({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'a', link: { href: HREF } }, { text: '{target="_blank"}' }],
                },
            ],
        });
    });

    it('reads the suffix of a link inside italic, and keeps the italic on the text after it', () => {
        expect(parseMarkdown(`*[a](${HREF}){target="_blank"} b*`, linkTargetOverrideOptions)).toEqual({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [
                        { text: 'a', italic: true, link: { href: HREF, openInNewTab: true } },
                        { text: ' b', italic: true },
                    ],
                },
            ],
        });
    });

    it('reads the suffix right after a leaf mark into the mark', () => {
        expect(parseMarkdown('`x`{lang="ts"}', codeLanguageOverrideOptions)).toEqual({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'x', code: { lang: 'ts' } }] }],
        });
    });
});

describe('parseMarkdown with a form that throws', () => {
    it('reads a mark whose read value throws as if the rule did not match', () => {
        const options: MarkdownOptions = {
            plugins: defaultContent,
            overrides: {
                marks: {
                    bold: {
                        read: [
                            {
                                token: 'strong_open',
                                value: () => {
                                    throw new Error('mark read');
                                },
                            },
                        ],
                        write: () => ({ open: '**', close: '**' }),
                    },
                },
            },
        };

        expect(parseMarkdown('a **b**', options)).toEqual({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a b' }] }],
        });
    });

    it('reads text whose pattern value throws as text', () => {
        const options: MarkdownOptions = {
            plugins: [...defaultContent, mentionContent()],
            overrides: {
                inlines: {
                    mention: {
                        read: [
                            {
                                pattern: /@\[user:(\d+)\]/,
                                value: () => {
                                    throw new Error('pattern value');
                                },
                            },
                        ],
                        write: () => null,
                    },
                },
            },
        };

        expect(parseMarkdown('Hi @[user:1]', options)).toEqual({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'Hi @[user:1]' }] }],
        });
    });
});

describe('parseMarkdown with a host that sends no usable value', () => {
    it.each([undefined, null, 5, {}])('returns the empty document for %j', (markdown) => {
        expect(parseMarkdown(markdown as unknown as string, OPTIONS)).toEqual(EMPTY_DOCUMENT);
    });

    it('reads a mark whose override has no read rules as text', () => {
        const withoutRead = { write: () => ({ open: '**', close: '**' }) } as unknown as MarkdownMarkForm;

        expect(
            parseMarkdown('a **b**', { plugins: defaultContent, overrides: { marks: { bold: withoutRead } } }),
        ).toEqual({ version: 1, blocks: [{ type: 'paragraph', children: [{ text: 'a b' }] }] });
    });

    it('reads a mark whose read value is undefined as if the rule did not match', () => {
        const options: MarkdownOptions = {
            plugins: defaultContent,
            overrides: {
                marks: {
                    bold: {
                        read: [{ token: 'strong_open', value: () => undefined as unknown as null }],
                        write: () => ({ open: '**', close: '**' }),
                    },
                },
            },
        };

        expect(parseMarkdown('a **b**', options)).toEqual({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a b' }] }],
        });
    });

    it('skips a read rule that has neither a token nor a pattern', () => {
        const options: MarkdownOptions = {
            plugins: defaultContent,
            overrides: {
                marks: {
                    bold: {
                        read: [
                            null,
                            5,
                            {},
                            { token: 5 },
                            { token: 'strong_open' },
                        ] as unknown as MarkdownMarkForm['read'],
                        write: () => ({ open: '**', close: '**' }),
                    },
                },
            },
        };

        expect(parseMarkdown('a **b**', options)).toEqual({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a ' }, { text: 'b', bold: true }] }],
        });
    });
});

describe('parseMarkdown text that needs no escape', () => {
    const TEXT_CASES = [
        'a <b> c',
        '5 > 3',
        'x<y',
        'about ~5 km',
        'a | b',
        'a ] b',
        String.raw`C:\Users\x`,
        '#hashtag',
        '####### x',
        '=x',
        String.raw`\<https\:\//a.com>`,
        String.raw`\<ana\@x.com>`,
    ] as const;

    for (const markdown of TEXT_CASES) {
        it(`reads ${JSON.stringify(markdown)} as one paragraph of text`, () => {
            const document = parseMarkdown(markdown, OPTIONS);

            expect(document.blocks.map((block) => block.type)).toEqual(['paragraph']);
            expect(JSON.stringify(document)).not.toContain('"link"');
        });
    }

    it('reads an escaped address in angle brackets as its text', () => {
        expect(parseMarkdown(String.raw`\<https\:\//a.com>`, OPTIONS)).toEqual({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: '<https://a.com>' }] }],
        });
    });

    it('reads an address inside a link text as the text of the link', () => {
        expect(parseMarkdown('[see www.x.com or a@b.com](https://example.com)', OPTIONS)).toEqual({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'see www.x.com or a@b.com', link: { href: 'https://example.com' } }],
                },
            ],
        });
    });
});
