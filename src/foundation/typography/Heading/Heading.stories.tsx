/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import React from "react";
import { Heading as HeadingComponent, HeadingProps } from "./Heading";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Foundation/Typography/Heading",
    component: HeadingComponent,
    argTypes: {
        size: {
            options: ["medium", "large", "x-large"],
            control: { type: "select" },
        },
        weight: {
            options: ["medium", "strong"],
            control: { type: "select" },
        },
        as: {
            options: ["h1", "h2", "h3", "h4", "h5", "h6", "span", "p"],
            control: { type: "select" },
        },
        color: {
            options: ["default", "weak", "x-weak", "disabled", "negative", "positive", "warning", "interactive"],
            control: { type: "select" },
        },
    },
    args: {
        children: "The fox jumps over the lazy dog",
        size: "medium",
        weight: "medium",
        as: "span",
        color: "default",
    },
} as Meta<HeadingProps>;

export const Heading: Story<HeadingProps> = (args) => <HeadingComponent {...args} />;
