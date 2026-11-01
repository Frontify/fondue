/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { type EditorView } from 'prosemirror-view';
import { afterEach, describe, expect, it } from 'vitest';

import { type RteBlockNode } from '#/core';
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
    it('hands both halves the keys when Enter splits it in the middle', () => {
        const editor = editorWith(defaultPlugins, [marked({ foo: 1 }, text('onetwo'))]);
        editor.caretAfter('one');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(editor.stored()).toEqual([marked({ foo: 1 }, text('one')), marked({ foo: 1 }, text('two'))]);
    });

    it('starts the new block clean when Enter splits it at the end', () => {
        const editor = editorWith(defaultPlugins, [marked({ foo: 1 }, text('one'))]);
        editor.caretAfter('one');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(editor.stored()).toEqual([marked({ foo: 1 }, text('one')), paragraph()]);
    });

    it('keeps the first block keys when Backspace joins two', () => {
        const editor = editorWith(defaultPlugins, [marked({ foo: 1 }, text('one')), marked({ foo: 2 }, text('two'))]);
        editor.caretBefore('two');

        expect(press(editor.view, 'Backspace')).toBe(true);

        expect(editor.stored()).toEqual([marked({ foo: 1 }, text('onetwo'))]);
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

    it('hands both items the keys when Enter splits an item in the middle', () => {
        const editor = inList();
        editor.caretAfter('one');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(editor.stored()).toEqual([
            bullets(
                { marker: 'dash' },
                item({ ref: 'i1' }, paragraph(text('one'))),
                item({ ref: 'i1' }, paragraph(text('two'))),
            ),
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

    it('keeps the keys of the list and its items when the list type changes', () => {
        const editor = inList();
        editor.caretAfter('one');

        editor.api.lists.toggle('numberedList');

        expect(editor.stored()).toEqual([
            { type: 'numberedList', marker: 'dash', children: [item({ ref: 'i1' }, paragraph(text('onetwo')))] },
        ]);
    });
});
