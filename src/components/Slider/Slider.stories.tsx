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
        value: { type: 'number' },
        min: { type: 'number' },
        max: { type: 'number' },
        step: { type: 'number' },
        stepMultiplier: { type: 'number' },
        label: { type: 'string' },
        ['aria-label']: { type: 'string' },
        valueSuffix: { type: 'string' },
        showMinMax: { type: 'boolean' },
        disabled: { type: 'boolean' },
        onChange: { action: 'Value change' },
        onError: { action: 'Slider error' },
    },
    args: {
        min: 0,
        max: 100,
        stepMultiplier: 5,
    },
} as Meta<SliderProps>;

const SliderTemplate: StoryFn<SliderProps> = (args: SliderProps) => {
    return <Slider {...args} />;
};

export const BasicUsage = SliderTemplate.bind({});
BasicUsage.args = {
    min: 0,
    max: 100,
    value: 30,
    step: 1,
    valueSuffix: '%',
    ['aria-label']: 'Percentage slider',
};

export const DisabledState = SliderTemplate.bind({});
DisabledState.args = {
    value: 20,
    ['aria-label']: 'Percentage slider',
    disabled: true,
};
