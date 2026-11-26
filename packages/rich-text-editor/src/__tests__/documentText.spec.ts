/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { isEmpty, type RteDocument, toPlainText } from '../index';
import { defaultContent, defaultPlugins, mentionPlugin } from '../plugins';

import {
    documentWith,
    UNKNOWN_AROUND_MENTION,
    UNKNOWN_WITH_EXTRA_KEYS,
    UNKNOWN_WITH_TEXT,
} from './fixtures/unknownInlines';

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
    it('reads with the default content, leaving out an inline it does not define', () => {
        expect(toPlainText(doc, { plugins: defaultContent })).toBe('Title\nline one\nline two\nAn item\nHi ');
    });

    it('reads a mention the way its plugin writes it, trigger included', () => {
        const plugins = [...defaultPlugins, mentionPlugin({ items: [], href: () => '/', trigger: '#' })];

        expect(toPlainText(doc, { plugins })).toMatch(/\nHi #jane$/);
    });
});

describe('an inline no plugin defines, read as plain text', () => {
    const plugins = [...defaultPlugins, mentionPlugin({ items: [] })];

    it.each([
        ['text in its children', UNKNOWN_WITH_EXTRA_KEYS, 'Read more'],
        ['a known inline in its children', UNKNOWN_AROUND_MENTION, '@jane'],
        ['text of its own', UNKNOWN_WITH_TEXT, 'Fallback text'],
    ])('reads %s in line with the text around it', (_name, inline, expected) => {
        expect(toPlainText(documentWith(inline), { plugins })).toBe(`Before ${expected} after`);
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
