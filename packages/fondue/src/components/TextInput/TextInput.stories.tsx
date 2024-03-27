/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';
import { IconSize } from '@foundation/Icon/IconSize';
import { Meta, StoryFn } from '@storybook/react';
import { TextInput, TextInputProps, TextInputType } from './TextInput';
import { Validation } from '@utilities/validation';
import IconIcon from '@foundation/Icon/Generated/IconIcon';
import { action } from '@storybook/addon-actions';
import { FormField } from '../FormField';

export default {
    title: 'Components/Text Input',
    component: TextInput,
    tags: ['autodocs'],
    args: {
        clearable: false,
        disabled: false,
        required: false,
        autocomplete: false,
        readonly: false,
        dotted: false,
        type: TextInputType.Text,
        validation: Validation.Default,
        spellcheck: true,
        copyable: false,
    },
    argTypes: {
        validation: {
            options: Object.values(Validation),
            control: { type: 'select' },
        },
        spellcheck: {
            options: { undefined, true: true, false: false },
            control: { type: 'select' },
        },
        placeholder: { type: 'string' },
        maxLength: { type: 'number' },
        disabled: {
            control: { type: 'boolean' },
            defaultValue: false,
        },
        readonly: {
            control: { type: 'boolean' },
            defaultValue: false,
        },
        value: { table: { disable: true } },
        obfuscated: { table: { disable: true } },
        type: { table: { disable: true } },
        decorator: { table: { disable: true } },
        onInput: { table: { disable: true }, action: 'onInput' },
        onBlur: { table: { disable: true }, action: 'onBlur' },
        onClear: { table: { disable: true }, action: 'onClear' },
        onFocus: { table: { disable: true }, action: 'onFocus' },
    },
} as Meta<TextInputProps>;

type TextInputStoryProps = TextInputProps & { focus?: boolean };

const TextInputTemplate: StoryFn<TextInputStoryProps> = (args: TextInputStoryProps) => {
    const [input, setInput] = useState('');
    useEffect(() => setInput(`${args.value ?? ''}`), [args.value]);

    return (
        <FormField disabled={args.disabled} label={{ text: 'sample' }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>
    );
};

export const Text = TextInputTemplate.bind({});

Text.argTypes = {
    value: { table: { disable: false }, type: 'string' },
};

export const Prefilled = TextInputTemplate.bind({});

Prefilled.args = {
    value: 'Value text',
};

export const WithPlaceholder = TextInputTemplate.bind({});

WithPlaceholder.args = {
    placeholder: 'Placeholder text',
};

export const WithIconDecorator = TextInputTemplate.bind({});

WithIconDecorator.args = {
    value: 'Value text',
    decorator: <IconIcon size={IconSize.Size16} />,
};

export const WithMaxLength = TextInputTemplate.bind({});

WithMaxLength.args = {
    maxLength: 10,
};

export const Disabled = TextInputTemplate.bind({});

Disabled.args = {
    value: 'This a disabled input',
    disabled: true,
};

export const WithCharacterDecorator = TextInputTemplate.bind({});

WithCharacterDecorator.args = {
    decorator: 'X',
    placeholder: 'Placeholder text',
};

const PasswordArgTypes = {
    obfuscated: { control: { type: 'boolean' }, table: { disable: false } },
};

const PasswordArgs = {
    type: TextInputType.Password,
    value: 'Secret',
};

export const Password = TextInputTemplate.bind({});

Password.argTypes = PasswordArgTypes;

Password.args = { ...PasswordArgs };

export const PasswordWithIconDecorator = TextInputTemplate.bind({});

PasswordWithIconDecorator.argTypes = PasswordArgTypes;

PasswordWithIconDecorator.args = {
    ...PasswordArgs,
    decorator: <IconIcon size={IconSize.Size16} />,
};

export const PasswordWithCharacterDecorator = TextInputTemplate.bind({});

PasswordWithCharacterDecorator.argTypes = PasswordArgTypes;

PasswordWithCharacterDecorator.args = {
    ...PasswordArgs,
    decorator: 'P',
};

export const PasswordVisible = TextInputTemplate.bind({});

PasswordVisible.argTypes = PasswordArgTypes;

PasswordVisible.args = {
    ...PasswordArgs,
    obfuscated: false,
};

export const TypeNumber = TextInputTemplate.bind({});

TypeNumber.argTypes = {
    value: { table: { disable: false }, type: 'number' },
};

TypeNumber.args = {
    type: TextInputType.Number,
};

export const SelectableInput = TextInputTemplate.bind({});

SelectableInput.args = {
    value: 'Value text',
    selectable: true,
};

export const WithExtraActions = TextInputTemplate.bind({});

WithExtraActions.args = {
    value: 'Value text',
    extraActions: [
        {
            title: 'Extra action A',
            onClick: action('extraActionA'),
            icon: <IconIcon />,
        },
        {
            title: 'Extra action B',
            onClick: action('extraActionB'),
            icon: <IconIcon />,
        },
    ],
};

export const WithExtraActionWithTooltip = TextInputTemplate.bind({});

WithExtraActionWithTooltip.args = {
    value: 'Value text',
    extraActions: [
        {
            title: 'First extra action',
            onClick: action('extraAction1'),
            icon: <IconIcon />,
            tooltip: {
                content: 'First extra action tooltip content',
                withArrow: true,
            },
        },
        {
            title: 'Second extra action',
            onClick: action('extraAction2'),
            icon: <IconIcon />,
            tooltip: {
                content: 'Second extra action tooltip content',
                withArrow: true,
            },
        },
    ],
};
