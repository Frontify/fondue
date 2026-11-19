/* (c) Copyright Frontify Ltd., all rights reserved. */

/** Written as numbers: the formatter turns escapes into the invisible characters. LRM, RLM and ALM are left out so right-to-left names keep them. */
const CONTROL_RANGES: readonly (readonly [from: number, to: number])[] = [
    [0x0000, 0x001f],
    [0x007f, 0x009f],
    [0x202a, 0x202e],
    [0x2066, 0x2069],
];

const isControlCharacter = (character: string): boolean => {
    const code = character.codePointAt(0) ?? 0;
    return CONTROL_RANGES.some(([from, to]) => code >= from && code <= to);
};

/** Strips what can disguise text from a stored document or an app lookup. */
export const withoutControlCharacters = (text: string): string =>
    Array.from(text)
        .filter((character) => !isControlCharacter(character))
        .join('');
