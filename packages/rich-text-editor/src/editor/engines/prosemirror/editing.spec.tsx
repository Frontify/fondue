/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { redo, undo, undoDepth } from 'prosemirror-history';
import { Node as PmNode } from 'prosemirror-model';
import { NodeSelection, TextSelection } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
    buildPluginRegistry,
    defineInline,
    defineMark,
    emptyDocument,
    PARAGRAPH,
    type RteDocumentOf,
    type RtePlugin,
} from '#/core';

import { toEngineDocument } from './documentConversion';
import { type FrameScheduler, mountEditorForTests } from './editing';
import { type BlockInput, destroyEditors, editorWith, shipped } from './testEditor';

// Checked independently of the source: the character the spec expects for an inline atom in text.
const INLINE_ATOM_STAND_IN = '￼';

/**
 * The controlled-`value` protocol: a host hands back the document it was given,
 * and what happens then decides whether the editor is usable at all.
 */
const plugins: RtePlugin[] = [
    {
        id: 'tag',
        inlines: {
            tag: defineInline<{ name: string }>({
                toHtml: ({ name }) => ({ tag: 'span', children: name }),
                parse: [],
            }),
        },
    },
    {
        id: 'bold',
        marks: {
            bold: defineMark({
                toHtml: () => ({ tag: 'strong', children: true }),
                parse: [{ tag: 'strong' }],
            }),
        },
    },
];

const paragraph = (text: string): RteDocumentOf => ({
    version: 1,
    blocks: [{ type: PARAGRAPH, children: [{ text }] }],
});

const mounted: { destroy(): void }[] = [];

type MountTestOptions = { placeholder?: string; attributes?: Record<string, string>; frames?: FrameScheduler };

const mount = (initialDoc: RteDocumentOf, { placeholder = '', attributes = {}, frames }: MountTestOptions = {}) => {
    const container = window.document.createElement('div');
    window.document.body.append(container);
    const onDocChange = vi.fn<(doc: RteDocumentOf) => void>();

    const { mounted: live, view } = mountEditorForTests(
        {
            container,
            initialDoc,
            registry: buildPluginRegistry(plugins),
            placeholder,
            attributes,
            placeholderClassName: 'placeholder',
            onDocChange,
            onStateChange: () => {},
            viewPortals: { set: () => {}, delete: () => {} },
        },
        frames,
    );
    mounted.push(live);
    const handle = { ...live.handle, setDoc: live.setDoc };

    const stored = (): RteDocumentOf | null => {
        const { calls } = onDocChange.mock;
        return calls.length === 0 ? null : (calls[calls.length - 1]?.[0] ?? null);
    };
    return { handle, onDocChange, stored, live, view, container };
};

afterEach(() => {
    for (const live of mounted.splice(0)) {
        live.destroy();
    }
    destroyEditors();
    window.document.body.replaceChildren();
});

