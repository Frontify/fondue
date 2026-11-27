/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AreaStackChart } from '@components/AreaStackChart/AreaStackChart';
import type * as CommonComponents from '@components/common/components';

const series = [
    {
        name: 'name',
        dataPoints: [
            { timestamp: new Date('2021-01-01'), value: 1 },
            { timestamp: new Date('2021-01-02'), value: 2 },
        ],
    },
];

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

describe('AreaStackChart', () => {
    beforeEach(() => {
        tooltipProps.mockClear();
    });

    it('Should label the chart with the aria label', () => {
        const { container } = render(
            <AreaStackChart series={series} width={400} height={200} ariaLabel="Storage usage over time" />,
        );

        expect(container.querySelector('svg')?.getAttribute('aria-label')).toBe('Storage usage over time');
    });

    it('Should keep the default label when no aria label is given', () => {
        const { container } = render(<AreaStackChart series={series} width={400} height={200} />);

        expect(container.querySelector('svg')?.getAttribute('aria-label')).toBe('XYChart');
    });

    it('Should format the tooltip values with the tooltip value formatter when given', () => {
        const valueFormatter = vi.fn();
        const tooltipValueFormatter = vi.fn();

        render(
            <AreaStackChart
                series={series}
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

        render(<AreaStackChart series={series} width={400} height={200} valueFormatter={valueFormatter} />);

        expect(tooltipProps).toHaveBeenCalledWith(expect.objectContaining({ valueFormatter }));
    });
});
