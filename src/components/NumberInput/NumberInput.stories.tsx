/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { NumberInput } from './NumberInput';
import { NumberInputProps } from './types';
import { useState } from 'react';
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
        suffix: {
            description: 'String to append to the input value.',
            name: 'suffix',
            defaultValue: undefined,
            control: { type: 'text' },
        },
        controls: {
            description: 'Enable increment buttons',
            name: 'controls',
            defaultValue: false,
            control: { type: 'boolean' },
        },
        clearable: {
            description: 'Enable clear button',
            name: 'clearable',
            defaultValue: false,
            control: { type: 'boolean' },
        },
        status: {
            description: 'Set the current status of the input',
            name: 'status',
            options: Object.values(Validation),
            control: { type: 'select' },
            defaultValue: Validation.Default,
        },
        stepInterval: {
            description: 'Set the incremental value',
            name: 'stepInterval',
            defaultValue: 10,
            control: { type: 'number' },
        },
        valueSelect: {
            description: 'Highlight current input value.',
            name: 'valueSelect',
            defaultValue: false,
            control: { type: 'boolean' },
        },
        onChange: {
            description: 'onChange callback',
            name: 'onChange',
            defaultValue: undefined,
            action: 'onChange',
        },
        'data-test-id': {
            table: { disable: true },
        },
    },
} as Meta<NumberInputProps>;

export const BaseUsage: StoryFn<NumberInputProps> = (args) => {
    return <NumberInput {...args} placeholder="Enter a number..." clearable />;
};

export const WithDecoratorAndIncrementable: StoryFn<NumberInputProps> = (args) => {
    return <NumberInput {...args} controls decorator={<IconNook16 />} />;
};

export const WithErrorLessThanZero: StoryFn<NumberInputProps> = (args) => {
    const [status, setStatus] = useState<Validation>(Validation.Success);
    const [valueSelect, setValueSelect] = useState<boolean>(false);
    const handleValidation = (value: number = 0) => {
        setStatus(value < 0 ? Validation.Error : Validation.Success);
        setValueSelect(value < 0);
    };
    return (
        <NumberInput
            {...args}
            onChange={handleValidation}
            controls
            status={status}
            valueSelect={valueSelect}
            defaultValue={3}
        />
    );
};
