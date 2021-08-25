/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import React from "react";
import { InputLabel as InputLabelComponent, InputLabelProps } from "./InputLabel";

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

export const InputLabel: Story<InputLabelProps> = (args: InputLabelProps) => <InputLabelComponent {...args} />;
