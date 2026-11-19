/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { afterEach, describe, expect, it } from 'vitest';

import { buildPluginRegistry, type RteBlockNode, type RtePlugin } from '#/core';
import { defaultPlugins } from '#/plugins';

import { parseHtmlDocument } from './parseHtml';
import { destroyEditors, editorWith, paragraph, text } from './testEditor';

afterEach(destroyEditors);

const parsedBlocks = (html: string, plugins: readonly RtePlugin[]): RteBlockNode[] =>
    parseHtmlDocument({ html, registry: buildPluginRegistry(plugins), document: window.document }).blocks;

/** HTML from outside the editor: blocks, marks, a list, structure no plugin reads, and a trailing break. */
const FOREIGN_HTML = [
    '<h2>Terms</h2>',
    '<p>Read <strong>all</strong> of <a href="https://example.com">this</a>.<br></p>',
    '<ul><li>One</li><li>Two</li></ul>',
    '<table><tr><td>Cell a</td><td>Cell b</td></tr></table>',
    '<pre>line 1\nline 2</pre>',
    '<section><x-card>Unknown</x-card></section>',
].join('');

describe('parsing HTML into a document', () => {
    it('gives the document a paste of the same HTML gives', () => {
        const editor = editorWith(defaultPlugins, [paragraph()]);

        editor.pasteHTML(FOREIGN_HTML);

        expect(parsedBlocks(FOREIGN_HTML, defaultPlugins)).toEqual(editor.stored());
    });

    it.each(['<p>a<br></p>', '<p>a<br><br></p>', '<p><strong>a<br></strong></p>', '<div>a<br></div>', '<p><br></p>'])(
        'drops or keeps the break that ends %s as a paste does',
        (html) => {
            const editor = editorWith(defaultPlugins, [paragraph(text('x'))]);
            editor.select('x');

            editor.pasteHTML(html);

            expect(parsedBlocks(html, defaultPlugins)).toEqual(editor.stored());
        },
    );

    it('reads an element no plugin reads as its text', () => {
        expect(parsedBlocks('<p>Hello <blink>there</blink></p><x-card><h1>Title</h1></x-card>', [])).toEqual([
            paragraph(text('Hello there')),
            paragraph(text('Title')),
        ]);
    });

    it('gives an empty paragraph for empty HTML', () => {
        expect(parsedBlocks('', [])).toEqual([paragraph()]);
    });
});
