/* (c) Copyright Frontify Ltd., all rights reserved. */

// The point of this file is the absence of a browser, so it runs without one.
// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { PARAGRAPH, type RteDocumentOf, type RtePlugin } from './core';
import { serializeToHtml } from './renderer/serializeToHtml';

/**
 * Serializing where an app actually does it: on a server, with no page. The
 * renderer walks JSON through `renderComponent` — no engine, no `document`.
 */

const features: RtePlugin[] = [
    {
        id: 'bold',
        schema: [
            {
                kind: 'mark',
                type: 'bold',
                toDom: () => ({ tag: 'strong', children: true }),
                renderComponent: ({ children }) => <strong>{children}</strong>,
            },
        ],
    },
    {
        id: 'heading',
        schema: [
            {
                kind: 'block',
                type: 'heading',
                children: 'text',
                toDom: () => ({ tag: 'h2', children: true }),
                renderComponent: ({ children }) => <h2>{children}</h2>,
            },
        ],
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

        const html = serializeToHtml(doc, { plugins: features });

        expect(html).toMatch(/^<h2>Hello<\/h2><p>Sent from <strong>a server<\/strong>\.<\/p><p><br\s*\/?><\/p>$/);
    });
});
