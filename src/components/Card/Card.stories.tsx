/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Story, Meta } from "@storybook/react";
import { Card, CardProps } from "./Card";

export default {
    title: "Components/Card",
    component: Card,
} as Meta<CardProps>;

const Template: Story<CardProps> = (args) => <Card {...args} />;

export const Default = Template.bind({});

Default.args = {
    children: "Children",
};
