/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { redo, undo } from 'prosemirror-history';
import { TextSelection } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { type RteBlockNode, type RteDocumentOf } from '#/core';
import { defaultPlugins } from '#/plugins';

import { EXTRA_ATTR } from './documentConversion';
import { destroyEditors, editorWith, paragraph, shipped, text } from './testEditor';

/**
 * Keys a stored block carries that no mounted plugin declares ride along with
 * the block through edits, and are never handed to a plugin or drawn.
 */

afterEach(destroyEditors);

const press = (view: EditorView, key: string): boolean =>
    view.someProp('handleKeyDown', (handle) => handle(view, new KeyboardEvent('keydown', { key }))) === true;

const marked = (extras: Record<string, unknown>, ...children: Record<string, unknown>[]): RteBlockNode =>
    ({ type: 'paragraph', ...extras, children }) as RteBlockNode;

const item = (extras: Record<string, unknown>, ...children: RteBlockNode[]): RteBlockNode =>
    ({ type: 'listItem', ...extras, children }) as RteBlockNode;

const bullets = (extras: Record<string, unknown>, ...children: RteBlockNode[]): RteBlockNode =>
    ({ type: 'bulletList', ...extras, children }) as RteBlockNode;

describe('a block with undeclared keys', () => {
    it('warns once in development for each key no plugin declares, and never for a declared one', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        try {
            editorWith(defaultPlugins, [
                marked({ onlyHere: 1, alsoHere: 1, align: 'center' }, text('a')),
                marked({ onlyHere: 2 }, text('b')),
            ]);

            expect(warn).toHaveBeenCalledTimes(2);
            expect(warn).toHaveBeenCalledWith(expect.stringContaining('Key "onlyHere" on block "paragraph"'));
            expect(warn).toHaveBeenCalledWith(expect.stringContaining('Key "alsoHere" on block "paragraph"'));
        } finally {
            warn.mockRestore();
        }
    });

    it('keeps the keys on the first half when Enter splits it in the middle', () => {
        const editor = editorWith(defaultPlugins, [marked({ foo: 1 }, text('onetwo'))]);
        editor.caretAfter('one');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(editor.stored()).toEqual([marked({ foo: 1 }, text('one')), paragraph(text('two'))]);
    });

    it('keeps the keys on the block with the text when Enter at its start opens an empty one above', () => {
        const editor = editorWith(defaultPlugins, [marked({ foo: 1 }, text('one'))]);
        editor.caretBefore('one');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(editor.stored()).toEqual([paragraph(), marked({ foo: 1 }, text('one'))]);
    });

    it('keeps the keys on a heading when Enter at its start opens a paragraph above', () => {
        const heading = {
            type: 'textStyle',
            style: 'heading1',
            note: 'x',
            children: [text('Title')],
        } as unknown as RteBlockNode;
        const editor = editorWith(defaultPlugins, [heading]);
        editor.caretBefore('Title');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(editor.stored()).toEqual([paragraph(), heading]);
    });

    it('starts the new block clean when Enter splits it at the end', () => {
        const editor = editorWith(defaultPlugins, [marked({ foo: 1 }, text('one'))]);
        editor.caretAfter('one');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(editor.stored()).toEqual([marked({ foo: 1 }, text('one')), paragraph()]);
    });

    it('keeps the keys on the block with the text when Enter replaces a range from its start', () => {
        const editor = editorWith(defaultPlugins, [marked({ foo: 1 }, text('Hello'))]);
        editor.select('Hel');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(editor.stored()).toEqual([paragraph(), marked({ foo: 1 }, text('lo'))]);
    });

    it('keeps the keys of a block the host repeats when a list command runs elsewhere', () => {
        const editor = editorWith(defaultPlugins, [
            marked({ foo: 1 }, text('one')),
            bullets({}, item({}, paragraph(text('a'))), item({}, paragraph(text('b')))),
        ]);
        editor.caretAfter('b');
        editor.type('!');
        const [repeated, list] = editor.stored() ?? [];
        editor.editor.setDoc({ version: 1, blocks: [repeated, repeated, list] } as RteDocumentOf);
        editor.caretAfter('b!');

        expect(press(editor.view, 'Tab')).toBe(true);

        expect(JSON.stringify(editor.stored()).match(/"foo":1/g)).toHaveLength(2);
    });

    it('keeps the first block keys when Backspace joins two', () => {
        const editor = editorWith(defaultPlugins, [marked({ foo: 1 }, text('one')), marked({ foo: 2 }, text('two'))]);
        editor.caretBefore('two');

        expect(press(editor.view, 'Backspace')).toBe(true);

        expect(editor.stored()).toEqual([marked({ foo: 1 }, text('onetwo'))]);
    });

    it('leaves the keys on both copies of a block the host repeats when Enter splits the first', () => {
        const editor = editorWith(defaultPlugins, [marked({ foo: 1 }, text('one'))]);
        editor.type('!');
        const [repeated] = editor.stored() ?? [];
        editor.editor.setDoc({ version: 1, blocks: [repeated, repeated] } as RteDocumentOf);
        editor.caretAfter('on');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(editor.stored()).toEqual([marked({ foo: 1 }, text('!on')), paragraph(text('e')), repeated]);
    });

    it('gets the keys back on a repeated block when its deletion is undone', () => {
        const editor = editorWith(defaultPlugins, [marked({ foo: 1 }, text('one'))]);
        editor.type('!');
        const [repeated] = editor.stored() ?? [];
        editor.editor.setDoc({ version: 1, blocks: [repeated, repeated] } as RteDocumentOf);
        const { view } = editor;
        view.dispatch(
            view.state.tr.setSelection(TextSelection.create(view.state.doc, view.state.doc.child(0).nodeSize + 1)),
        );
        press(view, 'Backspace');

        expect(undo(view.state, view.dispatch)).toBe(true);

        expect(editor.stored()).toEqual([repeated, repeated]);
    });

    it('leaves the keys on the first half again when an undone split is redone', () => {
        const editor = editorWith(defaultPlugins, [marked({ foo: 1 }, text('onetwo'))]);
        editor.caretAfter('one');
        press(editor.view, 'Enter');
        undo(editor.view.state, editor.view.dispatch);

        expect(redo(editor.view.state, editor.view.dispatch)).toBe(true);

        expect(editor.stored()).toEqual([marked({ foo: 1 }, text('one')), paragraph(text('two'))]);
    });

    it('gets the second block keys back when that join is undone', () => {
        const editor = editorWith(defaultPlugins, [marked({ foo: 1 }, text('one')), marked({ foo: 2 }, text('two'))]);
        editor.caretBefore('two');
        press(editor.view, 'Backspace');

        expect(undo(editor.view.state, editor.view.dispatch)).toBe(true);

        expect(editor.stored()).toEqual([marked({ foo: 1 }, text('one')), marked({ foo: 2 }, text('two'))]);
    });

    it('keeps its keys when turned into another type', () => {
        const editor = editorWith(defaultPlugins, [marked({ foo: 1, deep: { a: null } }, text('Title'))]);
        editor.caretAfter('Ti');

        editor.api.blocks.setType('textStyle', { style: 'heading2' });

        expect(editor.stored()).toEqual([
            { type: 'textStyle', style: 'heading2', foo: 1, deep: { a: null }, children: [{ text: 'Title' }] },
        ]);
    });

    it('keeps its keys when typed into', () => {
        const editor = editorWith(defaultPlugins, [marked({ foo: 1 }, text('a'))]);
        editor.caretAfter('a');

        editor.type('b');

        expect(editor.stored()).toEqual([marked({ foo: 1 }, text('ab'))]);
    });

    it('keeps its keys on the block they were on, as declared attributes stay, when blocks are pasted at its start', () => {
        const editor = editorWith(defaultPlugins, [marked({ foo: 1, align: 'center' }, text('ab'))]);
        editor.caretBefore('ab');

        editor.pasteHTML('<p>x</p><p>y</p>');

        expect(editor.stored()).toEqual([marked({ foo: 1, align: 'center' }, text('x')), paragraph(text('yab'))]);
    });

    it('keeps its keys when text is pasted into it, and gives pasted blocks none', () => {
        const editor = editorWith(defaultPlugins, [marked({ foo: 1 }, text('ab'))]);
        editor.caretAfter('a');

        editor.pasteHTML('<p>x</p><p>y</p>');

        expect(editor.stored()).toEqual([marked({ foo: 1 }, text('ax')), paragraph(text('yb'))]);
    });

    it('keeps its keys when blocks are pasted into it empty, and gives the pasted ones none', () => {
        const editor = editorWith(defaultPlugins, [marked({ foo: 1 })]);
        editor.view.focus();

        editor.pasteHTML('<p style="text-align: center">centred</p><p>next</p>');

        expect(editor.stored()).toEqual([
            marked({ foo: 1, align: 'center' }, text('centred')),
            paragraph(text('next')),
        ]);
    });

    it('is reported to the toolbar by its declared attributes only', () => {
        const editor = editorWith(defaultPlugins, [marked({ foo: 1, align: 'center' }, text('a'))]);
        editor.caretAfter('a');

        expect(editor.api.selection.get().block).toEqual({ type: 'paragraph', align: 'center' });
        expect(editor.api.selection.get().blocks).toEqual([{ type: 'paragraph', align: 'center' }]);
    });

    it('is not drawn: no key or value reaches the editor markup', () => {
        const editor = editorWith(shipped('paragraph', 'bold'), [
            marked({ foo: 'secret', align: 'center' }, text('a')),
        ]);

        expect(editor.view.dom.innerHTML).not.toContain('secret');
        expect(editor.view.dom.innerHTML).not.toContain('center');
        expect(editor.view.dom.innerHTML).not.toContain(EXTRA_ATTR);
        expect(editor.view.dom.innerHTML).not.toContain('foo');
    });
});

