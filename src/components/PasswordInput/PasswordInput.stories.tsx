/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { PasswordInput, PasswordInputProps } from './PasswordInput';
import { Validation } from '@utilities/validation';
import { action } from '@storybook/addon-actions';

export default {
    title: 'Components/Password Input',
    component: PasswordInput,
    tags: ['autodocs'],
    argTypes: {
        disabled: {
            control: { type: 'boolean' },
            description: 'Flag to disable input',
            defaultValue: false,
        },
        clearable: {
            control: { type: 'boolean' },
            description: 'Render clear button at the end of the input to allow for clearing of the value.',
            defaultValue: false,
        },
        obfuscated: {
            control: { type: 'boolean' },
            description: 'Flag to show or obfuscate input value on initial render.',
            defaultValue: true,
        },
        placeholder: {
            control: { type: 'string' },
            description: 'Text for placeholder',
            defaultValue: undefined,
        },
        status: {
            control: { type: 'select' },
            options: Object.values(Validation),
            defaultValue: Validation.Default,
        },
        onChange: {
            control: { type: 'callback' },
            description: 'onChange callback',
            action: 'onchange',
            defaultValue: undefined,
        },
        'data-test-id': {
            table: { disable: true },
        },
    },
    args: {},
} as Meta<PasswordInputProps>;

const PasswordInputTemplate: StoryFn<PasswordInputProps> = (args) => {
    return <PasswordInput {...args} onChange={action('onchange')} />;
};

export const Default = PasswordInputTemplate.bind({});
Default.args = {
    placeholder: 'Enter password',
};