describe('a document set by the host', () => {
    it('is not reported back to the host', () => {
        const { handle, onDocChange } = mount(emptyDocument());

        handle.setDoc(paragraph('from the host'));

        expect(onDocChange).not.toHaveBeenCalled();
    });

    it('is ignored when it says the same as what is already there', () => {
        const doc = paragraph('settled');
        const { handle, onDocChange } = mount(doc);

        handle.setDoc(structuredClone(doc));

        expect(onDocChange).not.toHaveBeenCalled();
    });

    it('is ignored when the host hands back exactly what the editor reported', () => {
        const { handle, onDocChange, stored } = mount(emptyDocument());
        handle.api.insertText('typed');
        expect(onDocChange).toHaveBeenCalledTimes(1);

        const held = stored();
        onDocChange.mockClear();
        handle.setDoc(held as RteDocumentOf);
        handle.setDoc(structuredClone(held) as RteDocumentOf);

        expect(onDocChange).not.toHaveBeenCalled();
    });

    describe('that changes one block', () => {
        const paragraphs = (...texts: string[]): RteDocumentOf => ({
            version: 1,
            blocks: texts.map((text) => ({ type: PARAGRAPH, children: [{ text }] })),
        });
        /** The caret as the block it is in and its offset there. */
        const caretAt = (view: EditorView) => ({
            block: view.state.selection.$from.parent.textContent,
            offset: view.state.selection.$from.parentOffset,
        });
        const placeCaret = (view: EditorView, position: number) => {
            view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, position)));
        };

        it('keeps the caret in its text when the block before it changes', () => {
            const { handle, view } = mount(paragraphs('one', 'two'));
            placeCaret(view, 8);

            handle.setDoc(paragraphs('ONE!', 'two'));

            expect(view.state.doc.textContent).toBe('ONE!two');
            expect(caretAt(view)).toEqual({ block: 'two', offset: 2 });
        });

        it('leaves the caret where it is when a block after it changes', () => {
            const { handle, view } = mount(paragraphs('one', 'two'));
            placeCaret(view, 3);

            handle.setDoc(paragraphs('one', 'TWO!'));

            expect(view.state.doc.textContent).toBe('oneTWO!');
            expect(view.state.selection.from).toBe(3);
        });

        it('shifts the caret by what was inserted before it in its own block', () => {
            const { handle, view } = mount(paragraphs('abcdef'));
            placeCaret(view, 5);

            handle.setDoc(paragraphs('XYabcdef'));

            expect(caretAt(view)).toEqual({ block: 'XYabcdef', offset: 6 });
        });

        it('never leaves the caret inside a character the change ends in', () => {
            const changes: [string, string][] = [
                ['xyb́', 'zć'],
                ['hi \u{1F469}‍\u{1F467}', 'yo \u{1F468}‍\u{1F467}'],
            ];
            for (const [before, after] of changes) {
                const { handle, view } = mount(paragraphs(before));
                placeCaret(view, 2);

                handle.setDoc(paragraphs(after));

                expect(view.state.doc.textContent).toBe(after);
                expect(caretAt(view)).toEqual({ block: after, offset: after.length });
            }
        });

        it('counts an inline element as one character when keeping the caret out of one', () => {
            const withTag = (text: string): RteDocumentOf => ({
                version: 1,
                blocks: [{ type: PARAGRAPH, children: [{ text: 'x' }, { type: 'tag', name: 't' }, { text }] }],
            });
            const { handle, view } = mount(withTag('yb́'));
            placeCaret(view, 4);

            handle.setDoc(withTag('zć'));

            expect(view.state.selection.$from.parentOffset).toBe(5);
        });

        it('keeps an inline element selected when the host changes only its value', () => {
            const withTag = (name: string): RteDocumentOf => ({
                version: 1,
                blocks: [{ type: PARAGRAPH, children: [{ text: 'a' }, { type: 'tag', name }, { text: 'b' }] }],
            });
            const { handle, view } = mount(withTag('t'));
            view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, 2)));

            handle.setDoc(withTag('u'));

            const { selection } = view.state;
            expect(selection instanceof NodeSelection && selection.node.attrs.value).toEqual({ name: 'u' });
        });

        it('applies a change that turns an inline element into text', () => {
            const { handle, view } = mount({
                version: 1,
                blocks: [{ type: PARAGRAPH, children: [{ text: 'a' }, { type: 'tag', name: 't' }, { text: 'b' }] }],
            });

            handle.setDoc(paragraphs('ab'));

            expect(view.state.doc.eq(toEngineDocument(paragraphs('ab'), view.state.schema))).toBe(true);
        });

        it('still applies a change that repeats its neighbours', () => {
            const { handle, view } = mount(paragraphs('aa'));

            handle.setDoc(paragraphs('aaa'));

            expect(view.state.doc.textContent).toBe('aaa');
        });
    });

    describe('with keys on the document itself that no plugin declares', () => {
        const withMeta = (meta?: string): RteDocumentOf =>
            ({ ...paragraph('same'), ...(meta === undefined ? {} : { meta }) }) as RteDocumentOf;

        it('takes the new ones from the host, and reports them with the next edit', () => {
            const { handle, onDocChange, stored } = mount(withMeta('a'));

            handle.setDoc(withMeta('b'));

            expect(onDocChange).not.toHaveBeenCalled();
            expect(handle.document()).toEqual(withMeta('b'));
            handle.api.insertText('!');
            expect(stored()).toMatchObject({ meta: 'b' });
        });

        it('drops the ones the host no longer has', () => {
            const { handle } = mount(withMeta('a'));

            handle.setDoc(withMeta());

            expect(handle.document()).toStrictEqual(paragraph('same'));
        });

        it('leaves the caret where it was when only they changed', () => {
            const { handle, view } = mount(withMeta('a'));
            view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, 2)));

            handle.setDoc(withMeta('b'));

            expect(view.state.selection.from).toBe(2);
        });

        it('redraws nothing when only they changed', () => {
            const { handle, view } = mount(withMeta('a'));
            const { state } = view;
            const drawn = view.dom.firstChild;

            handle.setDoc(withMeta('b'));

            expect(view.state).toBe(state);
            expect(view.dom.firstChild).toBe(drawn);
        });

        it('takes them along with new content', () => {
            const { handle } = mount(withMeta('a'));

            handle.setDoc({ ...paragraph('other'), meta: 'b' } as RteDocumentOf);

            expect(handle.document()).toEqual({ ...paragraph('other'), meta: 'b' });
        });
    });

    it('still reports the edits the user makes after it', () => {
        const { handle, stored } = mount(emptyDocument());

        handle.setDoc(paragraph('host'));
        handle.api.insertText('!');

        expect(stored()).toEqual(paragraph('host!'));
    });

    it('is not undone by the user undoing their own edits', () => {
        const { handle, view, stored } = mount(paragraph('mine'));
        handle.api.insertText('typed ');

        handle.setDoc(paragraph('from the host'));
        undo(view.state, view.dispatch);

        expect(view.state.doc.textContent).toBe('from the host');
        expect(stored()).toEqual(paragraph('typed mine'));
    });

    it('leaves nothing to undo when it replaces the text the user typed', () => {
        const { handle, view } = mount(emptyDocument());
        handle.api.insertText('hi');

        handle.setDoc(paragraph('from the host'));

        expect(undoDepth(view.state)).toBe(0);
        expect(undo(view.state, view.dispatch)).toBe(false);
        expect(view.state.doc.textContent).toBe('from the host');
    });

    it('keeps a bold the host set when the user undoes the bold they set on the same text', () => {
        const { handle, view } = mount(paragraph('hello world'));
        const bold = view.state.schema.marks.bold;
        if (!bold) {
            throw new Error('no bold mark');
        }
        view.dispatch(view.state.tr.addMark(7, 12, bold.create()));
        const fromHost: RteDocumentOf = {
            version: 1,
            blocks: [{ type: PARAGRAPH, children: [{ text: 'hello ' }, { text: 'WORld', bold: true }] }],
        };

        handle.setDoc(fromHost);
        undo(view.state, view.dispatch);

        expect(handle.document()).toEqual(fromHost);
    });

    it('keeps undo for typing the host only inserted text next to, then changed that text again', () => {
        const { handle, view } = mount(paragraph('ab'));
        view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, 3)));
        handle.api.insertText('X');

        handle.setDoc(paragraph('abXY'));
        handle.setDoc(paragraph('abXZ'));
        undo(view.state, view.dispatch);

        expect(view.state.doc.textContent).toBe('abZ');
    });

    it('leaves the host change in place when the user undoes an edit in another block', () => {
        const { handle, view } = mount({
            version: 1,
            blocks: [
                { type: PARAGRAPH, children: [{ text: 'one' }] },
                { type: PARAGRAPH, children: [{ text: 'two' }] },
            ],
        });
        view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, 4)));
        handle.api.insertText('X');

        handle.setDoc({
            version: 1,
            blocks: [
                { type: PARAGRAPH, children: [{ text: 'oneX' }] },
                { type: PARAGRAPH, children: [{ text: 'TWO' }] },
            ],
        });
        undo(view.state, view.dispatch);

        expect(view.state.doc.child(0).textContent).toBe('one');
        expect(view.state.doc.child(1).textContent).toBe('TWO');
    });

    it('applies a reset to a document the editor reported before, and edits that after', () => {
        const { handle, view, stored } = mount(emptyDocument());
        handle.api.insertText('a');
        const docA = stored() as RteDocumentOf;
        handle.api.insertText('b');
        const docB = stored() as RteDocumentOf;

        handle.setDoc(docB);
        handle.setDoc(docA);
        expect(view.state.doc.textContent).toBe('a');
        handle.api.insertText('c');

        expect(stored()).toEqual(paragraph('ac'));
    });

    it('applies a document the editor reported before when the host restores it after its own reset', () => {
        const { handle, view, stored } = mount(emptyDocument());
        handle.api.insertText('a');
        const docA = stored() as RteDocumentOf;
        handle.setDoc(docA);
        handle.api.insertText('b');
        const docB = stored() as RteDocumentOf;

        handle.setDoc(paragraph('from the host'));
        handle.setDoc(docB);

        expect(view.state.doc.textContent).toBe('ab');
    });

    it('applies an earlier reported document after the host hands back a copy of the latest', () => {
        const { handle, view, stored } = mount(emptyDocument());
        handle.api.insertText('a');
        const docA = stored() as RteDocumentOf;
        handle.api.insertText('b');

        handle.setDoc(structuredClone(stored()) as RteDocumentOf);
        handle.setDoc(docA);

        expect(view.state.doc.textContent).toBe('a');
    });

    it('treats what the editor reports after a reset as newer than it', () => {
        const { handle, view, stored } = mount(emptyDocument());
        handle.api.insertText('a');
        const docA = stored() as RteDocumentOf;
        handle.api.insertText('b');
        handle.setDoc(stored() as RteDocumentOf);
        handle.setDoc(docA);
        handle.api.insertText('c');
        const docC = stored() as RteDocumentOf;
        handle.api.insertText('d');

        handle.setDoc(docC);

        expect(view.state.doc.textContent).toBe('acd');
    });
});

