/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { NodeSelection } from 'prosemirror-state';
import { afterEach, describe, expect, it } from 'vitest';

import { defineInline, type RtePlugin } from '#/core';
import { defaultPlugins } from '#/plugins';

import { toEngineDocument } from './documentConversion';
import { destroyEditors, editorWith, paragraph, text } from './testEditor';

/**
 * The control API is what every feature drives the editor through, so each
 * method is checked by what it does to the document the host is handed.
 */

const tagPlugin: RtePlugin = {
    id: 'tag',
    inlines: {
        tag: defineInline<{ name: string }>({
            toHtml: ({ name }) => ({ tag: 'span', children: name }),
            parse: [],
            renderComponent: ({ value }) => value.name,
        }),
    },
};

/** A void block of the spec's own: the shipped ones need options or are not in `defaultPlugins`. */
const dividerPlugin: RtePlugin = {
    id: 'divider',
    schema: [
        {
            kind: 'block',
            type: 'divider',
            toDom: () => ({ tag: 'hr' }),
            renderComponent: () => <hr />,
            parseRules: [{ tag: 'hr' }],
        },
    ],
};

const plugins: RtePlugin[] = [...defaultPlugins, dividerPlugin, tagPlugin];

const LINK = { href: 'https://example.com' };

afterEach(destroyEditors);

describe('the selection snapshot', () => {
    it('reports a caret as collapsed and covering no text', () => {
        const editor = editorWith(plugins, [paragraph(text('hello'))]);
        editor.caretAfter('hel');

        const { isCollapsed, text: selected } = editor.api.selection.get();

        expect(isCollapsed).toBe(true);
        expect(selected).toBe('');
    });

    it('reports the text a range covers, blocks joined by a space', () => {
        const editor = editorWith(plugins, [paragraph(text('one')), paragraph(text('two'))]);
        editor.selectBetween('ne', 'tw');

        const { isCollapsed, text: selected } = editor.api.selection.get();

        expect(isCollapsed).toBe(false);
        expect(selected).toBe('ne tw');
    });

    it('reports the block the selection is in, with its attributes and without children', () => {
        const editor = editorWith(plugins, [
            { type: 'textStyle', style: 'heading2', align: 'center', children: [{ text: 'Title' }] },
        ]);
        editor.caretAfter('Ti');

        expect(editor.api.selection.get().block).toEqual({ type: 'textStyle', style: 'heading2', align: 'center' });
    });

    it('reports the paragraph inside a list item as the block, and every wrapper innermost first', () => {
        const editor = editorWith(plugins, [
            { type: 'bulletList', children: [{ type: 'listItem', children: [paragraph(text('item'))] }] },
        ]);
        editor.caretAfter('it');

        const { block, blocks } = editor.api.selection.get();

        expect(block).toEqual({ type: 'paragraph' });
        expect(blocks).toEqual([{ type: 'paragraph' }, { type: 'listItem' }, { type: 'bulletList' }]);
    });

    it('reports a selected void block as the block', () => {
        const editor = editorWith(plugins, [paragraph(text('a')), { type: 'divider' }, paragraph(text('b'))]);
        const { view } = editor;
        view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, 3)));

        const { block, blocks } = editor.api.selection.get();

        expect(block).toEqual({ type: 'divider' });
        expect(blocks).toEqual([{ type: 'divider' }]);
    });

    it('reports the marks typing at a caret would carry', () => {
        const editor = editorWith(plugins, [paragraph(text('plain '), text('bold', { bold: true }))]);
        editor.caretAfter('bo');

        expect(editor.api.selection.get().marks).toEqual({ bold: {} });
    });

    it('reports a mark toggled at a caret before anything is typed', () => {
        const editor = editorWith(plugins, [paragraph(text('plain'))]);
        editor.caretAfter('pl');

        editor.api.marks.toggle('italic');

        expect(editor.api.selection.get().marks).toEqual({ italic: {} });
    });

    it('reports every mark a range carries, a value-carrying one with its value', () => {
        const editor = editorWith(plugins, [
            paragraph(text('bold', { bold: true }), text(' and '), text('link', { link: LINK })),
        ]);
        editor.selectBetween('bold', 'link');

        expect(editor.api.selection.get().marks).toEqual({ bold: {}, link: LINK });
    });

    it('reports the value of the run the range starts in when a mark has several', () => {
        const editor = editorWith(plugins, [
            paragraph(text('first', { link: { href: 'a' } }), text(' '), text('second', { link: { href: 'b' } })),
        ]);
        editor.selectBetween('first', 'second');

        expect(editor.api.selection.get().marks).toEqual({ link: { href: 'a' } });
    });

    it('is the same value until the editor state changes', () => {
        const editor = editorWith(plugins, [paragraph(text('hello'))]);

        const before = editor.api.selection.get();
        expect(editor.api.selection.get()).toBe(before);

        editor.select('ell');
        expect(editor.api.selection.get()).not.toBe(before);
    });
});

