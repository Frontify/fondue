/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react-vite';
import { useState } from 'react';

import IconNook16 from '@foundation/Icon/Generated/IconNook16';
import { Validation } from '@utilities/validation';

import { Box } from '../Box/Box';

import { NumberInput } from './NumberInput';
import { type NumberInputProps } from './types';

/**
 ### This component is deprecated, please use the [new Text Input component](/docs/current_components-text-input--documentation) with `type="number"` instead.
 */
// @ts-expect-error type changed?
export default {
    title: 'Components/Number Input',
    component: NumberInput,
    tags: ['autodocs'],
    args: { clearable: false },
    argTypes: {
        decorator: {
            description: 'Add decorator element to start of the input',
            name: 'decorator',
            defaultValue: undefined,
        },
        suffix: {
            description: 'String to append to the input value.',
            name: 'suffix',
            defaultValue: undefined,
            control: { type: 'text' },
        },
        disabled: {
            type: 'boolean',
            table: {
                type: { summary: 'boolean | undefined' },
                defaultValue: { summary: false },
            },
        },
        readOnly: {
            type: 'boolean',
            table: {
                type: { summary: 'boolean | undefined' },
                defaultValue: { summary: false },
            },
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
        hugWidth: {
            description: 'If `true` element will have a `auto` width, else `full` width',
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
    parameters: {
        status: {
            type: 'deprecated',
        },
    },
} as Meta<NumberInputProps>;

export const BaseUsage: StoryFn<NumberInputProps> = (args) => {
    return <NumberInput {...args} placeholder="Enter a number..." />;
};

BaseUsage.args = {
    clearable: true,
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

export const WithHugWidth: StoryFn<NumberInputProps> = (args) => {
    return (
        <Box className="tw-w-[400px]">
            <NumberInput {...args} controls hugWidth placeholder="Input has a width of `auto`" />
        </Box>
    );
};
