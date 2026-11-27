/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import {
    defineBlock,
    defineContent,
    defineInline,
    defineMark,
    type MarkdownInlineOutput,
    type RteDocumentOf,
} from '../../core';
import { type RteDocument, type RteDocumentWith } from '../../documentFormat';
import { columnBreakContent, defaultContent, mentionContent } from '../../plugins';
import { type MarkdownOptions, parseMarkdown, serializeToMarkdown } from '../index';

import { mentionOverrideOptions } from './mentionOverride.fixture';

const OPTIONS: MarkdownOptions = { plugins: defaultContent };

// Declared with an HTML form only, so neither has a Markdown form.
const sampleContent = defineContent({
    blocks: {
        sampleBlock: defineBlock({
            content: 'text',
            toHtml: () => ({ tag: 'section', children: true }),
            parse: [{ tag: 'section' }],
        }),
    },
    marks: {
        sampleMark: defineMark({ tag: 'mark' }),
    },
});

// Marks and inlines whose own Markdown form writes what it does not read back, declared on content and not as overrides.
const unreadableContent = defineContent({
    marks: {
        plusMark: defineMark({
            tag: 'ins',
            markdown: { read: [{ token: 'em_open' }], write: () => ({ open: '++', close: '++' }) },
        }),
        emptyMark: defineMark({
            tag: 'u',
            markdown: { read: [{ token: 'strong_open' }], write: () => ({ open: '', close: '' }) },
        }),
    },
    inlines: {
        tagInline: defineInline({
            toHtml: () => ({ tag: 'span' }),
            parse: [],
            markdown: { read: [], write: () => ({ kind: 'markdown', markdown: '<b>' }) },
        }),
        userInline: defineInline({
            toHtml: () => ({ tag: 'span' }),
            parse: [],
            markdown: {
                read: [{ pattern: /@\[user:(\d+)\]/, value: (match: RegExpExecArray) => ({ id: match[1] }) }],
                write: (value) => ({ kind: 'markdown', markdown: `@[user:${String(value.id)}]` }),
            },
        }),
    },
});

const UNREADABLE_OPTIONS: MarkdownOptions = { plugins: [...defaultContent, unreadableContent] };

// An inline that reads text matching a pattern, and one with no form of its own for a host to override.
const overridableContent = defineContent({
    marks: {
        overridableMark: defineMark({ tag: 'u' }),
    },
    inlines: {
        patternInline: defineInline({
            toHtml: () => ({ tag: 'span' }),
            parse: [],
            markdown: {
                read: [{ pattern: /@\w+/, value: (match: RegExpExecArray) => ({ id: match[0] }) }],
                write: (value) => ({ kind: 'markdown', markdown: String(value.id) }),
            },
        }),
        overridableInline: defineInline({
            toHtml: () => ({ tag: 'span' }),
            parse: [],
            markdown: { read: [], write: () => ({ kind: 'markdown', markdown: '-' }) },
        }),
    },
});

const writesOutput = (output: MarkdownInlineOutput): MarkdownOptions => ({
    plugins: [...defaultContent, unreadableContent, overridableContent],
    overrides: { inlines: { overridableInline: { read: [], write: () => output } } },
});

const MARK_AS_TAGS: MarkdownOptions = {
    plugins: [overridableContent, ...defaultContent],
    overrides: {
        marks: { overridableMark: { read: [], write: () => ({ open: '<u>', close: '</u>' }) } },
    },
};

const writesMarkdown = (markdown: string): MarkdownOptions => writesOutput({ kind: 'markdown', markdown });

describe('serializeToMarkdown', () => {
    it('writes the empty document as an empty string', () => {
        const document: RteDocumentOf = { version: 1, blocks: [{ type: 'paragraph', children: [{ text: '' }] }] };

        expect(serializeToMarkdown(document, OPTIONS)).toEqual({ markdown: '', losses: [] });
    });

    it('writes an empty paragraph as a non-breaking space entity', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [
                { type: 'paragraph', children: [{ text: 'a' }] },
                { type: 'paragraph', children: [{ text: '' }] },
            ],
        };

        expect(serializeToMarkdown(document, OPTIONS)).toEqual({ markdown: 'a\n\n&nbsp;', losses: [] });
    });

    it('moves the whitespace at the edge of a marked run outside its delimiters', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'a' }, { text: ' b ', bold: true }, { text: 'c' }],
                },
            ],
        };

        expect(serializeToMarkdown(document, OPTIONS)).toEqual({ markdown: 'a **b** c', losses: [] });
    });

    it('writes no trailing newline after a list', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [
                {
                    type: 'numberedList',
                    children: [{ type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'a' }] }] }],
                },
            ],
        };

        expect(serializeToMarkdown(document, OPTIONS)).toEqual({ markdown: '1. a', losses: [] });
    });
});

