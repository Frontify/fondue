/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { afterEach, describe, expect, it } from 'vitest';

import { buildPluginRegistry, type RteBlockNode, type RtePlugin } from '#/core';
import { boldPlugin, bulletListPlugin, defaultPlugins, tablePlugin } from '#/plugins';

import { clipboardSerializer, COPIED_FROM_EDITOR } from './clipboard';
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

const TABLE_PLUGINS = [boldPlugin(), bulletListPlugin(), tablePlugin()];

const TWO_BY_TWO_HTML = '<table><tr><td>a</td><td>b</td></tr><tr><td>c</td><td>d</td></tr></table>';
const BARE_TABLE_HTML = '<table><tr><th><p>H</p></th></tr><tr><td><p>c</p></td></tr></table>';
const NESTED_TABLE_HTML = '<table><tr><td><p>outer</p><table><tr><td><p>inner</p></td></tr></table></td></tr></table>';
const PRE_HTML = '<pre>line 1\nline 2</pre>';

const cell = (...children: RteBlockNode[]): RteBlockNode =>
    ({ type: 'tableCell', colspan: 1, rowspan: 1, children }) as RteBlockNode;
const header = (...children: RteBlockNode[]): RteBlockNode =>
    ({ type: 'tableHeader', colspan: 1, rowspan: 1, scope: 'col', children }) as RteBlockNode;
const row = (...children: RteBlockNode[]): RteBlockNode => ({ type: 'tableRow', children }) as RteBlockNode;
const table = (...children: RteBlockNode[]): RteBlockNode => ({ type: 'table', children }) as RteBlockNode;

const BULLET_LIST = {
    type: 'bulletList',
    children: [{ type: 'listItem', children: [paragraph(text('li'))] }],
} as RteBlockNode;

/** A header row, then a row with a bold cell and a cell holding a list. */
const TABLE_BLOCKS: RteBlockNode[] = [
    table(
        row(header(paragraph(text('H1'))), header(paragraph(text('H2')))),
        row(cell(paragraph(text('a', { bold: true }))), cell(BULLET_LIST)),
    ),
];

/** The HTML a copy of the table puts on the clipboard, without the marker that says it came from the editor. */
const copiedTableHtml = (): string => {
    const { view } = editorWith(TABLE_PLUGINS, TABLE_BLOCKS);
    const container = window.document.createElement('div');
    container.append(clipboardSerializer(view.state.schema).serializeFragment(view.state.doc.content));
    container.querySelector(`[${COPIED_FROM_EDITOR}]`)?.removeAttribute(COPIED_FROM_EDITOR);
    return container.innerHTML;
};

describe('parsing a table', () => {
    it('reads the HTML of a copied table back as it was', () => {
        const html = copiedTableHtml();

        expect(parsedBlocks(html, TABLE_PLUGINS)).toEqual(TABLE_BLOCKS);
    });

    it('reads a table without classes as a table', () => {
        expect(parsedBlocks(BARE_TABLE_HTML, TABLE_PLUGINS)).toEqual([
            table(row(header(paragraph(text('H')))), row(cell(paragraph(text('c'))))),
        ]);
    });

    it('keeps a table in a paste', () => {
        const html = copiedTableHtml();
        const editor = editorWith(TABLE_PLUGINS, [paragraph()]);

        editor.pasteHTML(html);

        expect(editor.stored()).toContainEqual(TABLE_BLOCKS[0]);
    });

    it('reads a table as one line per row when no plugin reads tables', () => {
        const expected = [paragraph(text('a b')), paragraph(text('c d'))];
        const editor = editorWith([boldPlugin()], [paragraph()]);

        editor.pasteHTML(TWO_BY_TWO_HTML);

        expect(parsedBlocks(TWO_BY_TWO_HTML, [boldPlugin()])).toEqual(expected);
        expect(editor.stored()).toEqual(expected);
    });

    it('reads a pre as one paragraph per line while no plugin reads pre', () => {
        const expected = [paragraph(text('line 1')), paragraph(text('line 2'))];
        const editor = editorWith(TABLE_PLUGINS, [paragraph()]);

        editor.pasteHTML(PRE_HTML);

        expect(parsedBlocks(PRE_HTML, TABLE_PLUGINS)).toEqual(expected);
        expect(editor.stored()).toEqual(expected);
    });

    it('reads a table nested in a cell as a table of its own after the outer one, as a cell holds no table', () => {
        expect(parsedBlocks(NESTED_TABLE_HTML, TABLE_PLUGINS)).toEqual([
            table(row(cell(paragraph(text('outer'))))),
            table(row(cell(paragraph(text('inner'))))),
        ]);
    });
});
