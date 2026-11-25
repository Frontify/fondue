/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { undo } from 'prosemirror-history';
import { TextSelection } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
    ANY_LIST,
    defineBlock,
    defineContent,
    defineInline,
    defineMark,
    definePlugin,
    type EditorControlApi,
    PARAGRAPH,
    type RteBlockNode,
    type RtePlugin,
} from '#/core';
import { defaultPlugins } from '#/plugins';

import { trimTrailingPunctuation } from './autolink';
import { destroyEditors, editorWith, paragraph, shipped, text, TOKEN_TRIM } from './testEditor';

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

const press = (view: EditorView, key: string, init: KeyboardEventInit = {}): boolean => {
    const event = new KeyboardEvent('keydown', { key, ...init });
    // happy-dom answers `getModifierState('AltGraph')` with `altKey`; browsers answer with `modifierAltGraph`.
    const getModifierState = event.getModifierState.bind(event);
    event.getModifierState = (modifier) =>
        modifier === 'AltGraph' ? init.modifierAltGraph === true : getModifierState(modifier);
    return view.someProp('handleKeyDown', (handle) => handle(view, event)) === true;
};

const mod = /Mac|iP(hone|[oa]d)/.test(navigator.platform) ? { metaKey: true } : { ctrlKey: true };

afterEach(destroyEditors);
afterEach(() => vi.restoreAllMocks());

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

    it.each([
        ['foo__bar__', 'inside a word'],
        ['self.__dict__', 'after a full stop'],
        ['a__b__ c', 'glued to the word before it'],
    ])('leaves %s as typed, since a word-bounded rule needs room around its delimiters (%s)', (value) => {
        expect(typed(value)).toEqual([paragraph(text(value))]);
    });

    it.each([
        ['at the start of a line', '__text__', [text('text', { bold: true })]],
        ['after a space', 'a __text__', [text('a '), text('text', { bold: true })]],
        ['after an opening bracket', '(__text__', [text('('), text('text', { bold: true })]],
        ['after a quote', '"__x__', [text('"'), text('x', { bold: true })]],
    ])('turns __text__ bold %s', (_where, value, children) => {
        expect(typed(value)).toEqual([paragraph(...children)]);
    });

    it('leaves __text__ as typed when a word follows the closing delimiter', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('word'))]);
        editor.caretBefore('word');

        editor.type('__text__');

        expect(editor.stored()).toEqual([paragraph(text('__text__word'))]);
    });

    it('keeps the ** rule inside a word', () => {
        expect(typed('foo**bar**')).toEqual([paragraph(text('foo'), text('bar', { bold: true }))]);
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

    it('turns a fence of three backticks and a space into an empty code block', () => {
        expect(typed('``` ')).toEqual([{ type: 'codeBlock', children: [] }]);
    });

    it('does not read the backticks of that fence as inline code', () => {
        expect(typed('``` const a = 1;')).toEqual([{ type: 'codeBlock', children: [{ text: 'const a = 1;' }] }]);
    });
});

