/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconIcons from "@elements/Icon/Generated/IconIcons";
import { IconSize } from "@elements/Icon/Icon";
import { Meta, Story } from "@storybook/react";
import TextInput, { TextInputProps, TextInputType, Validation } from "./TextInput";

export default {
    title: "Elements/Text Input",
    component: TextInput,
    args: {
        clearable: false,
        disabled: false,
        required: false,
        dotted: false,
        type: TextInputType.Text,
        validation: Validation.Default,
    },
    argTypes: {
        validation: {
            options: Object.values(Validation),
            type: "select",
        },
        placeholder: { type: "string" },
        defaultValue: { type: "string" },
        obfuscated: { table: { disable: true } },
        type: { table: { disable: true } },
        decorator: { table: { disable: true } },
        onInput: { table: { disable: true }, action: "onInput" },
        onBlur: { table: { disable: true }, action: "onBlur" },
        onClear: { table: { disable: true }, action: "onClear" },
    },
} as Meta<TextInputProps>;

const TextInputTemplate: Story<TextInputProps> = (args) => <TextInput {...args} />;

export const Text = TextInputTemplate.bind({});

export const Prefilled = TextInputTemplate.bind({});

Prefilled.args = {
    defaultValue: "Value text",
};

export const WithPlaceholder = TextInputTemplate.bind({});

WithPlaceholder.args = {
    placeholder: "Placeholder text",
};

export const WithIconDecorator = TextInputTemplate.bind({});

WithIconDecorator.args = {
    defaultValue: "Value text",
    decorator: <IconIcons size={IconSize.Size16} />,
};

export const WithCharacterDecorator = TextInputTemplate.bind({});

WithCharacterDecorator.args = {
    decorator: "X",
};

export const Password = TextInputTemplate.bind({});

Password.args = {
    type: TextInputType.Password,
    defaultValue: "Secret",
};

export const PasswordWithIconDecorator = TextInputTemplate.bind({});

PasswordWithIconDecorator.args = {
    type: TextInputType.Password,
    defaultValue: "Secret",
    decorator: <IconIcons size={IconSize.Size16} />,
};

export const PasswordWithCharacterDecorator = TextInputTemplate.bind({});

PasswordWithCharacterDecorator.args = {
    type: TextInputType.Password,
    defaultValue: "Secret",
    decorator: "P",
};

export const PasswordVisible = TextInputTemplate.bind({});

PasswordVisible.argTypes = {
    obfuscated: { table: { disable: false } },
};

PasswordVisible.args = {
    type: TextInputType.Password,
    obfuscated: false,
    defaultValue: "Secret",
};
