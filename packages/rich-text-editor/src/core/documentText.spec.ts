/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type RteBlockNode, type RteDocumentOf } from './document';
import { isEmpty, toPlainText } from './documentText';
import { defineBlock, defineInline, type RtePlugin } from './plugin';
import { emptyDocument } from './vocabulary';

/**
 * Both read the stored JSON alone. `isEmpty` needs no plugins; `toPlainText`
 * asks them only how an inline element reads as text.
 */

const doc = (...blocks: RteBlockNode[]): RteDocumentOf => ({ version: 1, blocks });
const paragraph = (...children: NonNullable<RteBlockNode['children']>): RteBlockNode => ({
    type: 'paragraph',
    children,
});
const list = (...items: RteBlockNode[][]): RteBlockNode => ({
    type: 'list',
    children: items.map((content) => ({ type: 'item', children: content })),
});
const mention = { type: 'mention', id: '1', username: 'jane' };

const plugins: RtePlugin[] = [
    {
        id: 'list',
        blocks: {
            list: defineBlock({ content: { items: 'item' }, toHtml: () => ({ tag: 'ul', children: true }), parse: [] }),
            item: defineBlock({
                content: { blocks: ['paragraph', 'list'] },
                toHtml: () => ({ tag: 'li', children: true }),
                parse: [],
            }),
        },
    },
    {
        id: 'divider',
        blocks: { divider: defineBlock({ toHtml: () => ({ tag: 'hr' }), parse: [] }) },
    },
    {
        id: 'mention',
        inlines: {
            mention: defineInline<{ username: string }>({
                toHtml: ({ username }) => ({ tag: 'a', children: [{ tag: 'span', children: '@' }, username] }),
                parse: [],
            }),
        },
    },
    { id: 'break', inlines: { break: defineInline({ toHtml: () => ({ tag: 'br' }), parse: [] }) } },
    {
        id: 'emoji',
        inlines: { emoji: defineInline({ toHtml: () => ({ tag: 'img', attrs: { alt: '🙂' } }), parse: [] }) },
    },
];

describe('isEmpty', () => {
    it('is true for the document an editor starts from, no blocks, or no document', () => {
        expect(isEmpty(emptyDocument())).toBe(true);
        expect(isEmpty(doc())).toBe(true);
        expect(isEmpty(null)).toBe(true);
        expect(isEmpty(undefined)).toBe(true);
    });

    it('is true when the only text is whitespace, across any number of blocks and lists', () => {
        expect(isEmpty(doc(paragraph({ text: ' \n\t' }), paragraph(), paragraph({ text: '', bold: true })))).toBe(true);
        expect(isEmpty(doc(list([paragraph({ text: '' })])))).toBe(true);
    });

    it('is false once there is text, however deep', () => {
        expect(isEmpty(doc(paragraph({ text: 'a' })))).toBe(false);
        expect(isEmpty(doc(paragraph(), list([list([paragraph({ text: ' x ' })])])))).toBe(false);
    });

    it('is false for an inline element or a void block, which are content without text', () => {
        expect(isEmpty(doc(paragraph(mention)))).toBe(false);
        expect(isEmpty(doc(paragraph(), { type: 'divider' }))).toBe(false);
    });
});

describe('toPlainText', () => {
    it('puts each text block on its own line, an empty one kept as an empty line', () => {
        expect(toPlainText(doc(paragraph({ text: 'one' }), paragraph({ text: '' }), paragraph({ text: 'two' })))).toBe(
            'one\n\ntwo',
        );
    });

    it('joins a block’s runs without separators and drops marks', () => {
        expect(toPlainText(doc(paragraph({ text: 'bold', bold: true }, { text: ' and plain' })))).toBe(
            'bold and plain',
        );
    });

    it('flattens lists, nested ones included, one line per item paragraph', () => {
        const nested = list([paragraph({ text: 'a' }), list([paragraph({ text: 'a.1' })])], [paragraph({ text: 'b' })]);

        expect(toPlainText(doc(paragraph({ text: 'intro' }), nested), { plugins })).toBe('intro\na\na.1\nb');
    });

    it('flattens a block no plugin defines by what its children are', () => {
        const callout = { type: 'callout', children: [paragraph({ text: 'inside' })] };

        expect(toPlainText(doc(callout, { type: 'unknownText', children: [{ text: 'line' }] }))).toBe('inside\nline');
    });

    it('reads an inline element as the text of its markup: a mention, a break, an image’s alt', () => {
        const text = toPlainText(
            doc(paragraph({ text: 'hi ' }, mention, { type: 'break' }, { text: 'bye ' }, { type: 'emoji' })),
            { plugins },
        );

        expect(text).toBe('hi @jane\nbye 🙂');
    });

    it('reads a text block holding only an inline element as text, not as a container', () => {
        expect(toPlainText(doc(paragraph(mention)), { plugins })).toBe('@jane');
    });

    it('gives nothing for a void block or an inline no plugin defines', () => {
        expect(toPlainText(doc(paragraph({ text: 'a' }, mention), { type: 'divider' }, paragraph({ text: 'b' })))).toBe(
            'a\nb',
        );
    });
});
