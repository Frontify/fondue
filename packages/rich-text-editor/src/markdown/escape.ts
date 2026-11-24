/* (c) Copyright Frontify Ltd., all rights reserved. */

// What the writer escapes in text so that reading it back gives the same text.

/** Where in a line the text sits: the start also escapes what would begin a block. */
export type TextPosition = 'lineStart' | 'inline';

/** The characters Markdown reads anywhere in a line: `\ * _ ` [ ] < > ~ |`. */
const ESCAPED_CHARACTERS = /[\\*_`[\]<>~|]/g;

/** An `&` that starts a character reference (`&copy;`, `&#169;`, `&#xA9;`), which would read as the character. */
const ENTITY_START = /&(?=#\d+;|#[xX][\da-fA-F]+;|[A-Za-z][A-Za-z\d]*;)/g;

/** What starts a heading, a setext underline, a bullet or a rule at the start of a line. */
const LINE_START_MARKER = /^(?:#|=|[-+](?=[ \t]|$)|-+[ \t]*$)/;

/** An ordinal that starts a numbered list (`1.`, `2)`), whose `.` or `)` is the character to escape. */
const LINE_START_ORDINAL = /^(\d{1,9})([.)])(?=[ \t]|$)/;

const BACKSLASH_MATCH = String.raw`\$&`;
const BACKSLASH_ORDINAL = String.raw`$1\$2`;
const BACKSLASH_AMPERSAND = String.raw`\&`;

export const escapeText = (text: string, position: TextPosition): string => {
    const escaped = text.replaceAll(ESCAPED_CHARACTERS, BACKSLASH_MATCH).replaceAll(ENTITY_START, BACKSLASH_AMPERSAND);

    switch (position) {
        case 'inline':
            return escaped;
        case 'lineStart':
            return escaped.replace(LINE_START_MARKER, BACKSLASH_MATCH).replace(LINE_START_ORDINAL, BACKSLASH_ORDINAL);
    }
};
