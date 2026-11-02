/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { afterEach, describe, expect, it } from 'vitest';

import { type RteBlockNode } from '#/core';

import { destroyEditors, editorWith, paragraph, shipped, text } from './testEditor';

/**
 * The list commands, checked by the document they leave behind: wrapping,
 * unwrapping and converting, nesting, splitting, and flattening.
 */

const plugins = shipped('bullet-list', 'numbered-list', 'check-list');

const item = (...children: RteBlockNode[]): RteBlockNode => ({ type: 'listItem', children }) as RteBlockNode;
const list = (type: string, ...items: RteBlockNode[]): RteBlockNode => ({ type, children: items }) as RteBlockNode;
const bullets = (...texts: string[]): RteBlockNode =>
    list('bulletList', ...texts.map((value) => item(paragraph(text(value)))));

afterEach(destroyEditors);

describe('toggling a list', () => {
    it('wraps the paragraph at the caret', () => {
        const editor = editorWith(plugins, [paragraph(text('one'))]);
        editor.caretAfter('on');

        editor.api.lists.toggle('bulletList');

        expect(editor.stored()).toEqual([bullets('one')]);
    });

    it('wraps every paragraph a range touches, one item each', () => {
        const editor = editorWith(plugins, [paragraph(text('one')), paragraph(text('two'))]);
        editor.selectBetween('one', 'two');

        editor.api.lists.toggle('numberedList');

        expect(editor.stored()).toEqual([
            list('numberedList', item(paragraph(text('one'))), item(paragraph(text('two')))),
        ]);
    });

    it('unwraps the item when the list is already of that type', () => {
        const editor = editorWith(plugins, [bullets('one')]);
        editor.caretAfter('on');

        editor.api.lists.toggle('bulletList');

        expect(editor.stored()).toEqual([paragraph(text('one'))]);
    });

    it('converts a bullet list into a numbered one in place, every item kept', () => {
        const editor = editorWith(plugins, [bullets('one', 'two')]);
        editor.caretAfter('tw');

        editor.api.lists.toggle('numberedList');

        expect(editor.stored()).toEqual([
            list('numberedList', item(paragraph(text('one'))), item(paragraph(text('two')))),
        ]);
    });

    it('converts a bullet list into a check list, its items unchecked', () => {
        const editor = editorWith(plugins, [bullets('one')]);
        editor.caretAfter('on');

        editor.api.lists.toggle('checkList');

        expect(editor.stored()).toEqual([
            list('checkList', {
                type: 'checkItem',
                checked: false,
                children: [paragraph(text('one'))],
            } as RteBlockNode),
        ]);
    });

    it('converts a check list into a bullet list', () => {
        const editor = editorWith(plugins, [
            list('checkList', {
                type: 'checkItem',
                checked: true,
                children: [paragraph(text('done'))],
            } as RteBlockNode),
        ]);
        editor.caretAfter('do');

        editor.api.lists.toggle('bulletList');

        expect(editor.stored()).toEqual([bullets('done')]);
    });

    it('converts only the innermost list around the caret', () => {
        const editor = editorWith(plugins, [
            list('bulletList', item(paragraph(text('outer')), list('numberedList', item(paragraph(text('inner')))))),
        ]);
        editor.caretAfter('inn');

        editor.api.lists.toggle('bulletList');

        expect(editor.stored()).toEqual([list('bulletList', item(paragraph(text('outer')), bullets('inner')))]);
    });

    it('ignores a type that is not a list', () => {
        const editor = editorWith(plugins, [paragraph(text('one'))]);

        editor.api.lists.toggle('paragraph');

        expect(editor.onDocChange).not.toHaveBeenCalled();
    });
});

describe('indenting a list item', () => {
    it('nests it under the item above, in a list of the same type', () => {
        const editor = editorWith(plugins, [bullets('one', 'two')]);
        editor.caretAfter('tw');

        expect(editor.api.lists.indent()).toBe(true);

        expect(editor.stored()).toEqual([list('bulletList', item(paragraph(text('one')), bullets('two')))]);
    });

    it('does nothing to the first item, which has nothing to nest under', () => {
        const editor = editorWith(plugins, [bullets('one', 'two')]);
        editor.caretAfter('on');

        expect(editor.api.lists.indent()).toBe(false);
        expect(editor.onDocChange).not.toHaveBeenCalled();
    });

    it('does nothing outside a list', () => {
        const editor = editorWith(plugins, [paragraph(text('one'))]);

        expect(editor.api.lists.indent()).toBe(false);
    });
});

describe('outdenting a list item', () => {
    it('lifts a nested item one level', () => {
        const editor = editorWith(plugins, [list('bulletList', item(paragraph(text('one')), bullets('two')))]);
        editor.caretAfter('tw');

        expect(editor.api.lists.outdent()).toBe(true);

        expect(editor.stored()).toEqual([bullets('one', 'two')]);
    });

    it('takes a top-level item out of the list', () => {
        const editor = editorWith(plugins, [bullets('one', 'two')]);
        editor.caretAfter('tw');

        expect(editor.api.lists.outdent()).toBe(true);

        expect(editor.stored()).toEqual([bullets('one'), paragraph(text('two'))]);
    });

    it('does nothing outside a list', () => {
        const editor = editorWith(plugins, [paragraph(text('one'))]);

        expect(editor.api.lists.outdent()).toBe(false);
    });
});

describe('splitting a list item', () => {
    it('breaks the item in two at the caret', () => {
        const editor = editorWith(plugins, [bullets('onetwo')]);
        editor.caretAfter('one');

        expect(editor.api.lists.split()).toBe(true);

        expect(editor.stored()).toEqual([bullets('one', 'two')]);
    });

    it('does nothing outside a list', () => {
        const editor = editorWith(plugins, [paragraph(text('onetwo'))]);
        editor.caretAfter('one');

        expect(editor.api.lists.split()).toBe(false);
        expect(editor.onDocChange).not.toHaveBeenCalled();
    });
});

describe('unwrapping every list', () => {
    it('replaces nested lists with the paragraphs they held, in order', () => {
        const editor = editorWith(plugins, [
            paragraph(text('before')),
            list('bulletList', item(paragraph(text('outer')), list('numberedList', item(paragraph(text('inner')))))),
            bullets('second'),
            paragraph(text('after')),
        ]);
        editor.selectBetween('before', 'after');

        expect(editor.api.lists.unwrapAll()).toBe(true);

        expect(editor.stored()).toEqual([
            paragraph(text('before')),
            paragraph(text('outer')),
            paragraph(text('inner')),
            paragraph(text('second')),
            paragraph(text('after')),
        ]);
    });

    it('works from a caret inside a list', () => {
        const editor = editorWith(plugins, [bullets('one', 'two')]);
        editor.caretAfter('on');

        expect(editor.api.lists.unwrapAll()).toBe(true);

        expect(editor.stored()).toEqual([paragraph(text('one')), paragraph(text('two'))]);
    });

    it('reports false when the selection touches no list', () => {
        const editor = editorWith(plugins, [paragraph(text('one')), bullets('two')]);
        editor.select('one');

        expect(editor.api.lists.unwrapAll()).toBe(false);
        expect(editor.onDocChange).not.toHaveBeenCalled();
    });
});
