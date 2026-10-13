/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { TextSelection } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { type EditorControlApi, type RteBlockNode, type RtePlugin } from '#/core';
import { defaultPlugins } from '#/plugins';

import { destroyEditors, editorWith, paragraph, shipped, text } from './testEditor';

/**
 * What typing and key presses do, through the pipeline `keystrokePipeline`
 * assembles: the typing rewrites, a feature's own keys, and the list keys.
 */

const empty = (): RteBlockNode[] => [paragraph()];

const typed = (value: string, plugins: RtePlugin[] = defaultPlugins): RteBlockNode[] | null => {
    const editor = editorWith(plugins, empty());
    editor.type(value);
    return editor.stored();
};

const press = (view: EditorView, key: string, init: KeyboardEventInit = {}): boolean =>
    view.someProp('handleKeyDown', (handle) => handle(view, new KeyboardEvent('keydown', { key, ...init }))) === true;

afterEach(destroyEditors);

describe('typing a mark shortcut', () => {
    it('turns **text** bold', () => {
        expect(typed('a **bold** b')).toEqual([paragraph(text('a '), text('bold', { bold: true }), text(' b'))]);
    });

    it('turns **text** bold at the very start of a line', () => {
        expect(typed('**bold**')).toEqual([paragraph(text('bold', { bold: true }))]);
    });

    it('turns `text` into code', () => {
        expect(typed('run `npm i` now')).toEqual([
            paragraph(text('run '), text('npm i', { code: true }), text(' now')),
        ]);
    });

    it('turns *text* italic', () => {
        expect(typed('an *aside*')).toEqual([paragraph(text('an '), text('aside', { italic: true }))]);
    });

    it('does not carry the mark on into what is typed after it', () => {
        expect(typed('**bold**x')).toEqual([paragraph(text('bold', { bold: true }), text('x'))]);
    });

    it('stays plain text when no mounted plugin provides the mark', () => {
        expect(typed('**bold**', shipped('quote'))).toEqual([paragraph(text('**bold**'))]);
    });

    it('stays plain text with only the shorter delimiter mounted', () => {
        expect(typed('**bold**', shipped('italic'))).toEqual([paragraph(text('**bold**'))]);
    });
});

describe('typing a block shortcut at the start of a line', () => {
    it('turns "## " into a level-2 heading', () => {
        expect(typed('## Title')).toEqual([{ type: 'textStyle', style: 'heading2', children: [{ text: 'Title' }] }]);
    });

    it('turns "> " into a quote', () => {
        expect(typed('> Quoted')).toEqual([{ type: 'quote', children: [{ text: 'Quoted' }] }]);
    });

    it('does nothing in the middle of a line', () => {
        expect(typed('a ## b')).toEqual([paragraph(text('a ## b'))]);
    });
});

describe('typing a list shortcut at the start of a line', () => {
    it.each([
        ['- ', 'bulletList'],
        ['* ', 'bulletList'],
        ['1. ', 'numberedList'],
        ['1) ', 'numberedList'],
    ])('turns "%s" into a %s', (prefix, type) => {
        expect(typed(`${prefix}item`)).toEqual([
            { type, children: [{ type: 'listItem', children: [paragraph(text('item'))] }] },
        ]);
    });

    it('turns "[] " into a check list', () => {
        expect(typed('[] task')).toEqual([
            {
                type: 'checkList',
                children: [{ type: 'checkItem', checked: false, children: [paragraph(text('task'))] }],
            },
        ]);
    });

    it('stays plain text when no list is mounted', () => {
        expect(typed('- item', shipped('quote'))).toEqual([paragraph(text('- item'))]);
    });
});

describe('typography while typing', () => {
    it.each([
        ['a -> b', 'a → b'],
        ['a <- b', 'a ← b'],
        ['a => b', 'a ⇒ b'],
        ['wait...', 'wait…'],
        ['a -- b', 'a — b'],
        ['(c) 2026', '© 2026'],
        ['1/2 cup', '½ cup'],
    ])('turns "%s" into "%s"', (input, output) => {
        expect(typed(input)).toEqual([paragraph(text(output))]);
    });

    it('opens a double quote at the start of a word and closes it after one', () => {
        expect(typed('say "hi" now')).toEqual([paragraph(text('say “hi” now'))]);
    });

    it('opens a quote at the start of the line', () => {
        expect(typed('"hi"')).toEqual([paragraph(text('“hi”'))]);
    });

    it('turns an apostrophe inside a word into a closing single quote', () => {
        expect(typed("it's 'fine'")).toEqual([paragraph(text('it’s ‘fine’'))]);
    });
});

