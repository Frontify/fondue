/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type MarkdownMarkForm } from '../../core';
import { bulletListContent, defaultContent, mentionContent, tableContent } from '../../plugins';
import { type MarkdownOptions, parseMarkdown } from '../index';

import { mentionOverrideOptions } from './mentionOverride.fixture';

const OPTIONS: MarkdownOptions = { plugins: defaultContent };

const TABLE_OPTIONS: MarkdownOptions = { plugins: [...defaultContent, tableContent] };

const EMPTY_DOCUMENT = { version: 1, blocks: [{ type: 'paragraph', children: [{ text: '' }] }] };

describe('parseMarkdown', () => {
    it('reads an empty string as the empty document', () => {
        expect(parseMarkdown('', OPTIONS)).toEqual(EMPTY_DOCUMENT);
    });

    it('reads whitespace only as the empty document', () => {
        expect(parseMarkdown('  \n\n \n', OPTIONS)).toEqual(EMPTY_DOCUMENT);
    });

    it('reads a paragraph holding only a non-breaking space as an empty paragraph', () => {
        expect(parseMarkdown('&nbsp;', OPTIONS)).toEqual({
            version: 1,
            blocks: [{ type: 'paragraph', children: [] }],
        });
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

    it('reads a code fence as one paragraph per line', () => {
        expect(parseMarkdown('```\none\ntwo\n```', OPTIONS)).toEqual({
            version: 1,
            blocks: [
                { type: 'paragraph', children: [{ text: 'one' }] },
                { type: 'paragraph', children: [{ text: 'two' }] },
            ],
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

    it('reads a table as one paragraph per cell without the table plugin', () => {
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

describe('parseMarkdown tables', () => {
    const cellOf = (type: 'tableHeader' | 'tableCell', children: object[]) => ({
        type,
        children: [{ type: 'paragraph', children }],
    });
    const headerRow = {
        type: 'tableRow',
        children: [cellOf('tableHeader', [{ text: 'a' }]), cellOf('tableHeader', [{ text: 'b' }])],
    };
    const tableOf = (bodyCells: object[]) => ({
        version: 1,
        blocks: [{ type: 'table', children: [headerRow, { type: 'tableRow', children: bodyCells }] }],
    });

    it('reads a table with a header row and a body row', () => {
        expect(parseMarkdown('| a | b |\n| - | - |\n| c | d |', TABLE_OPTIONS)).toEqual(
            tableOf([cellOf('tableCell', [{ text: 'c' }]), cellOf('tableCell', [{ text: 'd' }])]),
        );
    });

    it('reads an empty cell as a paragraph with no children', () => {
        expect(parseMarkdown('| a | b |\n| - | - |\n| c |  |', TABLE_OPTIONS)).toEqual(
            tableOf([cellOf('tableCell', [{ text: 'c' }]), cellOf('tableCell', [])]),
        );
    });

    it('reads an escaped pipe as text inside a cell', () => {
        const markdown = String.raw`| a | b |
| - | - |
| a \| b | d |`;

        expect(parseMarkdown(markdown, TABLE_OPTIONS)).toEqual(
            tableOf([cellOf('tableCell', [{ text: 'a | b' }]), cellOf('tableCell', [{ text: 'd' }])]),
        );
    });

    it('reads emphasis as a mark inside a cell', () => {
        expect(parseMarkdown('| a | b |\n| - | - |\n| c | **x** |', TABLE_OPTIONS)).toEqual(
            tableOf([cellOf('tableCell', [{ text: 'c' }]), cellOf('tableCell', [{ text: 'x', bold: true }])]),
        );
    });

    it('pads a body row shorter than the header with an empty cell', () => {
        expect(parseMarkdown('| a | b |\n| - | - |\n| c |', TABLE_OPTIONS)).toEqual(
            tableOf([cellOf('tableCell', [{ text: 'c' }]), cellOf('tableCell', [])]),
        );
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
