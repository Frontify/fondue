/* (c) Copyright Frontify Ltd., all rights reserved. */

import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { PARAGRAPH, type RteDocumentOf } from './core';

import { defaultPlugins, RichTextEditor, RichTextRenderer, serializeToHtml } from './index';

/**
 * Readonly display and HTML export share the renderer, so a server-rendered
 * page can show the document without mounting an editor.
 */

const TEXT = 'Hello from the server';

const doc: RteDocumentOf = {
    version: 1,
    blocks: [{ type: PARAGRAPH, children: [{ text: TEXT }] }],
};

describe('rendering on a server', () => {
    it('draws the document through the readonly editor', () => {
        const html = renderToString(
            <RichTextEditor value={doc} plugins={defaultPlugins} readonly showEditor={false} />,
        );

        expect(html).toContain('data-chrome="false"');
        expect(html).toContain(TEXT);
    });

    it('draws the same markup through RichTextRenderer and serializeToHtml', () => {
        expect(serializeToHtml(doc, { plugins: defaultPlugins })).toBe(`<p>${TEXT}</p>`);
        expect(renderToString(<RichTextRenderer value={doc} plugins={defaultPlugins} />)).toContain(TEXT);
    });
});
