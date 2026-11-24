/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type RteDocumentOf } from '../core';
import { bulletListContent, defaultContent } from '../plugins';

import { mentionOverrideOptions } from './mentionOverride.fixture';

import { type MarkdownOptions, parseMarkdown, serializeToMarkdown } from './index';

type RoundTripCase = {
    name: string;
    markdown: string;
    document: RteDocumentOf;
};

const OPTIONS: MarkdownOptions = { plugins: defaultContent };

const expectRoundTrip = ({ markdown, document }: RoundTripCase, options: MarkdownOptions = OPTIONS) => {
    expect(parseMarkdown(markdown, options)).toEqual(document);
    expect(serializeToMarkdown(document, options)).toEqual({ markdown, losses: [] });
};

const FORM_CASES: readonly RoundTripCase[] = [
    {
        name: 'a paragraph',
        markdown: 'Hello world',
        document: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: 'Hello world' }] }] },
    },
    {
        name: 'a heading 1',
        markdown: '# Title',
        document: { version: 1, blocks: [{ type: 'textStyle', style: 'heading1', children: [{ text: 'Title' }] }] },
    },
    {
        name: 'a heading 2',
        markdown: '## Title',
        document: { version: 1, blocks: [{ type: 'textStyle', style: 'heading2', children: [{ text: 'Title' }] }] },
    },
    {
        name: 'a heading 3',
        markdown: '### Title',
        document: { version: 1, blocks: [{ type: 'textStyle', style: 'heading3', children: [{ text: 'Title' }] }] },
    },
    {
        name: 'a heading 4',
        markdown: '#### Title',
        document: { version: 1, blocks: [{ type: 'textStyle', style: 'heading4', children: [{ text: 'Title' }] }] },
    },
    {
        name: 'bold text',
        markdown: 'a **bold** word',
        document: {
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'a ' }, { text: 'bold', bold: true }, { text: ' word' }],
                },
            ],
        },
    },
    {
        name: 'italic text',
        markdown: 'an *italic* word',
        document: {
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'an ' }, { text: 'italic', italic: true }, { text: ' word' }],
                },
            ],
        },
    },
    {
        name: 'struck text',
        markdown: 'a ~~struck~~ word',
        document: {
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'a ' }, { text: 'struck', strikethrough: true }, { text: ' word' }],
                },
            ],
        },
    },
    {
        name: 'inline code',
        markdown: 'a `code` word',
        document: {
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'a ' }, { text: 'code', code: true }, { text: ' word' }],
                },
            ],
        },
    },
    {
        name: 'inline code holding a backtick',
        markdown: 'a ``co`de`` word',
        document: {
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'a ' }, { text: 'co`de', code: true }, { text: ' word' }],
                },
            ],
        },
    },
    {
        name: 'inline code starting with a backtick',
        markdown: '`` `code ``',
        document: {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: '`code', code: true }] }],
        },
    },
    {
        name: 'a link',
        markdown: 'see [Frontify](https://www.frontify.com) now',
        document: {
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [
                        { text: 'see ' },
                        { text: 'Frontify', link: { href: 'https://www.frontify.com' } },
                        { text: ' now' },
                    ],
                },
            ],
        },
    },
    {
        name: 'a link whose address holds parentheses',
        markdown: '[x](<https://example.com/a(b)>)',
        document: {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'x', link: { href: 'https://example.com/a(b)' } }] }],
        },
    },
    {
        name: 'a bullet list',
        markdown: '- one\n- two',
        document: {
            version: 1,
            blocks: [
                {
                    type: 'bulletList',
                    children: [
                        { type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'one' }] }] },
                        { type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'two' }] }] },
                    ],
                },
            ],
        },
    },
    {
        name: 'a numbered list starting at 3',
        markdown: '3. one\n4. two',
        document: {
            version: 1,
            blocks: [
                {
                    type: 'numberedList',
                    start: 3,
                    children: [
                        { type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'one' }] }] },
                        { type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'two' }] }] },
                    ],
                },
            ],
        },
    },
    {
        name: 'a nested list',
        markdown: '- one\n  - nested\n- two',
        document: {
            version: 1,
            blocks: [
                {
                    type: 'bulletList',
                    children: [
                        {
                            type: 'listItem',
                            children: [
                                { type: 'paragraph', children: [{ text: 'one' }] },
                                {
                                    type: 'bulletList',
                                    children: [
                                        {
                                            type: 'listItem',
                                            children: [{ type: 'paragraph', children: [{ text: 'nested' }] }],
                                        },
                                    ],
                                },
                            ],
                        },
                        { type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'two' }] }] },
                    ],
                },
            ],
        },
    },
    {
        name: 'a list item holding two paragraphs',
        markdown: '- one\n\n  two',
        document: {
            version: 1,
            blocks: [
                {
                    type: 'bulletList',
                    children: [
                        {
                            type: 'listItem',
                            children: [
                                { type: 'paragraph', children: [{ text: 'one' }] },
                                { type: 'paragraph', children: [{ text: 'two' }] },
                            ],
                        },
                    ],
                },
            ],
        },
    },
    {
        name: 'a quote',
        markdown: '> quoted',
        document: { version: 1, blocks: [{ type: 'quote', children: [{ text: 'quoted' }] }] },
    },
    {
        name: 'a hard break',
        markdown: 'one\\\ntwo',
        document: {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'one' }, { type: 'break' }, { text: 'two' }] }],
        },
    },
    {
        name: 'blocks separated by a blank line',
        markdown: 'First\n\n## Second\n\n> Third',
        document: {
            version: 1,
            blocks: [
                { type: 'paragraph', children: [{ text: 'First' }] },
                { type: 'textStyle', style: 'heading2', children: [{ text: 'Second' }] },
                { type: 'quote', children: [{ text: 'Third' }] },
            ],
        },
    },
];

