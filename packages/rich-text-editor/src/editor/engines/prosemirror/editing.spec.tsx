/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { afterEach, describe, expect, it, vi } from 'vitest';

import { emptyDocument, PARAGRAPH, type RteDocumentOf, type RtePlugin } from '#/core';

import { mountDocument } from './editing';

/**
 * The controlled-`value` protocol: a host hands back the document it was given,
 * and what happens then decides whether the editor is usable at all.
 */
const plugins: RtePlugin[] = [
    {
        id: 'bold',
        schema: [
            {
                kind: 'mark',
                type: 'bold',
                toDom: () => ({ tag: 'strong', children: true }),
                renderComponent: ({ children }) => <strong>{children}</strong>,
            },
        ],
    },
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

    const live = mountDocument({
        container,
        initialDoc,
        plugins,
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

    it('leaves the caret where the user left it', () => {
        const { handle, onDocChange, stored } = mount(paragraph('abcdef'));
        handle.api.insertText('XY');

        handle.setDoc(paragraph('123456'));
        onDocChange.mockClear();
        handle.api.insertText('|');

        expect(stored()).toEqual(paragraph('12|3456'));
        expect(onDocChange).toHaveBeenCalledTimes(1);
    });

    it('still reports the edits the user makes after it', () => {
        const { handle, stored } = mount(emptyDocument());

        handle.setDoc(paragraph('host'));
        handle.api.insertText('!');

        expect(stored()).toEqual(paragraph('!host'));
    });
});

describe('autocomplete placements', () => {
    it('are empty while no trigger is open', () => {
        const { handle } = mount(paragraph('anchored'));

        expect(handle.autocomplete.placements()).toEqual([]);
    });
});