describe('a document set by the host that changes the blocks around the caret', () => {
    // A block with flat plugin attributes is outside the typed document, so the cast is only a test-side widening.
    const blocksOf = (...blocks: BlockInput[]): RteDocumentOf => ({ version: 1, blocks }) as unknown as RteDocumentOf;
    const text = (value: string): BlockInput => ({ type: PARAGRAPH, children: [{ text: value }] });
    const caretAt = (view: EditorView) => ({
        block: view.state.selection.$from.parent.textContent,
        offset: view.state.selection.$from.parentOffset,
    });
    const caretIn = (view: EditorView, needle: string, offset: number) => {
        let position = -1;
        view.state.doc.descendants((node, at) => {
            if (node.isTextblock && node.textContent === needle) {
                position = at + 1 + offset;
            }
            return position === -1;
        });
        view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, position)));
    };

    it('keeps the caret in its block when the host only restyles it', () => {
        const { view, editor } = editorWith(shipped('text-style'), [text('one'), text('two')]);
        caretIn(view, 'one', 2);

        editor.setDoc(blocksOf({ type: 'textStyle', style: 'heading1', children: [{ text: 'one' }] }, text('two')));

        expect(view.state.doc.child(0).type.name).toBe('textStyle');
        expect(caretAt(view)).toEqual({ block: 'one', offset: 2 });
    });

    it('keeps the caret in its block when the host inserts a block with the same text before it', () => {
        const heading: BlockInput = { type: 'textStyle', style: 'heading1', children: [{ text: 'T' }] };
        const { view, editor } = editorWith(shipped('text-style'), [heading, text('x')]);
        caretIn(view, 'T', 1);

        editor.setDoc(blocksOf(text('T'), heading, text('x')));

        expect(view.state.selection.$from.index(0)).toBe(1);
        expect(view.state.selection.$from.parent.type.name).toBe('textStyle');
    });

    it('leaves the caret and undo in a block between two the host changes', () => {
        const { view, editor } = editorWith([], [text('a'), text('b'), text('c')]);
        caretIn(view, 'b', 1);
        view.dispatch(view.state.tr.insertText('X'));

        editor.setDoc(blocksOf(text('A'), text('bX'), text('C')));

        expect(caretAt(view)).toEqual({ block: 'bX', offset: 2 });
        undo(view.state, view.dispatch);
        expect(view.state.doc.textContent).toBe('AbC');
    });

    it('leaves the caret alone in a long document when the host inserts a block far from it', () => {
        const texts = Array.from({ length: 600 }, (_, index) => `block ${index}`);
        const { view, editor } = editorWith([], texts.map(text));
        caretIn(view, 'block 599', 1);

        editor.setDoc(blocksOf(...texts.slice(0, 300).map(text), text('new'), ...texts.slice(300).map(text)));

        expect(view.state.doc.childCount).toBe(601);
        expect(caretAt(view)).toEqual({ block: 'block 599', offset: 1 });
    });

    it('leaves the caret and undo alone mid-document when the host changes both ends of a long one', () => {
        const texts = Array.from({ length: 600 }, (_, index) => `block ${index}`);
        const { view, editor } = editorWith([], texts.map(text));
        caretIn(view, 'block 300', 1);
        view.dispatch(view.state.tr.insertText('X'));

        editor.setDoc(
            blocksOf(
                text('new'),
                ...texts.slice(0, 300).map(text),
                text('bXlock 300'),
                ...texts.slice(301, 599).map(text),
                text('last'),
            ),
        );

        expect(caretAt(view)).toEqual({ block: 'bXlock 300', offset: 2 });
        undo(view.state, view.dispatch);
        expect(view.state.doc.child(301).textContent).toBe('block 300');
    });

    it('keeps the caret in its block when the host changes every block of a long document, in a few steps', () => {
        const texts = Array.from({ length: 600 }, (_, index) => `block ${index}`);
        const { view, editor } = editorWith([], texts.map(text));
        caretIn(view, 'block 300', 3);
        const dispatch = vi.spyOn(view, 'dispatch');

        editor.setDoc(blocksOf(...texts.map((value) => text(value.toUpperCase()))));

        expect(view.state.doc.child(599).textContent).toBe('BLOCK 599');
        expect(caretAt(view)).toEqual({ block: 'BLOCK 300', offset: 5 });
        expect(dispatch.mock.calls[0]?.[0].steps.length).toBeLessThanOrEqual(3);
    });

    it('replaces a long document with a longer one without comparing every block with every other', () => {
        const { view, editor } = editorWith(
            [],
            Array.from({ length: 600 }, (_, index) => text(`old ${index}`)),
        );
        const compare = vi.spyOn(PmNode.prototype, 'eq');

        editor.setDoc(blocksOf(...Array.from({ length: 601 }, (_, index) => text(`new ${index}`))));

        const compared = compare.mock.calls.length;
        compare.mockRestore();

        expect(view.state.doc.childCount).toBe(601);
        expect(compared).toBeLessThan(50_000);
    });

    it('keeps a host restyle when the user undoes their own change to the same block', () => {
        const { view, editor, api } = editorWith(shipped('text-style', 'align'), [text('one'), text('two')]);
        caretIn(view, 'one', 1);
        api.blocks.updateAttributes({ align: 'center' });

        editor.setDoc(
            blocksOf(
                { type: 'textStyle', style: 'heading1', align: 'center', children: [{ text: 'one' }] },
                text('two'),
            ),
        );
        undo(view.state, view.dispatch);

        expect(view.state.doc.child(0).type.name).toBe('textStyle');
    });

    it('undoes only the attribute the user changed when the host changed another on the same block', () => {
        const heading = (style: string, align?: string): BlockInput => {
            const block: BlockInput = { type: 'textStyle', style, children: [{ text: 'one' }] };
            if (align !== undefined) {
                block.align = align;
            }
            return block;
        };
        const { view, editor, api } = editorWith(shipped('text-style', 'align'), [heading('heading1')]);
        caretIn(view, 'one', 1);
        api.blocks.updateAttributes({ align: 'center' });

        editor.setDoc(blocksOf(heading('heading2', 'center')));
        undo(view.state, view.dispatch);

        expect(view.state.doc.child(0).attrs.style).toBe('heading2');
        expect(view.state.doc.child(0).attrs.align ?? null).toBeNull();
    });

    it('keeps the alignment the host set when the user undoes the alignment they set on the same block', () => {
        const heading = (align?: string): BlockInput => {
            const block: BlockInput = { type: 'textStyle', style: 'heading1', children: [{ text: 'one' }] };
            if (align !== undefined) {
                block.align = align;
            }
            return block;
        };
        const { view, editor, api } = editorWith(shipped('text-style', 'align'), [heading()]);
        caretIn(view, 'one', 1);
        api.blocks.updateAttributes({ align: 'center' });

        editor.setDoc(blocksOf(heading('right')));
        undo(view.state, view.dispatch);

        expect(view.state.doc.child(0).attrs.align).toBe('right');
    });

    it('keeps the caret in a to-do the host ticks', () => {
        const todo = (checked: boolean): BlockInput => ({
            type: 'checkList',
            children: [{ type: 'checkItem', checked, children: [text('task')] }],
        });
        const { view, editor } = editorWith(shipped('check-list'), [todo(false), text('after')]);
        caretIn(view, 'task', 2);

        editor.setDoc(blocksOf(todo(true), text('after')));

        expect(view.state.doc.child(0).child(0).attrs.checked).toBe(true);
        expect(caretAt(view)).toEqual({ block: 'task', offset: 2 });
    });

    it('keeps the caret in its list item when the host removes an item before it', () => {
        const list = (...items: string[]): BlockInput => ({
            type: 'bulletList',
            children: items.map((item) => ({ type: 'listItem', children: [text(item)] })),
        });
        const { view, editor } = editorWith(shipped('bullet-list'), [list('a', 'b', 'c')]);
        caretIn(view, 'c', 1);

        editor.setDoc(blocksOf(list('b', 'c')));

        expect(caretAt(view)).toEqual({ block: 'c', offset: 1 });
    });
});

