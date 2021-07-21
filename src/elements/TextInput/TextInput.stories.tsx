/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import TextInputComponent, { TextInputProps } from "./TextInput";

export default {
    title: "Elements/Text Input",
    component: TextInputComponent,
    argTypes: {
        decorator: { type: "string" },
        onInput: { action: "onInput" },
        onBlur: { action: "onBlur" },
        onClear: { action: "onClear" },
    },
} as Meta;

export const TextInput: Story<TextInputProps> = (args) => <TextInputComponent {...args} />;
