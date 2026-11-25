/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type RteDocumentOf } from '../../core';
import { type RteBlock, type RteDocument, type RteDocumentWith } from '../../documentFormat';
import { bulletListContent, defaultContent, tableContent } from '../../plugins';
import { type MarkdownOptions, parseMarkdown, serializeToMarkdown } from '../index';

import { mentionOverrideOptions } from './mentionOverride.fixture';

type RoundTripCase = {
    name: string;
    markdown: string;
    document: RteDocument | RteDocumentWith<{ inline: { type: 'mention'; id: string } }>;
};

const OPTIONS: MarkdownOptions = { plugins: defaultContent };

const TABLE_OPTIONS: MarkdownOptions = { plugins: [...defaultContent, tableContent] };

const expectRoundTrip = ({ markdown, document }: RoundTripCase, options: MarkdownOptions = OPTIONS) => {
    expect(parseMarkdown(markdown, options)).toEqual(document);
    expect(serializeToMarkdown(document, options)).toEqual({ markdown, losses: [] });
};

const BREAKS_OPTIONS: MarkdownOptions = { plugins: defaultContent, breaks: true };

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
        name: 'a link whose address holds an entity-like run',
        markdown: String.raw`[x](https://e.com/?a=1\&amp;b)`,
        document: {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'x', link: { href: 'https://e.com/?a=1&amp;b' } }] }],
        },
    },
    {
        name: 'a heading ending in a hash',
        markdown: String.raw`# Chapter \#`,
        document: {
            version: 1,
            blocks: [{ type: 'textStyle', style: 'heading1', children: [{ text: 'Chapter #' }] }],
        },
    },
    {
        name: 'a list item holding a paragraph and a numbered list starting at 2',
        markdown: '- a\n\n  2. b',
        document: {
            version: 1,
            blocks: [
                {
                    type: 'bulletList',
                    children: [
                        {
                            type: 'listItem',
                            children: [
                                { type: 'paragraph', children: [{ text: 'a' }] },
                                {
                                    type: 'numberedList',
                                    start: 2,
                                    children: [
                                        {
                                            type: 'listItem',
                                            children: [{ type: 'paragraph', children: [{ text: 'b' }] }],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    },
    {
        name: 'a list item holding a paragraph, a list and a paragraph',
        markdown: '- a\n  - b\n\n  c',
        document: {
            version: 1,
            blocks: [
                {
                    type: 'bulletList',
                    children: [
                        {
                            type: 'listItem',
                            children: [
                                { type: 'paragraph', children: [{ text: 'a' }] },
                                {
                                    type: 'bulletList',
                                    children: [
                                        {
                                            type: 'listItem',
                                            children: [{ type: 'paragraph', children: [{ text: 'b' }] }],
                                        },
                                    ],
                                },
                                { type: 'paragraph', children: [{ text: 'c' }] },
                            ],
                        },
                    ],
                },
            ],
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
        const document: RteDocument = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a' }, { type: 'break' }, { text: 'b' }] }],
        };

        expectRoundTrip({ name: 'breaks', markdown: 'a\nb', document }, BREAKS_OPTIONS);
    });

    it('writes a break that follows a break as a hard break', () => {
        const document: RteDocument = {
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'one' }, { type: 'break' }, { type: 'break' }, { text: 'two' }],
                },
            ],
        };

        expectRoundTrip({ name: 'two breaks', markdown: 'one\n\\\ntwo', document }, BREAKS_OPTIONS);
    });

    it('writes a break that starts a paragraph as a hard break', () => {
        const document: RteDocument = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ type: 'break' }, { text: 'foo' }] }],
        };

        expectRoundTrip({ name: 'leading break', markdown: '\\\nfoo', document }, BREAKS_OPTIONS);
    });

    it('writes a break that starts a list item as a hard break', () => {
        const document: RteDocument = {
            version: 1,
            blocks: [
                {
                    type: 'bulletList',
                    children: [
                        {
                            type: 'listItem',
                            children: [{ type: 'paragraph', children: [{ type: 'break' }, { text: 'foo' }] }],
                        },
                    ],
                },
            ],
        };

        expectRoundTrip({ name: 'leading break in a list item', markdown: '- \\\n  foo', document }, BREAKS_OPTIONS);
    });

    it('writes a break that starts a quote as a hard break', () => {
        const document: RteDocument = {
            version: 1,
            blocks: [{ type: 'quote', children: [{ type: 'break' }, { text: 'foo' }] }],
        };

        expectRoundTrip({ name: 'leading break in a quote', markdown: '> \\\n> foo', document }, BREAKS_OPTIONS);
    });

    it('gives back the same document for a code block with an empty line', () => {
        const document = parseMarkdown('```\none\n\ntwo\n```', BREAKS_OPTIONS);
        const { markdown, losses } = serializeToMarkdown(document, BREAKS_OPTIONS);

        expect(losses).toEqual([]);
        expect(parseMarkdown(markdown, BREAKS_OPTIONS)).toEqual(document);
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
        markdown: String.raw`a_b \~c\~ \<d\> \| \\e`,
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

const FLANKING_CASES: readonly RoundTripCase[] = [
    {
        name: 'bold opening before punctuation after a letter',
        markdown: 'se&#x65;**(a)**',
        document: {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'see' }, { text: '(a)', bold: true }] }],
        },
    },
    {
        name: 'bold closing after punctuation before a letter',
        markdown: '**Note:**&#x74;ext',
        document: {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'Note:', bold: true }, { text: 'text' }] }],
        },
    },
    {
        name: 'italic opening before punctuation after a letter',
        markdown: 'fo&#x6F;*(x)*',
        document: {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'foo' }, { text: '(x)', italic: true }] }],
        },
    },
    {
        name: 'bold closing after a quote before a letter',
        markdown: '**"x"**&#x79;',
        document: {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: '"x"', bold: true }, { text: 'y' }] }],
        },
    },
    {
        name: 'bold glued to the text after it',
        markdown: '**a**b',
        document: {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a', bold: true }, { text: 'b' }] }],
        },
    },
    {
        name: 'italic glued to the text after it',
        markdown: '*a*b',
        document: {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a', italic: true }, { text: 'b' }] }],
        },
    },
];

