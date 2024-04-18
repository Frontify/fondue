/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { isValidNumber } from './isValidNumber';

describe('isValidNumber', () => {
    it('should return true for valid numbers', () => {
        expect(isValidNumber(123)).toBe(true);
        expect(isValidNumber(0)).toBe(true);
        expect(isValidNumber(-456)).toBe(true);
        expect(isValidNumber(3.14)).toBe(true);
    });

    it('should return false for non-number values', () => {
        expect(isValidNumber(null)).toBe(false);
        expect(isValidNumber(undefined)).toBe(false);
        expect(isValidNumber('')).toBe(false);
        expect(isValidNumber('123')).toBe(false);
        expect(isValidNumber([])).toBe(false);
        expect(isValidNumber({})).toBe(false);
        expect(isValidNumber(true)).toBe(false);
        expect(isValidNumber(false)).toBe(false);
    });

    it('should return false for NaN and Infinity', () => {
        expect(isValidNumber(NaN)).toBe(false);
        expect(isValidNumber(Infinity)).toBe(false);
        expect(isValidNumber(-Infinity)).toBe(false);
    });
});
