/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
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
    },
} as Meta;

export const InputLabel: Story<InputLabelProps> = (args) => <InputLabelComponent {...args} />;
