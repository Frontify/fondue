/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import Divider, { DividerHeight, DividerProps, DividerStyle } from "./Divider";

export default {
    title: "Styleguide/Divider",
    component: Divider,
} as Meta;

const DividerTemplate: Story<DividerProps> = (args) => <Divider {...args} />;

export const Default = DividerTemplate.bind({});

export const Dashed = DividerTemplate.bind({});
Dashed.args = {
    color: "red",
    height: DividerHeight.Height10,
    style: DividerStyle.Dashed,
};

export const Dotted = DividerTemplate.bind({});
Dotted.args = {
    color: "red",
    height: DividerHeight.Height10,
    style: DividerStyle.Dotted,
};
