/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { undo } from 'prosemirror-history';
import { NodeSelection } from 'prosemirror-state';
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
    defineBlock,
    defineContent,
    defineInline,
    defineMark,
    definePlugin,
    type RteBlockNode,
    type RtePlugin,
} from '#/core';
import { defaultPlugins } from '#/plugins';

import { toEngineDocument } from './documentConversion';
import { destroyEditors, editorWith, paragraph, text } from './testEditor';

/**
 * The control API is what every feature drives the editor through, so each
 * method is checked by what it does to the document the host is handed.
 */

const tagPlugin: RtePlugin = definePlugin({
    id: 'tag',
    content: defineContent({
        inlines: {
            tag: defineInline<{ name: string }>({
                toHtml: ({ name }) => ({ tag: 'span', children: name }),
                parse: [],
            }),
        },
    }),
});

/** A void block of the spec's own: the shipped ones need options or are not in `defaultPlugins`. */
const dividerPlugin: RtePlugin = definePlugin({
    id: 'divider',
    content: defineContent({
        blocks: {
            divider: defineBlock({ toHtml: () => ({ tag: 'hr' }), parse: [{ tag: 'hr' }] }),
        },
    }),
});

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

    it('reports a selected unknown block by its type alone, never the stored data it keeps', () => {
        const editor = editorWith(plugins, [
            paragraph(text('a')),
            { type: 'mystery', secret: 'tok', children: [] },
            paragraph(text('b')),
        ]);
        const { view } = editor;
        view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, 3)));

        const { block, blocks } = editor.api.selection.get();

        expect(block).toEqual({ type: '__rteUnknownBlock' });
        expect(blocks).toEqual([{ type: '__rteUnknownBlock' }]);
        expect(JSON.stringify([block, blocks])).not.toContain('tok');
    });

    it('reports the marks typing at a caret would carry', () => {
        const editor = editorWith(plugins, [paragraph(text('plain '), text('bold', { bold: true }))]);
        editor.caretAfter('bo');

        expect(editor.api.selection.get().marks).toEqual({ bold: { coverage: 'all', value: {} } });
    });

    it('reports a mark toggled at a caret before anything is typed', () => {
        const editor = editorWith(plugins, [paragraph(text('plain'))]);
        editor.caretAfter('pl');

        editor.api.marks.toggle('italic');

        expect(editor.api.selection.get().marks).toEqual({ italic: { coverage: 'all', value: {} } });
    });

    it('reports the marks all of a range carries, a value-carrying one with its value', () => {
        const editor = editorWith(plugins, [
            paragraph(
                text('bold', { bold: true, link: LINK }),
                text(' and ', { link: LINK }),
                text('link', { link: LINK }),
            ),
        ]);
        editor.selectBetween('bold', 'link');

        expect(editor.api.selection.get().marks).toEqual({
            bold: { coverage: 'some' },
            link: { coverage: 'all', value: LINK },
        });
    });

    it('reports a mark only part of a range carries as some', () => {
        const editor = editorWith(plugins, [paragraph(text('half', { bold: true }), text(' plain'))]);
        editor.selectBetween('half', 'plain');

        expect(editor.api.selection.get().marks).toEqual({ bold: { coverage: 'some' } });
    });

    it('reports a mark only part of a range carries as some, and one all of it carries as all', () => {
        const editor = editorWith(plugins, [
            paragraph(text('half', { bold: true, italic: true }), text(' plain', { italic: true })),
        ]);
        editor.selectBetween('half', 'plain');

        expect(editor.api.selection.get().marks).toEqual({
            bold: { coverage: 'some' },
            italic: { coverage: 'all', value: {} },
        });
    });

    it('passes over a plain space between marked words, as the toggle does', () => {
        const editor = editorWith(plugins, [
            paragraph(text('foo', { bold: true }), text(' '), text('bar', { bold: true })),
        ]);
        editor.selectBetween('foo', 'bar');

        expect(editor.api.selection.get().marks).toEqual({ bold: { coverage: 'all', value: {} } });
    });

    it('reports no some coverage at a caret', () => {
        const editor = editorWith(plugins, [paragraph(text('half', { bold: true }), text(' plain'))]);
        editor.caretAfter('half');

        expect(editor.api.selection.get().marks).toEqual({ bold: { coverage: 'all', value: {} } });
    });

    it('reports the value of the run the range starts in when a mark has several', () => {
        const editor = editorWith(plugins, [
            paragraph(
                text('first', { link: { href: 'a' } }),
                text(' ', { link: { href: 'a' } }),
                text('second', { link: { href: 'b' } }),
            ),
        ]);
        editor.selectBetween('first', 'second');

        expect(editor.api.selection.get().marks).toEqual({ link: { coverage: 'all', value: { href: 'a' } } });
    });

    it('is the same value until the editor state changes', () => {
        const editor = editorWith(plugins, [paragraph(text('hello'))]);

        const before = editor.api.selection.get();
        expect(editor.api.selection.get()).toBe(before);

        editor.select('ell');
        expect(editor.api.selection.get()).not.toBe(before);
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

    it('puts the mark on all of a range only part of which carries it', () => {
        const editor = editorWith(plugins, [paragraph(text('half', { bold: true }), text(' plain'))]);
        editor.selectBetween('half', 'plain');

        editor.api.marks.toggle('bold');

        expect(editor.stored()).toEqual([paragraph(text('half plain', { bold: true }))]);
    });

    it('puts a mark turned on without a value on with its declared defaults', () => {
        const editor = editorWith(
            [
                ...plugins,
                definePlugin({
                    id: 'highlight',
                    content: defineContent({
                        marks: {
                            highlight: defineMark<{ color: string }>({
                                defaults: { color: 'yellow' },
                                toHtml: () => ({ tag: 'mark', children: true }),
                                parse: [],
                            }),
                        },
                    }),
                }),
            ],
            [paragraph(text('note'))],
        );
        editor.select('note');

        editor.api.marks.toggle('highlight');

        expect(editor.stored()).toEqual([paragraph(text('note', { highlight: { color: 'yellow' } }))]);
    });

    it('ignores a mark no plugin provides, and says so while developing', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        const editor = editorWith(plugins, [paragraph(text('text'))]);
        editor.select('text');

        editor.api.marks.toggle('unknown');

        expect(editor.onDocChange).not.toHaveBeenCalled();
        expect(warn).toHaveBeenCalledWith(expect.stringContaining('marks.toggle("unknown")'));
        warn.mockRestore();
    });
});

