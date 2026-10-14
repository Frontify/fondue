/* (c) Copyright Frontify Ltd., all rights reserved. */

// The point of this file is the absence of a browser, so it runs without one.
// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { defineBlock, defineMark, PARAGRAPH, type RteDocumentOf, type RtePlugin } from './core';
import { serializeToHtml } from './renderer/serializeToHtml';

// Serializing where an app does it: on a server, with no page — no engine, no React, no `document`.

const features: RtePlugin[] = [
    {
        id: 'bold',
        marks: {
            bold: defineMark({
                toHtml: () => ({ tag: 'strong', children: true }),
                parse: [{ tag: 'strong' }],
            }),
        },
    },
    {
        id: 'heading',
        blocks: {
            heading: defineBlock({
                content: 'text',
                toHtml: () => ({ tag: 'h2', children: true }),
                parse: [{ tag: 'h2' }],
            }),
        },
    },
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
});
