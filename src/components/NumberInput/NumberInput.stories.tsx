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
        decorator: { table: { disable: false } },
        incrementable: { type: 'boolean' },
        onChange: { action: 'onChange' },
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
