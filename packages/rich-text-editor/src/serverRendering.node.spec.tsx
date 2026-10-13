/* (c) Copyright Frontify Ltd., all rights reserved. */

// The point of this file is the absence of a browser, so it runs without one.
// @vitest-environment node

import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { PARAGRAPH, type RteDocumentOf } from './core';

import { defaultPlugins, RichTextEditor } from './index';

/**
 * The package root imported where a server imports it: no page, no `document`.
 * Readonly rendering goes through `RichTextRenderer`, so the document is in
 * the markup.
 *
 * Imported statically, so loading the package happens while the file is
 * collected rather than inside the test, where it would count against the test
 * timeout. Had the import touched a DOM global, collection fails instead.
 */

const doc: RteDocumentOf = {
    version: 1,
    blocks: [{ type: PARAGRAPH, children: [{ text: 'Hello from the server' }] }],
};

describe('importing the package where there is no browser', () => {
    it('imports and renders the document', () => {
        expect('document' in globalThis).toBe(false);

        const html = renderToString(
            <RichTextEditor value={doc} plugins={defaultPlugins} readonly showEditor={false} />,
        );

        expect(html).toContain('data-chrome="false"');
        expect(html).toContain('Hello from the server');
    });
});