describe('typing in a code block', () => {
    it('keeps backticks and emphasis as typed', () => {
        expect(typed('``` `a` **b** *c*')).toEqual([{ type: 'codeBlock', children: [{ text: '`a` **b** *c*' }] }]);
    });

    it('starts a new line on Enter', () => {
        const editor = editorWith(defaultPlugins, [{ type: 'codeBlock', children: [{ text: 'ab' }] }]);
        editor.caretAfter('a');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(editor.stored()).toEqual([{ type: 'codeBlock', children: [{ text: 'a\nb' }] }]);
    });

    it('leaves the block for a new paragraph after it on Mod-Enter', () => {
        const editor = editorWith(defaultPlugins, [{ type: 'codeBlock', children: [{ text: 'ab' }] }]);
        editor.caretAfter('ab');

        expect(press(editor.view, 'Enter', mod)).toBe(true);

        expect(editor.stored()).toEqual([{ type: 'codeBlock', children: [{ text: 'ab' }] }, paragraph()]);
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

    it.each(['[x] ', '[X] '])('turns "%s" into a checked item', (prefix) => {
        expect(typed(`${prefix}task`)).toEqual([
            {
                type: 'checkList',
                children: [{ type: 'checkItem', checked: true, children: [paragraph(text('task'))] }],
            },
        ]);
    });

    it('turns "[~] " into an item in progress', () => {
        expect(typed('[~] task')).toEqual([
            {
                type: 'checkList',
                children: [{ type: 'checkItem', checked: 'inProgress', children: [paragraph(text('task'))] }],
            },
        ]);
    });

    it('stays plain text when no list is mounted', () => {
        expect(typed('- item', shipped('quote'))).toEqual([paragraph(text('- item'))]);
    });
});

describe('a check list shortcut inside a check list', () => {
    // `RteBlockNode` names no plugin attribute, so the item's `checked` needs the cast.
    const checkItem = (label: string): RteBlockNode =>
        ({ type: 'checkItem', checked: false, children: [paragraph(text(label))] }) as RteBlockNode;
    const twoItems = (): RteBlockNode[] => [{ type: 'checkList', children: [checkItem('one'), checkItem('two')] }];

    const withoutChecked = (key: string, value: unknown): unknown => {
        if (key === 'checked') {
            return undefined;
        }
        return value;
    };

    /** The document with `checked` left out, so `[x] ` and `[ ] ` can be compared on structure alone. */
    const shapeAfterTyping = (prefix: string, before: string): string => {
        const editor = editorWith(defaultPlugins, twoItems());
        editor.caretBefore(before);
        editor.type(prefix);
        return JSON.stringify(editor.stored(), withoutChecked);
    };

    it.each(['one', 'two'])('gives "[x] " and "[ ] " the same structure at the start of the item "%s"', (before) => {
        expect(shapeAfterTyping('[x] ', before)).toBe(shapeAfterTyping('[ ] ', before));
    });

    it.each([
        ['[x] ', true],
        ['[ ] ', false],
    ])('nests "%s" in the item it is typed in, checked: %s', (prefix, checked) => {
        const editor = editorWith(defaultPlugins, twoItems());
        editor.caretBefore('two');

        editor.type(prefix);

        expect(editor.stored()).toEqual([
            {
                type: 'checkList',
                children: [
                    checkItem('one'),
                    {
                        type: 'checkItem',
                        checked: false,
                        children: [
                            {
                                type: 'checkList',
                                children: [{ type: 'checkItem', checked, children: [paragraph(text('two'))] }],
                            },
                        ],
                    },
                ],
            },
        ]);
    });

    it('joins "[x] " typed below a check list into that list', () => {
        const editor = editorWith(defaultPlugins, [
            { type: 'checkList', children: [checkItem('one')] },
            paragraph(text('task')),
        ]);
        editor.caretBefore('task');

        editor.type('[x] ');

        expect(editor.stored()).toEqual([
            {
                type: 'checkList',
                children: [checkItem('one'), { type: 'checkItem', checked: true, children: [paragraph(text('task'))] }],
            },
        ]);
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

    it('can sit inside text a mark shortcut wraps', () => {
        expect(typed('**run `npm` now**')).toEqual([
            paragraph(
                text('run ', { bold: true }),
                text('npm', { bold: true, code: true }),
                text(' now', { bold: true }),
            ),
        ]);
    });

    it('lets a mark shortcut typed right after its end apply', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('foo', { code: true }))]);
        editor.caretAfter('foo');

        editor.type('**b**');

        expect(editor.stored()).toEqual([paragraph(text('foo', { code: true }), text('b', { bold: true }))]);
    });

    it('keeps its text when a typing rule after its end would reach into it', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('snake_case', { code: true }))]);
        editor.caretAfter('snake_case');

        editor.type('_');

        expect(editor.stored()).toEqual([paragraph(text('snake_case', { code: true }), text('_'))]);
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

    it('a stored run carrying both loses the one turned off', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('x', { subscript: true, superscript: true }))]);
        editor.select('x');

        editor.api.marks.toggle('subscript');

        expect(editor.stored()).toEqual([paragraph(text('x', { superscript: true }))]);
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