describe('markdown round trip of emphasis next to punctuation', () => {
    for (const flankingCase of FLANKING_CASES) {
        it(`gives back the same document for ${flankingCase.name}`, () => {
            expectRoundTrip(flankingCase);
        });
    }
});

describe('markdown round trip of italic that asterisks do not read back', () => {
    it('writes italic with underscores when the asterisks of italic and bold would read as other marks', () => {
        const document: RteDocument = {
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [
                        { text: 'a', italic: true },
                        { text: 'a', bold: true, italic: true },
                        { text: 'b', bold: true },
                    ],
                },
            ],
        };

        expectRoundTrip({ name: 'italic and bold', markdown: '_a_**_a_&#x62;**', document });
    });
});

const EDGE_WHITESPACE_CASES: readonly RoundTripCase[] = [
    {
        name: 'a paragraph with a space at both ends',
        markdown: '&#x20;&#x20;foo&#x20;',
        document: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: '  foo ' }] }] },
    },
    {
        name: 'a tab at the start',
        markdown: '&#x9;foo',
        document: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: '\tfoo' }] }] },
    },
    {
        name: 'a newline inside a text run',
        markdown: 'a&#xA;b',
        document: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: 'a\nb' }] }] },
    },
    {
        name: 'a no-break space at the end',
        markdown: 'a&#xA0;',
        document: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: 'a\u00A0' }] }] },
    },
    {
        name: 'a line separator and a zero-width no-break space at the start',
        markdown: '&#x2028;&#xFEFF;a',
        document: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: '\u2028\uFEFFa' }] }] },
    },
    {
        name: 'spaces before and after a line break',
        markdown: 'a&#x20;\\\n&#x20;b',
        document: {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a ' }, { type: 'break' }, { text: ' b' }] }],
        },
    },
];

describe('markdown round trip of whitespace at the edge of a line', () => {
    for (const edgeCase of EDGE_WHITESPACE_CASES) {
        it(`gives back the same text for ${edgeCase.name}`, () => {
            expectRoundTrip(edgeCase);
        });
    }
});

type CharacterRoundTripCase = {
    name: string;
    children: Extract<RteBlock, { type: 'paragraph' }>['children'];
};

