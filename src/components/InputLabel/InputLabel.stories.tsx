/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Story, Meta } from "@storybook/react";

import InputLabel, { InputLabelProps, Theme } from "./InputLabel";

export default {
    title: "InputLabel",
    component: InputLabel,
} as Meta;

const InputLabelTemplate: Story<InputLabelProps> = (args) => <InputLabel {...args} />;

export const Default = InputLabelTemplate.bind({});

Default.args = {
    children: "Input Label",
    disabled: false,
    required: false,
};

Default.argTypes = {
    tooltip: { type: "string" },
    theme: {
        options: [Theme.Light, Theme.Dark],
        control: { type: "radio" },
    },
};
