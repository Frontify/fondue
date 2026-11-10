/* (c) Copyright Frontify Ltd., all rights reserved. */

// The point of this file is the absence of a browser, so it runs without one.
// @vitest-environment node

import { describe, expect, it } from 'vitest';

import {
    defineBlock,
    defineContent,
    defineMark,
    definePlugin,
    PARAGRAPH,
    type RteDocumentOf,
    type RtePlugin,
} from '../core';
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

        expect(html).toMatch(/^<h2>Hello<\/h2><p>Sent from <strong>a server<\/strong>\.<\/p><p><br\s*\/?><\/p>$/);
    });

    it('carries a preset look on the root so a server render matches the browser', () => {
        const html = serializeToHtml(doc, {
            plugins: [textStylePlugin({ presets: { heading1: { fontSize: 'var(--f-theme-settings-h1-size)' } } })],
        });

        expect(html).toContain('--rte-heading1-font-size: var(--f-theme-settings-h1-size);');
    });
});
