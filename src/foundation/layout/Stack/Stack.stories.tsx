/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import { merge } from "@utilities/merge";
import React, { FC } from "react";
import { Stack, StackProps } from "./Stack";

const Placeholder: FC<{ width?: "auto" | "fixed" }> = ({ width = "auto" }) => (
    <div className={merge([width === "auto" ? "tw-w-full" : "tw-w-5/12", "tw-h-16 tw-bg-base tw-opacity-50"])}></div>
);

// eslint-disable-next-line import/no-default-export
export default {
    title: "Foundation/Layout/Stack",
    component: Stack,
    argTypes: {
        children: {
            table: {
                disable: true,
            },
        },
        padding: {
            options: ["none", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large"],
            control: { type: "select" },
        },
        spacing: {
            options: ["none", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large"],
            control: { type: "select" },
        },
        direction: {
            options: ["row", "column"],
            control: { type: "radio" },
        },
    },
    args: {
        direction: "row",
        padding: "medium",
        spacing: "x-small",
        children: (
            <>
                <Placeholder />
                <Placeholder />
                <Placeholder />
            </>
        ),
    },
} as Meta<StackProps>;

const Template: Story<StackProps> = (args) => (
    <div className="tw-bg-box-negative-inverse">
        <Stack {...args} />
    </div>
);

export const Default = Template.bind({});

export const Wrapped = Template.bind({});
Wrapped.args = {
    direction: "row",
    padding: "medium",
    spacing: "x-small",
    wrap: false,
    children: (
        <>
            <Placeholder width="fixed" />
            <Placeholder width="fixed" />
            <Placeholder width="fixed" />
        </>
    ),
};
