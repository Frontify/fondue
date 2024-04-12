/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { xAccessor, yAccessor } from './accessors';

const LABEL = 'TEST LABEL';
const VALUE = 42;

describe('BarChart accessors', () => {
    describe('xAccessor', () => {
        it('returns label if horizontal is not set', () => {
            expect(xAccessor({ label: LABEL, value: VALUE })).toBe(LABEL);
        });

        it('returns label if horizontal is false', () => {
            expect(xAccessor({ label: LABEL, value: VALUE })).toBe(LABEL);
        });

        it('returns value if horizontal is true', () => {
            expect(xAccessor({ label: LABEL, value: VALUE }, true)).toBe(VALUE);
        });
    });

    describe('yAccessor', () => {
        it('returns value if defined', () => {
            expect(yAccessor({ label: LABEL, value: VALUE })).toBe(VALUE);
        });

        it('returns null if value is null', () => {
            expect(yAccessor({ label: LABEL, value: null })).toBe(null);
        });

        it('returns value if horizontal is false', () => {
            expect(yAccessor({ label: LABEL, value: VALUE }, false)).toBe(VALUE);
        });

        it('returns label if horizontal is true', () => {
            expect(yAccessor({ label: LABEL, value: VALUE }, true)).toBe(LABEL);
        });
    });
});
