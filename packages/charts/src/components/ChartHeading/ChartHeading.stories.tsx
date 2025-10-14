/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type StoryFn } from '@storybook/react-vite';

import { ChartHeading, type ChartHeadingProps } from '@components/ChartHeading';

import { IconRocket } from '../../utils/components/IconRocket';

export default {
    title: 'Components/Chart Heading',
    component: ChartHeading,
    parameters: {
        status: {
            type: 'released',
        },
    },
};

const Template: StoryFn<ChartHeadingProps> = (args) => <ChartHeading {...args} />;

export const TitleAndDescription = Template.bind({});
TitleAndDescription.args = {
    title: 'US City Temperature',
    description: 'The temperature of US cities over time',
};

export const TitleIconAndDescription = Template.bind({});
TitleIconAndDescription.args = {
    title: 'US City Temperature',
    description: 'The temperature of US cities over time',
    icon: <IconRocket />,
};

export const TitleAndIcon = Template.bind({});
TitleAndIcon.args = {
    title: 'US City Temperature',
    icon: <IconRocket />,
};

export const TitleOnly = Template.bind({});
TitleOnly.args = {
    title: 'US City Temperature',
};

export const TitleAsNode = Template.bind({});
TitleAsNode.args = {
    title: (
        <h1 style={{ color: 'red' }}>
            This is a <b>React</b> Node
        </h1>
    ),
};
