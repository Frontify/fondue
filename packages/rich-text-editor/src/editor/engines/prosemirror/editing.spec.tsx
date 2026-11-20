/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { redo, undo, undoDepth } from 'prosemirror-history';
import { Node as PmNode } from 'prosemirror-model';
import { NodeSelection, TextSelection } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
    ANY_LIST,
    buildPluginRegistry,
    defineBlock,
    defineContent,
    defineInline,
    defineMark,
    definePlugin,
    emptyDocument,
    PARAGRAPH,
    type RteDocumentOf,
    type RtePlugin,
} from '#/core';
import { type MountOptions } from '#/editor/port';

import { toEngineDocument } from './documentConversion';
import { type FrameScheduler, mountEditorForTests } from './editing';
import { type BlockInput, destroyEditors, editorWith } from './testEditor';

// Checked independently of the source: the character the spec expects for an inline atom in text.
const INLINE_ATOM_STAND_IN = '￼';

const COMPOSITION_START = 'compositionstart';
const COMPOSITION_END = 'compositionend';

const LONG_DOCUMENT_LENGTH = 600;

/** Far fewer comparisons than the square of the long document's length. */
const LONG_DOCUMENT_COMPARISON_BUDGET = 50_000;

/**
 * The controlled-`value` protocol: a host hands back the document it was given,
 * and what happens then decides whether the editor is usable at all.
 */
const plugins: RtePlugin[] = [
    definePlugin({
        id: 'tag',
        content: defineContent({
            inlines: {
                tag: defineInline<{ name: string }>({
                    toHtml: ({ name }) => ({ tag: 'span', children: name }),
                    parse: [],
                }),
            },
        }),
    }),
    definePlugin({
        id: 'bold',
        content: defineContent({
            marks: {
                bold: defineMark({
                    toHtml: () => ({ tag: 'strong', children: true }),
                    parse: [{ tag: 'strong' }],
                }),
            },
        }),
    }),
];

const toggleMarksPlugin: RtePlugin = definePlugin({
    id: 'toggle-marks',
    content: defineContent({
        marks: {
            toggleA: defineMark({ toHtml: () => ({ tag: 'strong', children: true }), parse: [] }),
            toggleB: defineMark({ toHtml: () => ({ tag: 'em', children: true }), parse: [] }),
            toggleC: defineMark({ toHtml: () => ({ tag: 'u', children: true }), parse: [] }),
        },
    }),
});

const valuedMarkPlugin: RtePlugin = definePlugin({
    id: 'valued-mark',
    content: defineContent({
        marks: {
            valued: defineMark<{ ref: string }>({
                toHtml: ({ ref }) => ({ tag: 'a', attrs: { href: ref }, children: true }),
                parse: [],
            }),
        },
    }),
});

const voidInlinePlugin: RtePlugin = definePlugin({
    id: 'void-inline',
    content: defineContent({
        inlines: { marker: defineInline({ toHtml: () => ({ tag: 'br' }), parse: [] }) },
    }),
});

const styledPlugin: RtePlugin = definePlugin({
    id: 'styled',
    content: defineContent({
        blocks: {
            styled: defineBlock<{ style: string }>({
                content: 'text',
                defaults: { style: 'large' },
                toHtml: ({ style }) => ({ tag: 'p', attrs: { 'data-style': style }, children: true }),
                parse: [],
            }),
        },
    }),
});

const tonePlugin: RtePlugin = definePlugin({
    id: 'tone',
    content: defineContent({
        blockAttributes: { tone: { style: (value) => ({ color: value }) } },
    }),
});

const listsPlugin: RtePlugin = definePlugin({
    id: 'lists',
    content: defineContent({
        blocks: {
            list: defineBlock({
                content: { items: 'listEntry' },
                toHtml: () => ({ tag: 'ul', children: true }),
                parse: [],
            }),
            orderedList: defineBlock({
                content: { items: 'listEntry' },
                toHtml: () => ({ tag: 'ol', children: true }),
                parse: [],
            }),
            listEntry: defineBlock({
                content: { blocks: [PARAGRAPH, ANY_LIST] },
                toHtml: () => ({ tag: 'li', children: true }),
                parse: [],
            }),
        },
    }),
});

