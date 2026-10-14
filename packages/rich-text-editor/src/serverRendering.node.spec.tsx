/* (c) Copyright Frontify Ltd., all rights reserved. */

// The point of this file is the absence of a browser, so it runs without one.
// @vitest-environment node

import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { PARAGRAPH, type RteDocumentOf } from './core';

import { defaultPlugins, RichTextEditor } from './index';

// The package root imported where a server imports it: no page, no `document`.
// Imported statically, so loading happens at collection rather than inside the
// test (and its timeout); an import touching a DOM global fails collection.

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
