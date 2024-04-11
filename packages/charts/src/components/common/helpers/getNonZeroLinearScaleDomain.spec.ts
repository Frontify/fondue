/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';

import { type LineChartSeries } from '@components/LineChart';
import { getNonZeroLinearScaleDomain } from '@components/common/helpers/getNonZeroLinearScaleDomain';

const SERIES_POSITIVE_VALUES = [
    {
        dataPoints: [{ value: 1 }, { value: 2 }, { value: 3 }],
    },
    {
        dataPoints: [{ value: 4 }, { value: 5 }, { value: 1024 }],
    },
] as LineChartSeries[];

const SERIES_MIXED_VALUES = [
    {
        dataPoints: [{ value: 1 }, { value: -2048 }, { value: 3 }],
    },
    {
        dataPoints: [{ value: 4 }, { value: -5 }, { value: 6 }],
    },
] as LineChartSeries[];

const SERIES_ONLY_ZERO_VALUES = [
    {
        dataPoints: [{ value: 0 }, { value: 0 }, { value: 0 }],
    },
    {
        dataPoints: [{ value: 0 }, { value: 0 }, { value: 0 }],
    },
] as LineChartSeries[];

const SERIES_IDENTICAL_NON_ZERO_VALUES = [
    {
        dataPoints: [{ value: 8 }, { value: 8 }, { value: 8 }],
    },
    {
        dataPoints: [{ value: 8 }, { value: 8 }, { value: 8 }],
    },
] as LineChartSeries[];
describe('getNonZeroLinearScaleDomain', () => {
    test('positive values', () => {
        const result = getNonZeroLinearScaleDomain(SERIES_POSITIVE_VALUES);
        expect(result).toEqual([0, 2000]);
    });

    test('mixed values', () => {
        const result = getNonZeroLinearScaleDomain(SERIES_MIXED_VALUES);
        expect(result).toEqual([-3000, 6]);
    });

    test('mixed values with markLine', () => {
        const result = getNonZeroLinearScaleDomain(SERIES_MIXED_VALUES, 2);
        expect(result).toEqual([-3000, 6]);
    });

    test('mixed values with markLine above domain', () => {
        const result = getNonZeroLinearScaleDomain(SERIES_MIXED_VALUES, 10);
        expect(result).toEqual([-3000, 10]);
    });

    test('mixed values with markLine below domain', () => {
        const result = getNonZeroLinearScaleDomain(SERIES_MIXED_VALUES, -10240);
        expect(result).toEqual([-20000, 6]);
    });

    test('only zero values', () => {
        const result = getNonZeroLinearScaleDomain(SERIES_ONLY_ZERO_VALUES);
        expect(result).toEqual([0, 1]);
    });

    test('only zero values with markLine', () => {
        const result = getNonZeroLinearScaleDomain(SERIES_ONLY_ZERO_VALUES, 5);
        expect(result).toEqual([0, 5]);
    });

    test('identical non-zero values', () => {
        const result = getNonZeroLinearScaleDomain(SERIES_IDENTICAL_NON_ZERO_VALUES);
        expect(result).toEqual([0, 8]);
    });

    test('identical non-zero values with markLine above domain', () => {
        const result = getNonZeroLinearScaleDomain(SERIES_IDENTICAL_NON_ZERO_VALUES, 10);
        expect(result).toEqual([8, 10]);
    });

    test('identical non-zero values with markLine below domain', () => {
        const result = getNonZeroLinearScaleDomain(SERIES_IDENTICAL_NON_ZERO_VALUES, -10);
        expect(result).toEqual([-10, 8]);
    });
});