describe('serializeToMarkdown line breaks', () => {
    const document: RteDocumentOf = {
        version: 1,
        blocks: [{ type: 'paragraph', children: [{ text: 'a' }, { type: 'break' }, { text: 'b' }] }],
    };

    it('writes a break as a backslash and a newline by default', () => {
        expect(serializeToMarkdown(document, OPTIONS)).toEqual({ markdown: 'a\\\nb', losses: [] });
    });

    it('writes a break as a bare newline with breaks: true', () => {
        expect(serializeToMarkdown(document, { plugins: defaultContent, breaks: true })).toEqual({
            markdown: 'a\nb',
            losses: [],
        });
    });
});

describe('serializeToMarkdown single-line blocks', () => {
    const document: RteDocument = {
        version: 1,
        blocks: [{ type: 'textStyle', style: 'heading1', children: [{ text: 'a' }, { type: 'break' }, { text: 'b' }] }],
    };

    it('writes a break inside a heading as a space and reports the break', () => {
        expect(serializeToMarkdown(document, OPTIONS)).toEqual({
            markdown: '# a b',
            losses: [{ path: [0, 1], type: 'break' }],
        });
    });

    it('writes a break inside a heading as a space with breaks: true too', () => {
        expect(serializeToMarkdown(document, { plugins: defaultContent, breaks: true })).toEqual({
            markdown: '# a b',
            losses: [{ path: [0, 1], type: 'break' }],
        });
    });
});

describe('serializeToMarkdown trailing breaks', () => {
    it.each([false, true])('leaves out a break at the end of a block and reports it, with breaks: %s', (breaks) => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'foo' }, { type: 'break' }] }],
        };

        expect(serializeToMarkdown(document, { plugins: defaultContent, breaks })).toEqual({
            markdown: 'foo',
            losses: [{ path: [0, 1], type: 'break' }],
        });
    });

    it('leaves out every break that only breaks follow, in order', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'foo' }, { type: 'break' }, { type: 'break' }] }],
        };

        expect(serializeToMarkdown(document, OPTIONS)).toEqual({
            markdown: 'foo',
            losses: [
                { path: [0, 1], type: 'break' },
                { path: [0, 2], type: 'break' },
            ],
        });
    });
});

describe('serializeToMarkdown whitespace-only text', () => {
    it('writes a text block of spaces as character references', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [
                { type: 'paragraph', children: [{ text: 'a' }] },
                { type: 'paragraph', children: [{ text: '  ' }] },
            ],
        };

        expect(serializeToMarkdown(document, OPTIONS)).toEqual({ markdown: 'a\n\n&#x20;&#x20;', losses: [] });
    });

    it('writes a literal non-breaking space on its own line', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [
                { type: 'paragraph', children: [{ text: 'a' }] },
                { type: 'paragraph', children: [{ text: '\u00A0' }] },
            ],
        };

        expect(serializeToMarkdown(document, OPTIONS)).toEqual({ markdown: 'a\n\n\u00A0', losses: [] });
    });
});

describe('serializeToMarkdown list items with no lines', () => {
    it('writes an item holding a non-breaking space, so a nested empty item is no setext underline', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [
                {
                    type: 'bulletList',
                    children: [
                        {
                            type: 'listItem',
                            children: [
                                { type: 'paragraph', children: [{ text: 'a' }] },
                                { type: 'bulletList', children: [{ type: 'listItem', children: [] }] },
                            ],
                        },
                    ],
                },
            ],
        };

        const { markdown, losses } = serializeToMarkdown(document, OPTIONS);

        expect(markdown).toBe('- a\n  - &nbsp;');
        expect(losses).toEqual([]);
        expect(JSON.stringify(parseMarkdown(markdown, OPTIONS))).not.toContain('textStyle');
    });
});

