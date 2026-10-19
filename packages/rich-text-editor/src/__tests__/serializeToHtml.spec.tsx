/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it, vi } from 'vitest';

import { defaultPlugins, type RteDocument, serializeToHtml } from '../index';

// The document as HTML: each node's `toHtml`, matching the readonly view (`htmlParity.spec.tsx`).

const doc: RteDocument = {
    version: 1,
    blocks: [
        { type: 'textStyle', style: 'heading2', children: [{ text: 'A heading' }] },
        {
            type: 'paragraph',
            children: [
                { text: 'Text with ' },
                { text: 'bold', bold: true },
                { text: ' and ' },
                { text: 'a link', link: { href: 'https://example.com' } },
                { text: '.' },
            ],
        },
        { type: 'paragraph', children: [{ text: '' }] },
        {
            type: 'bulletList',
            children: [{ type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'An item.' }] }] }],
        },
    ],
};

describe('a document serialized to HTML', () => {
    it('carries what the plugins drew, classes and all', () => {
        const html = serializeToHtml(doc, { plugins: defaultPlugins });

        expect(html).toContain('A heading');
        expect(html).toContain('<strong>bold</strong>');
        expect(html).toContain('href="https://example.com"');
        expect(html).toContain('<ul');
        expect(html).toContain('<li');
        expect(html).toMatch(/<br\s*\/?>/);
    });

    it('draws with the default plugins when given none', () => {
        expect(serializeToHtml(doc)).toBe(serializeToHtml(doc, { plugins: defaultPlugins }));
        expect(serializeToHtml(doc, { wrap: false })).toBe(
            serializeToHtml(doc, { plugins: defaultPlugins, wrap: false }),
        );
    });

    it('keeps the text and says so when a feature that wrote part of the document is missing', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

        const html = serializeToHtml(doc, { plugins: [] });

        expect(html).toContain('A heading');
        expect(html).toContain('bold');
        expect(html).not.toContain('<strong>');
        expect(warn).toHaveBeenCalledWith(expect.stringContaining('Unknown block type "textStyle"'));
        warn.mockRestore();
    });
});
