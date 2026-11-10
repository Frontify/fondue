/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { TextSelection } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { defineInline, type EditorControlApi, type RteBlockNode, type RtePlugin } from '#/core';
import { defaultPlugins } from '#/plugins';

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
        const editor = editorWith(defaultPlugins, [paragraph(text('x', { code: true }))]);
        editor.caretAfter('x');

        editor.type(' **c**');

        expect(editor.stored()).toEqual([paragraph(text('x **c**', { code: true }))]);
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

        const mod = /Mac|iP(hone|[oa]d)/.test(navigator.platform) ? { metaKey: true } : { ctrlKey: true };
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

    // Firefox on macOS reports Option as AltGraph, though a Mac has no AltGr key.
    for (const [keys, init] of [
        ['Meta-Alt-x', { metaKey: true, altKey: true }],
        ['Alt-x', { altKey: true }],
    ] as const) {
        it(`runs ${keys} on a Mac when Option reports AltGraph`, () => {
            vi.spyOn(navigator, 'platform', 'get').mockReturnValue('MacIntel');
            const run = vi.fn<(api: EditorControlApi) => void>((api) => api.insertText('!'));
            const editor = editorWith([{ id: 'option', hotkeys: { [keys]: run } }], [paragraph(text('a'))]);
            editor.caretAfter('a');

            expect(press(editor.view, 'x', { ...init, modifierAltGraph: true })).toBe(true);

            expect(run).toHaveBeenCalledTimes(1);
        });
    }

    it('leaves Ctrl-Alt-x to AltGr off a Mac', () => {
        vi.spyOn(navigator, 'platform', 'get').mockReturnValue('Win32');
        const run = vi.fn();
        const editor = editorWith([{ id: 'ctrl-alt', hotkeys: { 'Ctrl-Alt-x': run } }], [paragraph(text('a'))]);
        editor.caretAfter('a');

        expect(press(editor.view, 'x', { ctrlKey: true, altKey: true, modifierAltGraph: true })).toBe(false);

        expect(run).not.toHaveBeenCalled();
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
        const editor = editorWith([{ id: 'mention', hotkeys: { '@': mention } }], empty());
        vi.spyOn(editor.view, 'composing', 'get').mockReturnValue(true);

        editor.type('@');

        expect(mention).not.toHaveBeenCalled();
    });
});

