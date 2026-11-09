/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { TextSelection } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
    defineContent,
    defineInline,
    definePlugin,
    type EditorControlApi,
    type RteBlockNode,
    type RtePlugin,
} from '#/core';
import { blurOnBreakPlugin, defaultPlugins } from '#/plugins';

import { trimTrailingPunctuation } from './keystrokes';
import { destroyEditors, editorWith, paragraph, shipped, text } from './testEditor';

/**
 * What typing and key presses do, through the pipeline `keystrokePipeline`
 * assembles: the typing rewrites, a feature's own keys, and the list keys.
 */

const empty = (): RteBlockNode[] => [paragraph()];

const typed = (value: string, plugins: readonly RtePlugin[] = defaultPlugins): RteBlockNode[] | null => {
    const editor = editorWith(plugins, empty());
    editor.type(value);
    return editor.stored();
};

const press = (view: EditorView, key: string, init: KeyboardEventInit = {}): boolean =>
    view.someProp('handleKeyDown', (handle) => handle(view, new KeyboardEvent('keydown', { key, ...init }))) === true;

const mod = /Mac|iP(hone|[oa]d)/.test(navigator.platform) ? { metaKey: true } : { ctrlKey: true };

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

    it('turns __text__ bold and _text_ italic', () => {
        expect(typed('__bold__ and _aside_')).toEqual([
            paragraph(text('bold', { bold: true }), text(' and '), text('aside', { italic: true })),
        ]);
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

describe('a mark that opts out of typing rules', () => {
    it('keeps the delimiters typed inside it — inline code keeps `**`', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('xy', { code: true }))]);
        editor.caretAfter('x');

        editor.type(' **c**');

        expect(editor.stored()).toEqual([paragraph(text('x **c**y', { code: true }))]);
    });
});

describe('inline code', () => {
    it('does not carry on into what is typed at its end', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('x', { code: true }))]);
        editor.caretAfter('x');

        editor.type('y');

        expect(editor.stored()).toEqual([paragraph(text('x', { code: true }), text('y'))]);
    });

    it('carries on at its end once Mod-e turns it back on', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('x', { code: true }))]);
        editor.caretAfter('x');

        expect(press(editor.view, 'e', mod)).toBe(true);
        editor.type('y');

        expect(editor.stored()).toEqual([paragraph(text('xy', { code: true }))]);
    });
});

describe('subscript and superscript', () => {
    it('turning one on over text takes the other off', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('x', { subscript: true }))]);
        editor.select('x');

        expect(press(editor.view, '.', mod)).toBe(true);
        expect(editor.stored()).toEqual([paragraph(text('x', { superscript: true }))]);

        editor.api.marks.toggle('subscript');
        expect(editor.stored()).toEqual([paragraph(text('x', { subscript: true }))]);
    });

    it('turning one on at a caret types only that one', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('x', { subscript: true }))]);
        editor.caretAfter('x');

        expect(press(editor.view, '.', mod)).toBe(true);
        editor.type('y');

        expect(editor.stored()).toEqual([paragraph(text('x', { subscript: true }), text('y', { superscript: true }))]);
    });
});

describe('undoing a typing rewrite', () => {
    it('takes a block rewrite back on Backspace, leaving what was typed', () => {
        const editor = editorWith(defaultPlugins, empty());
        editor.type('## ');

        expect(editor.stored()?.[0]?.type).toBe('textStyle');
        expect(press(editor.view, 'Backspace')).toBe(true);

        expect(editor.stored()).toEqual([paragraph(text('## '))]);
    });

    it('takes just the rewrite back on undo', () => {
        const editor = editorWith(defaultPlugins, empty());
        editor.type('## ');

        expect(press(editor.view, 'z', mod)).toBe(true);

        expect(editor.stored()).toEqual([paragraph(text('## '))]);
    });
});