describe('serializeToMarkdown with nodes a host may send malformed', () => {
    it('skips an inline whose text is not a string, and an entry that is not an object, and reports each', () => {
        const document = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a' }, { text: 5 }, null, { type: 'weird', text: 5 }] }],
        } as unknown as RteDocumentOf;

        expect(serializeToMarkdown(document, OPTIONS)).toEqual({
            markdown: 'a',
            losses: [
                { path: [0, 1], type: 'unknown' },
                { path: [0, 2], type: 'unknown' },
                { path: [0, 3], type: 'weird' },
            ],
        });
    });

    it('skips an entry that is not an object in a block list, and reports it', () => {
        const document = {
            version: 1,
            blocks: [
                null,
                {
                    type: 'bulletList',
                    children: [
                        'text',
                        { type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'a' }] }] },
                    ],
                },
            ],
        } as unknown as RteDocumentOf;

        expect(serializeToMarkdown(document, OPTIONS)).toEqual({
            markdown: '- a',
            losses: [
                { path: [0], type: 'unknown' },
                { path: [1, 0], type: 'unknown' },
            ],
        });
    });
});

describe('serializeToMarkdown with a document or a block a host may send malformed', () => {
    it.each([
        null,
        undefined,
        5,
        'text',
        [],
        { version: 1 },
        { version: 1, blocks: 'text' },
        { version: 1, blocks: {} },
    ])('writes nothing and reports the document for %j', (document) => {
        expect(serializeToMarkdown(document as unknown as RteDocumentOf, OPTIONS)).toEqual({
            markdown: '',
            losses: [{ path: [], type: 'document' }],
        });
    });

    it('reports a block whose children are not an array at its path, and writes it empty', () => {
        const document = {
            version: 1,
            blocks: [
                { type: 'paragraph', children: [{ text: 'a' }] },
                { type: 'paragraph', children: 'text' },
                { type: 'weird', children: null },
            ],
        } as unknown as RteDocumentOf;

        expect(serializeToMarkdown(document, OPTIONS)).toEqual({
            markdown: 'a\n\n&nbsp;',
            losses: [
                { path: [1], type: 'paragraph' },
                { path: [2], type: 'weird' },
            ],
        });
    });

    it('reports a list with no items at its path', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [
                { type: 'paragraph', children: [{ text: 'a' }] },
                { type: 'bulletList', children: [] },
            ],
        };

        expect(serializeToMarkdown(document, OPTIONS)).toEqual({
            markdown: 'a',
            losses: [{ path: [1], type: 'bulletList' }],
        });
    });

    it('reports the block nested deeper than the limit and does not descend into it', () => {
        const DEPTH = 1000;
        let block: unknown = { type: 'paragraph', children: [{ text: 'deep' }] };
        for (let level = 0; level < DEPTH; level++) {
            block = { type: 'wrapper', children: [block] };
        }
        const document = { version: 1, blocks: [block] } as unknown as RteDocumentOf;

        const { markdown, losses } = serializeToMarkdown(document, OPTIONS);

        expect(markdown).toBe('');
        expect(losses).toHaveLength(101);
        expect(losses[losses.length - 1]).toEqual({ path: Array.from({ length: 101 }, () => 0), type: 'wrapper' });
    });

    it('reports a mark in a mark value nested far deeper than the limit and does not throw', () => {
        const DEPTH = 100_000;
        let value: unknown = {};
        for (let level = 0; level < DEPTH; level++) {
            value = { value };
        }
        const document = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a', bold: value }] }],
        } as unknown as RteDocumentOf;

        expect(serializeToMarkdown(document, OPTIONS)).toEqual({
            markdown: '**a**',
            losses: [{ path: [0, 0], type: 'bold' }],
        });
    });
});

describe('serializeToMarkdown with neighbouring text nodes sharing a mark value nested far deeper than the limit', () => {
    it('does not throw and reports the mark at both text nodes', () => {
        const DEPTH = 100_000;
        let value: unknown = {};
        for (let level = 0; level < DEPTH; level++) {
            value = { value };
        }
        const document = {
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [
                        { text: 'a', bold: value },
                        { text: 'b', bold: value },
                    ],
                },
            ],
        } as unknown as RteDocumentOf;

        const { losses } = serializeToMarkdown(document, OPTIONS);

        expect(losses).toEqual([
            { path: [0, 0], type: 'bold' },
            { path: [0, 1], type: 'bold' },
        ]);
    });
});

