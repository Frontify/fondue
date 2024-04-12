/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TooltipDatum } from '@visx/xychart/lib/types/tooltip';
import { describe, expect, test, vi } from 'vitest';

import { type LineChartDataPoint } from '@components/LineChart';

import { getTooltipEntries } from './getTooltipEntries';

describe('getTooltipEntries', () => {
    test('returns the expected data', () => {
        const datumByKey = {
            series1: {
                datum: {
                    label: 'foo',
                    value: 100,
                },
            },
            series2: {
                datum: {
                    label: 'bar',
                    value: 200,
                },
            },
        } as unknown as { [key: string]: TooltipDatum<LineChartDataPoint> };
        const colorAccessor = vi.fn();
        const valueFormatter = vi.fn().mockImplementation((value) => value);
        const result = getTooltipEntries('No data', colorAccessor, valueFormatter, datumByKey);
        expect(result).toEqual([
            { title: 'series1', value: 100, color: undefined },
            { title: 'series2', value: 200, color: undefined },
        ]);
        expect(colorAccessor).toHaveBeenCalledTimes(2);
        expect(colorAccessor).toHaveBeenCalledWith('series1');
        expect(colorAccessor).toHaveBeenCalledWith('series2');
        expect(valueFormatter).toHaveBeenCalledTimes(2);
        expect(valueFormatter).toHaveBeenCalledWith(100);
        expect(valueFormatter).toHaveBeenCalledWith(200);
    });

    test('ignores no data keys', () => {
        const datumByKey = {
            series1: {
                datum: {
                    label: 'foo',
                    value: 100,
                },
            },
            series2: {
                datum: {
                    label: 'bar',
                    value: 200,
                },
            },
            'series1-nodata': {
                datum: {
                    label: 'foo',
                    value: 100,
                },
            },
            'series2-nodata': {
                datum: {
                    label: 'bar',
                    value: 200,
                },
            },
        } as unknown as {
            [key: string]: TooltipDatum<LineChartDataPoint>;
        };
        const colorAccessor = vi.fn();
        const valueFormatter = vi.fn().mockImplementation((value) => value);
        const result = getTooltipEntries('No data', colorAccessor, valueFormatter, datumByKey);
        expect(result).toEqual([
            { title: 'series1', value: 100, color: undefined },
            { title: 'series2', value: 200, color: undefined },
        ]);
        expect(colorAccessor).toHaveBeenCalledTimes(2);
        expect(colorAccessor).toHaveBeenCalledWith('series1');
        expect(colorAccessor).toHaveBeenCalledWith('series2');
        expect(colorAccessor).not.toHaveBeenCalledWith('series1-nodata');
        expect(colorAccessor).not.toHaveBeenCalledWith('series2-nodata');
        expect(valueFormatter).toHaveBeenCalledTimes(2);
        expect(valueFormatter).toHaveBeenCalledWith(100);
        expect(valueFormatter).toHaveBeenCalledWith(200);
    });
});
