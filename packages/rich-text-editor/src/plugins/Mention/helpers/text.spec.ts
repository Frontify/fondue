/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { withoutControlCharacters } from './text';

/** Characters built from code points: the formatter writes an escape out as the invisible character. */
const characters = (...codePoints: number[]): string => String.fromCodePoint(...codePoints);

describe('withoutControlCharacters', () => {
    it('removes C0 and C1 control characters', () => {
        expect(withoutControlCharacters('a\u0000b\u001Bc\u007Fd\u009Fe\nf')).toBe('abcdef');
    });

    it('removes bidirectional embeddings, overrides and isolates', () => {
        const text = `a${characters(0x202a)}b${characters(0x202e)}c${characters(0x2066)}d${characters(0x2069)}e`;

        expect(withoutControlCharacters(text)).toBe('abcde');
    });

    it('keeps the direction marks, so right-to-left names survive', () => {
        const text = `a${characters(0x200e)}b${characters(0x200f)}c${characters(0x061c)}d`;

        expect(withoutControlCharacters(text)).toBe(text);
    });

    it('keeps the letters of every script', () => {
        expect(withoutControlCharacters('Ana مرحبا 山田 Åsa')).toBe('Ana مرحبا 山田 Åsa');
    });
});
