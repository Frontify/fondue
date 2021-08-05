/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Meta, Story } from "@storybook/react";
import { Divider, DividerHeight, DividerProps, DividerStyle } from "./Divider";

export default {
    title: "Elements/Divider",
    component: Divider,
    args: {
        color: "red",
    },
    argTypes: {
        color: {
            control: { type: "color" },
        },
        style: {
            options: Object.values(DividerStyle),
            control: {
                type: "select",
                labels: Object.entries(DividerStyle).reduce(
                    (labels, [key, value]) => ({ ...labels, [value]: key }),
                    {},
                ),
            },
        },
        height: {
            options: Object.values(DividerHeight),
            control: {
                type: "select",
                labels: Object.entries(DividerHeight).reduce(
                    (labels, [key, value]) => ({ ...labels, [value]: key }),
                    {},
                ),
            },
        },
    },
} as Meta;

export const Template: Story<DividerProps> = (args: DividerProps) => <Divider {...args} />;
