/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { describe, expect, it } from 'vitest';

import { parseHtml, type RteDocument, type RteDocumentWith, serializeToHtml } from '../index';
import { columnBreakPlugin, defaultContent, defaultPlugins, mentionPlugin } from '../plugins';

// A host that stores HTML opens it with `parseHtml` and saves it with
// `serializeToHtml`: each save and open must give back the document it saved.

const plugins = [
    ...defaultPlugins,
    mentionPlugin({ items: [], href: (mention) => (mention.kind === 'all' ? undefined : `/people/${mention.id}`) }),
    columnBreakPlugin(),
];

/** Every block, mark and inline the shipped plugins write, as the editor hands them to the host. */
const doc: RteDocumentWith<{ block: { type: 'columnBreak' } }> = {
    version: 1,
    blocks: [
        { type: 'textStyle', style: 'heading2', children: [{ text: 'A heading' }] },
        { type: 'textStyle', style: 'imageCaption', children: [{ text: 'A caption' }] },
        {
            type: 'paragraph',
            align: 'center',
            children: [
                { text: 'bold', bold: true },
                { text: 'italic', italic: true },
                { text: 'underline', underline: true },
                { text: 'struck', strikethrough: true },
                { text: 'code', code: true },
                { text: 'sub', subscript: true },
                { text: 'sup', superscript: true },
                { text: 'red', fontColor: { color: '#ff0000' } },
                { text: 'link', link: { href: 'https://example.com', openInNewTab: true } },
                { type: 'break' },
                { text: 'after the break' },
            ],
        },
        { type: 'paragraph', children: [] },
        { type: 'paragraph', children: [{ text: 'Ends with a break' }, { type: 'break' }] },
        { type: 'quote', children: [{ text: 'A quote' }] },
        {
            type: 'numberedList',
            start: 3,
            children: [{ type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'One' }] }] }],
        },
        {
            type: 'bulletList',
            children: [{ type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'Dot' }] }] }],
        },
        {
            type: 'checkList',
            children: [
                { type: 'checkItem', checked: true, children: [{ type: 'paragraph', children: [{ text: 'Done' }] }] },
                {
                    type: 'checkItem',
                    checked: 'inProgress',
                    children: [{ type: 'paragraph', children: [{ text: 'Started' }] }],
                },
            ],
        },
        { type: 'columnBreak' },
    ],
};

describe('parseHtml', () => {
    it('gives back the document serializeToHtml wrote', () => {
        expect(parseHtml(serializeToHtml(doc, { plugins }), { plugins })).toEqual(doc);
    });

    it('reads a mention as its text, linked when it carries a link, as a paste does', () => {
        const withMentions: RteDocument = {
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [
                        { type: 'mention', id: 'jane', username: 'jane', name: 'Jane Doe' },
                        { text: ' and ' },
                        { type: 'mention', id: 'all', username: 'all', name: 'Everyone', kind: 'all' },
                    ],
                },
            ],
        };

        expect(parseHtml(serializeToHtml(withMentions, { plugins }), { plugins }).blocks).toEqual([
            { type: 'paragraph', children: [{ text: '@jane', link: { href: '/people/jane' } }, { text: ' and @all' }] },
        ]);
    });

    it('reads with the shipped content', () => {
        const shipped: RteDocument = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'Plain ' }, { text: 'bold', bold: true }] }],
        };

        expect(parseHtml(serializeToHtml(shipped, { plugins: defaultContent }), { plugins: defaultContent })).toEqual(
            shipped,
        );
    });
});

describe('parseHtml code blocks', () => {
    const codeBlockOf = (html: string) => parseHtml(html, { plugins: defaultContent }).blocks;

    it('reads the language from the class of the code element', () => {
        expect(codeBlockOf('<pre><code class="language-ts">const a = 1;\nconst b = 2;</code></pre>')).toEqual([
            { type: 'codeBlock', language: 'ts', children: [{ text: 'const a = 1;\nconst b = 2;' }] },
        ]);
    });

    it('reads the language from a class with the shorter prefix', () => {
        expect(codeBlockOf('<pre><code class="hljs lang-python">a</code></pre>')).toEqual([
            { type: 'codeBlock', language: 'python', children: [{ text: 'a' }] },
        ]);
    });

    it('reads a pre with no code element, keeping its line breaks and spaces', () => {
        expect(codeBlockOf('<pre>one\n  two</pre>')).toEqual([
            { type: 'codeBlock', children: [{ text: 'one\n  two' }] },
        ]);
    });

    it.each([
        ['has characters a language never holds', 'language-a%b'],
        ['is longer than 64 characters', `language-${'a'.repeat(65)}`],
        ['is empty', 'language-'],
    ])('stores no language when the class %s', (_name, className) => {
        expect(codeBlockOf(`<pre><code class="${className}">a</code></pre>`)).toEqual([
            { type: 'codeBlock', children: [{ text: 'a' }] },
        ]);
    });

    it('reads markup inside as plain text with no marks', () => {
        expect(codeBlockOf('<pre><code>a <strong>b</strong> *c*</code></pre>')).toEqual([
            { type: 'codeBlock', children: [{ text: 'a b *c*' }] },
        ]);
    });

    it('reads an empty pre as a code block with no text', () => {
        expect(codeBlockOf('<pre><code class="language-ts"></code></pre>')).toEqual([
            { type: 'codeBlock', language: 'ts', children: [] },
        ]);
    });

    it('still reads a code element in a paragraph as inline code', () => {
        expect(codeBlockOf('<p>a <code>b</code></p>')).toEqual([
            { type: 'paragraph', children: [{ text: 'a ' }, { text: 'b', code: true }] },
        ]);
    });

    it('gives back the code blocks serializeToHtml wrote', () => {
        const document: RteDocument = {
            version: 1,
            blocks: [
                { type: 'codeBlock', language: 'ts', children: [{ text: 'const a = "<b>" && 1;\n\tindented\n' }] },
                { type: 'codeBlock', children: [{ text: '\nstarts with a line break' }] },
                { type: 'codeBlock', children: [{ text: '```\nfence\n```' }] },
                { type: 'codeBlock', children: [] },
            ],
        };

        expect(parseHtml(serializeToHtml(document, { plugins }), { plugins })).toEqual(document);
    });
});
