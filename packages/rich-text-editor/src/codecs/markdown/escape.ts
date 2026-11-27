/* (c) Copyright Frontify Ltd., all rights reserved. */

// What the writer escapes in text so that reading it back gives the same text.

import { MARKDOWN_ENTITY_START, MAX_ORDINAL_DIGITS } from '#/core';

/** Where in a line the text sits: the start also escapes what would begin a block. */
export type TextPosition = 'lineStart' | 'inline';

/** Whether the text is a link's text, where Markdown reads no other link, so it needs no escape that only stops one. */
export type TextScope = 'text' | 'linkText';

/** The Markdown written right before and after the text, where a `~` beside it joins a run of them. */
export type TextNeighbours = { before: string; after: string };

/** The characters Markdown reads anywhere in a line: `* ` [`, and `_` outside a word. */
const ESCAPED_CHARACTERS = /[*`[]/g;

/** A `]` closes the label of a link, which only a link's text has open. */
const LABEL_CLOSE = /]/g;

/** A `\` before ASCII punctuation, a line break or the end of the text, where it escapes or breaks the line. */
const BACKSLASH_BEFORE_ESCAPABLE = /\\(?=[!-/:-@[-`{-~]|\n|$)/g;

/** A `~` next to another, as a reader strikes through only between two of them. */
const TILDE_NEXT_TO_TILDE = /~(?=~)|(?<=~)~/g;

/** A URI scheme as CommonMark reads it in an autolink: a letter, then 1 to 31 letters, digits, `+`, `.` or `-`. */
const URI_SCHEME = '[a-zA-Z][a-zA-Z0-9+.-]{1,31}';

/** The local part of an email address as CommonMark reads it in an autolink. */
const EMAIL_LOCAL_PART = String.raw`[a-zA-Z0-9.!#$%&'*+/=?^_\`{|}~-]+`;

/** A `<` right before a URI scheme and `:`, or an email's local part and `@`, where a reader may open an autolink. */
const AUTOLINK_START = new RegExp(`<(?=${URI_SCHEME}:|${EMAIL_LOCAL_PART}@)`, 'g');

/** An `_` that is not between two letters or digits, the only place a reader opens or closes emphasis with it. */
const UNDERSCORE_OUTSIDE_WORD = /(?<![\p{L}\p{N}])_|_(?![\p{L}\p{N}])/gu;

/** What starts a quote, a bullet or a rule at the start of a line, after any indent. */
const LINE_START_MARKER = /^([ \t]*)(>|[-+](?=[ \t]|$)|-+[ \t]*$)/;