const MARKDOWN_CHARACTER_CASES: readonly CharacterRoundTripCase[] = [
    {
        name: 'a space before bold punctuation',
        children: [{ text: 'a ' }, { text: '(x)', bold: true }],
    },
    {
        name: 'a vertical tab',
        children: [{ text: '\u000Bx' }],
    },
];

describe('markdown round trip of characters that Markdown classifies on its own terms', () => {
    for (const { name, children } of MARKDOWN_CHARACTER_CASES) {
        it(`gives back the same document for ${name}`, () => {
            const document: RteDocument = { version: 1, blocks: [{ type: 'paragraph', children }] };

            const { markdown, losses } = serializeToMarkdown(document, OPTIONS);

            expect(losses).toEqual([]);
            expect(parseMarkdown(markdown, OPTIONS)).toEqual(document);
        });
    }

    it('keeps a delete character next to bold punctuation, and drops the bold rather than the character', () => {
        const document: RteDocument = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a\u007F' }, { text: '(x)', bold: true }] }],
        };

        const { markdown, losses } = serializeToMarkdown(document, OPTIONS);

        expect(losses).toEqual([{ path: [0, 1], type: 'bold' }]);
        expect(parseMarkdown(markdown, OPTIONS)).toEqual({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a\u007F(x)' }] }],
        });
    });
});

const LINK_LOOKALIKE_CASES: readonly RoundTripCase[] = [
    {
        name: 'a URL with a scheme',
        markdown: 'see https\\:\\//example.com',
        document: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: 'see https://example.com' }] }] },
    },
    {
        name: 'a URL with a scheme and no dot',
        markdown: 'see http\\:\\//x',
        document: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: 'see http://x' }] }] },
    },
    {
        name: 'an address starting with www',
        markdown: 'www\\.x.com',
        document: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: 'www.x.com' }] }] },
    },
    {
        name: 'an address starting with WWW in capitals',
        markdown: 'WWW\\.x.com',
        document: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: 'WWW.x.com' }] }] },
    },
];

describe('markdown round trip of text that looks like a link', () => {
    for (const lookalikeCase of LINK_LOOKALIKE_CASES) {
        it(`gives back the same text for ${lookalikeCase.name}`, () => {
            expectRoundTrip(lookalikeCase);
        });
    }
});

const linkDocument = (href: string): RteDocument => ({
    version: 1,
    blocks: [{ type: 'paragraph', children: [{ text: 'x', link: { href } }] }],
});

describe('markdown round trip of link addresses', () => {
    for (const href of ['https://example.com/caf\u00E9', 'HTTPS://Example.com', 'https://a.com/x|y']) {
        it(`gives back the address ${href} as written`, () => {
            const document = linkDocument(href);

            const { markdown, losses } = serializeToMarkdown(document, OPTIONS);

            expect(losses).toEqual([]);
            expect(parseMarkdown(markdown, OPTIONS)).toEqual(document);
        });
    }
});

const AUTOLINK_CASES: readonly RoundTripCase[] = [
    {
        name: 'a bare domain',
        markdown: 'see example.com',
        document: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: 'see example.com' }] }] },
    },
    {
        name: 'a file name that ends in a top level domain',
        markdown: 'readme.md',
        document: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: 'readme.md' }] }] },
    },
    {
        name: 'an email address',
        markdown: String.raw`ana\@example.com`,
        document: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: 'ana@example.com' }] }] },
    },
    {
        name: 'an email address after a semicolon',
        markdown: String.raw`;\@example.com`,
        document: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: ';@example.com' }] }] },
    },
    {
        name: 'an email address after an ampersand',
        markdown: String.raw`a&\@example.com`,
        document: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: 'a&@example.com' }] }] },
    },
    {
        name: 'an email address after a dollar sign',
        markdown: String.raw`$\@example.com`,
        document: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: '$@example.com' }] }] },
    },
    {
        name: 'an email address in parentheses',
        markdown: String.raw`(ana\@x.com)`,
        document: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: '(ana@x.com)' }] }] },
    },
    {
        name: 'a mention-like word after a space',
        markdown: 'Hi @ana',
        document: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: 'Hi @ana' }] }] },
    },
];