describe('a document set by the host while text is being composed', () => {
    const composing = (view: EditorView, value: boolean): void => {
        let phase = 'compositionend';
        if (value) {
            phase = 'compositionstart';
        }
        view.dom.dispatchEvent(new CompositionEvent(phase, { bubbles: true }));
    };
    /** Frames the spec runs by hand, so a held document is retried exactly when the spec says. */
    const manualFrames = () => {
        const callbacks = new Map<number, () => void>();
        let last = 0;
        const scheduler: FrameScheduler = {
            request: (callback) => {
                last += 1;
                callbacks.set(last, callback);
                return last;
            },
            cancel: (frame) => {
                callbacks.delete(frame);
            },
        };
        const runFrame = (): void => {
            const due = [...callbacks.values()];
            callbacks.clear();
            for (const callback of due) {
                callback();
            }
        };
        return { scheduler, runFrame, pending: () => callbacks.size };
    };

    it('waits for the composition to end, then applies the latest one', () => {
        const frames = manualFrames();
        const { handle, view } = mount(paragraph('typing'), { frames: frames.scheduler });
        composing(view, true);

        handle.setDoc(paragraph('first'));
        handle.setDoc(paragraph('latest'));
        frames.runFrame();

        expect(view.state.doc.textContent).toBe('typing');

        composing(view, false);
        frames.runFrame();

        expect(view.state.doc.textContent).toBe('latest');
    });

    it('drops a waiting one when the host hands back what the editor reported', () => {
        const frames = manualFrames();
        const { handle, view, stored } = mount(paragraph('typing'), { frames: frames.scheduler });
        handle.api.insertText('!');
        const reported = stored() as RteDocumentOf;
        composing(view, true);

        handle.setDoc(paragraph('reset'));
        handle.setDoc(reported);
        composing(view, false);
        frames.runFrame();

        expect(view.state.doc.textContent).toBe('!typing');
    });

    it('applies a reported document the host restores after one it handed over mid-composition', () => {
        const frames = manualFrames();
        const { handle, view, stored } = mount(paragraph('typing'), { frames: frames.scheduler });
        handle.api.insertText('a');
        const restored = stored() as RteDocumentOf;
        composing(view, true);
        handle.api.insertText('b');

        handle.setDoc(paragraph('reset'));
        handle.setDoc(restored);
        composing(view, false);
        frames.runFrame();

        expect(view.state.doc.textContent).toBe('atyping');
    });

    it('drops a waiting one once the editor is destroyed', () => {
        const frames = manualFrames();
        const { handle, view, live } = mount(paragraph('typing'), { frames: frames.scheduler });
        composing(view, true);
        handle.setDoc(paragraph('late'));
        expect(frames.pending()).toBe(1);

        live.destroy();

        expect(frames.pending()).toBe(0);
    });
});

