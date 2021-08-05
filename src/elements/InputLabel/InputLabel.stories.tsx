/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Meta, Story } from "@storybook/react";
import { InputLabel, InputLabelProps } from "./InputLabel";

export default {
    title: "Elements/Input Label",
    component: InputLabel,
    args: {
        children: "Input Label",
        disabled: false,
        required: false,
    },
    argTypes: {
        tooltip: { type: "string" },
    },
} as Meta;

export const Template: Story<InputLabelProps> = (args: InputLabelProps) => <InputLabel {...args} />;
