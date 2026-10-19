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

    it('puts the caret at the end of the new content, not at the old offset mid-word', () => {
        const { handle, onDocChange, stored } = mount(paragraph('abcdef'));
        handle.api.insertText('XY');

        handle.setDoc(paragraph('123456'));
        onDocChange.mockClear();
        handle.api.insertText('|');

        expect(stored()).toEqual(paragraph('123456|'));
        expect(onDocChange).toHaveBeenCalledTimes(1);
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

    it('is ignored when it is one the editor reported before, arriving late', () => {
        const { handle, view, stored } = mount(emptyDocument());
        handle.api.insertText('a');
        const older = stored() as RteDocumentOf;
        handle.api.insertText('b');

        handle.setDoc(older);

        expect(view.state.doc.textContent).toBe('ab');
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
