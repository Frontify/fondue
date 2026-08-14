/* (c) Copyright Frontify Ltd., all rights reserved. */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { reactRenderProbe } from '#/adapters/reactProbe/renderProbe';
import { emptyDocument, PARAGRAPH, type RteDocumentOf, type RtePlugin } from '#/domain';
import { type EditorHandle } from '#/ports';

import { createEditor } from './editor';

/**
 * The controlled-`value` protocol, which is the one part of the editor a host can
 * break without writing anything wrong: it hands back what it was given, and what
 * happens then decides whether the editor is usable at all.
 *
 * Everything here drives the handle rather than the keyboard. What is being tested
 * is the conversation between the host and the editor, and typing is only one of
 * the ways the editor's half of it starts.
 */
const plugins: RtePlugin[] = [
    { id: 'bold', schema: { marks: [{ key: 'bold', render: ({ children }) => <strong>{children}</strong> }] } },
    // Floating UI anchored to the selection, so there is always a placement to
    // report — see the last test.
    { id: 'panel', floating: { anchor: 'selection', render: () => null } },
];

const paragraph = (text: string): RteDocumentOf => ({
    version: 1,
    blocks: [{ type: PARAGRAPH, children: [{ text }] }],
});

const mounted: EditorHandle[] = [];

const mount = (initialDoc: RteDocumentOf) => {
    const container = window.document.createElement('div');
    window.document.body.append(container);
    const onDocChange = vi.fn<(doc: RteDocumentOf) => void>();

    const handle = createEditor({
        container,
        initialDoc,
        plugins,
        readOnly: false,
        placeholder: '',
        contentClassName: 'content',
        placeholderClassName: 'placeholder',
        probe: reactRenderProbe,
        onDocChange,
        onStateChange: () => {},
        onBlur: () => {},
    });
    mounted.push(handle);

    /** The document as the host would now be holding it, or null if never told. */
    const stored = (): RteDocumentOf | null => {
        const { calls } = onDocChange.mock;
        return calls.length === 0 ? null : (calls[calls.length - 1]?.[0] ?? null);
    };
    return { handle, onDocChange, stored };
};

afterEach(() => {
    for (const handle of mounted.splice(0)) {
        handle.destroy();
    }
    window.document.body.replaceChildren();
});

describe('a document set by the host', () => {
    it('is not reported back to the host', () => {
        const { handle, onDocChange } = mount(emptyDocument());

        handle.setDoc(paragraph('from the host'));

        // Reporting it back is what starts the loop: the host stores what it
        // already had, and a store that re-creates references on the way through
        // hands it back as something new to set, for as long as the page is open.
        expect(onDocChange).not.toHaveBeenCalled();
    });

    it('is ignored when it says the same as what is already there', () => {
        const doc = paragraph('settled');
        const { handle, onDocChange } = mount(doc);

        // The shape of a host that normalizes, or of one whose value went through
        // the server and a `JSON.parse` on the way back: equal content, a new
        // object every time.
        handle.setDoc(structuredClone(doc));

        expect(onDocChange).not.toHaveBeenCalled();
    });

    it('is ignored when the host hands back exactly what the editor reported', () => {
        const { handle, onDocChange, stored } = mount(emptyDocument());
        handle.api.insertText('typed');
        expect(onDocChange).toHaveBeenCalledTimes(1);

        // A controlled host storing every change and passing it back down, which is
        // what `value`/`onChange` means.
        const held = stored();
        onDocChange.mockClear();
        handle.setDoc(held as RteDocumentOf);
        // …and the same again through a store that copies.
        handle.setDoc(structuredClone(held) as RteDocumentOf);

        expect(onDocChange).not.toHaveBeenCalled();
    });

    it('leaves the caret where the user left it', () => {
        const { handle, onDocChange, stored } = mount(paragraph('abcdef'));
        // Typing puts the caret after what was typed — two characters in.
        handle.api.insertText('XY');

        // A genuine change from the host, which does have to replace the content.
        handle.setDoc(paragraph('123456'));
        onDocChange.mockClear();
        handle.api.insertText('|');

        // Where the caret was, not where replacing the content would have left it
        // (either end of the new document).
        expect(stored()).toEqual(paragraph('12|3456'));
        expect(onDocChange).toHaveBeenCalledTimes(1);
    });

    it('still reports the edits the user makes after it', () => {
        const { handle, stored } = mount(emptyDocument());

        handle.setDoc(paragraph('host'));
        handle.api.insertText('!');

        // The silence above is only about the host's own update. The editor has not
        // stopped talking.
        expect(stored()).toEqual(paragraph('!host'));
    });
});

describe('floating placements', () => {
    it('report where UI hangs without measuring it', () => {
        const { handle } = mount(paragraph('anchored'));

        const [placement] = handle.floating.placements();

        expect(placement?.pluginId).toBe('panel');
        // Measuring forces the browser to lay the page out, so it waits until a
        // plugin has said it will draw something. This environment has no layout at
        // all, which is why asking for placements has to be safe on its own.
        expect(typeof placement?.measure).toBe('function');
    });
});