const checkablePlugin: RtePlugin = definePlugin({
    id: 'checkable',
    content: defineContent({
        blocks: {
            checkableList: defineBlock({
                content: { items: 'checkEntry' },
                toHtml: () => ({ tag: 'ul', children: true }),
                parse: [],
            }),
            checkEntry: defineBlock<{ checked: boolean }>({
                content: { blocks: [PARAGRAPH, ANY_LIST] },
                defaults: { checked: false },
                toHtml: ({ checked }) => ({ tag: 'li', attrs: { 'data-checked': String(checked) }, children: true }),
                parse: [],
            }),
        },
    }),
});

const paragraph = (text: string): RteDocumentOf => ({
    version: 1,
    blocks: [{ type: PARAGRAPH, children: [{ text }] }],
});

const mounted: { destroy(): void }[] = [];

type MountTestOptions = Partial<Pick<MountOptions, 'placeholder' | 'attributes'>> & { frames?: FrameScheduler };

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
            onDocApplied: () => {},
            onStateChange: () => {},
            viewPortals: { set: () => {}, delete: () => {} },
        },
        frames,
    );
    mounted.push(live);
    const handle = { ...live.handle, setDoc: live.setDoc };

    const stored = (): RteDocumentOf => {
        const { lastCall } = onDocChange.mock;
        if (lastCall === undefined) {
            throw new Error('The editor has reported no document.');
        }

        return lastCall[0];
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
        handle.setDoc(held);
        handle.setDoc(structuredClone(held));

        expect(onDocChange).not.toHaveBeenCalled();
    });

    describe('that changes one block', () => {
        const paragraphs = (...texts: string[]): RteDocumentOf => ({
            version: 1,
            blocks: texts.map((text) => ({ type: PARAGRAPH, children: [{ text }] })),
        });
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
            if (!(selection instanceof NodeSelection)) {
                throw new TypeError('The selection is no longer on the inline element.');
            }

            expect(selection.node.attrs.value).toEqual({ name: 'u' });
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
        type DocumentWithMeta = RteDocumentOf & { meta?: string };

        const withMeta = (meta?: string): DocumentWithMeta => {
            const doc: DocumentWithMeta = paragraph('same');
            if (meta !== undefined) {
                doc.meta = meta;
            }

            return doc;
        };

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

            const other: DocumentWithMeta = { ...paragraph('other'), meta: 'b' };

            handle.setDoc(other);

            expect(handle.document()).toEqual(other);
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
        const docA = stored();
        handle.api.insertText('b');
        const docB = stored();

        handle.setDoc(docB);
        handle.setDoc(docA);
        expect(view.state.doc.textContent).toBe('a');
        handle.api.insertText('c');

        expect(stored()).toEqual(paragraph('ac'));
    });

    it('applies a document the editor reported before when the host restores it after its own reset', () => {
        const { handle, view, stored } = mount(emptyDocument());
        handle.api.insertText('a');
        const docA = stored();
        handle.setDoc(docA);
        handle.api.insertText('b');
        const docB = stored();

        handle.setDoc(paragraph('from the host'));
        handle.setDoc(docB);

        expect(view.state.doc.textContent).toBe('ab');
    });

    it('applies an earlier reported document after the host hands back a copy of the latest', () => {
        const { handle, view, stored } = mount(emptyDocument());
        handle.api.insertText('a');
        const docA = stored();
        handle.api.insertText('b');

        handle.setDoc(structuredClone(stored()));
        handle.setDoc(docA);

        expect(view.state.doc.textContent).toBe('a');
    });

    it('treats what the editor reports after a reset as newer than it', () => {
        const { handle, view, stored } = mount(emptyDocument());
        handle.api.insertText('a');
        const docA = stored();
        handle.api.insertText('b');
        handle.setDoc(stored());
        handle.setDoc(docA);
        handle.api.insertText('c');
        const docC = stored();
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
        const { view, editor } = editorWith([styledPlugin], [text('one'), text('two')]);
        caretIn(view, 'one', 2);

        editor.setDoc(blocksOf({ type: 'styled', style: 'large', children: [{ text: 'one' }] }, text('two')));

        expect(view.state.doc.child(0).type.name).toBe('styled');
        expect(caretAt(view)).toEqual({ block: 'one', offset: 2 });
    });

    it('keeps the caret in its block when the host inserts a block with the same text before it', () => {
        const styledBlock: BlockInput = { type: 'styled', style: 'large', children: [{ text: 'T' }] };
        const { view, editor } = editorWith([styledPlugin], [styledBlock, text('x')]);
        caretIn(view, 'T', 1);

        editor.setDoc(blocksOf(text('T'), styledBlock, text('x')));

        expect(view.state.selection.$from.index(0)).toBe(1);
        expect(view.state.selection.$from.parent.type.name).toBe('styled');
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
        const texts = Array.from({ length: LONG_DOCUMENT_LENGTH }, (_, index) => `block ${index}`);
        const { view, editor } = editorWith([], texts.map(text));
        caretIn(view, 'block 599', 1);

        editor.setDoc(blocksOf(...texts.slice(0, 300).map(text), text('new'), ...texts.slice(300).map(text)));

        expect(view.state.doc.childCount).toBe(LONG_DOCUMENT_LENGTH + 1);
        expect(caretAt(view)).toEqual({ block: 'block 599', offset: 1 });
    });

    it('leaves the caret and undo alone mid-document when the host changes both ends of a long one', () => {
        const texts = Array.from({ length: LONG_DOCUMENT_LENGTH }, (_, index) => `block ${index}`);
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
        const texts = Array.from({ length: LONG_DOCUMENT_LENGTH }, (_, index) => `block ${index}`);
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
            Array.from({ length: LONG_DOCUMENT_LENGTH }, (_, index) => text(`old ${index}`)),
        );
        const compare = vi.spyOn(PmNode.prototype, 'eq');

        editor.setDoc(
            blocksOf(...Array.from({ length: LONG_DOCUMENT_LENGTH + 1 }, (_, index) => text(`new ${index}`))),
        );

        const compared = compare.mock.calls.length;
        compare.mockRestore();

        expect(view.state.doc.childCount).toBe(LONG_DOCUMENT_LENGTH + 1);
        expect(compared).toBeLessThan(LONG_DOCUMENT_COMPARISON_BUDGET);
    });

    it('keeps a host restyle when the user undoes their own change to the same block', () => {
        const { view, editor, api } = editorWith([styledPlugin, tonePlugin], [text('one'), text('two')]);
        caretIn(view, 'one', 1);
        api.blocks.updateAttributes({ tone: 'red' });

        editor.setDoc(
            blocksOf({ type: 'styled', style: 'large', tone: 'red', children: [{ text: 'one' }] }, text('two')),
        );
        undo(view.state, view.dispatch);

        expect(view.state.doc.child(0).type.name).toBe('styled');
    });

    it('undoes only the attribute the user changed when the host changed another on the same block', () => {
        const styledBlock = (style: string, tone?: string): BlockInput => {
            const block: BlockInput = { type: 'styled', style, children: [{ text: 'one' }] };
            if (tone !== undefined) {
                block.tone = tone;
            }

            return block;
        };
        const { view, editor, api } = editorWith([styledPlugin, tonePlugin], [styledBlock('large')]);
        caretIn(view, 'one', 1);
        api.blocks.updateAttributes({ tone: 'red' });

        editor.setDoc(blocksOf(styledBlock('small', 'red')));
        undo(view.state, view.dispatch);

        expect(view.state.doc.child(0).attrs.style).toBe('small');
        expect(view.state.doc.child(0).attrs.tone ?? null).toBeNull();
    });

    it('keeps the tone the host set when the user undoes the tone they set on the same block', () => {
        const styledBlock = (tone?: string): BlockInput => {
            const block: BlockInput = { type: 'styled', style: 'large', children: [{ text: 'one' }] };
            if (tone !== undefined) {
                block.tone = tone;
            }

            return block;
        };
        const { view, editor, api } = editorWith([styledPlugin, tonePlugin], [styledBlock()]);
        caretIn(view, 'one', 1);
        api.blocks.updateAttributes({ tone: 'red' });

        editor.setDoc(blocksOf(styledBlock('blue')));
        undo(view.state, view.dispatch);

        expect(view.state.doc.child(0).attrs.tone).toBe('blue');
    });

    it('keeps the caret in a to-do the host ticks', () => {
        const todo = (checked: boolean): BlockInput => ({
            type: 'checkableList',
            children: [{ type: 'checkEntry', checked, children: [text('task')] }],
        });
        const { view, editor } = editorWith([checkablePlugin], [todo(false), text('after')]);
        caretIn(view, 'task', 2);

        editor.setDoc(blocksOf(todo(true), text('after')));

        expect(view.state.doc.child(0).child(0).attrs.checked).toBe(true);
        expect(caretAt(view)).toEqual({ block: 'task', offset: 2 });
    });

    it('keeps the caret in its list item when the host removes an item before it', () => {
        const list = (...items: string[]): BlockInput => ({
            type: 'list',
            children: items.map((item) => ({ type: 'listEntry', children: [text(item)] })),
        });
        const { view, editor } = editorWith([listsPlugin], [list('a', 'b', 'c')]);
        caretIn(view, 'c', 1);

        editor.setDoc(blocksOf(list('b', 'c')));

        expect(caretAt(view)).toEqual({ block: 'c', offset: 1 });
    });
});

