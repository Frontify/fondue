/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { TextInput, TextInputType } from '@components/TextInput';
import { FormField, FormFieldProps } from './FormField';
import { useState } from 'react';
import { Validation } from '@utilities/validation';
import { NumberInput } from '..';
import { IconInfo, IconNook16, IconQuestionMark } from '@foundation/Icon';

export default {
    title: 'Components/FormField',
    component: FormField,
    tags: ['autodocs'],
    argTypes: {
        children: {
            description: 'Input element to be bonded to label.',
            name: 'children',
            control: { type: 'ReactElement' },
        },
        label: {
            description: 'Label object to pass the for the label element.',
            name: 'label',
            control: { type: 'object' },
        },
        error: {
            description: 'Boolean flag to indicate a error state.',
            name: 'error',
            defaultValue: false,
            control: { type: 'boolean' },
        },
        errorText: {
            description: 'Error text to display on error state.',
            name: 'errorText',
            defaultValue: undefined,
            control: { type: 'string' },
        },
        errorTextColor: {
            description: 'Token alisa to apply to the error message text.',
            options: Object.values(Validation),
            defaultValue: Validation.Error,
            control: { type: 'select' },
        },
        helperText: {
            description: 'Helper text to display on helper state.',
            name: 'helperText',
            defaultValue: undefined,
            control: { type: 'string' },
        },
        helperTextColor: {
            description: 'Token alisa to apply to the helper message text.',
            options: Object.values(Validation),
            defaultValue: Validation.Default,
            control: { type: 'select' },
        },
        hiddenLabel: {
            description: 'Boolean flag to hide label text.',
            name: 'hiddenLabel',
            defaultValue: false,
            control: { type: 'boolean' },
        },
        disabled: {
            description: 'Boolean flag to disable the entire element.',
            name: 'disabled',
            defaultValue: false,
            control: { type: 'boolean' },
        },
        readOnly: {
            description: 'Boolean flag to make entire element a readOnly state.',
            name: 'readOnly',
            defaultValue: false,
            control: { type: 'boolean' },
        },
    },
    args: {
        error: false,
    },
} as Meta<FormFieldProps>;

export const Default: StoryFn<FormFieldProps> = (args) => {
    const [currentValue, setCurrentValue] = useState<number | string | undefined>(undefined);
    const handleChange = (value?: number) => {
        args.error = value ? value < 0 : false;
        setCurrentValue(value);
    };
    const currentValidation = args.error ? Validation.Error : Validation.Success;
    return (
        <FormField
            {...args}
            label={{
                text: 'Number Greater than 0',
                secondaryLabel: '1/10',
                required: true,
            }}
            // error={error}
            errorText={'Value must be greater and 0.'}
            status={isNaN(Number(currentValue)) ? Validation.Default : currentValidation}
        >
            <NumberInput
                controls={true}
                stepInterval={20}
                clearable={true}
                onChange={handleChange}
                suffix="px"
                decorator={<IconNook16 />}
                placeholder="Enter a number..."
            />
        </FormField>
    );
};

export const InlineWithHelperText: StoryFn<FormFieldProps> = (args) => {
    const [currentValue, setCurrentValue] = useState<string>('');
    const handleChange = (value: string) => setCurrentValue(value.length > 0 ? value : '');
    return (
        <FormField
            {...args}
            label={{
                text: 'Enter some text',
                secondaryLabel: '4/10',
                hugWidth: true,
            }}
            helperText="I am a some helper text with a 'warning' text color."
            helperTextColor={Validation.Warning}
        >
            <TextInput type={TextInputType.Text} onChange={handleChange} value={currentValue} />
        </FormField>
    );
};

export const WithError: StoryFn<FormFieldProps> = (args) => {
    const [currentValue, setCurrentValue] = useState<string>('');
    const handleChange = (value: string) => {
        if (value.length > 0) {
            setCurrentValue(value);
            args.error = !/^a+$/.test(value);
        } else {
            setCurrentValue('');
            args.error = false;
        }
    };
    return (
        <FormField
            {...args}
            label={{
                text: "Only a's",
                hugWidth: true,
                tooltips: [
                    {
                        content: "Only enter lowercase a's",
                        children: <IconQuestionMark />,
                        size: 'compact',
                    },
                    {
                        content: 'I am tooltip number 1',
                        children: <IconInfo />,
                        size: 'compact',
                    },
                ],
            }}
            errorText={"Please only enter the letter 'a'"}
            errorTextColor={Validation.Error}
        >
            <TextInput type={TextInputType.Text} onChange={handleChange} value={currentValue} />
        </FormField>
    );
};

WithError.parameters = {
    docs: { source: { type: 'code' } },
};
