/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { matchesKeyPathPrefix, textIncludes, toArray } from './filters';

describe('toArray', () => {
    it('returns undefined when input is undefined', () => {
        expect(toArray(undefined)).toBeUndefined();
    });

    it('wraps a scalar value in an array', () => {
        expect(toArray('foo')).toEqual(['foo']);
        expect(toArray(0)).toEqual([0]);
        expect(toArray(false)).toEqual([false]);
    });

    it('returns array values as-is', () => {
        const input = ['a', 'b', 'c'];
        expect(toArray(input)).toEqual(['a', 'b', 'c']);
    });

    it('preserves an empty array (distinct from undefined)', () => {
        expect(toArray([])).toEqual([]);
    });
});

describe('textIncludes', () => {
    it('performs case-insensitive matching', () => {
        expect(textIncludes('button', ['Button Component'])).toBe(true);
        expect(textIncludes('BUTTON', ['button component'])).toBe(true);
    });

    it('matches when the needle is a substring of any candidate', () => {
        expect(textIncludes('tab', ['unrelated', 'Tabs'])).toBe(true);
    });

    it('returns false when no candidate contains the needle', () => {
        expect(textIncludes('zzz', ['foo', 'bar'])).toBe(false);
    });

    it('skips undefined candidates without throwing', () => {
        expect(textIncludes('foo', [undefined, 'foobar'])).toBe(true);
        expect(textIncludes('foo', [undefined])).toBe(false);
    });

    it('returns false for an empty candidate list', () => {
        expect(textIncludes('foo', [])).toBe(false);
    });
});

describe('matchesKeyPathPrefix', () => {
    it('returns true when prefix is undefined', () => {
        expect(matchesKeyPathPrefix(['colors', 'charts'], undefined)).toBe(true);
    });

    it('returns true when prefix is the empty string (falsy)', () => {
        expect(matchesKeyPathPrefix(['colors'], '')).toBe(true);
    });

    it('matches against the dot-joined keyPath', () => {
        expect(matchesKeyPathPrefix(['colors', 'charts', 'primary'], 'colors.charts')).toBe(true);
        expect(matchesKeyPathPrefix(['colors', 'charts'], 'colors.charts')).toBe(true);
    });

    it('does not match when the prefix diverges', () => {
        expect(matchesKeyPathPrefix(['colors', 'charts'], 'colors.text')).toBe(false);
    });

    it('returns false for an empty keyPath when a real prefix is given', () => {
        expect(matchesKeyPathPrefix([], 'colors')).toBe(false);
    });
});
