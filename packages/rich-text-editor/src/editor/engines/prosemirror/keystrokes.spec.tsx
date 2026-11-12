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
    type RteMarkPatternTrim,
    type RtePlugin,
} from '#/core';
import { defaultPlugins } from '#/plugins';

import { trimTrailingPunctuation } from './autolink';
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
                definePlugin({ id: 'first', hotkeys: { 'Alt-x': first } }),
                definePlugin({ id: 'second', hotkeys: { 'Alt-x': second } }),
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
                [definePlugin({ id: 'option', hotkeys: { [keys]: run } })],
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
            [definePlugin({ id: 'ctrl-alt', hotkeys: { 'Ctrl-Alt-x': run } })],
            [paragraph(text('a'))],
        );
        editor.caretAfter('a');

        expect(press(editor.view, 'x', { ctrlKey: true, altKey: true, modifierAltGraph: true })).toBe(false);

        expect(run).not.toHaveBeenCalled();
    });

    it('takes a key the list keys would otherwise claim', () => {
        const claim = vi.fn(() => true);
        const editor = editorWith(
            [...defaultPlugins, definePlugin({ id: 'claims-enter', hotkeys: { Enter: claim } })],
            [{ type: 'bulletList', children: [{ type: 'listItem', children: [paragraph(text('ab'))] }] }],
        );
        editor.caretAfter('a');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(claim).toHaveBeenCalledTimes(1);
        expect(editor.onDocChange).not.toHaveBeenCalled();
    });

    it('naming a character does not fire in the middle of a word', () => {
        const mention = vi.fn<(api: EditorControlApi) => void>();
        const editor = editorWith([definePlugin({ id: 'mention', hotkeys: { '@': mention } })], empty());

        editor.type('noah@frontify.com');

        expect(mention).not.toHaveBeenCalled();
        expect(editor.stored()).toEqual([paragraph(text('noah@frontify.com'))]);
    });

    it('naming a character fires on that character being typed, and the character is not inserted', () => {
        const mention = vi.fn<(api: EditorControlApi) => void>((api) => api.insertText('[mention]'));
        const editor = editorWith([definePlugin({ id: 'mention', hotkeys: { '@': mention } })], empty());

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
        const editor = editorWith([definePlugin({ id: 'mention', hotkeys: { '@': mention } })], empty());
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

const LINKABLE_ADDRESS_TRIM: RteMarkPatternTrim = {
    punctuation: /[.,;:!?"'”’]+/,
    pairs: { ')': '(', ']': '[', '}': '{', '>': '<' },
};

describe('trimming punctuation off a typed address', () => {
    it('strips closing quotes, brackets and stops one by one', () => {
        expect(trimTrailingPunctuation('https://a.com/x"),.', LINKABLE_ADDRESS_TRIM)).toBe('https://a.com/x');
        expect(trimTrailingPunctuation('https://a.com/Foo_(bar)).', LINKABLE_ADDRESS_TRIM)).toBe(
            'https://a.com/Foo_(bar)',
        );
    });

    it('finishes quickly on a long run of full stops', () => {
        const run = '.'.repeat(5000);
        const started = performance.now();

        expect(trimTrailingPunctuation(`https://a.com/x${run}a`, LINKABLE_ADDRESS_TRIM)).toBe(`https://a.com/x${run}a`);
        expect(trimTrailingPunctuation(`https://a.com/x${run}`, LINKABLE_ADDRESS_TRIM)).toBe('https://a.com/x');
        expect(performance.now() - started).toBeLessThan(1000);
    });
});
