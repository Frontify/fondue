/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Meta, Story } from "@storybook/react";
import { Textarea as TextareaComponent, TextareaProps } from "./Textarea";
import { Validation } from "@utilities/validation";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Textarea",
    component: TextareaComponent,
    args: {
        disabled: false,
        required: false,
        validation: Validation.Default,
    },
    argTypes: {
        value: { type: "string" },
        placeholder: { type: "string" },
        decorator: { type: "string" },
        onInput: { action: "onInput" },
        onBlur: { action: "onBlur" },
        onClear: { action: "onClear" },
        validation: {
            options: Object.values(Validation),
            control: { type: "select" },
        },
    },
} as Meta<TextareaProps>;

export const Textarea: Story<TextareaProps> = (args: TextareaProps) => <TextareaComponent {...args} />;
