/* (c) Copyright Frontify Ltd., all rights reserved. */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { defineEditorPart } from '#/entries/authoring';
import { core } from '#/features';
import { mountText, para, text } from '#/react/__tests__/fixtures/text';
import { pressKey, setSelection, typeText } from '#/testing';

import { activeSuggestion } from '../plugin';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

const NAMES = ['Alpha one', 'Alpha two', 'Beta'];

// A `/` list with the rule under test and a search that filters a fixed set of names.
const slash = defineEditorPart(core(), {
    suggestions: [
        {
            trigger: '/',
            labelKey: 'RichTextEditor_suggestions',
            rules: { afterPunctuation: false, maxQuery: 32, spaces: true, leadingLetters: 0, emptyBlock: true },
            search: (query) =>
                Promise.resolve({
                    items: NAMES.filter((name) => name.toLowerCase().includes(query.toLowerCase())).map((name) => ({
                        key: name,
                        label: name,
                        payload: { text: name },
                    })),
                    nextCursor: null,
                }),
            command: 'text.insert',
        },
    ],
});

// The same list without the rule, which keeps the behavior of every list before it.
const plain = defineEditorPart(core(), {
    suggestions: [
        {
            trigger: '/',
            labelKey: 'RichTextEditor_suggestions',
            rules: { afterPunctuation: false, maxQuery: 32, spaces: true, leadingLetters: 0 },
            search: () =>
                Promise.resolve({ items: [{ key: 'a', label: 'A', payload: { text: 'A' } }], nextCursor: null }),
            command: 'text.insert',
        },
    ],
});

const settled = (view: ReturnType<typeof mountText>['view']) =>
    vi.waitFor(() => {
        expect(activeSuggestion(view.state)?.status).toBe('ready');
    });

const afterDelay = () => vi.advanceTimersByTimeAsync(600);

describe('the empty block rule', () => {
    it('opens at the start of an empty paragraph', async () => {
        const { handle, view } = mountText({ blocks: [para()], plugins: [slash] });

        typeText(handle, '/al');
        await settled(view);

        expect(activeSuggestion(view.state)?.items.map((item) => item.label)).toEqual(['Alpha one', 'Alpha two']);
    });

    it('does not open after text, after a space, or before text', async () => {
        const mounted = [
            { existing: 'a', caret: 1 },
            { existing: 'a ', caret: 2 },
            { existing: 'Ab', caret: 0 },
        ].map(({ existing, caret }) => {
            const { handle, view } = mountText({ blocks: [para(text(existing))], plugins: [slash] });
            setSelection(handle, { text: existing, from: caret, to: caret });
            typeText(handle, '/');
            return view;
        });
        await afterDelay();

        expect(mounted.map((view) => activeSuggestion(view.state))).toEqual([null, null, null]);
    });

    it('does not open in a heading', async () => {
        const { handle, view } = mountText({
            blocks: [{ type: 'heading', attrs: { nodeId: 'heading-1', level: 1, lang: null }, content: [] }],
            plugins: [slash],
        });

        typeText(handle, '/');
        await afterDelay();

        expect(activeSuggestion(view.state)).toBeNull();
    });

    it('keeps the text and closes when a space leaves no match, and stays open while one matches', async () => {
        const matching = mountText({ blocks: [para()], plugins: [slash] });
        typeText(matching.handle, '/alpha ');
        await settled(matching.view);
        const none = mountText({ blocks: [para()], plugins: [slash] });
        typeText(none.handle, '/zz');
        await settled(none.view);
        typeText(none.handle, ' ');
        await vi.waitFor(() => {
            expect(activeSuggestion(none.view.state)).toBeNull();
        });
        typeText(none.handle, 'a');
        await afterDelay();

        expect(activeSuggestion(matching.view.state)?.items).toHaveLength(2);
        expect(none.view.state.doc.textContent).toBe('/zz a');
        expect(activeSuggestion(none.view.state)).toBeNull();
    });

    it('keeps a list with no match and no space open with its text', async () => {
        const { handle, view } = mountText({ blocks: [para()], plugins: [slash] });

        typeText(handle, '/zz');
        await settled(view);

        expect(activeSuggestion(view.state)?.items).toEqual([]);
    });

    it('runs the active option on Enter and removes the typed / and query', async () => {
        const { handle, view } = mountText({ blocks: [para()], plugins: [slash] });
        typeText(handle, '/be');
        await settled(view);

        pressKey(handle, 'Enter');

        expect(view.state.doc.textContent).toBe('Beta');
    });

    it('leaves a list without the rule opening mid-text and after a space, as before', async () => {
        const { handle, view } = mountText({ blocks: [para(text('a'))], plugins: [plain] });
        setSelection(handle, { text: 'a', from: 1, to: 1 });

        typeText(handle, ' /');
        await settled(view);

        expect(activeSuggestion(view.state)?.items).toHaveLength(1);
    });
});
