/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useState } from "react";
import { Button } from "@components/Button";
import { ScrollWrapperDirection, ScrollWrapperProps } from "./types";
import { Story, Meta } from "@storybook/react";
import { ScrollWrapper } from "./ScrollWrapper";
import { TextInput } from "@components/TextInput";
import { FormControl, FormControlDirection, FormControlStyle } from "@components/FormControl";
import { generateRandomId } from "@utilities/generateRandomId";
import { Card } from "..";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/ScrollWrapper",
    component: ScrollWrapper,
} as Meta<ScrollWrapperProps>;

export const Default: Story<ScrollWrapperProps> = (args) => {
    const [input, setInput] = useState("");

    return (
        <div className="tw-max-h-[300px] tw-flex tw-flex-col">
            <ScrollWrapper {...args}>
                <p className="tw-w-[200px]">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda
                    itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat
                    perferendis consequatur.
                </p>
                <p className="tw-w-[200px] ">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda
                    itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat
                    perferendis consequatur.
                </p>
                <p className="tw-w-[200px]">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda
                    itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat
                    perferendis consequatur.
                </p>
                <div className="tw-my-4">
                    <FormControl
                        style={FormControlStyle.Primary}
                        direction={FormControlDirection.Vertical}
                        label={{
                            children: "Input Label",
                            required: false,
                            htmlFor: generateRandomId(),
                            tooltip: { content: "Tooltip Text" },
                        }}
                    >
                        <TextInput value={input} onChange={setInput} />
                    </FormControl>
                </div>
                <Button>Action</Button>
            </ScrollWrapper>
        </div>
    );
};

const CARDS = new Array(8).fill("");

export const Horizontal: Story<ScrollWrapperProps> = (args) => {
    const [input, setInput] = useState("");

    return (
        <div className="tw-w-full">
            <ScrollWrapper {...args} direction={ScrollWrapperDirection.Horizontal}>
                <div className="tw-w-[2500px]">
                    <div className="tw-w-full tw-flex tw-gap-x-2">
                        {CARDS.map((_, index) => (
                            <Card key={index}>
                                <div className="tw-flex tw-justify-center tw-items-center tw-p-3">
                                    Card #{index + 1}
                                </div>
                            </Card>
                        ))}
                    </div>
                    <div className="tw-my-4">
                        <FormControl
                            style={FormControlStyle.Primary}
                            direction={FormControlDirection.Vertical}
                            label={{
                                children: "Input Label",
                                required: false,
                                htmlFor: generateRandomId(),
                                tooltip: { content: "Tooltip Text" },
                            }}
                        >
                            <TextInput value={input} onChange={setInput} />
                        </FormControl>
                    </div>
                    <Button>Action</Button>
                </div>
            </ScrollWrapper>
        </div>
    );
};
