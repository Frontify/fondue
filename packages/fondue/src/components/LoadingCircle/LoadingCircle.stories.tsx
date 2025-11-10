/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react-vite';

import { LoadingCircle, type LoadingCircleProps, LoadingCircleSize, LoadingCircleStyle } from './LoadingCircle';

/**
 ### This component is deprecated, please use the [new LoadingCircle component](/docs/current_components-loading-circle--documentation) instead.
 */
export default {
    title: 'Components/LoadingCircle',
    component: LoadingCircle,
    parameters: {
        status: {
            type: 'deprecated',
        },
    },
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
