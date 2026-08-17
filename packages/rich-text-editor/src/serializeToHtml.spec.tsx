/* (c) Copyright Frontify Ltd., all rights reserved. */

import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { defaultPlugins, type RteDocument, RichTextRenderer, serializeToHtml } from './index';

/**
 * The document as HTML, drawn by the same `renderComponent` walk as
 * `RichTextRenderer` — so export and on-screen readonly stay one path.
 */

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
    it('is what RichTextRenderer draws for it', () => {
        expect(serializeToHtml(doc, { plugins: defaultPlugins })).toBe(
            renderToStaticMarkup(<RichTextRenderer value={doc} plugins={defaultPlugins} />).replaceAll(
                /^<div[^>]*>|<\/div>$/g,
                '',
            ),
        );
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

    it('says so when a feature that wrote part of the document is missing', () => {
        expect(() => serializeToHtml(doc, { plugins: [] })).toThrow(/Unknown block type "textStyle"/);
    });
});
