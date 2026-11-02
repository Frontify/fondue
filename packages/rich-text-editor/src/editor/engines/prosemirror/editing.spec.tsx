/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { redo, undo } from 'prosemirror-history';
import { TextSelection } from 'prosemirror-state';
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
import { mountEditorForTests } from './editing';
import { destroyEditors, editorWith, shipped } from './testEditor';

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

const mount = (
    initialDoc: RteDocumentOf,
    { placeholder = '', attributes = {} }: { placeholder?: string; attributes?: Record<string, string> } = {},
) => {
    const container = window.document.createElement('div');
    window.document.body.append(container);
    const onDocChange = vi.fn<(doc: RteDocumentOf) => void>();

    const { mounted: live, view } = mountEditorForTests({
        container,
        initialDoc,
        registry: buildPluginRegistry(plugins),
        placeholder,
        attributes,
        placeholderClassName: 'placeholder',
        onDocChange,
        onStateChange: () => {},
        viewPortals: { set: () => {}, delete: () => {} },
    });
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

        it('still applies a change that repeats its neighbours', () => {
            const { handle, view } = mount(paragraphs('aa'));

            handle.setDoc(paragraphs('aaa'));

            expect(view.state.doc.textContent).toBe('aaa');
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
        expect(stored()).toEqual(paragraph('from the host'));
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
    const blocksOf = (...blocks: Record<string, unknown>[]): RteDocumentOf =>
        ({ version: 1, blocks }) as unknown as RteDocumentOf;
    const text = (value: string) => ({ type: PARAGRAPH, children: [{ text: value }] });
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
        const { view, editor } = editorWith(shipped('text-style'), [text('one'), text('two')] as never);
        caretIn(view, 'one', 2);

        editor.setDoc(blocksOf({ type: 'textStyle', style: 'heading1', children: [{ text: 'one' }] }, text('two')));

        expect(view.state.doc.child(0).type.name).toBe('textStyle');
        expect(caretAt(view)).toEqual({ block: 'one', offset: 2 });
    });

    it('keeps the caret in a to-do the host ticks', () => {
        const todo = (checked: boolean) => ({
            type: 'checkList',
            children: [{ type: 'checkItem', checked, children: [text('task')] }],
        });
        const { view, editor } = editorWith(shipped('check-list'), [todo(false), text('after')] as never);
        caretIn(view, 'task', 2);

        editor.setDoc(blocksOf(todo(true), text('after')));

        expect(view.state.doc.child(0).child(0).attrs.checked).toBe(true);
        expect(caretAt(view)).toEqual({ block: 'task', offset: 2 });
    });

    it('keeps the caret in its list item when the host removes an item before it', () => {
        const list = (...items: string[]) => ({
            type: 'bulletList',
            children: items.map((item) => ({ type: 'listItem', children: [text(item)] })),
        });
        const { view, editor } = editorWith(shipped('bullet-list'), [list('a', 'b', 'c')] as never);
        caretIn(view, 'c', 1);

        editor.setDoc(blocksOf(list('b', 'c')));

        expect(caretAt(view)).toEqual({ block: 'c', offset: 1 });
    });
});

describe('a document set by the host while text is being composed', () => {
    const composing = (view: EditorView, value: boolean): void => {
        Object.defineProperty(view, 'composing', { configurable: true, get: () => value });
    };
    const nextFrame = (): Promise<void> => new Promise((resolve) => requestAnimationFrame(() => resolve()));

    it('waits for the composition to end, then applies the latest one', async () => {
        const { handle, view } = mount(paragraph('typing'));
        composing(view, true);

        handle.setDoc(paragraph('first'));
        handle.setDoc(paragraph('latest'));
        await nextFrame();

        expect(view.state.doc.textContent).toBe('typing');

        composing(view, false);
        await nextFrame();

        expect(view.state.doc.textContent).toBe('latest');
    });

    it('drops a waiting one when the host hands back what the editor reported', async () => {
        const { handle, view, stored } = mount(paragraph('typing'));
        handle.api.insertText('!');
        const reported = stored() as RteDocumentOf;
        composing(view, true);

        handle.setDoc(paragraph('reset'));
        handle.setDoc(reported);
        composing(view, false);
        await nextFrame();

        expect(view.state.doc.textContent).toBe('!typing');
    });

    it('applies a reported document the host restores after one it handed over mid-composition', async () => {
        const { handle, view, stored } = mount(paragraph('typing'));
        handle.api.insertText('a');
        const restored = stored() as RteDocumentOf;
        composing(view, true);
        handle.api.insertText('b');

        handle.setDoc(paragraph('reset'));
        handle.setDoc(restored);
        composing(view, false);
        await nextFrame();

        expect(view.state.doc.textContent).toBe('atyping');
    });

    it('drops a waiting one once the editor is destroyed', async () => {
        const { handle, view, live } = mount(paragraph('typing'));
        composing(view, true);
        handle.setDoc(paragraph('late'));

        live.destroy();
        const dispatch = vi.spyOn(view, 'dispatch');
        composing(view, false);
        await nextFrame();

        expect(dispatch).not.toHaveBeenCalled();
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
    const runs = (random: Random): Json[] => Array.from({ length: below(random, 4) }, () => run(random));
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
        return {
            type,
            ...(type === 'checkItem' ? { checked: random() < 0.5 } : {}),
            children,
        };
    };
    const list = (random: Random, depth: number): Json => {
        const type = pick(random, ['bulletList', 'numberedList', 'checkList']);
        const itemType = type === 'checkList' ? 'checkItem' : 'listItem';
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
                target.bold = random() < 0.5 ? true : undefined;
            }
            return copy;
        }
        const lists = [{ blocks: roots, make: block }];
        const collect = (members: Json[]) => {
            for (const member of members) {
                const children = (member.children ?? []) as Json[];
                if (member.type === 'bulletList' || member.type === 'numberedList' || member.type === 'checkList') {
                    const itemType = member.type === 'checkList' ? 'checkItem' : 'listItem';
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
                const text = node.textBetween(0, node.content.size, undefined, '￼');
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
        const after = seed % 5 === 0 ? generate(random) : mutate(random, before);
        const editor = editorWith(
            shipped('text-style', 'bold', 'italic', 'underline', 'link', 'bullet-list', 'numbered-list', 'check-list'),
            before.blocks as never,
        );
        const { view, onDocChange } = editor;
        view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, caretPosition(random, view))));

        editor.editor.setDoc(after);

        expect(view.state.doc.eq(toEngineDocument(after, view.state.schema))).toBe(true);
        expect(onDocChange).not.toHaveBeenCalled();
        const { $head } = view.state.selection;
        expect($head.parent.isTextblock).toBe(true);
        const text = $head.parent.textBetween(0, $head.parent.content.size, undefined, '￼');
        const character = graphemes.segment(text).containing($head.parentOffset);
        expect(character?.index ?? text.length).toBe($head.parentOffset);
    });
});