describe('marks.set', () => {
    const RED = { fontColor: { color: '#c5221f' } };
    const BLUE = { fontColor: { color: '#1a73e8' } };

    it('replaces the value the selected text carries', () => {
        const editor = editorWith(plugins, [paragraph(text('red', RED), text(' plain'))]);
        editor.selectBetween('red', 'plain');

        editor.api.marks.set('fontColor', BLUE.fontColor);

        expect(editor.stored()).toEqual([paragraph(text('red plain', BLUE))]);
    });

    it('is one undo step', () => {
        const editor = editorWith(plugins, [paragraph(text('red', RED))]);
        editor.select('red');

        editor.api.marks.set('fontColor', BLUE.fontColor);
        undo(editor.view.state, editor.view.dispatch);

        expect(editor.stored()).toEqual([paragraph(text('red', RED))]);
    });

    it('makes what is typed next at a caret carry the value', () => {
        const editor = editorWith(plugins, [paragraph(text('ab'))]);
        editor.caretAfter('a');

        editor.api.marks.set('fontColor', BLUE.fontColor);
        editor.api.insertText('X');

        expect(editor.stored()).toEqual([paragraph(text('a'), text('X', BLUE), text('b'))]);
    });

    it('ignores a mark no plugin provides, and says so while developing', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        const editor = editorWith(plugins, [paragraph(text('text'))]);
        editor.select('text');

        editor.api.marks.set('unknown');

        expect(editor.onDocChange).not.toHaveBeenCalled();
        expect(warn).toHaveBeenCalledWith(expect.stringContaining('marks.set("unknown")'));
        warn.mockRestore();
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

    it('clears the whole text block around a caret, and only that block', () => {
        const editor = editorWith(plugins, [
            paragraph(text('bo', { bold: true }), text('ld', { italic: true })),
            paragraph(text('next', { bold: true })),
        ]);
        editor.caretAfter('bo');

        editor.api.marks.removeAll();

        expect(editor.stored()).toEqual([paragraph(text('bold')), paragraph(text('next', { bold: true }))]);
    });

    it('makes what is typed next at a caret carry no marks', () => {
        const editor = editorWith(plugins, [paragraph(text('plain'))]);
        editor.caretAfter('plain');
        editor.api.marks.toggle('bold');

        editor.api.marks.removeAll();
        editor.api.insertText('X');

        expect(editor.stored()).toEqual([paragraph(text('plainX'))]);
    });

    it('keeps the mark types named in `except`, over a range and at a caret', () => {
        const blocks = [paragraph(text('bold', { bold: true, link: LINK }), text(' '), text('it', { italic: true }))];
        const range = editorWith(plugins, blocks);
        range.selectBetween('bold', 'it');
        range.api.marks.removeAll({ except: ['link'] });
        const caret = editorWith(plugins, blocks);
        caret.caretAfter('bo');
        caret.api.marks.removeAll({ except: ['link'] });

        const expected = [paragraph(text('bold', { link: LINK }), text(' it'))];
        expect(range.stored()).toEqual(expected);
        expect(caret.stored()).toEqual(expected);
    });

    it('keeps a mention', () => {
        const mention = { type: 'tag', name: 'Ada' };
        const editor = editorWith(plugins, [paragraph(text('hi ', { bold: true }), mention)]);
        editor.caretAfter('hi');

        editor.api.marks.removeAll();

        expect(editor.stored()).toEqual([paragraph(text('hi '), mention)]);
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

describe('blocks.setType inside a list', () => {
    const item = (...children: RteBlockNode[]): RteBlockNode => ({ type: 'listItem', children }) as RteBlockNode;
    const bullets = (...children: RteBlockNode[]): RteBlockNode => ({ type: 'bulletList', children }) as RteBlockNode;
    const heading = { type: 'textStyle', style: 'heading1', children: [{ text: 'one' }] } as RteBlockNode;

    it('takes the item out of its list to leave a paragraph', () => {
        const editor = editorWith(plugins, [bullets(item(paragraph(text('one'))))]);
        editor.caretAfter('on');

        editor.api.blocks.setType('paragraph');

        expect(editor.stored()).toEqual([paragraph(text('one'))]);
    });

    it('takes the item out of its list to leave a heading', () => {
        const editor = editorWith(plugins, [bullets(item(paragraph(text('one'))))]);
        editor.caretAfter('on');

        editor.api.blocks.setType('textStyle', { style: 'heading1' });

        expect(editor.stored()).toEqual([heading]);
    });

    it('works for a check list', () => {
        const editor = editorWith(plugins, [
            {
                type: 'checkList',
                children: [{ type: 'checkItem', checked: false, children: [paragraph(text('one'))] }],
            } as RteBlockNode,
        ]);
        editor.caretAfter('on');

        editor.api.blocks.setType('textStyle', { style: 'heading1' });

        expect(editor.stored()).toEqual([heading]);
    });

    it('lifts a nested item all the way out, leaving the rest in place', () => {
        const editor = editorWith(plugins, [
            bullets(item(paragraph(text('outer')), bullets(item(paragraph(text('one')))))),
        ]);
        editor.caretAfter('on');

        editor.api.blocks.setType('textStyle', { style: 'heading1' });

        expect(editor.stored()).toEqual([bullets(item(paragraph(text('outer')))), heading]);
    });

    it('is one undo step', () => {
        const editor = editorWith(plugins, [bullets(item(paragraph(text('one'))))]);
        editor.caretAfter('on');

        editor.api.blocks.setType('textStyle', { style: 'heading1' });
        undo(editor.view.state, editor.view.dispatch);

        expect(editor.stored()).toEqual([bullets(item(paragraph(text('one'))))]);
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

    it('toggle on only when some block lacks the value, and off when every block has it', () => {
        const editor = editorWith(plugins, [
            { type: 'paragraph', align: 'center', children: [{ text: 'one' }] },
            paragraph(text('two')),
        ]);
        editor.selectBetween('one', 'two');

        expect(editor.api.blocks.toggleAttribute('align', 'center')).toBe('set');
        expect(editor.stored()).toEqual([
            { type: 'paragraph', align: 'center', children: [{ text: 'one' }] },
            { type: 'paragraph', align: 'center', children: [{ text: 'two' }] },
        ]);

        expect(editor.api.blocks.toggleAttribute('align', 'center')).toBe('removed');
        expect(editor.stored()).toEqual([paragraph(text('one')), paragraph(text('two'))]);
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

    it('replaces the selected text with an inline', () => {
        const editor = editorWith(plugins, [paragraph(text('a-b'))]);
        editor.select('-');

        editor.api.insert('break');

        expect(editor.stored()).toEqual([paragraph(text('a'), { type: 'break' }, text('b'))]);
    });

    it('puts a void block after the selected text rather than over it', () => {
        const editor = editorWith(plugins, [paragraph(text('keep this text'))]);
        editor.select('this');

        editor.api.insert('divider');

        expect(editor.stored()).toEqual([paragraph(text('keep this')), { type: 'divider' }, paragraph(text(' text'))]);
    });

    it('keeps the undeclared keys of a block a void block goes in front of', () => {
        const editor = editorWith(plugins, [{ ...paragraph(text('ab')), foo: 1 }]);
        editor.caretBefore('a');

        editor.api.insert('divider');

        expect(editor.stored()).toEqual([{ type: 'divider' }, { ...paragraph(text('ab')), foo: 1 }]);
    });

    it('keeps the undeclared keys of a block a void block goes after', () => {
        const editor = editorWith(plugins, [{ ...paragraph(text('ab')), foo: 1 }]);
        editor.caretAfter('b');

        editor.api.insert('divider');

        expect(editor.stored()).toEqual([{ ...paragraph(text('ab')), foo: 1 }, { type: 'divider' }]);
    });

    it('keeps the undeclared keys of a block split by a void block on its first half', () => {
        const editor = editorWith(plugins, [{ ...paragraph(text('onetwo')), foo: 1 }]);
        editor.caretAfter('one');

        editor.api.insert('divider');

        expect(editor.stored()).toEqual([
            { ...paragraph(text('one')), foo: 1 },
            { type: 'divider' },
            paragraph(text('two')),
        ]);
    });

    it('stores the declared defaults of an inline without editing UI inserted without a value', () => {
        const editor = editorWith(
            [
                ...plugins,
                definePlugin({
                    id: 'chip',
                    content: defineContent({
                        inlines: {
                            chip: defineInline<{ label: string }>({
                                defaults: { label: 'new' },
                                toHtml: ({ label }) => ({ tag: 'span', children: label }),
                                parse: [],
                            }),
                        },
                    }),
                }),
            ],
            [paragraph(text('ab'))],
        );
        editor.caretAfter('a');

        editor.api.insert('chip');

        expect(editor.stored()).toEqual([paragraph(text('a'), { type: 'chip', label: 'new' }, text('b'))]);
    });

    it('splits the block around a void block inserted mid-text', () => {
        const editor = editorWith(plugins, [paragraph(text('before after'))]);
        editor.caretAfter('before ');

        editor.api.insert('divider');

        expect(editor.stored()).toEqual([paragraph(text('before ')), { type: 'divider' }, paragraph(text('after'))]);
    });

    it('ignores a type no plugin provides, and says so while developing', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        const editor = editorWith(plugins, [paragraph(text('ab'))]);

        editor.api.insert('unknown');
        editor.api.blocks.setType('unknown');
        editor.api.lists.toggle('unknown');

        expect(editor.onDocChange).not.toHaveBeenCalled();
        expect(warn.mock.calls.map(([message]) => String(message))).toEqual([
            expect.stringContaining('insert("unknown")'),
            expect.stringContaining('blocks.setType("unknown")'),
            expect.stringContaining('lists.toggle("unknown")'),
        ]);
        warn.mockRestore();
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

describe('history', () => {
    it('has nothing to undo or redo before an edit', () => {
        const { api } = editorWith(plugins, [paragraph()]);

        expect(api.selection.get().history.canUndo).toBe(false);
        expect(api.selection.get().history.canRedo).toBe(false);
    });

    it('undoes an edit and redoes it', () => {
        const editor = editorWith(plugins, [paragraph()]);
        editor.type('hi');

        expect(editor.api.selection.get().history.canUndo).toBe(true);
        editor.api.history.undo();

        expect(editor.stored()).toEqual([paragraph()]);
        expect(editor.api.selection.get().history.canRedo).toBe(true);
        editor.api.history.redo();

        expect(editor.stored()).toEqual([paragraph(text('hi'))]);
    });

    it('takes just a typing rewrite back on undo, as Mod-z does', () => {
        const editor = editorWith(plugins, [paragraph()]);
        editor.type('## ');

        editor.api.history.undo();

        expect(editor.stored()).toEqual([paragraph(text('## '))]);
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

    it('carries the given marks at a caret, beside the ones typing there would', () => {
        const editor = editorWith(plugins, [paragraph(text('bold', { bold: true }))]);
        editor.caretAfter('bo');

        editor.api.insertText('XY', { link: LINK });

        expect(editor.stored()).toEqual([
            paragraph(text('bo', { bold: true }), text('XY', { bold: true, link: LINK }), text('ld', { bold: true })),
        ]);
    });

    it('replaces the selected text with text that carries the given marks', () => {
        const editor = editorWith(plugins, [paragraph(text('one two three'))]);
        editor.select('two');

        editor.api.insertText('2', { link: LINK });

        expect(editor.stored()).toEqual([paragraph(text('one '), text('2', { link: LINK }), text(' three'))]);
    });

    it('takes the place of the link the text went over', () => {
        const OTHER = { href: 'https://example.org' };
        const editor = editorWith(plugins, [paragraph(text('docs', { link: LINK }))]);
        editor.select('ocs');

        editor.api.insertText('ocs', { link: OTHER });

        expect(editor.stored()).toEqual([paragraph(text('d', { link: LINK }), text('ocs', { link: OTHER }))]);
    });

    it('is one undo step, text and marks together', () => {
        const editor = editorWith(plugins, [paragraph(text('one two three'))]);
        editor.select('two');

        editor.api.insertText('2', { link: LINK });
        undo(editor.view.state, editor.view.dispatch);

        expect(editor.stored()).toEqual([paragraph(text('one two three'))]);
    });

    it('ignores a mark type no plugin provides, and says so', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        const editor = editorWith(plugins, [paragraph(text('one'))]);
        editor.caretAfter('one');

        editor.api.insertText('!', { nothing: {}, link: LINK });

        expect(editor.stored()).toEqual([paragraph(text('one'), text('!', { link: LINK }))]);
        expect(warn).toHaveBeenCalledWith(expect.stringContaining('insertText("nothing")'));
        warn.mockRestore();
    });
});

describe('the run of a mark next to another of different value', () => {
    const OTHER = { href: 'https://example.org' };

    it('ends where the value changes — two links side by side are two runs', () => {
        const editor = editorWith(plugins, [paragraph(text('one', { link: LINK }), text('two', { link: OTHER }))]);

        editor.caretAfter('on');
        expect(editor.api.marks.getRun('link')).toEqual({ value: LINK, text: 'one' });

        editor.caretAfter('tw');
        expect(editor.api.marks.getRun('link')).toEqual({ value: OTHER, text: 'two' });
    });
});

describe('blocks.setType with attributes every text block carries', () => {
    it('keeps them on the block it turns', () => {
        const editor = editorWith(plugins, [{ type: 'paragraph', align: 'center', children: [{ text: 'Title' }] }]);
        editor.caretAfter('Ti');

        editor.api.blocks.setType('textStyle', { style: 'heading2' });

        expect(editor.stored()).toEqual([
            { type: 'textStyle', style: 'heading2', align: 'center', children: [{ text: 'Title' }] },
        ]);
    });

    it('keeps each block its own across a range', () => {
        const editor = editorWith(plugins, [
            { type: 'paragraph', align: 'center', children: [{ text: 'one' }] },
            { type: 'paragraph', align: 'right', children: [{ text: 'two' }] },
        ]);
        editor.selectBetween('one', 'two');

        editor.api.blocks.setType('quote');

        expect(editor.stored()).toEqual([
            { type: 'quote', align: 'center', children: [{ text: 'one' }] },
            { type: 'quote', align: 'right', children: [{ text: 'two' }] },
        ]);
    });
});

describe('group', () => {
    const original = [paragraph(text('one')), paragraph(text('two')), paragraph(text('three'))];

    /** Three commands in three blocks, so history has no reason to merge them by itself. */
    const formatEach = (editor: ReturnType<typeof editorWith>): void => {
        editor.select('one');
        editor.api.marks.toggle('bold');
        editor.select('two');
        editor.api.marks.toggle('italic');
        editor.select('three');
        editor.api.marks.toggle('underline');
    };

    /** How many undos it takes to get back to the start. */
    const undoAll = (editor: ReturnType<typeof editorWith>): number => {
        let steps = 0;
        while (undo(editor.view.state, editor.view.dispatch)) {
            steps++;
        }
        return steps;
    };

    it('makes the commands it runs one undo step', () => {
        const editor = editorWith(plugins, original);

        editor.api.group(() => formatEach(editor));

        expect(editor.stored()).not.toEqual(original);
        expect(undoAll(editor)).toBe(1);
        expect(editor.stored()).toEqual(original);
    });

    it('leaves the same commands separate steps outside a group', () => {
        const editor = editorWith(plugins, original);

        formatEach(editor);

        expect(undoAll(editor)).toBe(3);
    });

    it('lets a group inside a group join the outer step', () => {
        const editor = editorWith(plugins, original);

        editor.api.group(() => {
            editor.select('one');
            editor.api.marks.toggle('bold');
            editor.api.group(() => {
                editor.select('two');
                editor.api.marks.toggle('italic');
            });
            editor.select('three');
            editor.api.marks.toggle('underline');
        });

        expect(undoAll(editor)).toBe(1);
        expect(editor.stored()).toEqual(original);
    });

    it('starts its step apart from the edit before it, and ends it when it returns', () => {
        const editor = editorWith(plugins, original);
        editor.select('one');
        editor.api.marks.toggle('bold');

        editor.api.group(() => {
            editor.select('two');
            editor.api.marks.toggle('italic');
            editor.select('three');
            editor.api.marks.toggle('underline');
        });
        editor.select('one');
        editor.api.marks.toggle('code');

        expect(undoAll(editor)).toBe(3);
    });

    it('stops grouping when the commands it runs throw', () => {
        const editor = editorWith(plugins, original);

        expect(() =>
            editor.api.group(() => {
                throw new Error('boom');
            }),
        ).toThrow('boom');
        formatEach(editor);

        expect(undoAll(editor)).toBe(3);
    });
});

describe('isEmpty', () => {
    it('is true for a document of one empty paragraph, or only blank text', () => {
        expect(editorWith(plugins, [paragraph()]).api.isEmpty()).toBe(true);
        expect(editorWith(plugins, [paragraph(text('  '))]).api.isEmpty()).toBe(true);
    });

    it('is false once there is text, a mention or a void block', () => {
        expect(editorWith(plugins, [paragraph(text('a'))]).api.isEmpty()).toBe(false);
        expect(editorWith(plugins, [paragraph({ type: 'tag', name: 'Ada' })]).api.isEmpty()).toBe(false);
        expect(editorWith(plugins, [paragraph(), { type: 'divider' }]).api.isEmpty()).toBe(false);
    });

    it('follows what is typed', () => {
        const editor = editorWith(plugins, [paragraph()]);

        editor.type('a');

        expect(editor.api.isEmpty()).toBe(false);
    });
});

describe('announce', () => {
    it('hands the message to the shell it is mounted in', () => {
        const announce = vi.fn<(message: string) => void>();
        const editor = editorWith(plugins, [paragraph()], { announce });

        editor.api.announce('Saved');

        expect(announce).toHaveBeenCalledWith('Saved');
    });
});
