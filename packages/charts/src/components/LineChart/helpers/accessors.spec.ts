/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { glyphColorAccessor, xAccessor, yAccessor } from '@components/LineChart/helpers/accessors';

import { BASE_COLOR_NEGATIVE } from '../../../theme/consts';

describe('LineChart accessors', () => {
    describe('xAccessor', () => {
        it('returns date if date string is valid', () => {
            expect(xAccessor({ timestamp: new Date('2021-01-01'), value: 1 })).toBe(1609459200000);
        });

        it('returns 0 if date string is invalid', () => {
            expect(xAccessor({ timestamp: new Date('invalid date string'), value: 1 })).toBe(0);
        });

        it('returns null if dataPoint is not supplied', () => {
            expect(xAccessor()).toBe(null);
        });
    });

    describe('yAccessor', () => {
        it('returns value if defined', () => {
            expect(yAccessor({ timestamp: new Date('2021-01-01'), value: 1 })).toBe(1);
        });

        it('returns null if value is null', () => {
            expect(yAccessor({ timestamp: new Date('2021-01-01'), value: null })).toBe(null);
        });

        it('returns null if dataPoint is not supplied', () => {
            expect(yAccessor()).toBe(null);
        });
    });

    describe('glyphColorAccessor', () => {
        it('returns positive color if value is positive and highlightNegativeValue is false', () => {
            expect(glyphColorAccessor(1, false, 'positiveColor')).toBe('positiveColor');
        });

        it('returns positive color if value is negative and highlightNegativeValue is false', () => {
            expect(glyphColorAccessor(-1, false, 'positiveColor')).toBe('positiveColor');
        });

        it('returns positive color if value is null and highlightNegativeValue is false', () => {
            expect(glyphColorAccessor(null, false, 'positiveColor')).toBe('positiveColor');
        });

        it('returns positive color if value is 0 and highlightNegativeValue is false', () => {
            expect(glyphColorAccessor(0, false, 'positiveColor')).toBe('positiveColor');
        });

        it('returns positive color if value is positive and highlightNegativeValue is true', () => {
            expect(glyphColorAccessor(1, true, 'positiveColor')).toBe('positiveColor');
        });

        it('returns negative color if value is negative and highlightNegativeValue is true', () => {
            expect(glyphColorAccessor(-1, true, 'positiveColor')).toBe(BASE_COLOR_NEGATIVE);
        });

        it('returns positive color if value is null and highlightNegativeValue is true', () => {
            expect(glyphColorAccessor(null, true, 'positiveColor')).toBe('positiveColor');
        });

        it('returns positive color if value is 0 and highlightNegativeValue is true', () => {
            expect(glyphColorAccessor(0, true, 'positiveColor')).toBe('positiveColor');
        });
    });
});