describe('Backspace', () => {
    it('turns an emptied, centred heading back into a plain paragraph', () => {
        const editor = editorWith(defaultPlugins, [
            { type: 'textStyle', style: 'heading1', align: 'center', children: [] },
            paragraph(text('body')),
        ]);
        editor.view.dispatch(editor.view.state.tr.setSelection(TextSelection.create(editor.view.state.doc, 1)));

        expect(press(editor.view, 'Backspace')).toBe(true);

        expect(editor.stored()).toEqual([paragraph(), paragraph(text('body'))]);
    });

    it('keeps the undeclared keys of an emptied heading it turns back into a paragraph', () => {
        const editor = editorWith(defaultPlugins, [
            { type: 'textStyle', style: 'heading1', note: 'x', children: [] },
            paragraph(text('body')),
        ]);
        editor.view.dispatch(editor.view.state.tr.setSelection(TextSelection.create(editor.view.state.doc, 1)));

        expect(press(editor.view, 'Backspace')).toBe(true);

        expect(editor.stored()).toEqual([{ ...paragraph(), note: 'x' }, paragraph(text('body'))]);
    });

    it('turns an emptied heading at the top of the document back into a paragraph', () => {
        const editor = editorWith(defaultPlugins, [
            { type: 'textStyle', style: 'heading2', children: [] },
            paragraph(text('body')),
        ]);
        editor.view.dispatch(editor.view.state.tr.setSelection(TextSelection.create(editor.view.state.doc, 1)));

        expect(press(editor.view, 'Backspace')).toBe(true);

        expect(editor.stored()).toEqual([paragraph(), paragraph(text('body'))]);
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

    it('naming a character does not fire in the middle of a word', () => {
        const mention = vi.fn<(api: EditorControlApi) => void>();
        const editor = editorWith([{ id: 'mention', hotkeys: { '@': mention } }], empty());

        editor.type('noah@frontify.com');

        expect(mention).not.toHaveBeenCalled();
        expect(editor.stored()).toEqual([paragraph(text('noah@frontify.com'))]);
    });

    it('naming a character fires on that character being typed, and the character is not inserted', () => {
        const mention = vi.fn<(api: EditorControlApi) => void>((api) => api.insertText('[mention]'));
        const editor = editorWith([{ id: 'mention', hotkeys: { '@': mention } }], empty());

        editor.type('hi @');

        expect(mention).toHaveBeenCalledTimes(1);
        expect(editor.stored()).toEqual([paragraph(text('hi [mention]'))]);
    });

    it('naming a character is typed as it is inside inline code, and fires outside it', () => {
        const mention = vi.fn<(api: EditorControlApi) => void>();
        const editor = editorWith(
            [...defaultPlugins, { id: 'mention', hotkeys: { '@': mention } }],
            [paragraph(text('a b', { code: true }), text(' c'))],
        );

        editor.caretAfter('a ');
        editor.type('@');

        expect(mention).not.toHaveBeenCalled();
        expect(editor.stored()).toEqual([paragraph(text('a @b', { code: true }), text(' c'))]);

        editor.caretAfter(' c');
        editor.type(' @');

        expect(mention).toHaveBeenCalledTimes(1);
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

    it('take an item out of the list on Backspace at its start, rather than joining it into the one above', () => {
        const editor = inList();
        editor.caretBefore('two');

        expect(press(editor.view, 'Backspace')).toBe(true);

        expect(editor.stored()).toEqual([
            { type: 'bulletList', children: [{ type: 'listItem', children: [paragraph(text('one'))] }] },
            paragraph(text('two')),
        ]);
    });

    it('leave Backspace in the middle of an item to the browser', () => {
        const editor = inList();
        editor.caretAfter('tw');

        expect(press(editor.view, 'Backspace')).toBe(false);
        expect(editor.onDocChange).not.toHaveBeenCalled();
    });

    it('leave Tab unhandled outside a list', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('one'))]);

        expect(press(editor.view, 'Tab')).toBe(false);
    });
});

describe('a character hotkey during IME composition', () => {
    it('does not fire: the composition owns the character', () => {
        const mention = vi.fn<(api: EditorControlApi) => void>();
        const editor = editorWith([{ id: 'mention', hotkeys: { '@': mention } }], empty());
        vi.spyOn(editor.view, 'composing', 'get').mockReturnValue(true);

        editor.type('@');

        expect(mention).not.toHaveBeenCalled();
    });
});

