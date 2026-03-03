/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { getDateDisplayString } from '../dateDisplayFormatter';

describe('getDateDisplayString', () => {
    describe('single date', () => {
        it('should return undefined when no date is provided', () => {
            expect(getDateDisplayString(undefined)).toBeUndefined();
        });

        it('should return undefined for an undefined DatePickerDate value', () => {
            expect(getDateDisplayString(undefined)).toBeUndefined();
        });

        it('should format a single date as "MMMM d, yyyy"', () => {
            const result = getDateDisplayString({ year: 2025, month: 3, day: 15 });
            expect(result).toBe('March 15, 2025');
        });

        it('should format January 1st correctly', () => {
            const result = getDateDisplayString({ year: 2025, month: 1, day: 1 });
            expect(result).toBe('January 1, 2025');
        });

        it('should format December 31st correctly', () => {
            const result = getDateDisplayString({ year: 2025, month: 12, day: 31 });
            expect(result).toBe('December 31, 2025');
        });
    });

    describe('date range - same month', () => {
        it('should format as "MMM d–d, yyyy" when from and to are in the same month', () => {
            const result = getDateDisplayString({
                from: { year: 2025, month: 3, day: 5 },
                to: { year: 2025, month: 3, day: 20 },
            });
            expect(result).toBe('Mar 5\u201320, 2025');
        });
    });

    describe('date range - same year, different month', () => {
        it('should format as "MMM d–MMM d, yyyy" when in the same year but different months', () => {
            const result = getDateDisplayString({
                from: { year: 2025, month: 1, day: 10 },
                to: { year: 2025, month: 6, day: 15 },
            });
            expect(result).toBe('Jan 10\u2013Jun 15, 2025');
        });
    });

    describe('date range - different years', () => {
        it('should format as "MMM d, yyyy–MMM d, yyyy" when spanning different years', () => {
            const result = getDateDisplayString({
                from: { year: 2024, month: 12, day: 20 },
                to: { year: 2025, month: 1, day: 5 },
            });
            expect(result).toBe('Dec 20, 2024\u2013Jan 5, 2025');
        });
    });

    describe('incomplete date range', () => {
        it('should return undefined when from is missing', () => {
            const result = getDateDisplayString({
                from: undefined,
                to: { year: 2025, month: 3, day: 15 },
            });
            expect(result).toBeUndefined();
        });

        it('should return undefined when to is missing', () => {
            const result = getDateDisplayString({
                from: { year: 2025, month: 3, day: 5 },
                to: undefined,
            });
            expect(result).toBeUndefined();
        });

        it('should return undefined when both from and to are missing', () => {
            const result = getDateDisplayString({
                from: undefined,
                to: undefined,
            });
            expect(result).toBeUndefined();
        });
    });
});