describe('a feature hotkey', () => {
    it('runs when its keys are pressed — Shift-Enter breaks the line', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('ab'))]);
        editor.caretAfter('a');

        expect(press(editor.view, 'Enter', { shiftKey: true })).toBe(true);

        expect(editor.stored()).toEqual([paragraph(text('a'), { type: 'break' }, text('b'))]);
    });

    it('falls through to the next feature bound to the same keys when it returns false', () => {
        const first = vi.fn(() => false);
        const second = vi.fn<(api: EditorControlApi) => void>((api) => api.insertText('!'));
        const editor = editorWith(
            [
                { id: 'first', hotkeys: { 'Alt-x': first } },
                { id: 'second', hotkeys: { 'Alt-x': second } },
            ],
            [paragraph(text('a'))],
        );
        editor.caretAfter('a');

        expect(press(editor.view, 'x', { altKey: true })).toBe(true);

        expect(first).toHaveBeenCalledTimes(1);
        expect(second).toHaveBeenCalledTimes(1);
        expect(editor.stored()).toEqual([paragraph(text('a!'))]);
    });

    it('takes a key the list keys would otherwise claim', () => {
        const claim = vi.fn(() => true);
        const editor = editorWith(
            [...defaultPlugins, { id: 'claims-enter', hotkeys: { Enter: claim } }],
            [{ type: 'bulletList', children: [{ type: 'listItem', children: [paragraph(text('ab'))] }] }],
        );
        editor.caretAfter('a');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(claim).toHaveBeenCalledTimes(1);
        expect(editor.onDocChange).not.toHaveBeenCalled();
    });

    it('naming a character fires on that character being typed, and the character is not inserted', () => {
        const mention = vi.fn<(api: EditorControlApi) => void>((api) => api.insertText('[mention]'));
        const editor = editorWith([{ id: 'mention', hotkeys: { '@': mention } }], empty());

        editor.type('hi @');

        expect(mention).toHaveBeenCalledTimes(1);
        expect(editor.stored()).toEqual([paragraph(text('hi [mention]'))]);
    });
});

describe('the list keys', () => {
    const inList = () =>
        editorWith(defaultPlugins, [
            {
                type: 'bulletList',
                children: [
                    { type: 'listItem', children: [paragraph(text('one'))] },
                    { type: 'listItem', children: [paragraph(text('two'))] },
                ],
            },
        ]);

    it('split the item on Enter', () => {
        const editor = inList();
        editor.caretAfter('o');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(editor.stored()).toEqual([
            {
                type: 'bulletList',
                children: [
                    { type: 'listItem', children: [paragraph(text('o'))] },
                    { type: 'listItem', children: [paragraph(text('ne'))] },
                    { type: 'listItem', children: [paragraph(text('two'))] },
                ],
            },
        ]);
    });

    it('take an empty item out of the list on Enter', () => {
        const editor = editorWith(defaultPlugins, [
            {
                type: 'bulletList',
                children: [
                    { type: 'listItem', children: [paragraph(text('one'))] },
                    { type: 'listItem', children: [paragraph()] },
                ],
            },
        ]);
        const { view } = editor;
        // Inside the empty paragraph: before the closing tokens of it, its item and the list.
        view.dispatch(
            view.state.tr.setSelection(TextSelection.create(view.state.doc, view.state.doc.content.size - 3)),
        );

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(editor.stored()).toEqual([
            { type: 'bulletList', children: [{ type: 'listItem', children: [paragraph(text('one'))] }] },
            paragraph(),
        ]);
    });

    it('nest the item on Tab and lift it back on Shift-Tab', () => {
        const editor = inList();
        editor.caretAfter('tw');

        expect(press(editor.view, 'Tab')).toBe(true);
        expect(editor.stored()).toEqual([
            {
                type: 'bulletList',
                children: [
                    {
                        type: 'listItem',
                        children: [
                            paragraph(text('one')),
                            {
                                type: 'bulletList',
                                children: [{ type: 'listItem', children: [paragraph(text('two'))] }],
                            },
                        ],
                    },
                ],
            },
        ]);

        expect(press(editor.view, 'Tab', { shiftKey: true })).toBe(true);
        expect(editor.stored()).toEqual([
            {
                type: 'bulletList',
                children: [
                    { type: 'listItem', children: [paragraph(text('one'))] },
                    { type: 'listItem', children: [paragraph(text('two'))] },
                ],
            },
        ]);
    });

    it('leave Tab unhandled outside a list', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('one'))]);

        expect(press(editor.view, 'Tab')).toBe(false);
    });
});