/** A run of 1 to 6 `#` followed by a space, a tab or the end of the line, which is an ATX heading; its first `#` is the one to escape. */
const LINE_START_HEADING = /^([ \t]*)(#)(?=#{0,5}(?:[ \t]|$))/;

/** A line of only `=` and trailing spaces, which is a setext underline; its first `=` is the one to escape. */
const LINE_START_UNDERLINE = /^([ \t]*)(=)(?==*[ \t]*$)/;

/** A line of only `|`, `:`, `-`, spaces and tabs; with a `-` it is the shape of a table delimiter row. */
const DELIMITER_ROW_CHARACTERS = /^[|:\t -]*$/;

const FIRST_DELIMITER_MARK = /[-:]/;

const DELIMITER_ROW_DASH = '-';

/** An ordinal that starts a numbered list (`1.`, `2)`), whose `.` or `)` is the character to escape. */
const LINE_START_ORDINAL = new RegExp(String.raw`^([ \t]*\d{1,${MAX_ORDINAL_DIGITS}})([.)])(?=[ \t]|$)`);

/** A run of `#` that ends a single line after a space, or is all of it, which an ATX heading reads as its closing run. */
const CLOSING_HASHES = /(^|[ \t])(#+)(?=[ \t]*$)/;

/** A `:` or `/` before a `/`, which makes `scheme://` and `//` an address a reader links. */
const SCHEME_SEPARATOR = /[:/](?=\/)/g;

/** The `.` after `www` in any case, which starts an address a reader links. */
const WWW_DOT = /(?<=www)\./gi;

/** An `@` that is not at the start of a line or right after whitespace, where a reader may link an email address. */
const EMAIL_AT = /(?<!^|\s)@/g;

/** A run of non-whitespace, which is as far as a reader's autolink reaches. */
const WORD = /\S+/gu;

/** A `!` that ends the text, which would make a link written right after it an image. */
const TRAILING_BANG = /!$/;

const WHITESPACE = /^\s$/u;

const BACKSLASH = '\\';

/** Keeps the first group and puts a backslash before the second. */
const BACKSLASH_SECOND_GROUP = String.raw`$1\$2`;
const BACKSLASH_MATCH = String.raw`\$&`;

/** Each pattern matches only the character to escape, so a match's index is where a backslash goes. */
const EVERYWHERE_PATTERNS: readonly RegExp[] = [
    ESCAPED_CHARACTERS,
    UNDERSCORE_OUTSIDE_WORD,
    AUTOLINK_START,
    MARKDOWN_ENTITY_START,
];

const ADDRESS_PATTERNS: readonly RegExp[] = [SCHEME_SEPARATOR, WWW_DOT, EMAIL_AT];

const patternsOf = (scope: TextScope): readonly RegExp[] => {
    switch (scope) {
        case 'text':
            return [...EVERYWHERE_PATTERNS, ...ADDRESS_PATTERNS];
        case 'linkText':
            return [...EVERYWHERE_PATTERNS, LABEL_CLOSE];
    }
};

/** Where a pattern matches in the original text, so that no escape reads another. */
const indexesOf = (text: string, patterns: readonly RegExp[]): Set<number> => {
    const indexes = new Set<number>();
    for (const pattern of patterns) {
        for (const match of text.matchAll(pattern)) {
            indexes.add(match.index);
        }
    }

    return indexes;
};

const hasEscape = (indexes: ReadonlySet<number>, start: number, end: number): boolean => {
    for (let index = start; index < end; index++) {
        if (indexes.has(index)) {
            return true;
        }
    }

    return false;
};

/** In a link's text a reader takes a backslash into an address, so a word that has an escape also needs its address escapes. */
const addAddressEscapesInEscapedWords = (text: string, indexes: Set<number>): void => {
    const addressIndexes = indexesOf(text, ADDRESS_PATTERNS);
    for (const match of text.matchAll(WORD)) {
        const start = match.index;
        const end = start + match[0].length;
        if (!hasEscape(indexes, start, end)) {
            continue;
        }

        for (let index = start; index < end; index++) {
            if (addressIndexes.has(index)) {
                indexes.add(index);
            }
        }
    }
};

/** The `~` of the text that sits next to another, in the text or in the Markdown written right beside it. */
const tildeIndexesOf = (text: string, { before, after }: TextNeighbours): Set<number> => {
    const lead = before.slice(-1);
    const indexes = new Set<number>();
    for (const match of `${lead}${text}${after.slice(0, 1)}`.matchAll(TILDE_NEXT_TO_TILDE)) {
        const index = match.index - lead.length;
        if (index >= 0 && index < text.length) {
            indexes.add(index);
        }
    }

    return indexes;
};

const escapeAt = (text: string, indexes: ReadonlySet<number>): string => {
    let escaped = '';
    for (let index = 0; index < text.length; index++) {
        if (indexes.has(index)) {
            escaped += BACKSLASH;
        }
        escaped += text.charAt(index);
    }

    return escaped;
};

const escapeDelimiterRow = (line: string): string => {
    if (line.includes(DELIMITER_ROW_DASH) && DELIMITER_ROW_CHARACTERS.test(line)) {
        return line.replace(FIRST_DELIMITER_MARK, BACKSLASH_MATCH);
    }

    return line;
};

export const isWhitespace = (char: string): boolean => WHITESPACE.test(char);

/** The numeric character reference of a character, which Markdown reads back as that character and as punctuation. */
export const entityOf = (char: string): string => {
    // A character here always holds one code point.
    const codePoint = char.codePointAt(0) as number;

    return `&#x${codePoint.toString(16).toUpperCase()};`;
};

/** The text before a link, with a `!` at its end escaped. */
export const escapeTrailingBang = (text: string): string => text.replace(TRAILING_BANG, String.raw`\!`);

export const escapeText = (
    text: string,
    position: TextPosition,
    scope: TextScope,
    neighbours: TextNeighbours,
): string => {
    const indexes = indexesOf(text, [...patternsOf(scope), BACKSLASH_BEFORE_ESCAPABLE]);
    for (const index of tildeIndexesOf(text, neighbours)) {
        indexes.add(index);
    }

    if (scope === 'linkText') {
        addAddressEscapesInEscapedWords(text, indexes);
    }

    const escaped = escapeAt(text, indexes);

    switch (position) {
        case 'inline':
            return escaped;
        case 'lineStart':
            return escapeDelimiterRow(
                escaped
                    .replace(LINE_START_MARKER, BACKSLASH_SECOND_GROUP)
                    .replace(LINE_START_HEADING, BACKSLASH_SECOND_GROUP)
                    .replace(LINE_START_UNDERLINE, BACKSLASH_SECOND_GROUP),
            ).replace(LINE_START_ORDINAL, BACKSLASH_SECOND_GROUP);
    }
};

/** The text of a block that holds one line, with a closing run of `#` escaped so it stays text. */
export const escapeClosingHashes = (line: string): string => line.replace(CLOSING_HASHES, BACKSLASH_SECOND_GROUP);
