/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react';
import { browserUsage, exoplanets, planets } from '@visx/mock-data';

import { BarChart, type BarChartProps, type BarChartSeries } from './';

export default {
    title: 'Charts/Bar Chart',
    component: BarChart,
    parameters: {
        status: {
            type: 'released',
        },
    },
    argTypes: {
        series: {
            name: 'series',
            type: { name: 'other', value: 'BarChartSeries[]', required: true },
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
        displayStyle: {
            name: 'displayStyle',
            description:
                'Either default or overlapped. default renders bars in groups next to each other. overlapped renders bars on top of each other.',
            control: {
                type: 'select',
            },
            options: ['default', 'overlapped'],
        },
        horizontal: {
            name: 'horizontal',
            type: { name: 'boolean', required: false },
            description: 'Renders the bars horizontally instead of vertically.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
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
        allowDecimalTickValues: {
            name: 'allowDecimalTickValues',
            type: { name: 'boolean', required: false },
            description: 'Allows decimal values on the linear axis.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            },
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
        valueFormatter: {
            name: 'valueFormatter',
            type: { name: 'other', value: '(value: number) => string', required: false },
            description: 'An optional function to format the displayed values (for example for adding units).',
        },
        labelFormatter: {
            name: 'labelFormatter',
            type: { name: 'other', value: '(label: string) => string', required: false },
            description:
                'An optional function to format the displayed labels both on the axis and in the tooltip. BarChart data requires unique labels to work well, which can lead to the necessity of enriching the labels so that they are unique, for example appending an id. This prop can be used to format the labels back to its original form.',
        },
    },
} as Meta<BarChartProps>;

const planetsRadiusData = (() => {
    const formattedData = planets.map((item) => {
        return {
            label: item.name,
            value: parseFloat(item.radius),
        };
    });

    return [
        {
            name: 'Planets by Radius',
            dataPoints: formattedData,
        },
    ];
})();

const exoplanetsRadiusData = (() => {
    const formattedData = exoplanets.slice(0, 100).map((item) => {
        return {
            label: item.name,
            value: item.radius,
        };
    });

    return [
        {
            name: 'Exoplanets by Radius',
            dataPoints: formattedData,
        },
    ];
})();

const browserUsageData = ((): BarChartSeries[] => {
    const chromeSeries: BarChartSeries = {
        name: 'Chrome',
        dataPoints: [],
    };
    const firefoxSeries: BarChartSeries = {
        name: 'Firefox',
        dataPoints: [],
    };
    const safariSeries: BarChartSeries = {
        name: 'Safari',
        dataPoints: [],
    };

    for (const entry of browserUsage) {
        chromeSeries.dataPoints.push({
            label: entry.date,
            value: parseFloat(entry['Google Chrome']),
        });
        firefoxSeries.dataPoints.push({
            label: entry.date,
            value: parseFloat(entry.Firefox),
        });
        safariSeries.dataPoints.push({
            label: entry.date,
            value: parseFloat(entry.Safari),
        });
    }

    return [chromeSeries, firefoxSeries, safariSeries];
})();

const filterOnePointPerMonth = (series: BarChartSeries[]): BarChartSeries[] => {
    const filteredSeries = [];
    for (const item of series) {
        const filteredDataPoints = item.dataPoints.filter((_dataPoint, index) => index % 30 === 0);
        filteredSeries.push({ name: item.name, dataPoints: filteredDataPoints });
    }

    return filteredSeries;
};

const addDetailsWithUrl = (series: BarChartSeries[]): BarChartSeries<{ url: string }>[] => {
    const seriesWithDetails = [];
    for (const item of series) {
        const dataPointsWithDetails = item.dataPoints.map((dataPoint) => {
            return { ...dataPoint, details: { url: `/${dataPoint.label}` } };
        });
        seriesWithDetails.push({ ...item, dataPoints: dataPointsWithDetails });
    }

    return seriesWithDetails;
};

const TemplateWithUrl: StoryFn<BarChartProps<{ url: string }>> = (args) => <BarChart<{ url: string }> {...args} />;
const Template: StoryFn<BarChartProps> = (args) => <BarChart {...args} />;

export const SingleDataSet = Template.bind({});
SingleDataSet.args = {
    series: planetsRadiusData,
    width: 1000,
    height: 500,
};

export const SingleDataSetWithOnClick = TemplateWithUrl.bind({});
SingleDataSetWithOnClick.args = {
    series: addDetailsWithUrl(planetsRadiusData),
    width: 1000,
    height: 500,
    onBarClick: (e) => alert(e.datum.details.url),
};

export const SingleDataSetWith100Points = Template.bind({});
SingleDataSetWith100Points.args = {
    series: exoplanetsRadiusData,
    width: 1000,
    height: 500,
};

export const MultipleDataSets = Template.bind({});
MultipleDataSets.args = {
    series: filterOnePointPerMonth(browserUsageData),
    width: 1000,
    height: 500,
};

export const MultipleDataSetsWithOnClick = TemplateWithUrl.bind({});
MultipleDataSetsWithOnClick.args = {
    series: addDetailsWithUrl(filterOnePointPerMonth(browserUsageData)),
    width: 1000,
    height: 500,
    onBarClick: (e) => alert(e.datum.details.url),
};

export const LegendBelowChart = Template.bind({});
LegendBelowChart.args = {
    series: planetsRadiusData,
    width: 1000,
    height: 500,
    legendPosition: 'bottom',
};
