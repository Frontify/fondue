/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react';
import { cityTemperature } from '@visx/mock-data';

import { ChartHeading } from '@components/ChartHeading';

import { IconRocket } from '../../utils/components/IconRocket';

import { LineChart, type LineChartProps, type LineChartSeries } from './';

export default {
    title: 'Charts/Line Chart',
    component: LineChart,
    parameters: {
        status: {
            type: 'released',
        },
    },
    argTypes: {
        series: {
            name: 'series',
            type: { name: 'other', value: 'LineChartSeries[]', required: true },
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
        hideGlyphs: {
            name: 'hideGlyphs',
            type: { name: 'boolean', required: false },
            description: 'Whether to hide the glyphs on the line chart. Useful for small charts with dense data.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        hideArea: {
            name: 'hideArea',
            type: { name: 'boolean', required: false },
            description: 'Hides the area under the lines if set to true.',
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
        legendPosition: {
            name: 'legendPosition',
            type: { name: 'other', value: 'top | bottom', required: false },
            description: 'Controls whether the legend is placed above or below the chart.',
            table: {
                type: { summary: 'top | bottom' },
                defaultValue: { summary: 'top' },
            },
        },
        highlightNegativeValues: {
            name: 'highlightNegativeValues',
            type: { name: 'boolean', required: false },
            description: 'Renders all negative values in red if set to true.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
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
        areaStack: {
            name: 'areaStack',
            type: { name: 'boolean', required: false },
            description: 'Toggle to control if the chart should be rendered as a stacked area chart.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
    },
} as Meta<LineChartProps>;

const Template: StoryFn<LineChartProps> = (args) => <LineChart {...args} />;
const TemplateWithHeading: StoryFn<LineChartProps> = (args) => (
    <>
        <ChartHeading
            title="US City Temperature"
            description="The temperature of US cities over time"
            icon={<IconRocket />}
        />
        <LineChart {...args} />
    </>
);
const TemplateWithContentOnTop: StoryFn<LineChartProps> = (args) => (
    <div className="tw-h-[1000px] tw-overflow-auto tw-relative">
        <ChartHeading
            title="US City Temperature"
            description="The temperature of US cities over time"
            icon={<IconRocket />}
        />
        <div className="tw-h-[200px] tw-w-[200px] tw-sticky tw-top-0 tw-p-5 tw-bg-[#cd2828]">
            Content on top of chart
        </div>
        <LineChart {...args} />
        <div className="tw-h-[600px] tw-w-[200px]">asdasdas </div>
    </div>
);

const valueFormatter = (value: number) => `${value.toFixed(2)}°F`;

const formattedTemperatureData = ((): LineChartSeries[] => {
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
            valueContext: `Difference with Austin is ${Math.round(parseInt(obj['New York'], 10) - parseInt(obj.Austin, 10))}ºF`,
        });
        sanFrancisco.push({
            value: parseInt(obj['San Francisco'], 10),
            timestamp: new Date(obj.date),
            valueContext: `(Sum with NY is ${parseInt(obj['San Francisco'], 10) + parseInt(obj['New York'], 10)}ºF)`,
        });
    }

    return [
        { name: 'Austin', dataPoints: austin },
        { name: 'New York', dataPoints: newYork },
        { name: 'San Francisco', dataPoints: sanFrancisco },
    ];
})();

const filterOnePointPerWeek = (series: LineChartSeries[]): LineChartSeries[] => {
    const filteredSeries = [];
    for (const item of series) {
        const filteredDataPoints = item.dataPoints.filter((_dataPoint, index) => index % 7 === 0);
        filteredSeries.push({ name: item.name, dataPoints: filteredDataPoints });
    }

    return filteredSeries;
};

const makeMissingData = (series: LineChartSeries[], missingDataAtStart?: boolean): LineChartSeries[] => {
    const withMissingData = [];
    for (const item of series) {
        const filteredDataPoints = item.dataPoints.map((dataPoint, index) => {
            if (
                (index > 10 && index < 20) ||
                (missingDataAtStart && index < 5) ||
                index > item.dataPoints.length - 10 ||
                (item.name === 'New York' && index > 25 && index < 30)
            ) {
                return {
                    value: null,
                    timestamp: dataPoint.timestamp,
                };
            }
            return dataPoint;
        });
        withMissingData.push({ name: item.name, dataPoints: filteredDataPoints });
    }

    return withMissingData;
};

const createNegativeData = (data: LineChartSeries[]): LineChartSeries[] => {
    const withNegativeData = [];
    const fahrenheitToCelsius = (fahrenheit: number): number => (fahrenheit - 32) * (5 / 9);

    for (const item of data) {
        const negativeDataPoints = item.dataPoints.map((dataPoint) => {
            return {
                value: dataPoint.value ? fahrenheitToCelsius(dataPoint.value) - 10 : dataPoint.value,
                timestamp: dataPoint.timestamp,
            };
        });
        withNegativeData.push({ name: `${item.name} minus 10 degrees`, dataPoints: negativeDataPoints });
    }

    return withNegativeData;
};

const addFourthSeries = (data: LineChartSeries[]): LineChartSeries[] => {
    const withFourthSeries = [...data];
    withFourthSeries.push({
        name: 'SF minus 10 degrees',
        // @ts-expect-error Wrong typing in the original code
        dataPoints: data[2].dataPoints.map((dataPoint) => ({
            ...dataPoint,
            value: dataPoint.value ? dataPoint.value - 10 : null,
        })),
    });

    return withFourthSeries;
};

export const SingleDataSet = Template.bind({});
SingleDataSet.args = {
    // @ts-expect-error Wrong typing in the original code
    series: [formattedTemperatureData[0]],
    width: 1000,
    height: 500,
    hideGlyphs: true,
    markLine: {
        value: 32,
        name: 'Freezing',
    },
    valueFormatter,
};

export const SingleDataSetShort = Template.bind({});
SingleDataSetShort.args = {
    // @ts-expect-error Wrong typing in the original code
    series: filterOnePointPerWeek([formattedTemperatureData[0]]),
    width: 1000,
    height: 500,
    valueFormatter,
};

export const SingleWithMissingData = Template.bind({});
SingleWithMissingData.args = {
    // @ts-expect-error Wrong typing in the original code
    series: makeMissingData([formattedTemperatureData[1]]),
    width: 1000,
    height: 500,
    missingValueLabel: 'Missing data',
    hideGlyphs: true,
    valueFormatter,
};

export const SingleWithMissingDataShort = Template.bind({});
SingleWithMissingDataShort.args = {
    // @ts-expect-error Wrong typing in the original code
    series: makeMissingData(filterOnePointPerWeek([formattedTemperatureData[1]])),
    width: 1000,
    height: 500,
    missingValueLabel: 'Missing data',
    valueFormatter,
};

export const ThreeDataSets = Template.bind({});
ThreeDataSets.args = {
    series: formattedTemperatureData,
    width: 1000,
    height: 500,
    hideGlyphs: true,
    valueFormatter,
};

export const ThreeDataSetsShort = Template.bind({});
ThreeDataSetsShort.args = {
    series: filterOnePointPerWeek(formattedTemperatureData),
    width: 1000,
    height: 500,
    valueFormatter,
};

export const ThreeWithMissingData = Template.bind({});
ThreeWithMissingData.args = {
    series: makeMissingData(formattedTemperatureData),
    width: 1000,
    height: 500,
    missingValueLabel: 'Missing data',
    hideGlyphs: true,
    valueFormatter,
};

export const ThreeWithMissingDataShort = Template.bind({});
ThreeWithMissingDataShort.args = {
    series: makeMissingData(filterOnePointPerWeek(formattedTemperatureData)),
    width: 1000,
    height: 500,
    missingValueLabel: 'Missing data',
    valueFormatter,
};

export const ThreeWithMissingDataAtBeginning = Template.bind({});
ThreeWithMissingDataAtBeginning.args = {
    series: makeMissingData(filterOnePointPerWeek(formattedTemperatureData), true),
    width: 1000,
    height: 500,
    missingValueLabel: 'Missing data',
    valueFormatter,
};

export const TooManySeries = Template.bind({});
TooManySeries.args = {
    series: addFourthSeries(formattedTemperatureData),
    width: 1000,
    height: 500,
    missingValueLabel: 'Missing data',
    hideGlyphs: true,
    valueFormatter,
};
export const TooManySeriesShort = Template.bind({});
TooManySeriesShort.args = {
    series: filterOnePointPerWeek(addFourthSeries(formattedTemperatureData)),
    width: 1000,
    height: 500,
    missingValueLabel: 'Missing data',
    valueFormatter,
};

export const TooManySeriesWithMissingDataShort = Template.bind({});
TooManySeriesWithMissingDataShort.args = {
    series: makeMissingData(filterOnePointPerWeek(addFourthSeries(formattedTemperatureData))),
    width: 1000,
    height: 500,
    missingValueLabel: 'Missing data',
    valueFormatter,
};

export const WithHeading = TemplateWithHeading.bind({});
WithHeading.args = {
    series: makeMissingData(filterOnePointPerWeek(addFourthSeries(formattedTemperatureData))),
    width: 1000,
    height: 500,
    missingValueLabel: 'Missing data',
    valueFormatter,
};

export const WithoutLegend = Template.bind({});
WithoutLegend.args = {
    // @ts-expect-error Wrong typing in the original code
    series: filterOnePointPerWeek([formattedTemperatureData[0]]),
    width: 1000,
    height: 500,
    hideLegend: true,
    valueFormatter,
};

export const WithNegativeValues = Template.bind({});
WithNegativeValues.args = {
    // @ts-expect-error Wrong typing in the original code
    series: createNegativeData([formattedTemperatureData[1]]),
    width: 1000,
    height: 500,
    hideGlyphs: true,
    valueFormatter,
};

export const WithNegativeValuesShort = Template.bind({});
WithNegativeValuesShort.args = {
    // @ts-expect-error Wrong typing in the original code
    series: createNegativeData(filterOnePointPerWeek([formattedTemperatureData[1]])),
    width: 1000,
    height: 500,
    valueFormatter,
};

export const ThreeWithNegativeValues = Template.bind({});
ThreeWithNegativeValues.args = {
    series: createNegativeData(formattedTemperatureData),
    width: 1000,
    height: 500,
    hideGlyphs: true,
    valueFormatter,
};

export const ThreeWithNegativeValuesShort = Template.bind({});
ThreeWithNegativeValuesShort.args = {
    series: createNegativeData(filterOnePointPerWeek(formattedTemperatureData)),
    width: 1000,
    height: 500,
    valueFormatter,
};

export const ThreeWithNegativeValuesWithMissingDataShort = Template.bind({});
ThreeWithNegativeValuesWithMissingDataShort.args = {
    series: makeMissingData(createNegativeData(filterOnePointPerWeek(formattedTemperatureData))),
    width: 1000,
    height: 500,
    missingValueLabel: 'Missing data',
    valueFormatter,
};

export const LegendBelowChart = Template.bind({});
LegendBelowChart.args = {
    // @ts-expect-error Wrong typing in the original code
    series: filterOnePointPerWeek([formattedTemperatureData[0]]),
    width: 1000,
    height: 500,
    legendPosition: 'bottom',
    valueFormatter,
};

export const ContentOnTopOfChart = TemplateWithContentOnTop.bind({});
ContentOnTopOfChart.args = {
    series: makeMissingData(filterOnePointPerWeek(addFourthSeries(formattedTemperatureData))),
    width: 1000,
    height: 500,
    missingValueLabel: 'Missing data',
    valueFormatter,
};
