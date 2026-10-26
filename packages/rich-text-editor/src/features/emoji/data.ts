/* (c) Copyright Frontify Ltd., all rights reserved. */

export type EmojiEntry = {
    /** The emoji as Unicode text, which the editor inserts. */
    readonly emoji: string;
    /** The CLDR name in the data locale. */
    readonly label: string;
    /** Lowercased, diacritics-free search words: the localized label and tags, then the English label and tags. */
    readonly keywords: readonly string[];
    /** The label lowercased and diacritics-free, and its words, computed once at load so a search normalizes only its query. */
    readonly searchLabel: string;
    readonly labelWords: readonly string[];
    readonly order: number;
};

export type EmojiDataLocale = 'de' | 'en' | 'es' | 'fr' | 'it' | 'nl' | 'pl' | 'pt';

type CompactEmoji = {
    readonly hexcode: string;
    readonly label: string;
    readonly unicode: string;
    readonly group?: number;
    readonly order?: number;
    readonly tags?: readonly string[];
};

type CompactModule = {
    readonly default: readonly CompactEmoji[];
};

type ScoredEmoji = {
    readonly entry: EmojiEntry;
    readonly rank: number;
};

// Emojibase group 2 is a skin-tone component. Entries with no group are regional indicators, not emoji.
const SKIN_TONE_GROUP = 2;
// A missing order sorts after every entry that has one.
const LAST_ORDER = Number.POSITIVE_INFINITY;

const loaders: { readonly [Locale in EmojiDataLocale]: () => Promise<CompactModule> } = {
    de: () => import('emojibase-data/de/compact.json') as Promise<CompactModule>,
    en: () => import('emojibase-data/en/compact.json') as Promise<CompactModule>,
    es: () => import('emojibase-data/es/compact.json') as Promise<CompactModule>,
    fr: () => import('emojibase-data/fr/compact.json') as Promise<CompactModule>,
    it: () => import('emojibase-data/it/compact.json') as Promise<CompactModule>,
    nl: () => import('emojibase-data/nl/compact.json') as Promise<CompactModule>,
    pl: () => import('emojibase-data/pl/compact.json') as Promise<CompactModule>,
    pt: () => import('emojibase-data/pt/compact.json') as Promise<CompactModule>,
};

const cached = new Map<EmojiDataLocale, Promise<readonly EmojiEntry[]>>();

const normalizeText = (value: string): string => value.normalize('NFD').replaceAll(/\p{M}/gu, '').toLowerCase();

const wordsOf = (value: string): readonly string[] => {
    const words: string[] = [];
    for (const word of normalizeText(value).split(/[^\p{L}\p{N}]+/u)) {
        if (word !== '') {
            words.push(word);
        }
    }

    return words;
};

const wordsFromTags = (tags: readonly string[] | undefined): readonly string[] => {
    if (tags === undefined) {
        return [];
    }

    const words: string[] = [];
    for (const tag of tags) {
        for (const word of wordsOf(tag)) {
            words.push(word);
        }
    }

    return words;
};

const uniqueWords = (groups: readonly (readonly string[])[]): readonly string[] => {
    const seen = new Set<string>();
    const keywords: string[] = [];
    for (const group of groups) {
        for (const word of group) {
            if (seen.has(word)) {
                continue;
            }

            seen.add(word);
            keywords.push(word);
        }
    }

    return keywords;
};

const isDataLocale = (language: string): language is EmojiDataLocale => Object.hasOwn(loaders, language);

const languageOf = (locale: string): string => {
    const lowered = locale.toLowerCase();
    const hyphen = lowered.indexOf('-');
    if (hyphen === -1) {
        return lowered;
    }

    return lowered.slice(0, hyphen);
};

const isListedEmoji = (entry: CompactEmoji): boolean => {
    if (entry.group === undefined) {
        return false;
    }

    return entry.group !== SKIN_TONE_GROUP;
};

const orderOf = (entry: CompactEmoji): number => {
    if (entry.order === undefined) {
        return LAST_ORDER;
    }

    return entry.order;
};

const keywordsOf = (localized: CompactEmoji, english: CompactEmoji | undefined): readonly string[] => {
    const groups = [wordsOf(localized.label), wordsFromTags(localized.tags)];
    if (english !== undefined) {
        groups.push(wordsOf(english.label), wordsFromTags(english.tags));
    }

    return uniqueWords(groups);
};

const compareOrder = (left: EmojiEntry, right: EmojiEntry): number => {
    if (left.order === right.order) {
        return 0;
    }

    if (left.order < right.order) {
        return -1;
    }

    return 1;
};

