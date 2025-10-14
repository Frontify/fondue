/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { Validation } from '@utilities/validation';

import { PasswordInput, type PasswordInputProps } from './PasswordInput';

/**
 ### This component is deprecated, please use the [new Text Input component](/docs/current_components-text-input--documentation) with `type="password"` instead.
 */
export default {
    title: 'Components/Password Input',
    component: PasswordInput,
    tags: ['autodocs'],
    argTypes: {
        autocomplete: {
            control: { type: 'boolean' },
            defaultValue: false,
        },
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
            control: { type: 'text' },
            description: 'Text for placeholder',
            defaultValue: undefined,
        },
        status: {
            control: { type: 'select' },
            options: Object.values(Validation),
            defaultValue: Validation.Default,
        },
        id: {
            table: { disable: true },
        },
        size: {
            table: { disable: true },
        },
        onChange: {
            description: 'onChange callback',
            action: 'onchange',
            defaultValue: undefined,
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
    args: {},
} as Meta<PasswordInputProps>;

const PasswordInputTemplate: StoryFn<PasswordInputProps> = (args) => {
    return <PasswordInput {...args} onChange={action('onchange')} />;
};

export const Default = PasswordInputTemplate.bind({});
Default.args = {
    placeholder: 'Enter password',
};
