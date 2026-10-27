/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { defaultPlugins, isEmpty, mentionPlugin, type RteDocument, toPlainText } from '../index';

// The document helpers against the shipped plugins; their rules are in `core/documentText.spec.ts`.

const doc: RteDocument = {
    version: 1,
    blocks: [
        { type: 'textStyle', style: 'heading2', children: [{ text: 'Title' }] },
        { type: 'paragraph', children: [{ text: 'line one' }, { type: 'break' }, { text: 'line two', bold: true }] },
        {
            type: 'bulletList',
            children: [{ type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'An item' }] }] }],
        },
        {
            type: 'paragraph',
            children: [{ text: 'Hi ' }, { type: 'mention', id: '1', username: 'jane', name: 'Jane' }],
        },
    ],
};

describe('toPlainText', () => {
    it('reads with the default plugins when given none, leaving out an inline they do not define', () => {
        expect(toPlainText(doc)).toBe('Title\nline one\nline two\nAn item\nHi ');
    });

    it('reads a mention the way its plugin writes it, trigger included', () => {
        const plugins = [...defaultPlugins, mentionPlugin({ items: [], href: () => '/', trigger: '#' })];

        expect(toPlainText(doc, { plugins })).toMatch(/\nHi #jane$/);
    });
});

describe('isEmpty', () => {
    it('is true for an empty list and false for a document with text', () => {
        const emptyList: RteDocument = {
            version: 1,
            blocks: [
                {
                    type: 'bulletList',
                    children: [{ type: 'listItem', children: [{ type: 'paragraph', children: [{ text: '' }] }] }],
                },
            ],
        };

        expect(isEmpty(emptyList)).toBe(true);
        expect(isEmpty(doc)).toBe(false);
    });
});
