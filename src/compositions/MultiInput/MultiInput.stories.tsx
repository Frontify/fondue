/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import { FormControl } from "@compositions/FormControl/FormControl";
import { TextInput } from "@elements/TextInput/TextInput";
import { Dropdown, DropdownSize } from "@components/Dropdown/Dropdown";
import { MenuItemContentSize } from "@components/Menu/MenuItem/MenuItemContent";
import IconIcons from "@elements/Icon/Generated/IconIcons";
import { IconSize } from "@elements/Icon/IconSize";
import { MultiInput as MultiInputComponent, MultiInputLayout, MultiInputProps } from "./MultiInput";
import generateRandomId from "@utilities/generateRandomId";

export default {
    title: "Compositions/Multi Input",
    component: MultiInputComponent,
    args: {
        layout: MultiInputLayout.Columns,
        spanLastItem: false,
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
    const [input1, setInput1] = useState("Some value");
    const [input2, setInput2] = useState("Some value");
    const [input3, setInput3] = useState("Some value");
    const [input4, setInput4] = useState("Some value");

    return (
        <FormControl
            label={{ children: "Input Label", htmlFor: "input-id", tooltip: { content: "Tooltip text" } }}
            extra="Some extra text."
            helper={{ text: "Input the thing to make it gooo." }}
        >
            <MultiInputComponent {...args}>
                <TextInput value={input1} onChange={(value) => setInput1(value)} />
                <TextInput value={input2} onChange={(value) => setInput2(value)} />
                <TextInput value={input3} onChange={(value) => setInput3(value)} />
                <TextInput value={input4} onChange={(value) => setInput4(value)} />
            </MultiInputComponent>
        </FormControl>
    );
};

export const MultiInputTwoInputs: Story<MultiInputProps> = (args: MultiInputProps) => {
    const [input1, setInput1] = useState("Here's a value");
    const [input2, setInput2] = useState("And here's another one");

    return (
        <FormControl
            label={{ children: "Input Label", htmlFor: "input-id", tooltip: { content: "Tooltip text" } }}
            extra="Some extra text."
            helper={{ text: "Input the thing to make it gooo." }}
        >
            <MultiInputComponent {...args}>
                <TextInput value={input1} onChange={(value) => setInput1(value)} />
                <TextInput value={input2} onChange={(value) => setInput2(value)} />
            </MultiInputComponent>
        </FormControl>
    );
};

export const MultiInputThreeInputs: Story<MultiInputProps> = (args: MultiInputProps) => {
    const [input1, setInput1] = useState("Some value");
    const [input2, setInput2] = useState("Some other value");
    const [activeItemId, setActiveItemId] = useState<string | number | undefined>();

    return (
        <FormControl
            label={{ children: "Input Label", htmlFor: "input-id", tooltip: { content: "Tooltip text" } }}
            extra="Some extra text."
            helper={{ text: "Input the thing to make it gooo." }}
        >
            <MultiInputComponent {...args}>
                <TextInput value={input1} onChange={(value) => setInput1(value)} />
                <TextInput value={input2} onChange={(value) => setInput2(value)} />
                <Dropdown
                    onChange={(id) => setActiveItemId(id)}
                    activeItemId={activeItemId}
                    size={DropdownSize.Small}
                    menuBlocks={[
                        {
                            id: "block1",
                            menuItems: [
                                { id: "1", title: "This is an option", size: MenuItemContentSize.Small },
                                { id: "2", title: "Another option", size: MenuItemContentSize.Small },
                                { id: "3", title: "Third option", size: MenuItemContentSize.Small },
                            ],
                        },
                    ]}
                />
            </MultiInputComponent>
        </FormControl>
    );
};

MultiInputThreeInputs.args = {
    spanLastItem: true,
};

export const MultiInputSpider: Story<MultiInputProps> = (args: MultiInputProps) => {
    const [input1, setInput1] = useState("8px");
    const [input2, setInput2] = useState("8px");
    const [input3, setInput3] = useState("8px");
    const [input4, setInput4] = useState("8px");

    return (
        <FormControl
            label={{ children: "Input Label", htmlFor: "input-id", tooltip: { content: "Tooltip text" } }}
            extra="Some extra text."
            helper={{ text: "Input the thing to make it gooo." }}
        >
            <MultiInputComponent {...args}>
                <TextInput
                    decorator={<IconIcons size={IconSize.Size16} />}
                    value={input1}
                    onChange={(value) => setInput1(value)}
                />
                <TextInput
                    decorator={<IconIcons size={IconSize.Size16} />}
                    value={input2}
                    onChange={(value) => setInput2(value)}
                />
                <TextInput
                    decorator={<IconIcons size={IconSize.Size16} />}
                    value={input3}
                    onChange={(value) => setInput3(value)}
                />
                <TextInput
                    decorator={<IconIcons size={IconSize.Size16} />}
                    value={input4}
                    onChange={(value) => setInput4(value)}
                />
            </MultiInputComponent>
        </FormControl>
    );
};

MultiInputSpider.args = {
    layout: MultiInputLayout.Spider,
};
