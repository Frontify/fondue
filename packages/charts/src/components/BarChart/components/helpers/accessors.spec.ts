/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';

import { xAccessor, yAccessor } from './accessors';

const LABEL = 'TEST LABEL';
const VALUE = 42;

describe('BarChart accessors', () => {
    describe('xAccessor', () => {
        test('returns label if horizontal is not set', () => {
            expect(xAccessor({ label: LABEL, value: VALUE })).toBe(LABEL);
        });

        test('returns label if horizontal is false', () => {
            expect(xAccessor({ label: LABEL, value: VALUE })).toBe(LABEL);
        });

        test('returns value if horizontal is true', () => {
            expect(xAccessor({ label: LABEL, value: VALUE }, true)).toBe(VALUE);
        });
    });

    describe('yAccessor', () => {
        test('returns value if defined', () => {
            expect(yAccessor({ label: LABEL, value: VALUE })).toBe(VALUE);
        });

        test('returns null if value is null', () => {
            expect(yAccessor({ label: LABEL, value: null })).toBe(null);
        });

        test('returns value if horizontal is false', () => {
            expect(yAccessor({ label: LABEL, value: VALUE }, false)).toBe(VALUE);
        });

        test('returns label if horizontal is true', () => {
            expect(yAccessor({ label: LABEL, value: VALUE }, true)).toBe(LABEL);
        });
    });
});
