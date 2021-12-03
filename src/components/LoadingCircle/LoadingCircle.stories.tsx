/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Story, Meta } from "@storybook/react";
import { LoadingCircle, LoadingCircleProps, LoadingCircleSize, LoadingCircleStyle } from "./LoadingCircle";

export default {
    title: "Components/LoadingCircle",
    component: LoadingCircle,
    argTypes: {
        style: {
            options: Object.values(LoadingCircleStyle),
            control: { type: "select" },
        },
        size: {
            options: Object.values(LoadingCircleSize),
            control: { type: "radio" },
        },
    },
    args: {
        style: LoadingCircleStyle.Progress,
        size: LoadingCircleSize.Medium,
    },
} as Meta<LoadingCircleProps>;

const LoadingSpinnerTemplate: Story<LoadingCircleProps> = (args: LoadingCircleProps) => <LoadingCircle {...args} />;

export const Default = LoadingSpinnerTemplate.bind({});
