/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import { Theme } from "@utilities/enum";
import InputLabel, { InputLabelProps } from "./InputLabel";

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
