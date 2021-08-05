/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Meta, Story } from "@storybook/react";
import { Textarea, TextareaProps } from "./Textarea";

export default {
    title: "Elements/Textarea",
    component: Textarea,
    args: {
        disabled: false,
        required: false,
    },
    argTypes: {
        placeholder: { type: "string" },
        decorator: { type: "string" },
        onInput: { action: "onInput" },
        onBlur: { action: "onBlur" },
        onClear: { action: "onClear" },
    },
} as Meta<TextareaProps>;

export const Template: Story<TextareaProps> = (args: TextareaProps) => <Textarea {...args} />;
