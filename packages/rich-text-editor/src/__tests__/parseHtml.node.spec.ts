/* (c) Copyright Frontify Ltd., all rights reserved. */

// The point of this file is the absence of a browser, so it runs without one.
// @vitest-environment node

import { Window } from 'happy-dom';
import { describe, expect, it } from 'vitest';

import { defineBlock, defineContent, defineMark, definePlugin, parseHtml, type RtePlugin } from '../index';

// Parsing where a migration script does it: on a server, with a `Document` from a DOM library.

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

describe('parsing without a browser', () => {
    it('reads the HTML with the document it is given', () => {
        expect('window' in globalThis).toBe(false);
        expect('document' in globalThis).toBe(false);
        // happy-dom implements the DOM a `Document` describes, but declares its own types.
        const document = new Window().document as unknown as Document;

        const parsed = parseHtml('<h2>Hello</h2><p>Sent from <strong>a server</strong>.</p>', {
            plugins: features,
            document,
        });

        expect(parsed).toEqual({
            version: 1,
            blocks: [
                { type: 'heading', children: [{ text: 'Hello' }] },
                {
                    type: 'paragraph',
                    children: [{ text: 'Sent from ' }, { text: 'a server', bold: true }, { text: '.' }],
                },
            ],
        });
    });

    it('asks for a document when there is none to fall back to', () => {
        expect(() => parseHtml('<p>Hello</p>', { plugins: features })).toThrow(/document/);
    });
});
