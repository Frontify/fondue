/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * An `&` that starts a character reference (`&copy;`, `&#169;`, `&#xA9;`), which Markdown reads as the character
 * unless the `&` is escaped. Text and link destinations both escape it.
 */
export const MARKDOWN_ENTITY_START = /&(?=#\d+;|#[xX][\da-fA-F]+;|[A-Za-z][A-Za-z\d]*;)/g;
