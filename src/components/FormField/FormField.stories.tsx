/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { TextInput, TextInputProps, TextInputType } from '@components/TextInput';
import { FormField, FormFieldProps } from './FormField';
import { useState } from 'react';
import { NumberInputProps } from '@components/NumberInput/types';
import { Validation } from '@utilities/validation';
import { NumberInput, TooltipPosition } from '..';
import { IconInfo, IconNook16, IconQuestionMark, IconSize } from '@foundation/Icon';

export default {
    title: 'Components/FormField',
    component: FormField,
    tags: ['autodocs'],
    argTypes: {
        children: {
            description: 'Input element to be bonded to label.',
            name: 'children',
            control: { type: 'ReactNode' },
        },
        label: {
            description: 'Label object to pass the for the label element.',
            name: 'label',
            control: { type: 'object' },
        },
        errorTextColor: {
            description: 'Token alisa to apply to the error message text.',
            options: Object.values(Validation),
            defaultValue: Validation.Error,
            control: { type: 'select' },
        },
    },
} as Meta<FormFieldProps>;

export const Default: StoryFn<FormFieldProps> = (args) => {
    const defaultLabel: FormFieldProps['label'] = {
        text: 'Number Greater than 0',
        secondaryLabel: '1/10',
        required: true,
        tooltips: [
            {
                tooltip: {
                    content: 'I am a tooltip',
                    triggerElement: <IconQuestionMark />,
                    position: TooltipPosition.Right,
                },
                iconSize: IconSize.Size16,
            },
        ],
    };
    const [currentValue, setCurrentValue] = useState<number | string | undefined>();
    const [error, setError] = useState<boolean>(false);
    const handleChange = (value?: number) => {
        setError(value ? value < 0 : false);
        setCurrentValue(value);
    };
    const currentValidation = error ? Validation.Error : Validation.Success;
    const inputProps: NumberInputProps = {
        controls: true,
        stepInterval: 20,
        clearable: true,
        onChange: handleChange,
        suffix: 'px',
        decorator: <IconNook16 />,
        placeholder: 'Enter a number...',
    };

    return (
        <FormField
            {...args}
            label={defaultLabel}
            error={error}
            errorText={'Value must be greater and 0.'}
            status={isNaN(Number(currentValue)) ? Validation.Default : currentValidation}
        >
            <NumberInput {...inputProps} />
        </FormField>
    );
};

export const InlineWithHelperText: StoryFn<FormFieldProps> = (args) => {
    const defaultLabel: FormFieldProps['label'] = {
        text: 'Enter some text',
        secondaryLabel: '4/10',
        hugWidth: true,
    };
    const [currentValue, setCurrentValue] = useState<string>('');
    const handleChange = (value: string) => setCurrentValue(value.length > 0 ? value : '');
    const inputProps: TextInputProps = { onChange: handleChange, value: currentValue };
    return (
        <FormField
            {...args}
            label={defaultLabel}
            helperText="I am a some helper text with a 'warning' text color."
            helperTextColor={Validation.Warning}
        >
            <TextInput {...inputProps} />
        </FormField>
    );
};

export const WithError: StoryFn<FormFieldProps> = (args) => {
    const [error, setError] = useState<boolean>(false);
    const [currentValue, setCurrentValue] = useState<string>('');
    const handleChange = (value: string) => {
        if (value.length > 0) {
            setCurrentValue(value);
            setError(!/^a+$/.test(value));
        } else {
            setCurrentValue('');
            setError(false);
        }
    };
    const inputProps: TextInputProps = { type: TextInputType.Text, onChange: handleChange, value: currentValue };

    const onlyALabel: FormFieldProps['label'] = {
        text: "Only a's",
        hugWidth: true,
        tooltips: [
            {
                tooltip: {
                    content: "Only enter lowercase a's",
                    position: TooltipPosition.Left,
                    triggerElement: <IconQuestionMark />,
                },
                iconSize: IconSize.Size16,
            },
            {
                tooltip: {
                    content: 'I am tooltip number 1',
                    triggerElement: <IconInfo />,
                    position: TooltipPosition.Right,
                },
                iconSize: IconSize.Size16,
            },
        ],
    };
    return (
        <FormField
            {...args}
            label={onlyALabel}
            error={error}
            errorText={"Please only enter the letter 'a'"}
            errorTextColor={Validation.Error}
        >
            <TextInput {...inputProps} />
        </FormField>
    );
};