describe('serializeToMarkdown with a form that returns nothing', () => {
    const returnsNothing = () => undefined as unknown as null;

    it('keeps the text of a block whose write returns undefined and reports the block', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a' }] }],
        };

        expect(
            serializeToMarkdown(document, {
                plugins: defaultContent,
                overrides: { blocks: { paragraph: { read: [], write: returnsNothing } } },
            }),
        ).toEqual({ markdown: 'a', losses: [{ path: [0], type: 'paragraph' }] });
    });

    it('keeps the text of a mark whose write returns undefined and reports the mark', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a' }, { text: 'b', bold: true }] }],
        };

        expect(
            serializeToMarkdown(document, {
                plugins: defaultContent,
                overrides: { marks: { bold: { read: [{ token: 'strong_open' }], write: returnsNothing } } },
            }),
        ).toEqual({ markdown: 'ab', losses: [{ path: [0, 1], type: 'bold' }] });
    });

    it('writes nothing for an inline whose write returns undefined and reports the inline', () => {
        const document: RteDocumentWith<{ inline: { type: 'mention'; id: string } }> = {
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'a' }, { type: 'mention', id: '1' }, { text: 'b' }],
                },
            ],
        };

        expect(
            serializeToMarkdown(document, {
                plugins: [...defaultContent, mentionContent()],
                overrides: { inlines: { mention: { read: [], write: returnsNothing } } },
            }),
        ).toEqual({ markdown: 'ab', losses: [{ path: [0, 1], type: 'mention' }] });
    });
});

describe('serializeToMarkdown losses of a mark across text nodes', () => {
    const UNSAFE_LINK = { href: 'javascript:alert(1)' };

    it('reports a mark with no safe write at every text node it covers', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'a', link: UNSAFE_LINK }, { text: 'b', link: UNSAFE_LINK }, { text: 'c' }],
                },
            ],
        };

        expect(serializeToMarkdown(document, OPTIONS)).toEqual({
            markdown: 'abc',
            losses: [
                { path: [0, 0], type: 'link' },
                { path: [0, 1], type: 'link' },
            ],
        });
    });
});

describe('serializeToMarkdown reports a node once', () => {
    it('reports the type of a block with no form once when its text does not read back either', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [{ type: 'sampleBlock', children: [{ text: 'a\u000B' }] }],
        };

        const { losses } = serializeToMarkdown(document, { plugins: [...defaultContent, sampleContent] });

        expect(losses).toEqual([{ path: [0], type: 'sampleBlock' }]);
    });
});

describe('serializeToMarkdown losses', () => {
    it('keeps underlined text and reports the mark at the text path', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [
                { type: 'paragraph', children: [{ text: 'a' }] },
                { type: 'paragraph', children: [{ text: 'b ' }, { text: 'under', underline: true }] },
            ],
        };

        expect(serializeToMarkdown(document, OPTIONS)).toEqual({
            markdown: 'a\n\nb under',
            losses: [{ path: [1, 1], type: 'underline' }],
        });
    });

    it('keeps font coloured text and reports the mark at the text path', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'red', fontColor: { color: '#ff0000' } }] }],
        };

        expect(serializeToMarkdown(document, OPTIONS)).toEqual({
            markdown: 'red',
            losses: [{ path: [0, 0], type: 'fontColor' }],
        });
    });

    it('keeps aligned text and reports the attribute at the block path', () => {
        const document: RteDocument = {
            version: 1,
            blocks: [
                { type: 'paragraph', children: [{ text: 'a' }] },
                { type: 'paragraph', align: 'center', children: [{ text: 'b' }] },
            ],
        };

        expect(serializeToMarkdown(document, OPTIONS)).toEqual({
            markdown: 'a\n\nb',
            losses: [{ path: [1], type: 'align' }],
        });
    });

    it('writes nothing for a column break and reports the block', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [
                { type: 'paragraph', children: [{ text: 'a' }] },
                { type: 'columnBreak' },
                { type: 'paragraph', children: [{ text: 'b' }] },
            ],
        };

        expect(serializeToMarkdown(document, { plugins: [...defaultContent, columnBreakContent()] })).toEqual({
            markdown: 'a\n\nb',
            losses: [{ path: [1], type: 'columnBreak' }],
        });
    });

    it('writes the text of a block type no plugin declares as a paragraph and reports it', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [
                { type: 'paragraph', children: [{ text: 'a' }] },
                { type: 'unlistedBlock', children: [{ text: 'kept' }] },
            ],
        };

        expect(serializeToMarkdown(document, OPTIONS)).toEqual({
            markdown: 'a\n\nkept',
            losses: [{ path: [1], type: 'unlistedBlock' }],
        });
    });

    it('writes the text of a block with no Markdown form as a paragraph and reports it', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [{ type: 'sampleBlock', children: [{ text: 'kept' }] }],
        };

        expect(serializeToMarkdown(document, { plugins: [...defaultContent, sampleContent] })).toEqual({
            markdown: 'kept',
            losses: [{ path: [0], type: 'sampleBlock' }],
        });
    });

    it('writes the children of a container block type no plugin declares as top-level blocks', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [
                {
                    type: 'unlistedContainer',
                    children: [
                        { type: 'paragraph', children: [{ text: 'a' }] },
                        { type: 'paragraph', children: [{ text: 'b' }] },
                    ],
                },
            ],
        };

        expect(serializeToMarkdown(document, OPTIONS)).toEqual({
            markdown: 'a\n\nb',
            losses: [{ path: [0], type: 'unlistedContainer' }],
        });
    });

    it('keeps the text of a mark no plugin declares and reports the mark', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a' }, { text: 'b', unlistedMark: true }] }],
        };

        expect(serializeToMarkdown(document, OPTIONS)).toEqual({
            markdown: 'ab',
            losses: [{ path: [0, 1], type: 'unlistedMark' }],
        });
    });

    it('keeps the text of a mark with no Markdown form and reports the mark', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a', sampleMark: true }] }],
        };

        expect(serializeToMarkdown(document, { plugins: [...defaultContent, sampleContent] })).toEqual({
            markdown: 'a',
            losses: [{ path: [0, 0], type: 'sampleMark' }],
        });
    });

    it('writes nothing for an inline no plugin declares and reports it', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a' }, { type: 'unlistedInline' }, { text: 'b' }] }],
        };

        expect(serializeToMarkdown(document, OPTIONS)).toEqual({
            markdown: 'ab',
            losses: [{ path: [0, 1], type: 'unlistedInline' }],
        });
    });

    it('keeps the text of a link whose address is not safe and reports the mark', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'x', link: { href: 'javascript:alert(1)' } }] }],
        };

        expect(serializeToMarkdown(document, OPTIONS)).toEqual({
            markdown: 'x',
            losses: [{ path: [0, 0], type: 'link' }],
        });
    });
});

