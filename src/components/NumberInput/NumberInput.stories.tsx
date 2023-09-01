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
        error: { type: 'boolean' },
        errorText: { type: 'string' },
        decorator: { table: { disable: false } },
        incrementable: { type: 'boolean' },
    },
} as Meta<NumberInputProps>;

export const BaseUsage: StoryFn<NumberInputProps> = (args) => {
    return <NumberInput {...args} />;
};

export const WithDecoratorAndIncrementable: StoryFn<NumberInputProps> = (args) => {
    return <NumberInput {...args} incrementable decorator={<IconNook16 />} />;
};

export const WithErrorLessThanZero: StoryFn<NumberInputProps> = (args) => {
    const [error, setError] = useState<boolean>(false);
    const errorText = 'Value must be above 0.';
    const handleValidation = (value: string) => {
        +value < 0 && !error && setError(!error);
        +value >= 0 && error && setError(!error);
    };

    return (
        <NumberInput
            {...args}
            onChange={(event) => handleValidation(event)}
            incrementable
            error={error}
            errorText={errorText}
            validation={Validation.Error}
        />
    );
};