const indexByHex = (entries: readonly CompactEmoji[]): ReadonlyMap<string, CompactEmoji> => {
    const index = new Map<string, CompactEmoji>();
    for (const entry of entries) {
        index.set(entry.hexcode, entry);
    }

    return index;
};

const toEntry = (entry: CompactEmoji, english: CompactEmoji | undefined): EmojiEntry => ({
    emoji: entry.unicode,
    label: entry.label,
    keywords: keywordsOf(entry, english),
    searchLabel: normalizeText(entry.label),
    labelWords: wordsOf(entry.label),
    order: orderOf(entry),
});

const entriesOf = (
    localized: readonly CompactEmoji[],
    english: readonly CompactEmoji[] | undefined,
): readonly EmojiEntry[] => {
    let englishByHex: ReadonlyMap<string, CompactEmoji> | undefined;
    if (english !== undefined) {
        englishByHex = indexByHex(english);
    }

    const entries: EmojiEntry[] = [];
    for (const entry of localized) {
        if (!isListedEmoji(entry)) {
            continue;
        }

        let match: CompactEmoji | undefined;
        if (englishByHex !== undefined) {
            match = englishByHex.get(entry.hexcode);
        }

        entries.push(toEntry(entry, match));
    }

    entries.sort(compareOrder);

    return entries;
};

const readCompact = async (locale: EmojiDataLocale): Promise<readonly CompactEmoji[]> => {
    const loaded = await loaders[locale]();

    return loaded.default;
};

const assemble = async (locale: EmojiDataLocale): Promise<readonly EmojiEntry[]> => {
    if (locale === 'en') {
        return entriesOf(await readCompact('en'), undefined);
    }

    const [localized, english] = await Promise.all([readCompact(locale), readCompact('en')]);

    return entriesOf(localized, english);
};

const loadCached = (locale: EmojiDataLocale): Promise<readonly EmojiEntry[]> => {
    const existing = cached.get(locale);
    if (existing !== undefined) {
        return existing;
    }

    const pending = assemble(locale).catch((error: unknown) => {
        if (cached.get(locale) === pending) {
            cached.delete(locale);
        }

        throw error;
    });
    cached.set(locale, pending);

    return pending;
};

const startsWithWord = (words: readonly string[], query: string): boolean => {
    for (const word of words) {
        if (word.startsWith(query)) {
            return true;
        }
    }

    return false;
};

const rankOf = (entry: EmojiEntry, query: string): number | undefined => {
    if (entry.searchLabel.startsWith(query)) {
        return 0;
    }

    if (startsWithWord(entry.labelWords, query)) {
        return 1;
    }

    if (startsWithWord(entry.keywords, query)) {
        return 2;
    }

    return undefined;
};

const compareRanked = (left: ScoredEmoji, right: ScoredEmoji): number => {
    if (left.rank !== right.rank) {
        if (left.rank < right.rank) {
            return -1;
        }

        return 1;
    }

    return compareOrder(left.entry, right.entry);
};

const normalizedQuery = (query: string): string | undefined => {
    const normalized = normalizeText(query).trim();
    if (normalized === '') {
        return undefined;
    }

    return normalized;
};

/** Maps an editor locale such as `de-CH` or `pt-PT` to its emoji data; any other language falls back to English. */
export const emojiDataLocaleOf = (locale: string): EmojiDataLocale => {
    const language = languageOf(locale);
    if (isDataLocale(language)) {
        return language;
    }

    return 'en';
};

/** Loads, merges and caches the entries for a locale on first call; resolves to entries sorted by `order`. */
export const loadEmoji = (locale: string): Promise<readonly EmojiEntry[]> => loadCached(emojiDataLocaleOf(locale));

/** Entries whose words start with `query`, best first, at most `limit`. An empty or whitespace query returns none. */
export const searchEmoji = (entries: readonly EmojiEntry[], query: string, limit: number): readonly EmojiEntry[] => {
    if (limit <= 0) {
        return [];
    }

    const normalized = normalizedQuery(query);
    if (normalized === undefined) {
        return [];
    }

    const scored: ScoredEmoji[] = [];
    for (const entry of entries) {
        const rank = rankOf(entry, normalized);
        if (rank === undefined) {
            continue;
        }

        scored.push({ entry, rank });
    }

    scored.sort(compareRanked);

    return scored.slice(0, limit).map((scoredEntry) => scoredEntry.entry);
};
