/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import {
    defineBlock,
    defineContent,
    defineInline,
    definePlugin,
    type RteBlockNode,
    type RteDocumentOf,
    type RtePlugin,
} from '#/core';

import { toPlainText } from './toPlainText';

// `toPlainText` reads the stored JSON alone and asks the plugins only how an inline element reads as text.

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
    definePlugin({
        id: 'list',
        content: defineContent({
            blocks: {
                list: defineBlock({
                    content: { items: 'item' },
                    toHtml: () => ({ tag: 'ul', children: true }),
                    parse: [],
                }),
                item: defineBlock({
                    content: { blocks: ['paragraph', 'list'] },
                    toHtml: () => ({ tag: 'li', children: true }),
                    parse: [],
                }),
            },
        }),
    }),
    definePlugin({
        id: 'divider',
        content: defineContent({ blocks: { divider: defineBlock({ toHtml: () => ({ tag: 'hr' }), parse: [] }) } }),
    }),
    definePlugin({
        id: 'mention',
        content: defineContent({
            inlines: {
                mention: defineInline<{ username: string }>({
                    toHtml: ({ username }) => ({ tag: 'a', children: [{ tag: 'span', children: '@' }, username] }),
                    parse: [],
                }),
            },
        }),
    }),
    definePlugin({
        id: 'break',
        content: defineContent({ inlines: { break: defineInline({ toHtml: () => ({ tag: 'br' }), parse: [] }) } }),
    }),
    definePlugin({
        id: 'emoji',
        content: defineContent({
            inlines: { emoji: defineInline({ toHtml: () => ({ tag: 'img', attrs: { alt: '🙂' } }), parse: [] }) },
        }),
    }),
];

describe('toPlainText', () => {
    it('puts each text block on its own line, an empty one kept as an empty line', () => {
        expect(
            toPlainText(doc(paragraph({ text: 'one' }), paragraph({ text: '' }), paragraph({ text: 'two' })), {
                plugins: [],
            }),
        ).toBe('one\n\ntwo');
    });

    it('joins a block’s runs without separators and drops marks', () => {
        expect(toPlainText(doc(paragraph({ text: 'bold', bold: true }, { text: ' and plain' })), { plugins: [] })).toBe(
            'bold and plain',
        );
    });

    it('flattens lists, nested ones included, one line per item paragraph', () => {
        const nested = list([paragraph({ text: 'a' }), list([paragraph({ text: 'a.1' })])], [paragraph({ text: 'b' })]);

        expect(toPlainText(doc(paragraph({ text: 'intro' }), nested), { plugins })).toBe('intro\na\na.1\nb');
    });

    it('flattens a block no plugin defines by what its children are', () => {
        const callout = { type: 'callout', children: [paragraph({ text: 'inside' })] };

        expect(toPlainText(doc(callout, { type: 'unknownText', children: [{ text: 'line' }] }), { plugins: [] })).toBe(
            'inside\nline',
        );
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
        expect(
            toPlainText(doc(paragraph({ text: 'a' }, mention), { type: 'divider' }, paragraph({ text: 'b' })), {
                plugins: [],
            }),
        ).toBe('a\nb');
    });
});