describe('a document set by the host while the editor holds more than it reported', () => {
    /** An inline still being made (a draft) at the caret: never part of what the host is handed. */
    const withDraft = () => {
        const editor = mount(paragraph('ab'));
        const { view } = editor;
        const tag = view.state.schema.nodes.tag;
        if (!tag) {
            throw new Error('no tag node');
        }
        view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, 2)));
        view.dispatch(view.state.tr.replaceSelectionWith(tag.create({ value: null }), false));
        return editor;
    };
    const drafts = (view: EditorView): number => {
        let count = 0;
        view.state.doc.descendants((node) => {
            count += node.type.name === 'tag' && node.attrs.value === null ? 1 : 0;
        });
        return count;
    };

    it('leaves an open draft alone in a block the host did not change, even handed back as a copy', () => {
        const blocks = (second: string): RteDocumentOf => ({
            version: 1,
            blocks: [
                { type: PARAGRAPH, children: [{ text: 'ab' }] },
                { type: PARAGRAPH, children: [{ text: second }] },
            ],
        });
        const { handle, view } = mount(blocks('cd'));
        const tag = view.state.schema.nodes.tag;
        if (!tag) {
            throw new Error('no tag node');
        }
        view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, 2)));
        view.dispatch(view.state.tr.replaceSelectionWith(tag.create({ value: null }), false));

        handle.setDoc(blocks('CD'));

        expect(drafts(view)).toBe(1);
        expect(view.state.doc.child(1).textContent).toBe('CD');
    });

    it('leaves an open draft, and the caret, alone when it is an echo of what is there', () => {
        const { handle, view, stored } = withDraft();
        const caret = view.state.selection.from;

        handle.setDoc(structuredClone(stored()) as RteDocumentOf);

        expect(drafts(view)).toBe(1);
        expect(view.state.selection.from).toBe(caret);
    });

    it('is ignored when it is one the editor reported before, arriving late and in order', () => {
        const { handle, view, stored, onDocChange } = mount(emptyDocument());
        const reported: RteDocumentOf[] = [];
        for (const letter of ['a', 'b', 'c']) {
            handle.api.insertText(letter);
            reported.push(stored() as RteDocumentOf);
        }
        const caret = view.state.selection.from;
        onDocChange.mockClear();

        for (const doc of reported) {
            handle.setDoc(doc);
        }

        expect(view.state.doc.textContent).toBe('abc');
        expect(view.state.selection.from).toBe(caret);
        expect(onDocChange).not.toHaveBeenCalled();
    });

    it('lets typing continue after a late echo', () => {
        const { handle, view, stored } = mount(emptyDocument());
        handle.api.insertText('a');
        const docA = stored() as RteDocumentOf;
        handle.api.insertText('b');

        handle.setDoc(docA);
        handle.api.insertText('c');

        expect(view.state.doc.textContent).toBe('abc');
        expect(stored()).toEqual(paragraph('abc'));
    });
});

