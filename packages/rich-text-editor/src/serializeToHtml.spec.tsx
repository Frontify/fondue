/* (c) Copyright Frontify Ltd., all rights reserved. */

import { afterEach, describe, expect, it } from 'vitest';

import { mountDocument } from './adapters/prosemirror/mount';
import { reactRenderProbe } from './adapters/reactProbe/renderProbe';

// Driven through the package's public API, the way an app does.
import { defaultPlugins, type RteDocument, serializeToHtml } from './index';

/**
 * The document as HTML, checked against the only thing it could sensibly be:
 * what the editor shows for the same document. They come from one serializer, so
 * these are less a test of the markup than of that staying true.
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

const teardown: (() => void)[] = [];

/** The same document as the editor puts it on screen. */
const shown = (value: RteDocument): string => {
    const container = window.document.createElement('div');
    window.document.body.append(container);
    const mounted = mountDocument({
        container,
        initialDoc: value,
        plugins: defaultPlugins,
        // Readonly, so it never sends for the editing half: what is on screen is
        // the drawing, which is what the serializer is being compared against.
        readOnly: true,
        placeholder: '',
        contentClassName: 'content',
        placeholderClassName: 'placeholder',
        probe: reactRenderProbe,
        onDocChange: () => {},
        onStateChange: () => {},
        onBlur: () => {},
        onEditable: () => {},
    });
    teardown.push(() => {
        mounted.destroy();
        container.remove();
    });
    return (container.firstElementChild as HTMLElement).innerHTML;
};

afterEach(() => {
    for (const clean of teardown.splice(0)) {
        clean();
    }
});

describe('a document serialized to HTML', () => {
    it('is what the editor shows for it', () => {
        expect(serializeToHtml(doc, { plugins: defaultPlugins })).toBe(shown(doc));
    });

    it('carries what the plugins drew, classes and all', () => {
        const html = serializeToHtml(doc, { plugins: defaultPlugins });

        expect(html).toContain('A heading');
        expect(html).toContain('<strong>bold</strong>');
        expect(html).toContain('href="https://example.com"');
        expect(html).toContain('<ul');
        expect(html).toContain('<li');
        // A blank line is a blank line: an empty block with nothing holding it
        // open has no height, in an email as much as in the editor.
        expect(html).toContain('<br>');
    });

    it('says so when a feature that wrote part of the document is missing', () => {
        expect(() => serializeToHtml(doc, { plugins: [] })).toThrow(/Unknown block type "textStyle"/);
    });

    it('is drawn in a document that is handed to it', () => {
        // What a server does: no page to borrow one from.
        const elsewhere = window.document.implementation.createHTMLDocument();

        expect(serializeToHtml(doc, { plugins: defaultPlugins, document: elsewhere })).toBe(
            serializeToHtml(doc, { plugins: defaultPlugins }),
        );
    });
});