describe('replacing the selection with text', () => {
    it('leaves the new text selected, so a mark toggled next covers exactly it', () => {
        const editor = editorWith(plugins, [paragraph(text('click here now'))]);
        editor.select('here');

        editor.api.selection.replaceWithText('there');
        editor.api.marks.toggle('link', LINK);

        expect(editor.api.selection.get().text).toBe('there');
        expect(editor.stored()).toEqual([paragraph(text('click '), text('there', { link: LINK }), text(' now'))]);
    });

    it('does nothing with empty text', () => {
        const editor = editorWith(plugins, [paragraph(text('keep'))]);
        editor.select('keep');

        editor.api.selection.replaceWithText('');

        expect(editor.onDocChange).not.toHaveBeenCalled();
    });
});

describe('marks.toggle', () => {
    it('puts a mark on the selected text', () => {
        const editor = editorWith(plugins, [paragraph(text('make this bold'))]);
        editor.select('this');

        editor.api.marks.toggle('bold');

        expect(editor.stored()).toEqual([paragraph(text('make '), text('this', { bold: true }), text(' bold'))]);
    });

    it('takes the mark off text that already carries it', () => {
        const editor = editorWith(plugins, [paragraph(text('bold', { bold: true }))]);
        editor.select('bold');

        editor.api.marks.toggle('bold');

        expect(editor.stored()).toEqual([paragraph(text('bold'))]);
    });

    it('stores the value it is given on the mark', () => {
        const editor = editorWith(plugins, [paragraph(text('a link'))]);
        editor.select('link');

        editor.api.marks.toggle('link', LINK);

        expect(editor.stored()).toEqual([paragraph(text('a '), text('link', { link: LINK }))]);
    });

    it('makes what is typed next at a caret carry the mark', () => {
        const editor = editorWith(plugins, [paragraph(text('ab'))]);
        editor.caretAfter('a');

        editor.api.marks.toggle('bold');
        editor.api.insertText('X');

        expect(editor.stored()).toEqual([paragraph(text('a'), text('X', { bold: true }), text('b'))]);
    });

    it('puts the mark on the text of a range but never on an inline element in it', () => {
        const editor = editorWith(plugins, [paragraph(text('a'), { type: 'tag', name: 'Ada' }, text('b'))]);
        editor.selectBetween('a', 'b');

        editor.api.marks.toggle('bold');

        expect(editor.stored()).toEqual([
            paragraph(text('a', { bold: true }), { type: 'tag', name: 'Ada' }, text('b', { bold: true })),
        ]);
    });

    it('ignores a mark no plugin provides', () => {
        const editor = editorWith(plugins, [paragraph(text('text'))]);
        editor.select('text');

        editor.api.marks.toggle('unknown');

        expect(editor.onDocChange).not.toHaveBeenCalled();
    });
});

describe('marks.removeAll', () => {
    it('strips every mark from the selected text', () => {
        const editor = editorWith(plugins, [
            paragraph(text('bold', { bold: true, italic: true }), text(' '), text('link', { link: LINK })),
        ]);
        editor.selectBetween('bold', 'link');

        editor.api.marks.removeAll();

        expect(editor.stored()).toEqual([paragraph(text('bold link'))]);
    });

    it('makes what is typed next at a caret carry no marks', () => {
        const editor = editorWith(plugins, [paragraph(text('bold', { bold: true }))]);
        editor.caretAfter('bo');

        editor.api.marks.removeAll();
        editor.api.insertText('X');

        expect(editor.stored()).toEqual([paragraph(text('bo', { bold: true }), text('X'), text('ld', { bold: true }))]);
    });
});

