/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { NumberInput } from './NumberInput';
import { NumberInputProps } from './types';
import React, { useState } from 'react';
import { IconNook16 } from '@foundation/Icon';
import { Validation } from '@utilities/validation';

export default {
    title: 'Components/Number Input',
    component: NumberInput,
    tags: ['autodocs'],
    args: {},
    argTypes: {
        decorator: {
            description: 'Add decorator element to start of the input',
            name: 'decorator',
            defaultValue: undefined,
            control: { type: 'React Element' },
        },
        incrementable: {
            description: 'Enable increment buttons',
            name: 'incrementable',
            defaultValue: false,
            control: { type: 'boolean' },
        },
        status: {
            description: 'Set the current status of the input',
            name: 'status',
            defaultValue: Validation.Default,
            control: { type: Validation },
        },
        stepInterval: {
            description: 'Set the incremental value',
            name: 'stepInterval',
            defaultValue: 10,
            control: { type: 'number' },
        },
        onChange: {
            description: 'onChange callback',
            name: 'onChange',
            defaultValue: undefined,
            control: { type: '(value: number) => void' },
            action: 'onChange',
        },
        'data-test-id': {
            table: { disable: true },
        },
    },
} as Meta<NumberInputProps>;

export const BaseUsage: StoryFn<NumberInputProps> = (args) => {
    return <NumberInput {...args} placeholder="Enter a number..." />;
};

export const WithDecoratorAndIncrementable: StoryFn<NumberInputProps> = (args) => {
    return <NumberInput {...args} incrementable decorator={<IconNook16 />} stepInterval={20} />;
};

export const WithErrorLessThanZero: StoryFn<NumberInputProps> = (args) => {
    const [status, setStatus] = useState<Validation>(Validation.Success);
    const handleValidation = (value: number) => {
        setStatus(value < 0 ? Validation.Error : Validation.Success);
    };
    return <NumberInput {...args} onChange={handleValidation} incrementable status={status} defaultValue={3} />;
};
