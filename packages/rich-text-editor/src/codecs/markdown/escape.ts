/* (c) Copyright Frontify Ltd., all rights reserved. */

// What the writer escapes in text so that reading it back gives the same text.

import { ESCAPED_ENTITY_START, MARKDOWN_ENTITY_START, MAX_ORDINAL_DIGITS } from '#/core';

/** Where in a line the text sits: the start also escapes what would begin a block. */
export type TextPosition = 'lineStart' | 'inline';

/** The characters Markdown reads anywhere in a line: `\ * _ ` [ ] < > ~ |`. */
const ESCAPED_CHARACTERS = /[\\*_`[\]<>~|]/g;

/** What starts a heading, a setext underline, a bullet or a rule at the start of a line, after any indent. */
const LINE_START_MARKER = /^([ \t]*)(#|=|[-+](?=[ \t]|$)|-+[ \t]*$)/;

/** An ordinal that starts a numbered list (`1.`, `2)`), whose `.` or `)` is the character to escape. */
const LINE_START_ORDINAL = new RegExp(String.raw`^([ \t]*\d{1,${MAX_ORDINAL_DIGITS}})([.)])(?=[ \t]|$)`);

/** A run of `#` that ends a single line after a space, or is all of it, which an ATX heading reads as its closing run. */
const CLOSING_HASHES = /(^|[ \t])(#+)(?=[ \t]*$)/;

/** A `:` or `/` before a `/`, which makes `scheme://` and `//` an address a reader links. */
const SCHEME_SEPARATOR = /[:/](?=\/)/g;

/** The `.` after `www` in any case, which starts an address a reader links. */
const WWW_DOT = /(www)(\.)/gi;

/** An `@` after a character of an email's local part, which makes an address a reader links. */
const EMAIL_AT = /(?<=[A-Za-z0-9._+-])@/g;

/** A `!` that ends the text, which would make a link written right after it an image. */
const TRAILING_BANG = /!$/;

const WHITESPACE = /^\s$/u;

/** Keeps the first group and puts a backslash before the second. */
const BACKSLASH_SECOND_GROUP = String.raw`$1\$2`;
const BACKSLASH_MATCH = String.raw`\$&`;

export const isWhitespace = (char: string): boolean => WHITESPACE.test(char);

/** The numeric character reference of a character, which Markdown reads back as that character and as punctuation. */
export const entityOf = (char: string): string => {
    // A character here always holds one code point.
    const codePoint = char.codePointAt(0) as number;

    return `&#x${codePoint.toString(16).toUpperCase()};`;
};

/** The text before a link, with a `!` at its end escaped. */
export const escapeTrailingBang = (text: string): string => text.replace(TRAILING_BANG, String.raw`\!`);

export const escapeText = (text: string, position: TextPosition): string => {
    const escaped = text
        .replaceAll(ESCAPED_CHARACTERS, BACKSLASH_MATCH)
        .replaceAll(SCHEME_SEPARATOR, BACKSLASH_MATCH)
        .replaceAll(WWW_DOT, BACKSLASH_SECOND_GROUP)
        .replaceAll(EMAIL_AT, BACKSLASH_MATCH)
        .replaceAll(MARKDOWN_ENTITY_START, ESCAPED_ENTITY_START);

    switch (position) {
        case 'inline':
            return escaped;
        case 'lineStart':
            return escaped
                .replace(LINE_START_MARKER, BACKSLASH_SECOND_GROUP)
                .replace(LINE_START_ORDINAL, BACKSLASH_SECOND_GROUP);
    }
};

/** The text of a block that holds one line, with a closing run of `#` escaped so it stays text. */
export const escapeClosingHashes = (line: string): string => line.replace(CLOSING_HASHES, BACKSLASH_SECOND_GROUP);