describe('a mark shortcut around content that is more than plain text', () => {
    const tagPlugin: RtePlugin = {
        id: 'tag',
        inlines: {
            tag: defineInline<{ name: string }>({
                toHtml: ({ name }) => ({ tag: 'span', children: name }),
                parse: [],
            }),
        },
    };

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

describe('Enter in a to-do list', () => {
    const checkList = (...items: { checked: boolean; text: string }[]): RteBlockNode => ({
        type: 'checkList',
        children: items.map(({ checked, text: value }) => ({
            type: 'checkItem',
            checked,
            children: [paragraph(text(value))],
        })),
    });

    it('at the end of a checked item adds an unchecked one and keeps the first checked', () => {
        const editor = editorWith(defaultPlugins, [checkList({ checked: true, text: 'done' })]);
        editor.caretAfter('done');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(editor.stored()).toEqual([
            {
                type: 'checkList',
                children: [
                    { type: 'checkItem', checked: true, children: [paragraph(text('done'))] },
                    { type: 'checkItem', checked: false, children: [paragraph()] },
                ],
            },
        ]);
    });

    it('in a nested checked item leaves the checked item around it as it was', () => {
        const nestedItem = (checked: boolean, ...children: RteBlockNode[]) => ({
            type: 'checkItem',
            checked,
            children,
        });
        const editor = editorWith(defaultPlugins, [
            {
                type: 'checkList',
                children: [
                    nestedItem(true, paragraph(text('outer')), checkList({ checked: true, text: 'inner' })),
                ],
            } as RteBlockNode,
        ]);
        editor.caretAfter('inner');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(editor.stored()).toEqual([
            {
                type: 'checkList',
                children: [
                    nestedItem(true, paragraph(text('outer')), {
                        type: 'checkList',
                        children: [nestedItem(true, paragraph(text('inner'))), nestedItem(false, paragraph())],
                    } as RteBlockNode),
                ],
            },
        ]);
    });

    it('in the middle of a checked item leaves the second half unchecked', () => {
        const editor = editorWith(defaultPlugins, [checkList({ checked: true, text: 'onetwo' })]);
        editor.caretAfter('one');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(editor.stored()).toEqual([checkList({ checked: true, text: 'one' }, { checked: false, text: 'two' })]);
    });

    it('at the very start of a checked item puts an unchecked empty item above and keeps the text checked', () => {
        const editor = editorWith(defaultPlugins, [checkList({ checked: true, text: 'text' })]);
        editor.caretBefore('text');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(editor.stored()).toEqual([
            {
                type: 'checkList',
                children: [
                    { type: 'checkItem', checked: false, children: [paragraph()] },
                    { type: 'checkItem', checked: true, children: [paragraph(text('text'))] },
                ],
            },
        ]);
    });

    it('at the start of a later paragraph of a checked item keeps the first item checked', () => {
        const editor = editorWith(defaultPlugins, [
            {
                type: 'checkList',
                children: [
                    { type: 'checkItem', checked: true, children: [paragraph(text('a')), paragraph(text('b'))] },
                ],
            },
        ]);
        editor.caretBefore('b');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(editor.stored()).toEqual([
            {
                type: 'checkList',
                children: [
                    { type: 'checkItem', checked: true, children: [paragraph(text('a')), paragraph()] },
                    { type: 'checkItem', checked: false, children: [paragraph(text('b'))] },
                ],
            },
        ]);
    });

    it('at the start of a paragraph after a nested list keeps the first item checked', () => {
        const nested = { type: 'bulletList', children: [{ type: 'listItem', children: [paragraph(text('n'))] }] };
        const editor = editorWith(defaultPlugins, [
            {
                type: 'checkList',
                children: [
                    {
                        type: 'checkItem',
                        checked: true,
                        children: [paragraph(text('a')), nested, paragraph(text('t'))],
                    },
                ],
            },
        ]);
        editor.caretBefore('t');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(editor.stored()).toEqual([
            {
                type: 'checkList',
                children: [
                    {
                        type: 'checkItem',
                        checked: true,
                        children: [paragraph(text('a')), nested, paragraph()],
                    },
                    { type: 'checkItem', checked: false, children: [paragraph(text('t'))] },
                ],
            },
        ]);
    });

    it('leaves a bullet list as it was', () => {
        const editor = editorWith(defaultPlugins, [
            { type: 'bulletList', children: [{ type: 'listItem', children: [paragraph(text('one'))] }] },
        ]);
        editor.caretAfter('one');

        press(editor.view, 'Enter');

        expect(editor.stored()).toEqual([
            {
                type: 'bulletList',
                children: [
                    { type: 'listItem', children: [paragraph(text('one'))] },
                    { type: 'listItem', children: [paragraph()] },
                ],
            },
        ]);
    });
});

describe('Enter in a block with attributes every text block carries', () => {
    const aligned = (value: string, extra: Record<string, unknown> = {}) => ({
        type: 'paragraph',
        align: 'center',
        children: value === '' ? [] : [text(value)],
        ...extra,
    });

    it('at the end of a paragraph gives the new paragraph the same alignment', () => {
        const editor = editorWith(defaultPlugins, [aligned('one')]);
        editor.caretAfter('one');

        press(editor.view, 'Enter');

        expect(editor.stored()).toEqual([aligned('one'), aligned('')]);
    });

    it('in the middle of a paragraph keeps the alignment on both halves', () => {
        const editor = editorWith(defaultPlugins, [aligned('onetwo')]);
        editor.caretAfter('one');

        press(editor.view, 'Enter');

        expect(editor.stored()).toEqual([aligned('one'), aligned('two')]);
    });

    it('over a range across two blocks gives both halves the alignment of the block the text stays in', () => {
        const editor = editorWith(defaultPlugins, [
            { type: 'paragraph', align: 'left', children: [text('abc')] },
            { type: 'paragraph', align: 'center', children: [text('def')] },
        ]);
        editor.selectBetween('abc', 'd');

        press(editor.view, 'Enter');

        expect(editor.stored()?.map((block) => (block as { align?: string }).align)).toEqual(['center', 'center']);
    });

    it('at the end of a heading gives an aligned paragraph', () => {
        const editor = editorWith(defaultPlugins, [
            { type: 'textStyle', style: 'heading2', align: 'right', children: [text('Title')] },
        ]);
        editor.caretAfter('Title');

        press(editor.view, 'Enter');

        expect(editor.stored()).toEqual([
            { type: 'textStyle', style: 'heading2', align: 'right', children: [text('Title')] },
            { type: 'paragraph', align: 'right', children: [] },
        ]);
    });

    it('in the middle of a heading gives two headings with the same alignment', () => {
        const heading = (value: string) => ({
            type: 'textStyle',
            style: 'heading2',
            align: 'right',
            children: [text(value)],
        });
        const editor = editorWith(defaultPlugins, [heading('TitleText')]);
        editor.caretAfter('Title');

        press(editor.view, 'Enter');

        expect(editor.stored()).toEqual([heading('Title'), heading('Text')]);
    });

    it('at the start of a heading gives the empty paragraph above the same alignment', () => {
        const editor = editorWith(defaultPlugins, [
            { type: 'textStyle', style: 'heading2', align: 'right', children: [text('Title')] },
        ]);
        editor.caretBefore('Title');

        press(editor.view, 'Enter');

        expect(editor.stored()).toEqual([
            { type: 'paragraph', align: 'right', children: [] },
            { type: 'textStyle', style: 'heading2', align: 'right', children: [text('Title')] },
        ]);
    });

    it('at the end of a list item gives the new item an aligned paragraph', () => {
        const editor = editorWith(defaultPlugins, [
            {
                type: 'bulletList',
                children: [{ type: 'listItem', children: [aligned('one')] }],
            },
        ]);
        editor.caretAfter('one');

        press(editor.view, 'Enter');

        expect(editor.stored()).toEqual([
            {
                type: 'bulletList',
                children: [
                    { type: 'listItem', children: [aligned('one')] },
                    { type: 'listItem', children: [aligned('')] },
                ],
            },
        ]);
    });
});
