/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type * as CommonComponents from '@components/common/components';
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

const tooltipProps = vi.hoisted(() => vi.fn());

vi.mock('@components/common/components', async (importOriginal) => ({
    ...(await importOriginal<typeof CommonComponents>()),
    Tooltip: (props: unknown) => {
        tooltipProps(props);
        return null;
    },
}));

vi.mock('@components/common/hooks', () => ({
    useMargin: vi.fn().mockReturnValue({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

describe('LineChart', () => {
    beforeEach(() => {
        tooltipProps.mockClear();
    });

    it('Should read the data-ready attribute and set the value', () => {
        const { container } = render(<LineChart series={dataWithMissingValues} width={400} height={200} />);

        const svgContainer = container.querySelector('svg');

        expect(svgContainer?.getAttribute('width')).toBe('400');
        expect(svgContainer?.getAttribute('height')).toBe('200');
    });

    it('Should label the chart with the aria label', () => {
        const { container } = render(
            <LineChart series={dataWithMissingValues} width={400} height={200} ariaLabel="Active users over time" />,
        );

        expect(container.querySelector('svg')?.getAttribute('aria-label')).toBe('Active users over time');
    });

    it('Should keep the default label when no aria label is given', () => {
        const { container } = render(<LineChart series={dataWithMissingValues} width={400} height={200} />);

        expect(container.querySelector('svg')?.getAttribute('aria-label')).toBe('XYChart');
    });

    it('Should format the tooltip values with the tooltip value formatter when given', () => {
        const valueFormatter = vi.fn();
        const tooltipValueFormatter = vi.fn();

        render(
            <LineChart
                series={dataWithMissingValues}
                width={400}
                height={200}
                valueFormatter={valueFormatter}
                tooltipValueFormatter={tooltipValueFormatter}
            />,
        );

        expect(tooltipProps).toHaveBeenCalledWith(expect.objectContaining({ valueFormatter: tooltipValueFormatter }));
    });

    it('Should format the tooltip values with the value formatter when no tooltip value formatter is given', () => {
        const valueFormatter = vi.fn();

        render(<LineChart series={dataWithMissingValues} width={400} height={200} valueFormatter={valueFormatter} />);

        expect(tooltipProps).toHaveBeenCalledWith(expect.objectContaining({ valueFormatter }));
    });
});