describe('a document set by the host while text is being composed', () => {
    const composing = (view: EditorView, value: boolean): void => {
        let phase = COMPOSITION_END;
        if (value) {
            phase = COMPOSITION_START;
        }

        view.dom.dispatchEvent(new CompositionEvent(phase, { bubbles: true }));
    };
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
        const reported = stored();
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
        const restored = stored();
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
            if (node.type.name === 'tag' && node.attrs.value === null) {
                count += 1;
            }
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

        handle.setDoc(structuredClone(stored()));

        expect(drafts(view)).toBe(1);
        expect(view.state.selection.from).toBe(caret);
    });

    it('is ignored when it is one the editor reported before, arriving late and in order', () => {
        const { handle, view, stored, onDocChange } = mount(emptyDocument());
        const reported: RteDocumentOf[] = [];

        for (const letter of ['a', 'b', 'c']) {
            handle.api.insertText(letter);
            reported.push(stored());
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
        const docA = stored();
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

    it('sets and removes attributes by name through `setEditableAttributes`, keeping the others', () => {
        const { handle, container } = mount(emptyDocument(), { attributes: { 'aria-label': 'Notes' } });
        const editable = container.querySelector('[contenteditable]');

        handle.setEditableAttributes({ 'aria-activedescendant': 'option-1', 'aria-controls': 'list' });
        expect(editable?.getAttribute('aria-activedescendant')).toBe('option-1');
        expect(editable?.getAttribute('aria-controls')).toBe('list');

        handle.setEditableAttributes({ 'aria-activedescendant': null });
        expect(editable?.hasAttribute('aria-activedescendant')).toBe(false);
        expect(editable?.getAttribute('aria-controls')).toBe('list');
        expect(editable?.getAttribute('aria-label')).toBe('Notes');
    });
});

describe('a document set by the host, over generated documents', () => {
    type Random = () => number;

    /** A generated node: a block, a text run or a marker, one shape so a change can restyle a node in place. */
    type GeneratedNode = {
        type?: string;
        text?: string;
        style?: string;
        checked?: boolean;
        toggleA?: true;
        toggleB?: true;
        toggleC?: true;
        valued?: { ref: string };
        children?: GeneratedNode[];
    };

    type GeneratedDocument = { version: 1; blocks: GeneratedNode[] };

    const MARK_PROBABILITY = 0.25;
    const MARKER_PROBABILITY = 0.15;
    const STYLED_BLOCK_PROBABILITY = 0.3;
    const LIST_BLOCK_PROBABILITY = 0.4;
    const NESTED_LIST_PROBABILITY = 0.4;
    const EVEN_ODDS = 0.5;

    const MAX_LIST_DEPTH = 3;
    const FRESH_DOCUMENT_EVERY = 5;
    const SECOND_CHANGE_EVERY = 3;
    const SEED_COUNT = 200;

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
    const pick = <T,>(random: Random, items: readonly T[]): T => {
        const item = items[below(random, items.length)];
        if (item === undefined) {
            throw new Error('Nothing to pick from.');
        }

        return item;
    };

    /** The generated tree holds plugin attributes the open document type cannot name, so it is cast once here. */
    const toDocument = (generated: GeneratedDocument): RteDocumentOf => generated as RteDocumentOf;

    const TEXTS = ['a', 'ab', 'cde', 'hello ', 'foo bar', '\u{1F600}', 'a\u{1F600}b', 'x\u{1F468}‍\u{1F469}y'];

    const run = (random: Random): GeneratedNode => {
        const result: GeneratedNode = { text: pick(random, TEXTS) };

        if (random() < MARK_PROBABILITY) {
            result.toggleA = true;
        }

        if (random() < MARK_PROBABILITY) {
            result.toggleB = true;
        }

        if (random() < MARK_PROBABILITY) {
            result.toggleC = true;
        }

        if (random() < MARK_PROBABILITY) {
            result.valued = { ref: 'https://example.com' };
        }

        return result;
    };
    const runs = (random: Random): GeneratedNode[] =>
        Array.from({ length: below(random, 4) }, (): GeneratedNode => {
            if (random() < MARKER_PROBABILITY) {
                return { type: 'marker' };
            }

            return run(random);
        });
    const textBlock = (random: Random): GeneratedNode => {
        if (random() < STYLED_BLOCK_PROBABILITY) {
            return {
                type: 'styled',
                style: pick(random, ['large', 'small']),
                children: runs(random),
            };
        }

        return { type: PARAGRAPH, children: runs(random) };
    };
    const item = (random: Random, type: string, depth: number): GeneratedNode => {
        const children: GeneratedNode[] = [{ type: PARAGRAPH, children: runs(random) }];

        if (depth < MAX_LIST_DEPTH && random() < NESTED_LIST_PROBABILITY) {
            children.push(list(random, depth + 1));
        }

        const result: GeneratedNode = { type, children };

        if (type === 'checkEntry') {
            result.checked = random() < EVEN_ODDS;
        }

        return result;
    };
    const list = (random: Random, depth: number): GeneratedNode => {
        const type = pick(random, ['list', 'orderedList', 'checkableList']);
        let itemType = 'listEntry';
        if (type === 'checkableList') {
            itemType = 'checkEntry';
        }

        return {
            type,
            children: Array.from({ length: 1 + below(random, 3) }, () => item(random, itemType, depth)),
        };
    };
    const block = (random: Random): GeneratedNode => {
        if (random() < LIST_BLOCK_PROBABILITY) {
            return list(random, 1);
        }

        return textBlock(random);
    };
    const generate = (random: Random): GeneratedDocument => ({
        version: 1,
        blocks: Array.from({ length: 1 + below(random, 4) }, () => block(random)),
    });

    const textBlocks = (blocks: GeneratedNode[]): GeneratedNode[] =>
        blocks.flatMap((member) => {
            if (member.type === PARAGRAPH || member.type === 'styled') {
                return [member];
            }

            return textBlocks(member.children ?? []);
        });

    /** A small change: one run's text or mark, one block inserted or removed, or one text block restyled. */
    const mutate = (random: Random, doc: GeneratedDocument): GeneratedDocument => {
        const copy = structuredClone(doc);
        const roots = copy.blocks;
        const operation = below(random, 4);

        // Only top-level text blocks: a list item holds paragraphs, never styled blocks.
        const restylable = roots.filter((member) => member.type === PARAGRAPH || member.type === 'styled');

        if (operation === 3 && restylable.length > 0) {
            const target = pick(random, restylable);

            if (target.type === PARAGRAPH) {
                target.type = 'styled';
                target.style = 'small';
            } else {
                target.type = PARAGRAPH;
                delete target.style;
            }

            return copy;
        }

        const withRuns = textBlocks(roots).filter((member) => (member.children ?? []).length > 0);

        if (operation === 0 && withRuns.length > 0) {
            const target = pick(random, pick(random, withRuns).children ?? []);

            if (random() < EVEN_ODDS) {
                target.text = pick(random, TEXTS);
            } else {
                let toggleA: true | undefined;
                if (random() < EVEN_ODDS) {
                    toggleA = true;
                }

                target.toggleA = toggleA;
            }

            return copy;
        }

        const lists = [{ blocks: roots, make: block }];
        const collect = (members: GeneratedNode[]) => {
            for (const member of members) {
                const children = member.children ?? [];

                if (member.type === 'list' || member.type === 'orderedList' || member.type === 'checkableList') {
                    let itemType = 'listEntry';
                    if (member.type === 'checkableList') {
                        itemType = 'checkEntry';
                    }

                    lists.push({
                        blocks: children,
                        make: (r: Random) => item(r, itemType, MAX_LIST_DEPTH),
                    });
                }

                if (children.some((child) => child.children !== undefined)) {
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

    /** A random caret position inside a text block, on a character boundary. */
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

    const seeds = Array.from({ length: SEED_COUNT }, (_, index) => index + 1);

    it.each(seeds)('lands on exactly the new document, the caret on a character boundary (seed %i)', (seed) => {
        const random = seeded(seed);
        const before = generate(random);
        let after: GeneratedDocument;
        if (seed % FRESH_DOCUMENT_EVERY === 0) {
            after = generate(random);
        } else {
            after = mutate(random, before);
        }

        const changesTwice = seed % SECOND_CHANGE_EVERY === 0;

        if (changesTwice) {
            after = mutate(random, after);
        }

        const editor = editorWith(
            [styledPlugin, toggleMarksPlugin, valuedMarkPlugin, voidInlinePlugin, listsPlugin, checkablePlugin],
            toDocument(before).blocks,
        );
        const { view, onDocChange } = editor;
        view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, caretPosition(random, view))));

        editor.editor.setDoc(toDocument(after));

        expect(view.state.doc.eq(toEngineDocument(toDocument(after), view.state.schema))).toBe(true);
        expect(onDocChange).not.toHaveBeenCalled();

        const { $head } = view.state.selection;
        expect($head.parent.isTextblock).toBe(true);

        const text = $head.parent.textBetween(0, $head.parent.content.size, undefined, INLINE_ATOM_STAND_IN);
        const character = graphemes.segment(text).containing($head.parentOffset);
        expect(character?.index ?? text.length).toBe($head.parentOffset);
    });
});

describe('the drop cursor', () => {
    it('shows a 2px line in the primary colour token while something is dragged over the editor', () => {
        const { view } = mount(paragraph('text'));
        // happy-dom has no layout: the pointer position, its rectangle, the editor's size and the offset parent are given.
        Object.defineProperty(view.dom, 'offsetParent', { value: window.document.body });
        Object.defineProperty(view.dom, 'offsetWidth', { value: 100 });
        Object.defineProperty(view.dom, 'offsetHeight', { value: 20 });
        vi.spyOn(view.dom, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 100, 20));
        vi.spyOn(view, 'posAtCoords').mockReturnValue({ pos: 3, inside: 1 });
        vi.spyOn(view, 'coordsAtPos').mockReturnValue({ left: 10, right: 10, top: 0, bottom: 20 });

        view.dom.dispatchEvent(new Event('dragover', { bubbles: true }));

        const cursor = window.document.querySelector<HTMLElement>('.prosemirror-dropcursor-inline');
        expect(cursor?.style.backgroundColor).toBe('var(--color-primary-default)');
        expect(cursor?.style.width).toBe('2px');
    });
});
