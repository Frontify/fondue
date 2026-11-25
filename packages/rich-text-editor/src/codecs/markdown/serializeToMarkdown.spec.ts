/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { defineBlock, defineContent, defineMark, type RteDocumentOf } from '../../core';
import { type RteDocument, type RteDocumentWith } from '../../documentFormat';
import { columnBreakContent, defaultContent, mentionContent } from '../../plugins';
import { type MarkdownOptions, serializeToMarkdown } from '../index';

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
    it('writes a text block of spaces as a non-breaking space entity', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [
                { type: 'paragraph', children: [{ text: 'a' }] },
                { type: 'paragraph', children: [{ text: '  ' }] },
            ],
        };

        expect(serializeToMarkdown(document, OPTIONS)).toEqual({ markdown: 'a\n\n&nbsp;', losses: [] });
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

    it('writes a mention as the text it shows', () => {
        expect(serializeToMarkdown(document, { plugins: [...defaultContent, mentionContent()] })).toEqual({
            markdown: 'Hi @ana',
            losses: [],
        });
    });

    it('writes a mention as the override gives it', () => {
        expect(serializeToMarkdown(document, mentionOverrideOptions)).toEqual({
            markdown: 'Hi @[user:123]',
            losses: [],
        });
    });
});

describe('serializeToMarkdown emphasis no character reference can fix', () => {
    const MENTION_AS_Z: MarkdownOptions = {
        plugins: [...defaultContent, mentionContent()],
        overrides: {
            inlines: {
                mention: {
                    read: [{ pattern: /Z/, value: () => ({}) }],
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

    it('keeps the first attempt and reports each mark in the block when no italic delimiter reads back', () => {
        const document: RteDocumentOf = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a' }, { text: 'b', italic: true }] }],
        };

        expect(serializeToMarkdown(document, ITALIC_AS_PLUSES)).toEqual({
            markdown: 'a++b++',
            losses: [{ path: [0, 1], type: 'italic' }],
        });
    });

    it('reports the block when it holds no mark and its Markdown does not read back', () => {
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
        ).toEqual({ markdown: '<b>', losses: [{ path: [0], type: 'paragraph' }] });
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
