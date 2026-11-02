/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { NodeSelection } from 'prosemirror-state';
import { afterEach, describe, expect, it } from 'vitest';

import { type RteBlockNode } from '#/core';
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
    const copiedFromList = (): string => {
        const source = editorWith(defaultPlugins, [
            {
                type: 'bulletList',
                k: 1,
                children: [{ type: 'listItem', k: 1, children: [paragraph(text('one'), text('two'))] }],
            } as RteBlockNode,
        ]);
        source.select('net');
        return source.view.serializeForClipboard(source.view.state.selection.content()).dom.innerHTML;
    };

    it('puts no undeclared key on the clipboard', () => {
        const html = copiedFromList();

        expect(html).toContain('data-pm-slice');
        // The attribute's name still shows in `data-pm-slice`, but empty.
        expect(html).not.toContain('"k"');
    });

    it('brings no undeclared keys along when pasted back', () => {
        const target = editorWith(defaultPlugins, [paragraph()]);
        target.view.focus();

        target.pasteHTML(copiedFromList());

        expect(JSON.stringify(target.stored())).not.toContain('"k"');
    });

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

describe('pasting a payload that names undeclared keys', () => {
    const crafted =
        '<p data-pm-slice="1 1 [&quot;bulletList&quot;,{&quot;__rteExtra&quot;:{&quot;anyKey&quot;:1}},&quot;listItem&quot;,{&quot;__rteExtra&quot;:{&quot;anyKey&quot;:1}}]">x</p>';

    it('writes none of them into an empty paragraph', () => {
        const editor = editorWith(defaultPlugins, [paragraph()]);
        editor.view.focus();

        editor.pasteHTML(crafted);

        expect(JSON.stringify(editor.stored())).not.toContain('anyKey');
    });

    it('writes none of them into a list item', () => {
        const editor = editorWith(defaultPlugins, [
            {
                type: 'bulletList',
                children: [{ type: 'listItem', children: [paragraph(text('item'))] }],
            } as RteBlockNode,
        ]);
        editor.caretAfter('item');

        editor.pasteHTML(crafted);

        expect(JSON.stringify(editor.stored())).not.toContain('anyKey');
        expect(JSON.stringify(editor.stored())).toContain('x');
    });
});

describe('dragging a block inside the editor', () => {
    /** Drags the first of two blocks to the end of the document, with the copy modifier held at the drop or not. */
    const dragged = (copy: boolean) => {
        const editor = editorWith(defaultPlugins, [
            { ...paragraph(text('drag')), id: 'x' } as RteBlockNode,
            paragraph(text('stay')),
        ]);
        const { view } = editor;
        view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, 0)));
        // No layout in the test DOM: coordinates map to the positions the drag starts and ends at.
        let at = 1;
        view.posAtCoords = () => ({ pos: at, inside: -1 });
        const fire = (type: string, modifiers: Record<string, boolean> = {}): void => {
            const event = new Event(type, { bubbles: true, cancelable: true });
            Object.defineProperties(event, {
                dataTransfer: { value: new DataTransfer() },
                // Alt on a Mac, Ctrl elsewhere: both, so the spec does not depend on the platform.
                altKey: { value: modifiers.copy === true },
                ctrlKey: { value: modifiers.copy === true },
            });
            view.dom.dispatchEvent(event);
        };

        fire('dragstart');
        at = view.state.doc.content.size;
        fire('drop', { copy });
        return editor.stored();
    };

    it('moves it without its undeclared keys, as cut and paste does', () => {
        expect(dragged(false)).toEqual([paragraph(text('stay')), paragraph(text('drag'))]);
    });

    it('copies it without them, leaving the original its own', () => {
        expect(dragged(true)).toEqual([
            { ...paragraph(text('drag')), id: 'x' },
            paragraph(text('stay')),
            paragraph(text('drag')),
        ]);
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

describe('pasting a table inside a table', () => {
    it('reads each cell once, not again as part of the outer row', () => {
        const editor = editorWith(defaultPlugins, [paragraph()]);

        editor.pasteHTML('<table><tr><td>outer <table><tr><td>inner</td></tr></table></td></tr></table>');

        expect(editor.stored()).toEqual([paragraph(text('outer inner'))]);
    });
});