describe('serializeToMarkdown links that do not read back as they were', () => {
    it('writes a link and reports the mark when it holds a value the Markdown cannot carry', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a', link: { href: 'x', openInNewTab: true } }] }],
        };

        expect(serializeToMarkdown(document, OPTIONS)).toEqual({
            markdown: '[a](x)',
            losses: [{ path: [0, 0], type: 'link' }],
        });
    });
});

describe('serializeToMarkdown mentions', () => {
    const document: RteDocumentOf = {
        version: 1,
        blocks: [
            {
                type: 'paragraph',
                children: [{ text: 'Hi ' }, { type: 'mention', id: '123', username: 'ana', name: 'Ana Muster' }],
            },
        ],
    };

    it('writes a mention as the text it shows and reports it, as the text reads back as text', () => {
        expect(serializeToMarkdown(document, { plugins: [...defaultContent, mentionContent()] })).toEqual({
            markdown: 'Hi @ana',
            losses: [{ path: [0, 1], type: 'mention' }],
        });
    });

    it('reports only the mention when the text next to it keeps its mark but the mention writes plain text', () => {
        const marked: RteDocumentOf = {
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [
                        { text: 'Hi', bold: true },
                        { text: ' ' },
                        { type: 'mention', id: '1', username: 'ana', name: 'Ana' },
                    ],
                },
            ],
        };

        expect(serializeToMarkdown(marked, { plugins: [...defaultContent, mentionContent()] })).toEqual({
            markdown: '**Hi** @ana',
            losses: [{ path: [0, 2], type: 'mention' }],
        });
    });

    it('writes a mention as the override gives it and reports nothing for the fields the override does not read back', () => {
        expect(serializeToMarkdown(document, mentionOverrideOptions)).toEqual({
            markdown: 'Hi @[user:123]',
            losses: [],
        });
    });

    it('reports a mention whose override writes nothing', () => {
        const options: MarkdownOptions = {
            plugins: [...defaultContent, mentionContent()],
            overrides: { inlines: { mention: { read: [], write: () => null } } },
        };

        expect(serializeToMarkdown(document, options)).toEqual({
            markdown: 'Hi&#x20;',
            losses: [{ path: [0, 1], type: 'mention' }],
        });
    });

    it('reports a mention whose override throws', () => {
        const options: MarkdownOptions = {
            plugins: [...defaultContent, mentionContent()],
            overrides: {
                inlines: {
                    mention: {
                        read: [],
                        write: () => {
                            throw new Error('no form');
                        },
                    },
                },
            },
        };

        expect(serializeToMarkdown(document, options)).toEqual({
            markdown: 'Hi&#x20;',
            losses: [{ path: [0, 1], type: 'mention' }],
        });
    });
});