describe('markdown round trip of text a reader could take for an autolink', () => {
    for (const autolinkCase of AUTOLINK_CASES) {
        it(`gives back the same text for ${autolinkCase.name}`, () => {
            expectRoundTrip(autolinkCase);
        });
    }
});

const linkedTextDocument = (text: string, href: string): RteDocument => ({
    version: 1,
    blocks: [{ type: 'paragraph', children: [{ text: 'see ' }, { text, link: { href } }, { text: ' now' }] }],
});

const AUTOLINK_WRITE_CASES: readonly RoundTripCase[] = [
    {
        name: 'a web address that is its own text',
        markdown: 'see <https://x.com/a?b=1&c=2> now',
        document: linkedTextDocument('https://x.com/a?b=1&c=2', 'https://x.com/a?b=1&c=2'),
    },
    {
        name: 'a mail address that is its own text',
        markdown: 'see <ana@example.com> now',
        document: linkedTextDocument('ana@example.com', 'mailto:ana@example.com'),
    },
];

describe('markdown round trip of links whose text is their address', () => {
    for (const autolinkCase of AUTOLINK_WRITE_CASES) {
        it(`writes ${autolinkCase.name} as an autolink and reads it back`, () => {
            expectRoundTrip(autolinkCase);
        });
    }

    it('keeps a bold link whose text is its address as a Markdown link', () => {
        const document: RteDocument = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'https://x', bold: true, link: { href: 'https://x' } }] }],
        };

        const { markdown, losses } = serializeToMarkdown(document, OPTIONS);

        expect(losses).toEqual([]);
        expect(markdown).not.toContain('<');
        expect(parseMarkdown(markdown, OPTIONS)).toEqual(document);
    });

    it('keeps a mail address with a non-ASCII domain as a Markdown link', () => {
        const document = linkedTextDocument('ana@müller.de', 'mailto:ana@müller.de');

        const { markdown, losses } = serializeToMarkdown(document, OPTIONS);

        expect(losses).toEqual([]);
        expect(parseMarkdown(markdown, OPTIONS)).toEqual(document);
    });

    it('keeps a mail address whose scheme is not lowercase as a Markdown link', () => {
        const document = linkedTextDocument('a@b.c', 'MAILTO:a@b.c');

        const { markdown, losses } = serializeToMarkdown(document, OPTIONS);

        expect(losses).toEqual([]);
        expect(parseMarkdown(markdown, OPTIONS)).toEqual(document);
    });

    it('gives the same document after a second write when the Markdown holds a bare address', () => {
        const first = parseMarkdown('see https://x.com/a?b=1&c=2 now', OPTIONS);

        const { markdown, losses } = serializeToMarkdown(first, OPTIONS);

        expect(markdown).toBe('see <https://x.com/a?b=1&c=2> now');
        expect(losses).toEqual([]);
        expect(parseMarkdown(markdown, OPTIONS)).toEqual(first);
    });

    it('writes a link with other text as a Markdown link', () => {
        const document = linkedTextDocument('x.com', 'https://x.com');

        expect(serializeToMarkdown(document, OPTIONS)).toEqual({
            markdown: 'see [x.com](https://x.com) now',
            losses: [],
        });
    });
});

const UNDERSCORE_CASES: readonly RoundTripCase[] = [
    {
        name: 'underscores inside a word',
        markdown: 'snake_case_name',
        document: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: 'snake_case_name' }] }] },
    },
    {
        name: 'single letters between underscores',
        markdown: 'a_b_c',
        document: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: 'a_b_c' }] }] },
    },
    {
        name: 'an underscore at the start of a word',
        markdown: String.raw`\_leading`,
        document: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: '_leading' }] }] },
    },
    {
        name: 'an underscore at the end of a word',
        markdown: String.raw`trailing\_`,
        document: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: 'trailing_' }] }] },
    },
];

describe('markdown round trip of underscores', () => {
    for (const underscoreCase of UNDERSCORE_CASES) {
        it(`gives back the same text for ${underscoreCase.name}`, () => {
            expectRoundTrip(underscoreCase);
        });
    }
});

