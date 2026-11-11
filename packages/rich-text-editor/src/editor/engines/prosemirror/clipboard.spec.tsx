/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { redo, undo } from 'prosemirror-history';
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

/** What the editor puts on its own copies. */
const COPY_MARKER = 'data-rte-copy';

/** The HTML a copy of the whole document puts on the clipboard. */
const copied = (editor: ReturnType<typeof editorWith>): string => {
    const { schema, doc } = editor.view.state;
    const container = window.document.createElement('div');
    container.append(clipboardSerializer(schema).serializeFragment(doc.content));
    // The copy marker says where a paste came from; these tests look at the markup alone.
    container.querySelector(`[${COPY_MARKER}]`)?.removeAttribute(COPY_MARKER);
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

    it('puts undeclared keys on the clipboard only in the context of the wrappers a copy leaves open', () => {
        const container = window.document.createElement('div');
        container.innerHTML = copiedFromList();
        const sliced = container.querySelector('[data-pm-slice]');

        expect(sliced?.getAttribute('data-pm-slice')).toContain('"k"');
        sliced?.removeAttribute('data-pm-slice');
        expect(container.innerHTML).not.toContain('k');
    });

    it('puts none on the clipboard for whole blocks copied', () => {
        const source = editorWith(defaultPlugins, [{ ...paragraph(text('whole')), k: 1 } as RteBlockNode]);
        source.select('whole');

        const html = source.view.serializeForClipboard(source.view.state.selection.content()).dom.innerHTML;

        expect(html).toContain('whole');
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

type Editor = ReturnType<typeof editorWith>;

/** Fires a drag event on an editor; one `DataTransfer` carries a drag from its start to its drop. */
const fireDrag = (editor: Editor, type: string, dataTransfer: DataTransfer, copy = false): void => {
    const event = new Event(type, { bubbles: true, cancelable: true });
    Object.defineProperties(event, {
        dataTransfer: { value: dataTransfer },
        // Alt on a Mac, Ctrl elsewhere: both, so the spec does not depend on the platform.
        altKey: { value: copy },
        ctrlKey: { value: copy },
    });
    editor.view.dom.dispatchEvent(event);
};

/** No layout in the test DOM: every coordinate maps to the position the drag is at. */
const dragAt = (editor: Editor, pos: number): void => {
    editor.view.posAtCoords = () => ({ pos, inside: -1 });
};

describe('dragging a block inside the editor', () => {
    const drag = (): RteBlockNode => ({ ...paragraph(text('drag')), id: 'x' }) as RteBlockNode;

    /** Drags the block at `from` to `to`, with the copy modifier held at the drop or not. */
    const dragged = (blocks: RteBlockNode[], from: number, to: (editor: Editor) => number, copy: boolean): Editor => {
        const editor = editorWith(defaultPlugins, blocks);
        const { view } = editor;
        view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, from)));
        const dataTransfer = new DataTransfer();
        dragAt(editor, from + 1);
        fireDrag(editor, 'dragstart', dataTransfer);
        dragAt(editor, to(editor));
        fireDrag(editor, 'drop', dataTransfer, copy);
        return editor;
    };
    const toEnd = (editor: Editor): number => editor.view.state.doc.content.size;

    it('moves it with its undeclared keys, since a move duplicates nothing', () => {
        const editor = dragged([drag(), paragraph(text('stay'))], 0, toEnd, false);

        expect(editor.stored()).toEqual([paragraph(text('stay')), drag()]);
    });

    it('keeps the keys on the block when the move is undone in one step, and redone', () => {
        const editor = dragged([drag(), paragraph(text('stay'))], 0, toEnd, false);

        undo(editor.view.state, editor.view.dispatch);
        expect(editor.stored()).toEqual([drag(), paragraph(text('stay'))]);

        redo(editor.view.state, editor.view.dispatch);
        expect(editor.stored()).toEqual([paragraph(text('stay')), drag()]);
    });

    it('copies it without them, leaving the original its own', () => {
        const editor = dragged([drag(), paragraph(text('stay'))], 0, toEnd, true);

        expect(editor.stored()).toEqual([drag(), paragraph(text('stay')), paragraph(text('drag'))]);
    });

    it('copies it without them when the copy lands above the original', () => {
        // The second block starts after the first one's text and its two tokens.
        const editor = dragged([paragraph(text('stay')), drag()], 'stay'.length + 2, () => 0, true);

        expect(editor.stored()).toEqual([paragraph(text('drag')), paragraph(text('stay')), drag()]);
    });
});

describe('dropping a block dragged from another editor', () => {
    it('brings none of its undeclared keys, even from the wrappers its slice names', () => {
        const source = editorWith(defaultPlugins, [
            {
                type: 'bulletList',
                site: 'a',
                children: [{ type: 'listItem', ref: 'i1', children: [paragraph(text('item'))] }],
            } as RteBlockNode,
        ]);
        const target = editorWith(defaultPlugins, [paragraph(text('here'))]);
        source.select('item');
        const dataTransfer = new DataTransfer();
        dragAt(source, source.view.state.selection.from);
        fireDrag(source, 'dragstart', dataTransfer);
        dragAt(target, target.view.state.doc.content.size);
        fireDrag(target, 'drop', dataTransfer);

        const stored = JSON.stringify(target.stored());
        expect(stored).toContain('item');
        expect(stored).not.toContain('site');
        expect(stored).not.toContain('i1');
    });
});