describe('a list and its items with undeclared keys', () => {
    const inList = () =>
        editorWith(defaultPlugins, [bullets({ marker: 'dash' }, item({ ref: 'i1' }, paragraph(text('onetwo'))))]);

    it('keeps the keys on the first item when Enter splits an item in the middle', () => {
        const editor = inList();
        editor.caretAfter('one');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(editor.stored()).toEqual([
            bullets({ marker: 'dash' }, item({ ref: 'i1' }, paragraph(text('one'))), item({}, paragraph(text('two')))),
        ]);
    });

    it('starts the new item clean when Enter splits an item at the end', () => {
        const editor = inList();
        editor.caretAfter('onetwo');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(editor.stored()).toEqual([
            bullets({ marker: 'dash' }, item({ ref: 'i1' }, paragraph(text('onetwo'))), item({}, paragraph())),
        ]);
    });

    it('keeps the keys on the item with the text when Enter at its start opens an empty item above', () => {
        const editor = inList();
        editor.caretBefore('onetwo');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(editor.stored()).toEqual([
            bullets({ marker: 'dash' }, item({}, paragraph()), item({ ref: 'i1' }, paragraph(text('onetwo')))),
        ]);
    });

    it('keeps the keys on the paragraph with the text when Enter at the start of the second paragraph of an item starts a new item', () => {
        const editor = editorWith(defaultPlugins, [
            bullets({}, item({}, paragraph(text('first')), marked({ foo: 1 }, text('second')))),
        ]);
        editor.caretBefore('second');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(editor.stored()).toEqual([
            bullets({}, item({}, paragraph(text('first')), paragraph()), item({}, marked({ foo: 1 }, text('second')))),
        ]);
    });

    it('keeps the keys on the item when Enter at the start of its second paragraph starts a new item', () => {
        const editor = editorWith(defaultPlugins, [
            bullets({}, item({ ref: 'i1' }, marked({ foo: 1 }, text('first')), paragraph(text('second')))),
        ]);
        editor.caretBefore('second');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(editor.stored()).toEqual([
            bullets(
                {},
                item({ ref: 'i1' }, marked({ foo: 1 }, text('first')), paragraph()),
                item({}, paragraph(text('second'))),
            ),
        ]);
    });

    it('keeps the keys on the first list when Enter in an empty item splits the list in two', () => {
        const editor = editorWith(defaultPlugins, [
            bullets(
                { marker: 'dash' },
                item({}, paragraph(text('a'))),
                item({}, paragraph()),
                item({}, paragraph(text('c'))),
            ),
        ]);
        let empty = 0;
        editor.view.state.doc.descendants((node, pos) => {
            if (empty === 0 && node.isTextblock && node.content.size === 0) {
                empty = pos + 1;
            }
        });
        editor.view.dispatch(editor.view.state.tr.setSelection(TextSelection.create(editor.view.state.doc, empty)));

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(editor.stored()).toEqual([
            bullets({ marker: 'dash' }, item({}, paragraph(text('a')))),
            paragraph(),
            bullets({}, item({}, paragraph(text('c')))),
        ]);
    });

    it('keeps the keys on the outer list when Shift-Tab lifts a nested item out of the middle', () => {
        const nested = bullets(
            { marker: 'dot' },
            item({}, paragraph(text('x'))),
            item({}, paragraph(text('y'))),
            item({}, paragraph(text('z'))),
        );
        const editor = editorWith(defaultPlugins, [
            bullets({ marker: 'dash' }, item({}, paragraph(text('a')), nested)),
        ]);
        editor.caretAfter('y');

        expect(press(editor.view, 'Shift-Tab') || editor.api.lists.outdent()).toBe(true);

        expect(editor.stored()).toEqual([
            bullets(
                { marker: 'dash' },
                item({}, paragraph(text('a')), bullets({ marker: 'dot' }, item({}, paragraph(text('x'))))),
                item({}, paragraph(text('y')), bullets({}, item({}, paragraph(text('z'))))),
            ),
        ]);
    });

    it('keeps the keys on the first list when a middle item is turned into a heading', () => {
        const editor = editorWith(defaultPlugins, [
            bullets(
                { marker: 'dash' },
                item({}, paragraph(text('a'))),
                item({}, paragraph(text('b'))),
                item({}, paragraph(text('c'))),
            ),
        ]);
        editor.caretAfter('b');

        editor.api.blocks.setType('textStyle', { style: 'heading1' });

        expect(editor.stored()).toEqual([
            bullets({ marker: 'dash' }, item({}, paragraph(text('a')))),
            { type: 'textStyle', style: 'heading1', children: [text('b')] },
            bullets({}, item({}, paragraph(text('c')))),
        ]);
    });

    it('keeps the keys of the list and its items when the list type changes', () => {
        const editor = inList();
        editor.caretAfter('one');

        editor.api.lists.toggle('numberedList');

        expect(editor.stored()).toEqual([
            { type: 'numberedList', marker: 'dash', children: [item({ ref: 'i1' }, paragraph(text('onetwo')))] },
        ]);
    });
});