describe('undo and redo', () => {
    it('take an edit back and bring it again', () => {
        const { handle, view, stored } = mount(paragraph('text'));
        handle.api.insertText('more ');

        undo(view.state, view.dispatch);
        expect(stored()).toEqual(paragraph('text'));

        redo(view.state, view.dispatch);
        expect(stored()).toEqual(paragraph('more text'));
    });
});

describe('the placeholder', () => {
    const placeholderText = (container: HTMLElement): string | null =>
        container.querySelector('.placeholder')?.getAttribute('data-placeholder') ?? null;

    it('shows on an empty document, and goes once something is typed', () => {
        const { handle, container } = mount(emptyDocument(), { placeholder: 'Write…' });

        expect(placeholderText(container)).toBe('Write…');

        handle.api.insertText('a');
        expect(placeholderText(container)).toBeNull();
    });

    it('changes with `setPlaceholder`, and goes when set to nothing', () => {
        const { live, container } = mount(emptyDocument(), { placeholder: 'Write…' });

        live.setPlaceholder('Something else');
        expect(placeholderText(container)).toBe('Something else');

        live.setPlaceholder('');
        expect(placeholderText(container)).toBeNull();
    });
});

describe('the editable element', () => {
    it('carries the attributes it is mounted with, its class among them', () => {
        const { container } = mount(emptyDocument(), { attributes: { 'aria-label': 'Notes', class: 'content' } });
        const editable = container.querySelector('[contenteditable]');

        expect(editable?.getAttribute('aria-label')).toBe('Notes');
        expect(editable?.classList.contains('content')).toBe(true);
    });

    it('takes new attributes from `setAttributes`, dropping ones no longer given', () => {
        const { live, container } = mount(emptyDocument(), { attributes: { 'aria-label': 'Notes', class: 'two' } });

        live.setAttributes({ 'aria-describedby': 'hint', class: 'three' });
        const editable = container.querySelector('[contenteditable]');

        expect(editable?.hasAttribute('aria-label')).toBe(false);
        expect(editable?.getAttribute('aria-describedby')).toBe('hint');
        expect(editable?.classList.contains('three')).toBe(true);
        expect(editable?.classList.contains('two')).toBe(false);
    });
});

