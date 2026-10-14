/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { afterEach, describe, expect, it } from 'vitest';

import { defaultPlugins } from '#/plugins';

import { clipboardSerializer } from './clipboard';
import { destroyEditors, editorWith, paragraph, text } from './testEditor';

/**
 * What survives the clipboard: content copied out has to read the same in
 * other apps, and content pasted in has to keep what it said.
 */

afterEach(destroyEditors);

/** The HTML a copy of the whole document puts on the clipboard. */
const copied = (editor: ReturnType<typeof editorWith>): string => {
    const { schema, doc } = editor.view.state;
    const container = window.document.createElement('div');
    container.append(clipboardSerializer(schema).serializeFragment(doc.content));
    return container.innerHTML;
};

describe('copying', () => {
    it('keeps a line break at the end of a block, which a single <br> would lose', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('line'), { type: 'break' })]);

        expect(copied(editor)).toBe('<p>line<br><br></p>');
    });

    it('writes an empty block with a <br>, so it does not collapse', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('a')), paragraph(), paragraph(text('b'))]);

        expect(copied(editor)).toBe('<p>a</p><p><br></p><p>b</p>');
    });

    it('leaves a break in the middle of a block as it is', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('a'), { type: 'break' }, text('b'))]);

        expect(copied(editor)).toBe('<p>a<br>b</p>');
    });
});

describe('pasting', () => {
    it('into an empty block keeps the first pasted block’s attributes', () => {
        const editor = editorWith(defaultPlugins, [paragraph()]);
        editor.view.focus();

        editor.pasteHTML('<p style="text-align: center">centred</p><p>next</p>');

        expect(editor.stored()).toEqual([
            { type: 'paragraph', align: 'center', children: [{ text: 'centred' }] },
            paragraph(text('next')),
        ]);
    });

    it('into a block with text keeps that block as it is', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('here '))]);
        editor.caretAfter('here ');

        editor.pasteHTML('<p style="text-align: center">centred</p><p>next</p>');

        expect(editor.stored()?.[0]).toEqual(paragraph(text('here centred')));
    });

    it('separates table cells and rows rather than running their text together', () => {
        const editor = editorWith(defaultPlugins, [paragraph()]);

        editor.pasteHTML('<table><tr><td>cell1</td><td>cell2</td></tr><tr><td>cell3</td></tr></table>');

        expect(editor.stored()).toEqual([paragraph(text('cell1 cell2')), paragraph(text('cell3'))]);
    });

    it('keeps the lines of preformatted text apart', () => {
        const editor = editorWith(defaultPlugins, [paragraph()]);

        editor.pasteHTML('<pre>first\nsecond</pre>');

        expect(editor.stored()).toEqual([paragraph(text('first')), paragraph(text('second'))]);
    });
});
