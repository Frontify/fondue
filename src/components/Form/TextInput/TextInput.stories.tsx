/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Story, Meta } from "@storybook/react";
import TextInput, { TextInputProps } from "./TextInput";

export default {
    title: "Form/TextInput",
    component: TextInput,
} as Meta;

const TextInputTemplate: Story<TextInputProps> = (args) => <TextInput {...args} />;

export const Default = TextInputTemplate.bind({});

Default.args = {};

Default.argTypes = {
    decorator: { type: "string" },
    onInput: { action: "onInput" },
    onBlur: { action: "onBlur" },
    onClear: { action: "onClear" },
};
