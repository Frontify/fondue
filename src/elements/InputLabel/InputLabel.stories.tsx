/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BrightHeaderStyle } from "@components/Tooltip/BrightHeader";
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
        tooltip: {
            content: "Lorem ipsum dolor sit amet.",
            brightHeader: BrightHeaderStyle.Information,
            linkUrl: "https://www.frontify.com",
            buttons: [
                { label: "Primary", action: () => console.log("primary") },
                { label: "Secondary", action: () => console.log("secondary") },
            ],
        },
    },
} as Meta;

export const InputLabel: Story<InputLabelProps> = (args: InputLabelProps) => <InputLabelComponent {...args} />;
