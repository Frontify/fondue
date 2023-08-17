/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import {
    BetaLoadingCircle,
    BetaLoadingCircleProps,
    BetaLoadingCircleSize,
    BetaLoadingCircleStyle,
} from './BetaLoadingCircle';

export default {
    title: 'Components/Beta Loading Circle',
    component: BetaLoadingCircle,
    tags: ['autodocs'],
    argTypes: {
        style: {
            options: Object.values(BetaLoadingCircleStyle),
            control: { type: 'select' },
        },
        size: {
            options: Object.values(BetaLoadingCircleSize),
            control: { type: 'radio' },
        },
    },
    args: {
        style: BetaLoadingCircleStyle.Progress,
        size: BetaLoadingCircleSize.Medium,
    },
} as Meta<BetaLoadingCircleProps>;

const LoadingSpinnerTemplate: StoryFn<BetaLoadingCircleProps> = (args: BetaLoadingCircleProps) => (
    <BetaLoadingCircle {...args} />
);

export const Default = LoadingSpinnerTemplate.bind({});
