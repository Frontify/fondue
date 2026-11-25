/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type RteBlockNode, type RteDocumentOf } from './document';
import { isEmpty } from './isEmpty';
import { emptyDocument } from './vocabulary';

// `isEmpty` reads the stored JSON alone and needs no plugins.

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
