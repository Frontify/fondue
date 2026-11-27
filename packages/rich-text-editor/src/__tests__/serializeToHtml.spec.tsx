/* (c) Copyright Frontify Ltd., all rights reserved. */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { type RteDocument, serializeToHtml } from '../index';
import { defaultContent, defaultPlugins, linkPlugin, mentionPlugin } from '../plugins';

import {
    documentWith,
    UNKNOWN_AROUND_MENTION,
    UNKNOWN_WITH_EXTRA_KEYS,
    UNKNOWN_WITH_NULL_CHILD,
    UNKNOWN_WITH_TEXT,
} from './fixtures/unknownInlines';

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

    it('draws the same from defaultContent as from defaultPlugins', () => {
        expect(serializeToHtml(doc, { plugins: defaultContent })).toBe(
            serializeToHtml(doc, { plugins: defaultPlugins }),
        );
        expect(serializeToHtml(doc, { plugins: defaultContent, wrap: false })).toBe(
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

    it("carries the link plugin's look on the element it wraps the document in", () => {
        const linkOnly: RteDocument = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'a link', link: { href: 'https://example.com' } }] }],
        };

        const html = serializeToHtml(linkOnly, {
            plugins: [linkPlugin({ look: { text: { color: 'rgb(190, 40, 90)' } } })],
        });

        expect(html).toMatch(/^<div[^>]*style="[^"]*--rte-link-color: ?rgb\(190, 40, 90\)/);
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
        expect(serializeToHtml(numbered(3), { plugins: defaultContent, wrap: false })).toContain('start="3"');
        expect(serializeToHtml(numbered(1), { plugins: defaultContent, wrap: false })).not.toContain('start=');
        expect(serializeToHtml(numbered(2.5), { plugins: defaultContent, wrap: false })).not.toContain('start=');
    });

    it('makes room for the digits a first number adds past two', () => {
        expect(serializeToHtml(numbered(99), { plugins: defaultContent, wrap: false })).not.toContain(
            '--rte-list-extra-digits',
        );
        expect(serializeToHtml(numbered(250), { plugins: defaultContent, wrap: false })).toContain(
            'style="--rte-list-extra-digits: 1;"',
        );
        expect(serializeToHtml(numbered(10_000), { plugins: defaultContent, wrap: false })).toContain(
            '--rte-list-extra-digits: 3;',
        );
    });
});

describe('an inline no plugin defines, serialized to HTML', () => {
    const plugins = [...defaultPlugins, mentionPlugin({ items: [] })];
    const MENTION_IN_PLACE = /Before <span><span [^>]*data-mention-id="jane"[^>]*><bdi>@jane<\/bdi><\/span><\/span> after/;

    beforeEach(() => {
        vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it.each([
        ['text in its children', UNKNOWN_WITH_EXTRA_KEYS, 'Before <span>Read more</span> after'],
        ['text of its own', UNKNOWN_WITH_TEXT, 'Before Fallback text after'],
    ])('writes %s', (_name, inline, expected) => {
        expect(serializeToHtml(documentWith(inline), { plugins })).toContain(expected);
    });

    it('writes a known inline in its children in place', () => {
        expect(serializeToHtml(documentWith(UNKNOWN_AROUND_MENTION), { plugins })).toMatch(MENTION_IN_PLACE);
    });

    it('draws the text run beside a child that is not an object', () => {
        const html = serializeToHtml(documentWith(UNKNOWN_WITH_NULL_CHILD), { plugins });

        expect(html).toContain('Before <span>Read more</span> after');
    });

    it('writes a known inline in its children through the plugin that defines it', () => {
        const html = serializeToHtml(documentWith(UNKNOWN_AROUND_MENTION), { plugins });

        expect(html).toContain('data-mention-id="jane"');
    });
});
