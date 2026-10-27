/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type EditorControlApi } from '#/core';

import { emojiPlugin } from './Emoji';
import { defaultEmojis } from './helpers/emojis';
import { byCategory, findByShortcode, searchEmojis, SHORTCODE_CHARACTERS } from './helpers/search';
import { type EmojiItem } from './types';

const item = (emoji: string, shortcodes: string[], name: string, keywords: string[] = []): EmojiItem => ({
    emoji,
    shortcodes,
    name,
    keywords,
    category: 'Test',
});

const SMILE = item('😄', ['smile'], 'Grinning face with smiling eyes', ['happy']);
const SMILEY_CAT = item('😺', ['smiley_cat'], 'Grinning cat');
const SMIRK = item('😏', ['smirk'], 'Smirking face');
const JOY = item('😂', ['joy'], 'Face with tears of joy', ['laugh']);
const LIST = [SMILEY_CAT, SMIRK, JOY, SMILE];

describe('the emoji plugin', () => {
    it('starts a draft on a typed colon', () => {
        const inserted: string[] = [];
        const api = { insert: (type: string) => inserted.push(type) } as unknown as EditorControlApi;

        emojiPlugin().hotkeys?.[':']?.(api);

        expect(inserted).toEqual(['emojiDraft']);
    });

    it('reads nothing pasted as a draft', () => {
        expect(emojiPlugin().inlines?.emojiDraft?.parse).toEqual([]);
    });
});

describe('searching emoji', () => {
    it('ranks a whole shortcode first, then shortcodes it starts, then words', () => {
        expect(searchEmojis(LIST, 'smile')).toEqual([SMILE, SMILEY_CAT]);
        expect(searchEmojis(LIST, 'smi')).toEqual([SMILEY_CAT, SMIRK, SMILE]);
    });

    it('finds by name and search words, ignoring case', () => {
        expect(searchEmojis(LIST, 'TEARS')).toEqual([JOY]);
        expect(searchEmojis(LIST, 'laugh')).toEqual([JOY]);
        expect(searchEmojis(LIST, 'cat')).toEqual([SMILEY_CAT]);
    });

    it('offers nothing for an empty query, and stops at the limit', () => {
        expect(searchEmojis(LIST, '')).toEqual([]);
        expect(searchEmojis(LIST, 'g', 1)).toHaveLength(1);
    });

    it('finds the emoji a whole shortcode names, and only that', () => {
        expect(findByShortcode(LIST, 'Smile')).toBe(SMILE);
        expect(findByShortcode(LIST, 'smi')).toBeUndefined();
    });

    it('takes only what a shortcode can hold as a query', () => {
        expect(SHORTCODE_CHARACTERS.test('+1')).toBe(true);
        expect(SHORTCODE_CHARACTERS.test('thumbs_up')).toBe(true);
        expect(SHORTCODE_CHARACTERS.test('e-mail')).toBe(true);
        expect(SHORTCODE_CHARACTERS.test('a b')).toBe(false);
        expect(SHORTCODE_CHARACTERS.test('//')).toBe(false);
        expect(SHORTCODE_CHARACTERS.test(')')).toBe(false);
    });
});

describe('the shipped emoji', () => {
    it('gives every emoji a name and a shortcode no other emoji has', () => {
        const codes = defaultEmojis.flatMap((emoji) => emoji.shortcodes);

        expect(defaultEmojis.every((emoji) => emoji.name !== '' && emoji.shortcodes.length > 0)).toBe(true);
        expect(new Set(codes).size).toBe(codes.length);
        expect(codes.every((code) => SHORTCODE_CHARACTERS.test(code))).toBe(true);
    });

    it('lists every emoji once', () => {
        const characters = defaultEmojis.map((emoji) => emoji.emoji);

        expect(new Set(characters).size).toBe(characters.length);
    });

    it('answers the shortcodes people type most', () => {
        for (const [code, emoji] of [
            ['smile', '😄'],
            ['+1', '👍'],
            ['heart', '❤️'],
            ['tada', '🎉'],
            ['joy', '😂'],
            ['fire', '🔥'],
            ['rocket', '🚀'],
            ['white_check_mark', '✅'],
        ]) {
            expect(findByShortcode(defaultEmojis, code ?? '')?.emoji).toBe(emoji);
        }
    });

    it('groups them into sections in list order', () => {
        expect(byCategory(defaultEmojis).map(([category]) => category)[0]).toBe('Smileys');
        const dog = { ...item('🐶', ['dog'], 'Dog'), category: 'Animals' };

        expect(byCategory([SMILE, dog, SMIRK])).toEqual([
            ['Test', [SMILE, SMIRK]],
            ['Animals', [dog]],
        ]);
    });
});
