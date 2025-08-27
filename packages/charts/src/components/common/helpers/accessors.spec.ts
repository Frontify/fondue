/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { BASE_COLORS, HOVER_COLORS } from '@theme/consts';

import { colorAccessorByIndex, colorAccessorByKey, hoverColorAccessorByIndex } from './accessors';

describe('common accessors', () => {
    describe('colorAccessorByKey', () => {
        const data = [
            { name: 'key1', dataPoints: [] },
            { name: 'key2', dataPoints: [] },
            { name: 'key3', dataPoints: [] },
        ];
        it('returns color for valid keys', () => {
            expect(colorAccessorByKey('key1', data)).toBe(BASE_COLORS[0]);
            expect(colorAccessorByKey('key2', data)).toBe(BASE_COLORS[1]);
            expect(colorAccessorByKey('key3', data)).toBe(BASE_COLORS[2]);
        });

        it('returns undefined for invalid keys', () => {
            expect(colorAccessorByKey('invalid key', data)).toBe(undefined);
        });

        it('handles more than three data sets', () => {
            const longData = [
                ...data,
                { name: 'key4', dataPoints: [] },
                { name: 'key5', dataPoints: [] },
                { name: 'key6', dataPoints: [] },
                { name: 'key7', dataPoints: [] },
            ];

            expect(colorAccessorByKey('key1', longData)).toBe(BASE_COLORS[0]);
            expect(colorAccessorByKey('key2', longData)).toBe(BASE_COLORS[1]);
            expect(colorAccessorByKey('key3', longData)).toBe(BASE_COLORS[2]);
            expect(colorAccessorByKey('key4', longData)).toBe(BASE_COLORS[0]);
            expect(colorAccessorByKey('key5', longData)).toBe(BASE_COLORS[1]);
            expect(colorAccessorByKey('key6', longData)).toBe(BASE_COLORS[2]);
            expect(colorAccessorByKey('key7', longData)).toBe(BASE_COLORS[0]);
        });
    });

    describe('colorAccessorByIndex', () => {
        it('handles first three data sets', () => {
            expect(colorAccessorByIndex(0)).toBe(BASE_COLORS[0]);
            expect(colorAccessorByIndex(1)).toBe(BASE_COLORS[1]);
            expect(colorAccessorByIndex(2)).toBe(BASE_COLORS[2]);
        });

        it('returns undefined for invalid index', () => {
            expect(colorAccessorByIndex(-1)).toBe(undefined);
        });

        it('handles more than three data sets', () => {
            expect(colorAccessorByIndex(3)).toBe(BASE_COLORS[0]);
            expect(colorAccessorByIndex(4)).toBe(BASE_COLORS[1]);
            expect(colorAccessorByIndex(5)).toBe(BASE_COLORS[2]);

            expect(colorAccessorByIndex(28)).toBe(BASE_COLORS[1]);
        });
    });

    describe('hoverColorAccessorByIndex', () => {
        it('handles first three data sets', () => {
            expect(hoverColorAccessorByIndex(0)).toBe(HOVER_COLORS[0]);
            expect(hoverColorAccessorByIndex(1)).toBe(HOVER_COLORS[1]);
            expect(hoverColorAccessorByIndex(2)).toBe(HOVER_COLORS[2]);
        });

        it('returns undefined for invalid index', () => {
            expect(hoverColorAccessorByIndex(-1)).toBe(undefined);
        });

        it('handles more than three data sets', () => {
            expect(hoverColorAccessorByIndex(3)).toBe(HOVER_COLORS[0]);
            expect(hoverColorAccessorByIndex(4)).toBe(HOVER_COLORS[1]);
            expect(hoverColorAccessorByIndex(5)).toBe(HOVER_COLORS[2]);

            expect(hoverColorAccessorByIndex(28)).toBe(HOVER_COLORS[1]);
        });
    });

    describe('hoverColorAccessorByIndex', () => {
        it('handles first three data sets', () => {
            expect(hoverColorAccessorByIndex(0)).toBe(HOVER_COLORS[0]);
            expect(hoverColorAccessorByIndex(1)).toBe(HOVER_COLORS[1]);
            expect(hoverColorAccessorByIndex(2)).toBe(HOVER_COLORS[2]);
        });

        it('returns undefined for invalid index', () => {
            expect(hoverColorAccessorByIndex(-1)).toBe(undefined);
        });

        it('handles more than three data sets', () => {
            expect(hoverColorAccessorByIndex(3)).toBe(HOVER_COLORS[0]);
            expect(hoverColorAccessorByIndex(4)).toBe(HOVER_COLORS[1]);
            expect(hoverColorAccessorByIndex(5)).toBe(HOVER_COLORS[2]);

            expect(hoverColorAccessorByIndex(28)).toBe(HOVER_COLORS[1]);
        });
    });
});
