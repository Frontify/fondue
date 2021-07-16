/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import DividerComponent, { DividerHeight, DividerProps, DividerStyle } from "./Divider";

export default {
    title: "Elements/Divider",
    component: DividerComponent,
    args: {
        color: "red",
        height: DividerHeight.Height10,
        style: DividerStyle.Solid,
    },
    argTypes: {
        color: {
            control: { type: "color" },
        },
        style: {
            options: Object.keys(DividerStyle),
            control: { type: "radio" },
        },
        height: {
            options: Object.keys(DividerHeight),
            control: { type: "radio" },
        },
    },
} as Meta;

export const Divider: Story<DividerProps> = (args) => <DividerComponent {...args} />;