describe('serializeToMarkdown emphasis no character reference can fix', () => {
    const MENTION_AS_Z: MarkdownOptions = {
        plugins: [...defaultContent, mentionContent()],
        overrides: {
            inlines: {
                mention: {
                    read: [{ pattern: /Z/, value: () => ({ id: '1' }) }],
                    write: () => ({ kind: 'markdown', markdown: 'Z' }),
                },
            },
        },
    };

    it('writes no delimiters for bold next to written Markdown and reports the mark', () => {
        const document: RteDocumentWith<{ inline: { type: 'mention'; id: string } }> = {
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [
                        { type: 'mention', id: '1' },
                        { text: '(a)', bold: true },
                    ],
                },
            ],
        };

        expect(serializeToMarkdown(document, MENTION_AS_Z)).toEqual({
            markdown: 'Z(a)',
            losses: [{ path: [0, 1], type: 'bold' }],
        });
    });
});

describe('serializeToMarkdown text that does not read back', () => {
    const ITALIC_AS_PLUSES: MarkdownOptions = {
        plugins: defaultContent,
        overrides: {
            marks: {
                italic: { read: [{ token: 'em_open' }], write: () => ({ open: '++', close: '++' }) },
            },
        },
    };

    it('keeps the first attempt and reports each mark in the block when no delimiter of the mark reads back', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a' }, { text: 'b', plusMark: true }] }],
        };

        expect(serializeToMarkdown(document, UNREADABLE_OPTIONS)).toEqual({
            markdown: 'a++b++',
            losses: [{ path: [0, 1], type: 'plusMark' }],
        });
    });

    it('reports a mark that does not read back at every text node it covers', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'a', plusMark: true }, { text: 'b', plusMark: true }, { text: 'c' }],
                },
            ],
        };

        expect(serializeToMarkdown(document, UNREADABLE_OPTIONS).losses).toEqual([
            { path: [0, 0], type: 'plusMark' },
            { path: [0, 1], type: 'plusMark' },
        ]);
    });

    it('reports nothing for a mark whose override delimiters do not read back', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a' }, { text: 'b', italic: true }] }],
        };

        expect(serializeToMarkdown(document, ITALIC_AS_PLUSES)).toEqual({ markdown: 'a++b++', losses: [] });
    });

    it('reports the inline element when the block holds no mark and its Markdown does not read back', () => {
        const document: RteDocumentWith<{ inline: { type: 'tagInline' } }> = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ type: 'tagInline' }] }],
        };

        expect(serializeToMarkdown(document, UNREADABLE_OPTIONS)).toEqual({
            markdown: '<b>',
            losses: [{ path: [0, 0], type: 'tagInline' }],
        });
    });

    it('reports nothing for an inline element whose override Markdown does not read back', () => {
        const document: RteDocumentWith<{ inline: { type: 'mention'; id: string } }> = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ type: 'mention', id: '1' }] }],
        };

        expect(
            serializeToMarkdown(document, {
                plugins: [...defaultContent, mentionContent()],
                overrides: {
                    inlines: { mention: { read: [], write: () => ({ kind: 'markdown', markdown: '<b>' }) } },
                },
            }),
        ).toEqual({ markdown: '<b>', losses: [] });
    });

    it('reports only the mark that does not read back when the inline beside it reads back exactly', () => {
        const document: RteDocumentWith<
            { mark: { emptyMark: boolean } } | { inline: { type: 'userInline'; id: string } }
        > = {
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [
                        { text: 'a', emptyMark: true },
                        { type: 'userInline', id: '1' },
                    ],
                },
            ],
        };

        expect(serializeToMarkdown(document, UNREADABLE_OPTIONS)).toEqual({
            markdown: 'a@[user:1]',
            losses: [{ path: [0, 0], type: 'emptyMark' }],
        });
    });

    it('reports a mark that does not read back although an overridden mention sits beside it', () => {
        const document: RteDocumentWith<{ mark: { plusMark: boolean } } | { inline: { type: 'mention'; id: string } }> =
            {
                version: 1,
                blocks: [
                    {
                        type: 'paragraph',
                        children: [
                            { text: 'a', plusMark: true },
                            { type: 'mention', id: '1' },
                        ],
                    },
                ],
            };

        expect(
            serializeToMarkdown(document, {
                plugins: [...defaultContent, mentionContent(), unreadableContent],
                overrides: mentionOverrideOptions.overrides,
            }),
        ).toEqual({ markdown: '++a++@[user:1]', losses: [{ path: [0, 0], type: 'plusMark' }] });
    });

    it('reports nothing for an overridden mark that does not read back beside a mention that reads back exactly', () => {
        const NO_DELIMITERS_FOR_BOLD: MarkdownOptions = {
            plugins: [...defaultContent, mentionContent()],
            overrides: {
                marks: { bold: { read: [{ token: 'strong_open' }], write: () => ({ open: '', close: '' }) } },
                inlines: mentionOverrideOptions.overrides?.inlines,
            },
        };
        const document: RteDocumentWith<{ inline: { type: 'mention'; id: string } }> = {
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [
                        { text: 'a', bold: true },
                        { type: 'mention', id: '1' },
                    ],
                },
            ],
        };

        expect(serializeToMarkdown(document, NO_DELIMITERS_FOR_BOLD)).toEqual({ markdown: 'a@[user:1]', losses: [] });
    });

    it('reports the block when the text before an overridden inline turns into an inline element beside what the override wrote', () => {
        const document: RteDocumentWith<{ inline: { type: 'overridableInline' } }> = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: '@bob ' }, { type: 'overridableInline' }] }],
        };

        expect(serializeToMarkdown(document, writesMarkdown('x'))).toEqual({
            markdown: '@bob x',
            losses: [{ path: [0], type: 'paragraph' }],
        });
    });

    it('reports the block when overridden inlines written around text make the reader add a mark to it', () => {
        const document: RteDocumentWith<{ inline: { type: 'overridableInline' } }> = {
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ type: 'overridableInline' }, { text: 'b' }, { type: 'overridableInline' }],
                },
            ],
        };

        expect(serializeToMarkdown(document, writesMarkdown('**'))).toEqual({
            markdown: '**b**',
            losses: [{ path: [0], type: 'paragraph' }],
        });
    });

    it('reports nothing for an overridden inline whose Markdown reads as emphasis after a bold run', () => {
        const document: RteDocumentWith<{ inline: { type: 'overridableInline' } }> = {
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'a', bold: true }, { type: 'overridableInline' }],
                },
            ],
        };

        expect(serializeToMarkdown(document, writesMarkdown('*x*'))).toEqual({
            markdown: '**a***x*',
            losses: [],
        });
    });

    it('reports nothing for an overridden mark whose text has whitespace at its edges', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'hello' }, { text: ' world ', overridableMark: true }, { text: '!' }],
                },
            ],
        };

        expect(serializeToMarkdown(document, MARK_AS_TAGS)).toEqual({ markdown: 'hello <u>world</u> !', losses: [] });
    });

    it('reports nothing for an overridden mark around whitespace only that carries another mark too', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [
                        { text: 'a', bold: true },
                        { text: ' ', overridableMark: true, bold: true },
                    ],
                },
            ],
        };

        expect(serializeToMarkdown(document, MARK_AS_TAGS).losses).toEqual([]);
    });

    it('reports nothing for an overridden inline whose Markdown ends in a space', () => {
        const document: RteDocumentWith<{ inline: { type: 'overridableInline' } }> = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a' }, { type: 'overridableInline' }, { text: 'b' }] }],
        };

        expect(serializeToMarkdown(document, writesMarkdown('@bob '))).toEqual({
            markdown: 'a@bob b',
            losses: [],
        });
    });

    it('reports nothing for an overridden inline whose Markdown starts with an indent', () => {
        const document: RteDocumentWith<{ inline: { type: 'overridableInline' } }> = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a' }, { type: 'overridableInline' }, { text: 'b' }] }],
        };

        expect(serializeToMarkdown(document, writesMarkdown('    x'))).toEqual({
            markdown: 'a    xb',
            losses: [],
        });
    });

    it('reports nothing for an overridden inline that writes a line break', () => {
        const document: RteDocumentWith<{ inline: { type: 'overridableInline' } }> = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a' }, { type: 'overridableInline' }, { text: 'b' }] }],
        };

        expect(serializeToMarkdown(document, writesOutput({ kind: 'lineBreak' }))).toEqual({
            markdown: 'a\\\nb',
            losses: [],
        });
    });

    it('writes a mark with its own form and reports it when its override is null', () => {
        // oxlint-disable-next-line typescript/no-unsafe-assignment -- a host can send null where the type asks for a form, and parsed JSON is the cast-free way to build it.
        const overrides: MarkdownOptions['overrides'] = JSON.parse('{ "marks": { "plusMark": null } }');
        const document: RteDocumentOf = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a' }, { text: 'b', plusMark: true }] }],
        };

        expect(serializeToMarkdown(document, { plugins: UNREADABLE_OPTIONS.plugins, overrides })).toEqual({
            markdown: 'a++b++',
            losses: [{ path: [0, 1], type: 'plusMark' }],
        });
    });

    it('does not throw on text with unpaired surrogates, controls and every escaped character', () => {
        const text = '\uD800 \u0000 \\ * _ ` [ ] < > ~ | & # = - + 1. :// www.';
        const document: RteDocumentOf = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text, bold: true }, { text }] }],
        };

        expect(() => serializeToMarkdown(document, OPTIONS)).not.toThrow();
    });
});

