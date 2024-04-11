/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';

import { createBackfilledSeries } from '@components/LineChart/helpers/createBackfilledSeries';

const name = 'data with missing values';

const dataWithMissingValues = [
    {
        dataPoints: [
            { timestamp: new Date('2021-01-01'), value: 1 },
            { timestamp: new Date('2021-01-02'), value: 2 },
            { timestamp: new Date('2021-01-03'), value: null },
            { timestamp: new Date('2021-01-04'), value: null },
            { timestamp: new Date('2021-01-05'), value: null },
            { timestamp: new Date('2021-01-06'), value: 6 },
            { timestamp: new Date('2021-01-07'), value: 7 },
            { timestamp: new Date('2021-01-08'), value: null },
            { timestamp: new Date('2021-01-09'), value: null },
        ],
        name,
    },
];

const dataWithoutMissingValues = [
    {
        dataPoints: [
            { timestamp: new Date('2021-01-01'), value: 1 },
            { timestamp: new Date('2021-01-02'), value: 2 },
            { timestamp: new Date('2021-01-03'), value: 4 },
            { timestamp: new Date('2021-01-04'), value: 7 },
            { timestamp: new Date('2021-01-05'), value: 7 },
            { timestamp: new Date('2021-01-06'), value: 6 },
            { timestamp: new Date('2021-01-07'), value: 7 },
            { timestamp: new Date('2021-01-08'), value: 2 },
            { timestamp: new Date('2021-01-09'), value: 6 },
        ],
        name,
    },
];

describe('createBackFilledSeries', () => {
    test('handles gap in data', () => {
        const missingData = createBackfilledSeries(dataWithMissingValues);
        expect(missingData.length).toBe(2);
        expect(missingData[0]?.dataPoints.length).toEqual(5);
        expect(missingData[0]?.name).toEqual(`${name}-0`);
        expect(missingData[1]?.dataPoints.length).toEqual(4);
        expect(missingData[1]?.name).toEqual(`${name}-1`);

        expect(missingData[0]?.dataPoints[0]?.value).toEqual(2);
        expect(missingData[0]?.dataPoints[1]?.value).toEqual(3);
        expect(missingData[0]?.dataPoints[2]?.value).toEqual(4);
        expect(missingData[0]?.dataPoints[3]?.value).toEqual(5);

        expect(missingData[1]?.dataPoints[0]?.value).toEqual(7);
        expect(missingData[1]?.dataPoints[1]?.value).toEqual(7);
        expect(missingData[1]?.dataPoints[2]?.value).toEqual(7);
        expect(missingData[1]?.dataPoints[3]?.value).toEqual(7);
    });

    test('handles no gap in data', () => {
        const missingData = createBackfilledSeries(dataWithoutMissingValues);
        expect(missingData.length).toBe(0);
    });

    test('handles missing data in the beginning', () => {
        const data = [
            {
                dataPoints: [
                    { timestamp: new Date('2021-01-01'), value: null },
                    { timestamp: new Date('2021-01-02'), value: null },
                    { timestamp: new Date('2021-01-03'), value: null },
                    { timestamp: new Date('2021-01-04'), value: 7 },
                    { timestamp: new Date('2021-01-05'), value: 4 },
                    { timestamp: new Date('2021-01-06'), value: 6 },
                ],
                name,
            },
        ];

        const missingData = createBackfilledSeries(data);
        expect(missingData.length).toBe(1);
        expect(missingData[0]?.dataPoints.length).toEqual(4);
        expect(missingData[0]?.name).toEqual(`${name}-0`);
        expect(missingData[0]?.dataPoints[0]?.value).toEqual(7);
        expect(missingData[0]?.dataPoints[1]?.value).toEqual(7);
        expect(missingData[0]?.dataPoints[2]?.value).toEqual(7);
        expect(missingData[0]?.dataPoints[3]?.value).toEqual(7);
        expect(missingData[0]?.dataPoints[0]?.timestamp.valueOf()).toEqual(new Date('2021-01-01').valueOf());
        expect(missingData[0]?.dataPoints[1]?.timestamp.valueOf()).toEqual(new Date('2021-01-02').valueOf());
        expect(missingData[0]?.dataPoints[2]?.timestamp.valueOf()).toEqual(new Date('2021-01-03').valueOf());
        expect(missingData[0]?.dataPoints[3]?.timestamp.valueOf()).toEqual(new Date('2021-01-04').valueOf());
    });

    test('handles only missing data', () => {
        const data = [
            {
                dataPoints: [
                    { timestamp: new Date('2021-01-01'), value: null },
                    { timestamp: new Date('2021-01-02'), value: null },
                    { timestamp: new Date('2021-01-03'), value: null },
                ],
                name,
            },
        ];

        const missingData = createBackfilledSeries(data);
        expect(missingData.length).toBe(1);
        expect(missingData[0]?.dataPoints.length).toEqual(3);
        expect(missingData[0]?.name).toEqual(`${name}-0`);
        expect(missingData[0]?.dataPoints[0]?.value).toEqual(0);
        expect(missingData[0]?.dataPoints[1]?.value).toEqual(0);
        expect(missingData[0]?.dataPoints[2]?.value).toEqual(0);
        expect(missingData[0]?.dataPoints[0]?.timestamp.valueOf()).toEqual(new Date('2021-01-01').valueOf());
        expect(missingData[0]?.dataPoints[1]?.timestamp.valueOf()).toEqual(new Date('2021-01-02').valueOf());
        expect(missingData[0]?.dataPoints[2]?.timestamp.valueOf()).toEqual(new Date('2021-01-03').valueOf());
    });
});