/** A mark that keeps typing rules and hotkeys on, unlike `verbatimPlugin`'s. */
const plainMarkPlugin = definePlugin({
    id: 'plain',
    content: defineContent({
        marks: {
            plain: defineMark({
                toHtml: () => ({ tag: 'u', children: true }),
                parse: [{ tag: 'u' }],
            }),
        },
    }),
});

const verbatimPlugin = definePlugin({
    id: 'verbatim',
    content: defineContent({
        marks: {
            verbatim: defineMark({
                excludesInputRules: true,
                inclusive: false,
                toHtml: () => ({ tag: 'kbd', children: true }),
                parse: [{ tag: 'kbd' }],
            }),
        },
    }),
    hotkeys: { 'Mod-q': { label: 'Verbatim', run: (api) => api.marks.toggle('verbatim') } },
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
                definePlugin({ id: 'first', hotkeys: { 'Alt-x': { label: 'First', run: first } } }),
                definePlugin({ id: 'second', hotkeys: { 'Alt-x': { label: 'Second', run: second } } }),
            ],
            [paragraph(text('a'))],
        );
        editor.caretAfter('a');

        expect(press(editor.view, 'x', { altKey: true })).toBe(true);

        expect(first).toHaveBeenCalledTimes(1);
        expect(second).toHaveBeenCalledTimes(1);
        expect(editor.stored()).toEqual([paragraph(text('a!'))]);
    });

    // Firefox on macOS reports Option as AltGraph, though a Mac has no AltGr key.
    for (const [keys, init] of [
        ['Meta-Alt-x', { metaKey: true, altKey: true }],
        ['Alt-x', { altKey: true }],
    ] as const) {
        it(`runs ${keys} on a Mac when Option reports AltGraph`, () => {
            vi.spyOn(navigator, 'platform', 'get').mockReturnValue('MacIntel');
            const run = vi.fn<(api: EditorControlApi) => void>((api) => api.insertText('!'));
            const editor = editorWith(
                [definePlugin({ id: 'option', hotkeys: { [keys]: { label: 'Option', run } } })],
                [paragraph(text('a'))],
            );
            editor.caretAfter('a');

            expect(press(editor.view, 'x', { ...init, modifierAltGraph: true })).toBe(true);

            expect(run).toHaveBeenCalledTimes(1);
        });
    }

    it('leaves Ctrl-Alt-x to AltGr off a Mac', () => {
        vi.spyOn(navigator, 'platform', 'get').mockReturnValue('Win32');
        const run = vi.fn();
        const editor = editorWith(
            [definePlugin({ id: 'ctrl-alt', hotkeys: { 'Ctrl-Alt-x': { label: 'Ctrl Alt', run } } })],
            [paragraph(text('a'))],
        );
        editor.caretAfter('a');

        expect(press(editor.view, 'x', { ctrlKey: true, altKey: true, modifierAltGraph: true })).toBe(false);

        expect(run).not.toHaveBeenCalled();
    });

    it('takes a key the list keys would otherwise claim', () => {
        const claim = vi.fn(() => true);
        const editor = editorWith(
            [
                ...defaultPlugins,
                definePlugin({ id: 'claims-enter', hotkeys: { Enter: { label: 'Claim Enter', run: claim } } }),
            ],
            [{ type: 'bulletList', children: [{ type: 'listItem', children: [paragraph(text('ab'))] }] }],
        );
        editor.caretAfter('a');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(claim).toHaveBeenCalledTimes(1);
        expect(editor.onDocChange).not.toHaveBeenCalled();
    });

    it('naming a character does not fire in the middle of a word', () => {
        const mention = vi.fn<(api: EditorControlApi) => void>();
        const editor = editorWith(
            [definePlugin({ id: 'mention', hotkeys: { '@': { label: 'Mention', run: mention } } })],
            empty(),
        );

        editor.type('noah@frontify.com');

        expect(mention).not.toHaveBeenCalled();
        expect(editor.stored()).toEqual([paragraph(text('noah@frontify.com'))]);
    });

    it('naming a character fires on that character being typed, and the character is not inserted', () => {
        const mention = vi.fn<(api: EditorControlApi) => void>((api) => api.insertText('[mention]'));
        const editor = editorWith(
            [definePlugin({ id: 'mention', hotkeys: { '@': { label: 'Mention', run: mention } } })],
            empty(),
        );

        editor.type('hi @');

        expect(mention).toHaveBeenCalledTimes(1);
        expect(editor.stored()).toEqual([paragraph(text('hi [mention]'))]);
    });

    it('naming a character is typed as it is inside a mark that opts out of rules, and fires outside it', () => {
        const trigger = vi.fn<(api: EditorControlApi) => void>();
        const editor = editorWith(
            [
                ...defaultPlugins,
                verbatimPlugin,
                definePlugin({ id: 'trigger', hotkeys: { '@': { label: 'Trigger', run: trigger } } }),
            ],
            [paragraph(text('a b', { verbatim: true }), text(' c'))],
        );

        editor.caretAfter('a ');
        editor.type('@');

        expect(trigger).not.toHaveBeenCalled();
        expect(editor.stored()).toEqual([paragraph(text('a @b', { verbatim: true }), text(' c'))]);

        editor.caretAfter(' c');
        editor.type(' @');

        expect(trigger).toHaveBeenCalledTimes(1);
    });

    it('naming a character still fires after a space in a mark that does not opt out of rules', () => {
        const trigger = vi.fn<(api: EditorControlApi) => void>();
        const editor = editorWith(
            [
                ...defaultPlugins,
                plainMarkPlugin,
                definePlugin({ id: 'trigger', hotkeys: { '@': { label: 'Trigger', run: trigger } } }),
            ],
            [paragraph(text('hi ', { plain: true }))],
        );

        editor.caretAfter('hi ');
        editor.type('@');

        expect(trigger).toHaveBeenCalledTimes(1);
    });

    it('naming a character does not fire at a caret where a mark that opts out of rules was just turned on', () => {
        const trigger = vi.fn<(api: EditorControlApi) => void>();
        const editor = editorWith(
            [
                ...defaultPlugins,
                verbatimPlugin,
                definePlugin({ id: 'trigger', hotkeys: { '@': { label: 'Trigger', run: trigger } } }),
            ],
            [paragraph(text('hi '))],
        );
        editor.caretAfter('hi ');

        expect(press(editor.view, 'q', mod)).toBe(true);
        editor.type('@');

        expect(trigger).not.toHaveBeenCalled();
        expect(editor.stored()).toEqual([paragraph(text('hi '), text('@', { verbatim: true }))]);
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

describe('typing rewrites when a composition ends', () => {
    const composition = (view: EditorView, type: 'compositionstart' | 'compositionend'): void => {
        view.dom.dispatchEvent(new CompositionEvent(type, { bubbles: true }));
    };

    /** A composition that leaves `text` at the caret. */
    const compose = (view: EditorView, text: string): void => {
        composition(view, 'compositionstart');
        view.dispatch(view.state.tr.insertText(text));
        composition(view, 'compositionend');
    };

    afterEach(() => vi.useRealTimers());

    it('rewrites the composed text even when the next composition starts at once', () => {
        vi.useFakeTimers();
        const editor = editorWith(defaultPlugins, empty());

        compose(editor.view, '**bold**');
        composition(editor.view, 'compositionstart');
        composition(editor.view, 'compositionend');
        vi.runAllTimers();

        expect(editor.stored()).toEqual([paragraph(text('bold', { bold: true }))]);
    });

    it('does nothing once the editor is gone', () => {
        vi.useFakeTimers();
        const editor = editorWith(defaultPlugins, empty());

        compose(editor.view, '**bold**');
        editor.view.destroy();

        expect(() => vi.runAllTimers()).not.toThrow();
    });
});

describe('a character hotkey during IME composition', () => {
    it('does not fire: the composition owns the character', () => {
        const mention = vi.fn<(api: EditorControlApi) => void>();
        const editor = editorWith(
            [definePlugin({ id: 'mention', hotkeys: { '@': { label: 'Mention', run: mention } } })],
            empty(),
        );
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

describe('trimming punctuation off a typed address', () => {
    it('strips closing quotes, brackets and stops one by one', () => {
        expect(trimTrailingPunctuation('https://a.com/x"),.', TOKEN_TRIM)).toBe('https://a.com/x');
        expect(trimTrailingPunctuation('https://a.com/Foo_(bar)).', TOKEN_TRIM)).toBe('https://a.com/Foo_(bar)');
    });

    it('finishes quickly on a long run of full stops', () => {
        const run = '.'.repeat(5000);
        const started = performance.now();

        expect(trimTrailingPunctuation(`https://a.com/x${run}a`, TOKEN_TRIM)).toBe(`https://a.com/x${run}a`);
        expect(trimTrailingPunctuation(`https://a.com/x${run}`, TOKEN_TRIM)).toBe('https://a.com/x');
        expect(performance.now() - started).toBeLessThan(1000);
    });
});

/** `dotList` and `stepList` share the item `row`; `taskList` items carry `done`, default false. */
const listsPlugin: RtePlugin = definePlugin({
    id: 'test-lists',
    content: defineContent({
        blocks: {
            dotList: defineBlock({
                content: { items: 'row' },
                toHtml: () => ({ tag: 'ul', children: true }),
                parse: [{ tag: 'ul' }],
            }),
            stepList: defineBlock({
                content: { items: 'row' },
                toHtml: () => ({ tag: 'ol', children: true }),
                parse: [{ tag: 'ol' }],
            }),
            row: defineBlock({
                content: { blocks: [PARAGRAPH, ANY_LIST] },
                toHtml: () => ({ tag: 'li', children: true }),
                parse: [{ tag: 'li' }],
            }),
            taskList: defineBlock({
                content: { items: 'task' },
                toHtml: () => ({ tag: 'ul', attrs: { 'data-tasks': '' }, children: true }),
                parse: [{ tag: 'ul[data-tasks]' }],
            }),
            task: defineBlock<{ done: boolean }>({
                content: { blocks: [PARAGRAPH, ANY_LIST] },
                defaults: { done: false },
                toHtml: ({ done }) => ({ tag: 'li', attrs: { 'data-done': String(done) }, children: true }),
                parse: [{ tag: 'li[data-done]' }],
            }),
        },
    }),
});

const toneAttributePlugin: RtePlugin = definePlugin({
    id: 'test-tone',
    content: defineContent({
        blockAttributes: {
            tone: { style: (value) => ({ color: value }) },
        },
    }),
});

const titlePlugin: RtePlugin = definePlugin({
    id: 'test-title',
    content: defineContent({
        blocks: {
            title: defineBlock({
                content: 'text',
                toHtml: () => ({ tag: 'h2', children: true }),
                parse: [{ tag: 'h2' }],
            }),
        },
    }),
    inputRules: [{ kind: 'block', match: '## ', block: 'title' }],
});

type TaskSpec = { done: boolean; text: string };

/** `done` sits flat on the item, which the open `RteBlockNode` cannot name. */
const taskList = (...tasks: TaskSpec[]) => ({
    type: 'taskList',
    children: tasks.map(({ done, text: value }) => ({ type: 'task', done, children: [paragraph(text(value))] })),
});

describe('Enter in a list whose items have a state', () => {
    const plugins = [listsPlugin];

    it('at the end of a done item adds one not done and keeps the first done', () => {
        const editor = editorWith(plugins, [taskList({ done: true, text: 'done' })]);
        editor.caretAfter('done');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(editor.stored()).toEqual([
            {
                type: 'taskList',
                children: [
                    { type: 'task', done: true, children: [paragraph(text('done'))] },
                    { type: 'task', done: false, children: [paragraph()] },
                ],
            },
        ]);
    });

    it('in a nested done item leaves the done item around it as it was', () => {
        const nestedItem = (done: boolean, ...children: unknown[]) => ({ type: 'task', done, children });
        const editor = editorWith(plugins, [
            {
                type: 'taskList',
                children: [nestedItem(true, paragraph(text('outer')), taskList({ done: true, text: 'inner' }))],
            },
        ]);
        editor.caretAfter('inner');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(editor.stored()).toEqual([
            {
                type: 'taskList',
                children: [
                    nestedItem(true, paragraph(text('outer')), {
                        type: 'taskList',
                        children: [nestedItem(true, paragraph(text('inner'))), nestedItem(false, paragraph())],
                    }),
                ],
            },
        ]);
    });

    it('in the middle of a done item leaves the second half not done', () => {
        const editor = editorWith(plugins, [taskList({ done: true, text: 'onetwo' })]);
        editor.caretAfter('one');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(editor.stored()).toEqual([taskList({ done: true, text: 'one' }, { done: false, text: 'two' })]);
    });

    it('at the very start of a done item puts one not done and empty above and keeps the text done', () => {
        const editor = editorWith(plugins, [taskList({ done: true, text: 'text' })]);
        editor.caretBefore('text');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(editor.stored()).toEqual([
            {
                type: 'taskList',
                children: [
                    { type: 'task', done: false, children: [paragraph()] },
                    { type: 'task', done: true, children: [paragraph(text('text'))] },
                ],
            },
        ]);
    });

    it('at the start of a later paragraph of a done item keeps the first item done', () => {
        const editor = editorWith(plugins, [
            {
                type: 'taskList',
                children: [{ type: 'task', done: true, children: [paragraph(text('a')), paragraph(text('b'))] }],
            },
        ]);
        editor.caretBefore('b');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(editor.stored()).toEqual([
            {
                type: 'taskList',
                children: [
                    { type: 'task', done: true, children: [paragraph(text('a')), paragraph()] },
                    { type: 'task', done: false, children: [paragraph(text('b'))] },
                ],
            },
        ]);
    });

    it('at the start of a paragraph after a nested list keeps the first item done', () => {
        const nested = { type: 'dotList', children: [{ type: 'row', children: [paragraph(text('n'))] }] };
        const editor = editorWith(plugins, [
            {
                type: 'taskList',
                children: [
                    { type: 'task', done: true, children: [paragraph(text('a')), nested, paragraph(text('t'))] },
                ],
            },
        ]);
        editor.caretBefore('t');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(editor.stored()).toEqual([
            {
                type: 'taskList',
                children: [
                    { type: 'task', done: true, children: [paragraph(text('a')), nested, paragraph()] },
                    { type: 'task', done: false, children: [paragraph(text('t'))] },
                ],
            },
        ]);
    });

    it('leaves a list whose items have no state as it was', () => {
        const editor = editorWith(plugins, [
            { type: 'dotList', children: [{ type: 'row', children: [paragraph(text('one'))] }] },
        ]);
        editor.caretAfter('one');

        press(editor.view, 'Enter');

        expect(editor.stored()).toEqual([
            {
                type: 'dotList',
                children: [
                    { type: 'row', children: [paragraph(text('one'))] },
                    { type: 'row', children: [paragraph()] },
                ],
            },
        ]);
    });
});

describe('Enter in a block with attributes every text block carries', () => {
    const plugins = [listsPlugin, titlePlugin, toneAttributePlugin];

    const toned = (value: string, extra: Record<string, unknown> = {}) => {
        const children = [];
        if (value !== '') {
            children.push(text(value));
        }
        return { type: 'paragraph', tone: 'warm', children, ...extra };
    };

    const title = (value: string, tone: string) => ({ type: 'title', tone, children: [text(value)] });

    it('at the end of a paragraph gives the new paragraph the same attribute', () => {
        const editor = editorWith(plugins, [toned('one')]);
        editor.caretAfter('one');

        press(editor.view, 'Enter');

        expect(editor.stored()).toEqual([toned('one'), toned('')]);
    });

    it('in the middle of a paragraph keeps the attribute on both halves', () => {
        const editor = editorWith(plugins, [toned('onetwo')]);
        editor.caretAfter('one');

        press(editor.view, 'Enter');

        expect(editor.stored()).toEqual([toned('one'), toned('two')]);
    });

    it('over a range across two blocks gives both halves the attribute of the block the text stays in', () => {
        const editor = editorWith(plugins, [
            { type: 'paragraph', tone: 'cool', children: [text('abc')] },
            { type: 'paragraph', tone: 'warm', children: [text('def')] },
        ]);
        editor.selectBetween('abc', 'd');

        press(editor.view, 'Enter');

        // `tone` is a plugin's block attribute, which RteBlockNode does not declare.
        expect(editor.stored()?.map((block) => (block as { tone?: string }).tone)).toEqual(['warm', 'warm']);
    });

    it('at the end of a title gives a paragraph with the attribute', () => {
        const editor = editorWith(plugins, [title('Title', 'cool')]);
        editor.caretAfter('Title');

        press(editor.view, 'Enter');

        expect(editor.stored()).toEqual([title('Title', 'cool'), { type: 'paragraph', tone: 'cool', children: [] }]);
    });

    it('in the middle of a title gives two titles with the same attribute', () => {
        const editor = editorWith(plugins, [title('TitleText', 'cool')]);
        editor.caretAfter('Title');

        press(editor.view, 'Enter');

        expect(editor.stored()).toEqual([title('Title', 'cool'), title('Text', 'cool')]);
    });

    it('at the start of a title gives the empty paragraph above the same attribute', () => {
        const editor = editorWith(plugins, [title('Title', 'cool')]);
        editor.caretBefore('Title');

        press(editor.view, 'Enter');

        expect(editor.stored()).toEqual([{ type: 'paragraph', tone: 'cool', children: [] }, title('Title', 'cool')]);
    });

    it('at the end of a list item gives the new item a paragraph with the attribute', () => {
        const editor = editorWith(plugins, [
            { type: 'dotList', children: [{ type: 'row', children: [toned('one')] }] },
        ]);
        editor.caretAfter('one');

        press(editor.view, 'Enter');

        expect(editor.stored()).toEqual([
            {
                type: 'dotList',
                children: [
                    { type: 'row', children: [toned('one')] },
                    { type: 'row', children: [toned('')] },
                ],
            },
        ]);
    });
});

describe('Enter on a block with stored keys no plugin declares', () => {
    const plugins = [listsPlugin, toneAttributePlugin];

    // `foo` is an undeclared stored key and `tone` a plugin's attribute, neither of which RteBlockNode names.
    const toned = (value: string) => ({ ...paragraph(text(value)), tone: 'warm', foo: 1 });

    it('leaves the block Enter opens after the text without them', () => {
        const editor = editorWith(plugins, [toned('ab')]);
        editor.caretAfter('b');

        press(editor.view, 'Enter');
        editor.type('c');

        expect(editor.stored()).toEqual([toned('ab'), { ...paragraph(text('c')), tone: 'warm' }]);
    });

    it('leaves the block Enter opens before the text without them', () => {
        const editor = editorWith(plugins, [toned('ab')]);
        editor.caretBefore('a');

        press(editor.view, 'Enter');

        expect(editor.stored()).toEqual([{ ...paragraph(), tone: 'warm' }, toned('ab')]);
    });

    it('leaves the item a list split makes without them', () => {
        const row = (value: string) => ({ type: 'row', foo: 2, children: [toned(value)] });
        const editor = editorWith(plugins, [{ type: 'dotList', children: [row('ab')] }]);
        editor.caretAfter('b');

        press(editor.view, 'Enter');
        editor.type('c');

        expect(editor.stored()).toEqual([
            {
                type: 'dotList',
                children: [row('ab'), { type: 'row', children: [{ ...paragraph(text('c')), tone: 'warm' }] }],
            },
        ]);
    });
});

describe('Backspace and Delete beside a list on an empty line', () => {
    const plugins = [listsPlugin];

    const list = (type: string, ...items: string[]) => ({
        type,
        children: items.map((value) => ({ type: 'row', children: [paragraph(text(value))] })),
    });

    const placeCaretOnEmptyLine = (view: EditorView): void => {
        let caret: number | null = null;
        view.state.doc.descendants((node, position) => {
            if (node.type.name === 'paragraph' && node.content.size === 0) {
                caret = position + 1;
            }
        });
        if (caret === null) {
            throw new Error('There is no empty line in the document');
        }
        view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, caret)));
    };

    const expectCaretAfter = (view: EditorView, value: string): void => {
        const { $from } = view.state.selection;
        expect($from.parent.textContent).toBe(value);
        expect($from.parentOffset).toBe(value.length);
    };

    it('Backspace deletes the empty line between two lists and joins them', () => {
        const editor = editorWith(plugins, [list('stepList', 'a', 'b'), paragraph(), list('stepList', 'c', 'd')]);
        placeCaretOnEmptyLine(editor.view);

        expect(press(editor.view, 'Backspace')).toBe(true);

        expect(editor.stored()).toEqual([list('stepList', 'a', 'b', 'c', 'd')]);
        expectCaretAfter(editor.view, 'b');
    });

    it('Delete at the end of the last item removes the empty line below and joins the lists', () => {
        const editor = editorWith(plugins, [list('stepList', 'a', 'b'), paragraph(), list('stepList', 'c', 'd')]);
        editor.caretAfter('b');

        expect(press(editor.view, 'Delete')).toBe(true);

        expect(editor.stored()).toEqual([list('stepList', 'a', 'b', 'c', 'd')]);
        expectCaretAfter(editor.view, 'b');
    });

    it('removes the empty line but keeps lists of different types apart', () => {
        const editor = editorWith(plugins, [list('dotList', 'a', 'b'), paragraph(), list('stepList', 'c', 'd')]);
        placeCaretOnEmptyLine(editor.view);

        expect(press(editor.view, 'Backspace')).toBe(true);

        expect(editor.stored()).toEqual([list('dotList', 'a', 'b'), list('stepList', 'c', 'd')]);
    });

    it('leaves an empty line after a plain paragraph to the baseline', () => {
        const editor = editorWith(plugins, [paragraph(text('a')), paragraph()]);
        placeCaretOnEmptyLine(editor.view);

        press(editor.view, 'Backspace');

        expect(editor.stored()).toEqual([paragraph(text('a'))]);
    });

    it('is one undo step', () => {
        const blocks = [list('stepList', 'a', 'b'), paragraph(), list('stepList', 'c', 'd')];
        const editor = editorWith(plugins, blocks);
        placeCaretOnEmptyLine(editor.view);
        press(editor.view, 'Backspace');

        undo(editor.view.state, editor.view.dispatch);

        expect(editor.stored()).toEqual(blocks);
    });
});
