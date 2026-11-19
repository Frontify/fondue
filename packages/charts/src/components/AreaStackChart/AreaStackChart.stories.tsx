/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react-vite';
import { cityTemperature } from '@visx/mock-data';

import { AreaStackChart } from './AreaStackChart';
import { type AreaStackChartProps, type AreaStackChartSeries } from './types';

export default {
    title: 'Charts/Area Stack Chart',
    component: AreaStackChart,
    parameters: {
        status: {
            type: 'released',
        },
    },
    argTypes: {
        series: {
            name: 'series',
            type: { name: 'other', value: 'AreaStackChartSeries[]', required: true },
            description: 'An array of up to three series to be displayed in the chart.',
        },
        height: {
            name: 'height',
            type: { name: 'number', required: true },
            description: 'The height of the chart in pixels.',
        },
        width: {
            name: 'width',
            type: { name: 'number', required: false },
            description:
                'The width of the chart in pixels. If not provided, the chart will adjust its width to the container',
        },
        missingValueLabel: {
            name: 'missingValueLabel',
            type: { name: 'string', required: false },
            description: 'The label to be displayed for missing values. E.g. "No data".',
            defaultValue: '-',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '-' },
            },
        },
        locale: {
            name: 'locale',
            type: { name: 'string', required: false },
            description: 'The locale to be used for formatting the date axis labels.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Browser locale' },
            },
        },
        hideLegend: {
            name: 'hideLegend',
            type: { name: 'boolean', required: false },
            description: 'Hides the legend if set to true.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        dateGranularity: {
            name: 'dateGranularity',
            options: ['day', 'month'],
            control: { type: 'radio' },
            description: '`month` shows the dates on the axis and in the tooltip as months, for data with one point per month.',
        },
        legendPosition: {
            name: 'legendPosition',
            type: { name: 'other', value: 'top | bottom', required: false },
            description: 'Controls whether the legend is placed above or below the chart.',
            table: {
                type: { summary: 'top | bottom' },
                defaultValue: { summary: 'top' },
            },
        },
        markLine: {
            name: 'markLine',
            type: { name: 'other', value: 'MarkLineProps', required: false },
            description: 'Creates a horizontal line on the chart, marking a specific value.',
        },
        valueFormatter: {
            name: 'valueFormatter',
            type: { name: 'other', value: '(value: number) => string', required: false },
            description: 'An optional function to format the displayed values (for example for adding units).',
        },
    },
} as Meta<AreaStackChartProps>;

const KILO_BYTES_IN_BYTE = 1024;

const formatFileSizeFromBytes = (size?: any, decimals = 0) => {
    const parsedSize = parseInt(size?.toString() || '0', 10);

    const unitIndex = Math.floor((parsedSize.toString().length - 1) / 3);
    const unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'][unitIndex];

    if (decimals === 0) {
        return `${Math.ceil(parseFloat((parsedSize / 1024 ** unitIndex).toFixed()))} ${unit}`;
    }

    return `${(parsedSize / KILO_BYTES_IN_BYTE ** unitIndex).toFixed(decimals)} ${unit}`;
};

const MEGA_BYTES_IN_BYTE = 1024 * 1024;

const formatFileSizeFromMegabytes = (value: number) => formatFileSizeFromBytes(value * MEGA_BYTES_IN_BYTE, 1);

const Template: StoryFn<AreaStackChartProps> = (args) => <AreaStackChart {...args} />;

const valueFormatter = (value: number) => `${value.toFixed(2)}°F`;

const formattedTemperatureData = ((): AreaStackChartSeries[] => {
    const austin = [];
    const newYork = [];
    const sanFrancisco = [];

    for (const obj of cityTemperature) {
        austin.push({
            value: parseInt(obj.Austin, 10),
            timestamp: new Date(obj.date),
        });
        newYork.push({
            value: parseInt(obj['New York'], 10),
            timestamp: new Date(obj.date),
        });
        sanFrancisco.push({
            value: parseInt(obj['San Francisco'], 10),
            timestamp: new Date(obj.date),
        });
    }

    return [
        { name: 'Austin', dataPoints: austin },
        { name: 'New York', dataPoints: newYork },
        { name: 'San Francisco', dataPoints: sanFrancisco },
    ];
})();

export const AreaStackedChartStorage = Template.bind({});
AreaStackedChartStorage.args = {
    series: formattedTemperatureData,
    width: 1000,
    height: 500,
    valueFormatter: formatFileSizeFromMegabytes,
    childSumLabel: 'Total',
    markLine: { name: 'Freezing', value: 1500 },
    domain: 'storage',
};

export const AreaStackedChart = Template.bind({});
AreaStackedChart.args = {
    series: formattedTemperatureData,
    width: 1000,
    height: 500,
    valueFormatter,
    childSumLabel: 'Total',
};

const MONTHS = ['2026-05-01', '2026-06-01', '2026-07-01', '2026-08-01', '2026-09-01', '2026-10-01'];

const createMonthlySeries = (months: string[], getValue: (seriesIndex: number, monthIndex: number) => number) =>
    ['A', 'B', 'C'].map((name, seriesIndex) => ({
        name,
        dataPoints: months.map((month, monthIndex) => ({
            timestamp: new Date(month),
            value: getValue(seriesIndex, monthIndex),
        })),
    }));

const MONTHLY_ARGS = {
    width: 760,
    height: 400,
    domain: 'count' as const,
    valueFormatter: (value: number) => value.toFixed(0),
    dateGranularity: 'month' as const,
};

export const MonthlyData = Template.bind({});
MonthlyData.args = {
    series: createMonthlySeries(MONTHS, (seriesIndex, monthIndex) => [190, 95, 30][seriesIndex]! + monthIndex * 5),
    ...MONTHLY_ARGS,
};

export const SingleMonth = Template.bind({});
SingleMonth.args = {
    series: createMonthlySeries(MONTHS.slice(0, 1), (seriesIndex) => [190, 95, 30][seriesIndex]!),
    ...MONTHLY_ARGS,
};

export const SmallValues = Template.bind({});
SmallValues.args = {
    series: createMonthlySeries(MONTHS.slice(0, 2), () => 1),
    ...MONTHLY_ARGS,
};

export const AllZero = Template.bind({});
AllZero.args = {
    series: createMonthlySeries(MONTHS, () => 0),
    ...MONTHLY_ARGS,
};
