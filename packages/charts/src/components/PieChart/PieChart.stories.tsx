/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react';

import { PieChart, type PieChartDatum, type PieChartProps } from './';

export default {
    title: 'Charts/Pie Chart',
    component: PieChart,
    parameters: {
        status: {
            type: 'released',
        },
    },
    argTypes: {
        data: {
            name: 'data',
            type: { name: 'other', value: 'PieChartDatum[]', required: true },
            description: 'An array of data points to be displayed in the chart.',
        },
        size: {
            name: 'size',
            type: { name: 'number', required: true },
            description: 'The diameter of the pie in pixels.',
        },
        valueFormatter: {
            name: 'valueFormatter',
            type: { name: 'other', value: '(value: number) => string', required: false },
            description: 'An optional function to format the displayed values (for example for adding units).',
            table: {
                type: { summary: 'ValueFormatter' },
                defaultValue: { summary: 'value => String(value)' },
            },
        },
        showLabelTitle: {
            name: 'showLabelTitle',
            type: { name: 'boolean', value: false, required: false },
            description: "Shows the slice's title in label if set to true.",
        },
        showLabelValue: {
            name: 'showLabelValue',
            type: { name: 'boolean', value: false, required: false },
            description: "Shows the slice's value in label if set to true.",
        },
        showLabelPercentage: {
            name: 'showLabelPercentage',
            type: { name: 'boolean', value: false, required: false },
            description: "Shows the slice's percentage in label if set to true.",
        },
        shouldSortData: {
            name: 'shouldSortData',
            type: { name: 'boolean', value: false, required: false },
            description: 'Sorts the data by value if set to true.',
        },
    },
} as Meta<PieChartProps>;

const browserUsageData = ((): PieChartDatum[] => {
    const chrome = {
        label: 'Google Chrome',
        value: 88,
    };
    const firefox = {
        label: 'Firefox',
        value: 12,
    };
    const safari = {
        label: 'Safari',
        value: 3,
    };

    return [chrome, firefox, safari];
})();

const countryRandomNumbers = ((): PieChartDatum[] => {
    const germany = {
        label: 'Germany',
        value: 35,
    };
    const france = {
        label: 'France',
        value: 15,
    };
    const italy = {
        label: 'Italy',
        value: 15,
    };
    const spain = {
        label: 'Spain',
        value: 10,
    };
    const japan = {
        label: 'Japan',
        value: 5,
    };
    const uk = {
        label: 'UK',
        value: 5,
    };
    const sweden = {
        label: 'Sweden',
        value: 23,
    };
    const norway = {
        label: 'Norway',
        value: 5,
    };
    const denmark = {
        label: 'Denmark',
        value: 12,
    };
    const finland = {
        label: 'Finland',
        value: 19,
    };
    const austria = {
        label: 'Austria',
        value: 8,
    };
    const switzerland = {
        label: 'Switzerland',
        value: 3,
    };
    const china = {
        label: 'China',
        value: 1,
    };

    return [japan, switzerland, china, germany, france, italy, spain, uk, sweden, norway, denmark, finland, austria];
})();

const Template: StoryFn<PieChartProps> = (args) => <PieChart {...args} />;

export const ThreeDataPoints = Template.bind({});
ThreeDataPoints.args = {
    data: browserUsageData,
    size: 400,
    valueFormatter: (value) => `${value} users`,
    showLabelTitle: true,
    showLabelValue: true,
    showLabelPercentage: true,
};

export const TenDataPoints = Template.bind({});
TenDataPoints.args = {
    data: countryRandomNumbers.slice(0, 10),
    size: 400,
    valueFormatter: (value) => `${value} users`,
    showLabelTitle: true,
    showLabelValue: true,
    showLabelPercentage: true,
};

export const MoreThanTenDataPoints = Template.bind({});
MoreThanTenDataPoints.args = {
    data: countryRandomNumbers,
    size: 400,
    valueFormatter: (value) => `${value} users`,
    showLabelTitle: true,
    showLabelValue: true,
    showLabelPercentage: true,
};
