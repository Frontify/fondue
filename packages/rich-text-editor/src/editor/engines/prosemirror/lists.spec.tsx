/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { NodeSelection } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { type RteBlockNode } from '#/core';

import { RAW_ATTR, UNKNOWN_BLOCK } from './documentConversion';
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

describe('a list holding a block no plugin knows among its items', () => {
    const checkItem = (...children: RteBlockNode[]): RteBlockNode =>
        ({
            type: 'checkItem',
            checked: false,
            children,
        }) as unknown as RteBlockNode;
    const unknown = (type: string): RteBlockNode =>
        ({
            type,
            tone: 'info',
            children: [paragraph(text('kept'))],
        }) as unknown as RteBlockNode;
    const press = (view: EditorView, key: string, init: KeyboardEventInit = {}): boolean =>
        view.someProp('handleKeyDown', (handle) => handle(view, new KeyboardEvent('keydown', { key, ...init }))) ===
        true;
    // Items on both sides of the unknown block, which stands among them.
    const around = (block: RteBlockNode): RteBlockNode =>
        list('bulletList', item(paragraph(text('one'))), block, item(paragraph(text('two'))));

    it.each([
        ['bullet', 'bulletList', item, 'unknownInBullets'],
        ['numbered', 'numberedList', item, 'unknownInNumbers'],
        ['check', 'checkList', checkItem, 'unknownInChecks'],
    ])('loads and saves a %s list with it unchanged, warning once', (_name, type, makeItem, unknownType) => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        const doc = list(
            type,
            makeItem(paragraph(text('one'))),
            unknown(unknownType),
            makeItem(paragraph(text('two'))),
        );
        const editor = editorWith(plugins, [paragraph(text('before')), doc]);
        editor.caretAfter('bef');
        editor.type('!');

        expect(editor.stored()).toEqual([paragraph(text('bef!ore')), doc]);
        expect(warn.mock.calls.filter(([message]) => String(message).includes(`"${unknownType}"`))).toHaveLength(1);
        warn.mockRestore();
    });

    it('keeps it when the list is converted to another type', () => {
        const block = unknown('unknownOnConvert');
        const editor = editorWith(plugins, [around(block)]);
        editor.caretAfter('tw');

        editor.api.lists.toggle('numberedList');

        expect(editor.stored()).toEqual([
            list('numberedList', item(paragraph(text('one'))), block, item(paragraph(text('two')))),
        ]);
    });

    it('keeps it when the list is converted to check items', () => {
        const block = unknown('unknownOnConvertToChecks');
        const editor = editorWith(plugins, [around(block)]);
        editor.caretAfter('on');

        editor.api.lists.toggle('checkList');

        expect(editor.stored()).toEqual([
            list('checkList', checkItem(paragraph(text('one'))), block, checkItem(paragraph(text('two')))),
        ]);
    });

    it('keeps it when the item beside it is taken out of the list', () => {
        const block = unknown('unknownOnToggleOff');
        const editor = editorWith(plugins, [around(block)]);
        editor.caretAfter('on');

        editor.api.lists.toggle('bulletList');

        expect(editor.stored()).toEqual([
            paragraph(text('one')),
            list('bulletList', block, item(paragraph(text('two')))),
        ]);
    });

    it('keeps it, as a block of its own, when every list is unwrapped', () => {
        const block = unknown('unknownOnUnwrap');
        const editor = editorWith(plugins, [around(block)]);
        editor.caretAfter('on');

        expect(editor.api.lists.unwrapAll()).toBe(true);

        expect(editor.stored()).toEqual([paragraph(text('one')), block, paragraph(text('two'))]);
    });

    it('keeps it when Enter splits the item beside it', () => {
        const block = unknown('unknownOnEnter');
        const editor = editorWith(plugins, [around(block)]);
        editor.caretAfter('on');

        expect(press(editor.view, 'Enter')).toBe(true);

        expect(editor.stored()).toEqual([
            list(
                'bulletList',
                item(paragraph(text('on'))),
                item(paragraph(text('e'))),
                block,
                item(paragraph(text('two'))),
            ),
        ]);
    });

    it('keeps it when the item before it is nested with Tab and lifted back with Shift-Tab', () => {
        const block = unknown('unknownOnTab');
        const editor = editorWith(plugins, [
            list('bulletList', item(paragraph(text('one'))), item(paragraph(text('two'))), block),
        ]);
        editor.caretAfter('tw');

        expect(press(editor.view, 'Tab')).toBe(true);
        expect(editor.stored()).toEqual([list('bulletList', item(paragraph(text('one')), bullets('two')), block)]);

        expect(press(editor.view, 'Tab', { shiftKey: true })).toBe(true);
        expect(editor.stored()).toEqual([
            list('bulletList', item(paragraph(text('one'))), item(paragraph(text('two'))), block),
        ]);
    });

    it('leaves the item after it where it is on Tab, with nothing to nest under', () => {
        const block = unknown('unknownOnTabAfter');
        const editor = editorWith(plugins, [around(block)]);
        editor.caretAfter('tw');

        expect(press(editor.view, 'Tab')).toBe(false);
        expect(editor.onDocChange).not.toHaveBeenCalled();
    });

    it('keeps it when Backspace takes the item after it out of the list', () => {
        const block = unknown('unknownOnBackspace');
        const editor = editorWith(plugins, [around(block)]);
        editor.caretBefore('two');

        expect(press(editor.view, 'Backspace')).toBe(true);

        expect(editor.stored()).toEqual([
            list('bulletList', item(paragraph(text('one'))), block),
            paragraph(text('two')),
        ]);
    });

    describe('selected as a node', () => {
        const layouts = [
            [
                'in the middle',
                (block: RteBlockNode) => [item(paragraph(text('one'))), block, item(paragraph(text('two')))],
            ],
            ['last', (block: RteBlockNode) => [item(paragraph(text('one'))), item(paragraph(text('two'))), block]],
        ] as const;
        const commands = [
            [
                'toggling the same list type',
                (editor: ReturnType<typeof editorWith>) => editor.api.lists.toggle('bulletList'),
            ],
            ['outdenting', (editor: ReturnType<typeof editorWith>) => editor.api.lists.outdent()],
        ] as const;

        /** The raw of every unknown block in the engine's document. */
        const unknownRaws = (view: EditorView): unknown[] => {
            const raws: unknown[] = [];
            view.state.doc.descendants((node) => {
                if (node.type.name === UNKNOWN_BLOCK) {
                    raws.push(node.attrs[RAW_ATTR]);
                }
            });
            return raws;
        };
        const selectUnknown = (view: EditorView): void => {
            let at = -1;
            view.state.doc.descendants((node, pos) => {
                if (node.type.name === UNKNOWN_BLOCK) {
                    at = pos;
                }
            });
            view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, at)));
        };

        describe.each(layouts)('%s', (_where, items) => {
            it.each(commands)('keeps it on %s', (_name, run) => {
                const block = unknown('unknownSelected');
                const editor = editorWith(plugins, [list('bulletList', ...items(block))]);
                selectUnknown(editor.view);

                run(editor);

                expect(unknownRaws(editor.view)).toEqual([block]);
            });
        });

        it('leaves a list that starts with it alone: lifting and nesting find no item range there', () => {
            const block = unknown('unknownSelectedFirst');
            const editor = editorWith(plugins, [list('bulletList', block, item(paragraph(text('one'))))]);
            selectUnknown(editor.view);

            expect(editor.api.lists.outdent()).toBe(false);
            expect(editor.api.lists.indent()).toBe(false);
            editor.api.lists.toggle('bulletList');

            expect(editor.onDocChange).not.toHaveBeenCalled();
            expect(unknownRaws(editor.view)).toEqual([block]);
        });
    });
});
