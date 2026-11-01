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

import { mountEditorForTests } from './editing';

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