describe('a mark shortcut around content that is more than plain text', () => {
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

    it('keeps an inline element inside it', () => {
        const editor = editorWith(
            [...defaultPlugins, tagPlugin],
            [paragraph(text('**a'), { type: 'tag', name: 'jane' }, text('b*'))],
        );
        editor.caretAfter('b*');

        editor.type('*');

        expect(editor.stored()).toEqual([
            paragraph(text('a', { bold: true }), { type: 'tag', name: 'jane' }, text('b', { bold: true })),
        ]);
    });

    it('keeps the marks the content already carries', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('**a'), text('it', { italic: true }), text('b*'))]);
        editor.caretAfter('b*');

        editor.type('*');

        expect(editor.stored()).toEqual([
            paragraph(text('a', { bold: true }), text('it', { bold: true, italic: true }), text('b', { bold: true })),
        ]);
    });
});

describe('a block shortcut on a block with attributes every text block carries', () => {
    it('keeps them', () => {
        const editor = editorWith(defaultPlugins, [{ type: 'paragraph', align: 'center', children: [] }]);

        editor.type('## Title');

        expect(editor.stored()).toEqual([
            { type: 'textStyle', style: 'heading2', align: 'center', children: [{ text: 'Title' }] },
        ]);
    });
});

describe('Enter in a list over a range across items', () => {
    it('is left to the baseline keymap rather than lifting both items out', () => {
        const editor = editorWith(defaultPlugins, [
            {
                type: 'bulletList',
                children: [
                    { type: 'listItem', children: [paragraph(text('one'))] },
                    { type: 'listItem', children: [paragraph(text('two'))] },
                ],
            },
        ]);
        editor.selectBetween('ne', 'tw');

        press(editor.view, 'Enter');

        expect(editor.stored()?.[0]?.type).toBe('bulletList');
    });
});

/** Presses Mod-z until there is nothing left to undo, and says how many presses took something back. */
const undoAllByKeyboard = (view: EditorView): number => {
    let presses = 0;
    while (press(view, 'z', mod)) {
        presses++;
    }
    return presses;
};

/** The `keyCode` is what the keymap reads to match a shifted letter. */
const modShift = (keyCode: number): KeyboardEventInit => ({ ...mod, shiftKey: true, keyCode });

describe('the alignment shortcuts', () => {
    const plain = (): RteBlockNode[] => [paragraph(text('one')), paragraph(text('two'))];

    it.each([
        ['l', 76, 'left'],
        ['e', 69, 'center'],
        ['r', 82, 'right'],
        ['j', 74, 'justify'],
    ])('Mod-Shift-%s aligns the block %s', (key, keyCode, align) => {
        const editor = editorWith(defaultPlugins, plain());
        editor.caretAfter('on');

        expect(press(editor.view, key.toUpperCase(), modShift(keyCode))).toBe(true);

        expect(editor.stored()).toEqual([
            { type: 'paragraph', align, children: [{ text: 'one' }] },
            paragraph(text('two')),
        ]);
    });

    it('clears the alignment it is pressed on again, as the button does', () => {
        const editor = editorWith(defaultPlugins, plain());
        editor.caretAfter('on');

        press(editor.view, 'E', modShift(69));
        press(editor.view, 'E', modShift(69));

        expect(editor.stored()).toEqual(plain());
    });

    it('announces the alignment, and that it was cleared when pressed again', () => {
        const announce = vi.fn<(message: string) => void>();
        const editor = editorWith(defaultPlugins, plain(), { announce });
        editor.caretAfter('on');

        press(editor.view, 'E', modShift(69));
        expect(announce).toHaveBeenLastCalledWith('Centered');
        press(editor.view, 'E', modShift(69));
        expect(announce).toHaveBeenLastCalledWith('Alignment cleared');
    });

    it('aligns every block a range touches', () => {
        const editor = editorWith(defaultPlugins, plain());
        editor.selectBetween('one', 'two');

        press(editor.view, 'R', modShift(82));

        expect(editor.stored()).toEqual([
            { type: 'paragraph', align: 'right', children: [{ text: 'one' }] },
            { type: 'paragraph', align: 'right', children: [{ text: 'two' }] },
        ]);
    });
});