const BANG_CASES: readonly RoundTripCase[] = [
    {
        name: 'an exclamation mark before a link',
        markdown: String.raw`wow\![x](https://example.com)`,
        document: {
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'wow!' }, { text: 'x', link: { href: 'https://example.com' } }],
                },
            ],
        },
    },
    {
        name: 'image syntax typed as text',
        markdown: String.raw`!\[x\](y)`,
        document: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: '![x](y)' }] }] },
    },
    {
        name: 'a link definition typed as text',
        markdown: String.raw`\[x\]: y`,
        document: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: '[x]: y' }] }] },
    },
];

describe('markdown round trip of text that looks like an image or a link definition', () => {
    for (const bangCase of BANG_CASES) {
        it(`gives back the same text for ${bangCase.name}`, () => {
            expectRoundTrip(bangCase);
        });
    }
});

type ListItem = Extract<RteBlock, { type: 'bulletList' }>['children'][number];

const ITEM_ONE: ListItem = { type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'one' }] }] };
const ITEM_TWO: ListItem = { type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'two' }] }] };
const ITEM_THREE: ListItem = { type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'three' }] }] };

const ADJACENT_LIST_CASES: readonly RoundTripCase[] = [
    {
        name: 'two bullet lists',
        markdown: '- one\n\n+ two',
        document: {
            version: 1,
            blocks: [
                { type: 'bulletList', children: [ITEM_ONE] },
                { type: 'bulletList', children: [ITEM_TWO] },
            ],
        },
    },
    {
        name: 'three bullet lists, the third back on the first marker',
        markdown: '- one\n\n+ two\n\n- three',
        document: {
            version: 1,
            blocks: [
                { type: 'bulletList', children: [ITEM_ONE] },
                { type: 'bulletList', children: [ITEM_TWO] },
                { type: 'bulletList', children: [ITEM_THREE] },
            ],
        },
    },
    {
        name: 'two numbered lists',
        markdown: '1. one\n\n1) two',
        document: {
            version: 1,
            blocks: [
                { type: 'numberedList', children: [ITEM_ONE] },
                { type: 'numberedList', children: [ITEM_TWO] },
            ],
        },
    },
    {
        name: 'a bullet list followed by a numbered list',
        markdown: '- one\n\n1. two',
        document: {
            version: 1,
            blocks: [
                { type: 'bulletList', children: [ITEM_ONE] },
                { type: 'numberedList', children: [ITEM_TWO] },
            ],
        },
    },
    {
        name: 'two lists in one list item',
        markdown: '- a\n  - one\n\n  + two',
        document: {
            version: 1,
            blocks: [
                {
                    type: 'bulletList',
                    children: [
                        {
                            type: 'listItem',
                            children: [
                                { type: 'paragraph', children: [{ text: 'a' }] },
                                { type: 'bulletList', children: [ITEM_ONE] },
                                { type: 'bulletList', children: [ITEM_TWO] },
                            ],
                        },
                    ],
                },
            ],
        },
    },
];

describe('markdown round trip of a list right after a list', () => {
    for (const listCase of ADJACENT_LIST_CASES) {
        it(`gives back the same document for ${listCase.name}`, () => {
            expectRoundTrip(listCase);
        });
    }
});

describe('markdown round trip of text that would start a block after leading space or a newline', () => {
    const LEADING_SPACE_TEXTS = [' - x', ' # x', ' 1. x', '   > x'];

    for (const text of LEADING_SPACE_TEXTS) {
        it(`reads ${JSON.stringify(text)} back as a paragraph`, () => {
            const document: RteDocument = {
                version: 1,
                blocks: [{ type: 'paragraph', children: [{ text }] }],
            };

            const { markdown } = serializeToMarkdown(document, OPTIONS);

            expect(parseMarkdown(markdown, OPTIONS).blocks.map((block) => block.type)).toEqual(['paragraph']);
        });
    }

    it('reads a line after a newline in a text run back as text', () => {
        const document: RteDocument = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a\n- b' }] }],
        };

        const { markdown } = serializeToMarkdown(document, OPTIONS);

        expect(parseMarkdown(markdown, OPTIONS).blocks.map((block) => block.type)).toEqual(['paragraph']);
    });
});

