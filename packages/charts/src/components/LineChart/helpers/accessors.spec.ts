/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';

import { glyphColorAccessor, xAccessor, yAccessor } from '@components/LineChart/helpers/accessors';

import { BASE_COLOR_NEGATIVE } from '../../../theme/consts';

describe('LineChart accessors', () => {
    describe('xAccessor', () => {
        test('returns date if date string is valid', () => {
            expect(xAccessor({ timestamp: new Date('2021-01-01'), value: 1 })).toBe(1609459200000);
        });

        test('returns 0 if date string is invalid', () => {
            expect(xAccessor({ timestamp: new Date('invalid date string'), value: 1 })).toBe(0);
        });

        test('returns null if dataPoint is not supplied', () => {
            expect(xAccessor()).toBe(null);
        });
    });

    describe('yAccessor', () => {
        test('returns value if defined', () => {
            expect(yAccessor({ timestamp: new Date('2021-01-01'), value: 1 })).toBe(1);
        });

        test('returns null if value is null', () => {
            expect(yAccessor({ timestamp: new Date('2021-01-01'), value: null })).toBe(null);
        });

        test('returns null if dataPoint is not supplied', () => {
            expect(yAccessor()).toBe(null);
        });
    });

    describe('glyphColorAccessor', () => {
        test('returns positive color if value is positive and highlightNegativeValue is false', () => {
            expect(glyphColorAccessor(1, false, 'positiveColor')).toBe('positiveColor');
        });

        test('returns positive color if value is negative and highlightNegativeValue is false', () => {
            expect(glyphColorAccessor(-1, false, 'positiveColor')).toBe('positiveColor');
        });

        test('returns positive color if value is null and highlightNegativeValue is false', () => {
            expect(glyphColorAccessor(null, false, 'positiveColor')).toBe('positiveColor');
        });

        test('returns positive color if value is 0 and highlightNegativeValue is false', () => {
            expect(glyphColorAccessor(0, false, 'positiveColor')).toBe('positiveColor');
        });

        test('returns positive color if value is positive and highlightNegativeValue is true', () => {
            expect(glyphColorAccessor(1, true, 'positiveColor')).toBe('positiveColor');
        });

        test('returns negative color if value is negative and highlightNegativeValue is true', () => {
            expect(glyphColorAccessor(-1, true, 'positiveColor')).toBe(BASE_COLOR_NEGATIVE);
        });

        test('returns positive color if value is null and highlightNegativeValue is true', () => {
            expect(glyphColorAccessor(null, true, 'positiveColor')).toBe('positiveColor');
        });

        test('returns positive color if value is 0 and highlightNegativeValue is true', () => {
            expect(glyphColorAccessor(0, true, 'positiveColor')).toBe('positiveColor');
        });
    });
});