describe('serializeToMarkdown with a form that throws', () => {
    it('keeps the text of a mark whose write throws and reports the mark', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a' }, { text: 'b', bold: true }] }],
        };

        expect(
            serializeToMarkdown(document, {
                plugins: defaultContent,
                overrides: {
                    marks: {
                        bold: {
                            read: [{ token: 'strong_open' }],
                            write: () => {
                                throw new Error('mark write');
                            },
                        },
                    },
                },
            }),
        ).toEqual({ markdown: 'ab', losses: [{ path: [0, 1], type: 'bold' }] });
    });

    it('keeps the text of a block whose write throws and reports the block', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a' }] }],
        };

        expect(
            serializeToMarkdown(document, {
                plugins: defaultContent,
                overrides: {
                    blocks: {
                        paragraph: {
                            read: [],
                            write: () => {
                                throw new Error('block write');
                            },
                        },
                    },
                },
            }),
        ).toEqual({ markdown: 'a', losses: [{ path: [0], type: 'paragraph' }] });
    });

    it('writes nothing for an inline whose write throws and reports the inline', () => {
        const document: RteDocumentWith<{ inline: { type: 'mention'; id: string } }> = {
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'a' }, { type: 'mention', id: '1' }, { text: 'b' }],
                },
            ],
        };

        expect(
            serializeToMarkdown(document, {
                plugins: [...defaultContent, mentionContent()],
                overrides: {
                    inlines: {
                        mention: {
                            read: [],
                            write: () => {
                                throw new Error('inline write');
                            },
                        },
                    },
                },
            }),
        ).toEqual({ markdown: 'ab', losses: [{ path: [0, 1], type: 'mention' }] });
    });
});