describe('markdown round trip of empty text', () => {
    it('gives back an empty paragraph between two paragraphs', () => {
        const document: RteDocument = {
            version: 1,
            blocks: [
                { type: 'paragraph', children: [{ text: 'a' }] },
                { type: 'paragraph', children: [] },
                { type: 'paragraph', children: [{ text: 'b' }] },
            ],
        };

        expectRoundTrip({ name: 'empty paragraph', markdown: 'a\n\n&nbsp;\n\nb', document });
    });

    it('gives back a paragraph of spaces', () => {
        const document: RteDocument = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: '   ' }] }],
        };

        expectRoundTrip({ name: 'spaces', markdown: '&#x20;&#x20;&#x20;', document });
    });

    it('gives back the empty document for an empty string', () => {
        const document: RteDocument = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: '' }] }],
        };

        expectRoundTrip({ name: 'empty', markdown: '', document });
    });
});

describe('markdown round trip of a mention override', () => {
    it('gives back a mention written in the host syntax', () => {
        const document: RteDocumentWith<{ inline: { type: 'mention'; id: string } }> = {
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
        const document: RteDocument = {
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
        const document: RteDocument = {
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

describe('markdown round trip of tables', () => {
    const cellOf = (type: 'tableHeader' | 'tableCell', children: object[]) => ({
        type,
        children: [{ type: 'paragraph', children }],
    });
    const tableBlock = {
        type: 'table',
        children: [
            {
                type: 'tableRow',
                children: [cellOf('tableHeader', [{ text: 'a' }]), cellOf('tableHeader', [{ text: 'b' }])],
            },
            {
                type: 'tableRow',
                children: [
                    cellOf('tableCell', [{ text: 'bold', bold: true }]),
                    cellOf('tableCell', [{ text: 'x|y', code: true }]),
                ],
            },
            {
                type: 'tableRow',
                children: [cellOf('tableCell', [{ text: 'p|q' }]), cellOf('tableCell', [])],
            },
        ],
    };
    const tableMarkdown = `| a | b |
| --- | --- |
| **bold** | \`x\\|y\` |
| p\\\\|q |  |`;

    it('gives back a table with marks, pipes and an empty cell', () => {
        const document: RteDocumentOf = { version: 1, blocks: [tableBlock] };

        expect(parseMarkdown(tableMarkdown, TABLE_OPTIONS)).toEqual(document);
        expect(serializeToMarkdown(document, TABLE_OPTIONS)).toEqual({ markdown: tableMarkdown, losses: [] });
    });

    it('gives back a table between two paragraphs', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [
                { type: 'paragraph', children: [{ text: 'before' }] },
                tableBlock,
                { type: 'paragraph', children: [{ text: 'after' }] },
            ],
        };
        const markdown = `before\n\n${tableMarkdown}\n\nafter`;

        expect(parseMarkdown(markdown, TABLE_OPTIONS)).toEqual(document);
        expect(serializeToMarkdown(document, TABLE_OPTIONS)).toEqual({ markdown, losses: [] });
    });
});

const DELIMITER_ROW_MARKERS = ['-:', ':-', ':-:', '--:', '| --- |', '-:|:-'] as const;
const DELIMITER_ROW_OPTIONS: readonly MarkdownOptions[] = [OPTIONS, BREAKS_OPTIONS];

describe('markdown round trip of text that looks like a table delimiter row', () => {
    for (const options of DELIMITER_ROW_OPTIONS) {
        for (const marker of DELIMITER_ROW_MARKERS) {
            it(`keeps '${marker}' after a break with breaks ${String(options.breaks)}`, () => {
                const document: RteDocument = {
                    version: 1,
                    blocks: [
                        { type: 'paragraph', children: [{ text: 'a|b' }, { type: 'break' }, { text: marker }] },
                    ],
                };
                const { markdown, losses } = serializeToMarkdown(document, options);

                expect(losses).toEqual([]);
                expect(parseMarkdown(markdown, options)).toEqual(document);
            });
        }
    }

    it('keeps a paragraph whose whole text is a delimiter row', () => {
        const document: RteDocument = { version: 1, blocks: [{ type: 'paragraph', children: [{ text: ':-:' }] }] };
        const { markdown, losses } = serializeToMarkdown(document, OPTIONS);

        expect(losses).toEqual([]);
        expect(parseMarkdown(markdown, OPTIONS)).toEqual(document);
    });
});
