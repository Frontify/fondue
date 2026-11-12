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
    it('leaves out keys no plugin declares', () => {
        const withExtras = {
            version: 1,
            secret: 'root-extra',
            blocks: [
                { type: 'paragraph', secret: 'block-extra', align: 'center', children: [{ text: 'Text' }] },
                {
                    type: 'bulletList',
                    secret: 'list-extra',
                    children: [{ type: 'listItem', secret: 'item-extra', children: [] }],
                },
            ],
        } as unknown as RteDocument;

        const html = serializeToHtml(withExtras, { plugins: defaultPlugins });

        expect(html).toContain('Text');
        expect(html).not.toMatch(/extra|secret|__rteExtra/);
    });

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

describe('a numbered list serialized to HTML', () => {
    const numbered = (start: number): RteDocument => ({
        version: 1,
        blocks: [
            {
                type: 'numberedList',
                start,
                children: [{ type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'An item.' }] }] }],
            },
        ],
    });

    it('writes where it starts, unless that is 1 or no whole number', () => {
        expect(serializeToHtml(numbered(3), { wrap: false })).toContain('start="3"');
        expect(serializeToHtml(numbered(1), { wrap: false })).not.toContain('start=');
        expect(serializeToHtml(numbered(2.5), { wrap: false })).not.toContain('start=');
    });

    it('makes room for the digits a first number adds past two', () => {
        expect(serializeToHtml(numbered(99), { wrap: false })).not.toContain('--rte-list-extra-digits');
        expect(serializeToHtml(numbered(250), { wrap: false })).toContain('style="--rte-list-extra-digits: 1;"');
        expect(serializeToHtml(numbered(10_000), { wrap: false })).toContain('--rte-list-extra-digits: 3;');
    });
});
