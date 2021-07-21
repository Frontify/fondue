/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import { Theme } from "@utilities/enum";
import InputLabelComponent, { InputLabelProps } from "./InputLabel";

export default {
    title: "Elements/Input Label",
    component: InputLabelComponent,
    args: {
        children: "Input Label",
        disabled: false,
        required: false,
    },
    argTypes: {
        tooltip: { type: "string" },
        theme: {
            options: [Theme.Light, Theme.Dark],
            control: { type: "radio" },
        },
    },
} as Meta;

export const InputLabel: Story<InputLabelProps> = (args) => <InputLabelComponent {...args} />;
