/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react-vite';

import { Slider, type SliderProps } from './Slider';

/**
 ### This component is deprecated, please use the [new Slider component](/docs/current_components-slider--documentation) instead.
 */
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
        'aria-label': { type: 'string' },
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
    parameters: {
        status: {
            type: 'deprecated',
        },
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
    'aria-label': 'Percentage slider',
};

export const DisabledState = SliderTemplate.bind({});
DisabledState.args = {
    value: 20,
    'aria-label': 'Percentage slider',
    disabled: true,
};
