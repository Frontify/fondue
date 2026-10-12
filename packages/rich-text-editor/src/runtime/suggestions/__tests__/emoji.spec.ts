/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, it, vi } from 'vitest';

import { type EmojiEntry, emojiDataLocaleOf, loadEmoji, searchEmoji } from '../emoji';

/** A hand-built entry whose search fields follow its label, as loading computes them. */
const entry = (emoji: string, label: string, keywords: readonly string[], order: number): EmojiEntry => ({
    emoji,
    label,
    keywords,
    searchLabel: label.toLowerCase(),
    labelWords: label.toLowerCase().split(' '),
    order,
});

const ranked: readonly EmojiEntry[] = [
    entry('late', 'Alpha late', ['alpha', 'late'], 30),
    entry('word', 'Red alpha', ['red', 'alpha'], 3),
    entry('keyword', 'Red', ['red', 'alpha'], 1),
    entry('early', 'Alpha early', ['alpha', 'early'], 10),
    entry('tied', 'Alpha tied', ['alpha', 'tied'], 10),
];

describe('emoji suggestions', () => {
    it('maps a regional editor locale to emoji data and falls back to English', () => {
        expect(emojiDataLocaleOf('de-CH')).toBe('de');
        expect(emojiDataLocaleOf('de-DE')).toBe('de');
        expect(emojiDataLocaleOf('pt-PT')).toBe('pt');
        expect(emojiDataLocaleOf('en-US')).toBe('en');
        expect(emojiDataLocaleOf('ja-JP')).toBe('en');
    });

    it('ranks a German label containing lach ahead of a keyword-only match', async () => {
        const entries = await loadEmoji('de-DE');
        const found = searchEmoji(entries, 'lach', 50);
        const labelIndex = found.findIndex((entry) => entry.label.toLowerCase().includes('lach'));
        const keywordIndex = found.findIndex((entry) => !entry.label.toLowerCase().includes('lach'));

        expect(labelIndex).toBeGreaterThanOrEqual(0);
        expect(keywordIndex).toBeGreaterThan(labelIndex);
    });

    it('finds the grinning face in German data from the English word grin', async () => {
        const entries = await loadEmoji('de-DE');
        const grinning = entries.find((entry) => entry.emoji === '😀');

        expect(searchEmoji(entries, 'grin', 5).some((entry) => entry.emoji === '😀')).toBe(true);
        expect(grinning?.keywords).toContain('cheerful');
    });

    it('leaves out skin-tone components and regional indicators', async () => {
        const entries = await loadEmoji('en-US');

        expect(entries.some((entry) => entry.emoji === '🏻')).toBe(false);
        expect(entries.some((entry) => entry.emoji === '🇦')).toBe(false);
    });

    it('ranks a label prefix before a label word and a keyword, breaking ties by order', () => {
        expect(searchEmoji(ranked, 'alpha', 10).map((entry) => entry.emoji)).toEqual([
            'early',
            'tied',
            'late',
            'word',
            'keyword',
        ]);
        expect(searchEmoji(ranked, 'alpha', 2).map((entry) => entry.emoji)).toEqual(['early', 'tied']);
    });

    it('returns nothing for an empty query or a non-positive limit', () => {
        expect(searchEmoji(ranked, '', 5)).toEqual([]);
        expect(searchEmoji(ranked, '   ', 5)).toEqual([]);
        expect(searchEmoji(ranked, 'alpha', 0)).toEqual([]);
        expect(searchEmoji(ranked, 'alpha', -1)).toEqual([]);
    });

    it('returns the same list for a locale it already loaded', async () => {
        const first = await loadEmoji('de-CH');
        const second = await loadEmoji('de-DE');

        expect(second).toBe(first);
    });

    it('rejects a failed load and loads the list on the next call', async () => {
        let fail = true;
        vi.doMock('emojibase-data/pl/compact.json', () => {
            if (fail) {
                throw new Error('unavailable');
            }
            return {
                default: [
                    {
                        hexcode: '1F600',
                        label: 'polski grin',
                        unicode: '😀',
                        group: 0,
                        order: 4,
                        tags: ['uśmiech'],
                    },
                ],
            };
        });

        let rejection: unknown;
        try {
            await loadEmoji('pl');
        } catch (error) {
            rejection = error;
        }
        if (!(rejection instanceof Error) || !(rejection.cause instanceof Error)) {
            throw new Error('expected the loader to reject');
        }
        expect(rejection.cause.message).toBe('unavailable');
        fail = false;
        const loaded = await loadEmoji('pl');
        const entry = loaded[0];

        expect(entry?.emoji).toBe('😀');
        expect(entry?.label).toBe('polski grin');
        expect(entry?.keywords).toContain('cheerful');
    });
});
