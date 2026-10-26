/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { defineEditorPart } from '#/entries/authoring';
import { defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import { deDE } from '#/locales/de-DE';
import { type ContentNodeJSON } from '#/model';
import { code, codeBlock, core, emoji } from '#/plugins';
import { unitsOf } from '#/plugins/__tests__/fixtures/units';
import { type EmojiEntry } from '#/plugins/Emoji/data';
import { mountProfile } from '#/react/__tests__/fixtures/profiles';
import { mountText, para, storedIn, text, textModel } from '#/react/__tests__/fixtures/text';
import { runtimeOf } from '#/runtime/runtime';
import { SETTLE_MS } from '#/runtime/settle';
import { paste, pressKey, setSelection, typeText } from '#/testing';
import { failNetworkInThisFile } from '#/testing/__tests__/fixtures/network';

import { activeSuggestion } from '../plugin';
import { SEARCH_DELAY_MS } from '../search';

failNetworkInThisFile();

const gate = vi.hoisted(() => ({
    hold: false,
    pending: [] as Array<(entries: readonly EmojiEntry[]) => void>,
}));

type EmojiModule = {
    loadEmoji: (locale: string) => Promise<readonly EmojiEntry[]>;
    searchEmoji: (entries: readonly EmojiEntry[], query: string, limit: number) => readonly EmojiEntry[];
};

vi.mock('#/plugins/Emoji/data', async (importOriginal) => {
    const actual = (await importOriginal()) as EmojiModule;

    return {
        ...actual,
        loadEmoji: (locale: string) => {
            if (!gate.hold) {
                return actual.loadEmoji(locale);
            }

            return new Promise<readonly EmojiEntry[]>((resolve) => {
                gate.pending.push(resolve);
            });
        },
    };
});

beforeEach(() => {
    gate.hold = false;
    gate.pending = [];
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

const ALLOW = { create: true, edit: true, remove: true, paste: true };
const model = textModel([core(), emoji(), code(), codeBlock()]);
type Mounted = ReturnType<typeof mountText>;
const blocksOf = (handle: Mounted['handle']) => handle.getSnapshot().document.content.content ?? [];
const textOf = (handle: Mounted['handle']) =>
    (blocksOf(handle)[0]?.content ?? []).map((node) => node.text ?? '').join('');
const codeText = (handle: Mounted['handle']) =>
    (blocksOf(handle)[0]?.content ?? [])
        .filter((node) => node.marks?.some((mark) => mark.type === 'code'))
        .map((node) => node.text ?? '')
        .join('');
const codeNode = (value: string): ContentNodeJSON => ({
    type: 'code_block',
    attrs: { languageId: null },
    ...(value === '' ? {} : { content: [{ type: 'text', text: value }] }),
});

/** The list once its source has answered, which a fixed sleep would race. */
const opened = async (view: Mounted['view']) => {
    await vi.waitFor(() => {
        const active = activeSuggestion(view.state);
        expect(active?.status).toBe('ready');
        expect(active !== null && active.items.length > 0).toBe(true);
    });
    const active = activeSuggestion(view.state);
    if (active === null) {
        throw new Error('The suggestion list is closed.');
    }

    return active;
};

/** One character before the caret. The browser deletes it; this is that transaction, with no command meta. */
const backspace = (handle: object) => {
    const view = runtimeOf(handle)?.view;
    if (view === undefined || !view.editable) {
        return;
    }

    const { from, empty } = view.state.selection;
    if (!empty || from === 0) {
        return;
    }

    view.dispatch(view.state.tr.delete(from - 1, from));
};

const glyphOf = (view: Mounted['view']) => {
    const active = activeSuggestion(view.state);
    const option = active?.items[active.index];
    const glyph = option?.glyph;
    if (glyph === undefined || glyph === null) {
        throw new Error('The active option has no emoji.');
    }

    return glyph;
};

/** The option id `aria-activedescendant` names, from its `-option-` mark to the end. */
const optionEnding = (id: string) => {
    const at = id.lastIndexOf('-option-');

    return id.slice(at);
};

const namedOption = (view: Mounted['view']) => {
    const id = view.dom.getAttribute('aria-activedescendant');
    if (id === null) {
        throw new Error('The surface names no option.');
    }

    return id;
};

/** Whether a search has put options on the list. A closed list, or one still loading, has not. */
const showedOptions = async (view: Mounted['view']) => {
    try {
        await vi.waitFor(
            () => {
                const active = activeSuggestion(view.state);
                expect(active !== null && active.items.length > 0).toBe(true);
            },
            { timeout: 1000 },
        );

        return true;
    } catch {
        return false;
    }
};

const mountGerman = () => {
    const ref = createRef<EditorHandle>();
    const rendered = render(
        <RichTextEditor
            aria-label="Notes"
            definition={defineEditor({ id: 'test.emoji-de', model, plugins: unitsOf(model) })}
            locale={deDE}
            defaultValue={{
                documentId: 'document-1',
                revision: null,
                document: storedIn(model, [para()]),
            }}
            ref={ref}
        />,
    );
    act(() => {
        vi.advanceTimersToNextFrame();
    });
    const handle = ref.current;
    if (handle === null) {
        throw new Error('The editor did not mount.');
    }

    const view = runtimeOf(handle)?.view;
    if (view === undefined) {
        throw new Error('The editor has no view.');
    }

    return { ...rendered, handle, view };
};

const settle = async (
    resolve: ((entries: readonly EmojiEntry[]) => void) | undefined,
    entries: readonly EmojiEntry[],
) => {
    if (resolve === undefined) {
        throw new Error('No emoji search was waiting.');
    }

    await act(async () => {
        resolve(entries);
        await Promise.resolve();
        await Promise.resolve();
        await Promise.resolve();
        await Promise.resolve();
    });
};

describe('suggestion plugin', () => {
    it('shows a result that names no glyph as one with none', async () => {
        const names = defineEditorPart(core(), {
            suggestions: [
                {
                    trigger: '@',
                    labelKey: 'RichTextEditor_suggestions',
                    rules: { afterPunctuation: false, maxQuery: 32, spaces: false, leadingLetters: 0 },
                    search: () =>
                        Promise.resolve({
                            items: [{ key: 'ada', label: 'Ada', payload: { text: 'Ada' } }],
                            nextCursor: null,
                        }),
                    command: 'text.insert',
                },
            ],
        });
        const { handle, view } = mountText({ model, blocks: [para()], plugins: [names] });
        typeText(handle, '@a');

        const active = await opened(view);

        expect(active.items.map((item) => item.glyph)).toEqual([null]);
    });

    it('shows a host result with a glyph and a detail as its glyph and detail, with no person icon', async () => {
        const party = defineEditorPart(core(), {
            suggestions: [
                {
                    trigger: '@',
                    labelKey: 'RichTextEditor_suggestions',
                    rules: { afterPunctuation: false, maxQuery: 32, spaces: false, leadingLetters: 0 },
                    search: () =>
                        Promise.resolve({
                            items: [
                                { key: 'party', label: 'Party', glyph: '🎉', detail: 'Event', payload: { text: '🎉' } },
                            ],
                            nextCursor: null,
                        }),
                    command: 'text.insert',
                },
            ],
        });
        const { handle, view } = mountText({ model, blocks: [para()], plugins: [party] });
        typeText(handle, '@p');
        await opened(view);

        let option: HTMLElement | null = null;
        await vi.waitFor(() => {
            option = view.dom.ownerDocument.getElementById(namedOption(view));
            expect(option).not.toBeNull();
        });

        expect(option).toHaveTextContent('🎉');
        expect(option).toHaveTextContent('Event');
        expect(option).not.toContainHTML('data-kind');
    });

    it('stores a smiling emoji as plain text when Enter accepts :smi', async () => {
        const { handle, view } = mountText({ model, blocks: [para()] });
        typeText(handle, ':smi');
        const active = await opened(view);
        const glyphs = active.items.map((item) => item.glyph);
        const chosen = glyphOf(view);

        pressKey(handle, 'Enter');

        expect(glyphs.includes('😄') || glyphs.includes('😃')).toBe(true);
        expect(activeSuggestion(view.state)).toBeNull();
        expect(blocksOf(handle)).toEqual([para(text(chosen))]);
    });

    it('stores the active emoji as plain text when Tab accepts :smi', async () => {
        const { handle, view } = mountText({ model, blocks: [para()] });
        typeText(handle, ':smi');
        await opened(view);
        const chosen = glyphOf(view);

        pressKey(handle, 'Tab');

        expect(activeSuggestion(view.state)).toBeNull();
        expect(blocksOf(handle)).toEqual([para(text(chosen))]);
    });

    it('restores :smi with the caret after it in one undo after accepting', async () => {
        const { handle, view } = mountText({ model, blocks: [para()] });
        typeText(handle, ':smi');
        await opened(view);
        pressKey(handle, 'Enter');

        expect(handle.execute('history.undo')).toMatchObject({ status: 'applied' });
        expect(blocksOf(handle)).toEqual([para(text(':smi'))]);
        expect(view.state.selection.empty).toBe(true);
        expect(view.state.selection.$from.parentOffset).toBe(':smi'.length);
    });

    it('keeps :smi closed after Escape until the trigger is deleted, then opens it again', async () => {
        const { handle, view } = mountText({ model, blocks: [para()] });
        typeText(handle, ':smi');
        await opened(view);

        pressKey(handle, 'Escape');
        expect(activeSuggestion(view.state)).toBeNull();
        expect(textOf(handle)).toBe(':smi');

        typeText(handle, 'l');
        expect(activeSuggestion(view.state)).toBeNull();
        expect(textOf(handle)).toBe(':smil');

        const typed = textOf(handle);
        for (let index = 0; index < typed.length; index += 1) {
            backspace(handle);
        }

        expect(textOf(handle)).toBe('');

        typeText(handle, ':smi');
        const again = await opened(view);
        expect(again.query).toBe('smi');
    });

    it('moves the active option with ArrowDown and ArrowUp, wrapping at both ends, without changing the document', async () => {
        const { handle, view } = mountText({ model, blocks: [para()] });
        typeText(handle, ':smi');
        const active = await opened(view);
        const last = active.items.length - 1;
        const before = structuredClone(handle.getSnapshot().document);

        pressKey(handle, 'ArrowUp');
        expect(activeSuggestion(view.state)?.index).toBe(last);
        pressKey(handle, 'ArrowDown');
        expect(activeSuggestion(view.state)?.index).toBe(0);
        for (let step = 0; step < last; step += 1) {
            pressKey(handle, 'ArrowDown');
        }

        expect(activeSuggestion(view.state)?.index).toBe(last);
        pressKey(handle, 'ArrowDown');

        expect(activeSuggestion(view.state)?.index).toBe(0);
        expect(active.items.length).toBeGreaterThan(1);
        expect(handle.getSnapshot().document).toEqual(before);
    });

    it('opens :smi after a space, at the block start and after a hard break, and not for 12:30, :), :s or a:smi', async () => {
        for (const typed of ['12:30', ':)', ':s', 'a:smi']) {
            const closed = mountText({ model, blocks: [para()] });
            typeText(closed.handle, typed);
            expect(activeSuggestion(closed.view.state)).toBeNull();
            expect(textOf(closed.handle)).toBe(typed);
            closed.unmount();
        }

        const spaced = mountText({ model, blocks: [para()] });
        typeText(spaced.handle, 'Say :smi');
        const spacedList = await opened(spaced.view);
        expect(spacedList.query).toBe('smi');
        spaced.unmount();

        const start = mountText({ model, blocks: [para()] });
        typeText(start.handle, ':smi');
        const startList = await opened(start.view);
        expect(startList.query).toBe('smi');
        start.unmount();

        const broken = mountText({
            model,
            blocks: [para(text('Hi'), { type: 'hard_break' }, text('x'))],
        });
        setSelection(broken.handle, { text: 'x', from: 0, to: 0 });
        typeText(broken.handle, ':smi');
        const brokenList = await opened(broken.view);
        expect(brokenList.query).toBe('smi');
        broken.unmount();
    });

    it('opens no list inside a code block or inside a code mark', () => {
        const block = mountText({ model, blocks: [codeNode('')] });
        typeText(block.handle, ':smi');
        const marked = mountText({ model, blocks: [para(text('ab', 'code'))] });
        setSelection(marked.handle, { text: 'ab', from: 1, to: 1 });
        typeText(marked.handle, ':smi');

        expect(textOf(block.handle)).toBe(':smi');
        expect(activeSuggestion(block.view.state)).toBeNull();
        expect(codeText(marked.handle)).toContain(':smi');
        expect(activeSuggestion(marked.view.state)).toBeNull();
        block.unmount();
        marked.unmount();
    });

    it('opens no list when :smi is pasted', () => {
        const { handle, view } = mountText({ model, blocks: [para()] });

        act(() => {
            paste(handle, { text: ':smi' });
        });

        expect(textOf(handle)).toBe(':smi');
        expect(activeSuggestion(view.state)).toBeNull();
    });

    it('drops a result that arrives after the query changed from :smi to :smil', async () => {
        gate.hold = true;
        const { handle, view } = mountText({ model, blocks: [para()] });
        typeText(handle, ':smi');
        // A typed query waits out the search delay before the list asks.
        await vi.advanceTimersByTimeAsync(SEARCH_DELAY_MS);
        const started = gate.pending.length;
        typeText(handle, 'l');
        await vi.advanceTimersByTimeAsync(SEARCH_DELAY_MS);
        const smil = gate.pending.at(-1);
        const earlier = gate.pending.slice(0, -1);
        const stale: readonly EmojiEntry[] = [
            {
                emoji: '🎉',
                label: 'smi party',
                keywords: ['smi'],
                searchLabel: 'smi party',
                labelWords: ['smi', 'party'],
                order: 1,
            },
        ];
        const fresh: readonly EmojiEntry[] = [
            {
                emoji: '😄',
                label: 'smiling',
                keywords: ['smil'],
                searchLabel: 'smiling',
                labelWords: ['smiling'],
                order: 1,
            },
        ];

        expect(started).toBeGreaterThan(0);
        expect(earlier.length).toBe(started);
        for (const resolve of earlier) {
            await settle(resolve, stale);
        }

        expect(activeSuggestion(view.state)?.query).toBe('smil');
        expect(activeSuggestion(view.state)?.items.some((item) => item.glyph === '🎉')).toBe(false);

        await settle(smil, fresh);

        expect(textOf(handle)).toBe(':smil');
        expect(activeSuggestion(view.state)?.query).toBe('smil');
        expect(activeSuggestion(view.state)?.items.map((item) => item.glyph)).toEqual(['😄']);
    });

    it('ends a held emoji search as failed with Retry when the host services change', async () => {
        gate.hold = true;
        const { handle, view } = mountText({ model, blocks: [para()] });
        typeText(handle, ':smi');
        await vi.advanceTimersByTimeAsync(SEARCH_DELAY_MS);

        expect(gate.pending.length).toBeGreaterThan(0);

        act(() => {
            runtimeOf(handle)?.changeServices(['references']);
        });

        await vi.waitFor(() => {
            expect(activeSuggestion(view.state)?.status).toBe('failed');
        });
        expect(screen.queryAllByRole('option').map((option) => option.textContent)).toEqual(['Retry']);
    });

    it('finds an emoji whose label is German for :lach when the editor locale is de-DE', async () => {
        const { handle, view, unmount } = mountGerman();
        typeText(handle, ':lach');
        const active = await opened(view);

        expect(active.query).toBe('lach');
        expect(active.items.some((item) => item.label.toLowerCase().includes('lach'))).toBe(true);
        unmount();
    });

    it('changes aria-activedescendant when another emoji takes the active place and when ArrowDown moves it', async () => {
        const { handle, view } = mountText({ model, blocks: [para()] });
        typeText(handle, ':smi');
        await opened(view);
        await vi.waitFor(() => {
            expect(view.dom.ownerDocument.getElementById(namedOption(view))).not.toBeNull();
        });
        const named = namedOption(view);
        const firstGlyph = glyphOf(view);

        typeText(handle, 'le');
        await vi.waitFor(() => {
            const active = activeSuggestion(view.state);
            expect(active?.status).toBe('ready');
            expect(glyphOf(view)).not.toBe(firstGlyph);
        });
        const replaced = namedOption(view);

        expect(replaced).not.toBe(named);
        expect(optionEnding(replaced)).not.toBe(optionEnding(named));
        expect(view.dom.ownerDocument.getElementById(replaced)).not.toBeNull();

        pressKey(handle, 'ArrowDown');
        const moved = namedOption(view);

        expect(moved).not.toBe(replaced);
        expect(optionEnding(moved)).not.toBe(optionEnding(replaced));
    });

    it('keeps :smi closed after Escape when a selection crosses the trigger and collapses at the end', async () => {
        const { handle, view } = mountText({ model, blocks: [para()] });
        typeText(handle, ':smi');
        await opened(view);
        pressKey(handle, 'Escape');
        setSelection(handle, { text: ':smi', from: 0, to: ':smi'.length });
        setSelection(handle, { text: ':smi', from: ':smi'.length, to: ':smi'.length });

        typeText(handle, 'l');
        const active = activeSuggestion(view.state);
        if (active !== null) {
            expect(await showedOptions(view)).toBe(false);
        }

        const closed = activeSuggestion(view.state);
        expect(closed === null || closed.items.length === 0).toBe(true);
        expect(textOf(handle)).toBe(':smil');
    });

    it('shows no emoji options and no emoji button when the policy forbids creating emoji', async () => {
        const { handle, view } = mountText({
            model,
            blocks: [para()],
            policy: { features: { emoji: { ...ALLOW, create: false } } },
            toolbar: [['emoji.picker.open']],
        });
        typeText(handle, ':smi');

        expect(await showedOptions(view)).toBe(false);
        const active = activeSuggestion(view.state);
        expect(active === null || active.items.length === 0).toBe(true);
        expect(textOf(handle)).toBe(':smi');
        expect(screen.queryByRole('button', { name: 'Emoji' })).toBeNull();
    });

    it('reports text.insert when Enter accepts an emoji from :smi', async () => {
        const { handle, view } = mountText({ model, blocks: [para()] });
        typeText(handle, ':smi');
        await opened(view);
        const reported: string[] = [];
        handle.subscribe('documentChange', (change) => {
            if (change.commandId !== null) {
                reported.push(change.commandId);
            }
        });

        pressKey(handle, 'Enter');

        expect(reported).toEqual(['text.insert']);
    });

    it('keeps :smi and closes the list when Enter follows a policy that forbids creating emoji', async () => {
        const { handle, view } = mountText({ model, blocks: [para()] });
        typeText(handle, ':smi');
        await opened(view);
        const { authoring } = defineEditor({ id: 'test.text', model, plugins: unitsOf(model) });
        handle.updatePolicy({
            ...authoring,
            features: {
                ...authoring.features,
                emoji: { ...ALLOW, create: false },
            },
        });

        pressKey(handle, 'Enter');

        expect(textOf(handle)).toBe(':smi');
        expect(activeSuggestion(view.state)).toBeNull();
    });

    it('keeps :smi and the open list when Enter follows a composition, then inserts the emoji once input has settled', async () => {
        const { handle, view } = mountText({ model, blocks: [para()] });
        typeText(handle, ':smi');
        await opened(view);
        const chosen = glyphOf(view);

        act(() => {
            view.dom.dispatchEvent(new CompositionEvent('compositionstart'));
            view.dom.dispatchEvent(new CompositionEvent('compositionend'));
            pressKey(handle, 'Enter');
        });

        expect(textOf(handle)).toBe(':smi');
        const held = activeSuggestion(view.state);
        expect(held !== null && held.items.length > 0).toBe(true);

        await act(async () => {
            await vi.advanceTimersByTimeAsync(0);
            await vi.advanceTimersByTimeAsync(SETTLE_MS);
        });
        pressKey(handle, 'Enter');

        expect(activeSuggestion(view.state)).toBeNull();
        expect(blocksOf(handle)).toEqual([para(text(chosen))]);
    });

    it('restores :smi on undo after accepting an emoji and leaves a further Enter unable to insert it again', async () => {
        const { handle, view } = mountText({ model, blocks: [para()] });
        typeText(handle, ':smi');
        await opened(view);
        const chosen = glyphOf(view);
        pressKey(handle, 'Enter');

        expect(handle.execute('history.undo')).toMatchObject({ status: 'applied' });
        await act(async () => {
            await Promise.resolve();
        });

        expect(blocksOf(handle)).toEqual([para(text(':smi'))]);
        const restored = activeSuggestion(view.state);
        expect(restored === null || restored.items.length === 0).toBe(true);

        pressKey(handle, 'Enter');

        expect(textOf(handle)).toBe(':smi');
        expect(JSON.stringify(blocksOf(handle))).not.toContain(chosen);
    });
});

describe('the emoji list in the shipped profiles', () => {
    it.each(['comment', 'document', 'brand-document'] as const)(
        'opens on :smi and inserts the first emoji on Enter, and opens no list for 12:30, in %s',
        async (profile) => {
            const time = await mountProfile(profile);
            const emojiProfile = await mountProfile(profile);
            act(() => {
                vi.advanceTimersToNextFrame();
            });
            typeText(time.handle, '12:30');
            typeText(emojiProfile.handle, ':smi');

            expect(activeSuggestion(time.view.state)).toBeNull();
            expect(JSON.stringify(time.content())).toContain('12:30');
            const active = await opened(emojiProfile.view);
            const chosen = active.items[0]?.glyph;
            pressKey(emojiProfile.handle, 'Enter');

            expect(chosen).toBeTruthy();
            expect(activeSuggestion(emojiProfile.view.state)).toBeNull();
            expect(JSON.stringify(emojiProfile.content())).toContain(chosen as string);
            expect(JSON.stringify(emojiProfile.content())).not.toContain(':smi');
        },
    );
});
