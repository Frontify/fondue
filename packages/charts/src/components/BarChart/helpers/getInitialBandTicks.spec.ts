/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type BarChartSeries } from '@components/BarChart';
import { getInitialBandTicks } from '@components/BarChart/helpers/getInitialBandTicks';

const labels = ['Foo', 'Bar', 'Baz', 'Qux', 'Lorem', 'Ipsum'];

const series = [
    {
        dataPoints: [{ label: labels[0] }, { label: labels[1] }, { label: labels[2] }],
    },
    {
        dataPoints: [{ label: labels[3] }, { label: labels[4] }, { label: labels[5] }],
    },
] as BarChartSeries[];

describe('getInitialBandTicks', () => {
    it('returns all labels', () => {
        const result = getInitialBandTicks(series);
        expect(result).toEqual(labels);
    });
});
