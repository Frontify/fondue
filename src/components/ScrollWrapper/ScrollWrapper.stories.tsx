/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useState } from "react";
import { Button } from "@components/Button";
import { ScrollWrapperProps } from "./types";
import { Story, Meta } from "@storybook/react";
import { ScrollWrapper } from "./ScrollWrapper";
import { TextInput } from "@components/TextInput";
import { FormControl, FormControlDirection, FormControlStyle } from "@components/FormControl";
import { generateRandomId } from "@utilities/generateRandomId";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/ScrollWrapper",
    component: ScrollWrapper,
} as Meta<ScrollWrapperProps>;

export const Default: Story<ScrollWrapperProps> = (args) => {
    const [input, setInput] = useState("");

    return (
        <ScrollWrapper {...args}>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda itaque
                tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat perferendis
                consequatur.
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
    );
};