describe('markdown round trip, one form at a time', () => {
    for (const formCase of FORM_CASES) {
        it(`gives back the same Markdown and document for ${formCase.name}`, () => {
            expectRoundTrip(formCase);
        });
    }
});

describe('markdown round trip with breaks', () => {
    it('reads a single newline as a line break and writes a line break as a newline', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a' }, { type: 'break' }, { text: 'b' }] }],
        };

        expectRoundTrip({ name: 'breaks', markdown: 'a\nb', document }, { plugins: defaultContent, breaks: true });
    });
});

const ESCAPING_CASES: readonly RoundTripCase[] = [
    {
        name: 'asterisks that are not emphasis',
        markdown: String.raw`\*not italic\*`,
        document: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: '*not italic*' }] }] },
    },
    {
        name: 'a hash that is not a heading',
        markdown: String.raw`\# not heading`,
        document: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: '# not heading' }] }] },
    },
    {
        name: 'an ordinal that is not a list',
        markdown: String.raw`1\. not list`,
        document: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: '1. not list' }] }] },
    },
    {
        name: 'a dash that is not a bullet',
        markdown: String.raw`\- not a bullet`,
        document: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: '- not a bullet' }] }] },
    },
    {
        name: 'link syntax typed as text',
        markdown: String.raw`\[x\](y)`,
        document: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: '[x](y)' }] }] },
    },
    {
        name: 'an entity-like run',
        markdown: String.raw`\&copy; and AT&T`,
        document: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: '&copy; and AT&T' }] }] },
    },
    {
        name: 'the other characters Markdown reads',
        markdown: String.raw`a\_b \~c\~ \<d\> \| \\e`,
        document: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: 'a_b ~c~ <d> | \\e' }] }] },
    },
    {
        name: 'a hash at the start of a line after a line break',
        markdown: 'a\\\n\\# b',
        document: {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a' }, { type: 'break' }, { text: '# b' }] }],
        },
    },
];

describe('markdown round trip of text that looks like Markdown', () => {
    for (const escapingCase of ESCAPING_CASES) {
        it(`gives back the same text for ${escapingCase.name}`, () => {
            expectRoundTrip(escapingCase);
        });
    }
});

describe('markdown round trip of empty text', () => {
    it('gives back an empty paragraph between two paragraphs', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [
                { type: 'paragraph', children: [{ text: 'a' }] },
                { type: 'paragraph', children: [] },
                { type: 'paragraph', children: [{ text: 'b' }] },
            ],
        };

        expectRoundTrip({ name: 'empty paragraph', markdown: 'a\n\n&nbsp;\n\nb', document });
    });

    it('gives back the empty document for an empty string', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: '' }] }],
        };

        expectRoundTrip({ name: 'empty', markdown: '', document });
    });
});

describe('markdown round trip of a mention override', () => {
    it('gives back a mention written in the host syntax', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'Hi ' }, { type: 'mention', id: '123' }, { text: ' there' }],
                },
            ],
        };

        expectRoundTrip({ name: 'mention', markdown: 'Hi @[user:123] there', document }, mentionOverrideOptions);
    });

    it('keeps an escaped mention as text in both directions', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: '@[user:1]' }] }],
        };

        expectRoundTrip(
            { name: 'escaped mention', markdown: String.raw`@\[user:1\]`, document },
            mentionOverrideOptions,
        );
    });
});

describe('markdown round trip with list content only', () => {
    it('gives back a bullet list from bulletListContent alone', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [
                {
                    type: 'bulletList',
                    children: [{ type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'one' }] }] }],
                },
            ],
        };

        expectRoundTrip({ name: 'bullet list', markdown: '- one', document }, { plugins: [bulletListContent()] });
    });
});