describe('a document set by the host, over generated documents', () => {
    type Json = Record<string, unknown>;
    type Random = () => number;

    /** mulberry32: a small seeded generator, so a failing seed reproduces. */
    const seeded = (seed: number): Random => {
        let state = seed;
        return () => {
            state = (state + 0x6d2b79f5) | 0;
            let t = Math.imul(state ^ (state >>> 15), 1 | state);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    };
    const below = (random: Random, count: number): number => Math.floor(random() * count);
    const pick = <T,>(random: Random, items: readonly T[]): T => items[below(random, items.length)] as T;

    const TEXTS = ['a', 'ab', 'cde', 'hello ', 'foo bar', '\u{1F600}', 'a\u{1F600}b', 'x\u{1F468}\u200D\u{1F469}y'];
    const MARKS: readonly [string, unknown][] = [
        ['bold', true],
        ['italic', true],
        ['underline', true],
        ['link', { href: 'https://example.com' }],
    ];

    const run = (random: Random): Json => {
        const result: Json = { text: pick(random, TEXTS) };
        for (const [name, value] of MARKS) {
            if (random() < 0.25) {
                result[name] = value;
            }
        }
        return result;
    };
    // A soft break now and then, so inline elements sit between runs.
    const runs = (random: Random): Json[] =>
        Array.from({ length: below(random, 4) }, (): Json => {
            if (random() < 0.15) {
                return { type: 'break' };
            }
            return run(random);
        });
    const textBlock = (random: Random): Json => {
        if (random() < 0.3) {
            return {
                type: 'textStyle',
                style: pick(random, ['heading1', 'heading2']),
                children: runs(random),
            };
        }
        return { type: PARAGRAPH, children: runs(random) };
    };
    const item = (random: Random, type: string, depth: number): Json => {
        const children: Json[] = [{ type: PARAGRAPH, children: runs(random) }];
        if (depth < 3 && random() < 0.4) {
            children.push(list(random, depth + 1));
        }
        const result: Json = { type, children };
        if (type === 'checkItem') {
            result.checked = random() < 0.5;
        }
        return result;
    };
    const list = (random: Random, depth: number): Json => {
        const type = pick(random, ['bulletList', 'numberedList', 'checkList']);
        let itemType = 'listItem';
        if (type === 'checkList') {
            itemType = 'checkItem';
        }
        return {
            type,
            children: Array.from({ length: 1 + below(random, 3) }, () => item(random, itemType, depth)),
        };
    };
    const block = (random: Random): Json => {
        if (random() < 0.4) {
            return list(random, 1);
        }
        return textBlock(random);
    };
    const generate = (random: Random): RteDocumentOf => ({
        version: 1,
        blocks: Array.from({ length: 1 + below(random, 4) }, () => block(random)) as RteDocumentOf['blocks'],
    });

    const textBlocks = (blocks: Json[]): Json[] =>
        blocks.flatMap((member) => {
            const children = (member.children ?? []) as Json[];
            if (member.type === PARAGRAPH || member.type === 'textStyle') {
                return [member];
            }
            return textBlocks(children);
        });

    /** A small change: one run's text or mark, one block inserted or removed, or one text block restyled. */
    const mutate = (random: Random, doc: RteDocumentOf): RteDocumentOf => {
        const copy = structuredClone(doc);
        const roots = copy.blocks as unknown as Json[];
        const operation = below(random, 4);
        // Only top-level text blocks: a list item holds paragraphs, never headings.
        const restylable = roots.filter((member) => member.type === PARAGRAPH || member.type === 'textStyle');
        if (operation === 3 && restylable.length > 0) {
            const target = pick(random, restylable);
            if (target.type === PARAGRAPH) {
                target.type = 'textStyle';
                target.style = 'heading2';
            } else {
                target.type = PARAGRAPH;
                delete target.style;
            }
            return copy;
        }
        const withRuns = textBlocks(roots).filter((member) => (member.children as Json[]).length > 0);
        if (operation === 0 && withRuns.length > 0) {
            const target = pick(random, pick(random, withRuns).children as Json[]);
            if (random() < 0.5) {
                target.text = pick(random, TEXTS);
            } else {
                let bold: true | undefined;
                if (random() < 0.5) {
                    bold = true;
                }
                target.bold = bold;
            }
            return copy;
        }
        const lists = [{ blocks: roots, make: block }];
        const collect = (members: Json[]) => {
            for (const member of members) {
                const children = (member.children ?? []) as Json[];
                if (member.type === 'bulletList' || member.type === 'numberedList' || member.type === 'checkList') {
                    let itemType = 'listItem';
                    if (member.type === 'checkList') {
                        itemType = 'checkItem';
                    }
                    lists.push({
                        blocks: children,
                        make: (r: Random) => item(r, itemType, 3),
                    });
                }
                if (children.some((child) => 'children' in child)) {
                    collect(children);
                }
            }
        };
        collect(roots);
        const target = pick(random, lists);
        if (operation === 1 && target.blocks.length > 1) {
            target.blocks.splice(below(random, target.blocks.length), 1);
        } else {
            target.blocks.splice(below(random, target.blocks.length + 1), 0, target.make(random));
        }
        return copy;
    };

    const graphemes = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

    /** A random place for the caret inside some text block, between characters as a user's caret always is. */
    const caretPosition = (random: Random, view: EditorView): number => {
        const places: number[] = [];
        view.state.doc.descendants((node, position) => {
            if (node.isTextblock) {
                const text = node.textBetween(0, node.content.size, undefined, INLINE_ATOM_STAND_IN);
                for (const { index } of graphemes.segment(text)) {
                    places.push(position + 1 + index);
                }
                places.push(position + 1 + node.content.size);
            }
            return true;
        });
        return pick(random, places);
    };

    const seeds = Array.from({ length: 200 }, (_, index) => index + 1);

    it.each(seeds)('lands on exactly the new document, the caret on a character boundary (seed %i)', (seed) => {
        const random = seeded(seed);
        const before = generate(random);
        let after: RteDocumentOf;
        if (seed % 5 === 0) {
            after = generate(random);
        } else {
            after = mutate(random, before);
        }
        // Some documents change in two places, so unchanged blocks can sit between changes.
        if (seed % 3 === 0) {
            after = mutate(random, after);
        }
        const editor = editorWith(
            shipped(
                'text-style',
                'bold',
                'italic',
                'underline',
                'link',
                'soft-break',
                'bullet-list',
                'numbered-list',
                'check-list',
            ),
            before.blocks,
        );
        const { view, onDocChange } = editor;
        view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, caretPosition(random, view))));

        editor.editor.setDoc(after);

        expect(view.state.doc.eq(toEngineDocument(after, view.state.schema))).toBe(true);
        expect(onDocChange).not.toHaveBeenCalled();
        const { $head } = view.state.selection;
        expect($head.parent.isTextblock).toBe(true);
        const text = $head.parent.textBetween(0, $head.parent.content.size, undefined, INLINE_ATOM_STAND_IN);
        const character = graphemes.segment(text).containing($head.parentOffset);
        expect(character?.index ?? text.length).toBe($head.parentOffset);
    });
});