describe('the reset formatting shortcut', () => {
    const tagPlugin = definePlugin({
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
    const plugins = [...defaultPlugins, tagPlugin];
    const LINK = { href: 'https://example.com' };
    const resetKeys = (view: EditorView): boolean => press(view, '\\', mod);

    // The block attributes sit flat on the node, which the open `RteBlockNode` cannot name.
    const formatted = (): RteBlockNode[] =>
        [
            {
                type: 'textStyle',
                style: 'heading2',
                align: 'center',
                children: [
                    text('big ', { bold: true }),
                    text('link', { link: LINK, italic: true }),
                    { type: 'tag', name: 'Ada' },
                ],
            },
            { type: 'textStyle', style: 'heading2', align: 'right', children: [text('next', { bold: true })] },
        ] as unknown as RteBlockNode[];

    it('puts the block the caret is in back to plain text, links and mentions kept, neighbours alone', () => {
        const editor = editorWith(plugins, formatted());
        editor.caretAfter('big');

        expect(resetKeys(editor.view)).toBe(true);

        expect(editor.stored()).toEqual([
            paragraph(text('big '), text('link', { link: LINK }), { type: 'tag', name: 'Ada' }),
            formatted()[1],
        ]);
    });

    it('announces the reset', () => {
        const announce = vi.fn<(message: string) => void>();
        const editor = editorWith(plugins, formatted(), { announce });
        editor.caretAfter('big');

        resetKeys(editor.view);

        expect(announce).toHaveBeenCalledWith('Formatting reset');
    });

    it('is one undo step, however many commands it takes', () => {
        const editor = editorWith(plugins, formatted());
        editor.caretAfter('big');

        resetKeys(editor.view);

        expect(undoAllByKeyboard(editor.view)).toBe(1);
        expect(editor.stored()).toEqual(formatted());
    });

    it('takes a list item out of its list and clears its marks, in one step', () => {
        const list = (): RteBlockNode[] => [
            {
                type: 'bulletList',
                children: [{ type: 'listItem', children: [paragraph(text('item', { bold: true }))] }],
            },
        ];
        const editor = editorWith(plugins, list());
        editor.caretAfter('it');

        resetKeys(editor.view);

        expect(editor.stored()).toEqual([paragraph(text('item'))]);
        expect(undoAllByKeyboard(editor.view)).toBe(1);
        expect(editor.stored()).toEqual(list());
    });
});

describe('the reset formatting shortcut in a list', () => {
    it('takes only the caret item out, leaving its neighbours in the list', () => {
        const item = (value: string): RteBlockNode => ({ type: 'listItem', children: [paragraph(text(value))] });
        const editor = editorWith(defaultPlugins, [
            { type: 'bulletList', children: [item('one'), item('two'), item('three')] },
        ]);
        editor.caretAfter('tw');

        press(editor.view, '\\', mod);

        expect(editor.stored()).toEqual([
            { type: 'bulletList', children: [item('one')] },
            paragraph(text('two')),
            { type: 'bulletList', children: [item('three')] },
        ]);
    });

    const item = (value: string): RteBlockNode => ({ type: 'listItem', children: [paragraph(text(value))] });

    it('unwraps a list the range reaches from a paragraph above it', () => {
        const editor = editorWith(defaultPlugins, [
            paragraph(text('intro')),
            { type: 'bulletList', children: [item('one')] },
        ]);
        editor.selectBetween('intro', 'one');

        press(editor.view, '\\', mod);

        expect(editor.stored()).toEqual([paragraph(text('intro')), paragraph(text('one'))]);
    });

    it('turns a heading and a list under a select-all into paragraphs', () => {
        const heading = {
            type: 'textStyle',
            style: 'heading2',
            children: [text('title')],
        } as unknown as RteBlockNode;
        const editor = editorWith(defaultPlugins, [heading, { type: 'bulletList', children: [item('one')] }]);
        editor.selectBetween('title', 'one');

        press(editor.view, '\\', mod);

        expect(editor.stored()).toEqual([paragraph(text('title')), paragraph(text('one'))]);
    });

    it('unwraps both lists of a range across two lists', () => {
        const editor = editorWith(defaultPlugins, [
            { type: 'bulletList', children: [item('one')] },
            { type: 'numberedList', children: [item('two')] },
        ]);
        editor.selectBetween('one', 'two');

        press(editor.view, '\\', mod);

        expect(editor.stored()).toEqual([paragraph(text('one')), paragraph(text('two'))]);
    });
});

describe('Enter in an editor with blurOnBreakPlugin', () => {
    const inList = (): RteBlockNode[] => [
        { type: 'bulletList', children: [{ type: 'listItem', children: [paragraph(text('item'))] }] },
    ];

    it('calls onBreak and then gives up focus, adding no paragraph', () => {
        const calls: string[] = [];
        const onBreak = vi.fn(() => calls.push('onBreak'));
        const editor = editorWith([blurOnBreakPlugin({ onBreak })], [paragraph(text('hi'))]);
        vi.spyOn(editor.view.dom, 'blur').mockImplementation(() => {
            calls.push('blur');
        });
        editor.caretAfter('hi');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(calls).toEqual(['onBreak', 'blur']);
        expect(editor.onDocChange).not.toHaveBeenCalled();
    });

    it('splits a list item instead, and does not call onBreak', () => {
        const onBreak = vi.fn();
        const editor = editorWith([...defaultPlugins, blurOnBreakPlugin({ onBreak })], inList());
        editor.caretAfter('it');

        press(editor.view, 'Enter');

        expect(onBreak).not.toHaveBeenCalled();
        expect(editor.stored()?.[0]).toMatchObject({ type: 'bulletList' });
        expect((editor.stored()?.[0] as { children: unknown[] }).children).toHaveLength(2);
    });

    it('refuses an empty editor when required, says why and keeps focus', () => {
        const onBreak = vi.fn();
        const announce = vi.fn<(message: string) => void>();
        const editor = editorWith([blurOnBreakPlugin({ onBreak, required: true })], empty(), { announce });
        const blur = vi.spyOn(editor.view.dom, 'blur');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(announce).toHaveBeenCalledWith('Type something before submitting.');
        expect(onBreak).not.toHaveBeenCalled();
        expect(blur).not.toHaveBeenCalled();
    });

    it('says the words the host gave when required is a string', () => {
        const announce = vi.fn<(message: string) => void>();
        const editor = editorWith([blurOnBreakPlugin({ required: 'Write a comment first.' })], empty(), { announce });

        press(editor.view, 'Enter');

        expect(announce).toHaveBeenCalledWith('Write a comment first.');
    });

    it('commits a required editor that has text', () => {
        const onBreak = vi.fn();
        const announce = vi.fn<(message: string) => void>();
        const editor = editorWith([blurOnBreakPlugin({ onBreak, required: true })], [paragraph(text('hi'))], {
            announce,
        });

        press(editor.view, 'Enter');

        expect(onBreak).toHaveBeenCalledTimes(1);
        expect(announce).not.toHaveBeenCalled();
    });

    it('leaves Shift-Enter to the soft break', () => {
        const onBreak = vi.fn();
        const editor = editorWith([...defaultPlugins, blurOnBreakPlugin({ onBreak })], [paragraph(text('ab'))]);
        editor.caretAfter('a');

        press(editor.view, 'Enter', { shiftKey: true });

        expect(onBreak).not.toHaveBeenCalled();
        expect(editor.stored()).toEqual([paragraph(text('a'), { type: 'break' }, text('b'))]);
    });
});

describe('trimming punctuation off a typed address', () => {
    it('strips closing quotes, brackets and stops one by one', () => {
        expect(trimTrailingPunctuation('https://a.com/x"),.')).toBe('https://a.com/x');
        expect(trimTrailingPunctuation('https://a.com/Foo_(bar)).')).toBe('https://a.com/Foo_(bar)');
    });

    it('finishes quickly on a long run of full stops', () => {
        const run = '.'.repeat(5000);
        const started = performance.now();

        expect(trimTrailingPunctuation(`https://a.com/x${run}a`)).toBe(`https://a.com/x${run}a`);
        expect(trimTrailingPunctuation(`https://a.com/x${run}`)).toBe('https://a.com/x');
        expect(performance.now() - started).toBeLessThan(1000);
    });
});
