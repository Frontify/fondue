/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import { TextInput } from "@elements/TextInput/TextInput";
import { MultiInput as MultiInputComponent, MultiInputLayout, MultiInputProps } from "./MultiInput";

export default {
    title: "Compositions/Multi Input",
    component: MultiInputComponent,
    argTypes: {
        layout: {
            options: Object.values(MultiInputLayout),
            control: { type: "radio" },
        },
    },
    args: {
        layout: MultiInputLayout.Spider,
    },
} as Meta<MultiInputProps>;

export const MultiInput: Story<MultiInputProps> = (args: MultiInputProps) => {
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");

    return (
        <MultiInputComponent {...args}>
            <TextInput value={input1} onChange={(value) => setInput1(value)} />
            <TextInput value={input2} onChange={(value) => setInput2(value)} />
        </MultiInputComponent>
    );
};