describe('the run of a mark around a caret', () => {
    const linked = () =>
        editorWith(plugins, [
            paragraph(text('go '), text('he', { link: LINK }), text('re', { link: LINK, bold: true }), text(' now')),
        ]);

    it('is found from a caret at the end edge of a link, where the snapshot reports no link', () => {
        const editor = linked();
        editor.caretAfter('here');

        expect(editor.api.selection.get().marks).not.toHaveProperty('link');
        expect(editor.api.marks.getRun('link')).toEqual({ value: LINK, text: 'here' });
    });

    it('is found from a caret at the start edge of a link', () => {
        const editor = linked();
        editor.caretBefore('here');

        expect(editor.api.marks.getRun('link')).toEqual({ value: LINK, text: 'here' });
    });

    it('spans text other marks split into pieces', () => {
        const editor = linked();
        editor.caretAfter('h');

        expect(editor.api.marks.getRun('link')).toEqual({ value: LINK, text: 'here' });
    });

    it('is null where the mark is not', () => {
        const editor = linked();
        editor.caretAfter('g');

        expect(editor.api.marks.getRun('link')).toBeNull();
        expect(editor.api.marks.getRun('unknown')).toBeNull();
    });

    it('becomes the selection when selected from a caret at its edge', () => {
        const editor = linked();
        editor.caretAfter('here');

        expect(editor.api.marks.select('link')).toBe(true);

        expect(editor.api.selection.get()).toMatchObject({ isCollapsed: false, text: 'here', marks: { link: LINK } });
    });

    it('leaves a range selection alone', () => {
        const editor = linked();
        editor.select('er');

        expect(editor.api.marks.select('link')).toBe(true);

        expect(editor.api.selection.get().text).toBe('er');
    });

    it('cannot be selected where the mark is not', () => {
        const editor = linked();
        editor.caretAfter('g');

        expect(editor.api.marks.select('link')).toBe(false);
        expect(editor.api.selection.get().isCollapsed).toBe(true);
    });
});

describe('blocks.setType', () => {
    it('turns the block at the caret into another type, with the attributes given', () => {
        const editor = editorWith(plugins, [paragraph(text('Title')), paragraph(text('body'))]);
        editor.caretAfter('Ti');

        editor.api.blocks.setType('textStyle', { style: 'heading2' });

        expect(editor.stored()).toEqual([
            { type: 'textStyle', style: 'heading2', children: [{ text: 'Title' }] },
            paragraph(text('body')),
        ]);
    });

    it('turns every block a range touches', () => {
        const editor = editorWith(plugins, [paragraph(text('one')), paragraph(text('two'))]);
        editor.selectBetween('one', 'two');

        editor.api.blocks.setType('quote');

        expect(editor.stored()).toEqual([
            { type: 'quote', children: [{ text: 'one' }] },
            { type: 'quote', children: [{ text: 'two' }] },
        ]);
    });
});