describe('serializeToMarkdown text inside a link', () => {
    const linkDocument = (text: string): RteDocumentOf => ({
        version: 1,
        blocks: [{ type: 'paragraph', children: [{ text, link: { href: 'https://example.com' } }] }],
    });

    it('writes the address escapes of a link text as they are', () => {
        expect(serializeToMarkdown(linkDocument('see www.x.com or a@b.com or http://c.d'), OPTIONS)).toEqual({
            markdown: '[see www.x.com or a@b.com or http://c.d](https://example.com)',
            losses: [],
        });
    });

    it('still escapes what Markdown reads inside a link text', () => {
        expect(serializeToMarkdown(linkDocument('a*b_c]d[e|f~~g&copy;h'), OPTIONS).markdown).toBe(
            String.raw`[a\*b_c\]d\[e|f\~\~g\&copy;h](https://example.com)`,
        );
    });

    it('writes the address escapes outside the link text and none inside it', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'www.x.com ' }, { text: 'www.x.com', link: { href: 'https://example.com' } }],
                },
            ],
        };

        expect(serializeToMarkdown(document, OPTIONS).markdown).toBe(
            String.raw`www\.x.com [www.x.com](https://example.com)`,
        );
    });

    it('writes the address escapes of a mark nested in a link text as they are', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [
                        { text: 'a ', link: { href: 'https://example.com' } },
                        { text: 'www.x.com', italic: true, link: { href: 'https://example.com' } },
                    ],
                },
            ],
        };

        expect(serializeToMarkdown(document, OPTIONS).markdown).toBe('[a *www.x.com*](https://example.com)');
    });
});
