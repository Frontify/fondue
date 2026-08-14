/* (c) Copyright Frontify Ltd., all rights reserved. */

// The point of this file is the absence of a browser, so it runs without one.
// @vitest-environment node

import { Window } from 'happy-dom';
import { describe, expect, it } from 'vitest';

import { serializeToHtml } from './adapters/prosemirror/serializeToHtml';
import { createReactRenderProbe } from './adapters/reactProbe/renderProbe';
import { PARAGRAPH, type RteDocumentOf, type RtePlugin } from './domain';

/**
 * Serializing where an app actually does it: on a server, with no page, no
 * `document` and no `DOMParser` in sight. Everything the drawing needs from a
 * DOM is passed in, which is the whole reason it is a parameter rather than
 * something reached for.
 *
 * The features are declared here rather than taken from `src/plugins/`, and not
 * only for the usual reason. A shipped plugin draws its toolbar with
 * `@frontify/fondue-components`, which wants browser globals the moment it is
 * imported — so an app serializing with `defaultPlugins` has to install those
 * globals first, whatever this function needs. What is being pinned down here is
 * what the DRAWING needs, which is a document and nothing else.
 */

const features: RtePlugin[] = [
    { id: 'bold', schema: { marks: [{ key: 'bold', render: ({ children }) => <strong>{children}</strong> }] } },
    {
        id: 'heading',
        schema: {
            blocks: [
                {
                    type: 'heading',
                    parseRules: [{ tag: 'h2' }],
                    render: ({ children }) => <h2>{children}</h2>,
                },
            ],
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
    it('needs nothing but the document it is handed', () => {
        expect('document' in globalThis).toBe(false);
        expect('DOMParser' in globalThis).toBe(false);

        const { document } = new Window() as unknown as { document: Document };
        const html = serializeToHtml(doc, {
            plugins: features,
            probe: createReactRenderProbe(document),
            document,
        });

        expect(html).toBe('<h2>Hello</h2><p>Sent from <strong>a server</strong>.</p><p><br></p>');
    });
});
