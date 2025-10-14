/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react-vite';

import { LinearGauge, type LinearGaugeProps } from '@components/LinearGauge/LinearGauge';

export default {
    title: 'Charts/Linear Gauge Chart',
    component: LinearGauge,
    parameters: {
        status: {
            type: 'released',
        },
    },
    argTypes: {
        sections: {
            name: 'sections',
            type: { name: 'other', value: 'Section[]', required: true },
            description: 'An array of sections to be displayed in the linear gauge.',
        },
    },
} as Meta;
const Template: StoryFn<LinearGaugeProps> = (args: LinearGaugeProps) => <LinearGauge {...args} />;

export const SingleDataSet = Template.bind({});
SingleDataSet.args = {
    totalValue: '6 GB',
    totalLabel: 'Total',
    sections: [
        { name: 'A', label: '1 GB', percentage: 15 },
        { name: 'B', label: '2 GB', percentage: 30 },
        { name: 'C', label: '3 GB', percentage: 40 },
    ],
};
