/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useCallback, useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Slider, SliderProps, SliderValue } from './Slider';

export default {
    title: 'Components/Slider',
    component: Slider,
    tags: ['autodocs'],
    argTypes: {
        id: { type: 'string' },
        value: { type: 'number' },
        valueSuffix: { type: 'string' },
    },
    args: {
        min: 0,
        max: 100,
    },
} as Meta<SliderProps>;

const SliderTemplate: StoryFn<SliderProps> = (args: SliderProps) => {
    const argValue = args.value || args.min || 0;
    const argSuffix = args.valueSuffix || '';
    const [value, setValue] = useState<SliderValue>({
        raw: argValue,
        withSuffix: `${argValue}${argSuffix}`,
    });

    const onChange = useCallback((value: SliderValue) => {
        setValue(value);
    }, []);
    return (
        <div>
            <Slider {...args} value={argValue} valueSuffix={argSuffix} onChange={onChange} />
            <div>Raw value: {value.raw}</div>
            <div>Value with suffix: {value.withSuffix}</div>
            <div>Min: {args.min || 0}</div>
            <div>Max: {args.max || 100}</div>
            <div>Step: {args.step || 1}</div>
            <div>Step multiplier: {args.stepMultiplier || 1}</div>
            <div>Value suffix: {argSuffix}</div>
        </div>
    );
};

export const BasicUsage = SliderTemplate.bind({});
BasicUsage.args = {
    min: 0,
    max: 100,
    step: 50,
    valueSuffix: '%',
};
