/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type LineChartSeries } from '@components/LineChart';
import { getNonZeroLinearStackingScaleDomain } from '@components/common/helpers/getNonZeroLinearStackingScaleDomain';

const MOCK_SERIES_1 = [
    { dataPoints: [{ value: 1 }, { value: 2 }, { value: 3 }] },
    { dataPoints: [{ value: 3 }, { value: 2 }, { value: 1 }] },
    { dataPoints: [{ value: 1 }, { value: 2 }, { value: 3 }] },
] as LineChartSeries[];

const MOCK_SERIES_2 = [
    { dataPoints: [{ value: 10 }, { value: 20 }, { value: 3 }] },
    { dataPoints: [{ value: 4 }, { value: 5 }, { value: 50 }] },
    { dataPoints: [{ value: 2 }, { value: 4 }, { value: 30 }] },
] as LineChartSeries[];

const MOCK_SERIES_3 = [
    { dataPoints: [{ value: 1 }, { value: 2 }, { value: 3 }] },
    { dataPoints: [{ value: 306 }, { value: 5 }, { value: 102 }] },
    { dataPoints: [{ value: 20 }, { value: 400 }, { value: 60 }] },
] as LineChartSeries[];

const MOCK_SERIES_4 = [
    { dataPoints: [{ value: 1 }, { value: 2 }, { value: 3 }] },
    { dataPoints: [{ value: 4 }, { value: 5 }, { value: 1024 }] },
    { dataPoints: [{ value: 20 }, { value: 40 }, { value: 60 }] },
] as LineChartSeries[];

const MOCK_SERIES_5 = [
    { dataPoints: [{ value: 1 }, { value: 14769 }, { value: 3 }] },
    { dataPoints: [{ value: 4 }, { value: 5 }, { value: 1024 }] },
    { dataPoints: [{ value: 20000 }, { value: 40 }, { value: 60 }] },
] as LineChartSeries[];

const MOCK_SERIES_6 = [
    { dataPoints: [{ value: 1 }, { value: 200000 }, { value: 3 }] },
    { dataPoints: [{ value: 445678 }, { value: 5 }, { value: 1024 }] },
    { dataPoints: [{ value: 20 }, { value: 403 }, { value: 60 }] },
] as LineChartSeries[];

describe('getNonZeroLinearStackingScaleDomain', () => {
    it('positive values with 1 digits', () => {
        const result = getNonZeroLinearStackingScaleDomain(MOCK_SERIES_1);
        expect(result).toEqual([0, 7]);
    });
    it('positive values with 2 digits', () => {
        const result = getNonZeroLinearStackingScaleDomain(MOCK_SERIES_2);
        expect(result).toEqual([0, 90]);
    });
    it('positive values with 3 digits', () => {
        const result = getNonZeroLinearStackingScaleDomain(MOCK_SERIES_3);
        expect(result).toEqual([0, 500]);
    });
    it('positive values with 4 digits', () => {
        const result = getNonZeroLinearStackingScaleDomain(MOCK_SERIES_4);
        expect(result).toEqual([0, 2000]);
    });
    it('positive values with 5 digits', () => {
        const result = getNonZeroLinearStackingScaleDomain(MOCK_SERIES_5);
        expect(result).toEqual([0, 30000]);
    });
    it('positive values with 6 digits', () => {
        const result = getNonZeroLinearStackingScaleDomain(MOCK_SERIES_6);
        expect(result).toEqual([0, 500000]);
    });
    it('with markline being the max before threshold', () => {
        const result = getNonZeroLinearStackingScaleDomain(MOCK_SERIES_1, 9999);
        expect(result).toEqual([0, 10000]);
    });
    it('with markline being the max after threshold', () => {
        const result = getNonZeroLinearStackingScaleDomain(MOCK_SERIES_1, 10001);
        expect(result).toEqual([0, 20000]);
    });
    it('with markline not being the max', () => {
        const result = getNonZeroLinearStackingScaleDomain(MOCK_SERIES_5, 10000);
        expect(result).toEqual([0, 30000]);
    });
});
