/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useEffect, useState } from "react";
import IconIcons from "@foundation/Icon/Generated/IconIcons";
import { IconSize } from "@foundation/Icon/IconSize";
import { Meta, Story } from "@storybook/react";
import { TextInput, TextInputProps, TextInputType } from "./TextInput";
import { Validation } from "@utilities/validation";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Text Input",
    component: TextInput,
    args: {
        clearable: false,
        disabled: false,
        required: false,
        autocomplete: false,
        dotted: false,
        type: TextInputType.Text,
        validation: Validation.Default,
        spellcheck: true,
    },
    argTypes: {
        validation: {
            options: Object.values(Validation),
            control: { type: "select" },
        },
        spellcheck: {
            options: { undefined: undefined, true: true, false: false },
            control: { type: "select" },
        },
        placeholder: { type: "string" },
        value: { table: { disable: true } },
        obfuscated: { table: { disable: true } },
        type: { table: { disable: true } },
        decorator: { table: { disable: true } },
        onInput: { table: { disable: true }, action: "onInput" },
        onBlur: { table: { disable: true }, action: "onBlur" },
        onClear: { table: { disable: true }, action: "onClear" },
    },
} as Meta<TextInputProps>;

const TextInputTemplate: Story<TextInputProps> = (args) => {
    const [input, setInput] = useState("");
    useEffect(() => setInput(`${args.value || ""}`), [args.value]);

    return <TextInput {...args} value={input} onChange={setInput} />;
};

export const Text = TextInputTemplate.bind({});

Text.argTypes = {
    value: { table: { disable: false }, type: "string" },
};

export const Prefilled = TextInputTemplate.bind({});

Prefilled.args = {
    value: "Value text",
};

export const WithPlaceholder = TextInputTemplate.bind({});

WithPlaceholder.args = {
    placeholder: "Placeholder text",
};

export const WithIconDecorator = TextInputTemplate.bind({});

WithIconDecorator.args = {
    value: "Value text",
    decorator: <IconIcons size={IconSize.Size16} />,
};

export const WithCharacterDecorator = TextInputTemplate.bind({});

WithCharacterDecorator.args = {
    decorator: "X",
    placeholder: "Placeholder text",
};

const PasswordArgTypes = {
    obfuscated: { control: { type: "boolean" }, table: { disable: false } },
};

const PasswordArgs = {
    type: TextInputType.Password,
    value: "Secret",
};

export const Password = TextInputTemplate.bind({});

Password.argTypes = PasswordArgTypes;

Password.args = { ...PasswordArgs };

export const PasswordWithIconDecorator = TextInputTemplate.bind({});

PasswordWithIconDecorator.argTypes = PasswordArgTypes;

PasswordWithIconDecorator.args = {
    ...PasswordArgs,
    decorator: <IconIcons size={IconSize.Size16} />,
};

export const PasswordWithCharacterDecorator = TextInputTemplate.bind({});

PasswordWithCharacterDecorator.argTypes = PasswordArgTypes;

PasswordWithCharacterDecorator.args = {
    ...PasswordArgs,
    decorator: "P",
};

export const PasswordVisible = TextInputTemplate.bind({});

PasswordVisible.argTypes = PasswordArgTypes;

PasswordVisible.args = {
    ...PasswordArgs,
    obfuscated: false,
};

export const TypeNumber = TextInputTemplate.bind({});

TypeNumber.argTypes = {
    value: { table: { disable: false }, type: "number" },
};

TypeNumber.args = {
    type: TextInputType.Number,
};
