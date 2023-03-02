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
        min: { type: 'number' },
        max: { type: 'number' },
        step: { type: 'number' },
        stepMultiplier: { type: 'number' },
        valueSuffix: { type: 'string' },
        showMinMax: { type: 'boolean' },
        onChange: { type: 'function' },
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

    // onChange must be memoized to avoid infinite re-render of the Slider
    const onChange = useCallback((value: SliderValue) => {
        setValue(value);
    }, []);
    return (
        <div>
            <Slider {...args} value={argValue} valueSuffix={argSuffix} onChange={onChange} />
            <div>Raw value: {value.raw}</div>
            <div>Value with suffix: {value.withSuffix}</div>
        </div>
    );
};

export const BasicUsage = SliderTemplate.bind({});
BasicUsage.args = {
    min: 0,
    max: 100,
    value: 30,
    step: 1,
    valueSuffix: '%',
};

const BASIC_USAGE_CODE_SNIPPET = `
const YourComponent = () => {
    const DEFAULT_VALUE = 30;
    const DEFAULT_SUFFIX = '%';
    const [value, setValue] = useState<SliderValue>({
        raw: DEFAULT_VALUE,
        withSuffix: \`\${DEFAULT_VALUE}\${DEFAULT_SUFFIX}\`,
    });

    // onChange must be memoized to avoid infinite re-render of the Slider
    const onChange = useCallback((value: SliderValue) => {
        setValue(value);
    }, []);
    return (
        <div>
            <Slider 
                min={0}
                max={100}
                step={1}
                value={value.raw}
                valueSuffix={DEFAULT_SUFFIX}
                onChange={onChange} 
            />
            <div>Raw value: {value.raw}</div>
            <div>Value with suffix: {value.withSuffix}</div>
        </div>
    );
};
`;
BasicUsage.parameters = {
    docs: {
        source: {
            code: BASIC_USAGE_CODE_SNIPPET,
            language: 'tsx',
        },
    },
};
