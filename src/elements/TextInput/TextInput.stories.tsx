/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import TextInputComponent, { TextInputProps, TextInputType } from "./TextInput";

export default {
    title: "Elements/Text Input",
    component: TextInputComponent,
    args: {
        clearable: false,
        disabled: false,
        required: false,
        type: TextInputType.Text,
    },
    argTypes: {
        type: {
            options: Object.values(TextInputType),
            type: "select",
        },
        decorator: { type: "string" },
        placeholder: { type: "string" },
        onInput: { action: "onInput" },
        onBlur: { action: "onBlur" },
        onClear: { action: "onClear" },
    },
} as Meta<TextInputProps>;

export const TextInput: Story<TextInputProps> = (args: TextInputProps) => <TextInputComponent {...args} />;
