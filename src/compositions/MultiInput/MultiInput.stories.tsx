/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import { TextInput } from "@elements/TextInput/TextInput";
import { MultiInput as MultiInputComponent, MultiInputLayout, MultiInputProps } from "./MultiInput";
import generateRandomId from "@utilities/generateRandomId";

export default {
    title: "Compositions/Multi Input",
    component: MultiInputComponent,
    args: {
        layout: MultiInputLayout.Columns,
        label: {
            children: "Input Label",
            required: false,
            htmlFor: generateRandomId(),
            tooltip: { content: "Tooltip Text" },
        },
        extra: "Extra Text",
        helper: "Input the thing to make it gooo.",
    },
    argTypes: {
        layout: {
            options: Object.values(MultiInputLayout),
            control: { type: "radio" },
        },
    },
} as Meta<MultiInputProps>;

export const MultiInputColumns: Story<MultiInputProps> = (args: MultiInputProps) => {
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [input3, setInput3] = useState("");
    const [input4, setInput4] = useState("");

    return (
        <MultiInputComponent {...args}>
            <TextInput value={input1} onChange={(value) => setInput1(value)} />
            <TextInput value={input2} onChange={(value) => setInput2(value)} />
            <TextInput value={input3} onChange={(value) => setInput3(value)} />
            <TextInput value={input4} onChange={(value) => setInput4(value)} />
        </MultiInputComponent>
    );
};

export const MultiInputSpider: Story<MultiInputProps> = (args: MultiInputProps) => {
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [input3, setInput3] = useState("");
    const [input4, setInput4] = useState("");

    return (
        <MultiInputComponent {...args}>
            <TextInput value={input1} onChange={(value) => setInput1(value)} />
            <TextInput value={input2} onChange={(value) => setInput2(value)} />
            <TextInput value={input3} onChange={(value) => setInput3(value)} />
            <TextInput value={input4} onChange={(value) => setInput4(value)} />
        </MultiInputComponent>
    );
};

MultiInputSpider.args = {
    layout: MultiInputLayout.Spider,
};
