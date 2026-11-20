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
        tooltipMode: {
            name: 'tooltipMode',
            options: ['all', 'hovered'],
            control: { type: 'radio' },
            description:
                '`all` lists every section in the tooltip. `hovered` shows only the section under the pointer or keyboard focus, with its description.',
        },
        legendPosition: {
            name: 'legendPosition',
            options: ['top', 'bottom'],
            control: { type: 'radio' },
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

export const HoveredSectionTooltip = Template.bind({});
HoveredSectionTooltip.storyName = 'Hovered section tooltip with legend below';
HoveredSectionTooltip.parameters = {
    docs: {
        description: {
            story: 'Hover or tab to a section or a legend entry to see only that section, with its description. Escape closes the tooltip.',
        },
    },
};
HoveredSectionTooltip.args = {
    tooltipMode: 'hovered',
    legendPosition: 'bottom',
    sections: [
        { name: 'A', label: '210', percentage: 52.5, description: 'What counts towards A.' },
        {
            name: 'B',
            label: '120',
            percentage: 30,
            description: 'What counts towards B, which can be a longer description.',
        },
        { name: 'C', label: '48', percentage: 12, description: 'What counts towards C.' },
    ],
};

export const FullBar = Template.bind({});
FullBar.args = {
    totalValue: '378',
    totalLabel: 'Total',
    sections: [
        { name: 'A', label: '210', percentage: 55.5 },
        { name: 'B', label: '120', percentage: 31.8 },
        { name: 'C', label: '48', percentage: 12.7 },
    ],
};

export const EmptySections = Template.bind({});
EmptySections.parameters = {
    docs: {
        description: {
            story: 'Sections at 0% stay focusable, so their tooltip can still be reached.',
        },
    },
};
EmptySections.args = {
    ...HoveredSectionTooltip.args,
    sections: HoveredSectionTooltip.args.sections?.map((section) => ({ ...section, label: '–', percentage: 0 })),
};
