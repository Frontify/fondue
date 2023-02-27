/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Slider, SliderProps } from './Slider';

export default {
    title: 'Components/Slider',
    component: Slider,
    tags: ['autodocs'],
    argTypes: {
        id: { type: 'string' },
    },
    args: {
        min: 0,
        max: 100,
        valueUnitSuffix: '',
        value: 20,
    },
} as Meta<SliderProps>;

const SliderTemplate: StoryFn<SliderProps> = (args: SliderProps) => {
    return <Slider {...args} />;
};

export const BasicUsage = SliderTemplate.bind({});
BasicUsage.args = {};
