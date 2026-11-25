/* (c) Copyright Frontify Ltd., all rights reserved. */

// What the writer escapes in text so that reading it back gives the same text.

import { MARKDOWN_ENTITY_START } from '#/core';

/** Where in a line the text sits: the start also escapes what would begin a block. */
export type TextPosition = 'lineStart' | 'inline';

/** The characters Markdown reads anywhere in a line: `\ * _ ` [ ] < > ~ |`. */
const ESCAPED_CHARACTERS = /[\\*_`[\]<>~|]/g;

/** What starts a heading, a setext underline, a bullet or a rule at the start of a line, after any indent. */
const LINE_START_MARKER = /^([ \t]*)(#|=|[-+](?=[ \t]|$)|-+[ \t]*$)/;

/** An ordinal that starts a numbered list (`1.`, `2)`), whose `.` or `)` is the character to escape. */
const LINE_START_ORDINAL = /^([ \t]*\d{1,9})([.)])(?=[ \t]|$)/;

/** A run of `#` that ends a single line after a space, or is all of it, which an ATX heading reads as its closing run. */
const CLOSING_HASHES = /(^|[ \t])(#+)(?=[ \t]*$)/;

const BACKSLASH_AMPERSAND = String.raw`\&`;
/** Keeps the first group and puts a backslash before the second. */
const BACKSLASH_SECOND_GROUP = String.raw`$1\$2`;
const BACKSLASH_MATCH = String.raw`\$&`;

export const escapeText = (text: string, position: TextPosition): string => {
    const escaped = text
        .replaceAll(ESCAPED_CHARACTERS, BACKSLASH_MATCH)
        .replaceAll(MARKDOWN_ENTITY_START, BACKSLASH_AMPERSAND);

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
