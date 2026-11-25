/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * An `&` that starts a character reference (`&copy;`, `&#169;`, `&#xA9;`), which Markdown reads as the character
 * unless the `&` is escaped. Text and link destinations both escape it.
 */
export const MARKDOWN_ENTITY_START = /&(?=#\d+;|#[xX][\da-fA-F]+;|[A-Za-z][A-Za-z\d]*;)/g;

/** An entity-like `&` with its escaping backslash. */
export const ESCAPED_ENTITY_START = String.raw`\&`;

/** CommonMark reads at most nine digits as a list number. */
export const MAX_ORDINAL_DIGITS = 9;
