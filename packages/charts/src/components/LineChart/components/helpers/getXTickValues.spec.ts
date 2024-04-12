/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';

import { getXTickValues } from './getXTickValues';

const SERIES = [
    {
        name: 'foo',
        dataPoints: [
            { timestamp: new Date('2021-01-01'), value: 1 },
            { timestamp: new Date('2021-01-02'), value: 2 },
            { timestamp: new Date('2021-01-03'), value: 3 },
            { timestamp: new Date('2021-01-04'), value: 4 },
            { timestamp: new Date('2021-01-05'), value: 5 },
            { timestamp: new Date('2021-01-06'), value: 6 },
            { timestamp: new Date('2021-01-07'), value: 7 },
            { timestamp: new Date('2021-01-08'), value: 8 },
            { timestamp: new Date('2021-01-09'), value: 9 },
            { timestamp: new Date('2021-01-10'), value: 10 },
            { timestamp: new Date('2021-01-11'), value: 11 },
            { timestamp: new Date('2021-01-12'), value: 12 },
            { timestamp: new Date('2021-01-13'), value: 13 },
            { timestamp: new Date('2021-01-14'), value: 14 },
            { timestamp: new Date('2021-01-15'), value: 15 },
            { timestamp: new Date('2021-01-16'), value: 16 },
            { timestamp: new Date('2021-01-17'), value: 17 },
            { timestamp: new Date('2021-01-18'), value: 18 },
            { timestamp: new Date('2021-01-19'), value: 19 },
            { timestamp: new Date('2021-01-20'), value: 20 },
        ],
    },
];

describe('getXTickValues', () => {
    test('should return empty array if no data points', () => {
        const result = getXTickValues([{ name: 'foo', dataPoints: [] }], 500);
        expect(result).toEqual([]);
    });

    test('should return 10 ticks if axis length is 600', () => {
        const result = getXTickValues(SERIES, 600);
        expect(result).toEqual([
            new Date('2021-01-01'),
            new Date('2021-01-03'),
            new Date('2021-01-05'),
            new Date('2021-01-07'),
            new Date('2021-01-09'),
            new Date('2021-01-11'),
            new Date('2021-01-13'),
            new Date('2021-01-15'),
            new Date('2021-01-17'),
            new Date('2021-01-19'),
        ]);
    });

    test('should return all ticks if axis length is 2000', () => {
        const result = getXTickValues(SERIES, 2000);
        expect(result).toEqual(SERIES[0]!.dataPoints.map((item) => item.timestamp));
    });

    test('should return 2 data point if axis length is 100', () => {
        const result = getXTickValues(SERIES, 100);
        expect(result).toEqual([new Date('2021-01-01'), new Date('2021-01-20')]);
    });

    test('should return 1 data point if axis length is 50', () => {
        const result = getXTickValues(SERIES, 50);
        expect(result).toEqual([new Date('2021-01-01')]);
    });
});
