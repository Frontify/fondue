/* (c) Copyright Frontify Ltd., all rights reserved. */

// The point of this file is the absence of a browser, so it runs without one.
// @vitest-environment node

import { describe, expect, it } from 'vitest';

import {
    defineBlock,
    defineContent,
    defineMark,
    definePlugin,
    MUTED_COLOR,
    PARAGRAPH,
    type RteDocumentOf,
    type RtePlugin,
} from '../core';
import { type RteDocument } from '../documentFormat';
import { alignPlugin } from '../plugins/Align';
import { fontColorPlugin } from '../plugins/FontColor';
import { linkPlugin } from '../plugins/Link';
import { paragraphPlugin } from '../plugins/Paragraph';
import { quotePlugin } from '../plugins/Quote';
import { textStylePlugin } from '../plugins/TextStyle';
import { serializeToHtml } from '../renderer/serializeToHtml';

// Serializing where an app does it: on a server, with no page — no engine, no React, no `document`.

const features: RtePlugin[] = [
    definePlugin({
        id: 'bold',
        content: defineContent({
            marks: {
                bold: defineMark({
                    toHtml: () => ({ tag: 'strong', children: true }),
                    parse: [{ tag: 'strong' }],
                }),
            },
        }),
    }),
    definePlugin({
        id: 'heading',
        content: defineContent({
            blocks: {
                heading: defineBlock({
                    content: 'text',
                    toHtml: () => ({ tag: 'h2', children: true }),
                    parse: [{ tag: 'h2' }],
                }),
            },
        }),
    }),
];

const doc: RteDocumentOf = {
    version: 1,
    blocks: [
        { type: 'heading', children: [{ text: 'Hello' }] },
        { type: PARAGRAPH, children: [{ text: 'Sent from ' }, { text: 'a server', bold: true }, { text: '.' }] },
        { type: PARAGRAPH, children: [{ text: '' }] },
    ],
};

describe('serializing without a browser', () => {
    it('needs nothing but the document', () => {
        expect('document' in globalThis).toBe(false);
        expect('DOMParser' in globalThis).toBe(false);

        const html = serializeToHtml(doc, { plugins: features, wrap: false });

        expect(html).toMatch(
            /^<h2>Hello<\/h2><p class="rte-paragraph">Sent from <strong>a server<\/strong>\.<\/p><p class="rte-paragraph"><br\s*\/?><\/p>$/,
        );
    });

    it('carries a preset look on the root so a server render matches the browser', () => {
        const html = serializeToHtml(doc, {
            plugins: [textStylePlugin({ presets: { heading1: { fontSize: 'var(--f-theme-settings-h1-size)' } } })],
        });

        expect(html).toContain('--rte-heading1-font-size: var(--f-theme-settings-h1-size);');
    });
});

describe('serializing with inline styling', () => {
    const HEADING_SIZE = 'var(--f-theme-settings-heading1-font-size)';
    const HEADING_FONT_SIZE_TOKEN = 'var(--text-heading-xx-large-strong-font-size)';

    const looksDoc: RteDocument = {
        version: 1,
        blocks: [
            { type: 'textStyle', style: 'heading1', children: [{ text: 'Title' }] },
            { type: 'textStyle', style: 'heading2', children: [{ text: 'Subtitle' }] },
            { type: PARAGRAPH, align: 'center', children: [{ text: 'Body' }] },
            { type: 'quote', children: [{ text: 'Quote' }] },
            {
                type: PARAGRAPH,
                children: [{ text: 'Link', link: { href: 'https://example.com' }, fontColor: { color: '#ff0000' } }],
            },
        ],
    };

    const withLooks = [
        textStylePlugin({
            presets: { heading1: { fontSize: HEADING_SIZE }, heading2: { fontSize: '14px' } },
        }),
        paragraphPlugin({ look: { fontSize: '13px' } }),
        quotePlugin(),
        linkPlugin(),
        alignPlugin,
        fontColorPlugin,
    ];

    /** The `style` attribute of the first element with this tag. */
    const styleOfFirst = (html: string, tag: string): string => {
        const style = new RegExp(`<${tag}[^>]*? style="([^"]*)"`).exec(html)?.[1];
        if (style === undefined) {
            throw new Error(`No <${tag}> with a style in ${html}`);
        }
        return style;
    };

    it('writes the host value as given and the Fondue token for what the host left out', () => {
        const html = serializeToHtml(looksDoc, { plugins: withLooks, wrap: false, styling: 'inline' });

        const heading = styleOfFirst(html, 'h1');
        expect(heading).toContain(`font-size: ${HEADING_SIZE};`);
        expect(heading).toContain('font-weight: var(--text-heading-xx-large-strong-font-weight);');
        expect(heading).toContain('line-height: 1.3;');
        expect(heading).not.toContain(HEADING_FONT_SIZE_TOKEN);
    });

    it('writes literal values as given', () => {
        const html = serializeToHtml(looksDoc, { plugins: withLooks, wrap: false, styling: 'inline' });

        expect(styleOfFirst(html, 'h2')).toContain('font-size: 14px;');
        expect(styleOfFirst(html, 'p')).toContain('font-size: 13px;');
    });

    it('writes the fallbacks of a quote and a link, and no margin on the link', () => {
        const html = serializeToHtml(looksDoc, { plugins: withLooks, wrap: false, styling: 'inline' });

        expect(styleOfFirst(html, 'blockquote')).toContain(`color: ${MUTED_COLOR};`);
        const link = styleOfFirst(html, 'a');
        expect(link).toContain('color: var(--color-highlight-default);');
        expect(link).not.toContain('margin');
    });

    it('lets alignment and a font colour still win over a look', () => {
        const html = serializeToHtml(looksDoc, { plugins: withLooks, wrap: false, styling: 'inline' });

        expect(styleOfFirst(html, 'p')).toContain('text-align: center;');
        expect(styleOfFirst(html, 'span')).toBe('color: #ff0000;');
    });

    it('gives a plain paragraph the document gap in place of browser margins without a paragraph plugin', () => {
        const html = serializeToHtml(looksDoc, { plugins: [quotePlugin()], wrap: false, styling: 'inline' });

        expect(styleOfFirst(html, 'p')).toContain('margin-top: 0; margin-bottom: var(--spacing-x-small);');
    });

    it('inlines each block when the document is not wrapped', () => {
        const html = serializeToHtml(looksDoc, { plugins: withLooks, wrap: false, styling: 'inline' });

        expect(html).toMatch(/^<h1 /);
        expect(html.match(/ style="/g)?.length).toBeGreaterThanOrEqual(5);
    });

    it('wraps in the document element, with its own look in place of the --rte- properties', () => {
        const html = serializeToHtml(looksDoc, { plugins: withLooks, styling: 'inline' });

        expect(html).toMatch(/^<div class="[^"]+" style="[^"]*line-height: 1.6;[^"]*">/);
        expect(html).not.toContain('--rte-');
    });

    it('writes classes as before when asked for classes or given no styling', () => {
        const defaultCall = serializeToHtml(looksDoc, { plugins: withLooks });

        expect(serializeToHtml(looksDoc, { plugins: withLooks, styling: 'classes' })).toBe(defaultCall);
        expect(defaultCall).toContain('--rte-heading1-font-size');
        expect(defaultCall).not.toContain('font-weight: var(--text-heading');
    });
});
