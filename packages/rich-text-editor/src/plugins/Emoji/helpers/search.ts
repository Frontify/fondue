/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EmojiItem } from '../types';

/** What a shortcode may hold: what is typed after the `:` stays a query only while it is made of these. */
export const SHORTCODE_CHARACTERS = /^[\w+-]*$/;

const words = (text: string): string[] => text.toLowerCase().split(/[\s_:-]+/);

/**
 * How well an emoji answers a query, lower is better, or null when it does
 * not: a shortcode that is the query, then one that starts with it, then a
 * word of a shortcode or the name that does, then a search word, then any
 * shortcode or name containing it.
 */
const rank = (item: EmojiItem, needle: string): number | null => {
    const shortcodes = item.shortcodes.map((code) => code.toLowerCase());
    if (shortcodes.includes(needle)) {
        return 0;
    }
    if (shortcodes.some((code) => code.startsWith(needle))) {
        return 1;
    }
    if ([...shortcodes.flatMap(words), ...words(item.name)].some((word) => word.startsWith(needle))) {
        return 2;
    }
    if ((item.keywords ?? []).some((keyword) => keyword.toLowerCase().startsWith(needle))) {
        return 3;
    }
    if ([...shortcodes, item.name.toLowerCase()].some((text) => text.includes(needle))) {
        return 4;
    }
    return null;
};

/** The emoji matching a query, best first, ties in list order. An empty query matches none. */
export const searchEmojis = (emojis: readonly EmojiItem[], query: string, limit = Infinity): EmojiItem[] => {
    const needle = query.trim().toLowerCase();
    if (needle === '') {
        return [];
    }
    return emojis
        .flatMap((item, index) => {
            const score = rank(item, needle);
            return score === null ? [] : [{ item, score, index }];
        })
        .sort((first, second) => first.score - second.score || first.index - second.index)
        .slice(0, limit)
        .map(({ item }) => item);
};

/** The emoji a shortcode names exactly — what `:smile:` turns into — or undefined. */
export const findByShortcode = (emojis: readonly EmojiItem[], shortcode: string): EmojiItem | undefined => {
    const needle = shortcode.toLowerCase();
    return emojis.find((item) => item.shortcodes.some((code) => code.toLowerCase() === needle));
};

/** The emoji by section, sections in the order their first emoji appears. */
export const byCategory = (emojis: readonly EmojiItem[]): [category: string, items: EmojiItem[]][] => {
    const sections = new Map<string, EmojiItem[]>();
    for (const item of emojis) {
        const section = sections.get(item.category);
        if (section) {
            section.push(item);
        } else {
            sections.set(item.category, [item]);
        }
    }
    return [...sections];
};
