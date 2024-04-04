/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react';

import { LoadingCircle, type LoadingCircleProps, LoadingCircleSize, LoadingCircleStyle } from './LoadingCircle';

export default {
    title: 'Components/LoadingCircle',
    component: LoadingCircle,
    tags: ['autodocs'],
    argTypes: {
        style: {
            options: Object.values(LoadingCircleStyle),
            control: { type: 'select' },
        },
        size: {
            options: Object.values(LoadingCircleSize),
            control: { type: 'radio' },
        },
    },
    args: {
        style: LoadingCircleStyle.Progress,
        size: LoadingCircleSize.Medium,
    },
} as Meta<LoadingCircleProps>;

const LoadingSpinnerTemplate: StoryFn<LoadingCircleProps> = (args: LoadingCircleProps) => <LoadingCircle {...args} />;

export const Default = LoadingSpinnerTemplate.bind({});
