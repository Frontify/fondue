/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * C0 and C1 control characters, and the bidirectional marks, embeddings,
 * overrides and isolates that reorder the text around them, as code point
 * ranges: written as escapes, the formatter turns them into the invisible
 * characters themselves.
 */
const CONTROL_RANGES: readonly (readonly [from: number, to: number])[] = [
    [0x0000, 0x001f],
    [0x007f, 0x009f],
    [0x061c, 0x061c],
    [0x200e, 0x200f],
    [0x202a, 0x202e],
    [0x2066, 0x2069],
];

const isControlCharacter = (character: string): boolean => {
    const code = character.codePointAt(0) ?? 0;
    return CONTROL_RANGES.some(([from, to]) => code >= from && code <= to);
};

/** Text from a stored document or an app lookup as shown: without control characters; the letters of every script stay. */
export const withoutControlCharacters = (text: string): string =>
    Array.from(text)
        .filter((character) => !isControlCharacter(character))
        .join('');
