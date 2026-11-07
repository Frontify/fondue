/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { withoutControlCharacters } from './text';

describe('withoutControlCharacters', () => {
    it('removes C0 and C1 control characters', () => {
        expect(withoutControlCharacters('a\u0000b\u001Bc\u007Fd\u009Fe\nf')).toBe('abcdef');
    });

    it('removes bidirectional marks, embeddings, overrides and isolates', () => {
        expect(withoutControlCharacters('a\u061Cb\u200Ec\u200Fd\u202Ae\u202Ef\u2066g\u2069h')).toBe('abcdefgh');
    });

    it('keeps the letters of every script', () => {
        expect(withoutControlCharacters('Ana مرحبا 山田 Åsa')).toBe('Ana مرحبا 山田 Åsa');
    });
});
