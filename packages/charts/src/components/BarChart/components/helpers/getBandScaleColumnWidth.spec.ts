/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AxisScale } from '@visx/xychart';
import { describe, expect, test, vi } from 'vitest';

import { getBandScaleColumnWidth } from '@components/BarChart/components/helpers/getBandScaleColumnWidth';

const MOCK_SCALE = {
    bandwidth: vi.fn().mockReturnValue(10),
    paddingInner: vi.fn().mockReturnValue(0.5),
    paddingOuter: vi.fn(),
} as unknown as AxisScale;

describe('getBandScaleColumnWidth', () => {
    test('returns zero when scale is undefined', () => {
        expect(getBandScaleColumnWidth(undefined)).toBe(0);
    });

    test('returns zero when scale is not a band scale', () => {
        expect(getBandScaleColumnWidth({} as unknown as AxisScale)).toBe(0);
    });

    test('returns the correct column width', () => {
        expect(getBandScaleColumnWidth(MOCK_SCALE)).toBe(15);
    });
});
