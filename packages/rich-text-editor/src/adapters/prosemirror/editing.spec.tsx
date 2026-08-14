/* (c) Copyright Frontify Ltd., all rights reserved. */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { reactRenderProbe } from '#/adapters/reactProbe/renderProbe';
import { emptyDocument, PARAGRAPH, type RteDocumentOf, type RtePlugin } from '#/domain';

import { startEditing } from './editing';
import { buildSchema } from './setup/schema';

/**
 * The controlled-`value` protocol: a host hands back the document it was given,
 * and what happens then decides whether the editor is usable at all. The one
 * part a host can break without writing anything wrong.
 *
 * Everything here drives the handle rather than the keyboard, because what is
 * being tested is the conversation between the host and the editor.
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

const mounted: { destroy(): void }[] = [];

const mount = (initialDoc: RteDocumentOf) => {
    const container = window.document.createElement('div');
    window.document.body.append(container);
    const onDocChange = vi.fn<(doc: RteDocumentOf) => void>();

    const live = startEditing({
        container,
        bundle: buildSchema(plugins, reactRenderProbe),
        features: plugins,
        doc: initialDoc,
        readOnly: false,
        placeholder: '',
        contentClassName: 'content',
        placeholderClassName: 'placeholder',
        onDocChange,
        onStateChange: () => {},
        onBlur: () => {},
    });
    mounted.push(live);
    const handle = { ...live.handle, setDoc: live.setDoc };

    /** The document as the host would now be holding it, or null if never told. */
    const stored = (): RteDocumentOf | null => {
        const { calls } = onDocChange.mock;
        return calls.length === 0 ? null : (calls[calls.length - 1]?.[0] ?? null);
    };
    return { handle, onDocChange, stored };
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

        // Reporting it back is what would start a loop — see `agreedDoc` in
        // editor.ts.
        expect(onDocChange).not.toHaveBeenCalled();
    });

    it('is ignored when it says the same as what is already there', () => {
        const doc = paragraph('settled');
        const { handle, onDocChange } = mount(doc);

        // The shape of a host that normalizes what it stores, or whose value
        // went through a `JSON.parse`: equal content, a new object every time.
        handle.setDoc(structuredClone(doc));

        expect(onDocChange).not.toHaveBeenCalled();
    });

    it('is ignored when the host hands back exactly what the editor reported', () => {
        const { handle, onDocChange, stored } = mount(emptyDocument());
        handle.api.insertText('typed');
        expect(onDocChange).toHaveBeenCalledTimes(1);

        // A controlled host: it stores every change and passes it back down.
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

        // A genuine change from the host, which does have to replace the
        // content.
        handle.setDoc(paragraph('123456'));
        onDocChange.mockClear();
        handle.api.insertText('|');

        // Where the caret was, not where replacing the whole content would have
        // left it (either end of the new document).
        expect(stored()).toEqual(paragraph('12|3456'));
        expect(onDocChange).toHaveBeenCalledTimes(1);
    });

    it('still reports the edits the user makes after it', () => {
        const { handle, stored } = mount(emptyDocument());

        handle.setDoc(paragraph('host'));
        handle.api.insertText('!');

        // The silence above was only about the host's own update.
        expect(stored()).toEqual(paragraph('!host'));
    });
});

describe('floating placements', () => {
    it('report where UI hangs without measuring it', () => {
        const { handle } = mount(paragraph('anchored'));

        const [placement] = handle.floating.placements();

        expect(placement?.pluginId).toBe('panel');
        // Measuring forces a layout, so it waits until a plugin says it will
        // draw something. This environment has no layout at all, so asking for
        // placements has to be safe on its own.
        expect(typeof placement?.measure).toBe('function');
    });
});
