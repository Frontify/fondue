/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { LineChart } from '@components/LineChart';

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
        name: 'name',
    },
];

vi.mock('@visx/scale', () => ({
    createScale: () => ({
        ticks: vi.fn().mockReturnValue([20, 40, 60, 80, 100]),
    }),
}));

vi.mock('@components/common/hooks', () => ({
    useMargin: vi.fn().mockReturnValue({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

describe('LineChart', () => {
    it('Should read the data-ready attribute and set the value', () => {
        const { container } = render(<LineChart series={dataWithMissingValues} width={400} height={200} />);

        const svgContainer = container.querySelector('svg');

        expect(svgContainer?.getAttribute('width')).toBe('400');
        expect(svgContainer?.getAttribute('height')).toBe('200');
    });
});