describe('block attributes', () => {
    it('are set on every text block the selection touches', () => {
        const editor = editorWith(plugins, [
            paragraph(text('one')),
            { type: 'textStyle', style: 'heading2', children: [{ text: 'two' }] },
            paragraph(text('three')),
        ]);
        editor.selectBetween('one', 'two');

        editor.api.blocks.updateAttributes({ align: 'center' });

        expect(editor.stored()).toEqual([
            { type: 'paragraph', align: 'center', children: [{ text: 'one' }] },
            { type: 'textStyle', style: 'heading2', align: 'center', children: [{ text: 'two' }] },
            paragraph(text('three')),
        ]);
    });

    it('are set on the paragraph inside a list item', () => {
        const editor = editorWith(plugins, [
            { type: 'bulletList', children: [{ type: 'listItem', children: [paragraph(text('item'))] }] },
        ]);
        editor.caretAfter('it');

        editor.api.blocks.updateAttributes({ align: 'right' });

        expect(editor.stored()).toEqual([
            {
                type: 'bulletList',
                children: [
                    {
                        type: 'listItem',
                        children: [{ type: 'paragraph', align: 'right', children: [{ text: 'item' }] }],
                    },
                ],
            },
        ]);
    });

    it('go back to their defaults on reset, the block type kept', () => {
        const editor = editorWith(plugins, [
            { type: 'paragraph', align: 'center', children: [{ text: 'one' }] },
            { type: 'textStyle', style: 'heading2', align: 'right', children: [{ text: 'two' }] },
        ]);
        editor.selectBetween('one', 'two');

        editor.api.blocks.resetAttributes();

        expect(editor.stored()).toEqual([
            paragraph(text('one')),
            { type: 'textStyle', style: 'heading2', children: [{ text: 'two' }] },
        ]);
    });

    it('report no change when there is nothing to reset', () => {
        const editor = editorWith(plugins, [paragraph(text('plain'))]);
        editor.select('plain');

        editor.api.blocks.resetAttributes();

        expect(editor.onDocChange).not.toHaveBeenCalled();
    });

    it('reports no change when an attribute is set to the value it already has', () => {
        const editor = editorWith(plugins, [{ type: 'paragraph', align: 'center', children: [{ text: 'plain' }] }]);
        editor.select('plain');

        editor.api.blocks.updateAttributes({ align: 'center' });

        expect(editor.onDocChange).not.toHaveBeenCalled();
    });
});

describe('insert', () => {
    it('puts a void inline at the caret, and the caret after it', () => {
        const editor = editorWith(plugins, [paragraph(text('ab'))]);
        editor.caretAfter('a');

        editor.api.insert('break');
        editor.api.insertText('X');

        expect(editor.stored()).toEqual([paragraph(text('a'), { type: 'break' }, text('Xb'))]);
    });

    it('stores the value of an inline flat on it', () => {
        const editor = editorWith(plugins, [paragraph(text('ab'))]);
        editor.caretAfter('a');

        editor.api.insert('tag', { name: 'Ada' });

        expect(editor.stored()).toEqual([paragraph(text('a'), { type: 'tag', name: 'Ada' }, text('b'))]);
    });

    it('replaces the selected text', () => {
        const editor = editorWith(plugins, [paragraph(text('a-b'))]);
        editor.select('-');

        editor.api.insert('break');

        expect(editor.stored()).toEqual([paragraph(text('a'), { type: 'break' }, text('b'))]);
    });

    it('splits the block around a void block inserted mid-text', () => {
        const editor = editorWith(plugins, [paragraph(text('before after'))]);
        editor.caretAfter('before ');

        editor.api.insert('divider');

        expect(editor.stored()).toEqual([paragraph(text('before ')), { type: 'divider' }, paragraph(text('after'))]);
    });

    it('ignores a type no plugin provides', () => {
        const editor = editorWith(plugins, [paragraph(text('ab'))]);

        editor.api.insert('unknown');

        expect(editor.onDocChange).not.toHaveBeenCalled();
    });

    it('reports the document the editor holds when an inline is inserted at a marked caret', () => {
        const editor = editorWith(plugins, [paragraph(text('ab', { bold: true }))]);
        editor.caretAfter('a');

        editor.api.insert('tag', { name: 'Ada' });

        const reported = toEngineDocument({ version: 1, blocks: editor.stored() ?? [] }, editor.view.state.schema);
        expect(reported.eq(editor.view.state.doc)).toBe(true);
        expect(editor.stored()).toEqual([
            paragraph(text('a', { bold: true }), { type: 'tag', name: 'Ada' }, text('b', { bold: true })),
        ]);
    });
});

describe('insertText', () => {
    it('types at the caret with the marks there', () => {
        const editor = editorWith(plugins, [paragraph(text('bold', { bold: true }))]);
        editor.caretAfter('bo');

        editor.api.insertText('XY');

        expect(editor.stored()).toEqual([paragraph(text('boXYld', { bold: true }))]);
    });

    it('replaces the selected text', () => {
        const editor = editorWith(plugins, [paragraph(text('one two three'))]);
        editor.select('two');

        editor.api.insertText('2');

        expect(editor.stored()).toEqual([paragraph(text('one 2 three'))]);
    });
});
